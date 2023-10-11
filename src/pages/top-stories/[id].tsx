import {
    Author,
    GetAuthorListDocument,
    GetAuthorListQuery,
    apolloClient,
} from '@graphql';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
export const getServerSideProps: GetServerSideProps<{
    authors: Author[];
    currentAuthor: Author;
    status: string;
}> = async ({ params }) => {
    const authorHandle = String(params?.id);
    try {
        const { data } = await apolloClient.query<GetAuthorListQuery>({
            query: GetAuthorListDocument,
        });
        const authors = data.authorCollection?.items as Author[];
        const currentAuthor = authors.find(
            (author) => author.handle === authorHandle
        ) as Author;
        return {
            props: {
                authors,
                currentAuthor,
                status: 'sucess',
            },
        };
    } catch (error) {
        console.log(error);
        return { notFound: true };
    }
};
const AuthorById = ({
    authors,
    status,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    const router = useRouter();
    const currentAuthor = router.query.id;
    const authorSelected = authors.find(
        (author) => author.handle === currentAuthor
    );
    const [currentTab, setCurrentTab] = useState(authorSelected);
    if (typeof currentTab === 'undefined') {
        return <p></p>;
    }
    const changeAuthor = (id: string) => {
        router.push(`/top-stories/${id}`, undefined, { shallow: true });
    };
    const tabs = authors.map((author) => ({
        content: (
            <li
                key={author.handle}
                onClick={() => changeAuthor(author?.handle || '')}
            >
                {author.fullName}
            </li>
        ),
    }));
    console.log(currentTab);
    return (
        <div>
            <ul>{tabs.map((authors) => authors.content)}</ul>
            <p>{currentTab.fullName}</p>
        </div>
    );
};

export default AuthorById;

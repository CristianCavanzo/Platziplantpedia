import {
    Author,
    GetAuthorListDocument,
    GetAuthorListQuery,
    apolloClient,
} from '@graphql';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';

export const getServerSideProps: GetServerSideProps<{
    authors: Author[];
}> = async () => {
    try {
        const { data: result } = await apolloClient.query<GetAuthorListQuery>({
            query: GetAuthorListDocument,
            variables: {
                limit: 10,
            },
        });
        const authors = result.authorCollection?.items as Author[];
        if (authors.length) {
            const firstAuthor = authors[0].handle;
            return {
                redirect: {
                    destination: `/top-stories/${firstAuthor}`,
                    permanent: false,
                },
            };
        } else {
            throw new Error('no se han encontrado los autores');
        }
    } catch (error) {
        return {
            notFound: true,
        };
    }
};

const TopStories = ({
    authors,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    console.log(authors);
    return <div></div>;
};

export default TopStories;

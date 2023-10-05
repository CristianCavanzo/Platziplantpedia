import {
    GetPlantListDocument,
    GetPlantListQuery,
    Plant,
    apolloClient,
} from '@graphql';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const getStaticProps: GetStaticProps<{
    plants: Plant[];
}> = async () => {
    const { data: response } = await apolloClient.query<GetPlantListQuery>({
        query: GetPlantListDocument,
        fetchPolicy: 'network-only',
    });

    const plants = response.plantCollection?.items as Plant[];

    return { props: { plants }, revalidate: 24 * 60 };
};

const Home = ({ plants }: InferGetStaticPropsType<typeof getStaticProps>) => {
    return (
        <div>
            {plants.map((item) => (
                <div key={item.slug}>
                    <Link href={`/plant/${item.slug}`}>
                        <h2>{item.plantName}</h2>
                        {item.image && (
                            <Image
                                src={item.image.url as string}
                                width={500}
                                height={300}
                                alt={item.plantName as string}
                                style={{ objectFit: 'cover' }}
                            />
                        )}
                    </Link>
                </div>
            ))}
        </div>
    );
};

export default Home;

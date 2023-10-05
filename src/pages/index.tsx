import {
    GetPlantListDocument,
    GetPlantListQuery,
    Plant,
    apolloClient,
} from '@graphql';
import {
    GetStaticProps,
    InferGetServerSidePropsType,
    InferGetStaticPropsType,
} from 'next';
import Image from 'next/image';

export const getStaticProps: GetStaticProps<{
    plants: Plant[];
}> = async () => {
    const { data: response } = await apolloClient.query<GetPlantListQuery>({
        query: GetPlantListDocument,
        fetchPolicy: 'network-only',
    });

    const plants = response.plantCollection?.items as Plant[];

    return { props: { plants } };
};

const Home = ({ plants }: InferGetStaticPropsType<typeof getStaticProps>) => {
    console.log(plants);
    return (
        <div>
            {plants.map((item) => (
                <div key={item.slug}>
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
                </div>
            ))}
        </div>
    );
};

export default Home;

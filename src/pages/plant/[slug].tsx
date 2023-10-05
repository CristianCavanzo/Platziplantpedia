import {
    GetPlantDocument,
    GetPlantListDocument,
    GetPlantQuery,
    Plant,
    apolloClient,
} from '@graphql';
import {
    GetStaticProps,
    InferGetServerSidePropsType,
    InferGetStaticPropsType,
} from 'next';
import { useRouter } from 'next/router';

export const getStaticPaths = async () => {
    const { data } = await apolloClient.query<GetPlantQuery>({
        query: GetPlantListDocument,
    });
    const plants = data.plantCollection?.items as Plant[];
    const paths = plants.map((item) => ({
        params: { slug: item.slug },
    }));
    // return { paths, fallback: 'blocking' };
    return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps<{ plant: Plant }> = async ({
    params,
}) => {
    const slug = params?.slug;

    const { data } = await apolloClient.query<GetPlantQuery>({
        query: GetPlantDocument,
        variables: {
            slug,
        },
    });
    const plant = data.plantCollection?.items[0] as Plant;
    if (!plant) {
        return { notFound: true };
    }
    return { props: { plant }, revalidate: 24 * 60 };
};

const PlantPage = ({
    plant,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
    const router = useRouter();
    if (router.isFallback) {
        return <div>Loading...</div>;
    }
    return <div></div>;
};

export default PlantPage;

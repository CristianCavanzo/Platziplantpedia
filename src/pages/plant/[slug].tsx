import {
    GetPlantDocument,
    GetPlantListDocument,
    GetPlantQuery,
    Plant,
    apolloClient,
} from '@graphql';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import { useRouter } from 'next/router';

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
    if (!locales) {
        return { paths: [], fallback: true };
    }
    const { data } = await apolloClient.query<GetPlantQuery>({
        query: GetPlantListDocument,
    });
    const plants = data.plantCollection?.items as Plant[];
    const paths = plants
        .map((item) => ({
            params: { slug: String(item.slug) },
        }))
        .flatMap((path) => locales.map((locale) => ({ locale, ...path })));
    // return { paths, fallback: 'blocking' };
    return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps<{ plant: Plant }> = async ({
    params,
    preview,
    locale,
}) => {
    const slug = params?.slug;
    try {
        const { data } = await apolloClient.query<GetPlantQuery>({
            query: GetPlantDocument,
            variables: {
                slug,
                preview: preview ?? false,
                locale,
            },
        });
        const plant = data.plantCollection?.items[0] as Plant;
        if (!plant) {
            return { notFound: true };
        }
        return { props: { plant }, revalidate: 24 * 60 };
    } catch (error) {
        console.log(error);
        return { notFound: true };
    }
};

const PlantPage = ({
    plant,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
    const router = useRouter();
    if (router.isFallback) {
        return <div>Loading...</div>;
    }
    return (
        <div>
            <p>{plant.slug}</p>
            <p>{plant.plantName}</p>
        </div>
    );
};

export default PlantPage;

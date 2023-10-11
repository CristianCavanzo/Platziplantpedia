import {
    GetPlantListDocument,
    GetPlantListQuery,
    Plant,
    apolloClient,
} from '@graphql';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import NextImage, {
    ImageLoaderProps,
    ImageProps as NextImageProps,
} from 'next/image';
import Link from 'next/link';
import { useCallback } from 'react';

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
type aspectRatio = '1:1' | '4:3' | '16:9';
interface ImageProps extends Omit<NextImageProps, 'height'> {
    layout: 'responsive' | 'intrinsic' | 'fixed';
    src: string;
    width: number;
    alt: string;
    aspectRatio: aspectRatio;
    fit?: 'pad' | 'fill' | 'crop' | 'scale' | 'thumb';
}
const calcAspectRatio = (aspectRatio: aspectRatio, width: number): number => {
    const [x, y] = aspectRatio.split(':');
    return Math.round((width * parseInt(y)) / parseInt(x));
};
const Image = ({
    src,
    width,
    alt,
    aspectRatio,
    fit = 'scale',
    layout,
    ...props
}: ImageProps) => {
    const height = calcAspectRatio(aspectRatio, width);
    const loader = useCallback(
        (props: ImageLoaderProps) => {
            const loaderHeight = calcAspectRatio(aspectRatio, props.width);
            return `${src}?w=${props.width}&h=${loaderHeight}&fit=${fit}`;
        },
        [aspectRatio, fit]
    );
    return (
        <NextImage
            layout={layout}
            src={src}
            width={width}
            height={height}
            alt={alt}
            loader={loader}
            {...props}
        />
    );
};

const Home = ({ plants }: InferGetStaticPropsType<typeof getStaticProps>) => {
    return (
        <div style={{ maxWidth: '500px' }}>
            {plants.map((item) => (
                <div key={item.slug}>
                    <Link href={`/plant/${item.slug}`}>
                        <h2>{item.plantName}</h2>
                        {item.image && (
                            <Image
                                src={item.image.url as string}
                                width={500}
                                alt={item.plantName as string}
                                aspectRatio="16:9"
                                layout="responsive"
                                fit="scale"
                            />
                        )}
                    </Link>
                </div>
            ))}
        </div>
    );
};

export default Home;

import { GetPlantDocument, GetPlantQuery, apolloClient } from '@graphql';
import { NextApiHandler } from 'next';

const enablePreview: NextApiHandler = async (request, response) => {
    const slug = request.query.slug;
    // Check the secret and next parameters
    // This secret should only be known to this API route and the CMS
    if (
        request.query.secret !== process.env.NEXT_PUBLIC_SECRET_TOKEN_PREVIEW ||
        typeof slug !== 'string' ||
        slug === ''
    ) {
        return response.status(401).json({ message: 'Invalid token' });
    }

    try {
        // Fetch the headless CMS to check if the provided 'slug' exists
        const plant = (
            await apolloClient.query<GetPlantQuery>({
                query: GetPlantDocument,
                variables: { slug, preview: true },
            })
        ).data.plantCollection?.items[0];

        // Enable Preview Mode by setting the cookies
        /* La forma en que setPreviewData funciona es a través de cookies */
        response.setPreviewData({});

        //Redirect to the path from the fetched plant
        // We don't redirect to request.query.slug as that might lead to
        response.redirect(`/plant/${slug}`);
    } catch (e) {
        if (process.env.NODE_ENV !== 'production') {
            console.error(e);
        }
        return response.status(401).json({ message: 'Invalid slug' });
    }
};

export default enablePreview;

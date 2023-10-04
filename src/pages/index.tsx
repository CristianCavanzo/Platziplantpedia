import { useEffect } from 'react';
import { GetCategoryListDocument, apolloClient } from '@graphql';
console.log(apolloClient);
const request = async () => {
    console.log();
    apolloClient
        .query({
            query: GetCategoryListDocument,
        })
        .then((res) => {
            console.log(res.data);
        })
        .catch((err) => console.log(err));
};

const Home = () => {
    useEffect(() => {
        (async () => {
            if (typeof window !== 'undefined') {
                const data = await request();
                // console.log(data);
            }
        })();
    });
    return <div></div>;
};

export default Home;

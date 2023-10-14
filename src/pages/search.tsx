import { ApolloClient } from '@apollo/client';
import {
    Plant,
    SearchPlantDocument,
    SearchPlantQuery,
    apolloClient,
} from '@graphql';
import { useDebounce } from '@hooks/useDebounce';
import { useEffect, useState } from 'react';

const Search = () => {
    const [search, setSearch] = useState('');
    const [plants, setPlants] = useState<Plant[]>([]);
    const searchTerm = useDebounce(search, 500);
    useEffect(() => {
        if (searchTerm && searchTerm.length > 5) {
            apolloClient
                .query<SearchPlantQuery>({
                    query: SearchPlantDocument,
                    variables: {
                        term: search,
                    },
                })
                .then((response) => {
                    console.log(response);
                    const plants = response.data.plantCollection
                        ?.items as Plant[];
                    setPlants(plants);
                })
                .catch((e) => {
                    console.log(e);
                });
        }
    }, [searchTerm]);
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };
    return (
        <div>
            <input type="text" onInput={handleSearch} />
        </div>
    );
};

export default Search;

import { SearchPlantDocument, SearchPlantQuery, apolloClient } from '@graphql';
import { useDebounce } from '@hooks/useDebounce';
import { useState } from 'react';
import { useInfiniteQuery } from 'react-query';

const useInfinitePlantSearch = (search: string) => {
    return useInfiniteQuery(
        ['search', search],
        () =>
            apolloClient.query<SearchPlantQuery>({
                query: SearchPlantDocument,
                variables: {
                    term: search,
                },
            }),
        { enabled: search.length > 3, staleTime: Infinity }
    );
};

const Search = () => {
    const [search, setSearch] = useState('');
    const searchTerm = useDebounce(search, 500);
    const { data: plants } = useInfinitePlantSearch(searchTerm || '');
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };
    console.log(plants);
    return (
        <div>
            <input type="text" onInput={handleSearch} />
            <div>
                {plants &&
                    plants.pages[0].data.plantCollection?.items.map((plant) => (
                        <p key={plant?.slug}>{plant?.plantName}</p>
                    ))}
            </div>
        </div>
    );
};

export default Search;

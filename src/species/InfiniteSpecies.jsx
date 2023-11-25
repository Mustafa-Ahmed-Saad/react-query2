// import InfiniteScroll from "react-infinite-scroller";
import { Species } from "./Species";
import { useInfiniteQuery } from "react-query";

const initialUrl = "https://swapi.dev/api/species/";
const fetchUrl = async (url) => {
  const response = await fetch(url);
  return response.json();
};

export function InfiniteSpecies() {
  const {
    data,
    isLoading,
    isFetching,
    isError,
    error,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useInfiniteQuery(
    "sw-species",
    ({ pageParam = initialUrl }) => fetchUrl(initialUrl),
    {
      getNextPageParam: (lastPage, AllPages) => {
        return lastPage.next || undefined;
      },
    }
  );

  console.log(isFetchingNextPage);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>{error.toString()}</div>;

  return (
    <>
      {data?.pages.map((pageData) =>
        pageData.results.map((species) => (
          <Species
            key={species.name}
            name={species.name}
            language={species.language}
            averageLifespan={species.average_lifespan}
          />
        ))
      )}

      {hasNextPage ? (
        <button
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
        >
          {isFetching ? "fetching..." : "load more"}
        </button>
      ) : (
        <div className="no-more">No more data</div>
      )}
    </>
  );
}

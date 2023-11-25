import InfiniteScroll from "react-infinite-scroller";
import { useInfiniteQuery } from "react-query";
import { Person } from "./Person";

const initialUrl = "https://swapi.dev/api/people/";
const fetchUrl = async (url) => {
  const response = await fetch(url);
  return response.json();
};

export function InfinitePeople() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetching,
    isError,
    error,
  } = useInfiniteQuery(
    "sw-people",
    // query fun
    ({ pageParam = initialUrl }) => fetchUrl(initialUrl),
    {
      // this fun update the pageParam of the query fun
      getNextPageParam: (lastPage, AllPages) => {
        // if this fun return undefined this mean that there is no more data and hasNextPage will be false
        return lastPage.next || undefined;
      },
    }
  );

  // error
  if (isError) return <div>Error! {error.toString()}</div>;

  // no data in sw-people and isFetching = true | isLoading reset the page because return dev instead of page and we should reset the page because there is no data
  if (isLoading) return <div className="loading">Loading...</div>;

  console.log("data", data);

  return (
    <>
      {/* isFetching not reset the page because it return dev in the bottom not instead of page */}
      {isFetching && <div className="fetching">fetching...</div>}
      <InfiniteScroll
        loadMore={fetchNextPage}
        hasMore={hasNextPage}
        loader={
          <div className="infiniteScroll-loader">
            loader from InfiniteScroll
          </div>
        }
      >
        {data?.pages.map((pageData) =>
          pageData.results.map((person) => (
            <Person
              key={person.name}
              name={person.name}
              hairColor={person.hair_color}
              eyeColor={person.eye_color}
            />
          ))
        )}
      </InfiniteScroll>
    </>
  );
}

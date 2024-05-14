import { useQuery } from "@apollo/client";
import { GET_SINGLE_REPOSITORY } from "../graphql/queries";

const useSingleRepository = (variables) => {
  const { data, loading, fetchMore, ...result } = useQuery(
    GET_SINGLE_REPOSITORY,
    {
      fetchPolicy: "cache-and-network",
      nextFetchPolicy: "cache-first",
      variables,
    }
  );

  const handleFetchMore = () => {
    const canFetchMore =
      !loading && data?.repository.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repository.reviews.pageInfo.endCursor,
        ...variables,
      },
    });
  };

  return {
    repository: data?.repository,
    fetchMore: handleFetchMore,
    loading,
    ...result,
  };
};

export default useSingleRepository;

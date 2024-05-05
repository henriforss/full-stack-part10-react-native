import { useMutation, useApolloClient } from "@apollo/client";
import { CREATE_REVIEW } from "../graphql/mutations";

const useReview = () => {
  const apolloClient = useApolloClient();
  const [mutate, result] = useMutation(CREATE_REVIEW);

  const review = async ({ ownerName, repositoryName, rating, text }) => {
    const response = await mutate({
      variables: {
        ownerName,
        repositoryName,
        rating,
        text,
      },
    });

    await apolloClient.resetStore();

    return response;
  };

  return [review, result];
};

export default useReview;

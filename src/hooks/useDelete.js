import { useMutation, useApolloClient } from "@apollo/client";
import { DELETE_REVIEW } from "../graphql/mutations";

const useDelete = () => {
  const apolloClient = useApolloClient();
  const [mutate, result] = useMutation(DELETE_REVIEW);

  const deleteReview = async (id) => {
    const response = await mutate({
      variables: { deleteReviewId: id },
    });

    await apolloClient.resetStore();

    return response;
  };

  return [deleteReview, result];
};

export default useDelete;

import { useApolloClient, useMutation } from "@apollo/client";
import { SIGN_UP } from "../graphql/mutations";

const useSignUp = () => {
  const apolloClient = useApolloClient();
  const [mutate, result] = useMutation(SIGN_UP);

  const signUp = async ({ username, password }) => {
    const response = await mutate({
      variables: { user: { username, password } },
    });
    await apolloClient.resetStore();

    return response;
  };

  return [signUp, result];
};

export default useSignUp;

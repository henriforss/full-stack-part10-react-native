import { StyleSheet, View } from "react-native";
import theme from "../theme";
import AppBarTab from "./AppBarTab";
import { ScrollView } from "react-native";
import { useApolloClient, useQuery } from "@apollo/client";
import { GET_AUTHORIZED_USER } from "../graphql/queries";
import { useContext } from "react";
import AuthStorageContext from "../contexts/AuthStorageContext";

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    paddingBottom: 20,
    paddingLeft: 0,
    paddingRight: 0,
    backgroundColor: theme.colors.backgroundAppBar,
    // ...
  },

  // ...
});

const AppBar = () => {
  const authStorage = useContext(AuthStorageContext);
  const apolloClient = useApolloClient();
  const user = useQuery(GET_AUTHORIZED_USER);

  const signOut = async () => {
    await authStorage.removeAccessToken();
    await apolloClient.resetStore();
  };

  const isAuthorized = user.data && user.data.me === null ? false : true;

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab to={"/"}>Repositories</AppBarTab>

        {isAuthorized ? <AppBarTab to={"/review"}>Review</AppBarTab> : null}

        {isAuthorized ? (
          <AppBarTab onPress={signOut}>Sign out</AppBarTab>
        ) : (
          <AppBarTab to={"/signin"}>Sign in</AppBarTab>
        )}

        {!isAuthorized ? <AppBarTab to={"/signup"}>Sign up</AppBarTab> : null}
      </ScrollView>
    </View>
  );
};

export default AppBar;

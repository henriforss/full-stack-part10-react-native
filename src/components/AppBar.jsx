import { StyleSheet, View } from "react-native";
import theme from "../theme";
import AppBarTab from "./AppBarTab";
import { ScrollView } from "react-native";

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
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab to={"/"}>Repositories</AppBarTab>
        <AppBarTab to={"/signin"}>Sign in</AppBarTab>
      </ScrollView>
    </View>
  );
};

export default AppBar;

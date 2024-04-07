import Text from "./Text";
import { Link } from "react-router-native";

const styles = {
  container: {
    // marginRight: 10,
    marginLeft: 10,
  },
};

const AppBarTab = ({ children, to }) => {
  return (
    <Link to={to} onPress={() => console.log("press")} style={styles.container}>
      <Text color={"textSecondary"} fontWeight={"bold"} fontSize={"heading"}>
        {children}
      </Text>
    </Link>
  );
};

export default AppBarTab;

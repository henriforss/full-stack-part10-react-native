import Text from "./Text";
import { Link } from "react-router-native";

const styles = {
  container: {
    // marginRight: 10,
    marginLeft: 10,
  },
};

const AppBarTab = ({ children, to, onPress }) => {
  return (
    <Link to={to} onPress={onPress} style={styles.container}>
      <Text color={"textSecondary"} fontWeight={"bold"} fontSize={"heading"}>
        {children}
      </Text>
    </Link>
  );
};

export default AppBarTab;

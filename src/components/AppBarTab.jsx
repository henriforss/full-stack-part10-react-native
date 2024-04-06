import { Pressable } from "react-native";
import Text from "./Text";

const AppBarTab = ({ children }) => {
  return (
    <Pressable onPress={() => console.log("press")}>
      <Text color={"textSecondary"} fontWeight={"bold"} fontSize={"heading"}>
        {children}
      </Text>
    </Pressable>
  );
};

export default AppBarTab;

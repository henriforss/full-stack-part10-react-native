import { View, Image } from "react-native";
import Text from "./Text";
import theme from "../theme";

const styles = {
  wrapper: {
    padding: 10,
    backgroundColor: theme.colors.itemBackground,
  },
  container: {
    display: "flex",
    flexDirection: "row",
  },
  title: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    gap: 5,
    flex: 1,
  },
  language: {
    marginTop: 10,
    marginLeft: 50,
    marginBottom: 10,
    backgroundColor: theme.colors.languageBackground,
    alignSelf: "flex-start",
    padding: 5,
    borderRadius: 5,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 5,
    marginRight: 10,
  },
  text: {
    display: "flex",
    flexDirection: "column",
    marginLeft: 10,
  },
  stats: {
    marginTop: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  stat: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 5,
  },
};

const formatNumber = (num) =>
  num >= 1000 ? (num / 1000).toFixed(1) + "k" : num;

const RepositoryItem = (data) => {
  const {
    description,
    forksCount,
    fullName,
    id,
    language,
    ownerAvatarUrl,
    ratingAverage,
    reviewCount,
    stargazersCount,
  } = data.data.item;

  return (
    <View testID="repositoryItem" style={styles.wrapper}>
      <View style={styles.container}>
        <Image source={{ uri: ownerAvatarUrl }} style={styles.image} />
        <View style={styles.title}>
          <Text fontSize={"subheading"} fontWeight={"bold"}>
            {fullName}
          </Text>
          <Text color={"textThird"}>{description}</Text>
        </View>
      </View>
      <View style={styles.language}>
        <Text color={"textSecondary"}>{language}</Text>
      </View>
      <View style={styles.stats}>
        <View style={styles.stat}>
          <Text fontWeight={"bold"}>{formatNumber(stargazersCount)}</Text>
          <Text color={"textThird"}>Stars</Text>
        </View>
        <View style={styles.stat}>
          <Text fontWeight={"bold"}>{formatNumber(forksCount)}</Text>
          <Text color={"textThird"}>Forks</Text>
        </View>
        <View style={styles.stat}>
          <Text fontWeight={"bold"}>{formatNumber(reviewCount)}</Text>
          <Text color={"textThird"}>Reviews</Text>
        </View>
        <View style={styles.stat}>
          <Text fontWeight={"bold"}>{formatNumber(ratingAverage)}</Text>
          <Text color={"textThird"}>Rating</Text>
        </View>
      </View>
    </View>
  );
};

export default RepositoryItem;

import { Image, Linking, Pressable, View } from "react-native";
import { useNavigate } from "react-router-native";
import theme from "../theme";
import Text from "./Text";

const styles = {
  wrapper: {
    padding: 10,
    backgroundColor: theme.colors.itemBackground,
    marginBottom: 10,
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
  button: {
    marginTop: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: theme.colors.primary,
    display: "flex",
    alignItems: "center",
  },
};

const formatNumber = (num) =>
  num >= 1000 ? (num / 1000).toFixed(1) + "k" : num;

const RepositoryItem = ({ data, singleView }) => {
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
    url,
  } = singleView ? data : data.item;

  const navigate = useNavigate();

  return (
    <Pressable onPress={() => navigate(`/${id}`)}>
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

        {url ? (
          <Pressable style={styles.button} onPress={() => Linking.openURL(url)}>
            <Text
              fontSize={"subheading"}
              fontWeight={"bold"}
              color={"textSecondary"}
            >
              Open in GitHub
            </Text>
          </Pressable>
        ) : null}
      </View>
    </Pressable>
  );
};

export default RepositoryItem;

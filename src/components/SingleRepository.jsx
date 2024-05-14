import { FlatList, StyleSheet, View } from "react-native";
import { useParams } from "react-router-native";
import useSingleRepository from "../hooks/useSingleRepository";
import theme from "../theme";
import RepositoryItem from "./RepositoryItem";
import Text from "./Text";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  wrapper: {
    padding: 10,
    backgroundColor: theme.colors.itemBackground,
    display: "flex",
    flexDirection: "row",
  },
  rating: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: theme.colors.primary,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  info: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    gap: 5,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const formatDate = (date) => {
  const d = new Date(date);
  return d.toLocaleDateString();
};

const ReviewItem = ({ review }) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.rating}>
        <Text fontSize={"subheading"} fontWeight={"bold"}>
          {review.rating}
        </Text>
      </View>
      <View style={styles.info}>
        <Text fontSize={"subheading"} fontWeight={"bold"}>
          {review.user.username}
        </Text>
        <Text color={"textThird"}>{formatDate(review.createdAt)}</Text>
        <Text>{review.text}</Text>
      </View>
    </View>
  );
};

const SingleRepository = () => {
  const { id } = useParams();

  const { repository, fetchMore } = useSingleRepository({
    first: 5,
    repositoryId: id,
  });

  const onEndReach = () => {
    fetchMore();
  };

  return repository ? (
    <FlatList
      data={repository.reviews.edges}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <ReviewItem review={item.node} />}
      keyExtractor={(item) => item.node.id}
      onEndReached={onEndReach}
      ListHeaderComponent={() => (
        <RepositoryItem data={repository} singleView={true} />
      )}
    />
  ) : null;
};

export default SingleRepository;

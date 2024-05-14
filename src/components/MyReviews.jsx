import { FlatList, Pressable, StyleSheet, View, Alert } from "react-native";
import Text from "./Text";
import theme from "../theme";
import { useNavigate } from "react-router-native";
import useDelete from "../hooks/useDelete";
import { useQuery } from "@apollo/client";
import { GET_AUTHORIZED_USER } from "../graphql/queries";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  wrapper: {
    padding: 10,
    backgroundColor: theme.colors.itemBackground,
  },
  textWrapper: {
    display: "flex",
    flexDirection: "row",
    marginBottom: 10,
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
  button: {
    padding: 10,
    borderRadius: 5,
    display: "flex",
    alignItems: "center",
    flex: 1,
  },
  buttonBlue: {
    backgroundColor: theme.colors.languageBackground,
  },
  buttonRed: {
    backgroundColor: theme.colors.error,
  },
  buttonWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  alertWrapper: {
    padding: 10,
    backgroundColor: "white",
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const formatDate = (date) => {
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();

  return `${day}.${month}.${year}`;
};

const ReviewItem = ({ review }) => {
  const navigate = useNavigate();
  const [deleteReview] = useDelete();

  const onDelete = async (id) => {
    try {
      const result = await deleteReview(id);

      console.log("result", result);
    } catch (e) {
      console.log("Error", e);
    }
  };

  const createAlert = () =>
    Alert.alert(
      "Delete review",
      "Are you sure you want to delete this review?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "OK", onPress: () => onDelete(review.id) },
      ]
    );

  return (
    <View style={styles.wrapper}>
      <View style={styles.textWrapper}>
        <View style={styles.rating}>
          <Text fontSize={"subheading"} fontWeight={"bold"}>
            {review.rating}
          </Text>
        </View>

        <View style={styles.info}>
          <Text fontSize={"subheading"} fontWeight={"bold"}>
            {review.repository.fullName}
          </Text>
          <Text color={"textThird"}>{formatDate(review.createdAt)}</Text>
          <Text>{review.text}</Text>
        </View>
      </View>

      <View style={styles.buttonWrapper}>
        <Pressable
          style={[styles.button, styles.buttonBlue]}
          onPress={() => navigate(`/${review.repository.id}`)}
        >
          <Text
            fontSize={"subheading"}
            fontWeight={"bold"}
            color={"textSecondary"}
          >
            View repository
          </Text>
        </Pressable>

        <Pressable style={[styles.button, styles.buttonRed]}>
          <Text
            fontSize={"subheading"}
            fontWeight={"bold"}
            color={"textSecondary"}
            onPress={createAlert}
          >
            Delete review
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const MyReviews = () => {
  const { data } = useQuery(GET_AUTHORIZED_USER, {
    fetchPolicy: "cache-and-network",
    variables: {
      includeReviews: true,
    },
  });

  return data ? (
    <FlatList
      data={data.me.reviews.edges}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <ReviewItem review={item.node} />}
      keyExtractor={(item) => item.node.id}
    />
  ) : null;
};

export default MyReviews;

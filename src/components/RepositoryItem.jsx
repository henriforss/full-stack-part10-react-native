import { Text, View } from "react-native";

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
    <View>
      <Text>Full name: {fullName}</Text>
      <Text>Description: {description}</Text>
      <Text>Language: {language}</Text>
      <Text>Stars: {stargazersCount}</Text>
      <Text>Forks: {forksCount}</Text>
      <Text>Reviews: {reviewCount}</Text>
      <Text>Rating: {ratingAverage}</Text>
    </View>
  );
};

export default RepositoryItem;

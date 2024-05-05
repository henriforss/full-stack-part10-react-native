import { useQuery } from "@apollo/client";
import { FlatList, StyleSheet, View } from "react-native";
import { GET_REPOSITORIES, GET_SINGLE_REPOSITORY } from "../graphql/queries";
import RepositoryItem from "./RepositoryItem";
import { useParams } from "react-router-native";
import SingleRepository from "./SingleRepository";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({ repositories, singleView }) => {
  // Render the chosen repository view
  if (singleView) {
    return repositories ? (
      <SingleRepository repositories={repositories} singleView={singleView} />
    ) : null;
  } else {
    const repositoryNodes = repositories
      ? repositories.edges.map((edge) => edge.node)
      : [];

    return (
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={(item) => <RepositoryItem data={item} />}
        keyExtractor={(item) => item.id}
      />
    );
  }
};

const RepositoryList = ({ singleView }) => {
  const { id } = useParams();

  let data;

  // Get the repositories from the GraphQL server, single or full data
  if (singleView) {
    const { data: singleData } = useQuery(GET_SINGLE_REPOSITORY, {
      fetchPolicy: "no-cache",
      variables: { repositoryId: id },
    });

    data = singleData;
  } else {
    const { data: fullData } = useQuery(GET_REPOSITORIES, {
      fetchPolicy: "no-cache",
    });

    data = fullData;
  }

  return (
    <RepositoryListContainer
      repositories={singleView ? data?.repository : data?.repositories}
      singleView={singleView}
    />
  );
};

export default RepositoryList;

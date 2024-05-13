import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, TextInput, View } from "react-native";
import { useParams } from "react-router-native";
import {
  GET_REPOSITORIES,
  GET_SINGLE_REPOSITORY,
  GET_AUTHORIZED_USER,
} from "../graphql/queries";
import RepositoryItem from "./RepositoryItem";
import SingleRepository from "./SingleRepository";
import RNPickerSelect from "react-native-picker-select";
import theme from "../theme";
import _ from "lodash";
import MyReviews from "./MyReviews";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  picker: {
    backgroundColor: theme.colors.appBackground,
  },
  input: {
    padding: 10,
    margin: 10,
    backgroundColor: "white",
    borderRadius: 5,
    shadowColor: "black",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({
  repositories,
  singleView,
  myReviews,
  handleOrderChange,
  searchKeyword,
  setSearchKeyword,
}) => {
  // Render the chosen repository view
  if (singleView) {
    return repositories ? (
      <SingleRepository repositories={repositories} singleView={singleView} />
    ) : null;
  } else if (myReviews) {
    return repositories ? <MyReviews reviews={repositories} /> : null;
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
        ListHeaderComponent={
          <View style={styles.picker}>
            <TextInput
              style={styles.input}
              placeholder="Search..."
              value={searchKeyword}
              onChangeText={(e) => setSearchKeyword(e)}
            />

            <RNPickerSelect
              style={{
                inputIOS: {
                  color: "black",
                  height: 60,
                  padding: 10,
                  fontSize: 16,
                },
                placeholder: {
                  color: "black",
                },
                inputWeb: {
                  color: "black",
                  height: 60,
                  fontSize: 16,
                  border: 0,
                  backgroundColor: theme.colors.appBackground,
                },
              }}
              placeholder={{ label: "Filter items by...", value: "" }}
              onValueChange={(itemValue) => handleOrderChange(itemValue)}
              items={[
                {
                  label: "Latest repositories",
                  value: "Latest repositories",
                },
                {
                  label: "Highest rated repositories",
                  value: "Highest rated repositories",
                },
                {
                  label: "Lowest rated repositories",
                  value: "Lowest rated repositories",
                },
              ]}
            />
          </View>
        }
      />
    );
  }
};

const RepositoryList = ({ singleView, myReviews }) => {
  const { id } = useParams();
  const [orderBy, setOrderBy] = useState("CREATED_AT");
  const [orderDirection, setOrderDirection] = useState("DESC");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [debouncedSearchKeyword, setDebouncedSearchKeyword] =
    useState(searchKeyword);

  // Handle filtering the repositories
  const handleOrderChange = (value) => {
    switch (value) {
      case "Latest repositories":
        setOrderBy("CREATED_AT");
        setOrderDirection("DESC");
        break;
      case "Highest rated repositories":
        setOrderBy("RATING_AVERAGE");
        setOrderDirection("DESC");
        break;
      case "Lowest rated repositories":
        setOrderBy("RATING_AVERAGE");
        setOrderDirection("ASC");
        break;
      default:
        break;
    }
  };

  // Get the repositories from the GraphQL server, single or full data
  let data;

  if (singleView) {
    const { data: singleData } = useQuery(GET_SINGLE_REPOSITORY, {
      fetchPolicy: "no-cache",
      variables: { repositoryId: id },
    });

    data = singleData;
  } else if (myReviews) {
    const { data: myData } = useQuery(GET_AUTHORIZED_USER, {
      fetchPolicy: "no-cache",
      variables: {
        includeReviews: true,
      },
    });

    data = myData;
  } else {
    const { data: fullData } = useQuery(GET_REPOSITORIES, {
      variables: {
        orderBy,
        orderDirection,
        searchKeyword: debouncedSearchKeyword,
      },
      fetchPolicy: "no-cache",
    });

    data = fullData;
  }

  // Debounce the search keyword
  useEffect(() => {
    const debounced = _.debounce(() => {
      setDebouncedSearchKeyword(searchKeyword);
    }, 500);

    debounced();

    return () => {
      debounced.cancel();
    };
  }, [searchKeyword]);

  return (
    <RepositoryListContainer
      repositories={
        singleView
          ? data?.repository
          : myReviews
          ? data?.me?.reviews?.edges
          : data?.repositories
      }
      singleView={singleView}
      myReviews={myReviews}
      handleOrderChange={handleOrderChange}
      searchKeyword={searchKeyword}
      setSearchKeyword={setSearchKeyword}
    />
  );
};

export default RepositoryList;

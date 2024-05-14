import _ from "lodash";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, TextInput, View } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import useRepositories from "../hooks/useRepositories";
import theme from "../theme";
import RepositoryItem from "./RepositoryItem";

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
  handleOrderChange,
  searchKeyword,
  setSearchKeyword,
  onEndReach,
}) => {
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={(item) => <RepositoryItem data={item} />}
      keyExtractor={(item) => item.id}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.2}
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
};

const RepositoryList = () => {
  const [orderBy, setOrderBy] = useState("CREATED_AT");
  const [orderDirection, setOrderDirection] = useState("DESC");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [debouncedSearchKeyword, setDebouncedSearchKeyword] =
    useState(searchKeyword);

  const { repositories, fetchMore } = useRepositories({
    first: 5,
    orderBy,
    orderDirection,
    searchKeyword: debouncedSearchKeyword,
  });

  // Handle the end of the list
  const onEndReach = () => {
    fetchMore();
  };

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
      repositories={repositories}
      handleOrderChange={handleOrderChange}
      searchKeyword={searchKeyword}
      setSearchKeyword={setSearchKeyword}
      onEndReach={onEndReach}
    />
  );
};

export default RepositoryList;

import { gql } from "@apollo/client";

export const GET_REPOSITORIES = gql`
  query GetRepos(
    $orderDirection: OrderDirection
    $orderBy: AllRepositoriesOrderBy
    $searchKeyword: String
    $first: Int
    $after: String
  ) {
    repositories(
      orderDirection: $orderDirection
      orderBy: $orderBy
      searchKeyword: $searchKeyword
      first: $first
      after: $after
    ) {
      totalCount
      edges {
        cursor
        node {
          id
          fullName
          createdAt
          description
          language
          forksCount
          stargazersCount
          ratingAverage
          reviewCount
          ownerAvatarUrl
        }
      }
      pageInfo {
        startCursor
        endCursor
        hasNextPage
      }
    }
  }
`;

export const GET_AUTHORIZED_USER = gql`
  query GetAuthorizedUser($includeReviews: Boolean = false) {
    me {
      username
      reviews @include(if: $includeReviews) {
        edges {
          node {
            rating
            createdAt
            text
            repository {
              fullName
              id
            }
            id
          }
        }
      }
    }
  }
`;

export const GET_SINGLE_REPOSITORY = gql`
  query GetSingleRepo($repositoryId: ID!, $first: Int, $after: String) {
    repository(id: $repositoryId) {
      id
      fullName
      forksCount
      description
      language
      createdAt
      stargazersCount
      ratingAverage
      reviewCount
      ownerAvatarUrl
      url
      name
      reviews(first: $first, after: $after) {
        edges {
          node {
            createdAt
            id
            rating
            text
            user {
              id
              username
            }
          }
        }
        totalCount
        pageInfo {
          endCursor
          hasNextPage
        }
      }
    }
  }
`;

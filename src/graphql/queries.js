import { gql } from "@apollo/client";

export const GET_REPOSITORIES = gql`
  query {
    repositories {
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
    }
  }
`;

export const GET_AUTHORIZED_USER = gql`
  query {
    me {
      id
      username
    }
  }
`;

export const GET_SINGLE_REPOSITORY = gql`
  query GetSingleRepo($repositoryId: ID!) {
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
      reviews {
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
      }
    }
  }
`;

import { gql } from '@apollo/client';

export const GET_USER_ID_BY_EMAIL = gql`
    query Users($userEmail: String!) {
        users(first: 1, userEmail: $userEmail) {
            totalCount
            edges {
                node {
                    userId
                }
            }
        }
    }
`;

export const GET_USER_SESSION_BY_EMAIL = gql`
    query Users($userEmail: String!) {
        users(first: 1, userEmail: $userEmail) {
            edges {
                node {
                    userId
                    userEmail
                    roleCode
                    socialId
                    createdAt
                    updatedAt
                    userRole {
                        roleCode
                        roleName
                        canEditPostYn
                        canDeletePostYn
                    }
                }
            }
        }
    }
`;

export const GET_USER_LIST = gql`
    query Users($first: Int!, $after: String) {
        users(first: $first, after: $after) {
            totalCount
            edges {
                node {
                    userId
                    userEmail
                    roleCode
                    socialId
                    createdAt
                    updatedAt
                    userRole {
                        roleCode
                        roleName
                        canEditPostYn
                        canDeletePostYn
                    }
                }
            }
            pageCursors {
                around {
                    cursor
                    isCurrent
                    page
                }
                first {
                    cursor
                    isCurrent
                    page
                }
                last {
                    cursor
                    isCurrent
                    page
                }
                next {
                    cursor
                    isCurrent
                    page
                }
                previous {
                    cursor
                    isCurrent
                    page
                }
            }
        }
    }
`;

export const CREATE_USER_BY_EMAIL = gql`
    mutation MutateUser($userEmail: String!) {
        mutateUser(userEmail: $userEmail) {
            user {
                userId
            }
        }
    }
`
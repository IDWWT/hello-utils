import { gql } from '@apollo/client';

export const GET_USER_ID_BY_EMAIL = gql`
    query Users($userEmail: String!) {
        users(userEmail: $userEmail) {
            userId
        }
    }
`;

export const GET_USER_SESSION_BY_EMAIL = gql`
    query Users($userEmail: String!) {
        users(userEmail: $userEmail) {
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
`;

export const GET_USER_LIST = gql`
    query UsersRelay($first: Int!, $after: String) {
        usersRelay(first: $first, after: $after) {
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
`
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { registerApolloClient } from "@apollo/experimental-nextjs-app-support/rsc";
import { gql } from "@apollo/client";
import { UserSearchCondition, UserUniqueKey } from "@/types/user"
import { UserSession } from "@/types/user";

export const { getClient } = registerApolloClient(() => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: `${process.env.HELLO_USER_API_URL}/graphql`,
      // uri: `https://main--spacex-l4uc6p.apollographos.net/graphql`,
      // you can disable result caching here if you want to
      // (this does not work if you are rendering your page with `export const dynamic = "force-static"`)
      fetchOptions: { cache: "no-store" },
    }),
  });
});

export const getUserIdByEmail = async ({ userEmail }: UserUniqueKey) => {
  const query = gql`
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
  `

  const { data } = await getClient().query({ query, variables: { userEmail } });
  return data.users.edges[0]?.node?.userId;
}

export const getUserSessionByEmail = async ({ userEmail }: UserUniqueKey): Promise<UserSession> => {
  const query = gql`
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
  `

  const { data } = await getClient().query({ query, variables: { userEmail } });
  return data.users.edges[0]?.node;
}

export const getUserList = async ({ first, after }: UserSearchCondition) => {
  const query = gql`
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
                    id
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
  `

  const { data } = await getClient().query({ query, variables: { first, after } });
  return data;
}

export const createUserByEmail = async ({ userEmail }: UserUniqueKey) => {
  const mutation = gql`
    mutation MutateUser($userEmail: String!) {
        mutateUser(userEmail: $userEmail) {
            user {
                userId
            }
        }
    }
  `

  const { data } = await getClient().mutate({ mutation, variables: { userEmail } })
  return data.mutateUser.user.userId;
}

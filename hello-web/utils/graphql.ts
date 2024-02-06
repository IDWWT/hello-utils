import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { registerApolloClient } from "@apollo/experimental-nextjs-app-support/rsc";
import { gql } from "@apollo/client";
import { UserUniqueKey } from "@/utils/user"

export const { getClient } = registerApolloClient(() => {
  console.log('url', `${process.env.HELLO_USER_API_URL}/graphql`);
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
  const query = gql`{
    userMaster {
      edges {
        node {
          id
          userId
          userEmail
          userRole {
            roleCode
            roleName
          }
          socialId
          createdAt
          updatedAt
        }
      }
    }
  }`

  const { data } = await getClient().query({ query });
  return data.userMaster.edges[0].node.userId;
}
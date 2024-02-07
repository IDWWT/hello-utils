import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { registerApolloClient } from "@apollo/experimental-nextjs-app-support/rsc";
import { gql } from "@apollo/client";
import { UserUniqueKey } from "@/utils/user"

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
    query ($userEmail: String!){
        users(userEmail: $userEmail) {
            userId
            userEmail
            roleCode
            socialId
            createdAt
            updatedAt
        }
    }
  `

  const { data } = await getClient().query({ query, variables: { userEmail } });
  return data.users[0]?.userId;
}
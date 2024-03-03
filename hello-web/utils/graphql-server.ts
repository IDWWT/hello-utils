import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { registerApolloClient } from "@apollo/experimental-nextjs-app-support/rsc";

/**
 * middleware 에서 아래 에러 발생
 * Error [TypeError]: React.cache is not a function
 * 
 * node_modules/@apollo/experimental-nextjs-app-support/dist/rsc/registerApolloClient.js
 * function registerApolloClient(makeClient) {
 *     const getClient = React.cache(makeClient);
 *     return {
 *         getClient,
 *     };
 * }
 */
// export const { getClient } = registerApolloClient(() => {
//   return new ApolloClient({
//     cache: new InMemoryCache(),
//     link: new HttpLink({
//       uri: `${process.env.HELLO_BFF_API_URL}/graphql`,
//       // uri: `https://main--spacex-l4uc6p.apollographos.net/graphql`,
//       // you can disable result caching here if you want to
//       // (this does not work if you are rendering your page with `export const dynamic = "force-static"`)
//       fetchOptions: { cache: "no-store" },
//     }),
//   });
// });

export const getClient = () => new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: `${process.env.HELLO_BFF_API_URL}/graphql`,
    fetchOptions: { cache: "no-store" },
  }),
});
import "reflect-metadata"; // maybe here?????????????????????????????????????
import { gql } from "@apollo/client";
import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { ApolloServerPluginLandingPageProductionDefault } from "@apollo/server/plugin/landingPage/default";

import {
  buildSchema,
  Resolver,
  Query,
  Arg,
  ObjectType,
  Field,
  ID,
} from "type-graphql";
import { GraphQLSchema } from "graphql";
import { DogsResolver } from "../../src/gq001/schema/dogs.resolver";
// import { DogsResolver } from "../../src/schema/dogs.resolver";

// @ObjectType()
// export class Dog {
//   @Field(() => ID)
//   name?: string;
// }

// @Resolver(Dog)
// export class DogsResolver {
//   @Query(() => [Dog])
//   dogs(): Dog[] {
//     return [{ name: "Bo" }, { name: "Lassie" }];
//   }
// }

const schemaPromise = buildSchema({
  resolvers: [DogsResolver],
});

const resolvers = {
  Query: {
    hello: () => "world",
  },
};

const typeDefs = gql(`
  type Query {
    hello: String
  }
`);

const getServer = async (schemaPromise: Promise<GraphQLSchema>) => {
  const server = new ApolloServer({
    schema: await schemaPromise,
    // typeDefs,
    // resolvers,
    introspection: true,
    plugins: [
      ApolloServerPluginLandingPageProductionDefault({
        // graphRef: 'my-graph-id@my-graph-variant',
        // footer: false,
      }),
    ],
  });

  return server;
};

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

export default startServerAndCreateNextHandler(await getServer(schemaPromise), {
  context: async (req, res) => ({ req, res }),
});

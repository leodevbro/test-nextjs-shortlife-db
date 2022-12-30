import "reflect-metadata"; // maybe here?????????????????????????????????????
import { gql } from "@apollo/client";
import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";

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

@ObjectType()
export class Dog {
  @Field(() => ID)
  name?: string;
}

@Resolver(Dog)
export class DogResolver {
  @Query(() => [Dog])
  dogs(): Dog[] {
    return [{ name: "Bo" }, { name: "Lassie" }];
  }
}

const schemaPromise = buildSchema({
  resolvers: [DogResolver],
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

import { ApolloServer, gql } from "apollo-server";

const typeDefs = gql`
  type relatedData {
    url: String!
  }

  type Query {
    relatedDataById(id: String!): relatedData
  }
`;

const resolvers = {
  Query: {
    relatedDataById: async (
      _: unknown,
      { id }: { id: string }
    ) => {
      // sign s3 url
      return {
        url: id === "unauthorized" ? "Unauthorized access to remote schema" : `url: ${id}`,
      };
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen({ port: 4000 }).then(({ url }) => {
  console.log(`🚀 Remote GraphQL ready at ${url}`);
});

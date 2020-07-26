import {GraphQLNonNull, GraphQLObjectType, GraphQLSchema} from 'graphql';

import {nodeField} from './Relay';
import Viewer from './models/viewer.graph';

const query = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    node: nodeField,
    viewer: {
      type: new GraphQLNonNull(Viewer),
      // Return empty object so that other resolvers run
      resolve: () => ({}),
    },
  }),
});

export default new GraphQLSchema({
  query,
});

import {globalIdField} from 'graphql-relay';
import {GraphQLString, GraphQLObjectType, GraphQLNonNull} from 'graphql';

export const User = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: globalIdField('User'),
    email: {type: new GraphQLNonNull(GraphQLString)},
    active: {type: new GraphQLNonNull(GraphQLString)},
    createdAt: {type: new GraphQLNonNull(GraphQLString)},
    updatedAt: {type: new GraphQLNonNull(GraphQLString)},
  }),
});

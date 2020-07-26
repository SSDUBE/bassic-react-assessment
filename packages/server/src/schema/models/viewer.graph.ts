import {GraphQLObjectType} from 'graphql';
import {globalIdField} from 'graphql-relay';

export default new GraphQLObjectType({
  name: 'Viewer',
  fields: () => ({
    id: globalIdField('Viewer'),
  }),
});

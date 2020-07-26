import {
  GraphQLObjectType,
  GraphQLResolveInfo,
  // GraphQLNonNull,
  // GraphQLString,
} from 'graphql';
import Context from '../../context';
import {
  // connectionDefinitions,
  // forwardConnectionArgs,
  globalIdField,
} from 'graphql-relay';

import {User} from './query';
// import UserService from '../../services/userService';
import {AuthenticationError} from 'apollo-server-express';

export default new GraphQLObjectType({
  name: 'Viewer',
  fields: () => ({
    id: globalIdField('Viewer'),
    user: {
      type: User,
      // args: {
      //   email: {
      //     type: new GraphQLNonNull(GraphQLString),
      //   },
      // },
      resolve: async (
        _parent: any,
        // args: {[key: string]: any},
        context: Context,
        _resolveInfo: GraphQLResolveInfo
      ) => {
        if (!context.user)
          throw new AuthenticationError('User not authenticated');
        // const userData = await UserService.UserDetails(context, args.email);
        return {};
      },
    },
  }),
});

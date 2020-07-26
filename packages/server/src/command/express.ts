import express from 'express';
import {ApolloServer} from 'apollo-server-express';
// import OpentracingExtension from 'apollo-opentracing';
import bodyParser from 'body-parser';
import schema from '../schema';
// import tracer from '../tracer';

import cors from 'cors';
import helmet from 'helmet';
// import UserService from '../services/userService';
import jwt from 'jsonwebtoken';
import {createContext} from '../util';
import config from '../config';
import signupUser from '../routes/signupUser';
import signinUser from '../routes/signinUser';
import authenticateJWT from '../routes/authenticateJWT';
import {Response, NextFunction, Request} from 'express';
// import {Response, NextFunction, Request} from 'express';

const secret = config.get('oauth.secret');
const app = express();
const port = 5000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());
app.use(helmet());
app.get('/', (_req, res) => res.send('Hello world'));
app.post('/graphql', authenticateJWT);
app.post('/signin', signinUser);
app.use('/signup', signupUser);
// app.use('/verifyToken', (req: Request, res: Response, next: NextFunction) => {
//   authenticateJWT(req, res, next, true);
//   // res.send('Token valid');
// });

const apolloServer = new ApolloServer({
  schema,
  subscriptions: {},
  context: async ({req, res}: {req: any; res: Response}) => {
    if (req.headers.authorization) {
      const authHeader = req.headers.authorization;
      const [, token] = authHeader.split(' ');

      if (!token) {
        return {};
      }

      try {
        const decoded = jwt.decode(token);
        if (decoded) {
          req.user = {
            // @ts-ignore
            id: decoded.id,
            // @ts-ignore
            username: decoded.username,
          };
        }
        jwt.verify(token, secret);
        // TODO check if the user exists before giving user the write to DB
      } catch (error) {
        res.status(401).send({error: 'Token has an invalid subject'});
      }
    } else {
      req.user = {};
    }
    return createContext(req);
  },
  // TODO: disable these in future
  introspection: true,
  playground: true,
  // This allows us to easily log errors but
  // replaces a lot of the useful error logic apollo-server already does
  // formatError,
  // @ts-ignore
  // extensions: [
  //   () =>
  //     new OpentracingExtension({
  //       server: tracer,
  //       local: tracer,
  //       shouldTraceRequest: (_info: any) => {
  //         return true;
  //       },
  //     }),
  // ],
});

apolloServer.applyMiddleware({app, path: '/graphql', bodyParserConfig: true});

app.listen(port, () =>
  console.log(`🚀 Server ready at http://localhost:${port}/graphql`)
);

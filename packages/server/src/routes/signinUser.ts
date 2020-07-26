import {Response, Request} from 'express';
import {User} from '../models';
import {createContext} from '../util';
import jwt from 'jsonwebtoken';
import config from '../config';
import PasswordService from '../services/passwordService';

const secret = config.get('oauth.secret');

const signinUser = async (req: Request, res: Response) => {
  const authHeader = req.headers.authorization!;
  const encodedCredentials = authHeader.split(' ')[1];
  const decodedCredentials = Buffer.from(
    encodedCredentials,
    'base64'
  ).toString();
  const [username, password] = decodedCredentials.split(':');
  const context = createContext(req);

  const user = (await User.query().context(context)).find(
    (user) =>
      user.username === username &&
      PasswordService.verify(user.password, password)
  );

  if (user) {
    const accessToken = jwt.sign(
      {username: user.username, id: user.id},
      secret
    );
    res.json({
      accessToken,
    });
  } else {
    res.status(401).send({error: 'Username or password incorrect'});
  }
};

export default signinUser;

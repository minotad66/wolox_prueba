import { validateSignIn } from '../validation';
import { ISignIn } from '../interface';
import { getRepository } from 'typeorm';
import { UnauthorizedException } from '../../../utils/errors';
import { compare } from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { Users } from '../../users/entity';

const secret = process.env.JWT_SECRET || 'NeverTellTheSecrets';
const expiresIn = process.env.JWT_EXPIRE || 7200;

export const signIn = async (body: ISignIn) => {
  try {
    const login: ISignIn = validateSignIn(body);

    const responseUser = await getRepository(Users).findOne({
      select: ['id', 'userName', 'password', 'name', 'lastName', 'currency'],
      where: { userName: login.userName },
    });
    if (!responseUser) throw UnauthorizedException('incorrect username or password');

    const comparisonResult = await compare(login.password, responseUser.password);
    if (!comparisonResult) throw UnauthorizedException('incorrect username or password');

    const { password, ...user } = responseUser;
    const token: string = jwt.sign({ name: user.name + user.lastName, userName: user }, secret, {
      expiresIn,
    });

    return { user, token };
  } catch (err) {
    throw err;
  }
};

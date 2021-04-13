import { validateSignIn } from '../validation';
import { ISignIn } from '../interface';
import { getRepository } from 'typeorm';
import { UnauthorizedException } from '../../../utils/errors';
import { compare } from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { Users } from '../../users/entity';

const secret = process.env.JWT_SECRET || 'okhMC86gHYVH';
const expiresIn = process.env.JWT_EXPIRE || 60 * 60 * 3;

export const signIn = async (body: ISignIn) => {
  try {
    const login: ISignIn = validateSignIn(body);

    const responseUser = await getRepository(Users).findOne({
      select: ['id', 'username', 'password', 'name', 'lastName', 'currency'],
      where: { username: login.username },
    });
    if (!responseUser) throw UnauthorizedException('incorrect username or password');

    const comparisonResult = await compare(login.password, responseUser.password);
    if (!comparisonResult) throw UnauthorizedException('incorrect username or password');

    const { password, ...user } = responseUser;

    const token: string = jwt.sign(
      { id: user.id, name: user.name + user.lastName, username: user.username },
      secret,
      {
        expiresIn,
      },
    );

    return { user, token };
  } catch (err) {
    throw err;
  }
};

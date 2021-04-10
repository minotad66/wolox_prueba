import { validateUser } from '../validation';
import { IUsers } from '../interface';
import { Id } from '../../../common/interface';
import { getRepository } from 'typeorm';
import { Users } from '../entity';
import {
  InternalServerErrorException,
  NotFoundException,
  UniqueViolation,
} from '../../../utils/errors';
import { hash } from 'bcrypt';

export const findUsers = async () => {
  try {
    return await getRepository(Users).find();
  } catch (err) {
    throw err;
  }
};

export const findOneUsers = async (params: Id) => {
  try {
    const user = await getRepository(Users).findOne(params.id);

    if (!user) {
      throw NotFoundException('User not found');
    }

    return user;
  } catch (err) {
    throw err;
  }
};

export const saveUsers = async (body: IUsers) => {
  try {
    const { password, ...user }: IUsers = validateUser(body);
    const passwordHash = await hash(password, 10);

    const newUser = getRepository(Users).create({ ...user, password: passwordHash });
    const userSaved = await getRepository(Users).save(newUser);

    if (!userSaved) {
      throw InternalServerErrorException('Problem to create a user. Try again.');
    }

    return userSaved;
  } catch (err) {
    if (err.code === '23505') {
      throw UniqueViolation();
    }
    throw err;
  }
};

export const updateUsers = async (body: IUsers, params: Id) => {
  try {
    const user: IUsers = validateUser(body);
    await getRepository(Users).update(params.id, user);
    const updatedUser = await getRepository(Users).findOne(params.id);

    if (!updatedUser) {
      throw NotFoundException('User not found');
    }

    return updatedUser;
  } catch (err) {
    throw err;
  }
};

export const removeUsers = async (params: Id) => {
  try {
    const deleteUser = await getRepository(Users).delete(params.id);

    if (!deleteUser) {
      throw NotFoundException('User not found');
    }

    return {
      message: `The user with the id: ${params.id}, was successfully removed`,
    };
  } catch (err) {
    throw err;
  }
};

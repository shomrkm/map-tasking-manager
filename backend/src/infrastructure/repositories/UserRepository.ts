import { ErrorResponse } from '@/shared/core/utils';
import { User } from '@/domain/entities';
import { Email, Level, Role } from '@/domain/ValueObjects';
import { FindOptions, IUserRepository } from '@/application/repositories/IUserRepository';

import { User as UserModel } from '../mongoose/models';

export class UserRepository implements IUserRepository {
  public async findAll(): Promise<User[]> {
    const userDocs = await UserModel.find();
    return userDocs.map(
      (userDoc) =>
        new User({
          id: userDoc._id.toString(),
          name: userDoc.name,
          email: new Email(userDoc.email),
          role: new Role(userDoc.role),
          level: new Level(userDoc.level),
          avatar: userDoc.avatar,
          password: userDoc.password,
          resetPasswordToken: userDoc.resetPasswordToken ?? undefined,
          resetPasswordExpire: userDoc.resetPasswordExpire
            ? new Date(userDoc.resetPasswordExpire.toString())
            : undefined,
          createdAt: new Date(userDoc.createdAt.toString()),
        })
    );
  }

  public async find(id: string, options?: FindOptions): Promise<User> {
    const userDoc = options?.selectPassword
      ? await UserModel.findById(id).select('+password')
      : await UserModel.findById(id);
    if (!userDoc) {
      throw new ErrorResponse(`User was not found with id of ${id}`, 404);
    }
    const user = new User({
      id: userDoc._id.toString(),
      name: userDoc.name,
      email: new Email(userDoc.email),
      role: new Role(userDoc.role),
      level: new Level(userDoc.level),
      avatar: userDoc.avatar,
      password: userDoc.password,
      resetPasswordToken: userDoc.resetPasswordToken ?? undefined,
      resetPasswordExpire: userDoc.resetPasswordExpire
        ? new Date(userDoc.resetPasswordExpire.toString())
        : undefined,
      createdAt: new Date(userDoc.createdAt.toString()),
    });

    return user;
  }

  public async findByEmail(email: string, options?: FindOptions): Promise<User> {
    const userDoc = options?.selectPassword
      ? await UserModel.findOne({ email }, '+password')
      : await UserModel.findOne({ email });
    if (!userDoc) {
      throw new ErrorResponse(`User was not found with email of ${email}`, 404);
    }
    const user = new User({
      id: userDoc._id.toString(),
      name: userDoc.name,
      email: new Email(userDoc.email),
      role: new Role(userDoc.role),
      level: new Level(userDoc.level),
      avatar: userDoc.avatar,
      password: userDoc.password,
      resetPasswordToken: userDoc.resetPasswordToken ?? undefined,
      resetPasswordExpire: userDoc.resetPasswordExpire
        ? new Date(userDoc.resetPasswordExpire.toString())
        : undefined,
      createdAt: new Date(userDoc.createdAt.toString()),
    });

    return user;
  }

  public async save(user: User): Promise<User> {
    const userDto = user.toPrimitive();
    if (!user.isPersisted()) {
      const newUser = await UserModel.create(userDto);
      if (!newUser) {
        throw new ErrorResponse('Creating New User Failed', 400);
      }
      user.id = newUser._id.toString();
      return user;
    }

    const updatedUser = await UserModel.findOneAndUpdate({ _id: user.id }, userDto, {
      new: true,
      runValidators: true,
    }).select('+password');
    if (!updatedUser) {
      throw new ErrorResponse(`User was not found with id of ${user.id}`, 404);
    }
    await updatedUser.save();

    return new User({
      id: updatedUser._id.toString(),
      name: updatedUser.name,
      email: new Email(updatedUser.email),
      role: new Role(updatedUser.role),
      level: new Level(updatedUser.level),
      avatar: updatedUser.avatar,
      password: updatedUser.password,
      resetPasswordToken: updatedUser.resetPasswordToken,
      resetPasswordExpire: updatedUser.resetPasswordExpire
        ? new Date(updatedUser.resetPasswordExpire.toString())
        : undefined,
      createdAt: new Date(updatedUser.createdAt.toString()),
    });
  }

  public async delete(id: string): Promise<User> {
    const user = await UserModel.findById(id);
    if (!user) {
      throw new ErrorResponse(`User was not found with id of ${id}`, 404);
    }
    const deletedUser = new User({
      id: user._id.toString(),
      name: user.name,
      email: new Email(user.email),
      role: new Role(user.role),
      level: new Level(user.level),
      avatar: user.avatar,
      password: user.password,
      resetPasswordToken: user.resetPasswordToken,
      resetPasswordExpire: user.resetPasswordExpire
        ? new Date(user.resetPasswordExpire.toString())
        : undefined,
      createdAt: new Date(user.createdAt.toString()),
    });
    await user.remove();

    return deletedUser;
  }
}

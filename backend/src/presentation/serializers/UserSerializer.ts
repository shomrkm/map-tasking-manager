import { User } from '@/domain/entities';

const serializeSingleUser = (user: User) => {
  return {
    _id: user.id,
    name: user.name,
    email: user.email.toPrimitive(),
    role: user.role.toPrimitive(),
    level: user.level.toPrimitive(),
    avatar: user.avatar,
    createdAt: user.createdAt,
  };
};

export class UserSerializer {
  public serializeUser(user: User) {
    return serializeSingleUser(user);
  }
  public serializeUsers(users: User[]) {
    return users.map(serializeSingleUser);
  }
}

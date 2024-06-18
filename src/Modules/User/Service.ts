import { User, UserRole } from "./Entity";
import bcrypt from "bcrypt";
import { generateToken } from "../../Helper/GnrateToken";
import { UserLoginDto, UserRegisterDTO } from "./DTO";
import { myDataSource } from "../../Database/Connection";
import { hashedPassword } from "../../Helper/HashPassword";
import { getIrPhone } from "../../Helper/ChangePhone";
import { plainToClass } from "class-transformer";
import { Profile, UserStatus } from "../Profile/Entity";

export const loginUserService = async (
  data: UserLoginDto,
): Promise<{ data?: any; code: number; msg: string; token?: string }> => {
  const { username, password } = data;
  //check username exist

  // const user: IUser | null = await User.findOne({username} );
  const user = await myDataSource.getRepository(User).findOneOrFail({
    where: {
      username: username,
    },
    relations: ["profile"],
  });
  if (!user) {
    return { msg: "user not found", code: 404 };
  }
  //compare password
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    return { msg: "invalid password", code: 401 };
  }
  //generate token
  const token = generateToken(user);
  if (user.profile) {
    const profile = await myDataSource
      .getRepository(Profile)
      .findOneBy({ id: user.profile.id });
    profile.status = UserStatus.ONLINE;
    await myDataSource.getRepository(Profile).save(profile);
    return { msg: "welcome back", code: 200, token: token, data: data };
  }
  return { msg: "welcome back", code: 200, token: token, data: data };
};

export const registerUserService = async (
  data: UserRegisterDTO,
): Promise<{ data: any; code: number; msg: string; token?: string }> => {
  //check user exist
  console.log(data);
  const { username, email } = data;
  const existingUser: User | null = await myDataSource
    .getRepository(User)
    .findOneBy({ username });
  if (existingUser) {
    return { msg: "user already exist", code: 304, data: data };
  }
  //check email
  const checkEmail: User | null = await myDataSource
    .getRepository(User)
    .findOneBy({ email });
  if (checkEmail) {
    return { msg: "this email already used", code: 333, data: data };
  }
  //save user
  const user = plainToClass(User, { ...data });
  console.log(user);
  try {
    user.phone = getIrPhone(data.phone);
    user.password = await hashedPassword(data.password);
    const saveUser = await myDataSource.getRepository(User).save(user);
    const token = generateToken(saveUser);
    return { data: saveUser, msg: "welcome", code: 201, token: token };
  } catch (err) {
    return { data: err, msg: "you have an error", code: 500 };
  }
};

export const changeRoleService = async (
  id: number,
): Promise<{ code: number; msg: string }> => {
  const user = await myDataSource.getRepository(User).findOneBy({ id });
  if (!user) {
    return { code: 404, msg: "user not found" };
  }
  user.role = UserRole.ADMIN;
  await myDataSource.getRepository(User).save(user);
};
export const setUserOffline = async (id: number) => {
  const user = await myDataSource
    .getRepository(User)
    .findOne({ where: { id }, relations: ["profile"] });
  if (!user.profile) {
    return { data: "no profile", code: 404 };
  }
  const profile = await myDataSource
    .getRepository(Profile)
    .findOneBy({ id: user.profile.id });
  profile.status = UserStatus.ONLINE;
  await myDataSource.getRepository(Profile).save(profile);
};

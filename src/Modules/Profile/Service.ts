import { Profile } from "./Entity";
import { myDataSource } from "../../Database/Connection";
import { ProfileCreateDTO, ProfileUpdateDTO } from "./DTO";
import { plainToClass } from "class-transformer";
import { Job } from "../Job/Entity";
import { City } from "../City/Entity";
import { Province } from "../Province/Entity";
import { User } from "../User/Entity";
export const createProfileService = async (
  data: ProfileCreateDTO,
  userId: number,
): Promise<{ data: any; code: number }> => {
  console.log(data);
  const job = await myDataSource.getRepository(Job).findOneBy({ id: data.job });
  if (!job) {
    return { data: "شغل موجود نیست", code: 404 };
  }
  const city = await myDataSource
    .getRepository(City)
    .findOneBy({ id: data.city });
  if (!city) {
    return { data: "شهرستان موجود نیست", code: 404 };
  }
  const province = await myDataSource
    .getRepository(Province)
    .findOneBy({ id: data.province });
  if (!province) {
    return { data: "استان موجود نیست", code: 404 };
  }
  const user = await myDataSource
    .getRepository(User)
    .findOne({ where: { id: userId }, relations: ["profile"] });
  if (user.profile) {
    return { data: "در حال حاظر پروفایل برای شما وجود دارد", code: 404 };
  }
  const profile = plainToClass(Profile, { ...data });
  profile.job = job;
  profile.city = city;
  profile.province = province;
  profile.lastActivity = new Date();
  const results = await myDataSource.getRepository(Profile).save(profile);
  user.profile = results;
  await myDataSource.getRepository(User).save(user);
  return { data: results, code: 201 };
};

// export const getProfilesService = async (): Promise<{
//   data: any;
//   code: number;
// }> => {
//   const result = await myDataSource.getRepository(Profile).find();
//   return { data: result, code: 200 };
// };
export const getProfileService = async (
  userId: number,
): Promise<{ data: any; code: number }> => {
  const user = await myDataSource.getRepository(User).findOne({
    where: { id: userId },
    relations: ["profile"],
  });
  if (!user.profile) {
    return { data: "پروفایل ندارید", code: 404 };
  }
  return { data: user.profile, code: 200 };
};
export const updateProfileService = async (
  userId: number,
  data: ProfileUpdateDTO,
): Promise<{ data: any; code: number }> => {
  const user = await myDataSource.getRepository(User).findOne({
    where: { id: userId },
    relations: ["profile"],
  });
  if (!user.profile) {
    return { data: "پروفایل ندارید", code: 404 };
  }
  const job = await myDataSource.getRepository(Job).findOneBy({ id: data.job });
  if (!job) {
    return { data: "شغل موجود نیست", code: 404 };
  }
  const city = await myDataSource
    .getRepository(City)
    .findOneBy({ id: data.city });
  if (!city) {
    return { data: "شهرستان موجود نیست", code: 404 };
  }
  const province = await myDataSource
    .getRepository(Province)
    .findOneBy({ id: data.province });
  if (!province) {
    return { data: "استان موجود نیست", code: 404 };
  }
  const profile = await myDataSource
    .getRepository(Profile)
    .findOneBy({ id: user.profile.id });
  profile.lng = data.lng;
  profile.lat = data.lat;
  profile.image = data.image;
  profile.birthday = data.birthday;
  profile.sex = data.sex;
  profile.job = job;
  profile.city = city;
  profile.province = province;
  profile.lastActivity = new Date();
  const results = await myDataSource.getRepository(Profile).save(profile);
  return { data: results, code: 200 };
};
export const deleteProfileService = async (
  userId: number,
): Promise<{ data: any; code: number }> => {
  const user = await myDataSource.getRepository(User).findOne({
    where: { id: userId },
    relations: ["profile"],
  });
  if (!user.profile) {
    return { data: "پروفایل ندارید", code: 404 };
  }
  const find = await myDataSource
    .getRepository(Profile)
    .findOneBy({ id: user.profile.id });
  if (!find) {
    return { data: "not found", code: 404 };
  }
  await myDataSource.getRepository(Profile).delete(find);
  return { data: "delete successfully", code: 200 };
};

export const getNearbyUserService = async (
  latitude: number,
  longitude: number,
  radius: number,
): Promise<{ data: any; code: number }> => {
  const earthRadiusKm = 6371;

  const users = await myDataSource
    .getRepository(User)
    .createQueryBuilder("user")
    .select("user")
    .addSelect(
      `(${earthRadiusKm} * acos(
            cos(radians(:latitude)) * cos(radians(user.latitude)) *
            cos(radians(user.longitude) - radians(:longitude)) +
            sin(radians(:latitude)) * sin(radians(user.latitude))
        ))`,
      "distance",
    )
    .having("distance < :radius", { radius })
    .setParameters({ latitude, longitude })
    .orderBy("distance", "ASC")
    .getMany();

  return { data: users, code: 200 };
};

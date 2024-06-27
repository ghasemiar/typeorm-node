import { myDataSource } from "../../Database/Connection";
import { Province } from "../Province/Entity";
import { City } from "./Entity";
export const getcitiesService = async (
  provinceId: number,
): Promise<{
  data: any;
  code: number;
}> => {
  if (provinceId) {
    const province = await myDataSource
      .getRepository(Province)
      .findOneBy({ id: provinceId });
    const result = await myDataSource
      .getRepository(City)
      .findBy({ province: province });
    return { data: result, code: 200 };
  }
  return { data: "please select a province first", code: 500 };
};

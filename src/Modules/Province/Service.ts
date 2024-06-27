import { myDataSource } from "../../Database/Connection";
import { Province } from "./Entity";

export const getProvineService = async (): Promise<{
  data: any;
  code: number;
}> => {
  const result = await myDataSource.getRepository(Province).find();
  console.log(result);
  return { data: result, code: 200 };
};

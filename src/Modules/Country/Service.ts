import { Country } from "./Entity";
import { myDataSource } from "../../Database/Connection";
import { CountryUpdateDTO, CountryCreateDTO } from "./DTO";
export const createCountryService = async (
  data: CountryCreateDTO,
): Promise<{ data: any; code: number }> => {
  const results = await myDataSource.getRepository(Country).save(data);
  return { data: results, code: 201 };
};
export const getCountrysService = async (): Promise<{
  data: any;
  code: number;
}> => {
  const result = await myDataSource.getRepository(Country).find();
  return { data: result, code: 200 };
};
export const getCountryService = async (
  id: number,
): Promise<{ data: any; code: number }> => {
  const results = await myDataSource.getRepository(Country).findOneBy({
    id: id,
  });
  if (!results) {
    return { data: "not found", code: 404 };
  }
  return { data: results, code: 200 };
};
export const updateCountryService = async (
  id: number,
  data: CountryUpdateDTO,
): Promise<{ data: any; code: number }> => {
  const cat = await myDataSource.getRepository(Country).findOneBy({
    id: id,
  });
  if (!cat) {
    return { data: "not found", code: 404 };
  }
  myDataSource.getRepository(Country).merge(cat, data);
  const results = await myDataSource.getRepository(Country).save(cat);
  return { data: results, code: 200 };
};
export const deleteCountryService = async (
  id: number,
): Promise<{ data: any; code: number }> => {
  const results = await myDataSource.getRepository(Country).delete(id);
  if (!results) {
    return { data: "not found", code: 404 };
  }
  return { data: "delete successfully", code: 200 };
};

import { Job } from "./Entity";
import { myDataSource } from "../../Database/Connection";
import { JobCreateDTO, JobUpdateDTO } from "./DTO";
export const createJobService = async (
  data: JobCreateDTO,
): Promise<{ data: any; code: number }> => {
  if (data.parent) {
    const { name, parent } = data;
    const getParent = await myDataSource
      .getRepository(Job)
      .findOneBy({ id: parent });
    if (!getParent) {
      return { data: "parent id not found", code: 404 };
    }
    const cat = new Job();
    cat.parent = getParent;
    cat.name = name;
    const results = await myDataSource.getRepository(Job).save(cat);
    return { data: results, code: 201 };
  }
  const cat = new Job();
  cat.name = data.name;
  const results = await myDataSource.getRepository(Job).save(cat);
  return { data: results, code: 201 };
};

export const getJobsService = async (): Promise<{
  data: any;
  code: number;
}> => {
  const result = await myDataSource.getTreeRepository(Job).findTrees();
  console.log(result);
  return { data: result, code: 200 };
};
export const getJobService = async (
  id: number,
): Promise<{ data: any; code: number }> => {
  const results = await myDataSource.getRepository(Job).findOneBy({
    id: id,
  });
  if (!results) {
    return { data: "not found", code: 404 };
  }
  return { data: results, code: 200 };
};
export const updateJobService = async (
  id: number,
  data: JobUpdateDTO,
): Promise<{ data: any; code: number }> => {
  const job = await myDataSource.getRepository(Job).findOne({
    where: { id: id },
    relations: ["parent"],
  });
  if (!job) {
    return { data: "not found", code: 404 };
  }
  job.name && (job.name = data.name);
  if (data.parent) {
    const parent = await myDataSource
      .getRepository(Job)
      .findOneBy({ id: data.parent });
    if (!parent) {
      return { data: "parent not found", code: 404 };
    }
    job.parent = parent;
  }
  const results = await myDataSource.getRepository(Job).save(job);
  return { data: results, code: 200 };
};
export const deleteJobService = async (
  id: number,
): Promise<{ data: any; code: number }> => {
  const results = await myDataSource.getRepository(Job).delete(id);
  if (!results) {
    return { data: "not found", code: 404 };
  }
  return { data: "delete successfully", code: 200 };
};

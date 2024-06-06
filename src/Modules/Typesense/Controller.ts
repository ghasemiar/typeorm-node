import axios from "axios";
import { Request, Response } from "express";

const apiKey = "ZPKzDdH53v0dWMC5p5k5ypqhv4Y3pQSPi1prLBt5cyEuNuKT";

export const showCollections = async (req:Request,res: Response) => {
  try {
    const response = await axios.get(`http://172.24.62.191:8108/collections`, {
        headers: {
          "Content-Type": "application/json",
          "x-typesense-api-key": apiKey,
        },
      })
    res.json(response.data[0])
    console.log(response.data[0]);
  } catch (err){res.status(400).json(err)}
};

export const showCollection = async (
  req: Request,
  res: Response
): Promise<void> => {
  axios
    .get(`http://172.24.62.191:8108/collections/${req.params.name}`, {
      headers: {
        "Content-Type": "application/json",
        "x-typesense-api-key": apiKey,
      },
    })
    .then((response) => {
      const result = response.data?.fields.map((field:any) => {
        return { name: field.name, type: field.type };
      });
      res.status(200).json(result);


    })
    .catch((error) => {
      console.error("Error fetching collections:", error);
      res.status(500).json({ msg: error });
    });
};

export const deleteCollection = async (
  req: Request,
  res: Response
): Promise<void> => {
  axios
    .delete(`http://172.24.62.191:8108/collections/${req.params.name}`, {
      headers: {
        "Content-Type": "application/json",
        "x-typesense-api-key": apiKey,
      },
    })
    .then((response) => {
      res.status(200).json({ msg: "deleted" , name:response.data.name });
    })
    .catch((error) => {
      console.error("Error fetching collections:", error);
      res.status(500).json({ msg: error });
    });
};

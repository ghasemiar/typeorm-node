import axios from "axios";
import { Request, Response } from "express";

const apiKey = "HRqLKEvviPymcyPGMw4hJjoFnOkANwmIJA9VR3WAQigNCbIk";

export const showCollections = async (res: Response): Promise<void> => {
  axios
    .get(`http://172.30.34.118:8108/collections`, {
      headers: {
        "Content-Type": "application/json",
        "x-typesense-api-key": apiKey,
      },
    })
    .then((response) => {
      res.status(200).json(response.data);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
};

export const showCollection = async (
  req: Request,
  res: Response
): Promise<void> => {
  axios
    .get(`http://172.30.34.118:8108/collections/${req.params.name}`, {
      headers: {
        "Content-Type": "application/json",
        "x-typesense-api-key": apiKey,
      },
    })
    .then((response) => {
      const result = response.data?.fields.map((field) => {
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
    .delete(`http://172.30.34.118:8108/collections/${req.body.name}`, {
      headers: {
        "Content-Type": "application/json",
        "x-typesense-api-key": apiKey,
      },
    })
    .then((response) => {
      console.log("Deleted", response.data);
      res.status(200).json({ msg: "deleted" });
    })
    .catch((error) => {
      console.error("Error fetching collections:", error);
      res.status(500).json({ msg: error });
    });
};

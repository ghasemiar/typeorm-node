import axios from "axios";
import {Request,Response} from "express";

const apiKey = process.env.TYPESENSE_APIKEY

export const showCollection = async (res:Response): Promise<void> => {
    axios.get(`${process.env.TYPESENSE_URL}/collections`, {
        headers: {
            'Content-Type': 'application/json',
            'x-typesense-api-key': apiKey
        }
    })
        .then(response => {
            res.status(200).json(response.data)

        })
        .catch(error => {
            res.status(500).json(error)
        });
}
export const deleteCollection = async (req:Request,res:Response): Promise<void> => {
    axios.delete(`http://172.19.50.129:8108/collections/${req.body.name}`, {
        headers: {
            'Content-Type': 'application/json',
            'x-typesense-api-key': apiKey
        }
    })
        .then(response => {
            console.log('Deleted', response.data);
            res.status(200).json({msg:"deleted"})
        })
        .catch(error => {
            console.error('Error fetching collections:', error);
            res.status(500).json({msg:error})
        });
}


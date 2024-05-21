import axios from "axios";
import {Request,Response} from "express";

const apiKey = 'c8SVn4zjYml40ppXh7y5XZarWMTiSyDjF8qH0zilZXhdwffB'
export const showCollection = async (res:Response): Promise<void> => {
    axios.get('http://172.19.50.129:8108/collections', {
        headers: {
            'Content-Type': 'application/json',
            'x-typesense-api-key': apiKey
        }
    })
        .then(response => {
            console.log('Collections:', response.data);

        })
        .catch(error => {
            console.error('Error fetching collections:', error);
        });
}
export const deleteCollection = async (req:Request): Promise<void> => {
    axios.delete(`http://172.19.50.129:8108/collections/${req.body.name}`, {
        headers: {
            'Content-Type': 'application/json',
            'x-typesense-api-key': apiKey
        }
    })
        .then(response => {
            console.log('Deleted', response.data);

        })
        .catch(error => {
            console.error('Error fetching collections:', error);
        });
}


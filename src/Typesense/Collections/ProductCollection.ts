import {typesense} from "../Config";

export const initializeTypesenseCollection = async () => {
    try {
        const collections = await typesense.collections().retrieve();
        const collectionExists = collections.some(
            (collection) => collection.name === 'Product'
        );

        if (!collectionExists) {
            await typesense.collections().create({
                name: 'Product',
                fields: [
                    { name: 'name', type: 'string' },
                    { name: 'description', type: 'string' },
                    { name: 'year', type: 'int32' },
                    { name: 'price', type: 'int32' },
                    { name: 'category', type: 'int32' },
                    { name: 'brand', type: 'int32' },
                    {name:'image',type:'string'}
                ],
            });
            console.log('Collection created');
        } else {
            console.log('Collection already exists');
        }
    } catch (err) {
        console.error('Error initializing collection:', err);
    }
};
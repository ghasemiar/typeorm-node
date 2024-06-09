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
                    {
                        name: "id",
                        type: "string"
                    },
                    {
                        name: "name",
                        type: "string"
                    },
                    {
                        name: "description",
                        type: "string"
                    },
                    {
                        name: "year",
                        type: "int32"
                    },
                    {
                        name: "price",
                        type: "int32"
                    },
                    {
                        name: "image",
                        type: "string",
                        "optional": true
                    },
                    {
                        name: "status",
                        type: "string",
                        facet: true
                    },
                    {
                        name: "category",
                        type: "int32[]",
                        facet: true
                    },
                    {
                        name: "brand",
                        type: "int32",
                        facet: true
                    },
                    {
                        name: "user",
                        type: "int32",
                        facet: true
                    }
                ],
                default_sorting_field: "price"

            });
            console.log('Collection created');
        } else {
            console.log('Collection already exists');
        }
    } catch (err) {
        console.error('Error initializing collection:', err);
    }
};
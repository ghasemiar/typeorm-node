import typesense from "../Config";

typesense.collections().create({
    name: 'product',
    fields: [
        { name: 'id', type: 'int32' },
        { name: 'name', type: 'string' },
        { name: 'description', type: 'string' },
        { name: 'year', type: 'int32' },
        { name: 'price', type: 'int32' },
        { name: 'categoryId', type: 'int32' },
        { name: 'userId', type: 'int32' }

    ]
}).catch(err => console.log('Collection already exists',err));
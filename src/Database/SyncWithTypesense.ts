import { createConnection } from 'typeorm';
import { Product } from '../Entities/Product';
import typesense from "../Typesense/Config";


const syncWithTypesense = async () => {
    try {
        const connection = await createConnection();
        const userRepository = connection.getRepository(Product);

        // Fetch all users from the database
        const products = await userRepository.find();

        // Fetch all documents from Typesense
        const typesenseProduct = await typesense.collections('users').documents().export();
        const typesenseProductIds = typesenseProduct.split('\n').map((product: any) => JSON.parse(product).id);

        // Find and delete users from Typesense that are no longer in the database
        for (const id of typesenseProductIds) {
            if (!products.find(product => product.id === Number(id))) {
                await typesense.collections('product').documents(id.toString()).delete();
            }
        }
        await connection.close();
        console.log('Sync complete');
    } catch (error) {
        console.error('Error during sync:', error);
    }
};

// Run the sync function
syncWithTypesense();
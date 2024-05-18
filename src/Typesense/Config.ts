import Typesense from 'typesense';

const typesense = new Typesense.Client({
    nodes: [
        {
            host: 'localhost',
            port: 8108,
            protocol: 'http'
        }
    ],
    apiKey: 'your_typesense_api_key',
    connectionTimeoutSeconds: 2
});

export default typesense;
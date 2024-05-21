import Typesense from "typesense";

export const typesense = new Typesense.Client({
    nodes: [
        {
            host: '172.19.50.129',
            port: 8108,
            protocol: 'http'
        }
    ],
    apiKey: 'c8SVn4zjYml40ppXh7y5XZarWMTiSyDjF8qH0zilZXhdwffB',
    connectionTimeoutSeconds: 10
});
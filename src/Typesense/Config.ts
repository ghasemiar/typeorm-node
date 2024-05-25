import Typesense from "typesense";
export const typesense = new Typesense.Client({
    nodes: [
        {
            host: process.env.TYPESENSE_HOST||"172.30.34.118",
            port: Number(process.env.TYPESENSE_PORT)||8108,
            protocol: process.env.TYPESENSE_PROTOCOL||"http"
        }
    ],
    apiKey: process.env.TYPESENSE_APIKEY||"HRqLKEvviPymcyPGMw4hJjoFnOkANwmIJA9VR3WAQigNCbIk",
    connectionTimeoutSeconds: 10
});
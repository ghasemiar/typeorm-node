import Typesense from "typesense";
export const typesense = new Typesense.Client({
  nodes: [
    {
      host: process.env.TYPESENSE_HOST || "172.24.62.191",
      port: Number(process.env.TYPESENSE_PORT) || 8108,
      protocol: process.env.TYPESENSE_PROTOCOL || "http",
    },
  ],
  apiKey:
    process.env.TYPESENSE_APIKEY ||
    "ZPKzDdH53v0dWMC5p5k5ypqhv4Y3pQSPi1prLBt5cyEuNuKT",
  connectionTimeoutSeconds: 10,
});

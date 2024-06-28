import { typesense } from "../Config";

export const initializeTypesenseCollection = async () => {
  try {
    const collections = await typesense.collections().retrieve();
    const collectionExists = collections.some(
      (collection) => collection.name === "Product",
    );

    if (!collectionExists) {
      await typesense.collections().create({
        name: "Product",
        fields: [
          {
            name: "id",
            type: "string",
          },
          {
            name: "name",
            type: "string",
          },
          {
            name: "description",
            type: "string",
          },
          {
            name: "year",
            type: "int32",
            facet: true,
          },
          {
            name: "price",
            type: "int32",
            facet: true,
          },
          {
            name: "image",
            type: "string",
            optional: true,
          },
          {
            name: "status",
            type: "string",
            facet: true,
          },
          {
            name: "isPublic",
            type: "bool",
            facet: true,
          },
          {
            name: "category",
            type: "string[]",
            facet: true,
          },
          {
            name: "categories.lvl0",
            type: "string[]",
            facet: true,
            optional: true,
          },
          {
            name: "categories.lvl1",
            type: "string[]",
            facet: true,
            optional: true,
          },
          {
            name: "categories.lvl2",
            type: "string[]",
            facet: true,
            optional: true,
          },
          {
            name: "categories.lvl3",
            type: "string[]",
            facet: true,
            optional: true,
          },
          {
            name: "brand",
            type: "string",
            facet: true,
          },
          {
            name: "user",
            type: "string",
            facet: true,
          },
        ],
        default_sorting_field: "price",
      });
      console.log("Collection created");
    } else {
      console.log("Collection already exists");
    }
  } catch (err) {
    console.error("Error initializing collection:", err);
  }
};

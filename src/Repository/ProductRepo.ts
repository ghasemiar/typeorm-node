import { typesense } from "../Typesense/Config";

const searchProducts = async (query: string, filters: any, sort: string) => {
  try {
    const filterStrings = [];

    if (filters.year) {
      filterStrings.push(`year:=${filters.year}`);
    }
    if (filters.price) {
      if (filters.price.min) {
        filterStrings.push(`price:>=${filters.price.min}`);
      }
      if (filters.price.max) {
        filterStrings.push(`price:<=${filters.price.max}`);
      }
    }
    if (filters.brand) {
      filterStrings.push(`brand:=${filters.brand}`);
    }
    if (filters.category) {
      filterStrings.push(`category:=${filters.category}`);
    }

    const filterBy = filterStrings.join(" && ");

    const searchResults = await typesense
      .collections("Product")
      .documents()
      .search({
        q: query ? query : "*",
        query_by: "name",
        filter_by: filterBy,
        sort_by: sort,
      });

    return searchResults.hits;
  } catch (error) {
    console.error("Error searching products:", error);
    return [];
  }
};

export default searchProducts;

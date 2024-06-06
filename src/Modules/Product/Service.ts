import {Product, ProductStatus} from "./Entity";
import {myDataSource} from "../../Database/Connection";
import {ProductCreateDTO, ProductUpdateDTO} from "./DTO";
import {User, UserRole} from "../User/Entity";
import {plainToClass} from "class-transformer";
import {Brand} from "../Brand/Entity";
import {Category} from "../Category/Entity";
import {typesense} from "../../Typesense/Config";

export const createProductService = async (
  data: ProductCreateDTO,
  user: User,
  imagePath?: string
): Promise<{ data: any; code: number }> => {
  const category = await myDataSource.getRepository(Category).findOneBy({id: data.category});
  const brand = await myDataSource.getRepository(Brand).findOneBy({id: data.brand});

  if (!user || !category || !brand) {
    return { data: "something wrong with inputs", code: 404 };
  }

  const product = plainToClass(Product, { ...data });
  product.category = category;
  product.brand = brand;
  product.user = user;
  if (imagePath) product.image = imagePath;

  const result = await myDataSource.getRepository(Product).save(product);
  await typesense.collections("Product").documents().create({
    id:result.id.toString(),
    name: result.name,
    image: result.image,
    description: result.description,
    year: result.year,
    price: result.price,
    status: result.status,
    category: result.category.id,
    brand: result.brand.id,
    user: result.user.id
  });
  return { data: result, code: 201 };
};

export const getProductsService = async (): Promise<{
  data: any;
  code: number;
}> => {
  const result = await myDataSource.getRepository(Product).findBy({status : ProductStatus.ACCEPT});
  return { data: result, code: 200 };
};

export const getProductService = async (
  id: number
): Promise<{ data: any; code: number }> => {
  const results = await myDataSource.getRepository(Product).findOneBy({
    id: id,
  });
  if (!results) {
    return { data: "not found", code: 404 };
  }
  return { data: results, code: 200 };
};
export const updateProductService = async (
  id: number,
  user:User,
  data: ProductUpdateDTO,
  imagePath: any
): Promise<{ data: any; code: number }> => {
  console.log(id)
  const category =  await myDataSource.getRepository(Category).findOneBy({ id: data.category });
  const brand =  await myDataSource.getRepository(Brand).findOneBy({ id: data.brand });
  const product = await myDataSource.getRepository(Product).findOneBy({ id: id });
  if (!user || !product) {
    return { data: "Product or user not found", code: 404 };
  }
  if (data.category && !category) {
    return { data: "Category not found", code: 404 };
  }
  if (data.brand && !brand) {
    return { data: "Brand not found", code: 404 };
  }
  if (product.user == user || user.role == UserRole.ADMIN)
  {
    product.name = data.name || product.name;
    product.description = data.description;
    product.year = data.year || product.year;
    product.price = data.price || product.price;
    product.category = category;
    product.brand = brand;
    if (imagePath) {
      product.image = imagePath;
    }
    const updatedProduct = await myDataSource.getRepository(Product).save(product);
    await typesense.collections("Product").documents(id.toString()).update({
      name: updatedProduct.name,
      image: updatedProduct.image,
      description: updatedProduct.description,
      year: updatedProduct.year,
      price: updatedProduct.price,
      status: updatedProduct.status,
      category: updatedProduct.category.id,
      brand: updatedProduct.brand.id,
    });

    return {data: updatedProduct, code: 200};
  }
};

export const deleteProductService = async (
  id: number,
  user:User
): Promise<{ data: any; code: number }> => {
  const findProduct = await myDataSource.getRepository(Product).findOneBy({
    id: id,
  });
  if (!findProduct) {
    return { data: "not found", code: 404 };
  }
  if (findProduct.user == user || user.role == UserRole.ADMIN) {
    await myDataSource.getRepository(Product).delete(findProduct);
    await typesense.collections("Product").documents(id.toString()).delete();
    return { data: "deleted", code: 200 };
  }else return { data: "you dont have permission to delete this product", code: 404 };
};

export const allUserProductsService = async (
  userId: number
): Promise<{ data: any; code: number }> => {
  const user = await myDataSource.getRepository(User).findOneBy({
    id: userId,
  });
  const result = await myDataSource.getRepository(Product).findBy({ user });
  return { data: result, code: 200 };
};
export const changeStatusService = async (id:number,status:ProductStatus): Promise<{ msg: any; code: number }> =>{
  try {
    const product = await myDataSource.getRepository(Product).findOneBy({id:id})
    if (!product){
      return {msg:"not found",code:404}
    }
    product.status = status
    const result = await myDataSource.getRepository(Product).save(product)
    await typesense.collections("Product").documents(id.toString()).update({status: product.status})
    return {msg:result,code:200}
  }catch (err){
    return {msg:'something went wrong',code:500}
  }
}

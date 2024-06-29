import { Brand } from "../Modules/Brand/Entity";
import { Category } from "../Modules/Category/Entity";
import { Product } from "../Modules/Product/Entity";
import { User } from "../Modules/User/Entity";
import { myDataSource } from "../Database/Connection";
import { plainToClass } from "class-transformer";

const brand = [
  { name: "سامسونگ" },
  { name: "اپل" },
  { name: "کینگ استون" },
  { name: "ای دیتا" },
];
const category = [
  { name: "موبایل" },
  { name: "لپتاپ" },
  { name: "ذخیره سازی" },
  { name: "هوشمند", parent: 1 },
  { name: "دکمه ای", parent: 1 },
  { name: "اداری", parent: 2 },
  { name: "گیمنگ", parent: 2 },
  { name: "هارد", parent: 3 },
  { name: "فلش", parent: 3 },
];
const products = [
  {
    name: "لپتاپ سامسونگ اداری",
    des: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز",
    price: 22,
    year: 2023,
    image: "1717601081275.jpg",
    isPublic: true,
    category: 6,
    brand: 1,
    user: 1,
  },
  {
    name: "لپتاپ سامسونگ گیمینگ",
    des: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز",
    price: 44,
    year: 2022,
    image: "1717601081275.jpg",
    isPublic: true,
    category: 7,
    brand: 1,
    user: 1,
  },
  {
    name: "لپتاپ اپل اداری",
    des: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز",
    price: 32,
    year: 2022,
    image: "1717601081275.jpg",
    isPublic: true,
    category: 6,
    brand: 2,
    user: 1,
  },
  {
    name: "لپتاپ اپل گیمینگ",
    des: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز",
    price: 62,
    year: 2023,
    image: "1717601081275.jpg",
    isPublic: true,
    category: 7,
    brand: 2,
    user: 1,
  },
  {
    name: "گوشی سامسونگ هوشمند",
    des: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز",
    price: 32,
    year: 2023,
    image: "1717601081275.jpg",
    isPublic: true,
    category: 4,
    brand: 1,
    user: 1,
  },
  {
    name: "گوشی سامسونگ دکمه ای",
    des: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز",
    price: 12,
    year: 2015,
    image: "1717601081275.jpg",
    isPublic: true,
    category: 5,
    brand: 1,
    user: 1,
  },
  {
    name: "گوشی اپل هوشمند",
    des: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز",
    price: 42,
    year: 2023,
    image: "1717601081275.jpg",
    isPublic: true,
    category: 4,
    brand: 2,
    user: 1,
  },
  {
    name: "گوشی اپل دکمه ای",
    des: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز",
    price: 22,
    year: 2020,
    image: "1717601081275.jpg",
    isPublic: true,
    category: 5,
    brand: 2,
    user: 1,
  },
  {
    name: "هارد ای دیتا",
    des: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز",
    price: 22,
    year: 2020,
    image: "1717601081275.jpg",
    isPublic: true,
    category: 8,
    brand: 4,
    user: 1,
  },
  {
    name: "فلش ای دیتا",
    des: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز",
    price: 12,
    year: 2022,
    image: "1717601081275.jpg",
    isPublic: true,
    category: 9,
    brand: 4,
    user: 1,
  },
  {
    name: "هارد کینگ استون",
    des: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز",
    price: 22,
    year: 2020,
    image: "1717601081275.jpg",
    isPublic: true,
    category: 8,
    brand: 3,
    user: 1,
  },
  {
    name: "فلش کینگ استون",
    des: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز",
    price: 12,
    year: 2022,
    image: "1717601081275.jpg",
    isPublic: true,
    category: 9,
    brand: 3,
    user: 1,
  },
];

const seedDatabase = async () => {
  const brandRepository = myDataSource.getRepository(Brand);
  const categoryRepository = myDataSource.getRepository(Category);
  const productRepository = myDataSource.getRepository(Product);
  const userRepository = myDataSource.getRepository(User);

  // Save brands
  for (const brandData of brand) {
    await brandRepository.save({ name: brandData.name });
  }

  // Save categories
  for (const categoryData of category) {
    const category = new Category();
    if (categoryData.parent) {
      category.name = categoryData.name;
      category.parent = await categoryRepository.findOneBy({
        id: categoryData.parent,
      });
    }
    category.name = categoryData.name;
    await categoryRepository.save(category);
  }

  // Save products
  for (const productData of products) {
    const product = plainToClass(Product, { ...productData });
    product.category = await categoryRepository.findOneBy({
      id: productData.category,
    });
    product.brand = await brandRepository.findOneBy({ id: productData.brand });
    product.user = await userRepository.findOneBy({ id: productData.user });
    await productRepository.save(product);
  }
};
seedDatabase().catch(console.error);
export default seedDatabase;

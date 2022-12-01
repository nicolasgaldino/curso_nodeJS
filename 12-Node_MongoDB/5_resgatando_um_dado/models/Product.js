import conn from "../db/conn.js";
import { ObjectId } from "mongodb";

class Product {
  constructor(name, image, price, description) {
    this.name = name
    this.image = image
    this.price = price
    this.description = description
  };
  save() {
    const product = conn.db().collection("products").insertOne({
      name: this.name,
      image: this.image,
      price: this.price,
      description: this.description,
    });
    return product;
  };

  static getProduct() {
    const product = conn.db().collection("products").find().toArray();
    return product;
  };

  static async getProductById(id) {
    const product = await conn.db().collection("products").findOne({ _id: ObjectId(id) });
    return product;
  };
};

export default Product;

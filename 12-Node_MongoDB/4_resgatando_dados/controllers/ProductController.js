import Product from "../models/Product.js";

const ProductController = class ProductController {
  static async showProducts(req, res) {
    const products = await Product.getProduct();
    res.render("products/all", { products: products });
  };

  static createProduct(req, res) {
    res.render("products/create");
  };

  static createProductPost(req, res) {
    const name = req.body.name;
    const image = req.body.image;
    const price = req.body.price;
    const description = req.body.description;
    const product = new Product(name, image, price, description);
    product.save();
    res.redirect("/products");
  };
};

export default ProductController;

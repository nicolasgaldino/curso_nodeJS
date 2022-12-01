const ProductController = class ProductController {
  static showProducts(req, res) {
    res.render("products/all");
  };
};

export default ProductController;

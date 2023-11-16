import fs from "fs";

class ProductManager {
  constructor(filePath) {
    this.products = []; //inicializo con array vacio
    this.path = filePath || "./products.json";
    this.loadProducts();
  }

  async addProduct({title, description, price, thumbnail, code, stock}) {
    try {
      if (!title || !description || !price || !thumbnail || !code || !stock) {
        console.log("Error: debe completar todos los campos");
        return null;
      }
      const validationCode = this.products.some(product => product.code === code);
      if(validationCode){
        console.log("Error: el codigo ya existe");
        return null;
      }
      const newProduct = {
        id: this.products.length ? this.products[this.products.length - 1].id + 1 : 1,
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
      };
      this.products.push(newProduct); //push: agregando al array vacio
      await this.saveProducts();
      return newProduct;
    } catch (error) {
      console.log(error);
    }
  }

  getProducts () {
    return this.products;
  }

  getProductById (id){
    const product = this.products.find((item)=> item.id === id);
    if(product){
      return product;
    }else{
      console.log("Error no existe el id");
      return null;
    }
  }

  async deleteProduct (id) {
    try {
      const productToDelete = this.getProductById(id);
      if(!productToDelete){
        console.log("Error: no existe el producto");
        return null;
      }
      this.products = this.products.filter(item => item.id !== id);
      await this.saveProducts();
      return productToDelete;
    } catch (error) {
      console.log(error);
    }
  }

  async updateProduct (id, update) {
    try {
      const productToUpdate = this.getProductById(id);
      if(!productToUpdate){
        console.log("Error: no existe el producto");
        return null;
      }
      const index = this.products.findIndex(item => item.id === id);
      this.products[index] = {...productToUpdate, ...update};
      await this.saveProducts();
      return this.products[index];
    } catch (error) {
      console.log(error);
    } 
  }

  async saveProducts() {
    try {
      await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, 2));
    } catch (error) {
      console.log(error);
    }
  }

  async loadProducts() {
    try {
      const data = await fs.promises.readFile(this.path, "utf-8");
      if (data) {
        this.products = JSON.parse(data);
      }
    } catch (error) {
      console.log(error);
    }
  }
}

export default ProductManager;
const {readFileSync, writeFileSync} = require("fs");
const {resolve} = require("path");

const productModel = {

index: function () { 
   let file = resolve(__dirname, "../data", "products.json");
   let data = readFileSync(file);
   return JSON.parse(data);
   }, // Trae la informacion del productos.json como objeto literal.
   
one: function (id) {
   let file = resolve(__dirname, "../data", "products.json");
   let data = readFileSync(file);
   let products = JSON.parse(data);
   return products.find((product) => product.id === id);
   }, // Trae el detalle del producto.json del id indicado. La info la toma el product.controller.js.
  
create: function (data) {
   let file = resolve(__dirname, "../data", "products.json");
   let info = readFileSync(file);
   let products = JSON.parse(info);
   let lastProduct = products[products.length - 1];
   return Object({
      id: products.length == 0 ? 1 : lastProduct.id + 1,
      nameProduct: data.name,
      type: data.type,
      price: parseInt(data.price),
      image: data.image,
      alcohol: data.alcohol,
      acidez: data.acidez,
      azucar: data.azucar,
      vista: data.vista,
      nariz: data.nariz,
      boca: data.boca,
      otros: data.otros,
   });
   },
 
write: function (data) {
   let file = resolve(__dirname, "../data", "products.json");
   let info = JSON.stringify(data, null, 2);
   return writeFileSync(file, info);
   }, // "Edita" el product.json pisandolo con un nuevo archivo modificado.

};

module.exports = productModel;
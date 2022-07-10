const {readFileSync, writeFileSync} = require("fs");
const {resolve} = require("path");

const productModel = {

index: function () {
   let file = resolve(__dirname, "../data", "products.json");
   let data = readFileSync(file);
   return JSON.parse(data);
   },
   
one: function (id) {
   let file = resolve(__dirname, "../data", "products.json");
   let data = readFileSync(file);
   let products = JSON.parse(data);
   return products.find((product) => product.id === id);
   },
  
create: function (data) {
   
   let file = resolve(__dirname, "../data", "products.json");
   let info = readFileSync(file);
   let products = JSON.parse(info);
   let lastProduct = products[products.length - 1];
   return Object({
     id: products.length == 0 ? 1 : lastProduct.id + 1,
     name: data.name,
     price: parseInt(data.price),
     description: data.description,
     image: data.image,
   });
   },
 
write: function (data) {
   let file = resolve(__dirname, "../data", "products.json");
   let info = JSON.stringify(data, null, 2);
   return writeFileSync(file, info);
   },
   
};

module.exports = productModel;
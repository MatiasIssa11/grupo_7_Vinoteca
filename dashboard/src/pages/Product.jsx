import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/Product.css";

export default function Product() {
  const baseURL = "http://localhost:3000/api/products";
  const { id } = useParams();

  let [productID, setProductID] = useState(parseInt(id));

  const totalProducts = async () => {
    const endpoint = `${baseURL}`;
    const response = await fetch(endpoint);
    const responseJSON = await response.json();
    return responseJSON;
  };

  const prev = () => {
    productID === 1 ? (productID = 1) : setProductID(productID - 1);
  };
  const next = () => {
    totalProducts().then((data) => {
      productID === data.count
        ? (productID = data.count)
        : setProductID(productID + 1);
    });
  };

  let [productDetail, setProductDetail] = useState("Cargando...");

  const fetchApi = async () => {
    const endpoint = `${baseURL}/${productID}`;
    const response = await fetch(endpoint);
    const responseJSON = await response.json();
    return responseJSON;
  };

  useEffect(() => {
    fetchApi(id).then((responseJSON) => setProductDetail(responseJSON));
  }, [productID]);

  return (
    <>
      <h1> DETALLE DE PRODUCTO</h1>
      <section id="dashboard_product-caja">
        <div>
          <div className="dashboard_product-subcaja">
            <h3>PRODUCTO {productDetail.id}</h3>
            <h4>Marca: {productDetail.brand}</h4>
            <h4>Tipo: {productDetail.type}</h4>
            <h4>Precio: ${productDetail.price}.-</h4>
            <h4> Precio de descuento: ${" "}{productDetail.discountPrice ? productDetail.discountPrice : productDetail.price}.-</h4>
          </div>

          <div className="dashboard_product-subcaja">
            <h3>DATOS ANALITICOS:</h3>
            <h4>Alcohol: {productDetail.alcohol}</h4>
            <h4>Acidez total: {productDetail.acidez}</h4>
            <h4>Azucar total: {productDetail.azucar}</h4>
          </div>
      
          <div className="dashboard_product-subcaja">
            <h3>CARACTERISTICAS DEGUSTATIVAS:</h3>
            <h4>Vista: {productDetail.vista}</h4>
            <h4>Nariz: {productDetail.nariz}</h4>
            <h4>Boca: {productDetail.boca}</h4>
            <h4> Otros:{" "}{productDetail.otros ? productDetail.otros : "No tiene"}</h4>
         </div>
        </div>
        
        <img src={productDetail.image} alt={productDetail.type} />
      
      </section>
      <article id="botonera">
        <button onClick={prev}>Anterior producto</button>
        <button onClick={next}>Próximo producto</button>
      </article>
    </>
  );
}

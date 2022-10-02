import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Product() {
  const baseURL = "http://localhost:3000/api/products";
  const { id } = useParams();

  const [productDetail, setProductDetail] = useState("Cargando...");

  const fetchApi = async () => {
    const endpoint = `${baseURL}/${id}`;
    const response = await fetch(endpoint);
    const responseJSON = await response.json();
    return responseJSON;
  };

  useEffect(() => {
    fetchApi(id).then((responseJSON) => setProductDetail(responseJSON));
  }, [id]);

  return (
    <>
      <h3>PRODUCT {productDetail.id}</h3>
      <h4>Marca: {productDetail.brand}</h4>
      <h4>Typo: {productDetail.type}</h4>
      <h4>Precio: {productDetail.price}</h4>
      {productDetail.discountPrice ? (
        <h4>Precio de descuento: {productDetail.discountPrice}</h4>
      ) : (
        <h4>Precio de descuento: No tiene</h4>
      )}
      <picture>
        <img src={productDetail.image} alt={productDetail.type} />
      </picture>
      <h3>DATOS ANALITICOS:</h3>
      <h4>Alcohol: {productDetail.alcohol}</h4>
      <h4>Acidez total: {productDetail.acidez}</h4>
      <h4>Azucar total: {productDetail.azucar}</h4>
      <h3>CARACTERISTICAS DEGUSTATIVAS:</h3>
      <h4>Vista: {productDetail.vista}</h4>
      <h4>Nariz: {productDetail.nariz}</h4>
      <h4>Boca: {productDetail.boca}</h4>
    </>
  );
}

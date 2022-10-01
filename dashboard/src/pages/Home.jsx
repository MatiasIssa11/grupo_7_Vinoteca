import { useEffect, useState } from "react";

export default function Home() {
  let [userCount, setUserCount] = useState("Cargando...");
  let [productCount, setProductCount] = useState("Cargando...");
  let [categoryCount, setCategoryCount] = useState("Cargando...");
  let [lastUser, setLastUser] = useState("Cargando...");
  let [lastProduct, setLastProduct] = useState("Cargando...");

  const datosUsers = async () => {
    const info = await fetch("http://localhost:3000/api/users");
    const data = await info.json();
    return data;
  };

  const datosProducts = async () => {
    const info = await fetch("http://localhost:3000/api/products");
    const data = await info.json();
    return data;
  };

  const ultimoUsuario = async () => {
    const id = await datosUsers();
    const lastID = id.count;
    const info = await fetch("http://localhost:3000/api/users/" + lastID);
    const data = await info.json();
    return data;
  };

  const ultimoProducto = async () => {
    const id = await datosProducts();
    const lastID = id.count;
    const info = await fetch("http://localhost:3000/api/products/" + lastID);
    const data = await info.json();
    return data;
  };

  useEffect(() => {
    datosUsers().then((data) => setUserCount(data.count));
  }, []);

  useEffect(() => {
    datosProducts().then((data) => setProductCount(data.count));
  }, []);

  useEffect(() => {
    ultimoUsuario().then((data) => setLastUser(data));
  }, []);

  useEffect(() => {
    ultimoProducto().then((data) => setLastProduct(data));
  }, []);

  return (
    <>
      <h1>Home</h1>
      <article>
        <p>Cantidad de usuarios</p>
        <h2>{userCount}</h2>
      </article>
      <article>
        <p>Cantidad de productos</p>
        <h2>{productCount}</h2>
      </article>
      <article>
        <p>Cantidad de categorias</p>
        <h2>{categoryCount}</h2>
      </article>
      <article>
        <p>Ultimo usuario</p>
        <h2>
          Nombre: {lastUser.nombre} {lastUser.apellido}
        </h2>
        <h2>Email: {lastUser.email}</h2>
        <h2>Fecha de nacimiento: {lastUser.fechaNacimiento}</h2>
      </article>
      <article>
        <p>Ultimo producto</p>
        <h2>
          Producto: {lastProduct.brand} {lastProduct.type}
        </h2>
        <h2>Precio: {lastProduct.price}</h2>
      </article>
    </>
  );
}

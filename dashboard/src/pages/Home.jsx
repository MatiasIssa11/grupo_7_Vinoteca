import { useEffect, useState } from "react";

export default function Home() {
  let [userCount, setUserCount] = useState("Cargando...");

  let [productCount, setProductCount] = useState("Cargando...");

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

  useEffect(() => {
    datosUsers().then((data) => setUserCount(data.count));
  }, []);

  useEffect(() => {
    datosProducts().then((data) => setProductCount(data.count));
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
        <p>Cantidad de usuarios</p>
        <h2>A completar</h2>
      </article>
    </>
  );
}

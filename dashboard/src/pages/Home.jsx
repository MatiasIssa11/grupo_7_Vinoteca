import { useEffect, useState } from "react";

export default function Home() {
  let [userCount, setUserCount] = useState(null);
  userCount = "Cargando...";

  let [productCount, setProductCount] = useState(null);
  productCount = "Cargando...";

  let datosUsers = async () => {
    const info = await fetch("http://localhost:3000/api/users/", {});
    const data = await info.json(); //dice que hay algo mal con la promesa
    console.log(data);
    return data;
  };

  /*useEffect(() => {
    datosUsers().then((data) => setUserCount(data.count));
  }, []);*/

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

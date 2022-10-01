import { useEffect, useState } from "react";

export default function Home() {
  let [userCount, setUserCount] = useState(null);

  userCount = "Cargando";

  const datosUsers = async () => {
    const data = await fetch("http://localhost:3000/api/users", {
      mode: "no-cors", //me tiraba un error de seguridad
    });
    const users = await data.json(); //dice que hay algo mal con la promesa
    return users;
  };

  useEffect(() => {
    datosUsers();
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
        <h2>A completar</h2>
      </article>
      <article>
        <p>Cantidad de usuarios</p>
        <h2>A completar</h2>
      </article>
    </>
  );
}

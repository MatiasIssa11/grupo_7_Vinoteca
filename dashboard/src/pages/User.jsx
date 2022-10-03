import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/User.css";

export default function User() {
  const baseURL = "http://localhost:3000/api/users";
  const { id } = useParams();

  let [userID, setUserID] = useState(parseInt(id));

  const totalUsers = async () => {
    const endpoint = `${baseURL}`;
    const response = await fetch(endpoint);
    const responseJSON = await response.json();
    return responseJSON;
  };

  const prev = () => {
    userID === 1 ? (userID = 1) : setUserID(userID - 1);
  };
  const next = () => {
    totalUsers().then((data) => {
      userID === data.count ? (userID = data.count) : setUserID(userID + 1);
    });
  };

  //Al no recargar la página, queda extraña la navegacion leyendo un valor anterior en el params

  let [userDetail, setUserDetail] = useState("Cargando...");

  const fetchApi = async () => {
    const endpoint = `${baseURL}/${userID}`;
    const response = await fetch(endpoint);
    const responseJSON = await response.json();
    return responseJSON;
  };

  useEffect(() => {
    fetchApi(userID).then((responseJSON) => setUserDetail(responseJSON));
  }, [userID]);

  return (
    <>
      <h1> DETALLE DE USUARIO</h1>
      <section id="dashboard_user-caja">
        <div className="dashboard_user-subcaja">
          <h3>USUARIO {userDetail.id}</h3>
          <h4>Nombre: {userDetail.nombre}</h4>
          <h4>Apellido: {userDetail.apellido}</h4>
          <h4>Email: {userDetail.email}</h4>
          <h4>Fecha de nacimiento: {userDetail.fechaNacimiento}</h4>
          <h4>Administrador: {userDetail.isAdmin ? "Si" : "No"}</h4>
        </div>
        <img src={userDetail.avatar} alt={userDetail.email} />
      </section>

      <article id="botonera">
        <button onClick={prev}>Anterior usuario</button>
        <button onClick={next}>Próximo usuario</button>
      </article>
    </>
  );
}

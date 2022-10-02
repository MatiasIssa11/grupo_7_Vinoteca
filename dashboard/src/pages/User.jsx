import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function User() {
  const baseURL = "http://localhost:3000/api/users";
  const { id } = useParams();

  const [userDetail, setUserDetail] = useState("Cargando...");

  const fetchApi = async () => {
    const endpoint = `${baseURL}/${id}`;
    const response = await fetch(endpoint);
    const responseJSON = await response.json();
    return responseJSON;
  };

  useEffect(() => {
    fetchApi(id).then((responseJSON) => setUserDetail(responseJSON));
  }, [id]);

  return (
    <>
      <h3>USUARIO {userDetail.id}</h3>
      <h4>Nombre: {userDetail.nombre}</h4>
      <h4>Apellido: {userDetail.apellido}</h4>
      <h4>Email: {userDetail.email}</h4>
      <h4>Fecha de nacimiento: {userDetail.fechaNacimiento}</h4>
      <picture>
        <img src={userDetail.avatar} alt={userDetail.email} />
      </picture>
    </>
  );
}

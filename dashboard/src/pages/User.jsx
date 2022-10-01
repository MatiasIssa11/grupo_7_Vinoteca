import { useEffect, useState } from "react";

export default function User() {

  const baseURL = 'http://localhost:3000/api/users'
  const id = 3; // Falta logica del producto que se requiere

  const [userDetail, setUserDetail] = useState("Cargando...");
 
  const fetchApi = async () => {
    const endpoint = `${baseURL}/${id}`;
    const response = await fetch(endpoint); 
    const responseJSON = await response.json()
    return responseJSON;
  }

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
        <h4>Avatar: {userDetail.avatar}</h4>
        
      </>
  );
}
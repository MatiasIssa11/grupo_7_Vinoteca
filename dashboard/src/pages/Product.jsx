import { useEffect, useState } from "react";

export default function Product() {

  const dataProduct = 'http://localhost:3000/api/products/1'
  //const [todos, setTodos] = useState()
  const fetchApi = async () => {
    const response = await fetch(dataProduct); 
      console.log(response.statusText)

    //const respondeJSON = response.json()

  }

  useEffect(() => {
    fetchApi()
  }, [])

  return (
    <>
      <h1>Product no funcas</h1>
    </>
  );
}

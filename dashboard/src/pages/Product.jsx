import { useEffect, useState } from "react";

export default function Product() {

  const dataProduct = 'http://localhost:3000/api/products/'
  const [todos, setTodos] = useState()
  const fetchApi = async () => {
    const response = await fetch(dataProduct, {
      mode: "no-cors"
    }); 
    
    console.log(response.statusText)
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

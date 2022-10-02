import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Home.css";

export default function Home() {
  let [userCount, setUserCount] = useState("Cargando...");
  let [productCount, setProductCount] = useState("Cargando...");
  let [categoryCount, setCategoryCount] = useState("Cargando...");
  let [lastUser, setLastUser] = useState("Cargando...");
  let [lastProduct, setLastProduct] = useState("Cargando...");
  let [users, setUsers] = useState([]);
  let [userPage, setUserPage] = useState(1);
  let [products, setProducts] = useState([]);
  let [productPage, setProductPage] = useState(1);

  //Todos los datos de los usuarios

  const datosUsers = async (page = 1) => {
    const info = await fetch("http://localhost:3000/api/users/?page=" + page);
    const data = await info.json();
    return data;
  };

  useEffect(() => {
    datosUsers(1).then((data) => setUserCount(data.count));
  }, []);

  //Todos los datos de los productos

  const datosProducts = async (page = 1) => {
    const info = await fetch(
      "http://localhost:3000/api/products/?page=" + page
    );
    const data = await info.json();
    return data;
  };

  useEffect(() => {
    datosProducts(1).then((data) => setProductCount(data.count));
  }, []);

  //Buscamos el ultimo usuario

  const ultimoUsuario = async () => {
    const id = await datosUsers(1);
    const lastID = id.count;
    const info = await fetch("http://localhost:3000/api/users/" + lastID);
    const data = await info.json();
    return data;
  };

  useEffect(() => {
    ultimoUsuario().then((data) => setLastUser(data));
  }, []);

  //Buscamos el ultimo producto

  const ultimoProducto = async () => {
    const id = await datosProducts(1);
    const lastID = id.count;
    const info = await fetch("http://localhost:3000/api/products/" + lastID);
    const data = await info.json();
    return data;
  };

  useEffect(() => {
    ultimoProducto().then((data) => setLastProduct(data));
  }, []);

  // Paginas de los usuarios

  const nextUser = () =>
    datosUsers().then((data) =>
      userPage < data.lastPage
        ? setUserPage(userPage + 1)
        : setUserPage(data.lastPage)
    );

  const prevUser = () =>
    userPage > 1 ? setUserPage(userPage - 1) : setUserPage(1);

  useEffect(() => {
    datosUsers(userPage).then((data) => setUsers(data.users));
  }, [userPage]);

  // Paginas de los productos

  const nextProduct = () =>
    datosProducts().then((data) =>
      productPage < data.lastPage
        ? setProductPage(productPage + 1)
        : setProductPage(data.lastPage)
    );
  const prevProduct = () =>
    productPage > 1 ? setProductPage(productPage - 1) : setProductPage(1);

  useEffect(() => {
    datosProducts(productPage).then((data) => setProducts(data.products));
  }, [productPage]);

  return (
    <>
      <h1>Dashboard CavaWines</h1>

      <section id='dashboard_datos-resumen'>
        <article className='dashboard_subcaja-datos'>
          <p>Usuarios:</p>
          <p>{userCount}</p>
        </article>
        <article className='dashboard_subcaja-datos'>
          <p>Productos:</p>
          <p>{productCount}</p>
        </article>
        <article className='dashboard_subcaja-datos'>
          <p>Categorias:</p>
          <p>{categoryCount}</p>
        </article>
      </section>

      <section id="dashboard_caja-ultimos">
        <article className="dashboard_subcaja-ultimo">
          <h2>Ultimo usuario: </h2>
          <p>Usario ID: {lastUser.id}</p>
          <p>
            Nombre: {lastUser.nombre} {lastUser.apellido}
          </p>
        </article>
        <article className="dashboard_subcaja-ultimo">
          <h2>Ultimo producto: </h2>
          <p>Producto ID: {lastProduct.id}</p>
          <p>
            Producto: {lastProduct.brand} {lastProduct.type}
          </p>
        </article>
      </section>

      <section id="dashboard_caja-madre-listados">
        <section id="dashboard_caja-listado-usuarios">
          <h3>Listado de usuarios</h3>
          {users.map((u) => (
            <article key={u.id}>
              <div>
                <p>ID: {u.id}</p>
                <p>
                  Nombre: {u.nombre} {u.apellido}
                </p>
                <p>Email: {u.email}</p>
                <p>
                  Detalle: <Link to={`/user/${u.id}`}>Link</Link>{" "}
                </p>
              </div>
              <picture>
                <img src={u.avatar} alt={u.email} />
              </picture>
            </article>
          ))}
          <article id="botonera">
            <button onClick={prevUser}>Página anterior</button>
            <p> {userPage} </p>
            <button onClick={nextUser}>Próxima página</button>
          </article>
        </section>
        <section id="dashboard_caja-listado-productos">
          <h3>Listado de productos</h3>
          {products.map((p) => (
            <article key={p.id}>
              <div>
                <p>ID: {p.id}</p>
                <p>
                  Nombre: {p.brand} {p.type}
                </p>
                <p>Precio: {p.price}</p>
                <p>
                  Detalle: <Link to={`/product/${p.id}`}>Link</Link>
                </p>
              </div>
              <picture>
                <img src={p.image} alt={p.type} />
              </picture>
            </article>
          ))}
          <article id="botonera">
            <button onClick={prevProduct}>Página anterior</button>
            <p> {productPage} </p>
            <button onClick={nextProduct}>Próxima página</button>
          </article>
        </section>
      </section>
    </>
  );
}

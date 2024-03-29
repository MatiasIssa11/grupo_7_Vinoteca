import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PieChart from '../charts/PieChart';

export default function Home() {
  let [userCount, setUserCount] = useState("Cargando...");
  let [productCount, setProductCount] = useState("Cargando...");
  let [categoryCount, setCategoryCount] = useState("Cargando...");
  let [categories, setCategories] = useState([]);
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
    datosUsers().then((data) => setUserCount(data.count));
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
    datosProducts().then((data) => setProductCount(data.count));
  }, []);

  //Cantidad de categorias

  useEffect(() => {
    datosProducts().then((data) =>
      setCategoryCount(Object.keys(data.categoriesGrouping).length)
    );
  }, []);

  // Categorias

  useEffect(() => {
    datosProducts().then((data) =>
      setCategories(Object.values(data.categoriesGrouping))
    );
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
      <h1 style={{ backgroundColor:'#260F09', margin:'0 0 10px 0', padding:'10px', textAlign:'center', borderRadius: '10px'}}>Dashboard CavaWines</h1>
      
      <section id="dashboard_datos-resumen">

        <div>
          <div id="dashboard_datos-caja-datos">
            <article className="dashboard_subcaja-datos">
              <h4>USUARIOS:</h4>
              <p>{userCount}</p>
            </article>
            <article className="dashboard_subcaja-datos">
              <h4>PRODUCTOS:</h4>
              <p>{productCount}</p>
            </article>
            <article className="dashboard_subcaja-datos">
              <h4>CATEGORIAS:</h4>
              <p>{categoryCount}</p>
            </article>
          </div>

        <section id="dashboard_caja-ultimos">
          <article className="dashboard_subcaja-ultimo">
            <h2>ÚLTIMO USUARIO: </h2>
            <p>Usario ID: {lastUser.id}</p>
            <p>
              Nombre: {lastUser.nombre} {lastUser.apellido}
            </p>
          </article>
          <article className="dashboard_subcaja-ultimo">
            <h2>ÚLTIMO PRODUCTO: </h2>
            <p>Producto ID: {lastProduct.id}</p>
            <p>
              Producto: {lastProduct.brand} {lastProduct.type}
            </p>
          </article>
        </section>
        </div>
   
        <div id='dashboard_caja-grafico'>
          <h4> VINOS POR CATEGORIA </h4>
          <div id='grafico'>
            <PieChart data={categories}/>
          </div>
        </div>
      
      </section>
      <section id="dashboard_caja-madre-listados">
        <section id="dashboard_caja-listado-usuarios">
          <h3>USUARIOS</h3>
          {users.map((u) => (
            <article key={u.id}>
              <div>
                <p style={{ fontWeight: "bold", fontSize: '14px', backgroundColor:'#742d1c', width:'40px', borderRadius:'5px', textAlign:'center'}}>ID: {u.id}</p>
                <p>
                  Nombre: {u.nombre} {u.apellido}
                </p>
                <p>Email: {u.email}</p>
                <p>
                <Link style={{ fontWeight: "bold" }} to={`/user/${u.id}`}>Ver detalle</Link>{" "}
                </p>
              </div>
                <img src={u.avatar} alt={u.email} />
            </article>
          ))}
          <section id="botonera">
            <button onClick={prevUser}>Página anterior</button>
            <p> {userPage} </p>
            <button onClick={nextUser}>Próxima página</button>
          </section>

        </section>
        <section id="dashboard_caja-listado-productos">
          <h3>PRODUCTOS</h3>
          {products.map((p) => (
            <article key={p.id}>
              <div>
                <p style={{ fontWeight: "bold", fontSize: '14px', backgroundColor:'#742d1c', width:'40px', borderRadius:'5px', textAlign:'center'}}>ID: {p.id}</p>
                <p>
                  Nombre: {p.brand} {p.type}
                </p>
                <p>Precio: ${p.price}.-</p>
                <p>
                <Link style={{ fontWeight: "bold" }} to={`/product/${p.id}`}>Ver detalle</Link>
                </p>
              </div>
                <img src={p.image} alt={p.type} />
            </article>
          ))}
          <section id="botonera">
            <button onClick={prevProduct}>Página anterior</button>
            <p> {productPage} </p>
            <button onClick={nextProduct}>Próxima página</button>
          </section>
        </section>
      </section>
    </>
  );
}

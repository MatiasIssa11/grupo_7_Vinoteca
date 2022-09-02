-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 02-09-2022 a las 02:06:15
-- Versión del servidor: 10.4.24-MariaDB
-- Versión de PHP: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `cava-wines`
--
CREATE DATABASE IF NOT EXISTS `cava-wines` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `cava-wines`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cartproducts`
--

CREATE TABLE `cartproducts` (
  `id` int(11) NOT NULL,
  `idCart` int(11) NOT NULL,
  `idProducts` int(11) NOT NULL,
  `priceProducts` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `carts`
--

CREATE TABLE `carts` (
  `id` int(11) NOT NULL,
  `idUser` int(11) NOT NULL,
  `envio` tinyint(1) NOT NULL,
  `total` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `images`
--

CREATE TABLE `images` (
  `id` int(11) NOT NULL,
  `path` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `images`
--

INSERT INTO `images` (`id`, `path`) VALUES
(1, 'malbec-roble.jpg'),
(2, 'cabernet-Sauvignon.jpg'),
(3, 'malbec.jpg'),
(4, 'image-1658594505254-137864522.jpg'),
(5, 'image-1658594575603-811150713.jpg'),
(6, 'image-1658594638612-673176849.jpg'),
(7, 'image-1658594700252-144028169.jpg'),
(8, 'image-1658602237101-933239737.jpg'),
(9, 'avatar-1661957618700-892612406.jpg'),
(10, 'avatar-1661900921910-165863048.jpg'),
(11, 'avatar-1661900328424-501517819.jpg'),
(12, 'default-user.svg'),
(13, 'default-user.svg'),
(14, 'default-user.svg'),
(15, 'avatar-1661968137427-662879373.jpg'),
(16, 'default-user.svg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `nameproducts`
--

CREATE TABLE `nameproducts` (
  `id` int(11) NOT NULL,
  `nameProduct` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `nameproducts`
--

INSERT INTO `nameproducts` (`id`, `nameProduct`) VALUES
(1, 'Terravita');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `brand` int(11) NOT NULL,
  `type` int(11) NOT NULL,
  `price` int(11) NOT NULL,
  `discountPrice` int(11) DEFAULT NULL,
  `image` int(11) NOT NULL,
  `alcohol` varchar(255) NOT NULL,
  `acidez` varchar(255) NOT NULL,
  `azucar` varchar(255) NOT NULL,
  `vista` text NOT NULL,
  `nariz` text NOT NULL,
  `boca` text NOT NULL,
  `otros` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `products`
--

INSERT INTO `products` (`id`, `brand`, `type`, `price`, `discountPrice`, `image`, `alcohol`, `acidez`, `azucar`, `vista`, `nariz`, `boca`, `otros`) VALUES
(1, 1, 1, 10000, 9000, 1, '13,30%', '5,50 g/l', '1,90 g/l', 'Rojo oscuro con reflejos bordó.', 'De gran complejidad aromática, se perciben notas a fruta madura que recuerdan a las ciruelas, al agitar la copa aparecen notas a vainilla, caramelo y chocolate.', 'Vino aterciopelado, con taninos estructurados, de baja acidez, con un retrogusto agradable.', ''),
(2, 1, 2, 5072, 4000, 2, '13,30%', '5,30 g/l', '1,80 g/l', 'Rojo intenso con reflejos violáceos.', 'Vino joven, fresco, con notas a pimiento verde, propias de la variedad, con dejos a cerezas y ciruelas maduras.', 'De entrada agradable, con taninos amables, de estructura media.', ''),
(3, 1, 3, 5072, 4500, 3, '13,30%', '5,40 g/l', '1,90 g/l', 'Rojo cereza brillante.', 'Se perciben notas a frutas rojas maduras, que recuerdan a las ciruelas, guindas y moras, con toques sutiles a violetas y regaliz.', 'Vino ligero, fácil de beber, de estructura media y alta frescura, con un agradable retrogusto.', ''),
(4, 1, 4, 6550, 5250, 4, '12,60%', '5,20g/l ', '4g/l', 'Rosa', 'De carácter frutal (frutillas y cerezas) con notas florales.', 'Entrada amable. Posee una acidez marcada, pero integrada. Tiene persistencia en el final de boca.', ''),
(5, 1, 5, 4860, NULL, 5, '13,30%', '13,30%', '2,10 g/l', 'Brillante, rojo rubí con reflejos bordó.', 'Con notas a frutas rojas frescas que recuerdan a moras, frutillas, cerezas y con un fondo especiado.', 'Un vino agradable con entrada suave, estructurado, con buen balance tánico.', ''),
(6, 1, 6, 3500, NULL, 6, '13,8%', '6,0 g/l', '1,80 g/l', 'De color amarillo verdoso con reflejos acerados.', 'Se perciben notas a frutas frescas que recuerdan a pomelo, durazno, ananá y lichi, que se combinan perfectamente con dejos a ruda y azahares.', 'Posee una entrada ligera con equilibrada acidez, de buena untuosidad y prolongada duración.', ''),
(7, 1, 7, 9200, NULL, 7, '13,5%', '5,8 g/l', '2,4 g/l', 'Rojo rubí con reflejos bordo.', 'Es un vino especiado, en donde se perciben notas canela, pimienta negra con dejos a notas frutales como frambuesas y ciruelas.', 'Entrada suave, estructurada media, levemente ácido, con taninos amables.', ''),
(8, 1, 8, 8700, NULL, 8, '14,00', '5,3 g/l', '1,80 g/l', 'Rojo rubí con reflejos violetas.', 'Vino fresco, joven, se perciben aromas a fruta fresca que recuerdan a las frutillas, cerezas, ciruelas, con un dejo sutil a rosas.', 'Entrada ligera, levemente ácido, evoluciona con el paso del tiempo, en donde se acentúa lo percibido en nariz.', 'SO2 libre: 5,2 mg/l - SO2 total: 14 mg/l');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `producttypes`
--

CREATE TABLE `producttypes` (
  `id` int(11) NOT NULL,
  `type` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `producttypes`
--

INSERT INTO `producttypes` (`id`, `type`) VALUES
(1, 'Malbec Roble Organico'),
(2, 'Cabernet Sauvignon'),
(3, 'Malbec'),
(4, 'Rosé'),
(5, 'Bonarda'),
(6, 'Torrontés'),
(7, 'Syrah'),
(8, 'Malbec sin sulfito');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sequelizemeta`
--

CREATE TABLE `sequelizemeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `sequelizemeta`
--

INSERT INTO `sequelizemeta` (`name`) VALUES
('20220818212059-images.js'),
('20220818213745-users.js'),
('20220820004704-nameProducts.js'),
('20220820004743-productTypes.js'),
('20220820004814-carts.js'),
('20220821211730-products.js'),
('20220822004826-cartProducts.js');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `apellido` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `fechaNacimiento` date NOT NULL,
  `avatar` int(11) NOT NULL,
  `password` text NOT NULL,
  `isAdmin` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `nombre`, `apellido`, `email`, `fechaNacimiento`, `avatar`, `password`, `isAdmin`) VALUES
(1, 'Anibal', 'Fernandez', 'csyne2o@washington.edu', '1971-11-10', 9, 'UXCLDtHO', 0),
(2, 'Heaven', 'Music', 'amilby2p@nsw.gov.au', '1966-12-11', 10, 'lEVshY6SO', 0),
(3, 'Kemetira', 'Cubilla', 'fjosovich2q@who.int', '1974-05-03', 11, 'JdRU3Hui', 0),
(4, 'Shelton', 'Lugden', 'slugden2r@wufoo.com', '1988-10-19', 12, 'zyMXdL3Yll', 0),
(5, 'Matias', 'Issa', 'matias.issa@gmail.com', '1900-01-01', 13, '123', 0),
(6, 'Matías Adrián', 'Alonso', 'mati.alonso88@cavawines.com', '1988-03-25', 14, '$2a$10$LUpyOX6h37uK23MEHYCQWu46x5vqYopkVVQA0spicoFD.91O5wtym', 1),
(7, 'Sergio', 'Massa', 'sergio.massa@hotmail.com', '1999-12-26', 15, '$2a$10$LLr9pROcmjd4/juyLIIgze1yiINc2IdftqXwXs96AbyT3LVHhvh/6', 0),
(8, 'Agustin', 'Collados', 'agustin.collados@cavawines.com', '1986-06-18', 16, '$2a$10$qOaH9Ymh3LUuXhIPiQLyheGkCUGdVBG08d0WpjhpNeiS9ZxkbapTe', 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `cartproducts`
--
ALTER TABLE `cartproducts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idCart` (`idCart`),
  ADD KEY `idProducts` (`idProducts`),
  ADD KEY `priceProducts` (`priceProducts`);

--
-- Indices de la tabla `carts`
--
ALTER TABLE `carts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idUser` (`idUser`);

--
-- Indices de la tabla `images`
--
ALTER TABLE `images`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `nameproducts`
--
ALTER TABLE `nameproducts`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `brand` (`brand`),
  ADD KEY `type` (`type`),
  ADD KEY `image` (`image`);

--
-- Indices de la tabla `producttypes`
--
ALTER TABLE `producttypes`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `sequelizemeta`
--
ALTER TABLE `sequelizemeta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `avatar` (`avatar`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `cartproducts`
--
ALTER TABLE `cartproducts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `carts`
--
ALTER TABLE `carts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `images`
--
ALTER TABLE `images`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT de la tabla `nameproducts`
--
ALTER TABLE `nameproducts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `producttypes`
--
ALTER TABLE `producttypes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `cartproducts`
--
ALTER TABLE `cartproducts`
  ADD CONSTRAINT `cartproducts_ibfk_1` FOREIGN KEY (`idCart`) REFERENCES `carts` (`id`),
  ADD CONSTRAINT `cartproducts_ibfk_2` FOREIGN KEY (`idProducts`) REFERENCES `products` (`id`),
  ADD CONSTRAINT `cartproducts_ibfk_3` FOREIGN KEY (`priceProducts`) REFERENCES `products` (`id`);

--
-- Filtros para la tabla `carts`
--
ALTER TABLE `carts`
  ADD CONSTRAINT `carts_ibfk_1` FOREIGN KEY (`idUser`) REFERENCES `users` (`id`);

--
-- Filtros para la tabla `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`brand`) REFERENCES `nameproducts` (`id`),
  ADD CONSTRAINT `products_ibfk_2` FOREIGN KEY (`type`) REFERENCES `producttypes` (`id`),
  ADD CONSTRAINT `products_ibfk_3` FOREIGN KEY (`image`) REFERENCES `images` (`id`);

--
-- Filtros para la tabla `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`avatar`) REFERENCES `images` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

const { user } = require("../../database/models/index");

module.exports = {
  all: async (req, res) => {
    try {
      let pages = req.query.page ? (parseInt(req.query.page) - 1) * 4 : 0;
      let usersDB = await user.findAll({
        include: { all: true },
        limit: 4,
        offset: pages,
      });

      let previousPage = pages === 0 ? 1 : pages / 4;
      let nextPage = pages / 4 + 2;

      let previous = "http://localhost:3000/api/users/?page=" + previousPage;
      let next = "http://localhost:3000/api/users/?page=" + nextPage;

      //Adecuación de los datos de los usuarios

      let users = usersDB.map((u) =>
        Object({
          id: u.id,
          nombre: u.nombre,
          apellido: u.apellido,
          email: u.email,
          fechaNacimiento: u.fechaNacimiento,
          avatar: "http://localhost:3000/users/" + u.image.path,
          isAdmin: u.isAdmin,
          detail: "http://localhost:3000/api/users/" + u.id,
        })
      );

      let count = await user.count(); //Consulto la cantidad de registros

      let lastPage = Math.ceil(count / 4);

      let response = {
        count: count,
        users,
        previous,
        next,
        lastPage,
      };

      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  one: async (req, res) => {
    try {
      let findUSer = await user.findByPk(req.params.id, {
        include: { all: true },
      });

      if (!findUSer) {
        return res.status(404).json("No existe este usuario");
      } else {
        let oneUser = {
          id: findUSer.id,
          nombre: findUSer.nombre,
          apellido: findUSer.apellido,
          email: findUSer.email,
          fechaNacimiento: findUSer.fechaNacimiento,
          avatar: "http://localhost:3000/users/" + findUSer.image.path,
          isAdmin: findUSer.isAdmin,
        };

        return res.status(200).json(oneUser);
      }
    } catch (error) {
      return res.status(500).json(error);
    }
  },
};

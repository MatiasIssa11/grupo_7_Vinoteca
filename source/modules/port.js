let portNumber = 3000;

module.exports = {
  port: process.env.PORT || portNumber,
  callback: function () {
    console.log("Server is running on LocalHost:" + portNumber);
  },
};

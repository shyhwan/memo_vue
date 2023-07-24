const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "login-testtt.cqrqtj4tt0ry.ap-northeast-2.rds.amazonaws.com",
  user: "admin",
  password: "Dkagh4$%^",
  database: "login_testtt",
});

module.exports = {
  async run(query, params) {
    return new Promise((resolve) => {
      //   connection.connect();

      connection.query(query, params, (error, rows, fields) => {
        if (error) throw error;
        console.log("Memo info is: ", rows);
        resolve(rows);
        //connection.end();
      });
    });
  },
};

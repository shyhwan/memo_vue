const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "dkagh",
  database: "memo",
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

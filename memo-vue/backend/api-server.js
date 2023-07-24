const express = require("express");
const app = express();
const PORT = 3000;
const bodyParser = require("body-parser");
const database = require("./database");

const memos = ["메모 1 내용", "메모 2 내용", "메모 3 내용"];

app.use(bodyParser.json());

app.get("/api/memos", async (req, res) => {
  const result = await database.run("SELECT * FROM memos");
  res.send(result);
});

app.post("/api/memos", async (req, res) => {
  await database.run(`INSERT INTO memos(content) VALUES(?);`, [
    req.body.content,
  ]);
  const result = await database.run("SELECT * FROM memos");
  res.send(result);
});

app.put("/api/memos/:id", async (req, res) => {
  await database.run(`UPDATE memos SET content = ? WHERE id = ?;`, [
    req.body.content,
    req.params.id,
  ]);
  const result = await database.run("SELECT * FROM memos");
  res.send(result);
});

app.delete("/api/memos/del/:id", async (req, res) => {
  console.log("here");
  await database.run(`DELETE FROM memos WHERE id = ?;`, [req.params.id]);
  const result = await database.run("SELECT * FROM memos");
  res.send(result);
});

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});

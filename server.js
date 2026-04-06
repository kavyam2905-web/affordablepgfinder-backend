const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const filePath = "./data.json";

app.get("/pgs", (req, res) => {
  const data = JSON.parse(fs.readFileSync(filePath));
  res.json(data);
});

app.post("/pgs", (req, res) => {
  const data = JSON.parse(fs.readFileSync(filePath));

  const newPG = {
    id: data.length + 1,
    name: req.body.name,
    place: req.body.place,
    rent: req.body.rent,
    facilities: req.body.facilities,
    owner: req.body.owner
  };

  data.push(newPG);

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  res.status(201).json(newPG);
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/programas", (req, res) => {
    db.query("SELECT * FROM programas", (err, results) => {
        if (err) {
            res.status(500).json(err);
        } else {
            res.json(results);
        }
    });
});

app.listen(3000, () => {
    console.log("Servidor corriendo en http://localhost:3000");
});

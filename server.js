// console.log ("hola shanelle");
//  console.log("nodemon funcionando");

const express = require("express");
const morgan = require("morgan");

const app = express();
  
const productos = [
  {
    id: 1,
    nombre: "celular",
    precio: "56000",
  },
];

app.use(morgan("dev"));
app.use(express.json());

//C crear
app.post("/creando", (req, res) => {
  const productoNuevo = { ...req.body, id: productos.length + 1 };
  productos.push(productoNuevo);
  res.send(productoNuevo);
});

//R leer
app.get("/productos", (req, res) => {
  res.json(productos);
});

app.put("/modificando", (req, res) => {
  res.send("modificando productos");
});
app.delete("/eliminando", (req, res) => {
  res.send("eliminando productos");
});
app.get("/productos/:id", (req, res) => {
  const cosa = productos.find(function (producto){
    return producto.id === parseInt(req.params.id);
  });
  res.json(cosa);
});

app.listen(3000);
console.log(`servidor funcionando en puerto ${3000}`);

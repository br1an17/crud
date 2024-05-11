// console.log ("hola shanelle");
//  console.log("nodemon funcionando");

const express = require("express");
const morgan = require("morgan");

const app = express();

let productos = [
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

app.put("/modificando/:id", (req, res) => {
  const nuevoP = req.body;
  const unProducto = productos.find(
    (producto) => producto.id === parseInt(req.params.id)
  );

  if (!unProducto) {
    res.status(404).json({ message: "producto no encontrado" });
  }

  productos = productos.map((p) =>
    p.id === parseInt(req.params.id) ? { ...p, ...nuevoP } : p
  );

  res.json({
    message:"producto actualizado"
});
});

app.delete("/eliminando/:id", (req, res) => {
  const unProducto = productos.find(
    (producto) => producto.id === parseInt(req.params.id)
  );

  if (!unProducto) {
    res.status(404).json({ message: "producto no encontrado" });
  }
  productos = productos.filter(
    (producto) => producto.id !== parseInt(req.params.id)
  );

  res.sendStatus(204);
});

//R leer un solo producto
app.get("/productos/:id", (req, res) => {
  const unProducto = productos.find(
    (producto) => producto.id === parseInt(req.params.id)
  );

  if (!unProducto) {
    res.status(404).json({ message: "producto no encontrado" });
  }
  res.json(unProducto);
});

app.listen(3000);
console.log(`servidor funcionando en puerto ${3000}`);

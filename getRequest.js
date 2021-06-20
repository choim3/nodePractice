const express = require("express");
const app = express();

const tacos = [
  { id: 1, name: "Chukis", type: "steak" },
  { id: 2, name: "Red", type: "pork" },
  { id: 3, name: "Juanitos", type: "chicken" },
];

// get has 2 arguments. First being the path (which is currently set to the root) and a second argument which is a
// callback function (that takes the request and response) the callback function will run once we have a get request to the path
app.get("/", (req, res) => {
  res.send("Hello world");
});

app.get("/tacos", (req, res) => {
  res.send(tacos);
});

app.get("/tacos/:id", (req, res) => {
  // Go through and find the id of the given id within the param
  const taco = tacos.find((a) => a.id === parseInt(req.params.id));
  // send a 404 code if it doesn't exist with a message
  if (!taco) return res.status(404).send("Invalid id");
  // send the results back
  res.send(taco);
});
// Route Params and Querys

// app.get("/tacos/:id", (req, res) => {
//   // to get the params use .params
//   // params is for required values

//   res.send(req.params.id);

//   // query is for other optional values
//   res.send(req.query);
// });

// ports and port listener
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Port ${port} is running`));

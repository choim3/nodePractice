const express = require("express");
const Joi = require("joi");
const app = express();
app.use(express.json());

const foods = [
  {
    id: 1,
    name: "steak",
  },
  {
    id: 2,
    name: "chicken tendies",
  },
];

app.get("/", (req, res) => {
  res.send("DATA");
});

app.get("/foods", (req, res) => {
  res.send(foods);
});

// PATCH
app.put("/foods/:id", (req, res) => {
  const food = foods.find((a) => a.id === parseInt(req.params.id));
  if (!food) {
    return res.status(404).send("Invalid id");
  }
  // Call helper validation function
  // Destructuring
  const { error } = validateFood(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  food.name = req.body.name;
});

// validation function helper
function validateFood(food) {
  const schema = {
    name: Joi.string().min(3).required(),
  };
  return Joi.validate(food, schema);
}

const port = process.env.PORT || 3000;
app.listen(port, console.log(`port ${port} is online`));

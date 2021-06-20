const express = require("express");
const app = express();

// joi returns a class so capital J
const Joi = require("joi");

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

// POST STUFF HERE

app.post("/foods", (req, res) => {
  // set up schema of the object and what you want it to have
  const schema = {
    name: Joi.string().min(3).required(),
  };
  // validate the stuff through JOI
  const result = Joi.validate(req.body, schema);
  console.log(result);
  if (result.error) {
    return res.status(400).send(result.error.details[0].message);
  }

  // quick input validations
  //   if (!req.body.name || req.body.name.length < 3) {
  //     res
  //       .status(400)
  //       .send("Name is required and name should be at least 3 characters");
  //     return;
  //   }
  const food = {
    id: foods.length + 1,
    name: req.body.name,
  };
  foods.push(food);
  res.send(food);
});

const port = process.env.PORT || 3000;
app.listen(port, console.log(`port ${port} is running`));

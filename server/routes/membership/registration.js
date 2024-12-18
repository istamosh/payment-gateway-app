const express = require("express");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const router = express.Router();

router.use(express.json(), logger);

const payload = {
  status: 102,
  message: "" | null,
  data: null,
};

router.get("/:customerId", (req, res) => {
  res
    .status(200)
    .json({ ...payload, message: `customer ID: ${req.params.customerId}` });
  return;
});

router.post("/", validator, async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
  const userData = { ...req.body, password: hashedPassword };

  res.status(200).json({
    ...payload,
    status: 0,
    message: "Registration was successful, please login",
  });
  return;
});

function logger(req, res, next) {
  console.log(`/registration was accessed`);
  next();
}

async function hasher(password) {
  const hashed = await bcrypt.hash(password, saltRounds);
  const match = await bcrypt.compare(password, hashed);

  console.log(match);
}

function validator(req, res, next) {
  if (!req.is("application/json")) {
    res.status(400).json({
      ...payload,
      message: "Invalid request body, you should use json",
    });
    return;
  }

  const namePattern = Joi.string()
    .pattern(new RegExp(/^[a-zA-Z]+( [a-zA-Z])?$/))
    .max(50)
    .required();
  const schema = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2 }).required(),
    first_name: namePattern,
    last_name: namePattern,
    password: Joi.string().min(8).max(20).required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    res.status(400).json({ ...payload, message: error.details[0].message });
    return;
  }

  // test the value against existing db entry
  next();
}

module.exports = router;

import express from "express";
import Joi from "joi";

const router = express.Router();

router.use(logger);

const payload = {
  status: 102,
  message: "" | null,
  data: null,
};

router.get("/:customerId", (req, res) => {
  res.send({ ...payload, message: `customer ID: ${req.params.customerId}` });
  return;
});

router.post("/", validator, (req, res) => {
  // process into the db

  res.status(200).send({
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

function validator(req, res, next) {
  if (!req.is("application/json")) {
    res.status(400).send({
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
    res.status(400).send({ ...payload, message: error.details[0].message });
    return;
  }

  // test the value against existing db entry
  next();
}

export default router;

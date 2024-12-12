import express from "express";
import Joi from "joi";

const router = express.Router();

router.use(express.json(), logger);

const payload = {
  status: 102,
  message: "" | null,
  data: null,
};

router.post("/", validator, (req, res) => {
  return res.send({
    email: email,
    first_name: first_name,
    last_name: last_name,
    password: password,
  });
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

  const result = schema.validate(req.body);
  console.log(result);
  next();
}

export default router;

import express from "express";
import { body, validationResult } from "express-validator";
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
    return res.status(400).send({
      ...payload,
      message: "Invalid request body, you should use application/json",
    });
  }

  const { email, first_name, last_name, password } = req.body;

  const requiredFields = { email, first_name, last_name, password };
  for (const [key, value] of Object.entries(requiredFields)) {
    if (value === undefined) {
      return res
        .status(400)
        .send({ ...payload, message: `${key} field is missing from request` });
    }
    if (value === "") {
      return res
        .status(400)
        .send({ ...payload, message: `${key} field is empty` });
    }
  }

  next();
}

export default router;

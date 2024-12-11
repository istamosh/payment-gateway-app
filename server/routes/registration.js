import express from "express";
const router = express.Router();

router.use(express.json(), logger);

const payload = {
  status: 102,
  message: "",
  data: null,
};

router.post("/", validator, (req, res) => {
  const { email, first_name, last_name, password } = req.body;

  const fields = { email, first_name, last_name, password };
  for (const [key, value] of Object.entries(fields)) {
    if (value === undefined) {
      return res
        .status(400)
        .send({ ...payload, message: `${key} field is missing from request` });
    }
  }

  return res.send(
    `Email: ${email}, First Name: ${first_name}, Last Name: ${last_name}, Password: ${password}`
  );
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
  next();
}

export default router;

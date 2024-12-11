import express from "express";
const router = express.Router();

router.use(express.json());

const payload = {
  status: 102,
  message: "",
  data: null,
};

router.post("/", (req, res) => {
  if (!req.is("application/json"))
    res.status(400).send({
      ...payload,
      message: "Invalid request body, you should use application/json",
    });

  const { email, first_name, last_name, password } = req.body;

  const fields = { email, first_name, last_name, password };
  for (const [key, value] of Object.entries(fields)) {
    if (value === undefined)
      res
        .status(400)
        .send({ ...payload, message: `${key} field is missing from request` });
  }

  // res.send(req.body);
  res.send(
    `Email: ${email}, First Name: ${first_name}, Last Name: ${last_name}, Password: ${password}`
  );
});

export default router;

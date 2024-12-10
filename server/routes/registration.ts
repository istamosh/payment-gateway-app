import express from "express";
const router = express.Router();

router.post("/", (req, res) => {
  res.send(`got your POST request: ${JSON.stringify(req.body)}`);
});

export default router;

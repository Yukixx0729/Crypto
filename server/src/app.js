const express = require("express");

const app = express();
const port = Number(process.env.PORT) || 3000;

app.use(express.static("client"));
app.use(express.json());

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

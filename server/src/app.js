const express = require("express");

const app = express();
const port = Number(process.env.PORT) || 3000;
const cryptoRouter = require("./controls/crypto.js");
const httpLoggerMiddleware = require("./middleware/httpLogger");

app.use(express.static("client"));
app.use(express.json());
app.use(httpLoggerMiddleware);
app.use("/api/crypto", cryptoRouter);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

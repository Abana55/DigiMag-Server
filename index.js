require("dotenv").config();
const express = require("express");
const cors = require("cors");

const knex = require('./knex');

const app = express();

app.use(express.json());
app.use(cors());

const articleRoutes = require("./routes/articleRoutes");
const userRoutes = require("./routes/userRoutes");

app.use("/api/articles", articleRoutes);
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
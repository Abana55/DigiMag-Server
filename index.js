const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authenticateToken = require('./middleware/authMiddleware');

const knex = require('./knex');

const app = express();

app.use(express.json());
app.use(cors());

const articleRoutes = require("./routes/articleRoutes");
const userRoutes = require("./routes/userRoutes");
const categoryRoutes = require("./routes/categoryRoutes");

app.use("/api/articles", articleRoutes);
app.use("/api/users", userRoutes);
app.use("/api/categories", categoryRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
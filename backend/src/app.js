// backend/src/app.js

const express = require("express");
const apiRoutes = require("./routes/apiRoutes");
const app = express();

app.use(express.json());
app.use("/api", apiRoutes);

// Placeholder for server listen logic
// To be implemented after setting up environment and dependencies
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


module.exports = app;

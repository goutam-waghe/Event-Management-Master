import app from "./app.js";
import dbConnection from "./config/db.js";
const port = process.env.PORT || 5000;
dbConnection();

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

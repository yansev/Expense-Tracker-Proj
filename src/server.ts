// backend/server.ts (or app.ts)
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const port = 5173; // Make sure this matches the port in your fetch request

// Enable CORS
app.use(cors());

app.use(bodyParser.json()); // For parsing JSON bodies

// Define your POST /expenses route
app.post("/expenses", (req, res) => {
  // const { title, month, plannedAmount, actualAmount } = req.body;

  // Here, you would usually save this to a database
  console.log("New expense data received:", req.body);

  // Respond with a success message (or save the data)
  res
    .status(200)
    .json({ message: "Expense added successfully", expense: req.body });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

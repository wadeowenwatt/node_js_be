import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());


app.use("/v1/api/auth", authRoutes);
app.use("/v1/api/diaries", authMiddleware, diaryRoutes);

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
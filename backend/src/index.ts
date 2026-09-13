import express, { type Request, type Response } from 'express';
import connectDB from './config/db.js';
import 'dotenv/config'

const app = express();
const PORT = process.env.PORT || 3001;

await connectDB()

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Hello from Express with TypeScript!' });
});

app.listen(PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${PORT}`);
});

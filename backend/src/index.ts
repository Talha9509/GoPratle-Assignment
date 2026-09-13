import express, { type Request, type Response } from 'express';
import connectDB from './config/db.js';
import 'dotenv/config'
import EventRoutes from './routes/event.Route.js'

const app = express();
const PORT = process.env.PORT || 3001;

await connectDB()

app.use(express.json());

app.use('/api/events', EventRoutes)

app.listen(PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${PORT}`);
});

import express, { type Request, type Response } from 'express';
import connectDB from './config/db.js';
import 'dotenv/config'
import EventRoutes from './routes/event.Route.js'
import cors from 'cors'

const app = express();
const PORT = process.env.PORT || 3001;

await connectDB()

const frontend = process.env.FRONTEND;
const allowedOrigins = ['http://localhost:3000', frontend!]
app.use(cors({
  origin: allowedOrigins
}))
app.use(express.json());

app.use('/api/events', EventRoutes)

app.listen(PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${PORT}`);
});

if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`[server]: Server is running at http://localhost:${PORT}`);
  });
}

export default app;
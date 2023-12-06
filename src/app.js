import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import router from './routes/index.routes.js';
import { errorHandler } from './middlewares/errorHandler.js';
import 'express-async-errors';

dotenv.config();
const port = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(cors());
app.use(router);
app.use(errorHandler);

app.listen(port, () => console.log(`O servidor está rodando na porta: ${port}`));

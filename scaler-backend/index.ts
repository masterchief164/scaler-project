import express, { Request, Response } from 'express';
import cors from 'cors';
import {router} from "./src/routes";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({
    limit: '50mb',
    extended: true,
}));

app.enable('trust proxy');

app.use(express.json({limit: '50mb'}));
app.use(cors({
    credentials: true,
    origin: ['http://localhost:5173', 'https://scaler-frontend-masterchief164.vercel.app']
}));

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

app.use(router)
app.get('/', (req: Request, res: Response) => {
    res.send('Hello, TypeScript Expres!');
});
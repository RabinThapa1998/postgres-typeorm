import 'reflect-metadata';
import express, { Express, Request, Response, Application } from 'express';
import dotenv from 'dotenv';
import { AppDataSource } from './src/pgmodel';
import routes from './src/routes';

//For env File
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;

app.use(express.json({ limit: '10mb' }));
app.use(
    express.urlencoded({ limit: '10mb', extended: true, parameterLimit: 50000 })
);

AppDataSource.initialize()
    .then(() => {
        console.log('Data Source has been initialized!');
    })
    .catch((err) => {
        console.error('Error during Data Source initialization', err);
    });

app.get('/', (req: Request, res: Response) => {
    res.send('ogg');
});

app.use('/api/v1', routes);

app.listen(port, () => {
    console.log(`Server is Fire at http://localhost:${port}`);
});

import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import { MongoClient } from "./mongo";
import allRoutes from './routes/index';
import cors from 'cors';

dotenv.config();

const app = express();
app.use(cors());
const http = require('http').createServer(app);

(async () => {
  const client = MongoClient;
  await client.getClient();
})(); 

const port = process.env.PORT || 3000;
const isProduction = process.env.NODE_ENV === 'production';


app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan('dev'));

app.use((req, res, next) => {
    if (req.header('x-forwarded-proto') !== 'https' && isProduction) {
      res.redirect(`https://${req.header('host')}${req.url}`);
    } else {
      next();
    }
  });

http.listen(port, () => {console.log(`server is runnig on port ${port}...`)});


app.use('/', allRoutes);

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.use('*', (req, res) => {
  res.status(404).json({
    status: 404,
    message: 'Sorry this route does not exist !',
  });
});

export default app;

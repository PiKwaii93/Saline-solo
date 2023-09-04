import express from 'express';
import cors from 'cors';
import router from './routes/apiRoutes.js';


const app = express();

var corsOptions = {
  credentials: true,
  /* origin: `http://localhost:${port}` */
};
app.use(cors(corsOptions))
app.use(express.json());

const port = process.env.PORT || 4000;

/* // Add headers before the routes are defined
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
}); */

app.use('/foo', router);


app.listen(port, () =>
  console.log(`Server running on port ${port}, http://localhost:${port}`)
);

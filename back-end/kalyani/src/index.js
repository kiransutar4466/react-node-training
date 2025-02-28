import express, {json} from 'express'; //express import
import { config } from 'dotenv';    //importing env file
config();                           //call env

//importing routes
import route from './routes/userRoute.js';
import authroute from './routes/authRoute.js';

const app = express();

app.use(json());    //middleware to parse post data into json 
app.use('/api',route);    //import route from userRoute for /api
app.use('/auth',authroute);  //import route from authRoute for /auth  

app.listen(process.env.PORT,()=>console.log(`Server Running on port ${process.env.PORT}`));
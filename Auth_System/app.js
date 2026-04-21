import express from "express";
import 'dotenv/config.js';
import userRoutes from "./routers/UserRoutes.js";
import cors from "cors";


//initialize app
const app = express();

//Enable cors to frontend
let corsOptions = {
    origin: process.env.ORIGIN
}

const port = 3000;

//middleware
app.use(express.json());
app.use(cors(corsOptions));

//This is
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
})



try{
    app.listen(process.env.PORT || 3000, () => {
        console.log(`Listening to port ${process.env.PORT || 3000}...`);
    });
}catch(e){
    console.log(e);
}


app.use('/user', userRoutes);
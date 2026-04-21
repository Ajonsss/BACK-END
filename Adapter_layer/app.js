import express from "express";
import 'dotenv/config.js';


import authRoutes from "./routes/authRoute.js";


//initialize app
const app = express();

//middleware
app.use(express.json());

//This is
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
})

try{
    app.listen(process.env.PORT || 4000, () => {
        console.log(`Listening to port ${process.env.PORT || 4000}...`);
    });
}catch(e){
    console.log(e);
}


app.use('/auth', authRoutes);


//app.use((req, res) => {
//    res.status(404).json({success: false, message: 'No such endpoint exists.'})
//});
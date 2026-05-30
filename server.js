require('dotenv').config();
const app = require("./src/app");
const mongoose = require('mongoose');
const connectDB = require("./src/config/db");

(async () => {
    await connectDB();
    const PORT = process.env.PORT;
    app.listen(PORT,()=>{
        console.log("server started");
    });
})();
 
require("dotenv").config();
const http = require("http");
const mongoose = require("mongoose");
const app = require("./src/app");

const server = http.createServer(app);

const port = process.env.PORT;

mongoose.connect(process.env.MONGODB_CONNECTION_URL)
    .then(res => {
        server.listen(port, () => {
            console.log(`Server stated at http://localhost:${port}`);
        });
    })
    .catch(err => console.log(err));




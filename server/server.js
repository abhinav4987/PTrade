const { compareSync } = require('bcrypt');
require('dotenv').config();
var express = require('express');
var mongoose = require('mongoose')
var bodyParser = require('body-parser')
var cors = require('cors')
var server = express();
const port = process.env.PORT || 5000;
const routerV1init = require('./api/v1/routes')

// middleWare
server.use(bodyParser.urlencoded({
    extended: true
}));
// server.use(cokieParser());
// server.use(bodyParser.json());
server.use(express.urlencoded({ extended: true }))
server.use(express.json())
server.use(cors())

// database

const uri = process.env.mongoURL || 'mongodb://localhost:27017/paperTrading'
mongoose.connect('mongodb://localhost:27017/paperTrading', {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
	useFindAndModify: false
}).then(()=>{
    console.log("DataBase Connected");
}).catch((error) => {
    console.log(error);
})





// routes

// Welcome Point hehe
server.get('/',(req,res) => {
    return res.json({message: "hello"});
})

// apiV1 setUp
routerV1init(server);





// starting server
server.listen(port, () =>
    console.log('Server listening on port !',port  ),
);
const express = require('express');
const cors = require('cors');
const app = express();
const userRouter = require('./router/user.js');
const bodyParser = require('body-parser');



app.use(cors({
    origin: ['http://localhost:9000']
}))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(userRouter);



app.listen(3000, function () {
    console.log('接口服务已启动');
})
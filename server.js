const express = require('express');
const mongoose = require('mongoose');
const url = 'mongodb+srv://valeri1383:valyo1383@cluster0.luc5cdw.mongodb.net/GymDB?retryWrites=true&w=majority';

const app = express();

mongoose.connect(url);
const con = mongoose.connection

con.on('open', function(){
    console.log('connected to the database')
});



app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.set('view engine', 'ejs');



const membershipsRouter = require('./routes/memberships_route');
app.use('/', membershipsRouter);

const clientRouter = require('./routes/clients_route');
app.use('/', clientRouter);

const membershipList = require('./routes/client_home');
app.use('/', membershipList);

app.listen(3001, (req,res) =>{
    console.log('Server Started')
});
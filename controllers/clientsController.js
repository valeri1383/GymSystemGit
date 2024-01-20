
const { default: axios } = require('axios');
const Client = require('../models/client_model')
const bcrypt = require('bcrypt');


exports.signin = (req, res) => {
    res.render('client_signup')}


exports.index_page = (req,res)=>{
    res.render('index')
}

exports.client_create_error = (req, res) => {
    res.render('index_error')
}


// API

exports.all_clients = async(req, res) => {
    try{
            const client = await Client.find({})
            res.json(client)
    }catch(err){
        res.send('Error' + err)
    }
}



exports.create_client = async (req,res)=>{      
    
    try{
        const client_model = new Client({
        name:req.body.name,
        surname:req.body.surname,
        email:req.body.email,
        password:bcrypt.hashSync(req.body.password, 8),
        membership:req.body.membership,
        classes:req.body.classes

        });       
    
        const existingClient = await Client.findOne({email:req.body.email});
        if(existingClient) {
            res.render("index_error");
        }else{
            const record = await client_model.save();
            res.render("client_signup")
            }
        
    }catch(err){
        res.send('Error' + err)
    }   
}



exports.find_client_by_id = async (req,res)=>{
    try{
         const id_client = await Client.findById(req.query.id);
         res.json(id_client);
 
    }catch(err){
         res.send('Error' + err);
    }    
 }


 exports.client_delete = async (req,res)=>{
    try{
        const {id} = req.params;
        const client_update = await Client.findByIdAndDelete(id, req.body);
        if(!client_update){
            res.send('Clinet do not exist')
        }
        const updated_client = await Client.findById(id)
        res.json("deliting client");
    }catch(err){
        res.send('Error' + err);
    }
 }

 exports.client_update = async (req, res) => {
    try {
        //const { id } = req.query.id;
        // Update the client document
        await Client.findByIdAndUpdate(req.query.id, { membership: "BASIC" });

        // Retrieve the updated document
        const updated_client = await Client.findById(id);
        res.json(updated_client);
        console.log(updated_client)
    } catch (err) {
        res.send('Error: ' + err);
    }
};

 ///////
 exports.client_basic_update = async (req,res)=>{
    try{
        const {id} = req.params;
        const client_update = await Client.findByIdAndUpdate(id, { $set: { membership: 'basic' } });
        const updated_client = await Client.findById(id)
        res.json(updated_client);
    }catch(err){
        res.send('Error' + err);
    }
 }

 exports.client_standart_update = async (req,res)=>{
    try{
        const {id} = req.params;
        const client_update = await Client.findByIdAndUpdate(id, { $set: { membership: 'standart' } });
        const updated_client = await Client.findById(id)
        res.json(updated_client);
    }catch(err){
        res.send('Error' + err);
    }
 }

 exports.client_premium_update = async (req,res)=>{
    try{
        const {id} = req.params;
        const client_update = await Client.findByIdAndUpdate(id, { $set: { membership: 'premium' } });
        const updated_client = await Client.findById(id)
        res.json(updated_client);
    }catch(err){
        res.send('Error' + err);
    }
 }

////////

 exports.client_signup = async (req,res)=>{
    try{
        const clientLogin = await Client.findOne({email:req.body.email});
        if(clientLogin) {
            const validPassword = bcrypt.compareSync(req.body.password, clientLogin.password);
            
            if(validPassword){
                const membership_type = (clientLogin.membership)
                if(membership_type === "basic"){
                    res.render('basic_client',{clientLogin})
                }else if(membership_type === "standart"){
                    res.render('standart_client', {clientLogin})
                }else if(membership_type === "premium"){
                    res.render('premium_client',{clientLogin});          
               }else{
                res.render("membership_page",{clientLogin})
                }
        }else{
            res.render('login_client_err');
        }
        }
    }catch (error) {
        res.render('login_client_err');
    }
}



exports.update_client_basic = (req, res) => {
    axios.get("http://localhost:3001/api/client/findID/:id", { params: { id: req.query.id } })
    .then(function(clientData){
        res.render("basic_client", { clientData: clientData.data });
    })
    .catch(error => {
        res.send(error);
    });
}

exports.update_client_standard = (req, res) => {
    axios.get("http://localhost:3001/api/client/findID/:id", { params: { id: req.query.id } })
    .then(function(clientData){
        res.render("standard_client", { clientData: clientData.data });
    })
    .catch(error => {
        res.send(error);
    });
}

exports.update_client_premium = (req, res) => {
    axios.get("http://localhost:3001/api/client/findID/:id", { params: { id: req.query.id } })
    .then(function(clientData){
        res.render("premium_client", { clientData: clientData.data });
    })
    .catch(error => {
        res.send(error);
    });
}
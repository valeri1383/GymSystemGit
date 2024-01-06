
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
            res.send({message:'the new client has been saved'}); 
            }
        
    }catch(err){
        res.send('Error' + err)
    }   
}



exports.find_client_by_id = async (req,res)=>{
    try{
         const id_client = await Client.findById(req.params.id);
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

 exports.client_update = async (req,res)=>{
    try{
        const {id} = req.params;
        const client_update = await Client.findByIdAndUpdate(id, req.body);
        const updated_client = await Client.findById(id)
        res.json(updated_client);
    }catch(err){
        res.send('Error' + err);
    }
 }

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
                res.render("membership_page")
                }
        }else{
            res.render('login_client_err');
        }
        }
    }catch (error) {
        res.render('login_client_err');
    }
}


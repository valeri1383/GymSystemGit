const express = require('express')
const router = express.Router()
const controller  = require('../controllers/clientsController')





router.get('/', controller.index_page)
router.get("/signup", controller.signin)
router.get('/index_error', controller.client_create_error)



// listing all clients
router.get('/clients', controller.all_clients ) 

// creating new client
router.post('/api/client/create', controller.create_client);

// finding client by ID
router.get('/api/client/findID/:id', controller.find_client_by_id);

// client update
router.put('/api/client/update/:id', controller.client_update);

//delete client
router.delete('/api/client/delete/:id', controller.client_delete);

// client signup
router.post("/client_signup", controller.client_signup);


///////
router.get("/api/update_basic_client", controller.update_client_basic)

router.get("/api/update_standard_client", controller.update_client_standard)

router.get("/api/update_premium_client", controller.update_client_premium)






module.exports = router
let express = require('express')
let Router = express.Router()
let contactuscontroller = require('../controller/contactuscontroller')
const { body, validationResult } = require('express-validator');
const handleerror = require('../middleware/handleerror');

Router.get('/',contactuscontroller.index)
Router.post('/',[body('name').notEmpty(),
    body('email').isEmail(),    
    body('phone').isMobilePhone(),
    body('message').notEmpty()
] ,handleerror ,contactuscontroller.store)
Router.get('/:id',contactuscontroller.show)
Router.delete('/:id',contactuscontroller.destory)
Router.patch('/:id',contactuscontroller.update) 


module.exports = Router
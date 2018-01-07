const express =  require('express');
const router =  express.Router();
const users = require('../models/model.user');

router.get('/', (req, res)=>{
    res.render('index');
});

router.get('/pdf', (req, res)=>{
    res.render('pdf');
});

router.post('/pdf/gerar', (req, res)=>{     
    users.find({})
            .then((userss)=>{
                res.send(userss);
            })
            .catch((err)=>{
                res.send(err)
            })
    
});



module.exports = router;
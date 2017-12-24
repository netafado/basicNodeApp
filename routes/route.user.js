/**
 * Arquivo responsavel por todas as rotas dentr do /user
 * author: Isaias Francisco dos Santos
 */

const express   = require('express');
const router    = express.Router();
const controllerUser = require('../controllers/controller.user')


router.get('/registrar', (req, res)=>{
    res.render('register');
});

router.post('/registrar', (req, res)=>{
    controllerUser.registrarPost(req, res);    
});

router.get('/registrar/:id', (req, res)=>{
    controllerUser.ConfirmaEmal(req, res);
});

router.get('/logar', (req, res)=>{
    res.render('login');
});

router.post('/logar', (req, res)=>{
    res.render('login');
});


module.exports = router;
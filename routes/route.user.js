/**
 * Arquivo responsavel por todas as rotas dentr do /user
 * author: Isaias Francisco dos Santos
 */
const express           = require('express');
const router            = express.Router();
const controllerUser    = require('../controllers/controller.user');
const author            = require('../helpers/helper.outh');


router.get('/registrar', (req, res)=>{
    res.render('register', {name: 'home'});
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

router.get('/logout', (req, res)=>{
    controllerUser.logOut(req, res);
});

router.get('/profile',author, (req, res)=>{
    controllerUser.profile(req, res);
});

router.post('/logar', (req, res)=>{
    controllerUser.logar(req, res);
});


module.exports = router;
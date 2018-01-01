const express =  require('express');
const mongoose = require('mongoose');
/**
 * Use esse midleware para passar antes de  uma rota que precisa de 
 * authencitação 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */

module.exports = (req, res, next) =>{
    // bloquear rotas para user não logados
    if(req.session && res.locals.currentUser)
    {
        return next();
    }
    else
    {
        res.status(401);
        res.redirect('/user/logar');
    }
}
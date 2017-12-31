const express =  require('express');
const mongoose = require('mongoose');

module.exports = (req, res, next) =>{
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
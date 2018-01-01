var express = require('express');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/basicNodeApp');
db = mongoose.connection;

db.on('error', (error, req, res, next)=>{
    console.log('erro de conexão' + error);
    next(error);
});

module.exports = db;
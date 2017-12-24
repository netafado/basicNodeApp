var express = require('express');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/basicNodeApp');

module.exports = mongoose;
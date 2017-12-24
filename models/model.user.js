const express   =   require('express');
const mongoose  =   require('mongoose');
const Schema    =   mongoose.Schema;

const userSchema = new Schema({
    nome: {
        type:   String,
        trim:   true,
        required: true
    },
    email: {
        type:   String,
        trim:   true,
        required: true
    },
    createAt: {
        type: Date,
        default: Date.now,
    },
    cep:{
        type:   String,
        trim:   true
    },
    rua:{
        type:   String,
        trim:   true
    },
    estado:{
        type:   String,
        trim:   true
    },
    bairro:{
        type:   String,
        trim:   true
    },
    cidade:{
        type:   String,
        trim:   true
    },
    idade:{
        type:   Number
    },
    password:{
        type:   String,
        trim:   true,
        required: true
    },
    emailConfirmado:{
        type: Boolean,
        default: false
    }

});

module.exports = mongoose.model('User', userSchema);
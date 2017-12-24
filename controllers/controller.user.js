
/**
 * Arquivo responsavel por todas as rotas dentr do /user
 * author: Isaias Francisco dos Santos
 */
const express   = require('express');
const userModel = require('../models/model.user');
var nodemailer  = require('nodemailer');

// insere um novo user no banco
exports.registrarPost = (req, res)=>{
    let error = [];
    if( req.body.nome === undefined || req.body.nome.length < 2)
    {  
        error.push('Nome é obrigatorio');
    }
    if( req.body.email === "" ){
        error.push('Campo email é obrigatorio');
    }

    if(req.body.password === "" || req.body.password != req.body.password2)
        error.push('Password não combinão ou não preenchidos')

    if(req.body.password.length <= 4)
        error.push('Password precisa ter mais de 4 digitos')
    // se houver error volta a página de registro
    if(error.length > 0){
        res.render('register', {
            errors: error,
            user:{
                nome: req.body.nome,
                email: req.body.email
            }
        });
    }
    else
    {
        const newUser = {
            nome: req.body.nome,
            email: req.body.email,
            password: req.body.password,
            cep:req.body.cep,
            rua:req.body.rua,
            idade: req.body.idade,
            estado:req.body.estado
        }

        user = new userModel(newUser);

        user.save()
            .then((user)=>{
                // envia um email para confirmar o email
                var transporter = nodemailer.createTransport({
                    host: 'smtp.elasticemail.com',
                    port: '2525',
                    secure: false,
                    auth: {
                        user: 'isaias.fran@gmail.com',
                        pass: '559513a4-76f4-4f02-bc04-ceb3354f924a'
                    }
                });
                
                var mailOptions = {
                    from: 'contato@isaiasfrancisco.com.br',
                    to: user.email,
                    subject: 'Confirme seu cadastro',
                    text: 'clique no link para confirmar seu email:<br>' + 'http://localhost:4000/user/registrar/'  + user._id
                };
                
                transporter.sendMail(mailOptions, function(error, info){
                    if (error) {
                    console.log(error);
                    } else {
                    console.log('Email sent: ' + info.response + 'testando email: ' + user.email );
                    }
                });
                res.redirect('/user/logar');
            })
    }   
}

exports.ConfirmaEmal = (req, res) =>{
    userModel.findOneAndUpdate({_id: req.params.id}, {emailConfirmado : true})
    .then((user)=>{
        if(user){
            console.log(user);
            res.redirect('/');
        }
        else{
            console.log(req.params.id);
            res.redirect('/');
        }
    })   
}
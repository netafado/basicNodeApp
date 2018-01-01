
/**
 * Arquivo responsavel por todas as rotas dentr do /user
 * author: Isaias Francisco dos Santos
 */
const express   = require('express');
const userModel = require('../models/model.user');
var nodemailer  = require('nodemailer');
const bcrypt    = require('bcryptjs');



function sendEmail(email, id, msg){
                
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
            to: email,
            subject: 'Confirme seu cadastro',
            text: 'clique no link para confirmar seu email:<br>' + 'http://localhost:4000/user/registrar/'  + id
    };
                
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        }
        else 
        {
            console.log('Email sent: ' + info.response + 'testando email: ' + email );
        }
    });
}

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
        let newUser = {
            nome: req.body.nome,
            email: req.body.email,
            password: req.body.password,
            cep:req.body.cep,
            rua:req.body.rua,
            idade: req.body.idade,
            estado:req.body.estado
    }
    user = new userModel(newUser);

        bcrypt.genSalt(10, (err, salt)=>{
            bcrypt.hash(user.password, salt, (err, hash) =>{
                if(err) throw err;
                user.password = hash;
                user.save()
                    .then(user => {
                        sendEmail(user.email, user._id, null);
                        req.flash('success', 'Antes de ligar confirme email, pelo email que acabamos de enviar');
                         res.redirect('/user/logar');
                    })
                    .catch(err =>{
                        if(err.code == 11000) {
                             res.render('register', { 
                                 errors:[ 'email já cadastrado']                
                            });
                            } else{
                                res.render('register', { 
                                    errors:[ 'Something bad', err]                
                            });
                        }  
                    });
            });

        });

   }   
}

exports.ConfirmaEmal = (req, res) =>{
    userModel.findOneAndUpdate({_id: req.params.id}, {emailConfirmado : true})
    .then((user)=>{
        if(user){
            res.redirect('/');
        }
        else{
            res.redirect('/');
        }
    })   
}

exports.logar = (req, res) => {
    if(req.body.email && req.body.password)
    {
        // encontrando o user
        userModel.findOne({email:req.body.email})
                .then((user)=>{
                    // ver a credencial
                    if(user){
                        // verefica se o user confimou o email
                        if(user.emailConfirmado === false)
                        {
                            return res.render('login',{ errors: ['Email precisa ser confirmado']})
                        }
                        bcrypt.compare(req.body.password, user.password, (err, result)=>{
                            if(result)
                            {
                                // logar user no sistema
                                req.session._id = user._id;
                                res.redirect('/user/profile')
                            }
                            else
                            {
                                res.render('login',{
                                    errors: ['Senha errada']
                                })
                            }
                        });
                    }
                    else{
                        res.render('login',{
                            errors: ['Usuário não encontrado']
                        })                        
                    }

                })
                .catch((err)=>{
                    res.render('login',{
                        errors: ['Alguma coisa aconteceu... tente mais tarde']
                    })
                })

    }else{
        res.render('login', {
            name: 'erro',
            errors: ['preencha os campos']
        });
    }

}

exports.logOut = (req, res) =>{

    req.session.destroy(function(err) {
        if(err) {
          console.log(err);
        } else {
          res.redirect('/');
        }
      });
}

exports.profile = (req, res) =>{
    res.render('profile', {
        name: "Profile"
    })
}
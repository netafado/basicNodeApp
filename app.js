const express       = require('express');
const app           = express();
const bodyParser    = require('body-parser');
const session       = require('express-session');
const mongoConnect  = require('connect-mongo')(session);
const flash         = require('connect-flash');

const port          = process.env.PORT || 4000;

// arquivos de configuração
const appInfo   = require( './helpers/config.app' );

// utils
const utils    = require( './helpers/config.utils' );

//banco de dados
const db = require('./config/config.db');

/* controla as sessões do site
    serve para controlar acesso
    pode ser usado para coletar inf sobre o usuário quando tempo no site etc
     quando a session é criada você tem acesso a ele em qualquer routa 
*/
app.use(session({
    secret: "AppNodeBasic",
    resave: true,
    saveUninitialized: false,
    store: new mongoConnect({
        mongooseConnection: db
    })
}));

// routes
const indexRouter   = require( './routes/route.index' );
const userRouter    = require( './routes/route.user' );


// bodyParser responsavel por transmitir dados de formularios
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

//mensagens para o usúario mesmo em outras rotas
app.use(flash());

// arquivos staticos
app.use(express.static('./public'));

// variaveis globais
app.use((req, res, next)=>{    
    res.locals._APP_INFO    = appInfo;
    res.locals.flashes      = req.flash();
    req._UTILS              = utils;
    if(req.session)
        res.locals.currentUser  = req.session._id || null
    next();
})

// setar a template engine
app.set('views', './views');app.set('view engine', 'pug');



// midlewares de routas setadas por esse app
app.use('/', indexRouter);
app.use('/user', userRouter);



// ultima rota antes do error handler então 404
app.use((req, res, next)=>{
    var err =  new Error('Not Found');
    err.status = 404;
    next(err);
})

// Error Handler
app.use(function (err, req, res, next) {
    // se o err.status 404 não estiver setado provavelmente é um erro interno
    // então
    res.status( err.status || 500);
    if(err.status === 404)
    {
        const time = new Date(Date.now());
        req._UTILS.logFile( ` ${err.message} \n data: ${time} stack: ${err.stack}`, './logs/errors.txt');
        res.render('404', {
            name: 'pagina não encontrada',
            errors: [err.message]
        });
    }else{
        res.render('404', {
            name: '500',
            errors: [[err.message]]
        });
    }


});

app.listen(port, ()=>{
    console.log(`Server rodando na porta ${port}`);
})
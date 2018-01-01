const express       = require('express');
const app           = express();
const bodyParser    = require('body-parser');
const session       = require('express-session');
const mongoConnect  = require('connect-mongo')(session);
const flash         = require('connect-flash');

const port          = process.env.PORT || 4000;

// arquivos de configuração
const appInfo   = require( './helpers/config.app' );

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
    if(req.session)
        res.locals.currentUser  = req.session._id || null
    next();
})

// setar a template engine
app.set('views', './views');app.set('view engine', 'pug');

// midlewares de routas setadas por esse app
app.use('/', indexRouter);
app.use('/user', userRouter);


// controlar os erros
app.use((error, req, res, next)=>{
    console.log('error: ' + error);
    next();
})
// se nada der certo 404 
app.use((req, res)=>{
    res.render('404', {
        title: '404'
    });
})

app.listen(port, ()=>{
    console.log(`Server rodando na porta ${port}`);
})
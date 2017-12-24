const express       = require('express');
const app           = express();
const bodyParser    = require('body-parser');
const port          = process.env.PORT || 4000;

// arquivos de configuração
const appInfo   = require( './helpers/config.app' );

// routes
const indexRouter   = require( './routes/route.index' );
const userRouter    = require( './routes/route.user' );

//banco de dados
const db = require('./config/config.db');

// bodyParser responsavel por transmitir dados de formularios
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

// arquivos staticos
app.use(express.static('./public'));

// variaveis globais
app.use((req, res, next)=>{    
    res.locals._APP_INFO = appInfo;
    next();
})

// setar a template engine
app.set('views', './views');app.set('view engine', 'pug');

// midlewares de routas setadas por esse app
app.use('/', indexRouter);
app.use('/user', userRouter);


app.listen(port, ()=>{
    console.log(`Server rodando na porta ${port}`);
})
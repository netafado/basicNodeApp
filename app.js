const express   = require('express');
const app       = express();

const port      = process.env.PORT || 4000;

// routes
const indexRouter = require( './routes/route.index' )

// arquivos staticos
app.use(express.static('./public'));

// setar a template engine
app.set('views', './views');
app.set('view engine', 'pug');

// midlewares de routas setadas por esse app
app.use('/', indexRouter);

app.listen(port, ()=>{
    console.log(`Server rodando na porta ${port}`);
})
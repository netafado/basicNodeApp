/**
 * Configuração básica do app
 */
module.exports = App = {
    version : "1.0",
    appName  :"nodeBasicApp",
    logInlinks: [
        {name: 'home', link:'/'},
        {name: 'PDF', link:'/pdf'}, 
        {name: 'LogOut', link:'/user/logout'},        

    ],

    logOutlinks: [
        {name: 'home', link:'/'},
        {name: 'Registrar', link:'/user/registrar'},
        {name: 'Logar', link:'/user/logar'},
        {name: 'PDF', link:'/pdf'},        

    ],

    erroHandler: (error)=>{

    },

    logFile:(msg)=>{

    }
}

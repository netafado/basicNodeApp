const express =  require('express');
const router =  express.Router();

router.get('/', (req, res)=>{
    res.render('index');
});

router.get('/pdf', (req, res)=>{
    res.render('pdf');
});

module.exports = router;
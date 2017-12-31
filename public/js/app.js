var btnImprimir = document.getElementById('imprimir');
    btnImprimir.addEventListener('click', function(){
        var docDefinition = { content: 'This is an sample PDF printed with pdfMake' }; 
        openPDF(docDefinition);
    })
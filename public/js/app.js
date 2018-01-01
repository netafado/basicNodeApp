(function($){
    var btnImprimir = document.getElementById('imprimir');
    btnImprimir.addEventListener('click', function(){
        var docDefinition = {
            content: [
              {
                table: {
                  // headers are automatically repeated if the table spans over multiple pages
                  // you can declare how many rows should be treated as headers
                  headerRows: 1,
                  widths: [ '*', 'auto', 100, '*' ],
          
                  body: [
                  ]
                }
              }
            ]
          };
        

        $.ajax('/pdf/gerar',{
            method: 'POST',
            success:function(data){
                

                console.log(docDefinition);
                for(let i = 0; i < data.length; i++){
                    docDefinition.content[0].table.body.push([data[i].nome, data[i].cep,  data[i].email])
                }
                console.log(docDefinition);
                openPDF(docDefinition);
            }
        })

    })
})(jQuery )

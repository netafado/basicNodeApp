(function($){
    var urlCorreios = 'https://viacep.com.br/ws/';
    var jsonFormat  = '/json/ ';

     function fillFields(cep, clear){
        var url = urlCorreios + cep + jsonFormat;
        $.ajax(url, {
            type: "POST",
            success: function(data){
                $('#rua').val(data.logradouro);
                $('#estado').val(data.uf);
                $('#cidade').val(data.localidade);
                $('#bairro').val(data.bairro);
            }
        });

    }

    $('[data-mask=CEP]').on('input', function(){
        var cepForm = $(this).val();
        if(cepForm.length === 8){
            fillFields(cepForm);
        }
    });
})(jQuery)
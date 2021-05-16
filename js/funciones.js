function fn_validar_rut(rut){
    $.getJSON('https://api.libreapi.cl/rut/validate/',{rut:rut}).done(function(json){
        return json.data.valid;
    }).fail(function(json){
        alert("Error al Validar RUT")
    })
}


$("#btn_registro").click(function(){
    console.log(fn_validar_rut("19586995-2"));
})
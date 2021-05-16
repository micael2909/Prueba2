fn_limpiarEtiqueta();

function fn_limpiarEtiqueta(){
    $("#alerta").removeClass("alert-success");
    $("#alerta").removeClass("alert-danger");
    $("#alerta").css("visibility","hidden");
    $("#alerta").html("");
}


$("#btn_registro").click(function(){
    fn_limpiarEtiqueta();
    var rut = $("#txt_rut").val();
    var nombre = $("#txt_nombre").val();
    var apellidop = $("#txt_appaterno").val();
    var apellidom = $("#txt_apmaterno").val();
    var correo = $("#txt_email").val();
    var tipocuenta = $("#cmb_tcuenta option:selected").text();
    var countErrores = 0;
    var txtErrores = "";

    if(rut == ""){
        countErrores++;
        txtErrores += "Debe ingresar un Rut <br>";
    }
    else {
        $.getJSON('https://api.libreapi.cl/rut/validate/',{rut:rut})
            .done(function(json){
                if(!json.data.valid){
                    $("#alerta").prepend("Rut invalido <br>");
                }
            })
    }

    if(nombre == ""){
        countErrores++;
        txtErrores += "El Campo Nombre no puede estar vacío <br>";
    }

    if(countErrores > 0){
        $("#alerta").addClass("alert-danger");
        $("#alerta").css("visibility","visible");
        $("#alerta").append(txtErrores);
    }
})


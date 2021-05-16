fn_limpiarEtiqueta();

var loading = $('#sp_cargando').hide();
$(document)
  .ajaxStart(function () {
    loading.show();
  })
  .ajaxStop(function () {
    loading.hide();
});

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
        if(nombre == ""){
            countErrores++;
            txtErrores += "El campo Nombre no puede estar vacío <br>";
        }
        if(apellidop == ""){
            countErrores++;
            txtErrores += "El campo Apellido Paterno no puede estar vacío <br>";
        }
        if(apellidom == ""){
            countErrores++;
            txtErrores += "El campo Apellido Materno no puede estar vacío <br>";
        }
        if(correo == ""){
            countErrores++;
            txtErrores += "El campo Correo Electrónico no puede estar vacío <br>";
        }else{
            var formatoCorreo = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
            if(!formatoCorreo.test(correo)){
                countErrores++;
                txtErrores += "Correo inválido"
            }
        }
        if(tipocuenta == "-- SELECCIONE --"){
            countErrores++;
            txtErrores += "Debe seleccionar un tipo de cuenta <br>";
        }
        $("#alerta").addClass("alert-danger");
        $("#alerta").css("visibility","visible");
        $("#alerta").append(txtErrores);
    }
    else{
        $.when($.getJSON('https://api.libreapi.cl/rut/validate/',{rut:rut})
        .done(function(json){
        if(!json.data.valid){
            $("#alerta").prepend("Rut inválido <br>");
            countErrores++;
        }
        }).fail(function(json){
                $("#alerta").addClass("alert-danger");
                $("#alerta").css("visibility","visible");
                $("#alerta").append("Formato de rut inválido");
        })
        ).done(function(){

            if(nombre == ""){
                countErrores++;
                txtErrores += "El campo Nombre no puede estar vacío <br>";
            }
            if(apellidop == ""){
                countErrores++;
                txtErrores += "El campo Apellido Paterno no puede estar vacío <br>";
            }
            if(apellidom == ""){
                countErrores++;
                txtErrores += "El campo Apellido Materno no puede estar vacío <br>";
            }
            if(correo == ""){
                countErrores++;
                txtErrores += "El campo Correo Electrónico no puede estar vacío <br>";
            }else{
                var formatoCorreo = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
                if(!formatoCorreo.test(correo)){
                    countErrores++;
                    txtErrores += "Correo inválido";
                }
            }

            if(tipocuenta == "-- SELECCIONE --"){
                countErrores++;
                txtErrores += "Debe seleccionar un tipo de cuenta <br>";
            }

            if(countErrores > 0){
                $("#alerta").addClass("alert-danger");
                $("#alerta").css("visibility","visible");
                $("#alerta").append(txtErrores);
            }else{
                $('#m_registrado').modal('show');
            }
        })
    }
})

$("#btn_limpiar").click(function(){
    $("#formregistro").trigger("reset");
})


function fn_indicadoresEconomicos(){
    $.getJSON('https://mindicador.cl/api',function(data){
        var respuesta = data;
        $("#lst_indicadores").append("<li class='list-group-item'><div class='row'><div class='col'>"+respuesta.dolar.nombre+"</div> : <div class='col'>$"+respuesta.dolar.valor+"</div></div></li>");
        $("#lst_indicadores").append("<li class='list-group-item'><div class='row'><div class='col'>"+respuesta.euro.nombre+"</div> : <div class='col'>$"+respuesta.euro.valor+"</div></div></li>");
        $("#lst_indicadores").append("<li class='list-group-item'><div class='row'><div class='col'>"+respuesta.uf.nombre+"</div> : <div class='col'>$"+respuesta.uf.valor+"</div></div></li>");
        $("#lst_indicadores").append("<li class='list-group-item'><div class='row'><div class='col'>"+respuesta.utm.nombre+"</div> : <div class='col'>$"+respuesta.utm.valor+"</div></div></li>");
        $("#lst_indicadores").append("<li class='list-group-item'><div class='row'><div class='col'>"+respuesta.bitcoin.nombre+"</div> : <div class='col'>USD$"+respuesta.bitcoin.valor+"</div></div></li>");
    })
}

fn_indicadoresEconomicos();
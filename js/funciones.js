/*Iniciamos limpiando todas las etiquetas de la página*/
fn_limpiarEtiqueta();

/*Comenzamos con el icono de cargando oculto*/
var loading = $('#sp_cargando').hide();
/*el icono de cargando estará visible mientras se ejecute la consulta a la API*/
$(document)
  .ajaxStart(function () {
    loading.show();
  })
  .ajaxStop(function () {
    loading.hide();
});

/*borro el contenido de la etiqueta de alerta y borro las clases de color verde o rojo*/
function fn_limpiarEtiqueta(){
    $("#alerta").removeClass("alert-success");
    $("#alerta").removeClass("alert-danger");
    $("#alerta").css("visibility","hidden");
    $("#alerta").html("");
}

/*funcion para validar los datos del formulario*/
$("#btn_registro").click(function(){
    /*iniciamos limpiando la etiqueta*/
    fn_limpiarEtiqueta();
    /*guardamos en variables los campos que llena el usuario*/
    var rut = $("#txt_rut").val();
    var nombre = $("#txt_nombre").val();
    var apellidop = $("#txt_appaterno").val();
    var apellidom = $("#txt_apmaterno").val();
    var correo = $("#txt_email").val();
    var tipocuenta = $("#cmb_tcuenta option:selected").text();
    /*creamos un contador para los errores y un txt para anotar los errores*/
    var countErrores = 0;
    var txtErrores = "";
    /*separamos la validacion por si el campo rut esta vacio o no */
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
                txtErrores += "Correo inválido <br>"
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
    fn_limpiarEtiqueta();
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

function fn_clima(){
    $.getJSON("https://api.gael.cloud/general/public/clima",function(data){
        var respuesta = data;
        for(x of respuesta){

            $("#lst_climas")
            .append("<li class='list-group-item'><div class='row'><div class='col'>"+x.Estacion+"</div><div class='col'>"+x.Temp+"°</div><div class='col'>"+x.Estado+"</div></div></li>");
        }
    })
}

fn_indicadoresEconomicos();
fn_clima();
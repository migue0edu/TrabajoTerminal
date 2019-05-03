
$('#summernote').summernote({
        placeholder: 'Introduzca su texto aquí.',
        tabsize: 5,
        height: 550,
        lang: 'es-ES',
        toolbar: [
            // [groupName, [list of button]]
            ['edit', ['undo', 'redo']],
            ['style', ['bold', 'italic', 'underline', 'clear']],
            ['font', ['strikethrough', 'superscript', 'subscript']],
            ['fontsize', ['fontsize']],
            ['color', ['color']],
            ['para', ['style', 'ul', 'ol', 'paragraph', 'height']],
            ['tools', ['table', 'hr', 'picture', 'link']],
            ['debug', ['codeview']]
        ]
      });
$(document).ready()

$(".note-btn").click(function () {
    let contenido = $('#summernote').summernote('code');
    TogetherJS.send({type: "actualizarTexto", texto: contenido});
    sender = true;
});

 $('#summernote').on('summernote.init', function() {
     updated = false;
     if(TogetherJS.require("peers").getAllPeers(true).length > 0){
         TogetherJS.send({type: "cargarDatos"});
     }else{
         updated = true;
     }
 });

$('#summernote').on('summernote.focus', function() {
    if ($('#summernote').summernote('isEmpty')) {
        TogetherJS.send({type: "cargarDatos"});
        return;
    }
    console.log('summernote\'s content is changed.');
    let contenido = $('#summernote').summernote('code');
    TogetherJS.send({type: "actualizarTexto", texto: contenido});
    sender = true;

});

$('#summernote').on('summernote.keyup', function(we, e) {
        let contenido = $('#summernote').summernote('code');
        TogetherJS.send({type: "actualizarTexto", texto: contenido});
        sender = true;

});

// summernote.blur
$('#summernote').on('summernote.blur', function() {
    let contenido = $('#summernote').summernote('code');
    TogetherJS.send({type: "actualizarTexto", texto: contenido});
    sender = true;
});

$('#summernote').on('summernote.paste', function(e) {
    let contenido = $('#summernote').summernote('code');
    TogetherJS.send({type: "actualizarTexto", texto: contenido});
    sender = true;
    console.log(TogetherJS.shareUrl());
});

$('#summernote').on('summernote.image.upload', function(we, files) {
    // upload image to server and create imgNode...
    $summernote.summernote('insertNode', imgNode);
    let contenido = $('#summernote').summernote('code');
    TogetherJS.send({type: "actualizarTexto", texto: contenido});
    sender = true;
});

let htmlCompartir = '<form action="/enviarInvitacion" method="post">'
    +'<div class="input-group-sm mb-3">'
    +'<input id="correo" name="correo" type="text" class="form-control" placeholder="alguien@correo.com" aria-label="Recipient\'s username" aria-describedby="basic-addon2">'
    +'<input id="url" name="urlDoc" type="hidden" >'
    +'<br>'
    +'<div class="input-group-append">'
    +'<div style="text-align: center;"><input class="btn-sm btn-dark" type="submit" value="Compartir"></div>'
    +'</div>'
    +'</div>'
    +'</form>';
$(function () {
    $("#compartir").popover({
        title: 'Correo electronico:',
        content: htmlCompartir,
        trigger: 'focus',
        placement: 'bottom',
        html: true
    })
});
$('#compartir').on('shown.bs.popover', function () {
    $("#url").val(TogetherJS.shareUrl());
    console.log(TogetherJS.shareUrl());
});
$('#correo').click(function () {

});

let htmlText = '<div class="input-group-sm mb-3">'
    +'<span>Indique fecha y hora limite:</span>'
    +'<input type="datetime-local">'
    +'<br>'
    +'<div style="text-align: center;"><button class="btn-sm btn-dark mt-3" type="button">Establecer</button></div>';

$('.datepicker').datepicker({
    format: 'mm/dd/yyyy',
    startDate: '-3d',
    language: 'es'
});

$(function () {
    $("#votacion").popover({
        title: 'Datos de la votación:',
        content: htmlText,
        trigger: 'focus',
        placement: 'bottom',
        html: true
    })
});

let htmlGuardar =
    '<form action="/documento/update" method="post">'
    +'<div class="input-group-sm mb-3">'
    +'<input id="" name="correo" type="text" class="form-control" placeholder="Nombre del documento" aria-label="Recipient\'s username" aria-describedby="basic-addon2"> '
    +'<br>'
    +'<div class="input-group-append">'
    +'<div style="text-align: center;"><input class="btn btn-outline-dark btn-sm" type="submit" value="Guardar"></div> '
    +'</div>'
    +'</div>'
    +'</form>';

$(function () {
    $("#guardar").popover({
        title: 'Guardar Documento',
        content: htmlGuardar,
        trigger:'click',
        placement: 'bottom',
        html: true
    })
});

//--------

function nuevoDocumento(){
    if(confirm('Desea guardar cambios?')){
        console.log('Guardado!')
    }
    else{
        $('#summernote').summernote('code', "");
    }
}

function cerrarDocumento(){
    if(confirm('Desea guardar cambios?')){
        console.log('Guardado!')
    }
    else{
        window.location.href = "index.html";
    }  
}

function crearDocumento(){
    if(guardado === false){
        $.ajax({
            url: `documento/save`,
            type: 'post',
            dataType: 'jsonp',
            jsonp: 'jsonp', // mongod is expecting the parameter name to be called "jsonp"
            success: function (data) {
                console.log('success', data);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.log('error', errorThrown);
            }
        });
    }
    else{
        $.ajax({
            url: `documento/update/`,
            type: 'post',
            dataType: 'json',
            jsonp: 'jsonp', // mongod is expecting the parameter name to be called "jsonp"
            success: function (data) {
                console.log('success', data);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.log('error', errorThrown);
            }
        });
    }

}
function guardarDocumento(){
    let texto =  $('#summernote').summernote('code');
    $("#text").val(texto);
    let id = document.cookie.split('=')[2];
    $("#idocument").val(id);
    $("#save").submit();

}

function setPropietary(name) {
    propietary = TogetherJS.require("peers").Self.name;
    //TogetherJS.require("peers").Self.update({name: "migue0mpx@gmail.com"});
};

var guardado = false;
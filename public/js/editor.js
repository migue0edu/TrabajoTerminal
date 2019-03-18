$('#summernote').summernote({
        placeholder: 'Introduzca su texto aquí.',
        tabsize: 5,
        height: 550,
        lang: 'es-ES'
      });


let htmlCompartir = '<div class="input-group-sm mb-3">'
    +'<input type="text" class="form-control" placeholder="alguien@correo.com" aria-label="Recipient\'s username" aria-describedby="basic-addon2">'
    +'<div class="input-group-append">'
    +'<div style="text-align: center;"><button class="btn-sm btn-dark" type="button">Compartir</button></div>'
    +'</div>'
    +'</div>';
$(function () {
    $("#compartir").popover({
        title: 'Correo electronico:',
        content: htmlCompartir,
        trigger: 'click',
        placement: 'bottom',
        html: true
    })
});

let htmlText = '<div class="input-group-sm mb-3">'
    +'<span>Indique fecha y hora limite:</span>'
    +'<input type="datetime-local">'
    +'<div style="text-align: center;"><button class="btn-sm btn-dark" type="button">Establecer</button></div>';

$('.datepicker').datepicker({
    format: 'mm/dd/yyyy',
    startDate: '-3d',
    language: 'es'
});

$(function () {
    $("#votacion").popover({
        title: 'Datos de la votación:',
        content: htmlText,
        trigger: 'click',
        placement: 'bottom',
        html: true
    })
});

// let paramsSearch = new URLSearchParams();
// let user = paramsSearch.get('usr');
// $("#bienvenido").append(' ' + user);
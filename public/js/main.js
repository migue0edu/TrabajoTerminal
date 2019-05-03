//codigo para animacion mostrar registro
$('.toggle').click(function(){
	$('.formulario').animate({
		height: "toggle",
		'padding-top': 'toggle',
		'padding-bottom': 'toggle',
		opacity: 'toggle'
	}, "slow")
});

function validate( formulario ) {

}

function getUser() {
	let user = document.cookie.split('=')[1];
	$('#user').val(user);
}

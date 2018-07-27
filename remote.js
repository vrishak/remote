
$(document).ready(function(){
	$("head").append("<link rel='stylesheet' href='https://rawgit.com/vrishak/remote/master/remote.css' type='text/css' media='screen'>");
	var html = "<div class='container'>";
	  html += "<input/>";
	  html +="<div class='row'><a href='#'>1</a><a href='#'>2</a><a href='#'>3</a></div>";
	  html +="<div class='row'><a href='#'>4</a><a href='#'>5</a><a href='#'>6</a></div>";
	  html +="<div class='row'><a href='#'>7</a><a href='#'>8</a><a href='#'>9</a></div>";
	  html +="<div class='row'><a href='#'><span style='color:red'><strong>O</strong></span></a><a href='#'>0</a><a href='#'><<</a></div>";
	  html +="<div class='row'><a class='call' href='#'>OK</a></div>";
	  html +="</div>";
	document.body.innerHTML = html;
	
	$('.row a').on('click', function() {
	var $store = $('input'),
			$number = $('.call'),			
			dialed = $(this).text();
	if(dialed == "OK") {
		submitCodes($store.val());
		$store.val("");
	} else if(dialed == "O") {
		submitCodes("O");
		$store.val("");
	} else if(dialed == "<<") {
		$store.val($store.val().substring(0,$store.val().length-1));
	} else {
		$store.val($store.val() + dialed);
	}
	$store.focus();
	});
	
	function submitCodes(codes) {
		for (var i = 0; i < codes.length; i++) {
			var ch = codes.charAt(i);
			if(ch == "O") {
				send(12582924);
			} else if(ch == "0") {
				send(12582912);
			} else if(parseInt(ch)) {
				var c = 12582912;
				send(c+parseInt(ch));
			}
		}
	}
	function send(code) {
		$.ajax({
		 url: "/ir?code="+code,
		});
	}
});
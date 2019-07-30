
$(document).ready(function(){
	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
		$("head").append("<link rel='stylesheet' href='m_remote.css' type='text/css' media='screen'>");
    } else {
		$("head").append("<link rel='stylesheet' href='remote.css' type='text/css' media='screen'>");
	}
	var html = "<div class='container'>";
	  html += "<input/>";
	  html +="<div class='row'><a href='#'>1</a><a href='#'>2</a><a href='#'>3</a></div>";
	  html +="<div class='row'><a href='#'>4</a><a href='#'>5</a><a href='#'>6</a></div>";
	  html +="<div class='row'><a href='#'>7</a><a href='#'>8</a><a href='#'>9</a></div>";
	  html +="<div class='row'><a href='#'>CH-</a><a href='#'>0</a><a href='#'>CH+</a></div>";
      html +="<div class='row'><a href='#'>V-</a><a href='#'><span style='color:red'><strong>O</strong></span></a><a href='#'>V+</a></div>";
	  html +="<div class='row'><a class='call' href='#'>OK</a></div>";
	  html +="</div>";
	document.body.innerHTML = html;
	
	$('.row a').on('click', function() {
	var $store = $('input'),
			$number = $('.call'),			
			dialed = $(this).text();
	if(dialed == "O" || dialed == "V+" || dialed == "V-" || dialed == "CH+" || dialed == "CH-") {
		submitCodes(dialed);
		$store.val("");
	} else if(dialed == "OK"){
		submitCodes($store.val()+"o");
		$store.val("");
	} else if(dialed == "<<") {
		$store.val($store.val().substring(0,$store.val().length-1));
	} else {
		$store.val($store.val() + dialed);
	}
	//$store.focus();
	});
	
	function sleep(seconds) 
	{
	  var e = new Date().getTime() + (seconds * 1000);
	  while (new Date().getTime() <= e) {}
	}
	
	function submitCodes(codes) {
		console.log(codes);
		if(codes == "CH+") {
			send(12582944);
		} else if(codes == "CH-") {
			send(12582945);
		} else if(codes == "V+") {
			send(12582928);
		} else if(codes == "V-") {
			send(12582929);
		} else {
			var prev = 'Z';
			for (var i = 0; i < codes.length; i++) {
				var ch = codes.charAt(i);
				if(ch == prev) {
					sleep(1);
				}
				if(ch == "O") {
					send(12582924);
				} else if(ch == "0") {
					send(12582912);
				} else if(parseInt(ch)) {
					var c = 12582912;
					send(c+parseInt(ch));
				}
				prev = ch;
			}
		}
	}
	function send(code) {
		$.ajax({
		 url: "/ir?code="+code,
		});
	}
});
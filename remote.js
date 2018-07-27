var html = "<div class='container'>";
  html += "<input/>";
  html +="<div class='row'><a href='#'>1</a><a href='#'>2</a><a href='#'>3</a></div>";
  html +="<div class='row'><a href='#'>4</a><a href='#'>5</a><a href='#'>6</a></div>";
  html +="<div class='row'><a href='#'>7</a><a href='#'>8</a><a href='#'>9</a></div>";
  html +="<div class='row'><a href='#'>*</a><a href='#'>0</a><a href='#'>#</a></div>";
  html +="<div class='row'><a class='call' href='#'><i class='fa fa-phone'></i></a></div>";
html +="</div>";



$(document).ready(function(){
	$("head").append("<link rel='stylesheet' href='https://rawgit.com/vrishak/remote/master/remote.css' type='text/css' media='screen'>");
	$("body").innerHTML = html;
	
	$('.row a').on('click', function() {
	var $store = $('input'),
			$number = $('.call'),			
			dialed = $(this).text();
	
	$store.val($store.val() + dialed);
	$number.attr('href', 'tel:' + $store.val());
	$store.focus();
	});
	
	$("#Submit").click(function(){
		$.ajax({
		 url: "/@"+$("#command").val()+"$",
		});
	});
});
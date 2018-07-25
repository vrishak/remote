$(document).ready(function(){
	$("#Submit").click(function(){
		$.ajax({
		 url: "/@"+$("#command").val()+"$",
		});
	});
});
	var flag = true;

	function ValidateEmail(email) {
		var expr = /^([\w-\.]+@@([\w-]+\.)+[\w-]{2,4})?$/;
		return expr.test(email);
	};
	
	function validateContactForm() {		
		if ($('#name').val().length === 0) {
			$('#E1').removeClass('hide_error');
			$('#E1').addClass('show_error');
			flag = false;
		}
		else {
			$('#E1').removeClass('show_error');
			$('#E1').addClass('hide_error');
		}			 

		if ($('#email').val().length === 0) {
			$('#E2').removeClass('hide_error');
			$('#E2').addClass('show_error');
			flag = false;
		}
		else {
			$('#E2').removeClass('show_error');
			$('#E2').addClass('hide_error');
			 
			if (!ValidateEmail($('#email').val())) {
				$('#E3').removeClass('hide_error');
				$('#E3').addClass('show_error');
				flag = false;
			}
			else {
				$('#E3').removeClass('show_error');
				$('#E3').addClass('hide_error');
			}
		}			 

		if ($('#message').val().length === 0) {
			$('#E4').removeClass('hide_error');
			$('#E4').addClass('show_error');
			flag = false;
		}
		else {
			$('#E4').removeClass('show_error');
			$('#E4').addClass('hide_error');
		}

		alert(flag);
		if (flag == true) {
			$("#ContactForm").submit();
		}
		else {
			return 1;
		}
	}
	
	$("#name").on("change", function() { 
		if(!flag)
		{
			$('#E1').removeClass('show_error');
			$('#E1').addClass('hide_error');
		}	
	});  
	
	$("#email").on("change", function() { 
		if(!flag)
		{
			$('#E2').removeClass('show_error');
			$('#E2').addClass('hide_error');
			$('#E3').removeClass('show_error');
			$('#E3').addClass('hide_error');
		}	
	}); 
	 
	function fnMessage()
	{
		if(!flag)
		{
			$('#E4').removeClass('show_error');
			$('#E4').addClass('hide_error');
		}	
	}
 
	
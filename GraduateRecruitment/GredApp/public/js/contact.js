	$("#name").on("change", function() { 
		if($('#name').val().length != 0)
		{
			$('#E1').removeClass('show_error');
			$('#E1').addClass('hide_error');
		}	
	});  
	
	$("#email").on("change", function() { 
		if($('#email').val().length != 0)
		{
			$('#E2').removeClass('show_error');
			$('#E2').addClass('hide_error');
			$('#E3').removeClass('show_error');
			$('#E3').addClass('hide_error');
		}	
	}); 
	
	$("#ddlDepartment").on("change", function() { 
		if($('#ddlDepartment').val() != "-select-")
		{
			$('#E4').removeClass('show_error');
			$('#E4').addClass('hide_error');
		}	
	}); 
	 
	function fnMessage()
	{
		if($('textarea#message').val().length != 0)
		{ 
			$('#E5').removeClass('show_error');
			$('#E5').addClass('hide_error');
		}	
	}
$(function(){
	$("#email").on("change", function() { 
		if($('#email').val().length != 0)
		{
			$.post("api/verfiyEmail",{ 
				email : $("#email").val(),
			},verfiyEmailAlert)
		}	
	});
	
	$("#facultyid").on("change", function() { 
		if($('#facultyid').val().length != 0)
		{
			$.post("api/verfiyFaculty",{ 
				facultyid : $("#facultyid").val(),
			},verfiyFacultyAlert)
		}	
	}); 
	
	$("#registeruserform").submit(function(e){
		e.preventDefault(); 
		 
		if(validateSignUp())
		{ 
			$.post("api/registerUser",{
				firstName : $("#firstName").val(),
				lastName : $("#lastName").val(),
				email : $("#email").val(),
				facultyid : $("#facultyid").val(),
				password : $("#password").val()
			},funNewRegistrationAlert)
		}	
	});
	
	function verfiyEmailAlert(data)
	{
		alert("verfiyEmail" + data.email);
	}
	
	function verfiyFacultyAlert(data)
	{
		alert(" verfiyFaculty " + data);
	}
	
	function funNewRegistrationAlert(data)
	{
		alert(" funNewRegistrationAlert " + data);
	}
	
	function isValidEmailAddress(emailAddress) {
	    var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
	    return pattern.test(emailAddress);
	}
	
	function validateSignUp()
	{
		var flag = true;
		
		if($("#firstName").val()== null || $("#firstName").val()== '')
		{ 
			$("#E1").removeClass("hide_control");
			$("#E1").addClass("show_control");
			flag = false;
		}
		else
		{
			$("#E1").removeClass("show_control");
			$("#E1").addClass("hide_control");
		}
		
		
		if($("#lastName").val()== null || $("#lastName").val()== '')
		{
			$("#E2").removeClass("hide_control");
			$("#E2").addClass("show_control");
			flag = false;
		}
		else
		{
			$("#E2").removeClass("show_control");
			$("#E2").addClass("hide_control");
		}
		
		if($("#email").val()== null || $("#email").val()== '')
		{
			$("#E3").removeClass("hide_control");
			$("#E3").addClass("show_control");	
			flag = false;
		}
		else
		{
			$("#E3").removeClass("show_control");
			$("#E3").addClass("hide_control");
			
			if(!isValidEmailAddress($("#email").val())) 
			{ 
				$("#E33").removeClass("hide_control");
				$("#E33").addClass("show_control");
			}
			else
			{
				$("#E33").removeClass("show_control");
				$("#E33").addClass("hide_control");
			}
		}
		
		if($("#password").val()== null || $("#password").val()== '')
		{
			$("#E4").removeClass("hide_control");
			$("#E4").addClass("show_control");
			flag = false;
		}
		else
		{
			$("#E4").removeClass("show_control");
			$("#E4").addClass("hide_control");
		}
		
		if(document.getElementById('isFaculty').checked) { 
		    if($("#facultyid").val()== null || $("#facultyid").val()== '')
			{
				$("#E5").removeClass("hide_control");
				$("#E5").addClass("show_control");
				flag = false;
			}
			else
			{
				$("#E5").removeClass("show_control");
				$("#E5").addClass("hide_control");
			}
		}  
		
		if (flag == true) {
			return true;
		}
		else {
			return false; //need to change
		}
		 
	}
	
	
	
});
$(function(){
	
	/* register user */
	
	$("#email").on("change", function() { 
		if($('#email').val().length != 0)
		{
			$.post("/verfiyEmail",{ 
				email : $("#email").val(),
			},verfiyEmailAlert)
		}	
		else
		{
			$("#E333").removeClass("show_error");
			$("#E333").addClass("hide_error");
			$("#E333").text("");
		}
	});
	
	$("#facultyid").on("change", function() { 
		if($('#facultyid').val().length != 0)
		{
			$.post("/verfiyFaculty",{ 
				facultyid : $("#facultyid").val(),
			},verfiyFacultyAlert)
		}	
	}); 
	
	$("#registeruserform").submit(function(e){
		e.preventDefault(); 
		  
		if(validateSignUp())
		{ 
			$.post("/registerUser",{
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
		if (typeof(data.errno) != "undefined" &&  data.errno!="") {
			$("#alertMessage").text(data.sqlMessage)
		}
		else if(data.length == 0)
		{
			$("#E333").removeClass("show_error");
			$("#E333").addClass("hide_error");
			$("#E333").text("");
		}
		else { 			
			if(data!=null && data[0].email!=null && data[0].email!="")
			{
				$("#E333").removeClass("hide_error");
				$("#E333").addClass("show_error");
				$("#E333").text("Email id already exists");
			}
			else	
			{
				$("#E333").removeClass("show_error");
				$("#E333").addClass("hide_error");
				$("#E333").text("");
			}
		}
	}
	
	function verfiyFacultyAlert(data)
	{ 
		if (typeof(data.errno) != "undefined" &&  data.errno!="") {
			$("#alertMessage").text(data.sqlMessage)
		}
		else if(data.length == 0)
		{
			$("#E55").removeClass("hide_error");
			$("#E55").addClass("show_error");
			$("#facultyid").val("");
			$("#E55").text("Invalid faculty id");
		}
		else { 			
			if(data!=null && data[0].facultyId !=null && data[0].facultyId !="")
			{
				$("#E55").removeClass("show_error");
				$("#E55").addClass("hide_error");
				$("#E55").text("");
			}
			else	
			{
				$("#E55").removeClass("hide_error");
				$("#E55").addClass("show_error");
				$("#facultyid").val("");
				$("#E55").text("Invalid faculty id");
			}
		}
	}
	
	function funNewRegistrationAlert(data)
	{
		if (typeof(data.errno) != "undefined" &&  data.errno!="") {
			$("#alertMessage").text(data.sqlMessage)
		}
		else {
			if(data.status==false)
			{
				$("#alertMessage").text(data.message)
			}
			else	
			{
				$("#firstName").val("");
				$("#lastName").val("");
				$("#email").val("");
				$("#facultyid").val("");
				$("#password").val("");
				  
				$("#newUserId").text(data[0].id);
				$("#uniEmailId").text(data[0].munEmail);
				$('#myModal').modal('toggle');
			}
		}
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
			$("#E1").removeClass("hide_error");
			$("#E1").addClass("show_error");
			flag = false;
		}
		else
		{
			$("#E1").removeClass("show_error");
			$("#E1").addClass("hide_error");
		}
		 
		if($("#lastName").val()== null || $("#lastName").val()== '')
		{
			$("#E2").removeClass("hide_error");
			$("#E2").addClass("show_error");
			flag = false;
		}
		else
		{
			$("#E2").removeClass("show_error");
			$("#E2").addClass("hide_error");
		}
		 
		if($("#email").val()== null || $("#email").val()== '')
		{
			$("#E3").removeClass("hide_error");
			$("#E3").addClass("show_error");	
			flag = false;
		}
		else
		{
			$("#E3").removeClass("show_error");
			$("#E3").addClass("hide_error");
			
			if(!isValidEmailAddress($("#email").val())) 
			{ 
				$("#E33").removeClass("hide_error");
				$("#E33").addClass("show_error");
			}
			else
			{
				$("#E33").removeClass("show_error");
				$("#E33").addClass("hide_error");
			}
		}
		
		if($("#password").val()== null || $("#password").val()== '')
		{
			$("#E4").removeClass("hide_error");
			$("#E4").addClass("show_error");
			flag = false;
		}
		else
		{
			$("#E4").removeClass("show_error");
			$("#E4").addClass("hide_error");
		}
		
		if(document.getElementById('isFaculty').checked) { 
		    if($("#facultyid").val()== null || $("#facultyid").val()== '')
			{
				$("#E5").removeClass("hide_error");
				$("#E5").addClass("show_error");
				flag = false;
			}
			else
			{
				$("#E5").removeClass("show_error");
				$("#E5").addClass("hide_error");
			}
		}  
		
		if (flag == true) {
			return true;
		}
		else {
			return false; //need to change
		}
		 
	}
	
/* validate login */
	
	$("#logininuserform").submit(function(e){
		e.preventDefault(); 
		 
		if(validateSignIn())
		{ 
			$.post("/verfiyCredentials",{
				memorialNumber : $("#memorialNumber").val(),
				password : $("#password").val()
			},funVerfiyCredentialsAlert)
		}	
		
	});
	
	function validateSignIn()
	{
		var flag= true;
		
		if($("#memorialNumber").val()== null || $("#memorialNumber").val()== '')
		{ 
			$("#E1").removeClass("hide_error");
			$("#E1").addClass("show_error");
			flag=false;
		}
		else
		{
			$("#E1").removeClass("show_error");
			$("#E1").addClass("hide_error");			
		}
				
		if($("#password").val()== null || $("#password").val()== '')
		{
			$("#E2").removeClass("hide_error");
			$("#E2").addClass("show_error");
			flag=false;
		}
		else
		{
			$("#E2").removeClass("show_error");
			$("#E2").addClass("hide_error");
		}
		 
		if (flag == true) {
			return true;
		}
		else {
			return false; //need to change
		}
	}
	
	function funVerfiyCredentialsAlert(data)
	{
		if (typeof(data.errno) != "undefined" &&  data.errno!="") {
			$("#alertMessage").text(data.sqlMessage)
		}
		else {
			if(data.status==false)
			{
				$("#alertMessage").text(data.message)
			}
			else	
			{
				//console.log(data);
				window.location.href = "/";
			}
		}
	}
	
/* recover password*/
	
	$("#recoverpasswordform").submit(function(e){
		e.preventDefault(); 
		 
		if(validateRecoverPwd())
		{ 
			$.post("/recoverPassword",{
				memorialNumber : $("#memorialNumber").val(),
				email : $("#email").val()
			},funRecoverPasswordAlert)
		}	
		
	});
	
	function funRecoverPasswordAlert(data)
	{ 
		if (typeof(data.errno) != "undefined" &&  data.errno!="") {
			$("#alertMessage").text(data.sqlMessage)
		}
		else { 
			if(data.status==false)
			{
				$("#alertMessage").text(data.message)
			}
			else	
			{
				if(data.status==false)
				{
					$("#alertMessage").text(data.message)
				}
				else
				{
					$("#memorialNumber").val("");
					$("#email").val("");
					 
					$("#recover_password").text(data.password);
					$('#myModalSign').modal('toggle');
				}
			}
		} 
	}
	
	function validateRecoverPwd()
	{
		var flag= true;
		var flag1= true;
		
		if($("#memorialNumber").val()== null || $("#memorialNumber").val()== '')
		{ 
			$("#E1").removeClass("hide_error");
			$("#E1").addClass("show_error");
			flag=false;
		}
		else
		{
			$("#E1").removeClass("show_error");
			$("#E1").addClass("hide_error");
			$("#E2").removeClass("show_error");
			$("#E2").addClass("hide_error");
		}
				
		if(flag == false && ($("#email").val()== null || $("#email").val()== ''))
		{
			$("#E2").removeClass("hide_error");
			$("#E2").addClass("show_error");
			flag1=false;
		}
		else
		{
			$("#E2").removeClass("show_error");
			$("#E2").addClass("hide_error");
			$("#E1").removeClass("show_error");
			$("#E1").addClass("hide_error");
		}
		 
		if (flag == true || flag1 == true) {
			return true;
		}
		else {
			return false;
		}
	}
});
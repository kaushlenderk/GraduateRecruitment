$(document).ready(function () {
    var counter = 0;

    /* start education */
    
    $("#addEducation").on("click", function () {
    	
    	if(validateEducationSection())
    	{
	    	$('#educationDivData').addClass("show_error");
			$('#educationDivData').removeClass('hide_error');
			    
	    	var program=$("#eddlprogram").val();
	    	var field_of_study=$("#efieldofstudy").val();
	    	var institute_name_address=$("textarea#einstituename_address").val();
	    	var graduation_date=$("#egraduationdate").val();
	    	
	        var newRow = $("<tr>");
	        var cols = "";
	  
	        cols += '<td class="col-sm-3"><label class="form-control education_row" name="eddlprogram">' + program + '</label> </td>';
	        cols += '<td class="col-sm-3"><label class="form-control education_row" name="efieldofstudy">' + field_of_study + '</label> </td>';
	        cols += '<td class="col-sm-3"><label class="form-control education_row" name="einstituename_address">' + institute_name_address + '</label> </td>';
			cols += '<td class="col-sm-2"><label class="form-control education_row" name="egraduationdate">' + graduation_date + '</label> </td>';
	        cols += '<td class="col-sm-1"><input type="button" class="ibtnDel btn btn-md btn-danger " style="padding: 1px 6px;font-weight: bold;" value="Delete"></td>';
	        newRow.append(cols);
	        $("#educationTable").append(newRow);
	        counter++;
	        
	        $('#eddlprogram option')[0].selected = true; 
	        $("#efieldofstudy").val("");
	        $("#einstituename_address").val("");
	        $("#egraduationdate").val("");
        }
 
        $("#educationTable").on("click", ".ibtnDel", function (event) {
	        $(this).closest("tr").remove();       
	        counter -= 1
	        var rowCount = $('#educationTable tr').length;
	        if(rowCount==1)
	        {
	        	$('#educationDivData').addClass("hide_error");
				$('#educationDivData').removeClass('show_error');
	        }
	    });
	});
	 
	 
	function validateEducationSection() {
		
		var flag = true;
		
		if ($('#eddlprogram').val() == "-select-") {
			$('#EE1').removeClass('hide_error');
			$('#EE1').addClass('show_error');
			flag = false;
		}
		else {
			$('#EE1').removeClass('show_error');
			$('#EE1').addClass('hide_error');
		} 
		
		if ($('#efieldofstudy').val().length === 0) {
			$('#EE2').removeClass('hide_error');
			$('#EE2').addClass('show_error');
			flag = false;
		}
		else {
			$('#EE2').removeClass('show_error');
			$('#EE2').addClass('hide_error');
		}			 

		if ($('textarea#einstituename_address').val().length === 0) {
			$('#EE3').removeClass('hide_error');
			$('#EE3').addClass('show_error');
			flag = false;
		}
		else {
			$('#EE3').removeClass('show_error');
			$('#EE3').addClass('hide_error');
		}	 
		
		if ($('#egraduationdate').val().length === 0) {
			$('#EE4').removeClass('hide_error');
			$('#EE4').addClass('show_error');
			flag = false;
		}
		else {
			$('#EE4').removeClass('show_error');
			$('#EE4').addClass('hide_error');
		}
 
		if (flag == true) {
			return true;
		}
		else {
			return false;
		}
	}
	
	$("#eddlprogram").on('change', function() {
	    if ($(this).val() != '-select-'){
	        $("#EE1").removeClass("show_error");
			$("#EE1").addClass("hide_error");
	    } 
	});

	$('#efieldofstudy').on('change',function(e){
		if($("#efieldofstudy").val()!= null || $("#efieldofstudy").val()!= '')
		{ 
			$("#EE2").removeClass("show_error");
			$("#EE2").addClass("hide_error");
		}
	});
	
	$('textarea#einstituename_address').on('change',function(e){
		if($("textarea#einstituename_address").val()!= null || $("textarea#einstituename_address").val()!= '')
		{ 
			$("#EE3").removeClass("show_error");
			$("#EE3").addClass("hide_error");
		}
	});
	
	$("#btnEducationCloseModel").click(function(){
		$("#EE1").removeClass("show_error");
		$("#EE1").addClass("hide_error");
		$("#EE2").removeClass("show_error");
		$("#EE2").addClass("hide_error");
		$("#EE3").removeClass("show_error");
		$("#EE3").addClass("hide_error");
		$("#EE4").removeClass("show_error");
		$("#EE4").addClass("hide_error");

		$('#eddlprogram option')[0].selected = true; 
        $("#efieldofstudy").val("");
        $("#einstituename_address").val("");
        $("#egraduationdate").val("");
	});
	
	/* end education */
	
	$('#rpiddlprogram').on('change', function() {
		  var degree = this.value;
		  
		  $.post("/getResearchTitle",{
			  degree : degree
		  },fnResearchArea)
	});
	
	function fnResearchArea(data)
	{ 
		if (typeof(data.errno) != "undefined" &&  data.errno!="") {
			$("#actionProfileStudentModalMessage").text(data.sqlMessage);
			$('#myStudentModal').modal('show');
		}
		else { 
			$('#rpiddlresearcharea option:not(:first)').remove(); 
			
			var select = document.getElementById("rpiddlresearcharea");
			$.each(data,function(key,item){
				var option = document.createElement("option");
				option.text = item.researchTitle;
				option.value = item.researchTitle;
				select.appendChild(option);
			});
		} 
	}
	 
	
	/* start research publication */
	
	$("#addResearchPublicationModel").on("click", function () {
    	
    	if(validatePublicationSection())
    	{
	    	$('#publicationResearchDivData').addClass("show_error");
			$('#publicationResearchDivData').removeClass('hide_error');
			    
	    	var rpname=$("#rpname").val();
	    	var rppublicationArea=$("#rppublicationArea").val();
	    	var rpdescription=$("textarea#rpdescription").val();
	    	var rppublicationdate=$("#rppublicationdate").val();
	    	
	        var newRow = $("<tr>");
	        var cols = "";
	
	        cols += '<td class="col-sm-3"><label class="form-control education_row" name="eddlprogram">' + rpname + '</label> </td>';
	        cols += '<td class="col-sm-3"><label class="form-control education_row" name="efieldofstudy">' + rppublicationArea + '</label> </td>';
	        cols += '<td class="col-sm-3"><label class="form-control education_row" name="einstituename_address">' + rpdescription + '</label> </td>';
			cols += '<td class="col-sm-2"><label class="form-control education_row" name="egraduationdate">' + rppublicationdate + '</label> </td>';
	        cols += '<td class="col-sm-1"><input type="button" class="ibtnDel btn btn-md btn-danger " style="padding: 1px 6px;font-weight: bold;" value="Delete"></td>';
	        newRow.append(cols);
	        $("#publicationResearchTable").append(newRow);
	        counter++;
	         
	        $("#rpname").val("");
	        $("#rppublicationArea").val("");
	        $("#rpdescription").val("");
	        $("#rppublicationdate").val("");
        }
 
        $("#publicationResearchTable").on("click", ".ibtnDel", function (event) {
	        $(this).closest("tr").remove();       
	        counter -= 1
	        var rowCount = $('#publicationResearchTable tr').length;
	        if(rowCount==1)
	        {
	        	$('#publicationResearchDivData').addClass("hide_error");
				$('#publicationResearchDivData').removeClass('show_error');
	        }
	    });
	});
	 
	 
	function validatePublicationSection() {
		
		var flag = true;
		
		if ($('#rpname').val().length === 0) {
			$('#RE1').removeClass('hide_error');
			$('#RE1').addClass('show_error');
			flag = false;
		}
		else {
			$('#RE1').removeClass('show_error');
			$('#RE1').addClass('hide_error');
		} 
		
		if ($('#rppublicationArea').val().length === 0) {
			$('#RE2').removeClass('hide_error');
			$('#RE2').addClass('show_error');
			flag = false;
		}
		else {
			$('#RE2').removeClass('show_error');
			$('#RE2').addClass('hide_error');
		}			 

		if ($('textarea#rpdescription').val().length === 0) {
			$('#RE3').removeClass('hide_error');
			$('#RE3').addClass('show_error');
			flag = false;
		}
		else {
			$('#RE3').removeClass('show_error');
			$('#RE3').addClass('hide_error');
		}	 
		
		if ($('#rppublicationdate').val().length === 0) {
			$('#RE4').removeClass('hide_error');
			$('#RE4').addClass('show_error');
			flag = false;
		}
		else {
			$('#RE4').removeClass('show_error');
			$('#RE4').addClass('hide_error');
		}
 
		if (flag == true) {
			return true;
		}
		else {
			return false;
		}
	}
	
	$('#rpname').on('change',function(e){
		if($("#rpname").val()!= null || $("#rpname").val()!= '')
		{ 
			$("#RE1").removeClass("show_error");
			$("#RE1").addClass("hide_error");
		}
	});

	$('#rppublicationArea').on('change',function(e){
		if($("#rppublicationArea").val()!= null || $("#rppublicationArea").val()!= '')
		{ 
			$("#RE2").removeClass("show_error");
			$("#RE2").addClass("hide_error");
		}
	});
	
	$('textarea#rpdescription').on('change',function(e){
		if($("textarea#rpdescription").val()!= null || $("textarea#rpdescription").val()!= '')
		{ 
			$("#RE3").removeClass("show_error");
			$("#RE3").addClass("hide_error");
		}
	});
	
	$("#btnResearchPublicationModel").click(function(){
		$("#RE1").removeClass("show_error");
		$("#RE1").addClass("hide_error");
		$("#RE2").removeClass("show_error");
		$("#RE2").addClass("hide_error");
		$("#RE3").removeClass("show_error");
		$("#RE3").addClass("hide_error");
		$("#RE4").removeClass("show_error");
		$("#RE4").addClass("hide_error");
		
		$("#rpname").val("");
        $("#rppublicationArea").val("");
        $("#rpdescription").val("");
        $("#rppublicationdate").val("");
	});
	/* end research publication  */
	
	/* start work experience */
	
	$("#addWorkExperienceModel").on("click", function () {
    	
    	if(validateWorkExperiencSection())
    	{
	    	$('#workExperienceDivData').addClass("show_error");
			$('#workExperienceDivData').removeClass('hide_error');
			    
	    	var weinstitution=$("#weinstitution").val();
	    	var rpposition=$("#rpposition").val();
	    	var rplocation=$("#rplocation").val();
	    	var rpnumberofmonthexperience=$("#rpnumberofmonthexperience").val(); 
	    	
	        var newRow = $("<tr>");
	        var cols = "";
	
	        cols += '<td class="col-sm-3"><label class="form-control education_row" name="weinstitution">' + weinstitution + '</label> </td>';
	        cols += '<td class="col-sm-3"><label class="form-control education_row" name="rpposition">' + rpposition + '</label> </td>';
	        cols += '<td class="col-sm-3"><label class="form-control education_row" name="rplocation">' + rplocation + '</label> </td>';
			cols += '<td class="col-sm-2"><label class="form-control education_row" name="rpnumberofmonthexperience">' + rpnumberofmonthexperience + '</label> </td>'; 
	        cols += '<td class="col-sm-1"><input type="button" class="ibtnDel btn btn-md btn-danger " style="padding: 1px 6px;font-weight: bold;" value="Delete"></td>';
	        
	        newRow.append(cols);
	        $("#workExperienceTable").append(newRow);
	        counter++;
	         
	        $("#weinstitution").val("");
	        $("#rpposition").val("");
	        $("#rplocation").val("");
	        $("#rpnumberofmonthexperience").val("");
        }
 
        $("#workExperienceTable").on("click", ".ibtnDel", function (event) {
	        $(this).closest("tr").remove();       
	        counter -= 1
	        var rowCount = $('#workExperienceTable tr').length;
	        if(rowCount==1)
	        {
	        	$('#workExperienceDivData').addClass("hide_error");
				$('#workExperienceDivData').removeClass('show_error');
	        }
	    });
	});
	 
	 
	function validateWorkExperiencSection() {
		
		var flag = true;
		
		if ($('#weinstitution').val().length === 0) {
			$('#WE1').removeClass('hide_error');
			$('#WE1').addClass('show_error');
			flag = false;
		}
		else {
			$('#WE1').removeClass('show_error');
			$('#WE1').addClass('hide_error');
		} 
		
		if ($('#rpposition').val().length === 0) {
			$('#WE2').removeClass('hide_error');
			$('#WE2').addClass('show_error');
			flag = false;
		}
		else {
			$('#WE2').removeClass('show_error');
			$('#WE2').addClass('hide_error');
		}			 

		if ($('#rplocation').val().length === 0) {
			$('#WE3').removeClass('hide_error');
			$('#WE3').addClass('show_error');
			flag = false;
		}
		else {
			$('#WE3').removeClass('show_error');
			$('#WE3').addClass('hide_error');
		}	 
		
		if ($('#rpnumberofmonthexperience').val().length === 0) {
			$('#WE4').removeClass('hide_error');
			$('#WE4').addClass('show_error');
			flag = false;
		}
		else {
			$('#WE4').removeClass('show_error');
			$('#WE4').addClass('hide_error');
		}
 
		if (flag == true) {
			return true;
		}
		else {
			return false;
		}
	}
	
	$('#weinstitution').on('change',function(e){
		if($("#weinstitution").val()!= null || $("#weinstitution").val()!= '')
		{ 
			$("#WE1").removeClass("show_error");
			$("#WE1").addClass("hide_error");
		}
	});

	$('#rpposition').on('change',function(e){
		if($("#rpposition").val()!= null || $("#rpposition").val()!= '')
		{ 
			$("#WE2").removeClass("show_error");
			$("#WE2").addClass("hide_error");
		}
	});
	
	$('#rplocation').on('change',function(e){
		if($("#rplocation").val()!= null || $("#rplocation").val()!= '')
		{ 
			$("#WE3").removeClass("show_error");
			$("#WE3").addClass("hide_error");
		}
	});
	
	$('#rpnumberofmonthexperience').on('change',function(e){
		if($("#rpnumberofmonthexperience").val()!= null || $("#rpnumberofmonthexperience").val()!= '')
		{ 
			$("#WE4").removeClass("show_error");
			$("#WE4").addClass("hide_error");
		}
	});
		
	$("#btnWorkExperienceModel").click(function(){
		$("#WE1").removeClass("show_error");
		$("#WE1").addClass("hide_error");
		$("#WE2").removeClass("show_error");
		$("#WE2").addClass("hide_error");
		$("#WE3").removeClass("show_error");
		$("#WE3").addClass("hide_error");
		$("#WE4").removeClass("show_error");
		$("#WE4").addClass("hide_error"); 
		
		$("#weinstitution").val("");
        $("#rpposition").val("");
        $("#rplocation").val("");
        $("#rpnumberofmonthexperience").val("");
	});

	
	/* end work experience  */
	
	/* start Program Research Interest */
	$("#addResearchProgramResearchInterestModel").on("click", function () {
    	
    	if(validateProgramResearchInterestSection())
    	{
	    	$('#researchProgramResearchInterestDivData').addClass("show_error");
			$('#researchProgramResearchInterestDivData').removeClass('hide_error');
			    
	    	var rpiddlprogram=$("#rpiddlprogram").val();
	    	var rpiddlresearcharea=$("#rpiddlresearcharea").val();
	    	var rpidescription=$("textarea#rpidescription").val();
	    	var skillSet = $("#select_item").val();
	    	
	        var newRow = $("<tr>");
	        var cols = "";
	
	        cols += '<td class="col-sm-2"><label class="form-control education_row" name="rpiddlprogram">' + rpiddlprogram + '</label> </td>';
	        cols += '<td class="col-sm-2"><label class="form-control education_row" name="rpiddlresearcharea">' + rpiddlresearcharea + '</label> </td>';
	        cols += '<td class="col-sm-4"><label class="form-control education_row" name="rpidescription">' + rpidescription + '</label> </td>';
	        cols += '<td class="col-sm-3"><label class="form-control education_row" name="skillSet">' + skillSet + '</label> </td>';
	        cols += '<td class="col-sm-1"><input type="button" class="ibtnDel btn btn-md btn-danger " style="padding: 1px 6px;font-weight: bold;" value="Delete"></td>';
	        
	        newRow.append(cols);
	        $("#researchProgramResearchInterestTable").append(newRow);
	        counter++;
	         
	        $('#rpiddlprogram option')[0].selected = true; 
	        $('#rpiddlresearcharea option')[0].selected = true;
	        $("#rpidescription").val("");
        }
 
        $("#researchProgramResearchInterestTable").on("click", ".ibtnDel", function (event) {
	        $(this).closest("tr").remove();       
	        counter -= 1
	        var rowCount = $('#researchProgramResearchInterestTable tr').length;
	        if(rowCount==1)
	        {
	        	$('#researchProgramResearchInterestDivData').addClass("hide_error");
				$('#researchProgramResearchInterestDivData').removeClass('show_error');
	        }
	    });
	});
	
function validateProgramResearchInterestSection() {
		
		var flag = true;
		
		if ($('#rpiddlprogram').val() == "-select-") {
			$('#RIE1').removeClass('hide_error');
			$('#RIE1').addClass('show_error');
			flag = false;
		}
		else {
			$('#RIE1').removeClass('show_error');
			$('#RIE1').addClass('hide_error');
		} 
		
		if ($('#rpiddlresearcharea').val() == "-select-") {
			$('#RIE2').removeClass('hide_error');
			$('#RIE2').addClass('show_error');
			flag = false;
		}
		else {
			$('#RIE2').removeClass('show_error');
			$('#RIE2').addClass('hide_error');
		}  		 

		if ($('textarea#rpidescription').val().length === 0) {
			$('#RIE3').removeClass('hide_error');
			$('#RIE3').addClass('show_error');
			flag = false;
		}
		else {
			$('#RIE3').removeClass('show_error');
			$('#RIE3').addClass('hide_error');
		}	 
		
		if ($('#select_item').val()  === null) {
			$('#RIE4').removeClass('hide_error');
			$('#RIE4').addClass('show_error');
			flag = false;
		}
		else {
			$('#RIE4').removeClass('show_error');
			$('#RIE4').addClass('hide_error');
		}	 
 
		if (flag == true) {
			return true;
		}
		else {
			return false;
		}
	}
	
	$("#rpiddlprogram").on('change', function() {
	    if ($(this).val() != '-select-'){
	        $("#RIE1").removeClass("show_error");
			$("#RIE1").addClass("hide_error");
	    } 
	});
	
	$("#rpiddlresearcharea").on('change', function() {
	    if ($(this).val() != '-select-'){
	        $("#RIE2").removeClass("show_error");
			$("#RIE2").addClass("hide_error");
	    } 
	});

	$('textarea#rpidescription').on('change',function(e){
		if($("textarea#rpidescription").val()!= null || $("textarea#rpidescription").val()!= '')
		{ 
			$("#RIE3").removeClass("show_error");
			$("#RIE3").addClass("hide_error");
		}
	});
	
	$("#btnResearchProgramResearchInterestModel").click(function(){
		$("#RIE1").removeClass("show_error");
		$("#RIE1").addClass("hide_error");
		$("#RIE2").removeClass("show_error");
		$("#RIE2").addClass("hide_error");
		$("#RIE3").removeClass("show_error");
		$("#RIE3").addClass("hide_error");
		$("#RIE4").removeClass("show_error");
		$("#RIE4").addClass("hide_error");
		
		$('#rpiddlprogram option')[0].selected = true; 
		$('#rpiddlresearcharea option')[0].selected = true;
        $("#rpidescription").val("");
	});
	/* end Program Research Interest */
	
	var btnClick="";
	$("#btnDraftProfile").click(function(){
		btnClick ="btnDraftProfile";
	});
	
	$("#btnSubmitProfile").click(function(){
		btnClick ="btnSubmitProfile";
	});
	
	/*start get form data */
	
	var UserId = $("#userIdData").val(); 
	
	$.post("/getProfile",{
		userId : UserId
	},fnGetProfile)
 
	function fnGetProfile(data)
	{  
		var isFinancial="";
		var isDraftStatus="";
		var rowCount = 0;
		
		$.each(data,function(key,item){
			$("#firstName").val(item.firstName);
			$("#lastName").val(item.lastName);
			$("#email").val(item.email);
			$("#dateofbirth").val(item.dateOfBirth);
			$("#contactnumber").val(item.contactNumber);
			$("#address").val(item.address);
			isFinancial = item.isFinancialSupportNeed;
			isDraftStatus = item.isDraft;
			rowCount=1;
		}); 
		
		if(isFinancial==1)
		{
			$('#isFinancialSupportNeed').prop('checked', true);
		}
		
		if(rowCount==0)
		{ 
			$('#btnDraftProfile').addClass("show_error");
			$('#btnDraftProfile').removeClass("hide_error");
			$('#btnSubmitProfile').addClass("show_error");
			$('#btnSubmitProfile').removeClass("hide_error");
		}
		else if(isDraftStatus==1)
		{
			$('#btnDraftProfile').addClass("show_error");
			$('#btnDraftProfile').removeClass("hide_error");
			$('#btnSubmitProfile').addClass("show_error");
			$('#btnSubmitProfile').removeClass("hide_error");
			$("#btnSubmitProfile").html('Submit Profile');
		}
		else if(isDraftStatus==0)
		{
			$('#btnDraftProfile').addClass("hide_error");
			$('#btnDraftProfile').removeClass("show_error");
			$('#btnSubmitProfile').addClass("show_error");
			$('#btnSubmitProfile').removeClass("hide_error"); 
			$('#btnResearchInterest').addClass("hide_error");
			$('#btnResearchInterest').removeClass("show_error");
			$('#btnResearchInterest1').addClass("hide_error");
			$('#btnResearchInterest1').removeClass("show_error");
			$("#btnSubmitProfile").html('Update Profile');		
			
		}
		
	}
	
	$.post("/getEducation",{
		userId : UserId
	},fnGetEducation)
 
	function fnGetEducation(data)
	{  
		var isFinancial="";
		$.each(data,function(key,item){
			var count=0;
			 
			$('#educationDivData').addClass("show_error");
			$('#educationDivData').removeClass('hide_error');
			
			var newRow = $("<tr>");
	        var cols = "";
	
	        cols += '<td class="col-sm-3"><label class="form-control education_row" name="eddlprogram">' + item.program+ '</label> </td>';
	        cols += '<td class="col-sm-3"><label class="form-control education_row" name="efieldofstudy">' + item.fieldOfStudy + '</label> </td>';
	        cols += '<td class="col-sm-3"><label class="form-control education_row" name="einstituename_address">' + item.instituteNameAddress + '</label> </td>';
			cols += '<td class="col-sm-2"><label class="form-control education_row" name="egraduationdate">' + item.graduationDate + '</label> </td>';
	        cols += '<td class="col-sm-1"><input type="button" class="ibtnDel btn btn-md btn-danger " style="padding: 1px 6px;font-weight: bold;" value="Delete"></td>';
	        newRow.append(cols);
	        $("#educationTable").append(newRow);
	        counter++;
		});  
	}
	
	$.post("/getPublication",{
		userId : UserId
	},fnGetPublication)
 
	function fnGetPublication(data)
	{  
		$.each(data,function(key,item){
			var count=0;
			 
			$('#publicationResearchDivData').addClass("show_error");
			$('#publicationResearchDivData').removeClass('hide_error');
			     	    	
	        var newRow = $("<tr>");
	        var cols = "";
	
	        cols += '<td class="col-sm-3"><label class="form-control education_row" name="eddlprogram">' + item.publicationName + '</label> </td>';
	        cols += '<td class="col-sm-3"><label class="form-control education_row" name="efieldofstudy">' + item.publicationArea + '</label> </td>';
	        cols += '<td class="col-sm-3"><label class="form-control education_row" name="einstituename_address">' + item.publicationDescription + '</label> </td>';
			cols += '<td class="col-sm-2"><label class="form-control education_row" name="egraduationdate">' + item.publicationDate + '</label> </td>';
	        cols += '<td class="col-sm-1"><input type="button" class="ibtnDel btn btn-md btn-danger " style="padding: 1px 6px;font-weight: bold;" value="Delete"></td>';
	        newRow.append(cols);
	        $("#publicationResearchTable").append(newRow);
	        
	        counter++; 
		});  
	}
	
	$.post("/getWorkExperience",{
		userId : UserId
	},fnGetWorkExperience)
 
	function fnGetWorkExperience(data)
	{  
		$.each(data,function(key,item){
			var count=0;
			 
			$('#workExperienceDivData').addClass("show_error");
			$('#workExperienceDivData').removeClass('hide_error');
			     	    	
	        var newRow = $("<tr>");
	        var cols = "";
	
	        cols += '<td class="col-sm-3"><label class="form-control education_row" name="eddlprogram">' + item.institution + '</label> </td>';
	        cols += '<td class="col-sm-3"><label class="form-control education_row" name="efieldofstudy">' + item.position + '</label> </td>';
	        cols += '<td class="col-sm-3"><label class="form-control education_row" name="einstituename_address">' + item.location + '</label> </td>';
			cols += '<td class="col-sm-2"><label class="form-control education_row" name="egraduationdate">' + item.monthOfExperience + '</label> </td>';
	        cols += '<td class="col-sm-1"><input type="button" class="ibtnDel btn btn-md btn-danger " style="padding: 1px 6px;font-weight: bold;" value="Delete"></td>';
	        newRow.append(cols);
	        $("#workExperienceTable").append(newRow);
	        counter++; 
		});  
	}
	
	$.post("/getProgramResearchInterest",{
		userId : UserId
	},fnGetProgramResearchIntereste)
 
	function fnGetProgramResearchIntereste(data)
	{  
		$.each(data,function(key,item){
			var count=0;
			 
			$('#researchProgramResearchInterestDivData').addClass("show_error");
			$('#researchProgramResearchInterestDivData').removeClass('hide_error');
			     
	        var newRow = $("<tr>");
	        var cols = "";
	
	        cols += '<td class="col-sm-2"><label class="form-control education_row" name="rpiddlprogram">' + item.program + '</label> </td>';
	        cols += '<td class="col-sm-2"><label class="form-control education_row" name="rpiddlresearcharea">' + item.researchArea + '</label> </td>';
	        cols += '<td class="col-sm-4"><label class="form-control education_row" name="rpidescription">' + item.researchDescription + '</label> </td>';
	        cols += '<td class="col-sm-3"><label class="form-control education_row" name="skillSet">' + item.skillSet + '</label> </td>';
	        cols += '<td class="col-sm-1"><input type="button" class="ibtnDel btn btn-md btn-danger " style="padding: 1px 6px;font-weight: bold;" value="Delete"></td>';
	        
	        newRow.append(cols);
	        $("#researchProgramResearchInterestTable").append(newRow);
	       
	        counter++; 
		});  
	} 
	
	/*end get form data */
	
	/*start save form data */
	 		
	$("#userProfileform").submit(function(e){
		e.preventDefault();  
		
		var isDraft = 0;		
		var userId = 0; 
		var isFinancialSupportNeed=0;
		
		if($('#isFinancialSupportNeed').prop('checked')) {
			isFinancialSupportNeed = 1;
		} 
		
		userId = $("#userIdData").val();
		 
		if(validateFormData() && userId!="")
		{ 
			if(btnClick==="btnDraftProfile")
			{
				isDraft=1;
			} 
			 
			$.post("/student",{
				userId : userId,
				firstName : $("#firstName").val(),
				lastName : $("#lastName").val(),
				email : $("#email").val(),
				dateofbirth : $("#dateofbirth").val(),
				contactnumber : $("#contactnumber").val(),
				address : $("#address").val(),
				isFinancialSupportNeed:isFinancialSupportNeed,
				isDraft : isDraft
			},funAlertProfile)
			
			
			//education			
			$.post("/education",{
					userId : userId,
					program : "",
					fieldOfStudy : "",
					instituteNameAddress : "",
					graduationDate : ""
			},funAlertProfile)
				
			$("#educationTable").find('tbody tr').each(function (i, el) {
		        var $tds = $(this).find('td'),
		        program = $tds.eq(0).text(),
		        fieldOfStudy = $tds.eq(1).text(),
		        instituteNameAddress = $tds.eq(2).text(),
		        graduationDate = $tds.eq(3).text(); 
		        
		        $.post("/education",{
					userId : userId,
					program : program,
					fieldOfStudy : fieldOfStudy,
					instituteNameAddress : instituteNameAddress,
					graduationDate : graduationDate
				},funAlertProfile)
		        	
		    }); 
			
			//publication
			$.post("/publication",{
				userId : userId,
				publicationName : "",
				publicationArea : "",
				publicationDescription : "",
				publicationDate : ""
			},funAlertProfile)
			
			$("#publicationResearchTable").find('tbody tr').each(function (i, el) {
		        var $tds = $(this).find('td'),
		        rpname = $tds.eq(0).text(),
		        rppublicationArea = $tds.eq(1).text(),
		        rpdescription = $tds.eq(2).text(),
		        rppublicationdate = $tds.eq(3).text(); 
		        
		        $.post("/publication",{
					userId : userId,
					publicationName : rpname,
					publicationArea : rppublicationArea,
					publicationDescription : rpdescription,
					publicationDate : rppublicationdate
				},funAlertProfile)
		        	
		    }); 
			
			//workExperience
			$.post("/workExperience",{
				userId : userId,
				institution : "",
				position : "",
				location : "",
				monthOfExperience : ""
			},funAlertProfile)
			
			$("#workExperienceTable").find('tbody tr').each(function (i, el) {
		        var $tds = $(this).find('td'),
		        institution = $tds.eq(0).text(),
		        position = $tds.eq(1).text(),
		        location = $tds.eq(2).text(),
		        monthOfExperience = $tds.eq(3).text(); 
		        
		        $.post("/workExperience",{
					userId : userId,
					institution : institution,
					position : position,
					location : location,
					monthOfExperience : monthOfExperience
				},funAlertProfile)
		        	
		    }); 
			
			//researchInterest
			$.post("/researchInterest",{
				userId : userId,
				program : "",
				researchArea : "",
				researchDescription : "",
				skillSet:""
			},funAlertProfile)
			
			$("#researchProgramResearchInterestTable").find('tbody tr').each(function (i, el) {
		        var $tds = $(this).find('td'),
		        program = $tds.eq(0).text(),
		        researchArea = $tds.eq(1).text(),
		        researchDescription = $tds.eq(2).text(),
		        skillSet = $tds.eq(3).text(); 
		        
		        $.post("/researchInterest",{
					userId : userId,
					program : program,
					researchArea : researchArea,
					researchDescription : researchDescription,
					skillSet:skillSet
				},funAlertProfile)
		        	
		    }); 
		}	
	});
	
	function funAlertProfile(data)
	{ 
		if (typeof(data.errno) != "undefined" &&  data.errno!="") { 
			$("#actionProfileStudentModalMessage").text(data.sqlMessage);
			$('#myStudentModal').modal('show');
		}
		else {
			if(data.status==false)
			{ 
				$("#actionProfileStudentModalMessage").text(data.message);
				$('#myStudentModal').modal('show');
			}
			else	
			{ 
				if(btnClick == "btnSubmitProfile")
				{
					$('#btnDraftProfile').addClass("hide_error");
					$('#btnDraftProfile').removeClass("show_error");
					$("#btnSubmitProfile").html('Update Profile');
				}
				$("#actionProfileStudentModalMessage").text("Profile has been successfully saved");
				$('#myStudentModal').modal('show');
			}
		} 
	}
	
	function ValidateEmail(email) {
		var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
	    return pattern.test(email);
	};
	
	function validateFormData()
	{
		var flag = true;

		if ($('#firstName').val().length === 0) {
			$('#E1').removeClass('hide_error');
			$('#E1').addClass('show_error');
			flag = false;
		}
		else {
			$('#E1').removeClass('show_error');
			$('#E1').addClass('hide_error');
		}			 

		if ($('#lastName').val().length === 0) {
			$('#E2').removeClass('hide_error');
			$('#E2').addClass('show_error');
			flag = false;
		}
		else {
			$('#E2').removeClass('show_error');
			$('#E2').addClass('hide_error');
		}
		
		if ($('#email').val().length === 0) {
			$('#E3').removeClass('hide_error');
			$('#E3').addClass('show_error');
			flag = false;
		}
		else {
			$('#E3').removeClass('show_error');
			$('#E3').addClass('hide_error'); 
			
			if (!ValidateEmail($('#email').val())) {
				$('#E33').removeClass('hide_error');
				$('#E33').addClass('show_error');
				flag = false;
			}
			else {
				$('#E33').removeClass('show_error');
				$('#E33').addClass('hide_error');
			}
		}	
		
		if ($('#dateofbirth').val().length === 0) {
			$('#E4').removeClass('hide_error');
			$('#E4').addClass('show_error');
			flag = false;
		}
		else {
			$('#E4').removeClass('show_error');
			$('#E4').addClass('hide_error');
		}
		
		if ($('#contactnumber').val().length === 0) {
			$('#E5').removeClass('hide_error');
			$('#E5').addClass('show_error');
			flag = false;
		}
		else {
			$('#E5').removeClass('show_error');
			$('#E5').addClass('hide_error');
		}
		
		if ($('#address').val().length === 0) {
			$('#E6').removeClass('hide_error');
			$('#E6').addClass('show_error');
			flag = false;
		}
		else {
			$('#E6').removeClass('show_error');
			$('#E6').addClass('hide_error');
		}
		
		if (flag == true) {
			return true;
		}
		else {
			return false;
		}
	}
	
	$('#firstName').on('change',function(e){
		if($("#firstName").val()!= null || $("#firstName").val()!= '')
		{ 
			$("#E1").removeClass("show_error");
			$("#E1").addClass("hide_error");
		}
	});
	
	$('#lastName').on('change',function(e){
		if($("#lastName").val()!= null || $("#lastName").val()!= '')
		{ 
			$("#E2").removeClass("show_error");
			$("#E2").addClass("hide_error");
		}
	});
	
	$('#email').on('change',function(e){
		if($("#email").val()!= null || $("#email").val()!= '')
		{ 
			$("#E3").removeClass("show_error");
			$("#E3").addClass("hide_error");
			$("#E33").removeClass("show_error");
			$("#E33").addClass("hide_error");
		} 
	});
	
	$('#dateofbirth').on('change',function(e){
		if($("#dateofbirth").val()!= null || $("#dateofbirth").val()!= '')
		{ 
			$("#E4").removeClass("show_error");
			$("#E4").addClass("hide_error");
		}
	});
	
	$('#contactnumber').on('change',function(e){
		if($("#contactnumber").val()!= null || $("#contactnumber").val()!= '')
		{ 
			$("#E5").removeClass("show_error");
			$("#E5").addClass("hide_error");
		}
	});
	
	$('#address').on('change',function(e){
		if($("#address").val()!= null || $("#address").val()!= '')
		{ 
			$("#E6").removeClass("show_error");
			$("#E6").addClass("hide_error");
		}
	}); 
	
	/*end save form data */
	
	/* start Student enrollment and view program section */

	var admissionStatus = {
			0:'Pending Decision',
			1:'Offered',
			2:'Reject',
			3:'Accept',
			4:'Decline'
	 };
	
	var studentId = $("#userIdData").val(); 
	
	$.post("/GetStudentOfferAdmissionDetail",{
		studentId : studentId
	},GetStudentOfferAdmissionDetail)
 
	function GetStudentOfferAdmissionDetail(data)
	{  
		$("#studentEnrollmentProfileTable > tbody").html("");
		
		$.each(data,function(key,item){	
			var count=0; 
			$.each(item,function(keyValue,itemValue){	
				console.log("status" + admissionStatus[itemValue.status]);
				
				var status = admissionStatus[itemValue.status];
				
				if(status != undefined)
				{ 
					$('#noRecordDivResult').addClass("hide_error");
					$('#noRecordDivResult').removeClass('show_error');
					
					$('#studentEnrollmentProfileTable').addClass("show_error");
					$('#studentEnrollmentProfileTable').removeClass('hide_error');
					
					var newRow = $("<tr>");
			        var cols = "";
			        
			        cols += '<td style="display:none;"><label class="form-control education_row" name="id">' + itemValue.id + '</label> </td>';
			        cols += '<td class="col-sm-1"><label class="form-control education_row" name="userId">' + itemValue.userId + '</label> </td>';
			        cols += '<td class="col-sm-2"><label class="form-control education_row" name="name">' + itemValue.name + '</label> </td>';
			        cols += '<td class="col-sm-2"><label class="form-control education_row" name="researchArea">' + itemValue.researchArea + '</label> </td>';
			        cols += '<td class="col-sm-3"><label class="form-control education_row" name="skillset">' + itemValue.skillSet + '</label> </td>';
			        cols += '<td class="col-sm-1"><label class="form-control education_row" name="admissionStatus">' + status + '</label> </td>';
				 
					if(itemValue.status == 1)
					{
						cols += '<td class="col-sm-3"><input type="button" class="ibtnDeles1 btn btn-md btn-danger" style="padding: 1px 6px;font-weight: bold;" value="View">&nbsp;<input type="button" class="ibtnDeles2 btn btn-md btn-danger " style="padding: 1px 6px;font-weight: bold;" value="Accept">&nbsp;<input type="button" class="ibtnDeles3 btn btn-md btn-danger " style="padding: 1px 6px;font-weight: bold;" value="Decline"></td>';
					}
					if(itemValue.status == 3 || itemValue.status==4)
					{
						cols += '<td class="col-sm-3"><input type="button" class="ibtnDeles1 btn btn-md btn-danger" style="padding: 1px 6px;font-weight: bold;" value="View"></td>';
					}
					else
					{
						cols += '<td class="col-sm-3">&nbsp;</td>';
					}
			        newRow.append(cols);
			        $("#studentEnrollmentProfileTable").append(newRow);
				}
		        
			});
			 
	      counter++; 
		}); 
	}
	
	//view
	$("#studentEnrollmentProfileTable").on("click", ".ibtnDeles1", function (event) {
		$('#programDetailDivData').addClass("show_error");
		$('#programDetailDivData').removeClass('hide_error'); 
		 
		//get row 
		var $tr = $("#mappedStudentProfileTable"); 
		var row = $(this).closest("tr").index(); 
		row = row + 1;
		 
		var userId =document.getElementById("studentEnrollmentProfileTable").rows[row].cells[1].innerHTML;  
		
		
		/*if(userId.length>0)
		{
			userId = userId.replace('<label class="form-control education_row" name="userId">','');
			userId = userId.replace('</label>','');
		}
		  
		
		if(userId.length>0)
		{
			$.post("/getProgramResearchInterest",{
				userId : userId
			},getResearchProjectStudentData)
			
			$.post("/getEducation",{
				userId : userId
			},getEducationProjectStudentData)
			
			$.post("/getPublication",{
				userId : userId
			},getPublicationStudentData)
			
			$.post("/getWorkExperience",{
				userId : userId
			},getWorkExperienceStudentData)
		} */
    });
	
	
	//accept admission
	$("#studentEnrollmentProfileTable").on("click", ".ibtnDeles2", function (event) {
		$('#programDetailDivData').addClass("hide_error");
		$('#programDetailDivData').removeClass("show_error"); 
		
		var $tr = $("#studentEnrollmentProfileTable"); 
		var row = $(this).closest("tr").index(); 
		row = row + 1;
		 
		var id =document.getElementById("studentEnrollmentProfileTable").rows[row].cells[0].innerHTML;  
		var userId =document.getElementById("studentEnrollmentProfileTable").rows[row].cells[1].innerHTML;  
		
		if(id.length>0)
		{
			id = id.replace('<label class="form-control education_row" name="id">','');
			id = id.replace('</label>','');
		} 
		
		if(userId.length>0)
		{
			userId = userId.replace('<label class="form-control education_row" name="userId">','');
			userId = userId.replace('</label>','');
		} 
		 
		if(id.length>0)
		{
			$.post("/setAcceptAdmissions",{
				id : id,
				userId:userId
			},setEnrollmetStatus)
		}
    });
	
	//reject admission
	$("#studentEnrollmentProfileTable").on("click", ".ibtnDeles3", function (event) {
		$('#programDetailDivData').addClass("hide_error");
		$('#programDetailDivData').removeClass("show_error"); 
		
		var $tr = $("#mappedStudentProfileTable"); 
		var row = $(this).closest("tr").index(); 
		row = row + 1;
		 
		var id =document.getElementById("studentEnrollmentProfileTable").rows[row].cells[0].innerHTML;  
		var userId =document.getElementById("studentEnrollmentProfileTable").rows[row].cells[1].innerHTML;  
		
		if(id.length>0)
		{
			id = id.replace('<label class="form-control education_row" name="id">','');
			id = id.replace('</label>','');
		} 
		
		if(userId.length>0)
		{
			userId = userId.replace('<label class="form-control education_row" name="userId">','');
			userId = userId.replace('</label>','');
		} 
		 
		if(id.length>0)
		{
			$.post("/setRejectAdmissionsOffer",{
				id : id,
				userId:userId
			},setEnrollmetStatus)
		}
    });
	function setEnrollmetStatus(data)
	{
		if (typeof(data.errno) != "undefined" &&  data.errno!="") {
			//$("#alertMessage").text(data.sqlMessage)
		} 
		else { 			
			if(data.status==true)
			{ 
				$.post("/GetStudentOfferAdmissionDetail",{
					studentId : studentId
				},GetStudentOfferAdmissionDetail)
			} 
		} 
	}
	
	$('#btnHideprogramDetailDivDataView').on('click', function() {
		$('#programDetailDivData').addClass("hide_error");
		$('#programDetailDivData').removeClass("show_error"); 
	});
	/* end Student enrollment and view program section */

});




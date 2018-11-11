$(function(){
	
	var counter = 0;
	
	$.getJSON('/getDepartmentList',fnDepartment);
	
	function fnDepartment(data)
	{ 
		var select = document.getElementById("department_id");
		
		$.each(data,function(key,item){
			var option = document.createElement("option");
			option.text = item.DeptName;
			option.value = item.DeptName;
			select.appendChild(option);
		});
	}
	
	$('#department_id').on('change', function() {
		  var data = this.value;
		  
		  $.post("/getDepartmentBranch",{
			  DeptName : data
		  },fnDepartmentBranch)
	});
	
	function fnDepartmentBranch(data)
	{ 
		if (typeof(data.errno) != "undefined" &&  data.errno!="") {
			$("#alertMessage").text(data.sqlMessage)
		}
		else { 
			$('#program_id option:not(:first)').remove();
			
			var select = document.getElementById("program_id");
			$.each(data,function(key,item){
				var option = document.createElement("option");
				option.text = item.DeptBranch;
				option.value = item.DeptBranch;
				select.appendChild(option);
			});
		} 
	}
	
	/* start research interest */
    
    $("#addResearchDetail").on("click", function () {
    	
    	if(validateResearchSection())
    	{
	    	$('#offeredResearchDivData').addClass("show_error");
			$('#offeredResearchDivData').removeClass('hide_error');
			    
	    	var research_title_id=$("#research_title_id").val();
	    	var research_description_id=$("textarea#research_description_id").val();
	    	var project_fund_id=$("#project_fund_id").val();	    	
	    	var skill_set_select_id=$("#select_item").val();
	    	
	        var newRow = $("<tr>");
	        var cols = "";
	  
	        cols += '<td class="col-sm-3"><label class="form-control education_row" name="research_title_id">' + research_title_id + '</label> </td>';
	        cols += '<td class="col-sm-3"><label class="form-control education_row" name="research_description_id">' + research_description_id + '</label> </td>';
	        cols += '<td class="col-sm-3"><label class="form-control education_row" name="project_fund_id">' + project_fund_id + '</label> </td>';
			cols += '<td class="col-sm-2"><label class="form-control education_row" name="skill_set_select_id">' + skill_set_select_id + '</label> </td>';
	        cols += '<td class="col-sm-1"><input type="button" class="ibtnDel btn btn-md btn-danger " style="padding: 1px 6px;font-weight: bold;" value="Delete"></td>';
	        newRow.append(cols);
	        $("#offeredResearchTable").append(newRow);
	        counter++;
	        
	        $("#research_title_id").val("");
	        $("#research_description_id").val("");
	        $("#project_fund_id").val("");  
        }
 
        $("#offeredResearchTable").on("click", ".ibtnDel", function (event) {
	        $(this).closest("tr").remove();       
	        counter -= 1
	        var rowCount = $('#offeredResearchTable tr').length;
	        if(rowCount==1)
	        {
	        	$('#offeredResearchDivData').addClass("hide_error");
				$('#offeredResearchDivData').removeClass('show_error');
	        }
	    });
	});
	 
	 
	function validateResearchSection() {
		 
		var flag = true;
		
		if ($('#research_title_id').val().length === 0) {
			$('#SE1').removeClass('hide_error');
			$('#SE1').addClass('show_error');
			flag = false;
		}
		else {
			$('#SE1').removeClass('show_error');
			$('#SE1').addClass('hide_error');
		}			 

		if ($('textarea#research_description_id').val().length === 0) {
			$('#SE2').removeClass('hide_error');
			$('#SE2').addClass('show_error');
			flag = false;
		}
		else {
			$('#SE2').removeClass('show_error');
			$('#SE2').addClass('hide_error');
		}	 
		
		if ($('#project_fund_id').val().length === 0) {
			$('#SE3').removeClass('hide_error');
			$('#SE3').addClass('show_error');
			flag = false;
		}
		else {
			$('#SE3').removeClass('show_error');
			$('#SE3').addClass('hide_error');
		}
 
		if ($('#select_item').val()  === null) {
			$('#SE4').removeClass('hide_error');
			$('#SE4').addClass('show_error');
			flag = false;
		}
		else {
			$('#SE4').removeClass('show_error');
			$('#SE4').addClass('hide_error');
		}

		if (flag == true) {
			return true;
		}
		else {
			return false;
		}
	}
	
	$('#research_title_id').on('change',function(e){
		if($("#research_title_id").val()!= null || $("#research_title_id").val()!= '')
		{ 
			$("#SE1").removeClass("show_error");
			$("#SE1").addClass("hide_error");
		}
	});
	
	$('textarea#research_description_id').on('change',function(e){
		if($("textarea#research_description_id").val()!= null || $("textarea#research_description_id").val()!= '')
		{ 
			$("#SE2").removeClass("show_error");
			$("#SE2").addClass("hide_error");
		}
	});
	
	$('#project_fund_id').on('change',function(e){
		if($("#project_fund_id").val()!= null || $("#project_fund_id").val()!= '')
		{ 
			$("#SE3").removeClass("show_error");
			$("#SE3").addClass("hide_error");
		}
	});
	
	$("#select_item").on('change', function() {
	    if ($(this).val() != ''){
	        $("#SE4").removeClass("show_error");
			$("#SE4").addClass("hide_error");
	    } 
	});

	
	$("#closeResearchDetailModel").click(function(){
		$("#SE1").removeClass("show_error");
		$("#SE1").addClass("hide_error");
		$("#SE2").removeClass("show_error");
		$("#SE2").addClass("hide_error");
		$("#SE3").removeClass("show_error");
		$("#SE3").addClass("hide_error");
		$("#SE4").removeClass("show_error");
		$("#SE4").addClass("hide_error");

		$("#research_title_id").val("");
        $("#research_description_id").val("");
        $("#project_fund_id").val("");
        $("#select_item").val(""); 
	});
	
	/* end research interest */
	
	/* post research data */
	
	$("#createProjectForm").submit(function(e){
		e.preventDefault();  
		
		var userId = $("#userIdData").val();
		var isDraft = 0;
		
		if(validateFormData())
		{ 
			$.post("/setProjectData",{
				department : $("#department_id").val(),
				program : $("#program_id").val(),
				degree : $("#degree_id").val(),
				programDuration : $("#program_duration_id").val(),
				programStartDate : $("#program_start_date_id").val(),
				applicationEndDate : $("#application_end_date_id").val(),
				numberOfPosition : $("#number_of_position_id").val(),
				financialSupport : $("#available_amount_id").val(),
				otherRequirement : $("#other_requirement_id").val(), 
				isDraft : isDraft,
				userId : userId,
				projectId:"0"
			},fnCreateProject)
		}
		
	});
	
	function fnCreateProject(data){
		if (typeof(data.errno) != "undefined" &&  data.errno!="") {
			$("#alertMessage").text(data.sqlMessage)
		}
		else { 
			if(data>=1)
			{
				//publication
				$.post("/setProjectResearchDetail",{
					projectId : data,
					researchTitle : "",
					researchDescription : "",
					projectFund : "",
					skillSet : ""
				},funDeleteResearchAlert)
				
				$("#offeredResearchTable").find('tbody tr').each(function (i, el) {
			        var $tds = $(this).find('td'),
			        researchTitle = $tds.eq(0).text(),
			        researchDescription = $tds.eq(1).text(),
			        projectFund = $tds.eq(2).text(),
			        skillSet = $tds.eq(3).text(); 
			        
			        $.post("/setProjectResearchDetail",{
			        	projectId : data,
			        	researchTitle : researchTitle,
			        	researchDescription : researchDescription,
			        	projectFund : projectFund,
			        	skillSet : skillSet
					},funCreateProjectAlert)
			        	
			    }); 
			} 
		} 
	}
	
	function funDeleteResearchAlert(data)
	{
		
	}
	
	function funCreateProjectAlert(data)
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
				document.getElementById('alertMessage').style.opacity = 0.7;
				$("#alertMessage").text("Profile has been successfully saved");
			}
		} 
	}
	
	function validateFormData()
	{
		var flag = true;
 
		if ($('#department_id').val() == "-select-") {
			$('#ES1').removeClass('hide_error');
			$('#ES1').addClass('show_error');
			flag = false;
		}
		else {
			$('#ES1').removeClass('show_error');
			$('#ES1').addClass('hide_error');
		} 
		
		if ($('#program_id').val() == "-select-") {
			$('#ES2').removeClass('hide_error');
			$('#ES2').addClass('show_error');
			flag = false;
		}
		else {
			$('#ES2').removeClass('show_error');
			$('#ES2').addClass('hide_error');
		} 
		
		if ($('#degree_id').val() == "-select-") {
			$('#ES3').removeClass('hide_error');
			$('#ES3').addClass('show_error');
			flag = false;
		}
		else {
			$('#ES3').removeClass('show_error');
			$('#ES3').addClass('hide_error');
		} 
		
		if ($('#program_duration_id').val().length === 0) {
			$('#ES4').removeClass('hide_error');
			$('#ES4').addClass('show_error');
			flag = false;
		}
		else {
			$('#ES4').removeClass('show_error');
			$('#ES4').addClass('hide_error');
		}	
		
		if ($('#program_start_date_id').val().length === 0) {
			$('#ES5').removeClass('hide_error');
			$('#ES5').addClass('show_error');
			flag = false;
		}
		else {
			$('#ES5').removeClass('show_error');
			$('#ES5').addClass('hide_error');
		}	
				
		if ($('#application_end_date_id').val().length === 0) {
			$('#ES6').removeClass('hide_error');
			$('#ES6').addClass('show_error');
			flag = false;
		}
		else {
			$('#ES6').removeClass('show_error');
			$('#ES6').addClass('hide_error');
		}	
		
		if ($('#number_of_position_id').val().length === 0) {
			$('#ES7').removeClass('hide_error');
			$('#ES7').addClass('show_error');
			flag = false;
		}
		else {
			$('#ES7').removeClass('show_error');
			$('#ES7').addClass('hide_error');
		}	
		
		if ($('#other_requirement_id').val().length === 0) {
			$('#ES8').removeClass('hide_error');
			$('#ES8').addClass('show_error');
			flag = false;
		}
		else {
			$('#ES8').removeClass('show_error');
			$('#ES8').addClass('hide_error');
		}	
		
		if (flag == true) {
			return true;
		}
		else {
			return false;
		}
	}
	
	$("#department_id").on('change', function() {
	    if ($(this).val() != '-select-'){
	        $("#ES1").removeClass("show_error");
			$("#ES1").addClass("hide_error");
	    } 
	});
	
	$("#program_id").on('change', function() {
	    if ($(this).val() != '-select-'){
	        $("#ES2").removeClass("show_error");
			$("#ES2").addClass("hide_error");
	    } 
	});
	
	$("#degree_id").on('change', function() {
	    if ($(this).val() != '-select-'){
	        $("#ES3").removeClass("show_error");
			$("#ES3").addClass("hide_error");
	    } 
	});
	
	
	$('#program_duration_id').on('change',function(e){
		if($("#program_duration_id").val()!= null || $("#program_duration_id").val()!= '')
		{ 
			$("#ES4").removeClass("show_error");
			$("#ES4").addClass("hide_error");
		}
	});
	
	$('#program_start_date_id').on('change',function(e){
		if($("#program_start_date_id").val()!= null || $("#program_start_date_id").val()!= '')
		{ 
			$("#ES5").removeClass("show_error");
			$("#ES5").addClass("hide_error");
		}
	});
	
	$('#application_end_date_id').on('change',function(e){
		if($("#application_end_date_id").val()!= null || $("#application_end_date_id").val()!= '')
		{ 
			$("#ES6").removeClass("show_error");
			$("#ES6").addClass("hide_error");
		}
	});
	
	$('#number_of_position_id').on('change',function(e){
		if($("#number_of_position_id").val()!= null || $("#number_of_position_id").val()!= '')
		{ 
			$("#ES7").removeClass("show_error");
			$("#ES7").addClass("hide_error");
		}
	});
	
	$('#other_requirement_id').on('change',function(e){
		if($("#other_requirement_id").val()!= null || $("#other_requirement_id").val()!= '')
		{ 
			$("#ES8").removeClass("show_error");
			$("#ES8").addClass("hide_error");
		}
	});
	/* end research data */
});
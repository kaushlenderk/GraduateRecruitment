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
		
		var select1 = document.getElementById("department_filter_id");
		
		$.each(data,function(key,item){
			var option = document.createElement("option");
			option.text = item.DeptName;
			option.value = item.DeptName;
			select1.appendChild(option);
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
			$("#actionMessage").text(data.sqlMessage);
			$('#myCreateProjectModal').modal('show');
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
	
	$('#department_filter_id').on('change', function() {
		  var DeptName = this.value;
		  
		  $('#createProjectSection').addClass("hide_error");
		  $('#createProjectSection').removeClass('show_error');
		  $('#addedProjectDivData').addClass("hide_error");
		  $('#addedProjectDivData').removeClass("show_error");
		  
		  $("#addedProjectTable > tbody").html("");
		  
		  $.post("/getAddedProject",{
			  DeptName : DeptName
		  },fnAddedProjectData)
	});
	
	function fnAddedProjectData(data)
	{ 
		if (typeof(data.errno) != "undefined" &&  data.errno!="") {
			$("#actionMessage").text(data.sqlMessage);
			$('#myCreateProjectModal').modal('show');
		}
		else {  
			$("#addedProjectTable > tbody").html("");
			
			$.each(data,function(key,item){				
				var count=0; 
				$('#addedProjectDivData').addClass("show_error");
				$('#addedProjectDivData').removeClass('hide_error');
				     	    	
				var isPublish = "Not Published";
				if(item.isDraft==1)
				{
					isPublish="Published";
				}
				
		        var newRow = $("<tr>");
		        var cols = "";
		
		        cols += '<td class="col-sm-1"><label class="form-control education_row" name="id">' + item.id + '</label> </td>';
		        cols += '<td class="col-sm-2"><label class="form-control education_row" name="program">' + item.program + '</label> </td>';
		        cols += '<td class="col-sm-2"><label class="form-control education_row" name="programDuration">' + item.programDuration + '</label> </td>';
		        cols += '<td class="col-sm-2"><label class="form-control education_row" name="egraduationdate">' + item.applicationEndDate + '</label> </td>';
				cols += '<td class="col-sm-2"><label class="form-control education_row" name="egraduationdate">' + isPublish + '</label> </td>';
				
				if(item.isDraft==1)
				{
					cols += '<td class="col-sm-3"><input type="button" class="ibtnDel2 btn btn-md btn-danger" style="padding: 1px 6px;font-weight: bold;" value="View" id="btnViewProject"></td>';
				}
				else
				{					
					cols += '<td class="col-sm-2"><input type="button" class="ibtnDel3 btn btn-md btn-danger" style="padding: 1px 6px;font-weight: bold;" value="Edit">&nbsp;<input type="button" class="ibtnDel4 btn btn-md btn-danger" style="padding: 1px 6px;font-weight: bold;" value="Publish">&nbsp;<input type="button" class="ibtnDel1 btn btn-md btn-danger " style="padding: 1px 6px;font-weight: bold;" value="Delete"></td>';
				}
				
				
		        newRow.append(cols);
		        $("#addedProjectTable").append(newRow);
		        
		        counter++; 
			}); 
			 
		} 
	}
	
	//delete
	$("#addedProjectTable").on("click", ".ibtnDel1", function (event) {
		 
		var table = document.getElementById('addedProjectTable');
		var $tr = $("#addedProjectTable"); 
		var row = $(this).closest("tr").index(); 
		row = row + 1;
		 
		var projectId =document.getElementById("addedProjectTable").rows[row].cells[0].innerHTML;  
		
		if(projectId.length>0)
		{
			projectId = projectId.replace('<label class="form-control education_row" name="id">','');
			projectId = projectId.replace('</label>','');
		}
			
		fnDeleteExistingProject(projectId);
		
        $(this).closest("tr").remove();       
        counter -= 1
        var rowCount = $('#addedProjectTable tr').length;
        
        if(rowCount==1)
        {
        	$('#addedProjectDivData').addClass("hide_error");
			$('#addedProjectDivData').removeClass('show_error');
			
			$('#createProjectSection').addClass("hide_error");
			$('#createProjectSection').removeClass('show_error');
			
			$('#department_filter_id option')[0].selected = true;
        }
    });
	
	//view
	$("#addedProjectTable").on("click", ".ibtnDel2", function (event) {
		$('#createProjectSection').addClass("show_error");
		$('#createProjectSection').removeClass('hide_error');
		$('#divNewResearchProject1').addClass("hide_error");
		$('#divNewResearchProject1').removeClass('show_error');
		$('#divNewResearchProject2').addClass("hide_error");
		$('#divNewResearchProject2').removeClass('show_error');		
		$('#btnCreateProject').addClass("hide_error");
		$('#btnCreateProject').removeClass("show_error");
		
		//get row 
		var $tr = $("#addedProjectTable"); 
		var row = $(this).closest("tr").index(); 
		row = row + 1;
		 
		var projectId =document.getElementById("addedProjectTable").rows[row].cells[0].innerHTML;  
		
		if(projectId.length>0)
		{
			projectId = projectId.replace('<label class="form-control education_row" name="id">','');
			projectId = projectId.replace('</label>','');
		}
		
		if(projectId.length>0)
		{
			$.post("/getSelectedProject",{
				projectId : projectId
			},GetProjectData)
			
			$.post("/getSelectedResearchProject",{
				projectId : projectId
			},GetResearchProjectData)
		} 
    });
	
	function GetProjectData(data)
	{
		var tggCount=0;
		
		$.each(data,function(key,item){
			$("#projectIdHidden").val(item.id);
			$("#department_id").val(item.department);
			
			if(tggCount==0)
			{	
				$('#department_id')
		        .val(item.department)
		        .trigger('change');
				tggCount=1;
			}
			
			setTimeout(function(){
				$("#program_id").val(item.program);
		    }, 2000); 
			
			$("#degree_id").val(item.degree);
			$("#program_duration_id").val(item.programDuration);
			$("#program_start_date_id").val(item.programStartDate);
			$("#application_end_date_id").val(item.applicationEndDate);
			$("#number_of_position_id").val(item.numberOfPosition);
			$("#other_requirement_id").val(item.financialSupport);
			$("#available_amount_id").val(item.otherRequirement);
			
			
		});  
	}
	
	function GetResearchProjectData(data)
	{
		$("#offeredResearchTable > tbody").html("");
		$('#offeredResearchDivData').addClass("hide_error");
		$('#offeredResearchDivData').removeClass('show_error');
		
		$.each(data,function(key,item){
			var count=0;
			 
			$('#offeredResearchDivData').addClass("show_error");
			$('#offeredResearchDivData').removeClass('hide_error');
			
			var newRow = $("<tr>");
	        var cols = "";
	
	        cols += '<td class="col-sm-3"><label class="form-control education_row" name="research_title_id">' + item.researchTitle + '</label> </td>';
	        cols += '<td class="col-sm-3"><label class="form-control education_row" name="research_description_id">' + item.researchDescription	 + '</label> </td>';
	        cols += '<td class="col-sm-3"><label class="form-control education_row" name="project_fund_id">' + item.projectFund + '</label> </td>';
			cols += '<td class="col-sm-2"><label class="form-control education_row" name="skill_set_select_id">' + item.skillSet + '</label> </td>';
	        //cols += '<td class="col-sm-1"><input type="button" class="ibtnDel btn btn-md btn-danger " style="padding: 1px 6px;font-weight: bold;" value="Delete"></td>';
	        
	        newRow.append(cols);
	        $("#offeredResearchTable").append(newRow);
	        counter++;
		});  
	}
	
	//edit
	$("#addedProjectTable").on("click", ".ibtnDel3", function (event) {
		$('#createProjectSection').addClass("show_error");
		$('#createProjectSection').removeClass('hide_error'); 
		$('#btnCreateProject').removeClass('show_error');
		$('#btnCreateProject').removeClass('hide_error');
		$("#btnCreateProject").html('Update Project');
		
		//get row 
		var $tr = $("#addedProjectTable"); 
		var row = $(this).closest("tr").index(); 
		row = row + 1;
		 
		var projectId =document.getElementById("addedProjectTable").rows[row].cells[0].innerHTML;  
		
		if(projectId.length>0)
		{
			projectId = projectId.replace('<label class="form-control education_row" name="id">','');
			projectId = projectId.replace('</label>','');
		}
		
		if(projectId.length>0)
		{
			$('#divNewResearchProject1').addClass("show_error");
			$('#divNewResearchProject1').removeClass('hide_error');
			$('#divNewResearchProject2').addClass("show_error");
			$('#divNewResearchProject2').removeClass('hide_error');
				
			$.post("/getSelectedProject",{
				projectId : projectId
			},GetProjectData)
			
			$.post("/getSelectedResearchProject",{
				projectId : projectId
			},GetResearchProjectData)
		} 
    });
	
	//publish
	$("#addedProjectTable").on("click", ".ibtnDel4", function (event) {
		var table = document.getElementById('addedProjectTable');
		var $tr = $("#addedProjectTable"); 
		var row = $(this).closest("tr").index(); 
		row = row + 1;
		 
		var projectId =document.getElementById("addedProjectTable").rows[row].cells[0].innerHTML;  
		
		if(projectId.length>0)
		{
			projectId = projectId.replace('<label class="form-control education_row" name="id">','');
			projectId = projectId.replace('</label>','');
		}
		 
		if(projectId.length > 0)
		{ 
			$.post("/publishProject",{
				projectId : projectId
			},fnPublishProjectGrid)
		}
    });
	
	function fnPublishProjectGrid(data)
	{
		var DeptName =$("#department_filter_id").val();
		
		$.post("/getAddedProject",{
			  DeptName : DeptName
		  },fnAddedProjectData)
	}
	
	//delete project
	function fnDeleteExistingProject(projectId)
	{
		if(projectId.length > 0)
		{ 
			$.post("/deleteProject",{
				projectId : projectId
			},fnDelteProjectData)
		}		
	}
	
	function fnDelteProjectData(data)
	{
		if (typeof(data.errno) != "undefined" &&  data.errno!="") { 
			$("#actionMessage").text(data.sqlMessage);
			$('#myCreateProjectModal').modal('show'); 
		}
		else { 
			if(data.status==false)
			{ 
				$("#actionMessage").text(data.sqlMessage);
				$('#myCreateProjectModal').modal('show');
			}
			else	
			{ 
				$("#actionMessage").text(data.message);
				$('#myCreateProjectModal').modal('show'); 
				
			}
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
	 
	$("#btnCreateNewProject").on("click",function (event) {
		$('#createProjectSection').addClass("show_error");
		$('#createProjectSection').removeClass("hide_error");
		
		$('#btnCreateProject').addClass("show_error");
		$('#btnCreateProject').removeClass("hide_error");
		
		resetProjectData();
    });
	
	$("#btnCreateProjectClose").on("click",function (event) {
		$('#createProjectSection').addClass("hide_error");
		$('#createProjectSection').removeClass("show_error");
		
		resetProjectData();
    });
	
	function resetProjectData()
	{
		$("#projectIdHidden").val("");
		
		$('#department_id option')[0].selected = true; 
		$('#program_id option')[0].selected = true; 
		$('#degree_id option')[0].selected = true; 
        $("#program_duration_id").val("");
        $("#program_start_date_id").val("");
        $("#application_end_date_id").val("");
        $("#number_of_position_id").val("");
        $("#other_requirement_id").val("");
        $("#available_amount_id").val(""); 
        
        $("#btnCreateProject").html('Create Project');
        
        $('#divNewResearchProject1').addClass("show_error");
		$('#divNewResearchProject1').removeClass('hide_error');
		$('#divNewResearchProject2').addClass("show_error");
		$('#divNewResearchProject2').removeClass('hide_error');
		
		$('#offeredResearchDivData').addClass("hide_error");
		$('#offeredResearchDivData').removeClass('show_error');
		
		$("#offeredResearchTable > tbody").html("");
        
	}
	
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
			$.post("/setProjectDetail",{
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
				projectId:$("#projectIdHidden").val(),
			},fnCreateProject) 
		}
		
	});
	
	function fnCreateProject(data){
		if (typeof(data.errno) != "undefined" &&  data.errno!="") {
			$("#actionMessage").text(data.sqlMessage);
			$('#myCreateProjectModal').modal('show');
		}
		else { 
			if(data>=0)
			{
				if(data==0)
				{
					data = $("#projectIdHidden").val();
				}
				
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
			
			fnRefreshProjectData();
		} 
	}
	
	function fnRefreshProjectData()
	{
		$('#createProjectSection').addClass("hide_error");
		$('#createProjectSection').removeClass('show_error');
		
		var DeptName =$("#department_filter_id").val();
		
		$.post("/getAddedProject",{
			  DeptName : DeptName
		  },fnAddedProjectData)
	}
	
	function funDeleteResearchAlert(data)
	{
		console.log("delete existing research");
	}
	
	function funCreateProjectAlert(data)
	{
		if (typeof(data.errno) != "undefined" &&  data.errno!="") {
			$("#actionMessage").text(data.sqlMessage);
			$('#myCreateProjectModal').modal('show');
		}
		else {
			if(data.status==false)
			{
				$("#actionMessage").text(data.sqlMessage);
				$('#myCreateProjectModal').modal('show');
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
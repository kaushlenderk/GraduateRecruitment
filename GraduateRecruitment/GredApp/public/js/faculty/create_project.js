$(function(){
	
	var counter = 0;
	var loginInId = $("#userIdData").val();
	
	//$.getJSON('/getDepartmentList',fnDepartment);
	$.post("/getDepartmentList",{
		  loginInId : loginInId
	},fnDepartment)
	
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
					cols += '<td class="col-sm-3" style="text-align: right;"><input type="button" class="ibtnDel2 btn btn-md btn-danger" style="padding: 1px 6px;font-weight: bold;" value="View" id="btnViewProject"></td>';
				}
				else
				{					
					cols += '<td class="col-sm-2" style="text-align: right;"><input type="button" class="ibtnDel3 btn btn-md btn-danger" style="padding: 1px 6px;font-weight: bold;" value="Edit">&nbsp;<input type="button" class="ibtnDel4 btn btn-md btn-danger" style="padding: 1px 6px;font-weight: bold;" value="Publish">&nbsp;<input type="button" class="ibtnDel1 btn btn-md btn-danger " style="padding: 1px 6px;font-weight: bold;" value="Delete"></td>';
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
			$("#available_amount_id").val(item.financialSupport);
			$("#other_requirement_id").val(item.otherRequirement); 
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
	
	function GetResearchProjectEditData(data)
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
	        cols += '<td class="col-sm-1" style="text-align: right;"><input type="button" class="ibtnDel btn btn-md btn-danger " style="padding: 1px 6px;font-weight: bold;" value="Delete"></td>';
	        
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
			},GetResearchProjectEditData)
		} 
    });
	
	//publish
	$("#addedProjectTable").on("click", ".ibtnDel4", function (event) {
		$('#createProjectSection').addClass("hide_error");
		$('#createProjectSection').removeClass("show_error"); 
		
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
			research_title_id = research_title_id.toLowerCase().replace(/\b[a-z]/g, function(letter) {
			    return letter.toUpperCase();
			}); 
	    	
	    	var research_description_id=$("textarea#research_description_id").val();
	    	var project_fund_id=$("#project_fund_id").val();	    	
	    	var skill_set_select_id=$("#select_item").val();
	    	
	        var newRow = $("<tr>");
	        var cols = "";
	  
	        cols += '<td class="col-sm-3"><label class="form-control education_row" name="research_title_id">' + research_title_id + '</label> </td>';
	        cols += '<td class="col-sm-3"><label class="form-control education_row" name="research_description_id">' + research_description_id + '</label> </td>';
	        cols += '<td class="col-sm-3"><label class="form-control education_row" name="project_fund_id">' + project_fund_id + '</label> </td>';
			cols += '<td class="col-sm-2"><label class="form-control education_row" name="skill_set_select_id">' + skill_set_select_id + '</label> </td>';
	        cols += '<td class="col-sm-1" style="text-align: right;"><input type="button" class="ibtnDel btn btn-md btn-danger " style="padding: 1px 6px;font-weight: bold;" value="Delete"></td>';
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
	 
	
	 $("#number_of_position_id").on("keypress keyup blur",function (event) {    
         $(this).val($(this).val().replace(/[^\d].+/, ""));
          if ((event.which < 48 || event.which > 57)) {
              event.preventDefault();
          }
      });
	 
	 
	 $("#available_amount_id").on("keypress keyup blur",function (event) { 
		 $(this).val($(this).val().replace(/[^0-9\.]/g,''));
         if ((event.which != 46 || $(this).val().indexOf('.') != -1) && (event.which < 48 || event.which > 57)) {
             event.preventDefault();
         }
     });
	 
	 $("#project_fund_id").on("keypress keyup blur",function (event) { 
		 $(this).val($(this).val().replace(/[^0-9\.]/g,''));
         if ((event.which != 46 || $(this).val().indexOf('.') != -1) && (event.which < 48 || event.which > 57)) {
             event.preventDefault();
         }
     });
	/* end research data */
	 
	/* start enrollment data */
	 
 
	var admissionStatus = {
			0:'Pending Decision',
			1:'Offered',
			2:'Rejected',
			3:'Accepted',
			4:'Decline'
	 };
 
	 	
	 $.post("/GetMappedStudentProfile",{
		loginUserId : loginInId
	 },fnMappedStudentProfile);	
	
	 //$.getJSON('/GetMappedStudentProfile',fnMappedStudentProfile);
		
	 function fnMappedStudentProfile(data)
	 { 
		 	$("#mappedStudentProfileTable > tbody").html(""); 
		 	
		 	var student_list_id = document.getElementById("student_list_id");
			 
			$.each(data,function(key,item){	
				var count=0; 
				$.each(item,function(keyValue,itemValue){	 
					
					var status = admissionStatus[itemValue.status];
					
					if(status != undefined)
					{ 
						$('#noMappedDivResult').addClass("hide_error");
						$('#noMappedDivResult').removeClass('show_error');
						
						$('#mappedStudentProfileTable').addClass("show_error1");
						$('#mappedStudentProfileTable').removeClass('hide_error');
						 
						var newRow = $("<tr>");
				        var cols = "";
				        
				        cols += '<td style="display:none;"><label class="form-control education_row" name="id">' + itemValue.id + '</label> </td>';
				        cols += '<td class="col-sm-1"><label class="form-control education_row" name="userId">' + itemValue.userId + '</label> </td>';
				        cols += '<td class="col-sm-2"><label class="form-control education_row" name="name">' + itemValue.name + '</label> </td>';
				        cols += '<td class="col-sm-2"><label class="form-control education_row" name="researchArea">' + itemValue.researchArea + '</label> </td>';
				        cols += '<td class="col-sm-3"><label class="form-control education_row" name="skillset">' + itemValue.skillSet + '</label> </td>';
				        cols += '<td class="col-sm-2"><label class="form-control education_row" name="admissionStatus">' + status + '</label> </td>';
					
						if(itemValue.status == 0)
						{
							cols += '<td class="col-sm-2" style="text-align: right;"><input type="button" class="ibtnDels2 btn btn-md btn-danger" style="padding: 1px 6px;font-weight: bold;" value="View">&nbsp;<input type="button" class="ibtnDels3 btn btn-md btn-danger" style="padding: 1px 6px;font-weight: bold;" value="Offer">&nbsp;<input type="button" class="ibtnDels4 btn btn-md btn-danger " style="padding: 1px 6px;font-weight: bold;" value="Decline"></td>';
						} 
						else
						{
							cols += '<td class="col-sm-2" style="text-align: right;"><input type="button" class="ibtnDels1 btn btn-md btn-danger" style="padding: 1px 6px;font-weight: bold;" value="View" id="btnViewProject"></td>';
						}					
												
				        newRow.append(cols);
				        $("#mappedStudentProfileTable").append(newRow);
				        
				        //assesment section : student list
				        var option = document.createElement("option");
				        if(itemValue.status==3)
				        {
				        	option.text = itemValue.name;
							option.value = itemValue.userId;
							student_list_id.appendChild(option);
				        }
						
					}
			        
				});
				 
		      counter++; 
		}); 
	 } 
	 
		//view
		$("#mappedStudentProfileTable").on("click", ".ibtnDels2", function (event) {
			$('#studentPofileDivData').addClass("show_error");
			$('#studentPofileDivData').removeClass('hide_error'); 
			 
			//get row 
			var $tr = $("#mappedStudentProfileTable"); 
			var row = $(this).closest("tr").index(); 
			row = row + 1;
			 
			var userId =document.getElementById("mappedStudentProfileTable").rows[row].cells[1].innerHTML;  
			
			
			if(userId.length>0)
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
			}
	    });
		
		$("#mappedStudentProfileTable").on("click", ".ibtnDels1", function (event) {
			$('#studentPofileDivData').addClass("show_error");
			$('#studentPofileDivData').removeClass('hide_error'); 
			 
			//get row 
			var $tr = $("#mappedStudentProfileTable"); 
			var row = $(this).closest("tr").index(); 
			row = row + 1;
			 
			var userId =document.getElementById("mappedStudentProfileTable").rows[row].cells[1].innerHTML;  
			
			
			if(userId.length>0)
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
			}
	    });
		 
		function getResearchProjectStudentData(data)
		{
			$("#researchProgramInterestStudentTable > tbody").html("");
			 
			$.each(data,function(key,item){
				var count=0; 
				 
				var newRow = $("<tr>");
		        var cols = "";
		
		        cols += '<td class="col-sm-3"><label class="form-control education_row" name="program">' + item.program + '</label> </td>';
		        cols += '<td class="col-sm-3"><label class="form-control education_row" name="researchArea">' + item.researchArea	 + '</label> </td>';
		        cols += '<td class="col-sm-3"><label class="form-control education_row" name="researchDescription">' + item.researchDescription + '</label> </td>';
				cols += '<td class="col-sm-3"><label class="form-control education_row" name="skill_set_select_id">' + item.skillSet + '</label> </td>';
		 
		        newRow.append(cols);
		        $("#researchProgramInterestStudentTable").append(newRow);
		        counter++;
			});  
		}
		

		function getEducationProjectStudentData(data)
		{   
			$("#educationStudentTable > tbody").html("");
			 
			$.each(data,function(key,item){
				var count=0;
				 
				//$('#educationStudentTable').addClass("show_error");
				$('#educationStudentTable').removeClass('hide_error');
				
				var newRow = $("<tr>");
		        var cols = "";
		
		        cols += '<td class="col-sm-3"><label class="form-control education_row" name="eddlprogram">' + item.program+ '</label> </td>';
		        cols += '<td class="col-sm-3"><label class="form-control education_row" name="efieldofstudy">' + item.fieldOfStudy + '</label> </td>';
		        cols += '<td class="col-sm-3"><label class="form-control education_row" name="einstituename_address">' + item.instituteNameAddress + '</label> </td>';
				cols += '<td class="col-sm-3"><label class="form-control education_row" name="egraduationdate">' + item.graduationDate + '</label> </td>';
		        newRow.append(cols);
		        $("#educationStudentTable").append(newRow);
		        counter++;
			});  
		}
		
		function getPublicationStudentData(data)
		{  
			$("#publicationResearchStudentTable > tbody").html("");
			
			$.each(data,function(key,item){
				var count=0;
				 
				//$('#publicationResearchStudentTable').addClass("show_error");
				$('#publicationResearchStudentTable').removeClass('hide_error');
				     	    	
		        var newRow = $("<tr>");
		        var cols = "";
		
		        cols += '<td class="col-sm-3"><label class="form-control education_row" name="publicationName">' + item.publicationName + '</label> </td>';
		        cols += '<td class="col-sm-3"><label class="form-control education_row" name="publicationArea">' + item.publicationArea + '</label> </td>';
		        cols += '<td class="col-sm-3"><label class="form-control education_row" name="publicationDescription">' + item.publicationDescription + '</label> </td>';
				cols += '<td class="col-sm-3"><label class="form-control education_row" name="publicationDate">' + item.publicationDate + '</label> </td>';

		        newRow.append(cols);
		        $("#publicationResearchStudentTable").append(newRow);
		        
		        counter++; 
			});  
		}
		
		function getWorkExperienceStudentData(data)
		{  
			$("#workExperienceStudentTable > tbody").html("");
			
			$.each(data,function(key,item){
				var count=0;
				 
				//$('#workExperienceStudentTable').addClass("show_error");
				$('#workExperienceStudentTable').removeClass('hide_error');
				     	    	
		        var newRow = $("<tr>");
		        var cols = "";
		
		        cols += '<td class="col-md-3"><label class="form-control education_row" name="institution">' + item.institution + '</label> </td>';
		        cols += '<td class="col-md-3"><label class="form-control education_row" name="position">' + item.position + '</label> </td>';
		        cols += '<td class="col-md-3"><label class="form-control education_row" name="location">' + item.location + '</label> </td>';
				cols += '<td class="col-md-3"><label class="form-control education_row" name="monthOfExperience">' + item.monthOfExperience + '</label> </td>';
				
		        newRow.append(cols);
		        $("#workExperienceStudentTable").append(newRow);
		        counter++; 
			});  
		}
		
		$('#btnHideStudentView').on('click', function() {
			$('#studentPofileDivData').addClass("hide_error");
			$('#studentPofileDivData').removeClass("show_error"); 
		});
		
		//Offer admission
		/*$("#mappedStudentProfileTable").on("click", ".ibtnDel3", function (event) {
			$('#createProjectSection').addClass("hide_error");
			$('#createProjectSection').removeClass("show_error"); 
			
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
		*/
		
		//offer admission
		$("#mappedStudentProfileTable").on("click", ".ibtnDels3", function (event) {
			$('#createProjectSection').addClass("hide_error");
			$('#createProjectSection').removeClass("show_error"); 
			
			var $tr = $("#mappedStudentProfileTable"); 
			var row = $(this).closest("tr").index(); 
			row = row + 1;
			 
			var id =document.getElementById("mappedStudentProfileTable").rows[row].cells[0].innerHTML;  
			var userId =document.getElementById("mappedStudentProfileTable").rows[row].cells[1].innerHTML;  
			
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
				$.post("/setOfferAdmissions",{
					id : id,
					userId:userId
				},setOfferStudentData)
			}
	    });
		
		//reject admission
		$("#mappedStudentProfileTable").on("click", ".ibtnDels4", function (event) {
			$('#createProjectSection').addClass("hide_error");
			$('#createProjectSection').removeClass("show_error"); 
			
			var $tr = $("#mappedStudentProfileTable"); 
			var row = $(this).closest("tr").index(); 
			row = row + 1;
			 
			var id =document.getElementById("mappedStudentProfileTable").rows[row].cells[0].innerHTML;  
			var userId =document.getElementById("mappedStudentProfileTable").rows[row].cells[1].innerHTML;  
			
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
				$.post("/setRejectAdmissions",{
					id : id,
					userId:userId
				},setOfferStudentData)
			}
	    });
		function setOfferStudentData(data)
		{
			var loginUserId = $("#userIdData").val();
			
			if (typeof(data.errno) != "undefined" &&  data.errno!="") {
				//$("#alertMessage").text(data.sqlMessage)
			} 
			else { 			
				if(data.status==true)
				{ 
					$.post("/GetMappedStudentProfile",{
						loginUserId : loginUserId
			    	},fnMappedStudentProfile);	
					
					//$.getJSON('/GetMappedStudentProfile',fnMappedStudentProfile);
				} 
			} 
		}
	/* end research data */ 
	 
	/* start Assessment data */ 
		$("#addGrade").on("click", function () {
		    	
			var userId = $("#userIdData").val();
			
		    if(validateAssessmentData())
		    {
		    	var project_grade = $("#project_grade_id").val().toLowerCase().replace(/\b[a-z]/g, function(letter) {
				    return letter.toUpperCase();
				}); 
		    	
		    	$.post("/setAssessmentData",{
		    		term:$("#university_term_id").val(),
		    		assignment : $("#assignment_id").val(),
		    		subject:$("#subject_id").val(),
		    		marks : $("#point_id").val(),
		    		outoff : $("#point_id1").val(),
		    		grade : project_grade,
		    		feedback : $("#feedback_id").val(), 
					studentId : $("#student_list_id").val(),
					userId : userId 
				},setAssessmentData) 
				
		    }
		});
		 
		function setAssessmentData(data)
		{
			if (typeof(data.errno) != "undefined" &&  data.errno!="") { 
				$("#actionAssessmentMessage").text(data.sqlMessage);
				$('#myAssessmentModal').modal('show'); 
			}
			else { 
				 
				$('#assignment_id option')[0].selected = true; 
		        $("#point_id").val("");
		        $("#point_id1").val("");
		        $("#project_grade_id").val("");
		        $("#feedback_id").val("");
		        
		        $.post("/getAssessment",{
		        	term : $("#university_term_id").val(),
		    		studentId : $("#student_list_id").val(),
		    		subject : $("#subject_id").val()
		    	},fnGradeData);		         
			}
		} 
			
		$("#btnHideGradeView").on("click", function () {
			$('#assessmentSectionDiv').addClass("hide_error");
			$('#assessmentSectionDiv').removeClass("show_error"); 
			$('#student_list_id option')[0].selected = true;
		});		
		
		$('#student_list_id').on('change', function() {
			  var studentId = this.value;  
			  
			  if(studentId == "-select-")
			  {
				  
			  }
			  else
		      {
				  $.post("/getStudentSubject",{
			    		studentId : studentId 
			      },getStudentSubjectsList);
		      } 	
		});
		
		function getStudentSubjectsList(data)
		{
			if (typeof(data.errno) != "undefined" &&  data.errno!="") {
				$("#actionMessage").text(data.sqlMessage);
				$('#myCreateProjectModal').modal('show');
			}
			else { 
				 
				var icount=0;
				 
				$('#subject_id option').remove();
				var select = document.getElementById("subject_id");
				
				if(data=="")
				{
					var option = document.createElement("option");
					option.text = "-select-";
					option.value = "-select-";
					select.appendChild(option);
					icount = 0;
					
					$('#assessmentSectionDiv').addClass("hide_error");
					$('#assessmentSectionDiv').removeClass("show_error"); 
				}
				else
				{
					$.each(data,function(key,item){
						if(icount==0)
						{
							$('#subject_id option').remove(); 
							icount = 1;
						}
						var option = document.createElement("option");
						option.text = item.coursesName;
						option.value = item.coursesName;
						select.appendChild(option);
					});
					
				}
				
				
				if(icount==1)
				{
				   $('#assessmentSectionDiv').addClass("show_error");
				   $('#assessmentSectionDiv').removeClass("hide_error"); 
					  
				   $.post("/getAssessment",{
					    term: $("#university_term_id").val(),
			    		studentId : $("#student_list_id").val(),
			    		subject : $("#subject_id").val()
			       },fnGradeData);
				} 
			}  
		}
		
		$('#subject_id').on('change', function() {
			  var subject = this.value; 
			  
			  $.post("/getAssessment",{
				    term: $("#university_term_id").val(),
		    		studentId : $("#student_list_id").val(),
		    		subject : subject
		      },fnGradeData); 	
		});
		 
		$('#university_term_id').on('change', function() {
			  var term = this.value; 
			  
			  $.post("/getAssessment",{
				    term:term,
		    		studentId : $("#student_list_id").val(),
		    		subject : $("#student_list_id").val()
		      },fnGradeData); 	
		}); 
		
		function fnGradeData(data)
		{ 
			var counter = 0;
			
			if (typeof(data.errno) != "undefined" &&  data.errno!="") { 
				$("#actionAssessmentMessage").text(data.sqlMessage);
				$('#myAssessmentModal').modal('show'); 
			}
			else { 
				$("#assignments_table_section_id > tbody").html("");
				$("#presentations_table_section_id > tbody").html("");
				$("#exams_table_section_id > tbody").html("");
				$("#pojects_table_section_id > tbody").html("");
				 
				$.each(data,function(key,item){
					
					var count=0;
					  
					var assType="";
					
					var newRow = $("<tr>");
			        var cols = "";
			        
					if(item.assignmentType=="Assignment")
					{
						var createdData = new Date(item.createdOn);
						createdData = createdData.getFullYear() +"-" + createdData.getMonth() + "-" + createdData.getDay();
						
						cols += '<td style="display:none;border-top: 0px solid #ddd;"><label class="form-control education_row" name="id">' + item.id + '</label> </td>';
						cols += '<td class="col-sm-2" style="border-top: 0px solid #ddd;"><label class="form-control education_row" name="createdOn">' + createdData + '</label> </td>';
				        cols += '<td class="col-sm-2 tr_style" style="border-top: 0px solid #ddd;"><label class="form-control education_row" name="marks">' + item.marks +" / " + item.outoff + '</label> </td>';
				        cols += '<td class="col-sm-2 tr_style" style="border-top: 0px solid #ddd;"><label class="form-control education_row" name="grade">' + item.grade + '</label> </td>';
						cols += '<td class="col-sm-5 tr_style" style="border-top: 0px solid #ddd;"><label class="form-control education_row" name="egraduationdate">' + item.feedback + '</label> </td>';
				        cols += '<td class="col-sm-1 tr_style" style="border-top: 0px solid #ddd;text-align: right;"><input type="button" class="ibtnDeld1 btn btn-md btn-danger " style="padding: 1px 6px;font-weight: bold;" value="Delete"></td>';
				        newRow.append(cols);
				        $("#assignments_table_section_id").append(newRow);
					}
					else if(item.assignmentType=="Presentation")
					{
						var createdData = new Date(item.createdOn);
						createdData = createdData.getFullYear() +"-" + createdData.getMonth() + "-" + createdData.getDay();
						
						cols += '<td style="display:none;border-top: 0px solid #ddd;"><label class="form-control education_row" name="id">' + item.id + '</label> </td>';
						cols += '<td class="col-sm-2" style="border-top: 0px solid #ddd;"><label class="form-control education_row" name="createdOn">' + createdData + '</label> </td>';
				        cols += '<td class="col-sm-2 tr_style" style="border-top: 0px solid #ddd;"><label class="form-control education_row" name="marks">' + item.marks +" / " + item.outoff + '</label> </td>';
				        cols += '<td class="col-sm-2 tr_style" style="border-top: 0px solid #ddd;"><label class="form-control education_row" name="grade">' + item.grade + '</label> </td>';
						cols += '<td class="col-sm-5 tr_style" style="border-top: 0px solid #ddd;"><label class="form-control education_row" name="egraduationdate">' + item.feedback + '</label> </td>';
				        cols += '<td class="col-sm-1 tr_style" style="border-top: 0px solid #ddd;text-align: right;"><input type="button" class="ibtnDeld2 btn btn-md btn-danger " style="padding: 1px 6px;font-weight: bold;" value="Delete"></td>';
				        newRow.append(cols);
				        $("#presentations_table_section_id").append(newRow);
					}
					else if(item.assignmentType=="Exam")
					{
						var createdData = new Date(item.createdOn);
						createdData = createdData.getFullYear() +"-" + createdData.getMonth() + "-" + createdData.getDay();
						
						cols += '<td style="display:none;border-top: 0px solid #ddd;"><label class="form-control education_row" name="id">' + item.id + '</label> </td>';
						cols += '<td class="col-sm-2" style="border-top: 0px solid #ddd;"><label class="form-control education_row" name="createdOn">' + createdData + '</label> </td>';
				        cols += '<td class="col-sm-2 tr_style" style="border-top: 0px solid #ddd;"><label class="form-control education_row" name="marks">' + item.marks +" / " + item.outoff + '</label> </td>';
				        cols += '<td class="col-sm-2 tr_style" style="border-top: 0px solid #ddd;"><label class="form-control education_row" name="grade">' + item.grade + '</label> </td>';
						cols += '<td class="col-sm-5 tr_style" style="border-top: 0px solid #ddd;"><label class="form-control education_row" name="egraduationdate">' + item.feedback + '</label> </td>';
				        cols += '<td class="col-sm-1 tr_style" style="border-top: 0px solid #ddd;text-align: right;"><input type="button" class="ibtnDeld3 btn btn-md btn-danger " style="padding: 1px 6px;font-weight: bold;" value="Delete"></td>';
				        newRow.append(cols);
				        $("#exams_table_section_id").append(newRow);
					}
					else if(item.assignmentType=="Project")
					{
						var createdData = new Date(item.createdOn);
						createdData = createdData.getFullYear() +"-" + createdData.getMonth() + "-" + createdData.getDay();
						
						cols += '<td style="display:none;border-top: 0px solid #ddd;"><label class="form-control education_row" name="id">' + item.id + '</label> </td>';
						cols += '<td class="col-sm-2" style="border-top: 0px solid #ddd;"><label class="form-control education_row" name="createdOn">' + createdData + '</label> </td>';
				        cols += '<td class="col-sm-2 tr_style" style="border-top: 0px solid #ddd;"><label class="form-control education_row" name="marks">' + item.marks +" / " + item.outoff + '</label> </td>';
				        cols += '<td class="col-sm-2 tr_style" style="border-top: 0px solid #ddd;"><label class="form-control education_row" name="grade">' + item.grade + '</label> </td>';
						cols += '<td class="col-sm-5 tr_style" style="border-top: 0px solid #ddd;"><label class="form-control education_row" name="egraduationdate">' + item.feedback + '</label> </td>';
				        cols += '<td class="col-sm-1 tr_style" style="border-top: 0px solid #ddd;text-align: right;"><input type="button" class="ibtnDeld4 btn btn-md btn-danger " style="padding: 1px 6px;font-weight: bold;" value="Delete"></td>';
				        newRow.append(cols);
				        $("#pojects_table_section_id").append(newRow);
					}
					 
			        counter++;
				}); 
				
				$("#assignments_table_section_id").on("click", ".ibtnDeld1", function (event) {
					var $tr = $("#assignments_table_section_id"); 
					var row = $(this).closest("tr").index(); 
					 
					var id =document.getElementById("assignments_table_section_id").rows[row].cells[0].innerHTML;  
					  
					if(id.length>0)
					{
						id = id.replace('<label class="form-control education_row" name="id">','');
						id = id.replace('</label>','');
					} 
					 
					fnDeleteAssessment(id);
					
			        $(this).closest("tr").remove();       
			        counter -= 1
			        var rowCount = $('#assignments_table_section_id tr').length; 
			    });
				
				$("#presentations_table_section_id").on("click", ".ibtnDeld2", function (event) {
					var $tr = $("#assignments_table_section_id"); 
					var row = $(this).closest("tr").index(); 
					 
					var id =document.getElementById("presentations_table_section_id").rows[row].cells[0].innerHTML;  
					  
					if(id.length>0)
					{
						id = id.replace('<label class="form-control education_row" name="id">','');
						id = id.replace('</label>','');
					} 
					 
					fnDeleteAssessment(id);
					
			        $(this).closest("tr").remove();       
			        counter -= 1
			        var rowCount = $('#presentations_table_section_id tr').length; 
			    });
				
				$("#exams_table_section_id").on("click", ".ibtnDeld3", function (event) {
					var $tr = $("#exams_table_section_id"); 
					var row = $(this).closest("tr").index(); 
					 
					var id =document.getElementById("exams_table_section_id").rows[row].cells[0].innerHTML;  
					  
					if(id.length>0)
					{
						id = id.replace('<label class="form-control education_row" name="id">','');
						id = id.replace('</label>','');
					} 
					 
					fnDeleteAssessment(id);
					
			        $(this).closest("tr").remove();       
			        counter -= 1
			        var rowCount = $('#exams_table_section_id tr').length; 
			    });
				
				$("#pojects_table_section_id").on("click", ".ibtnDeld4", function (event) {
					var $tr = $("#pojects_table_section_id"); 
					var row = $(this).closest("tr").index(); 
					 
					var id =document.getElementById("pojects_table_section_id").rows[row].cells[0].innerHTML;  
					  
					if(id.length>0)
					{
						id = id.replace('<label class="form-control education_row" name="id">','');
						id = id.replace('</label>','');
					} 
					 
					fnDeleteAssessment(id);
					
			        $(this).closest("tr").remove();       
			        counter -= 1
			        var rowCount = $('#pojects_table_section_id tr').length; 
			    });
			}
		}
		
		function fnDeleteAssessment(id)
		{ 
			if(id.length>0)
			{
				$.post("/deleteAssessment",{
					id : id 
				},fnDeleteAssessmentStatus)
			}
		}
		
		function fnDeleteAssessmentStatus(data)
		{
			if (typeof(data.errno) != "undefined" &&  data.errno!="") { 
				//$("#actionAssessmentMessage").text(data.sqlMessage);
				//$('#myAssessmentModal').modal('show'); 
			}
		}
		
		function validateAssessmentData()
		{
			var flag = true;
	 
			if ($('#student_list_id').val() == "-select-") {
				$('#SEE1').removeClass('hide_error');
				$('#SEE1').addClass('show_error');
				flag = false;
			}
			else {
				$('#SEE1').removeClass('show_error');
				$('#SEE1').addClass('hide_error');
			} 
			
			if ($('#subject_id').val() == "-select-") {
				$('#SEE2').removeClass('hide_error');
				$('#SEE2').addClass('show_error');
				flag = false;
			}
			else {
				$('#SEE2').removeClass('show_error');
				$('#SEE2').addClass('hide_error');
			} 
			
			if ($('#assignment_id').val() == "-select-") {
				$('#AE1').removeClass('hide_error');
				$('#AE1').addClass('show_error');
				flag = false;
			}
			else {
				$('#AE1').removeClass('show_error');
				$('#AE1').addClass('hide_error');
			} 
			 
			if ($('#point_id').val() == "") {
				$('#AE2').removeClass('hide_error');
				$('#AE2').addClass('show_error');
				flag = false;
			}
			else {
				$('#AE2').removeClass('show_error');
				$('#AE2').addClass('hide_error');
			} 
			
			if ($('#point_id1').val() == "") {
				$('#AE3').removeClass('hide_error');
				$('#AE3').addClass('show_error');
				flag = false;
			}
			else {
				$('#AE3').removeClass('show_error');
				$('#AE3').addClass('hide_error');
			} 
			
			/*if ($('#point_id').val() != "" && $('#point_id1').val() != "") {
				
				if($('#point_id').val() > $('#point_id1').val())
				{
					$('#AE23').removeClass('hide_error');
					$('#AE23').addClass('show_error');
					flag = false;
				}
				else
				{
					$('#AE23').removeClass('show_error');
					$('#AE23').addClass('hide_error');
				}
			}*/
			
			if ($('#project_grade_id').val() == "") {
				$('#AE4').removeClass('hide_error');
				$('#AE4').addClass('show_error');
				flag = false;
			}
			else {
				$('#AE4').removeClass('show_error');
				$('#AE4').addClass('hide_error');
			} 
			
			if ($('#feedback_id').val() == "") {
				$('#AE5').removeClass('hide_error');
				$('#AE5').addClass('show_error');
				flag = false;
			}
			else {
				$('#AE5').removeClass('show_error');
				$('#AE5').addClass('hide_error');
			} 
			
			if (flag == true) {
				return true;
			}
			else {
				return false;
			}
		}
		
		$("#assignment_id").on('change', function() {
		    if ($(this).val() != '-select-'){
		        $("#AE1").removeClass("show_error");
				$("#AE1").addClass("hide_error");
		    } 
		});
		
		$("#student_list_id").on('change', function() {
		    if ($(this).val() != '-select-'){
		        $("#SEE1").removeClass("show_error");
				$("#SEE1").addClass("hide_error");
		    } 
		});
		
		$("#subject_id").on('change', function() {
		    if ($(this).val() != '-select-'){
		        $("#SEE2").removeClass("show_error");
				$("#SEE2").addClass("hide_error");
		    } 
		});
		
		$('#point_id').on('change',function(e){
			if($("#point_id").val()!= null || $("#point_id").val()!= '')
			{ 
				$("#AE2").removeClass("show_error");
				$("#AE2").addClass("hide_error");
			}
		});
		
		$('#point_id1').on('change',function(e){
			if($("#point_id1").val()!= null || $("#point_id1").val()!= '')
			{ 
				$("#AE3").removeClass("show_error");
				$("#AE3").addClass("hide_error");
			}
		});
		
		$('#project_grade_id').on('change',function(e){
			if($("#project_grade_id").val()!= null || $("#project_grade_id").val()!= '')
			{ 
				$("#AE4").removeClass("show_error");
				$("#AE4").addClass("hide_error");
			}
		});
		
		$('#feedback_id').on('change',function(e){
			if($("#feedback_id").val()!= null || $("#feedback_id").val()!= '')
			{ 
				$("#AE5").removeClass("show_error");
				$("#AE5").addClass("hide_error");
			}
		});
		
		$("#point_id").on("keypress keyup blur",function (event) { 
			 $(this).val($(this).val().replace(/[^0-9\.]/g,''));
	         if ((event.which != 46 || $(this).val().indexOf('.') != -1) && (event.which < 48 || event.which > 57)) {
	             event.preventDefault();
	         }
	     });
		
		$("#point_id1").on("keypress keyup blur",function (event) { 
			 $(this).val($(this).val().replace(/[^0-9\.]/g,''));
	         if ((event.which != 46 || $(this).val().indexOf('.') != -1) && (event.which < 48 || event.which > 57)) {
	             event.preventDefault();
	         }
	     });
		
		 
		  
	/* end Assessment data */ 
		
	/* communication section */

		$.post("/getAllMessages",{
			 munEmail : $("#userMunEmailId").val() 
		 },fnInboxMessageList);
			
		 function fnInboxMessageList(data)
		 {
			if (typeof(data.errno) != "undefined" &&  data.errno!="") {
				//$("#alertMessage").text(data.sqlMessage)
			} 
			else
			{  
				$("#communication_table > tbody").html("");
				 
				$.each(data,function(key,item){
					var count=0; 
					 
					var newRow = $("<tr>");
			        var cols = "";
			
			        if(item.message_to != "undefined")
			        {
			          cols += '<td style="display:none;"><label class="form-control education_row" name="id">' + item.id + '</label> </td>';	
			          cols += '<td class="col-sm-2"><label class="form-control education_row" name="message_from">' + item.message_from + '</label> </td>';
					  cols += '<td class="col-sm-3"><label class="form-control education_row" name="subject">' + item.subject	 + '</label> </td>';
					  cols += '<td class="col-sm-5"><label class="form-control education_row" name="message">' + item.message + '</label> </td>';
					  cols += '<td class="col-sm-1" style="text-align: right;"><input type="button" class="ibtnDelReply btn btn-md btn-success" style="padding: 1px 6px;font-weight: bold;" value="Reply" id="btnMessageReply"></td>';
					  
					  newRow.append(cols);
					  $("#communication_table").append(newRow);
					  counter++;
			        } 
				}); 
			} 
		 }
		
		 $("#communication_table").on("click", ".ibtnDelReply", function (event) {
			  
			 	event.stopImmediatePropagation();
			 	
				var table = document.getElementById('communication_table');
				var $tr = $("#communication_table"); 
				var row = $(this).closest("tr").index(); 
				row = row;
				 
				var from_email_id =document.getElementById("communication_table").rows[row].cells[1].innerHTML;  
				var subject_id =document.getElementById("communication_table").rows[row].cells[2].innerHTML;  
				 
				if(from_email_id.length>0)
				{
					from_email_id = from_email_id.replace('<label class="form-control education_row" name="message_from">','');
					from_email_id = from_email_id.replace('</label>','');
				}
				
				if(subject_id.length>0)
				{
					subject_id = subject_id.replace('<label class="form-control education_row" name="subject">','');
					subject_id = subject_id.replace('</label>','');
				}
			
				$("#message_to").val($.trim(from_email_id));
				$("#subject").val(subject_id) 
				
				$('#myModalMessage').modal('show'); 
		 });
		 
		
		 var input = document.getElementById("message_to");
		 var awesomplete = new Awesomplete(input, {
		   minChars: 1, 
		   autoFirst: false,
		   maxItems: 10,
		 });
		 //awesomplete.list = ['mikea	@gmail.com','jack@gmail.coms'];
		 awesomplete.list=[];
		 
		 $.post("/getDistinctEmailList",{
			 munEmail : $("#userMunEmailId").val() 
		 },fnDistinctEmailList)
			
		 function fnDistinctEmailList(data)
		 {
			if (typeof(data.errno) != "undefined" &&  data.errno!="") {
				//$("#alertMessage").text(data.sqlMessage)
			} 
			else
			{
				var list = []; 
				$.each(data,function(key,item){ 
					 list.push(item.munEmail);
				});
			}
			
			awesomplete.list = list;
		 }
		 
		 $("#sendMessageForm").submit(function(e){
				e.preventDefault();   
				e.stopImmediatePropagation();
				
				if(validateCommuncationForm())
				{ 
					$.post("/sendMessage",{ 
						message_to : $("#message_to").val(),
						message_from : $("#userMunEmailId").val(),
						subject : $("#subject").val(),
						message : $("textarea#comm_message").val() 
					},fnSendMessage)
				}
		 });
		 
		 function fnSendMessage(data)
		 { 
			 //$("#myModalMessage .close").click();
			 $('#message_to').val("");
			 $('#subject').val("");
			 $('textarea#comm_message').val("");
		 }
		 
		 $("#btnCommClose").click(function(){
			 $('#CEI1').removeClass('show_error');
			 $('#CEI1').addClass('hide_error');
			 $('#CEI2').removeClass('show_error');
			 $('#CEI2').addClass('hide_error');
			 $('#CEI3').removeClass('show_error');
			 $('#CEI3').addClass('hide_error');
			 
			 $('#message_to').val("");
			 $('#subject').val("");
			 $('textarea#comm_message').val("");
		 });
		 
		 function validateCommuncationForm()
		 {
				var flag = true;

				if ($('#message_to').val().length === 0) {
					$('#CEI1').removeClass('hide_error');
					$('#CEI1').addClass('show_error');
					flag = false;
				}
				else {
					$('#CEI1').removeClass('show_error');
					$('#CEI1').addClass('hide_error');
				}			 

				if ($('#subject').val().length === 0) {
					$('#CEI2').removeClass('hide_error');
					$('#CEI2').addClass('show_error');
					flag = false;
				}
				else {
					$('#CEI2').removeClass('show_error');
					$('#CEI2').addClass('hide_error');
				}
				 
				if ($('textarea#comm_message').val().length === 0) {
					$('#CEI3').removeClass('hide_error');
					$('#CEI3').addClass('show_error');
					flag = false;
				}
				else {
					$('#CEI3').removeClass('show_error');
					$('#CEI3').addClass('hide_error');
				}
				
				if (flag == true) {
					return true;
				}
				else {
					return false;
				}
		 }
		 
		   $('#message_to').on('change',function(e){
				if($("#message_to").val()!= null || $("#message_to").val()!= '')
				{ 
					 $('#CEI1').removeClass('show_error');
					 $('#CEI1').addClass('hide_error');
				}
			});
			
			$('#subject').on('change',function(e){
				if($("#subject").val()!= null || $("#subject").val()!= '')
				{ 
					$('#CEI2').removeClass('show_error');
					$('#CEI2').addClass('hide_error');
				}
			});
			
			$('textarea#comm_message').on('change',function(e){
				if($("textarea#comm_message").val()!= null || $("textarea#comm_message").val()!= '')
				{ 
					$('#CEI3').removeClass('show_error');
					$('#CEI3').addClass('hide_error');
				} 
			});	 
});
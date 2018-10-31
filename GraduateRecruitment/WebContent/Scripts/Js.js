const form = document.querySelector('form');
const ul = document.querySelector('ul');
const button = document.querySelector('button');

const input = document.getElementById('item');
const input1 = document.getElementById('item1');
const input2 = document.getElementById('item2');

let itemsArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];
localStorage.setItem('items', JSON.stringify(itemsArray));

let itemsArray1 = localStorage.getItem('items1') ? JSON.parse(localStorage.getItem('items1')) : [];
localStorage.setItem('items1', JSON.stringify(itemsArray1));

let itemsArray2 = localStorage.getItem('items2') ? JSON.parse(localStorage.getItem('items2')) : [];
localStorage.setItem('items2', JSON.stringify(itemsArray2));

function validateData()
{
	var input = document.getElementById('item').value;
	var input1 = document.getElementById('item1').value;
	var input2 = document.getElementById('item2').value;
	
	if(input.length>=1 && input1.length>=1 && input2.length>=1)
	{
		return true;
	}
	else{
		alert("all fields are required");
		return false;
	}
}

function SetItemData()
{
	if(validateData())
	{		
		itemsArray.push(input.value);
		localStorage.setItem('items', JSON.stringify(itemsArray));
		
		itemsArray1.push(input1.value);
		localStorage.setItem('items1', JSON.stringify(itemsArray1));
		
		itemsArray2.push(input2.value);
		localStorage.setItem('items2', JSON.stringify(itemsArray2));
		
		 var markup = "<tr><td>"+ input.value +"</td><td>" + input1.value + "</td><td>" + input2.value + "</td></tr>";
      
		 var table = document.getElementById("data").getElementsByTagName('tbody')[0];

		 var row = table.insertRow(0);
		 var cell1 = row.insertCell(0);
		 var cell2 = row.insertCell(1);
		 var cell3 = row.insertCell(2);
		 cell1.innerHTML = input.value;
		 cell2.innerHTML = input1.value;
		 cell3.innerHTML = input2.value;
	}
	
}

button.addEventListener('click', function () {
	  localStorage.clear();
	  document.getElementById('item').value="";
	  document.getElementById('item1').value="";
	  document.getElementById('item2').value="";
	  
	  itemsArray=[];
	  itemsArray1=[];
	  itemsArray2=[];
	  
	  var tableHeaderRowCount = 1;
	  var table = document.getElementById('data');
	  var rowCount = table.rows.length;
	  for (var i = tableHeaderRowCount; i < rowCount; i++) {
	      table.deleteRow(tableHeaderRowCount);
	  }
});
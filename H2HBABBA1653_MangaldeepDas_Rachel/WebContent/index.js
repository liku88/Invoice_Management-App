
// Initializing variables

var count = 0;
var id = 0;

//This function is responsible for checking all checkboxes if we select table-header checkbox .
function checkAll(myCheckbox) {
	var checkboxes = document.querySelectorAll("input[type = 'checkbox']")
    if (myCheckbox.checked == true) {
        checkboxes.forEach(function (checkbox) {
            checkbox.checked = true;
            checkbox.parentNode.parentNode.style.backgroundColor = "#14AFF1";
            //Here i am disabling add button and enabling delete button.
            document.getElementById("deleteBtn").disabled = false;
            document.getElementById("addBtn").disabled = true;
            
            document.getElementById("deleteBtn").style.borderColor = "#14AFF1";
            document.getElementById("addBtn").style.borderColor = "#A9A9A9";
        })
    } else {
    	//If we deselect the table-header checkbox, then it will deselect all other checkboxes present in table body.
        checkboxes.forEach(function (checkbox) {
            checkbox.checked = false;
            checkbox.parentNode.parentNode.style.backgroundColor = "";
            
            //Now here as checkboxes of table body are not checked any more so now lets disable edit, delete button.
            document.getElementById("editBtn").disabled = true;
            document.getElementById("deleteBtn").disabled = true;
            document.getElementById("addBtn").disabled = false;
            
            document.getElementById("deleteBtn").style.borderColor = "#A9A9A9";
            document.getElementById("editBtn").style.borderColor = "#A9A9A9";
            document.getElementById("addBtn").style.borderColor = "#14AFF1";
            
        })
    }
}


//This function is responsible for giving a background color to a row when a particular checkbox is checked.
//This function is also responsible tracking the count of checkboxes are checked so, that we can enable edit, delete button
//And to fetch id of the checkbox is selected.

function changeColor(checkBox) {
    if (checkBox.checked == true) {
    	
    	//Now when the checkbox is selected then it will change the background color of that row
        checkBox.parentNode.parentNode.style.backgroundColor = "#14AFF1";
        count++;
        
        //Now according to Prs, if more than 1 checkbox are checked then we have to disable the edit and add button,
        //So, I am doing that implementation here.
        if(count == 1){
        	document.getElementById("editBtn").disabled = false;
        	document.getElementById("addBtn").disabled = false;
        	document.getElementById("deleteBtn").disabled = false;
        	
        	document.getElementById("addBtn").style.borderColor = "#14AFF1";
        	document.getElementById("editBtn").style.borderColor = "#14AFF1";
        	document.getElementById("deleteBtn").style.borderColor = "#14AFF1";
            
        	//Fetching id of checkbox that is selected
        	id = checkBox.id
        	 var xhttp = new XMLHttpRequest();
        		xhttp.open("GET","http://localhost:8080/H2HBABBA1653/getEditPopulate.do?id="+checkBox.id,false);
        		xhttp.send();
        		var data = JSON.parse(xhttp.responseText)
        		
          //Here populating edit-pop invoice amount input field from database.		
        		document.getElementById("edit_invoiceAmount").value = data[0].total_open_amount;
        	
        }else{
        	document.getElementById("editBtn").disabled = true;
        	 document.getElementById("deleteBtn").disabled = false;
        	 document.getElementById("addBtn").disabled = true;
        	 
        	 document.getElementById("addBtn").style.borderColor = "#A9A9A9";
         	document.getElementById("editBtn").style.borderColor = "#A9A9A9";
         	document.getElementById("deleteBtn").style.borderColor = "#14AFF1";
        }
        console.log(count);
    } else {
        checkBox.parentNode.parentNode.style.backgroundColor = "";
        document.getElementById("editBtn").disabled = true;
        document.getElementById("deleteBtn").disabled = true;
        
        document.getElementById("editBtn").style.borderColor = "#A9A9A9";
     	document.getElementById("deleteBtn").style.borderColor = "#A9A9A9";
        
        count--;
        if(count == 1){
        	document.getElementById("editBtn").disabled = false;
        	document.getElementById("addBtn").disabled = false;
        	document.getElementById("deleteBtn").disabled = false;
        	
        	document.getElementById("addBtn").style.borderColor = "#14AFF1";
        	document.getElementById("editBtn").style.borderColor = "#14AFF1";
        	document.getElementById("deleteBtn").style.borderColor = "#14AFF1";
        }
        console.log(count)
    }
}

//Globally, I am disabling edit and delete button
document.getElementById("editBtn").disabled = true;
document.getElementById("deleteBtn").disabled = true;


//This function is responsible for activating Edit Popup and bluring the header part of the UI to give a descent look.
function blurrEdit() {
    const blur = document.getElementById("blur");
    blur.classList.toggle('active')
    const popupEdit = document.getElementById("popupEdit");
    popupEdit.classList.toggle('active')
    
    
}
//This function is responsible for activating Delete Popup and bluring the header part of the UI to give a descent look.
function blurrDelete() {
    const blur = document.getElementById("blur");
    blur.classList.toggle('active')
    const popupEditD = document.getElementById("popupEditD");
    popupEditD.classList.toggle('active')
   }

//This function is responsible for activating Add Popup and bluring the header part of the UI to give a descent look.
function blurrAdd() {
    const blur = document.getElementById("blur");
    blur.classList.toggle('active')
    const popupEditA = document.getElementById("popupEditA");
    popupEditA.classList.toggle('active')
}


//Accessing table-Body by its id
var table = document.getElementById("tb");

//Creating a varibale for setting pageNumber while doing pagination.
var pageNumber = 0;

//This function is responsible loading data from backend api in my table body dynamically.
function loadData(start, limit){
	var xhttp = new XMLHttpRequest();
	xhttp.open("GET","http://localhost:8080/H2HBABBA1653/getData.do?start="+start+"&limit="+limit,false);
	xhttp.send();
	var data = JSON.parse(xhttp.responseText)
	console.log(data.length)
	console.log(data)
	for(var index = 0; index<data.length; index++){
		
	//Creating tr dynamically by help of javascript		
	var tr = document.createElement("tr");	
	
	//creating td dynamically for checkbox
	var tdCheck = document.createElement("td");
	//creating input element dynamically
	var checkBox = document.createElement("input");
	//Now setting that input element as type checkbox.
	checkBox.setAttribute('type', 'checkbox');
	//Now setting class and ids to that input element of type checkbox below
	checkBox.setAttribute('class', 'tickAll');
	checkBox.setAttribute('id', data[index].id);
	//Now setting an onclick on my checkbox for changing the color of its row when it get checked.
	checkBox.setAttribute('onclick', 'changeColor(this)');
	tdCheck.appendChild(checkBox);
	//Now appending that checkbox td into my tr element.
	tr.appendChild(tdCheck);
	
	//Here I am creating td for customerName, then putting the value of customerName from data and then appending into tr.
	var tdcustomerName = document.createElement("td");
	tdcustomerName.innerHTML = data[index].name_customer;
    tr.appendChild(tdcustomerName);
    
  //Here I am creating td for customerNumber, then putting the value of customerNumber from data and then appending into tr.
    var tdcustomerNumber = document.createElement("td");
    tdcustomerNumber.innerHTML = data[index].cust_number;
    tr.appendChild(tdcustomerNumber);
    
  //Here I am creating td for invoiceNumber, then putting the value of invoiceNumber from data and then appending into tr.
    var tdinvoiceNo = document.createElement("td");
    tdinvoiceNo.innerHTML = data[index].invoice_id;
    tr.appendChild(tdinvoiceNo);
    
  //Here I am creating td for invoiceAmount, then putting the value of invoiceAmount from data and then appending into tr.
    var tdinvoiceAmount = document.createElement("td");
    tdinvoiceAmount.innerHTML = data[index].total_open_amount+" K";
    tr.appendChild(tdinvoiceAmount);
    
  //Here I am creating td for dueDate, then putting the value of dueDate from data and then appending into tr.
    var td_dueDate = document.createElement("td");
    td_dueDate.innerHTML = data[index].due_in_date;
    tr.appendChild(td_dueDate);

  //Here I am creating td for predictedClearDate, then putting the value of predictedClearDate from data and then appending into tr.
    var tdpredictedClearDate = document.createElement("td");
    if(data[index].predicted_clear_date){
    	tdpredictedClearDate.innerHTML = data[index].predicted_clear_date;
    }else{
    	tdpredictedClearDate.innerHTML = "- -";
    }
    tr.appendChild(tdpredictedClearDate);
    
  //Here I am creating td for notes, then putting the value of notes in a static way and then appending into tr.
    var notes = document.createElement("td");
    notes.innerHTML = "Lorem ipsum dolor sit amet."
    tr.appendChild(notes);
    
    //Now appending all tr in table
    table.appendChild(tr);
	}
}

//This event listener is responsible for loading data from database when some one load my URL initially.
document.addEventListener("DOMContentLoaded", function(){
	loadData(0,10);
	checkAll();
})

//Pagination starts here

//This function is responsible for loading appropriate data according to the start value.
function prevFunction(){
	if(pageNumber <= 0){
		table.innerHTML = "";
		loadData(0, 10);
		checkAll();
		
	}else if(pageNumber <9 && pageNumber >0){
	table.innerHTML = "";
	loadData(0, 10);
	checkAll();
	}else{
		table.innerHTML = "";
		loadData((pageNumber - 9), 10);
		pageNumber -= 9;
		checkAll();
	}
}

//This function is responsible for loading appropriate data according to the start value.
function nextFunction(){
	table.innerHTML = "";
	loadData(pageNumber+9, 10);
	pageNumber += 9;
	checkAll();
    
}
//Paginations ends here

//This function is responsible for performing Add operation.
function redirect(){
	
//Here i am getting all the values of respective inputs element by help of their Ids.
const custName = document.getElementById("custName").value;
const custNo = document.getElementById("custNo").value;
const invoiceId = document.getElementById("inId").value;
const invoiceAmount = document.getElementById("totalAmt").value;
const due_in_date = document.getElementById("dueDate").value;

var xhttp = new XMLHttpRequest();
//Here i am passing those above stored values in my back-end request so, that it can insert data in my database.
xhttp.open("POST","http://localhost:8080/H2HBABBA1653/postData.do?cust_number="+custNo+"&name_customer="+custName+"&total_open_amount="+invoiceAmount/1000+"&invoice_id="+invoiceId+"&due_in_date="+due_in_date,false);
xhttp.send();
}

//This function is responsible for performing Edit operation.
function EditData(){
	
	//Here i am getting all the value of respective input element by help of its Id.	
	var total_open_amount = document.getElementById("edit_invoiceAmount").value;
	var xhttp = new XMLHttpRequest();
	//Here i am passing those above stored values in my back-end request so, that it can edit data in my database.
	xhttp.open("POST","http://localhost:8080/H2HBABBA1653/UpdateEditData.do?total_open_amount="+total_open_amount/1000+"&id="+id,false);
	xhttp.send();
}

//This function is responsible for performing Delete operation.
function deleteData(id){
	var xhttp = new XMLHttpRequest();
	xhttp.open("POST","http://localhost:8080/H2HBABBA1653/DeleteServlet.do?id="+id,false);
	xhttp.send();
}

//This function is responsible for tracking all ids of checked checkboxes and to store them in an array
function deleteRows(){
	var id = [];
	var checkedBox = [...document.querySelectorAll("input[type = 'checkbox']:checked")];
	for(var indexCheckBox = 0; indexCheckBox<checkedBox.length; indexCheckBox++){
		id[indexCheckBox] = parseInt(checkedBox[indexCheckBox].id);
	}
	for (var idArrayIndex = 0; idArrayIndex <id.length; idArrayIndex++){
		deleteData(id[idArrayIndex]);
	}
} 

//This function is responsible for searching data according to invoice_no and populating in table.
function search(){
	const search_data = document.getElementById("searchId").value;
	var xhttp = new XMLHttpRequest();
	xhttp.open("GET","http://localhost:8080/H2HBABBA1653/search.do?invoice_id="+search_data,false);
	xhttp.send();
	var dataSearch = JSON.parse(xhttp.responseText);
	table.innerHTML = "";
	for(var index = 0; index<dataSearch.length; index++){
		
		var tr = document.createElement("tr");	
		var tdCheck = document.createElement("td");
		var checkBox = document.createElement("input");
		checkBox.setAttribute('type', 'checkbox');
		checkBox.setAttribute('class', 'tickAll');
		checkBox.setAttribute('id', dataSearch[index].id);
		checkBox.setAttribute('onclick', 'changeColor(this)');
		tdCheck.appendChild(checkBox);
		
		tr.appendChild(tdCheck);
		
		var tdcName = document.createElement("td");
	    tdcName.innerHTML = dataSearch[index].name_customer;
	    tr.appendChild(tdcName);
	    
	    var tdcNo = document.createElement("td");
	    tdcNo.innerHTML = dataSearch[index].cust_number;
	    tr.appendChild(tdcNo);
	    
	    var tdcIno = document.createElement("td");
	    tdcIno.innerHTML = dataSearch[index].invoice_id;
	    tr.appendChild(tdcIno);
	    
	    var tdcIAmount = document.createElement("td");
	    tdcIAmount.innerHTML = dataSearch[index].total_open_amount+" K";
	    tr.appendChild(tdcIAmount);
	    
	    var tdcDd = document.createElement("td");
	    tdcDd.innerHTML = dataSearch[index].due_in_date;
	    tr.appendChild(tdcDd);
	    
	    var tdcPd = document.createElement("td");
	    
	    if(dataSearch[index].predicted_clear_date){
	    	tdcPd.innerHTML = dataSearch[index].predicted_clear_date;
	    }else{
	    	tdcPd.innerHTML = "- -";
	    }
	    tr.appendChild(tdcPd);
	    
	    var notes = document.createElement("td");
	    notes.innerHTML = "Lorem ipsum dolor sit amet."
	    tr.appendChild(notes);
	    
	    table.appendChild(tr);
	}
	document.getElementById("nextArrow").style.display = "none";
	document.getElementById("prevArrow").style.display = "none";
}






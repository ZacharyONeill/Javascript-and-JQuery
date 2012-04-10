
function init(){ //the initial call of the createSelection() function
	createSelection('Question 1');

}

function createSelection(qEntry){ //takes in a value that works with the dataz[] array, and builds selection options based on the entry
		
		if (document.getElementById('subForm').hasChildNodes()){ //if subForm has child nodes...
		
			while (document.getElementById('subForm').childNodes.length >= 1) { //make it so it doesn't have anything below it
		
				document.getElementById('subForm').removeChild( document.getElementById('subForm').firstChild );       
			} 
		}
		
		var qSelection = new Object();
		if(qEntry == 'Question 1'){ //just to handle the initial question...this probably could have been done more dynamically
			qSelection = dataz['Question 1'];
			var start = true;
			
		}else{ //for everything but the first one
			
			var start = false;
			qSelection = dataz[qEntry.value];
			
			while(qEntry != qEntry.parentNode.lastChild) { //if it has any children, MAKE IT NOT SO
				
				qEntry.parentNode.removeChild(qEntry.parentNode.lastChild);
			}
				
		}
		if(qSelection === undefined && qEntry.value != ''){ //this checks to see if it is completed (aka, final selection has been made
					
			//alert("You have selected: " + qEntry.value);
			document.getElementById('questionForm').appendChild(document.createElement('br'));
			var ans = document.createTextNode("You Chose: The " + qEntry.value);
			document.getElementById('questionForm').appendChild(ans);
			var theSelection = qEntry.value;
			createForm(theSelection);
		}else if(qEntry.value != ''){ //if not final value, keep on chuggin'
			//alert(qEntry.value);
			var sEle = document.createElement('select');
			sEle.setAttribute('onchange', 'createSelection(this)');
				
			if(!start){	//adds a line break if not first selection/question
				document.getElementById("questionForm").appendChild(document.createElement('br'));
			}
			
			var text = document.createTextNode(qSelection[0]);
			document.getElementById('questionForm').appendChild(text);
					
			
			var blankOpEle = document.createElement('option');
			blankOpEle.appendChild(document.createTextNode(''));
			sEle.appendChild(blankOpEle);
			var x = 1;	
			while(x < qSelection.length){ //so I like while loops more than for loops for whatever reason...hate me
				var cur = qSelection[x];
				var opEle = document.createElement('option');
				opEle.setAttribute('value',cur);
				opEle.appendChild(document.createTextNode(cur));
				sEle.appendChild(opEle);
				//adds option elements to the selection
				x++;
					
			}
			document.getElementById("questionForm").appendChild(sEle); //add select element to questionForm
					
		}	
	}
	function buildElement(elem,prop,val,text){ //just a little builder tool to create an element
		var bEle = document.createElement(elem);
		var theText = document.createTextNode(text);
		bEle.setAttribute(prop,val);
		//bEle.appendChild(theText);
		
		return bEle;

	}
	function createForm(instrument){ //creates the input form for cookies. Sends in a chosen instrument parameter, but is yet unused
		//this function builds all the form inputs and checks/sets cookies
		var firstNameEle = buildElement('input','name','firstName','First Name: ');
		firstNameEle.setAttribute('type', 'text');
		firstNameEle.setAttribute('id', 'firstInput');
		if(GetCookie('cFirst') != null){
			firstNameEle.setAttribute('value', GetCookie('cFirst'));
		}
				
		var lastNameEle = buildElement('input','name','lastName','Last Name: ');
		lastNameEle.setAttribute('type', 'text');
		lastNameEle.setAttribute('id', 'lastInput');
		if(GetCookie('cLast') != null){
			lastNameEle.setAttribute('value', GetCookie('cLast'));
		}
				
		var emailEle = buildElement('input','name','emailName','Email Address: ');
		emailEle.setAttribute('type', 'text');
		emailEle.setAttribute('id', 'emailInput');
		if(GetCookie('cEmail') != null){
			emailEle.setAttribute('value', GetCookie('cEmail'));
		}
				
		var submitEle = buildElement('input','type','submit','');
		submitEle.setAttribute('value', 'Submit');
		
		//holy appends batman...
		document.getElementById('subForm').appendChild(document.createTextNode("First Name:"));
		document.getElementById('subForm').appendChild(firstNameEle);
		document.getElementById('subForm').appendChild(document.createElement('br'));
		document.getElementById('subForm').appendChild(document.createElement('br'));
		document.getElementById('subForm').appendChild(document.createTextNode("Last Name:"));
		document.getElementById('subForm').appendChild(lastNameEle);
		document.getElementById('subForm').appendChild(document.createElement('br'));
		document.getElementById('subForm').appendChild(document.createElement('br'));
		document.getElementById('subForm').appendChild(document.createTextNode("Email:"));
		document.getElementById('subForm').appendChild(emailEle);
		document.getElementById('subForm').appendChild(document.createElement('br'));
		document.getElementById('subForm').appendChild(document.createElement('br'));
		document.getElementById('subForm').appendChild(submitEle);
		appear('subForm', true);
		//add instrument image
		createImg('images/'+instrument+'.jpg');
	}
	function theSubmit(){ //upon submit, checks values and sets cookies...mmmmmmmmmm
			
			var first = document.getElementById('subForm').firstName.value;
			var last = document.getElementById('subForm').lastName.value;
			var em = document.getElementById('subForm').emailName.value;
			
			if(first == '' || last == '' || em == '') {
				alert("There is an Incorrect Entry");
				createForm('');
			}		

			else {
				
				SetCookie('cFirst', first);
				SetCookie('cLast', last);
				SetCookie('cEmail', em);
			}
			
	}
	function appear(id, first) { //dhtml function that takes in an ID and makes it fade in...spoooooooooky. boolean is to check if it is first time in function
	
	var dom = document.getElementById(id);
	if(first){//if first time through function, make sure the element starts invisible, aka opacity=0
		dom.style.opacity = 0;
	}

	if(parseInt(dom.style.opacity) < 1) { //if not fully visible...
	
		dom.style.opacity = parseFloat(dom.style.opacity) + .05;
		setTimeout('appear("'+id+'",'+false+')', 75);
	}
	
}
	function createImg(instrument){ //takes the chosen instrument and selects the image to go into the right div
		
		var imgEle = document.createElement('img');
		imgEle.setAttribute('src',instrument);
		document.getElementById('right').appendChild(imgEle);
		
	
	
	
	
	}
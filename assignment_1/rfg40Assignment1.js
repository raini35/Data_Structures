/************************************************************************
*
*                       STACK DATA STRUCTURE
* 	
************************************************************************/
function Stack() {
	this._size = 0; 
	this._coef = []; 
	this._degree = []; 
}

Stack.prototype.push = function(data, key) {
	var size = ++this._size; 
	
	this._coef[size] = data; 
	this._degree[size] = key; 
	
}; 

Stack.prototype.pop = function() {
	var size = this._size, 
		deletedData; 
	if(size) {
		deletedData = this._coef[size]; 
		
		delete this._coef[size]; 
		delete this._degree[size]; 
		this._size--; 
	
		return deletedData; 
	}
};


/************************************************************************
*
*                       LOADING THE FILE 
* (If a different file is needed change the filename variable to the appropriate path)	
************************************************************************/
function load_file(filename){
var fs = require('fs');
var array = fs.readFileSync(filename).toString().split("\n");

return array

}

/************************************************************************
*
*                       LOADING THE POLYNOMIALS 
* 	
************************************************************************/
function load_polynomials(array) {
	var operations = ['+', '-', '*']; 
	var container = []; 
	while(array[i] != operations[0] && array[i] != operations[1] && array[i] != operations[2] )
	{
		container[i] = array[i].split(/\s/); 
		i++; 
	}
	
	return container; 
}

/************************************************************************
*
*                TURN ARRAY OF ARRAY INTO ARRAY OF STACKS
* 	
************************************************************************/
function turn_array_into_stacks(array) {
	var container = []; 
	
	for(var n = 0; n < array.length; n++){
		var new_stack = new Stack(); 
		
		for(var l = 1; l < array[n].length; l += 2) {
			new_stack.push(array[n][l-1], array[n][l]); 
		}
		container.push(new_stack); 
	}
	return container; 
}
/************************************************************************
*
*                       LOADING THE OPERATORS
* 	
************************************************************************/
function load_operators(array) {
	var operations = ['+', '-', '*']; 
	 var size = array.length; 
	 var container = []; 
	 var i = 0; 
 	
	 while(i < size) {
		if(array[i] == operations[0] || array[i] == operations[1] || array[i] == operations[2] ) 
		{
			container.push(array[i]);
		}	
		
		i++; 
	 }
	 
	return container; 
}
/************************************************************************
*
*                         ADDITION FUNCTION 
*	
************************************************************************/
function addition(right_operand, left_operand) {
	var return_stack = new Stack();
	 
	if(right_operand._size < left_operand._size) {
		temp = left_operand; 
		left_operand = right_operand; 
		right_operand = temp; 
	}
	
	for(var i = 1; i <= right_operand._size; i++) {
		var done = false; 
	 	var sum = parseInt(right_operand._coef[i]);

		for(var j = 1; j <= return_stack._size; j++) {
			if(right_operand._degree[i] == return_stack._degree[j]){
				done = true; 
			}
		}
	
		if(!done) {
			for(var h = 1; h <= left_operand._size; h++) {

				if(right_operand._degree[i] == left_operand._degree[h]) {
					sum = sum + parseInt(left_operand._coef[h]); 
				}
			}
			return_stack.push(sum, right_operand._degree[i]); 
		}

 
	}

	
	for(var k = 1; k <= left_operand._size; k++) {
		var found = false; 

		for(var l = 1; l <= return_stack._size; l++) {
			if(left_operand._degree[k] == return_stack._degree[l]){
				found = true;
			}
		}
		
		if(!found) {
			return_stack.push(left_operand._coef[k], left_operand._degree[k]); 
		}
	}
	
	
	return return_stack;
}

/************************************************************************
*
*                         SUBTRACTION FUNCTION 
*	
************************************************************************/
function subtraction(right_operand, left_operand) {
	var return_stack = new Stack();
	 
	if(right_operand._size < left_operand._size) {
		temp = left_operand; 
		left_operand = right_operand; 
		right_operand = temp; 
	}
	
	for(var i = 1; i <= right_operand._size; i++) {
		var done = false; 
	 	var difference = parseInt(right_operand._coef[i]);

		for(var j = 1; j <= return_stack._size; j++) {
			if(right_operand._degree[i] == return_stack._degree[j]){
				done = true; 
			}
		}
	
		if(!done) {
			for(var h = 1; h <= left_operand._size; h++) {

				if(right_operand._degree[i] == left_operand._degree[h]) {
					difference = difference - parseInt(left_operand._coef[h]); 
				}
			}
			return_stack.push(difference, right_operand._degree[i]); 
		}

 
	}

	
	for(var k = 1; k <= left_operand._size; k++) {
		var found = false; 

		for(var l = 1; l <= return_stack._size; l++) {
			console.log(return_stack._degree[l]); 
			if(left_operand._degree[k] == return_stack._degree[l]){
				found = true;
			}
		}
		
		if(!found) {
			return_stack.push(left_operand._coef[k], left_operand._degree[k]); 
		}
	}
	
	
	return return_stack;
}

/************************************************************************
*
*                       NORMALIZING FUNCTION 
*	
************************************************************************/
function normalize_the_following(stack) {

	var solution = new Stack(); 

	for(var i = 1; i <= stack._size; i++) {
		var done = false; 
		var sum = parseInt(stack._coef[i]);
	 
		for(var j = 1; j <= solution._size; j++) {
			if(stack._degree[i] == solution._degree[j]){
				done = true; 
			}
		}
	
		if(!done) {
			for(var h = i + 1; h <= stack._size; h++) { 
				if(stack._degree[i] == stack._degree[h]) {
					sum = sum + parseInt(stack._coef[h]); 
				}
			}
			solution.push(sum, stack._degree[i]); 
		}

 
	}
	
	return solution; 
}


/************************************************************************
*
*                         MULTIPLICATION FUNCTION 
*	
************************************************************************/
function multiplication(right_operand, left_operand) {
	var return_stack = new Stack();
	var product = 0; 
	var exponent = 0; 
		
	if(right_operand._size < left_operand._size) {
		temp = left_operand; 
		left_operand = right_operand; 
		right_operand = temp; 
	}
	
	for(var i = 1; i <= left_operand._size; i++) {

		for(var h = 1; h <= right_operand._size; h++) {
			product = parseInt(left_operand._coef[i]) * parseInt(right_operand._coef[h]); 
			exponent = parseInt(left_operand._degree[i]) + parseInt(right_operand._degree[h]); 
			
			return_stack.push(product, exponent); 
		}
	}
	
	
	return_stack = normalize_the_following(return_stack); 
	
	return return_stack;

}


/************************************************************************
*
*                   PERFORMS ALL THE FUNCTIONS NEEDED 
*	
************************************************************************/
function perform_calculation(stack_input, operators) {
	var return_stack = stack_input; 
	var i = 0; 
	while(i < operators.length){
		var right = return_stack.pop(); 
		var left = return_stack.pop(); 
		var sol; 
		
		if(operators[i] == '+'){
			sol = addition(right, left); 
		}
		if(operators[i] == '-'){
			sol = subtraction(right, left); 
		}
		if(operators[i] == '*'){
			sol = multiplication(right, left); 
		}
		
		return_stack.push(sol); 
		
		i++; 
	}
	
	return return_stack; 
}

/************************************************************************
*
*                   OUTPUT STACK  
*	
************************************************************************/
function output_stack(stack_input, operators, solution) {
	var string= ""; 
	var iterator = 0; 

	for(var i = 0; i < stack_input.length; i++) {
		for(var h = 1; h <= stack_input[i]._size; h++) {
			string = string + stack_input[i]._coef[h] + "x^" + stack_input[i]._degree[h] ; 
			
			if(h !== stack_input[i]._size) {
				string = string + " + "; 
			}
		}
		
		string = string + "\n"; 

	}
	
	while(iterator < operators.length) {
		string = string + operators[iterator] + "\n"; 
		iterator++; 
	}

	var t = 0; 
	for(var key in solution) {
		if(key == '0') {
			string = string + solution[key]; 
		}
		else if(key == '1') {
			string = string + solution[key] + "x"; 
		}
		else {
			string = string + solution[key] + "x^" + key ; 
		}
			
		if(t !== Object.keys(solution).length - 1) {
			string = string + " + "; 
		}
		
		t++; 
	}
	
	return string; 
}

/************************************************************************
*
*                   			TURN STACK INTO HASH 
*	When pushed into hash the keys are automatically ordered 	
************************************************************************/
function stack_into_hash(solution2) {
	var container = {}; 
	
	for(var x = 1; x <= solution2[0]._size; x++) {

		container[solution2[0]._degree[x]] = solution2[0]._coef[x]
		
		
	}
	
	return container; 
	
}
/************************************************************************
*
*                   			MAIN  
*	
************************************************************************/
var polynomials = []; 
var operators = []; 
var stack = []; 
var solution = []; 
var i = 0; 

var array = load_file("assignment2DataFile.txt");
 
var polynomials = load_polynomials(array); 

var original_stack = turn_array_into_stacks(polynomials); 

var stack = turn_array_into_stacks(polynomials); 

var operators = load_operators(array); 

//var normalized = normalize_the_following(sum); 

var solution = perform_calculation(stack, operators);

var solution3 = stack_into_hash(solution); 

var output = output_stack(original_stack, operators, solution3); 

console.log(output); 
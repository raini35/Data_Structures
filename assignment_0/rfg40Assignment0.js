/************************************************************************
*
*                       LOADING THE FILE 
* (If a different file is needed change the filename variable to the appropriate path)	
************************************************************************/

var fs = require('fs');
var filename = "assignment1DataFile.txt"
var array = fs.readFileSync(filename).toString().split("\n");


/************************************************************************
*
*                         ADDITION FUNCTION 
*	
************************************************************************/
function add_the_two_numbers(right_hand_num, left_hand_num, number_sign) {
	number_sign = number_sign || "+"; 
	var remainder = 0 ; 
	var sum_number; 
	var sum_list = []; 
	
	var right_num_array = right_hand_num.reverse(); 
	var left_num_array = left_hand_num.reverse(); 
	
	var greater_num_size = 0; 
	var right_num_size = right_num_array.length; 
	var left_num_size = left_num_array.length; 
	
	if (right_num_size > left_num_size)
	{
		greater_num_size = right_num_size; 
	} 
	else 
	{
		greater_num_size = left_num_size; 
	}
	

	for (h = 0; h < greater_num_size; h++) {
		if (left_num_array[h]  !== undefined){
			left_num_array.push(0);
		}
		
		if (right_num_array[h] !== undefined){
			right_num_array.push(0); 	
		}
		
		sum_number = parseInt(right_num_array[h]) + parseInt(left_num_array[h]) + remainder; 
		
		if (sum_number > 9 && h < greater_num_size - 1) {
			sum_number = sum_number - 10; 
			remainder = 1; 
		}
		else {
			remainder = 0; 
		}
		
		sum_list.push(sum_number); 
		
	}
	
	
	if(number_sign == '-') {
		sum_list.push(number_sign); 
	}
	
	sum_list = sum_list.reverse(); 
	
	return sum_list; 

}


/************************************************************************
*
*                       SUBTRACTION FUNCTION 
*	
************************************************************************/
function subtract_the_two_numbers(right_number, left_number, number_sign) {
	left_number = left_number.join(''); 
	var nines_compliment_number = get_nines_compliment(left_number, right_number.length); 	

	var sum = add_the_two_numbers(right_number, nines_compliment_number); 
	
	if(sum[0] > 9) {
		sum[0] = sum[0] - 10; 
		if(sum[0] == 0) {
			sum.shift(); 
		}
		var difference = add_the_two_numbers(sum, [1]); 
 
	}
	
	if(number_sign == '-') {
		difference.unshift(number_sign); 
	}
	
	return difference; 
}


/************************************************************************
*
*                     NINE'S COMPLIMENT FUNCTION 
*	
************************************************************************/

//Finding the nines compliment of a number by 
//1. Splitting the number into individual chars
//2. Using a for loop to traverse the new array 
//3. In the for loop subtract 9 by the number 
//4. Store each difference into a new array 
//5. After the traversal, reverse the array 
//6. Return nines compliment number
//The array that is returned is an array of ints not of strings
function get_nines_compliment(number, size) {
	var each_number = number.split(''); 
	var size_of_number = each_number.length; 
	var new_number = []; 
	var difference_of_sizes = size - size_of_number; 
	
	if (difference_of_sizes !== 0) {
		for( y = 0; y < difference_of_sizes; y++) {
	
		each_number.unshift(0); 
		}
	}
	
	for (j = 0; j < size; j++) {
		if (each_number[j]  !== undefined){
			new_number.push(9 - each_number[j]); 
		}
		else {
			new_number.push(9); 

		}
	}
	
	
	return new_number;
	
}


/************************************************************************
*
*                            MAIN FUNCTION 
*	
************************************************************************/

for (i = 2; i < array.length; i += 3)
{
	var right_num_index = i - 2; 
	var left_num_index = i - 1; 
	var solution = 0; 
	
	//The following switches the numbers if the abs(right hand) is less 
	//than the abs(left hand)
	var right_list = array[right_num_index].split(''); 
	var left_list = array[left_num_index].split(''); 
	var number_sign = array[i]; 



	if(array[i] == "-") {
		if(left_list[0] == '-') {
			left_list.shift();
		}
		else if (left_list[0] == '+') {
			left_list[0] = '-'; 
		}
		else if (left_list[0] !== '-' && left_list[0] !== '+'){
			left_list.unshift('-');
		}
		else {
			//So that numbers with no signs will not get deleted. 
		}
	}
	
	if(array[right_num_index] < array[left_num_index] || right_list.length < left_list.length) 
	{
		var temp = left_list; 
		left_list = right_list; 
		right_list = temp; 
	}
	if(right_list.length < left_list.length) 
	{
		var temp = left_list; 
		left_list = right_list; 
		right_list = temp; 
	}

	 

	if (right_list[0] == '-' && left_list[0] == '-') {
		right_list.shift(); 
		left_list.shift(); 
		
		solution = add_the_two_numbers(right_list, left_list, "-");

	}
		
	else if (right_list[0] !== '-' && left_list[0] !== '-') {
		if(right_list[0] == "+"){
			right_list.shift(); 
		}
		if(left_list[0] == "+") {
			left_list.shift(); 
		}
		 
		solution = add_the_two_numbers(right_list, left_list); 
	}

	else if(right_list[0] == '-' && left_list[0] != '-') {
		right_list.shift(); 
		
		if(left_list[0] == "+") {
			left_list.shift(); 
		}

		solution = subtract_the_two_numbers(right_list, left_list, "-"); 
			
	}
	//  
	else if (right_list[0] !== '-' && left_list[0] == '-'){
		left_list.shift(); 
		if(right_list[0] == "+") {
			right_list.shift(); 
		}
		  
		solution = subtract_the_two_numbers(right_list, left_list); 
 
	}
	
	else {
	
	}
		

	var line = "-".repeat(solution.length + 1); 

	
	console.log(array[right_num_index]); 
	console.log(array[left_num_index]); 
	console.log(array[i]); 
	console.log(line); 
	console.log(solution.join(''));
	
}
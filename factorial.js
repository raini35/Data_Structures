function factorial(n) {
	if(n == 0) 
		return 1; 
	else 
		return n * factorial(n-1);
}


function sum(lower, upper) {
	if(lower > upper) 
		return "Error: Lower number is greater than Upper number"; 
	
	if(lower == upper) 
		return upper; 
	else 
		return lower + sum(lower + 1, upper); 

}

function exp(base, exponent) {
	if(exponent == 1) 
		return base; 
	else 
		return base * exp(base, exponent - 1);  
}

console.log(5*4*3*2*1);
console.log(factorial(5));
console.log(sum(3,4)); 
console.log(exp(2,2));

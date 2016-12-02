function quadFullFunction(value, tableSize, hash) {
	var collision = 0; 
	var hashValue = value % tableSize; 
	var key = (hashValue + collision) % tableSize
	
	if(hash[key] == undefined) 
		return key 
	else {
		while(hash[key] !== undefined) {
			collision++; 
			key = (hashValue + Math.pow(collision, 2)) % tableSize
		}
		return key; 
	}
}

function linFullFunction(value, tableSize, hash) {
	var collision = 0; 
	var hashValue = value % tableSize; 
	var key = (hashValue + collision) % tableSize
	
	if(hash[key] == undefined) 
		return key 
	else {
		while(hash[key] !== undefined) {
			collision++; 
			key = (hashValue + collision) % tableSize
		}
		return key; 
	}
}

function doubleFullFunction(value, tableSize, hash) {
	var collision = 0; 
	var hashValue = value % tableSize; 
	var key = (hashValue) % tableSize
	
	if(hash[key] == undefined) 
		return key 
	else {
		collision = 7 - (value % 7); 
		key = hashValue; 
		while(hash[key] !== undefined){
			key = (	key + collision) % tableSize;
		}
	
		console.log(key);
		return key; 
	}
}

function linearProbe(keys, tableSize) {
	var hash = []; 
	for(var i = 0; i < array.length; i++) {
		var key = linFullFunction(array[i], tableSize, hash); 
		hash[key] = array[i]; 
	}
	return hash;
}

function quadraticProbe(keys, tableSize) {
	var hash = []; 
	for(var i = 0; i < array.length; i++) {
		var key = quadFullFunction(array[i], tableSize, hash); 
		hash[key] = array[i]; 
	}
	return hash; 

}

function doubleHashing(keys, tableSize) {
	var hash = []; 
	for(var i = 0; i < array.length; i++) {
		var key = doubleFullFunction(array[i], tableSize, hash); 
		hash[key] = array[i]; 
		console.log(hash);
	}
	return hash; 
}


var array = [21, 46, 109, 827, 924, 193, 841, 913, 745, 64]; 
var hello = []; 
var newHash = doubleHashing(array, 11); 
console.log(newHash); 


function convertStringToValue(string) {
	var sum = 0; 
	for(var i = 0; i < string.length; i++) {
		sum = sum + string.charCodeAt(string.length - i - 1)* Math.pow(2, i); 
	}	
	console.log('Integer key for "' + string + '" value is ' + sum); 
}

convertStringToValue("adam");
convertStringToValue("counter");
convertStringToValue("foster");
convertStringToValue("retsof");

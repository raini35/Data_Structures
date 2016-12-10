var readline = require('readline-sync');
/************************************************************************
*
*                      DICTIONARY
* 
************************************************************************/
function Dictionary() {
	this.hashTable = []; 
	this.size = 0; 
}

Dictionary.prototype.insert_word_with_hash_key = function(hash_key, word) {
	if(this.hashTable[hash_key] == undefined) {
		this.hashTable[hash_key] = word.join(''); 
		this.size++; 
	}
	/**else {
		var new_hash_key = 
	}**/
	
	return 
}

/*Dictionary.prototype.collision_function = function(hash_key, word, hashTable) {

}

Dictionary.prototype.search_for_word = function(hash_key, word) {
	while() {
	
	}
	else if(
}
*/

/************************************************************************
*
*                       LOADING THE DICTIONARY FILE 
* (If a different file is needed change the filename variable to the appropriate path)	
************************************************************************/
function load_dic_file(filename){
	var fs = require('fs');
	var array = fs.readFileSync('en_US.dic').toString().split("\n");

	var final_array = []; 

	for(var i = 0; i < array.length; i++) {
		var add = array[i].split(''); 
		final_array.push(add); 
	}

	final_array.pop(); 

	return final_array

}
/************************************************************************
*
*                       LOADING THE TXT FILE 
* (If a different file is needed change the filename variable to the appropriate path)	
************************************************************************/
function load_txt_file(filename){
	var fs = require('fs');
	var array = fs.readFileSync('exampleText.txt').toString().split("\n");

	var final_array = []; 

	for(var line_number = 0; line_number < array.length; line_number++) {
		var current_line = array[line_number].split(" "); 

		for(var word = 0; word < current_line.length; word++) {
			current_line[word] = current_line[word].split(''); 
		}
		final_array.push(current_line); 
	}

	return final_array

}
/************************************************************************
*
*                       CLEAN UP DICT FILE 
* 
************************************************************************/
function clean_up_following_dict(file) {
	var limit = file.length; 
	var outer_array = []; 
	for(var i = 0; i < limit; i++) {
		var word = file[i]; 
		var inner_array = []; 
		for(var j = 0; j < word.length; j++) {
			if(word[j] == '/') 
				break; 
			inner_array.push(word[j]); 
		}
		outer_array.push(inner_array); 
	}	
	
	return outer_array; 
}

/************************************************************************
*
*                      TURNING DICT FILE INTO HASH TABLE
* 
************************************************************************/
function get_dictionary_using_following(dict_file) {
	var hashTable = new Dictionary(); 
	var limit = dict_file.length; 
	for(var i = 0; i < limit; i++) {
		var word = dict_file[i]; 
		var word_key = get_key_for(word); 
		var hash_key = hash_function_for(word_key, limit);  
		hashTable.insert_word_with_hash_key(hash_key, word, hashTable); 
	}
	
	return hashTable; 
}
/************************************************************************
*
*                      GET KEY FOR WORD 
* 
************************************************************************/
function get_key_for(word) {
	var first_key = 0; 
	
	for(var j = 0; j < word.length; j++) {
		first_key = first_key + word[j].charCodeAt(0)*Math.pow(37, j); 
	}
	
	return first_key; 
}
/************************************************************************
*
*                      HASH FUNCTION 
* 
************************************************************************/
function hash_function_for(word_key, limit) {
	return word_key % limit;
}

 

/************************************************************************
*
*                       		MAIN
* 
************************************************************************/
//var file = readline.question("Enter the text path to text file: ");
var file ='';
var txt_file = load_txt_file(file); 
var file = load_dic_file(file); 
var clean_dict_file = clean_up_following_dict(file); 
var dictionary = get_dictionary_using_following(clean_dict_file);
console.log(dictionary);
//output();
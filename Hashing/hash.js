var readline = require('readline-sync');
/************************************************************************
*
*                      DICTIONARY
* 
************************************************************************/
function Dictionary(dict_file) {
	this.hashTable = {}; 
	this.size = dict_file.length; 
	this.prime = this.get_closest_prime_to_size(); 
	this.collision = 0; 
}

Dictionary.prototype.insert_word_with_hash_key = function(hash_key, word, limit) {
	if(this.hashTable[hash_key] == undefined) {
		this.hashTable[hash_key] = [word.join('')]; 
	}
	else {
		this.hashTable[hash_key].push(word.join(''));
		this.collision++; 
	}

	return 
}

Dictionary.prototype.collision_function = function (hash_key, word) {
	var collision = this.prime - (hash_key % this.prime); 
	
	while(this.hashTable[hash_key] !== undefined){
		hash_key = (hash_key + collision) % this.size;
	}
	
	this.hashTable[hash_key] = word.join('');
	
	return; 
}

Dictionary.prototype.get_closest_prime_to_size = function () {
	var TABLE_SIZE = this.size; 
        for (var i = TABLE_SIZE - 1; i >= 1; i--)
        {
            var fact = 0;
            for (var j = 2; j <= Math.sqrt(i); j++)
                if (i % j == 0)
                    fact++;
            if (fact == 0)
                return i;
        }
        return 3;
}

/************************************************************************
*
*                       LOADING THE DICTIONARY FILE 
* (If a different file is needed change the filename variable to the appropriate path)	
************************************************************************/
function load_dic_file(filename){
	var fs = require('fs');
	var array = fs.readFileSync(filename).toString().split("\n");

	var final_array = []; 

	for(var i = 0; i < array.length; i++) {
		var add = array[i].split(''); 
		final_array.push(add); 
	}


	return final_array

}
/************************************************************************
*
*                       LOADING THE TXT FILE 
* (If a different file is needed change the filename variable to the appropriate path)	
************************************************************************/
function load_txt_file(filename){
	var fs = require('fs');
	var array = fs.readFileSync(filename).toString().split("\n");

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
	var hashTable = new Dictionary(dict_file); 
	var limit = dict_file.length; 
	for(var i = 0; i < limit; i++) {
		var word = dict_file[i]; 
		var word_key = get_key_for(word); 
		var hash_key = hash_function_for(word_key, limit);  
		hashTable.insert_word_with_hash_key(hash_key, word, limit); 
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
*                      CLEAN UP WORD 
* 
************************************************************************/
function clean_up(word) {
	var inner_array = []; 
		for(var j = 0; j < word.length; j++) {
			if(word[j] == "\'" ||word[j] == "'" || word[j] == "." || word[j] == '?'|| word[j] == '.' ||  word[j] == ',') {
				break; 
			}
			if(word[j] !== '"')
				inner_array.push(word[j].toLowerCase()); 
		}

	return inner_array; 
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
*                      SPELLCHECKER
* 
************************************************************************/
function SpellChecker() {
	this.mispelled_words = {};
	this.not_probed_words = {}; 
	this.number_of_not_probed_words = 0; 
	this.number_of_probed_words = 0; 
	this.number_of_mispelled_words = 0; 
	this.total_check = 0; 
}

SpellChecker.prototype.check_for_mispellings_in_following = function(file, dictionary) {
	for(var line = 0; line < file.length; line++) {
		var current_line = file[line]; 
		for(var word = 0; word < current_line.length; word++) {
			this.total_check++; 

			var current_word = current_line[word]; 
			var cleaned_up = clean_up(current_word); 
			var current_word_key = get_key_for(cleaned_up) % dictionary.size; 
			
			if(dictionary.hashTable[current_word_key%dictionary.size] == undefined) {
				this.not_probed_words[current_word_key] = [cleaned_up.join('')]; 
				this.number_of_not_probed_words++; 
			}
			else { 
				this.number_of_probed_words++; 

				var check = this.check_spelling(cleaned_up, dictionary.hashTable[current_word_key%dictionary.size]); 
				
				if(check == false && cleaned_up.length !== 0) {
					this.number_of_mispelled_words++; 

					if(this.mispelled_words[line + 1] == undefined) 
						
						this.mispelled_words[line + 1] = [cleaned_up.join('')];
					else 
						this.mispelled_words[line + 1].push(cleaned_up.join(''));
				}
			}
			
		}
	}
}

SpellChecker.prototype.check_spelling = function (word, dict_row) {
	var found = false; 
	for(var i = 0; i < dict_row.length; i++) {
		var dict_word = dict_row[i].split(''); 		
		if(dict_word[0] == word[0]) {
			for(var j = 1; j < word.length; j++) {
				if(dict_word[j] == word[j]){
					found = true; 
				}
				else {
					found = false; 
					break; 
				}
			}
		}
		else {
			found = false; 
		}
		
		if(found == true) {
			break; 
		}
	}
	
	return found; 
}

/************************************************************************
*
*                       		OUTPUT RESULTS
* 
************************************************************************/
function output(SpellChecker, Dictionary, Text) {
	console.log('TEXT FILE:'); 
	output_txt_file(Text); 
	console.log('\nMISPELLED WORDS:');
	output_mistakes(SpellChecker.mispelled_words);
	console.log('__________________________');
	console.log('Total words checked: ' + SpellChecker.total_check + " | Total number of misspelled words: " + SpellChecker.number_of_mispelled_words); 
	console.log('__________________________');
	console.log('Number of collisions in creating hash table:' + Dictionary.collision); 
	console.log('__________________________');
	console.log('Total number of unsuccessful probes: ' + SpellChecker.number_of_not_probed_words + ' | Total number of successful probes: ' + SpellChecker.number_of_probed_words);
	console.log('__________________________');
	console.log('load factor (lambda) of the table: ' + '1');
	console.log('__________________________');
	console.log('size of hash table: ' + dictionary.size);
}


function output_mistakes(object) {
	for(var key in object) {
		var array = object[key]; 
		for(var i = 0; i < array.length; i++) {
			console.log('Line[' + key + "]: " +  array[i]);
		}
	}

}
	
/************************************************************************
*
*                       		OUTPUT TEXTFILE
* 
************************************************************************/
function output_txt_file(file) {
	var fs = require('fs');
	var array = fs.readFileSync(file).toString().split("\n");

	for(var i = 0; i < array.length; i++) {
		console.log('['+(i+1) + '] ' + array[i]);
	}
}
/************************************************************************
*
*                       	MAIN
* 
************************************************************************/

var text = readline.question("Enter the text path to text file: ");
var dict = readline.question("Enter the text path to dictionary file: ");
var txt_file = load_txt_file(text); 
var file = load_dic_file(dict); 
var clean_dict_file = clean_up_following_dict(file); 
var dictionary = get_dictionary_using_following(clean_dict_file);
var SpellChecker = new SpellChecker(); 
SpellChecker.check_for_mispellings_in_following(txt_file, dictionary); 
output(SpellChecker, dictionary, text);
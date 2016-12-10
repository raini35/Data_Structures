var hello = []; 


if(hello[0] == undefined) 
	console.log("empty");
else 
	console.log("not empty");

/************************************************************************
*
*                      SPELLCHECKER
* 
************************************************************************/
function SpellChecker() {
	this.mispelled_words = {}
}

SpellChecker.prototype.check_for_mispellings_in_following = function(file, dictionary) {
	for(var line = 0; line < file.length; line++) {
		var current_line = file[line]; 
		for(var word = 0; word < line.length; word++) {
			var current_word = current_line[word]; 
			var current_word_key = get_key_for(current_word); 
			var dictionary_word = dictionary[current_word_key]; 
			
			for(
			
		}
	}
}
/************************************************************************
*
*                       		OUTPUT RESULTS
* 
************************************************************************/
function output() {
	console.log('TEXT FILE:'); 
	output_txt_file(); 
	console.log('\nMISPELLED WORDS:');
	console.log('Line 1'+ ' Misspelled word');
	console.log('__________________________');
	console.log('Total words checked: ' + 'number' + " | Total number of misspelled words: " + 'number'); 
	console.log('__________________________');
	console.log('Number of collisions in creating hash table:' + 'number'); 
	console.log('__________________________');
	console.log('Total number of unsuccessful probes: ' + 'number' + ' | Total number of successful probes: ' + 'number');
	console.log('__________________________');
	console.log('load factor (lambda) of the table: ' + 'number');
	console.log('__________________________');
	console.log('size of hash table: ' + 'number');
}
/************************************************************************
*
*                       		OUTPUT TEXTFILE
* 
************************************************************************/
function output_txt_file(file) {
	var fs = require('fs');
	var array = fs.readFileSync('exampleText.txt').toString().split("\n");

	for(var i = 0; i < array.length; i++) {
		console.log('['+(i+1) + '] ' + array[i]);
	}
}
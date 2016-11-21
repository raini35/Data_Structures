var readline = require('readline-sync');

/************************************************************************
*
*                       LOADING THE FILE 
* (If a different file is needed change the filename variable to the appropriate path)	
************************************************************************/
function load_file(filename){
var fs = require('fs');
var array = fs.readFileSync(filename).toString().split("\n");

var final_array = []; 

for(var i = 0; i < array.length; i++) {
	var add = array[i].split(/[ :]+/); 
	final_array.push(add); 
}

return final_array

}

/************************************************************************
*
*                       LOADING THE NUMBER FILE 
* 
************************************************************************/
function load_number_file(filename){
var fs = require('fs');
var array = fs.readFileSync(filename).toString().split(/[ ]+/);

for(var i = 0; i < array.length; i++) {
	array[i] = parseInt(array[i]); 
}

return array

}

/************************************************************************
*
*                       GO THROUGH COMMANDS 
* 
************************************************************************/
function go_through_commands(command_array) {
	var nodeSize = readline.question("Enter the max capacity for bTree node: ");

	var btree = new BTree(parseInt(nodeSize)); 
	for(var i = 0; i < command_array.length; i++) {
		var command = command_array[i]; 
		switch(command[0]) {
			case 'L':
				console.log("\nProcessed 'L' command"); 
				console.log("Loading " + command[1] + " into bTree..."); 
				var number_array = load_number_file(command[1]); 
				btree.fill_with_following(number_array); 
				console.log(btree); 
				break; 
			case 'P':
				console.log("\nProcessed 'P' command");
				console.log("Printing the current bTree..."); 
				btree.print(); 
				break; 
			case 'D':
				console.log("\nProcessed 'D' command");
				var number = command[1];
				var found = btree.search_for(number); 
				if(found) {
					console.log("Removing " + number + " from bTree...");
					btree.remove_following(number); 
				}
				else {
					console.log("Value " + number + " not found in BST"); 
				}
				break; 
			case 'S':
				var number = command[1];
				console.log("\nProcessed 'S' command"); 
				console.log("Searching for " + number + " in bTree..."); 
				var found = btree.search_for(number); 
				if(found) {
					console.log("Value " + number + " found in BST"); 
				}
				else {
					console.log("Value " + number + " not found in BST"); 
				}
				
				break; 
			case 'A':
				var number = command[1];
				console.log("\nProcessed 'A' command");
				console.log("Adding " + number + " into bTree..."); 

				var found = btree.search_for(number); 
				if(found) {
					console.log("Warning, duplicate value, ignoring\n"); 
				}
				else {
					btree.insert_following(number); 
				}	
				
				break; 
			case 'T':
				console.log("\nProcessed 'T' command");
				console.log("Exiting out of program"); 
				console.log("Have a good day!"); 
				process.exit()
				break; 
			default: 
		
		}
	}
}

/************************************************************************
*
*                   B TREE
* 
************************************************************************/

var BTree = function(m) {
	this._root=null; 
	this._m = m; 
	
}

var BTreeNode = function(m) {
	this.m = m; 
	this.keys = []; 
	this.pointers = []; 
}

/************************************************************************
*
*                   INSERT FUNCTION
* 
************************************************************************/
BTree.prototype.fill_with_following = function(array) {
	for(var i = 0; i < array.length; i++) {
		this.insert_following(array[i]); 
	}
}

BTree.prototype.insert_following= function(value) {
	if(this._root == null) {
		this._root = new BTreeNode(this._m); 
		this._root.keys.push(value); 
	}
	else {
		this.insert_recursion(this._root, value); 
	}
	
	var overflow = this._root.isOverloaded(); 
	if(overflow) {
		var newTree = this._root.splitNode(); 
		this._root = newTree; 
	}
}

BTree.prototype.insert_recursion = function(current, value) {
	if(current.pointers.length == 0) {
		current.keys.push(value); 
		current.sortNode(); 
		return; 
		
	}
	else {
		for(var toProperNode = 0; toProperNode < current.keys.length; toProperNode++) {
			if(value < current.keys[toProperNode]) {
				break; 
			}
		}
		this.insert_recursion(current.pointers[toProperNode], value);
	}
	
	var overflow = current.pointers[toProperNode].isOverloaded(); 
	
	if(overflow) {
		var tempTree = current.pointers[toProperNode].splitNode(); 
		current.keys.push(tempTree.keys[0]); 
		current.pointers.pop(); 
		current.pointers.push(tempTree.pointers[0]); 
		current.pointers.push(tempTree.pointers[1]); 
	}
		
	return; 
	
}
/************************************************************************
*
*                     SORT FUNCTION
* 
************************************************************************/
BTreeNode.prototype.sortNode = function() {
  return this.keys.sort(function (a, b) {return a - b; });
};
/************************************************************************
*
*                     OVERLOADED FUNCTION
* 
************************************************************************/

BTreeNode.prototype.isOverloaded = function () {
  return this.keys.length === this.m;
};
/************************************************************************
*
*                     SPLIT FUNCTION
* 
************************************************************************/
BTreeNode.prototype.splitNode = function() {
	var newTree = new BTreeNode(this.m); 
	
	var leftSplit = new BTreeNode(this.m);
  	var rightSplit = new BTreeNode(this.m);

  	leftSplit.keys = this.keys.splice(0, Math.ceil(this.keys.length / 2) - 1);
  	var median = this.keys.splice(0, 1)[0];
  	rightSplit.keys = this.keys.splice(0);

	if(this.pointers.length !== 0) {
  		leftSplit.pointers = this.pointers.splice(0, this.pointers.length / 2); //TODO
  		rightSplit.pointers = this.pointers.splice(0);
	}	
	newTree.keys.push(median); 
	newTree.pointers.push(leftSplit); 
	newTree.pointers.push(rightSplit); 
	
	return newTree; 
	
};

/************************************************************************
*
*                     SEARCH FUNCTION
* 
************************************************************************/
BTree.prototype.search_for = function(value) {
	
	if(this._root == null) {
		return false; 
	}
	else {
		return this.search_recursion(this._root, value); 
	}	
}
BTree.prototype.search_recursion = function(current, value) {
	for(var i = 0; i < current.keys.length; i++) {
			if(value == current.keys[i]) {
				return true; 
			}
			if(value < current.keys[i]) {
				break; 
			}
	}
	
	if(current.pointers.length == 0 ) {
		return false; 
	}	
	else {
		return this.search_recursion(current.pointers[i], value); 
	}
}

/************************************************************************
*
*                     PRNT FUNCTION
* 
************************************************************************/
BTree.prototype.print = function() {
	var output = []; 
	if(this._root == null) {
		console.log("bTree is empty"); 
	}	
	else if(this._root.pointers.length == 0) {
		for(var i = 0; i < current.keys.length; i++) {
			output.push(current.keys[i]); 
		}
		console.log(output.join()); 
	}
	else {
		this.print_recursion(this._root, output)
		console.log(output.join())
	}
}

BTree.prototype.print_recursion = function (current, string_array) {
	if(current.pointers.length == 0) {
		for(var i = 0; i < current.keys.length; i++) {
			string_array.push(current.keys[i]); 
		}
		return; 
	}
	
	for(var i = 0; i < current.pointers.length; i++ ) {
		this.print_recursion(current.pointers[i], string_array); 
	}
	
	
	return string_array; 
}

/************************************************************************
*
*                   REMOVE FUNCTION
* 
************************************************************************/
BTree.prototype.remove_following= function(value) {
	if(this._root.pointers.length == 0 ) {
		var index = current.keys.indexOf(value);
		current.keys.index.splice(index, 1);
	}
	this.remove_recursion(this._root, value); 
	
	var underflow = this._root.isUnderloaded(); 
	
	if(underflow) {
		var newTree = this._root.combineNode(); 
		this._root = newTree; 
	}
}

BTree.prototype.remove_recursion = function(current, value) {
	if(current.pointers.length == 0) {
		current.keys.push(value); 
		current.sortNode(); 
		return; 
		
	}
	else {
		for(var toProperNode = 0; toProperNode < current.keys.length; toProperNode++) {
			if(value < current.keys[toProperNode]) {
				break; 
			}
		}
		this.insert_recursion(current.pointers[toProperNode], value);
	}
	
	var underflow = current.pointers[toProperNode].isOverloaded(); 
	
	if(underflow) {
		var tempTree = current.pointers[toProperNode].splitNode(); 
		current.keys.push(tempTree.keys[0]); 
		current.pointers.pop(); 
		current.pointers.push(tempTree.pointers[0]); 
		current.pointers.push(tempTree.pointers[1]); 
	}
		
	return; 
	
}

/************************************************************************
*
*                     UNDERLOADED FUNCTION
* 
************************************************************************/

BTreeNode.prototype.isUnderloaded = function () {
  return this.keys.length === this.m/2 - 1;
};

/************************************************************************
*
*                     FIND MAX OF LEFTMOST TREE
* 
************************************************************************/

BTree.prototype.findMaxValue = function (current) {
	if(current.pointers.length == 0) {
		var maxValue = current.keys.pop(); 
		return maxValue; 
	}
	else {
		maxPointer = current.pointers.length - 1; 
		return this.findMaxValue(current.pointers[maxPointer]); 
	}
};

/************************************************************************
*
*                     COMBINE FUNCTION
* 
************************************************************************/
BTreeNode.prototype.combineNode = function() {
	var newTree = new BTreeNode(this.m); 
	
	var leftSplit = new BTreeNode(this.m);
  	var rightSplit = new BTreeNode(this.m);

  	leftSplit.keys = this.keys.splice(0, Math.ceil(this.keys.length / 2) - 1);
  	var median = this.keys.splice(0, 1)[0];
  	rightSplit.keys = this.keys.splice(0);

	if(this.pointers.length !== 0) {
  		leftSplit.pointers = this.pointers.splice(0, this.pointers.length / 2); //TODO
  		rightSplit.pointers = this.pointers.splice(0);
	}	
	newTree.keys.push(median); 
	newTree.pointers.push(leftSplit); 
	newTree.pointers.push(rightSplit); 
	
	return newTree; 
	
};

/************************************************************************
*
*                    MAIN
* 
************************************************************************/
var file = readline.question("Enter the text path to text file: ");

var array = load_file(file); 

go_through_commands(array); 
console.log(array); 
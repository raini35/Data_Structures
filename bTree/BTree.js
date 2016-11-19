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
* (If a different file is needed change the filename variable to the appropriate path)	
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
	console.log("Entered command"); 
	var btree = new BTree(); 
	for(var i = 0; i < command_array.length; i++) {
		var command = command_array[i]; 
		switch(command[0]) {
			case 'L':
				var number_array = load_number_file(command[1]); 
				//BST.fill_with_following(number_array); 
				
				break; 
			case 'P':
				console.log("Processed a P\n");
				//BST.print();  
				break; 
			case 'D':
				console.log("Processed a D\n");
				break; 
			case 'S':
				console.log("Processed a S\n");
				/*
				var number = command[1];
				var found = BST.search(number); 
				if(found) {
					console.log(number + " value found in BST"); 
				}
				else {
					console.log(number + " value not found in BST"); 
				}
				*/
				break; 
			case 'A':
				console.log("Processed a A\n");
				/*
				var number = command[1];
				var found = BST.search(number); 
				if(found) {
					console.log("Warning, duplicate value, ignoring\n"); 
				}
				else {
					BST.insert(number); 
				}	
				*/
				break; 
			case 'T':
				console.log("\nExiting out of program"); 
				console.log("Have a good day!"); 
				process.exit()
				break; 
			default: 
		
		}
	}
}

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
BTree.prototype.insert= function(value) {
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
BTree.prototype.search = function(value) {
	return this.search_recursion(this._root, value); 
	
	
}
BTree.prototype.search_recursion = function(current, value) {
	if(current == null) {
		return false; 
	}
	var found = false; 
	var i = 0; 
	
	if(value == current.keys[i]) {
		found = true; 
	}
	
	console.log("Before Entering the while loop"); 

	while(!found && value < current.keys[i]){
		console.log("Entering the while loop"); 

		if(value == current.keys[i]) {
			found = true; 
		}
		i++;
	}
	
	if(value > current.keys[i]) {
		i++; 
	}
	
	if(found) {
		return true;
	}
	else {
		this.search_recursion(current.pointers[i], value); 
	}
}



/*var hello = new BTree(); 
hello.insert(30); 
hello.insert(20);
hello.insert(40); 
hello.insert(10); 
hello.insert(12); 
hello.insert(13); 
console.log(hello); */



/*hello = new BTree() ; 
hello.insert(2); 
hello.insert(4); 
hello.insert(5); 
hello.insert(6); 
hello.insert(7); 
hello.insert(6); 
hello.insert(7); 
console.log(hello.search(4)); 
console.log(hello._root.pointers[1]); */

var hello = 0; 
var two = 2; 
function nope(value, value2) {
	value = value + 1; 
	value2 = value2 + 1; 

}

nope(hello, two); 

console.log(hello); 
console.log(two); 
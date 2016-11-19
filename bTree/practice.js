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
				break
			}
			if(value < current.keys[i]) {
				break; 
			}
	} 
	
	if(value == current.keys[i]){
		return true; 
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
*                       MAIN
* 
************************************************************************/

var tree = new BTree(5); 
tree.insert(20); 
tree.insert(11); 
tree.insert(12); 
tree.insert(13); 
tree.insert(15); 
tree.insert(16); 
tree.insert(17); 


console.log(tree.search(17)); 
console.log(tree.search(20)); 

console.log(tree); 




//************************************************************************

/*
What you want is to enter the insert using the child so that 
when it goes out of the if else statement it can check if the 
node is filled and then you can easily add the keys and children 
to the parent node 

if the children length = 0 then add the value 
	then return 
else search for the proper pointer and then call the insert function 

after the if else statement 
	check if the node is full 
		if the node is full then call the split node function 
else 
	return function 

*/

//TEST TO SEE IF LENGTH METHOD COULD RECOGNIZE AN EMPTY ARRAY 
/*var array = []; 
console.log(array.length); 
*/

//TEST TO SEE IF A VARIABLE DEFINED INSIDE A ELSE STATEMENT CAN BE PRINTED
/*
function recursion(value, array) {
	console.log(array); 
	var destination = 1; 
	if(value == 0) {
		array.push(value); 
		return; 
	}
	else {
		array.push(value); 
		recursion(value - 1, array); 
	}
	console.log("hello"); 
	if(array.length > 3) {
		array.pop(); 
	}
	console.log(array); 
	
	return; 	
}

var array = []; 
var bool = true; 
if(bool) {
	var destination = 0; 
}
else {
	var destination = 1; 
}

console.log(array); 
recursion(5, array); 
recursion(0, array); */
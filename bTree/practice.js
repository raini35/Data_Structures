//So javascript does not
var BTree = function(m) {
	this._root=null; 
	this._m = m; 
	
}

var BTreeNode = function(m) {
	this.m = m; 
	this.keys = []; 
	this.pointers = []; 
}

BTree.prototype.insert = function(value) {
	if(this._root == null) {
		var firstNode = new BTreeNode(this._m); 
		this._root = firstNode; 
	}
	
	this.insert_recursion(this._root, value); 
}

BTree.prototype.insert_recursion = function(current, value) {
	var i = current.searchForProperPlaceFor(value); 
		console.log("Ending if statement"); 

	if(typeof i === "number") {
		console.log("if statement"); 
		this.insert_recursion(current.pointers[i], value); 
		
	}
	else {
		current.keys.push(value); 
		current.sortNode(); 
		console.log("exiting value " + value); 
		return; 

	}
	
	console.log("Just exited the if statement"); 
	if(current[i].isOverloaded()) {
			console.log("Array is overloaded.");
			/*console.log("Entering if overloaded"); 
			var tree = current.splitNode(); 
			if(current.children.length > 0) {
				
			}
			console.log(tree); 
			this._root = tree; */
	}
	
}

BTreeNode.prototype.searchForProperPlaceFor = function(value) {
	var availableSpace = ((this.pointers.length - 1) - this.keys.length) > 0;
  	if (this.pointers.length !== 0 && !availableSpace) {
    	for (var i = 0; destination < this.keys.length; destination++) {
     		if (value < this.keys[i]) {
        		break;
      		}
    	}
    	return i;
  	}
  	
  	return null;
}

BTreeNode.prototype.sortNode = function () {
  this.keys.sort(function (a, b) {return a - b; });
}

BTreeNode.prototype.isOverloaded = function () {
	console.log("Entering overload function"); 
	console.log(this.keys.length); 
  return this.keys.length == this.m;
}

BTreeNode.prototype.splitNode = function() {
	var leftNode = new BTreeNode(this.m); 
	var rightNode = new BTreeNode(this.m); 
	var median = Math.floor(this.keys.length/2); 
	
	for(var i = 0; i < median; i++) {
		var value = this.keys[i]; 
		leftNode.keys.push(value); 
	}
	
	for(var i = median + 1; i < this.keys.length; i++) {
		var value = this.keys[i]; 
		rightNode.keys.push(value); 
	}
	
	var newTree = new BTreeNode(this.m); 
	newTree.keys.push(this.keys[median]); 
	newTree.pointers.push(leftNode); 
	newTree.pointers.push(rightNode); 

	return newTree; 
}

/*var BTree = function (order) {
  this.order = order;
  this.values = [];
  this.children = [];
};
*/
BTree.prototype.print = function() {
	BTree.print_recursion(this._root); 
}
var hello = new BTree(5); 
hello.insert(30); 
hello.insert(20); 
hello.insert(40); 
hello.insert(50); 
hello.insert(60); 
hello.insert(60); 
a
console.log(hello); 

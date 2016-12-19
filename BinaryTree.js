var BinaryTree = function() {
	this.root = null; 
	this.size = 0; 
}

var node = function(value) {
	this.data = value; 
	this.right = null; 
	this.left = null; 
}

BinaryTree.prototype.add = function(value) {
	if(this.root == null) {
		this.root = new node(value); 
	}
	else {
		this.add_recursion(value, this.root); 
	}
}

BinaryTree.prototype.add_recursion = function(value, current_node) {

	if(current_node.data < value && current_node.right == null) {
		current_node.right = new node(value); 
		this.size++; 
		return;
	}
	
	if(current_node.data > value && current_node.left == null) {
		current_node.left = new node(value); 
		this.size++; 
		return; 
	}
	
	if(current_node.data < value) 
		return this.add_recursion(value, current_node.right); 
	else 
		return this.add_recursion(value, current_node.left); 
	
}

BinaryTree.prototype.remove = function(value) {
	
}

BinaryTree.prototype.removeMin = function (parent, node) {
	if(node!== null) {
		if(node.left !== null) 
			return this.removeMin(node, node.left); 
		else {
			console.log(parent.left);
			parent.left = node.right; 
			return node; 
		}	
	}
	else 
		return null; 
}

BinaryTree.prototype.remove_recursion = function(root, value) {
	if(root !== null) {
		if(root.data < value) 
			this.remove_recursion(root.right, value); 
		else if(root.data > value) 
			this.remove_recursion(root.left, value); 
		else if(root.left !== null && root.right !== null) {
			var nodeMin = removeMin(root, root.right); 
			root.value = nodeMin.data; 
		}
		else {
			console.log("EQUAL");
			console.log(root);
			if(root.left !== null) {
				console.log("LEFT");
				root = root.left; 
			}
			else {
				console.log("RIGHT");
				var node = root.right;
				root = node; 
			}
		}
	}
}

BinaryTree.prototype.find = function(value, current_node) {
	if(current_node.data !== value && current_node.left == null && current_node.right == null)
		return 0; 
	else if(current_node.data == value) {
		return 1; 
	}
	else {
		if(current_node.data < value) 
			return this.find(value, current_node.right); 
		else 
			return this.find(value, current_node.left); 

	}		

}

var hello = new BinaryTree(); 
hello.add(13);
hello.add(11);

hello.add(15);
hello.add(18);
hello.add(12);
//console.log(hello);
console.log(hello.remove_recursion(hello.root, 11));
console.log(hello);
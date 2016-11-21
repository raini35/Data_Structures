var array = [0,1,2,3,4,5]; 
console.log(array); 
var index = array.indexOf(7);
if(index > -1){
array.splice(index, 1);
}
console.log(array); 

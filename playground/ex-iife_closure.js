/**
 * 
 * IIFE with private & public methods, variables
 * Achived with help of closures.  (Inner functions returned.)
 */

var moduleController = (function(){
    var x = 3;
    var add = function (a){
       return x+a;
    }
    var minus = function (a){
        return a-x;
     }
    return {
        publicAdd:function(ax){
            console.log(add(ax));
        },
        publicMinus:function(ax){
            console.log(minus(ax));
        }
    }
})();

//using public method exposed via power of closure 
moduleController.publicAdd(3)
// following call would fail, as private method could not be used.
//moduleController.minus(3)
console.log(moduleController.x);
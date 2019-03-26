var BudgetController = (function(){
    var sqrtFunc = function(a){
        return a*a;
    }
    return {
        publicSqrt: function(a){
           return sqrtFunc(a)
        }
    }
})();

var UIController = (function(){
    
    var addFancyStuff = function(value){
        return 'Result would be displayed here:'+ value
    } 

    return {
        showToUI: function(value){
            console.log(addFancyStuff(value))
        }
    }
})();


var Controller = (function(budgetCtrl, UICtrl){
   var sqrResult =  budgetCtrl.publicSqrt(6);
    UICtrl.showToUI(sqrResult);
})(BudgetController, UIController);
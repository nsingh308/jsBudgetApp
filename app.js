var BudgetController = (function(){
    
})();

var UIController = (function(){
    
    
})();


var Controller = (function(budgetCtrl, UICtrl){
   var addItem = function(){
       console.log('It Works');
   }
   
   document.querySelector('.add__btn').addEventListener('click',addItem);
   document.addEventListener('keypress',function(e){
        if(e.keyCode===13 || e.which === 13){  
            addItem();
        }
   });

   
})(BudgetController, UIController);
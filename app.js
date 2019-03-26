var BudgetController = (function(){
    
})();

var UIController = (function(){

    var domString = {
        inputType : '.add__type',
        inputDescription:'.add__description',
        inputValue : '.add__value',
        inputBtn : '.add__btn'
    }
    
    return {
        getInput : function(){
            return {
                type:document.querySelector(domString.inputType).value,
                description:document.querySelector(domString.inputDescription).value,
                value:document.querySelector(domString.inputValue).value
            }
        },
        getDomString : function(){
            return domString
        }
    }
    
})();


var Controller = (function(budgetCtrl, UICtrl){

    var setupEventListeners = function(){
        var DOM = UICtrl.getDomString();
        document.querySelector(DOM.inputBtn).addEventListener('click',addItem);
        document.addEventListener('keypress',function(e){
            if(e.keyCode===13 || e.which === 13){  
                addItem();
            }
        });
    }
    
    var addItem = function(){
        console.log(UICtrl.getInput());
    }
   
    return {
        init: function(){
            setupEventListeners();
        }
    }

})(BudgetController, UIController);

Controller.init();
/**
 * Controller to hold data 
 */
var budgetController = (function(){
    //function constructors 
    var Expense = function(id, description, value){
        this.id=id;
        this.description=description;
        this.value=value;
    };
    var Income = function(id, description, value){
        this.id=id;
        this.description=description;
        this.value=value;
    };

    var data ={
        allItems:{
            exp:[],
            inc:[]
        },
        total:{
            exp:0,
            inc:0
        }
    }

    return {
        testing: function(){
            console.log(data);
        },
        addItem: function(type, des, val){
            var newItem, ID;
            
            if(data.allItems[type].length>0){
                ID = data.allItems[type][data.allItems[type].length-1].id+1;
            }else{
                ID=0;
            }

            if(type === 'inc'){
                newItem = new Income(ID,des,val)
            }else if (type === 'exp'){
                newItem = new Expense(ID,des,val)
            }
            data.allItems[type].push(newItem);
            return newItem;

        }
    }
})();


/**
 * Controller for UI purposes
 */
var uiController = (function(){

    var domString = {
        inputType : '.add__type',
        inputDescription:'.add__description',
        inputValue : '.add__value',
        inputBtn : '.add__btn',

        incomeContainer : '.income__list',
        expenseContainer : '.expenses__list'
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
        },
        addListItem:function(obj,type){
            var html, newItem,element;
            
            if(type === 'inc'){
                element = domString.incomeContainer;
                html= '<div class="item clearfix" id="income-%id%">'+
                        '<div class="item__description">%description%</div>'+
                            '<div class="right clearfix">'+
                                '<div class="item__value">+ %value%</div>'+
                                '<div class="item__delete">'+
                                    '<button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>'+
                                '</div>'+
                            '</div>'+
                        '</div>';
            
            }else if (type === 'exp'){
                element = domString.expenseContainer;
                html= '<div class="item clearfix" id="expense-%id%">'+
                        '<div class="item__description">%description%</div>'+
                            '<div class="right clearfix">'+
                            '<div class="item__value">- %value%</div>'+
                            '<div class="item__percentage">21%</div>'+
                            '<div class="item__delete">'+
                                '<button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>'+
                            '</div>'+
                        '</div>'+
                       '</div>'
            }

           newItem =  html.replace('%id%',obj.id);
           newItem = newItem.replace('%description%',obj.description);
           newItem = newItem.replace('%value%',obj.value);
           document.querySelector(element).insertAdjacentHTML('beforeend',newItem)
          

        },
        clearInputFields:function(){
           
            var fields, fieldsArr;
            fields = document.querySelectorAll(domString.inputDescription + ', ' + domString.inputValue);
            fieldsArr = Array.prototype.slice.call(fields)

            fieldsArr.forEach(function(current, index, array){
               
                current.value="";
            });

            fields[0].focus();
        }
    }
    
})();

/**
 * Controller for communicating between UI and Data controllers
 */
var controller = (function(budgetCtrl, UICtrl){

    
    var ctrlAddItem = function(){
        
        var input = UICtrl.getInput();

        // 1. add the input values to Data Item.

        var newItem = budgetCtrl.addItem(input.type, input.description, input.value)
        
        UICtrl.addListItem(newItem,input.type)
        UICtrl.clearInputFields();
        //budgetCtrl.testing();

    }
    
    
    var setupEventListeners = function(){
        var DOM = UICtrl.getDomString();
        document.querySelector(DOM.inputBtn).addEventListener('click',ctrlAddItem);
        document.addEventListener('keypress',function(e){
            if(e.keyCode===13 || e.which === 13){  
                ctrlAddItem();
            }
        });
    }
    
   
    return {
        init: function(){

            setupEventListeners();
            console.log('Application has started...');
        }
    }

})(budgetController, uiController);

controller.init();
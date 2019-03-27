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

    //Private Functions
    var calculateTotals = function(type){
        
        var sum = 0;

        data.allItems[type].forEach(function(current){
            sum = sum+current.value
        })
        data.totals[type]=sum;
    };

    var data ={
        allItems:{
            exp:[],
            inc:[]
        },
        totals:{
            exp:0,
            inc:0
        },
        budget:0,
        percentage:-1
    }
    
    return {

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

        },
        calculateBudge: function(){
            //calculate total incomes and expense
            calculateTotals('inc')
            calculateTotals('exp')
            //calculate budge = total income - expense
            data.budget = data.totals.inc - data.totals.exp;
            // calculate percentage expense = (total budge * expense )/100
            if(data.totals.inc > 0)
            data.percentage = Math.round((data.totals.exp / data.totals.inc )*100);
        
        },
        getBudget: function(){
            return {
                budget: data.budget,
                totalInc : data.totals.inc,
                totalExp : data.totals.exp,
                percentage: data.percentage

            }    
        },


        
        testing: function(){
            console.log(data);
        }
    }
})();


/**
 * Controller for UI purposes
 */
var uiController = (function(){

    var domString = {

        inputType :          '.add__type',
        inputDescription:    '.add__description',
        inputValue :         '.add__value',
        inputBtn :           '.add__btn',

        incomeContainer :    '.income__list',
        expenseContainer :   '.expenses__list',

        budget :             '.budget__value',
        incomeTotal :        '.budget__income--value',
        expenseTotal:        '.budget__expenses--value',
        percentageTotal:     '.budget__expenses--percentage'
    }
    
    return {

        getInput : function(){
            return {
                type:document.querySelector(domString.inputType).value,
                description:document.querySelector(domString.inputDescription).value,
                value: parseFloat(document.querySelector(domString.inputValue).value)
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
        displayBudget : function(obj){
            
            document.querySelector(domString.budget).textContent=obj.budget
            document.querySelector(domString.incomeTotal).textContent=obj.totalInc
            document.querySelector(domString.expenseTotal).textContent=obj.totalExp
            
            if(obj.percentage>0){
                document.querySelector(domString.percentageTotal).textContent=obj.percentage + '%'

            }else{
                document.querySelector(domString.percentageTotal).textContent='---'

            }
            
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

    var updateBudget = function(){

        budgetController.calculateBudge();
        var budget = budgetController.getBudget();
        console.log(budget)
        UICtrl.displayBudget(budget);

    }
    var ctrlAddItem = function(){
        
        var input = UICtrl.getInput();

        // 1. add the input values to Data Item.
        if(input.description!=="" && !isNaN(input.value)){
            var newItem = budgetCtrl.addItem(input.type, input.description, input.value)
            
            UICtrl.addListItem(newItem,input.type)
            UICtrl.clearInputFields();
            updateBudget()
        }else{
            alert('Please enter input fields')
        }
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
            UICtrl.displayBudget({
                budget: 0,
                totalInc : 0,
                totalExp : 0,
                percentage: -1

            }    );
            console.log('Application has started...');
        }
    }

})(budgetController, uiController);

controller.init();
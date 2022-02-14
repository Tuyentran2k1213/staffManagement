// Viết mã JS tại đây

// validator constructor 
function validator(options){

    var selectorRules = {};

    //validate function
    function validate(inputElement, rule){
        var parent = inputElement.parentElement;
        
        var rules = selectorRules[rule.selector];

        for(var i = 0; i < rules.length; ++i){
            errorMess = rules[i](inputElement.value);
            if(errorMess) break;
        }

        var invalidMess = parent.querySelector(options.errorSelector);
            if(errorMess){
                invalidMess.innerText = errorMess;
                parent.classList.add('invalid');
            } else{
                invalidMess.innerText = '';
                parent.classList.remove('invalid');
            }
            return !errorMess;
    }

    //get element of form for action
    var formElement = $(options.form);

    //submit event

    formElement.onsubmit = function(e){
        e.preventDefault();

        var isFormValid = true;


        options.rules.forEach(function(rule){
            var inputElement = formElement.querySelector(rule.selector);
            validate(inputElement, rule);
            
            var isValid = validate(inputElement, rule);

            if(!isValid){
                isFormValid = false;
            }

        })

        
        if(isFormValid){
            if(typeof options.onSubmit === 'function'){
                var enableInputs = formElement.querySelectorAll('[name]:not([disable])');
                var formValue = Array.from(enableInputs).reduce(function(values, input){
                return (values[input.name] = input.value) && values;
        }, {});
        options.onSubmit(formValue);
                   function manager(){

                    function addStaff(){
                        var staffData = new Staff(formValue.Id, formValue.Name, formValue.Email, formValue.Pass, formValue.Date, formValue.rank);
                        if(findfStaffbyId(staffData.idsta) == -1){
                            Liststaff.push(staffData);
                            render(Liststaff);
                        } 
                        if(findfStaffbyId(staffData.idsta) != -1){
                         var index = findfStaffbyId(staffData.idsta);
                         Liststaff[index] = new Staff(formValue.Id, formValue.Name, formValue.Email, formValue.Pass, formValue.Date, formValue.rank);
                         render(Liststaff);
                        }
                    }
                    addStaff();
                    }
                
                manager();
            }
        }
    }

    if(formElement){
        options.rules.forEach(function (rule) {
            if(Array.isArray(selectorRules[rule.selector])){
                selectorRules[rule.selector].push(rule.test);
            } else {
                selectorRules[rule.selector] = [rule.test];
            }
            var inputElement = formElement.querySelector(rule.selector);
            if(inputElement){
                inputElement.onblur = function(){
                    validate(inputElement, rule);
                }
                inputElement.oninput = function(){
                    var parent = inputElement.parentElement;
                    var invalidMess = parent.querySelector(options.errorSelector);
                    invalidMess.innerText = '';
                    parent.classList.remove('invalid');
                }
            }
        });
    }
}

// defined rules name
validator.isRequired = function(selector, message){
    return {
        selector: selector,
        test: function(value){
            return value.trim() ? undefined : message || 'Vui lòng nhập vào đây';
        }
    }
}

// defined rules email
validator.isEmail = function(selector, message){
    return {
        selector: selector,
        test: function(value){
            var regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
            return regex.test(value) ? undefined : message || 'Bạn phải nhập email hợp lệ vào đây';
        }
    }
}

// min of input
validator.minLength = function(selector, min, max, message){
    return {
        selector: selector,
        test: function(value){
            return (value.length >= min && value.length <= max) ? undefined : message || `Bạn chỉ được nhập từ ${min} đến ${max} kí tự`;
        }
    }
}

// confirmed input 
validator.confirmed = function(selector, getEqualValue, message){
    return {
        selector: selector,
        test: function(value){
            return value === getEqualValue() ? undefined : message || `Giá trị bạn nhập không đúng`           
        }
    }
}
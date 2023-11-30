const submit_button = document.querySelector('.submit_button');
const last_operation = document.querySelector('.last_operation');
const result = document.querySelector('.math_input');

let first_number = '';
let sign;  
let second_number = '';

let remember_last_operation;

const check_characters = () => {
    let math_input = document.querySelector('.math_input').value;

    let signs_counter = 0;
    let count_dots = 0;

    for(i=0; i<math_input.length; i++) {//making sure, that field doesn't contain any different character

        if(isNaN(math_input[i])) {
            if(allowed_signs(i, math_input)) {
                signs_counter++;
                if(signs_counter > 1) { //   +   -   *   /   
                    alert('There are more than one sign.');
                    result.value = '';
                    break;
                }
            }  else if(math_input[i] == '.' || math_input[i] == ',') {
                count_dots++;
                if(count_dots > 2) {
                    alert("To much dots or commas");
                    result.value = '';
                    break;
                }
            } else {
                alert('This field contain unallowed character.');
                result.value = '';
                break;
            }
        }
    }

    if(math_input.length > 2 && signs_counter == 1 && count_dots < 3) {       
        calculate(math_input);
    } 
}
const allowed_signs = (i, math_input) => {
    if(math_input[i] == '+' || math_input[i] == '-' || math_input[i] == '*' || math_input[i] == '/') {
        return true;
    } else {
        return false;
    }
}
const calculate = (math_input) => {
    let new_value = 0;

    first_number = '';
    sign;  
    second_number = '';
    is_input_empty(math_input);
    
    for(i=0; i<math_input.length; i++) { 
        if(math_input[i] == '.' || math_input[i] == ',' || Number(math_input[i]) || math_input[i] == 0) {
            first_number += math_input[i];
            new_value = i;
            new_value++;
        } else {break;}
    }

    sign = math_input[new_value];
    
    new_value++;
    for(j=new_value; j<math_input.length; j++) {
        second_number += math_input[j];
    }

    first_number = first_number.replace(',','.');
    second_number = second_number.replace(',','.');       

    first_number = parseFloat(first_number);
    second_number = parseFloat(second_number);


    if(first_number && sign && second_number) { //removing last operation
        last_operation.innerHTML = '';
    } else {
        last_operation.innerHTML = remember_last_operation;
    }
    
    if(sign.length > 0 && !isNaN(second_number))  {
        switch (sign) {
            case '+':
                result.value = first_number + second_number;
                remember_last_operation = last_correct_operation(first_number, sign, second_number);
                break;
            case '-':
                result.value = first_number - second_number;
                remember_last_operation = last_correct_operation(first_number, sign, second_number);
                break;
            case '*':
                result.value = first_number * second_number;
                remember_last_operation = last_correct_operation(first_number, sign, second_number);
                break;
            case '/':
                if(second_number == 0) {
                    alert('Do not divide by 0!');
                    break;
                } else {
                    result .value= first_number / second_number;
                    remember_last_operation = last_correct_operation(first_number, sign, second_number);
                    break;
                }
            }
        } 
}
const is_input_empty = (math_input) => {
    if(math_input.length == 0) {
        alert('This field is empty. I cannot count it.');
        let_count = false;
    }
}
const last_correct_operation = (first_number, sign, second_number) => {
    return last_operation.innerHTML += first_number + sign + second_number;
}

submit_button.addEventListener('click', calculate);

onkeydown = e => {
    switch(e.key) {
        case 'Enter':
            check_characters();
            break;
        case '+':
            check_characters();
            break;
        case '-':
            check_characters();
            break;
        case '*':
            check_characters();
            break;
        case '/':
            check_characters();
            break;
    }
}
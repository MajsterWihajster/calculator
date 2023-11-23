const submit_button = document.querySelector('.submit_button');
const last_operation = document.querySelector('.last_operation');
const result = document.querySelector('.result');


const calculate = () => {
    let math_input = document.querySelector('.math_input').value;
    
    let first_number = '';
    let sign;
    let signs_counter = 0;
    let second_number = '';
    
    let new_value = 0;

    let let_count = false;
    let count_dots = 0;

    result.innerHTML = '';
    last_operation.innerHTML = '';

    is_input_empty(math_input);

    for(i=0; i<math_input.length; i++) {//making sure, that field doesn't contain any different character

        if(isNaN(math_input[i])) {
            if(allowed_signs(i, math_input)) {
                signs_counter++;
                if(signs_counter > 1) { //+-*/
                    alert('There are more than one sign.');
                    let_count = false;
                    break;
                }
            }  else if(math_input[i] == '.') {
                count_dots++;
                if(count_dots > 2) {
                    alert("To much dots");
                    let_count = false;
                    break;
                }
            } else {
                alert('This field contain unallowed character.');
                let_count = false;
                break;
            }
        }
    }

    if(math_input.length > 2) {       
        let_count = true;      
    } else {
        alert('Invalid input');
    }

    if(let_count)
    {
        for(i=0; i<math_input.length; i++) { 
            if(math_input[i] == '.' || Number(math_input[i])) {
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
     
        first_number = parseFloat(first_number);
        second_number = parseFloat(second_number);
    
        switch (sign) {
            case '+':
                result.innerHTML = first_number + second_number;
                break;
            case '-':
                result.innerHTML = first_number - second_number;
                break;
            case '*':
                result.innerHTML = first_number * second_number;
                break;
            case '/':
                result.innerHTML = first_number / second_number;
                break;
    
        }
        last_operation.innerHTML += first_number + sign + second_number;
    }
}

const is_input_empty = (math_input) => {
    if(math_input.length == 0) {
        alert('This field is empty. I cannot count it.');
        let_count = false;
    }
}

const allowed_signs = (i, math_input) => {
    if(math_input[i] == '+' || math_input[i] == '-' || math_input[i] == '*' || math_input[i] == '/') {
        return true;
    } else {
        return false;
    }
}

submit_button.addEventListener('click', calculate);

onkeydown = e => {
    switch(e.key) {
        case 'Enter':
            calculate();
            break;
        case ',':
            // if(document.activeElement == document.querySelector('.math_input'))
            break;
    }
}
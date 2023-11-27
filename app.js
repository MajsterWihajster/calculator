const submit_button = document.querySelector('.submit_button');
const last_operation = document.querySelector('.last_operation');
const result = document.querySelector('.result');



const calculate = () => {
    
    let math_input = document.querySelector('.math_input').value;

    let first_number = '';
    let second_number = '';
    let sign;
    
    let signs_counter = 0;

    
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

    if(math_input.length > 2 && signs_counter == 1 && count_dots < 3) {       
        let_count = true;      
    }

    if(math_input == '.+.') {
        alert("Cannot count it. Sorry");
        let_count = false;
    }

    if(let_count == true)
    {
        for(i=0; i<math_input.length; i++) { 
            if(math_input[i] == '.' || Number(math_input[i]) || math_input[i] == 0) {
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

        if(sign.length > 0) {
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
                    if(second_number == 0) {
                        alert('Do not divide by 0!');
                        break;
                    } else {
                        result.innerHTML = first_number / second_number;
                        break;
                    }
                }
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
    }
}
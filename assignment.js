// defining constants
const firstClassPrice = 150; // First class price $150
const economyPrice = 100; // economy price $100
const vat = 10; // vat 10%

let firstClassInput = document.getElementById('firstClassInput');
let economyInput = document.getElementById('economyInput');
let subtotal = document.getElementById('subtotal');
let vatAmount = document.getElementById('vat');
let totalAmount = document.getElementById('total');

// buttons
let btn = {
    first : {
        plus : document.querySelector('#firstClassGroup .btn-plus'),
        minus : document.querySelector('#firstClassGroup .btn-minus')
    }, 
    economy :{
        plus : document.querySelector('#economyGroup .btn-plus'),
        minus : document.querySelector('#economyGroup .btn-minus')
    }
}

// adding click event listener to first class plus button
btn.first.plus.addEventListener('click', function(){
    increments('first')
});

// adding click event listener to first class minus button
btn.first.minus.addEventListener('click', function(){
    // check the value if it is greater or equal zero 
    if(+firstClassInput.value > 0){
        decreaments('first');
        calculate();
    }else{
        alert('Quantity never be negative');
    }
});

// adding click event listener to economy class plus button
btn.economy.plus.addEventListener('click', function(){
    increments('economy');
});

// adding click event listener to economy class minus button
btn.economy.minus.addEventListener('click', function(){
    // check the value if it is greater or equal zero 
    if(+economyInput.value > 0){
        decreaments('economy');
        calculate();
    }else{
        alert('Quantity never be negative');
    }
});


// to disable invalid input in input fields
let fields = document.querySelectorAll('input[data-type=number]');
fields.forEach(restrictInvalid);

// adding keyup event listener to first class input field
firstClassInput.addEventListener('keyup', calculate);

// adding keyup event listener to first class input field
economyInput.addEventListener('keyup', calculate);

// increment function, when user click in plus button it will run
function increments(where){
    if(where == 'first'){
        firstClassInput.value = +firstClassInput.value + 1;
        calculate();
    }else if(where == 'economy'){
        economyInput.value = +economyInput.value + 1;
        calculate();
    }else{
        alert("Invalid argument value. Only accept 'first' or 'economy'.");
    }
    
}

// decreament function when user click in minus button it will run
function decreaments(where){
    if(where == 'first'){
        firstClassInput.value = +firstClassInput.value - 1;
    }else if(where == 'economy'){
        economyInput.value = +economyInput.value - 1;
    }else{
        alert("Invalid argument value. Only accept 'first' or 'economy'.");
    }
}

// calculate for subtotal, vat and total
function calculate(){
    // first class amount
    let firstClassAmount = +firstClassInput.value * firstClassPrice;
    // economy amount
    let economyAmount = +economyInput.value * economyPrice;
    let subtotalAmount = firstClassAmount + economyAmount;
    let total = subtotalAmount + calculateVat(subtotalAmount);
    // changing DOM with calculated value
    subtotal.innerText = '$'+subtotalAmount;
    vatAmount.innerText = '$'+calculateVat(subtotalAmount);
    totalAmount.innerText = '$'+total;
}

// vat calculation 
function calculateVat(subtotal){
    return (subtotal * vat)/100;
}

// restrict invalid input function 
// only numbers are allowed nothing else
function restrictInvalid(field){
    // when user input quantity of ticket by key press
    field.addEventListener('keyup', function(){
        // the array of allowed number that is valid for our input fields
        let allowedNumber = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
        let value = this.value; // current value of input field
        let splited = value.split(''); // splited array
        let valid = []; // valid inputs array, we will join this array's value later on
        for (let i = 0; i < splited.length; i++) {
            if(allowedNumber.indexOf(splited[i]) != -1){ 
                valid.push(splited[i]);
            }else{
                window.alert('SORRY, "'+ splited[i] + '" is not a number.');
            }
        }
        this.value = +valid.join('');
    });
}

// buttons : Book Now & Go Back
let btn_book = document.querySelector('#btn-book');
let go_back = document.querySelector('#goBack');


// book now button click event listener
btn_book.addEventListener('click', function(){
    if(validateForm()){
        document.querySelector('.booking-form').style = 'display : none'; // hidding form
        document.querySelector('.order-submit').style = 'display:block;'; // showing message
    }
    
});

// go back button click event listener
go_back.addEventListener('click', function(){
    window.location.reload(); 
});

// form validation function 
function validateForm(){
    let from = document.querySelector('#from').value;
    let to = document.querySelector('#to').value;
    let departure = document.querySelector('#departure').value;
    let returnDate = document.querySelector('#returnDate').value;
    let firstClassInput = +document.querySelector('#firstClassInput').value;
    let economyInput = +document.querySelector('#economyInput').value;

    // if any field is empty
    if(from.length < 1 || to.length < 1 || departure.length < 1 || returnDate < 1){
        alert('All Fields are required');
        return false;
    }else if(firstClassInput + economyInput < 1){ // ticket quantity is more then one 
        alert('Please insert minimum 1 ticket to submit');
        return false;
    }else{ // all validation pass
        return true;
    }
}

// hide the message as default
document.querySelector('.order-submit').style = 'display:none;';

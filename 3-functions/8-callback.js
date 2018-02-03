function checkIfEven(num, success, failure ) {
    if (typeof num === 'number') {
        if (num % 2 === 0) { // (num % 2)
            if (typeof success === 'function') {
                success('num is even');
            }
        } else {
            if (typeof failure === 'function') {
                failure('num is odd');
            }
        }
    }
}
checkIfEven(20);
checkIfEven(31, 77787, failure);

function success(msg) {
    console.log('success');
    console.log(msg);
}

function failure (msg) {
    console.log('failure');
    console.log(msg);
}


// setTimeout
setTimeout(function(){
    console.log('set time out is called');
}, 5000);

console.log('log below the set time out call');
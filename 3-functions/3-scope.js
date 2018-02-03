// 1. there are two scopes
//     a. inside a function
//     b. outside a function
// 2. parent scope cannot access the child scope.
// 3. child scope can access the parent scope
var global = 'abc';

function test() {
    var local = 'def';
    console.log('global : global : ', global);
    console.log('test : local : ', local);

    function inner() {
        var inner = 'ghi';
        console.log('global : global : ', global);
        console.log('test : local : ', local);
        console.log('inner : inner : ', inner);
    }
    inner();
}

test();
console.log('global : global', global);
console.log('global : local', local);
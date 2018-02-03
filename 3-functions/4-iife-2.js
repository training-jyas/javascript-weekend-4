function main() {
    // down below is the application code
    var global = 'a global variable';
    var fn = function () {
        var test = "abc";
        var fn = function () {
            console.log('some function');
        };
        console.log(global);
        fn();
    };
    var clickHandler = function() {};
    window.global = global;
    window.clickHandler = clickHandler;
}
main();

// you can replicate the behaviour above in a shorthand way which is below using IIFE
(function () {
    // down below is the application code
    var global = 'a global variable';
    var fn = function () {
        var test = "abc";
        var fn = function () {
            console.log('some function');
        };
        console.log(global);
        fn();
    };
    window.global = global;
})();

// var global = 'a global variable';
// var fn = function () {
//     var test = "abc";
//     var fn = function () {
//         console.log('some function');
//     };
//     console.log(global);
//     fn();
// };
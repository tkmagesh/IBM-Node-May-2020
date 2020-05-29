function f1Sync(){
    console.log('f1Sync started');
    console.log('f1Sync finished');
}

function f2Sync() {
    console.log('f2Sync started');
    console.log('f2Sync finished');
}

function f3Sync() {
    console.log('f3Sync started');
    console.log('f3Sync finished');
}

function f4Sync() {
    console.log('f4Sync started');
    console.log('f4Sync finished');
}

/* function runSync(){
    f1Sync();
    f2Sync();
    f3Sync();
    f4Sync();
} */

var syncFns = [f1Sync, f2Sync, f3Sync, f4Sync];

function runSync(){
    for(var index=0; index<syncFns.length; index++){
        var syncFn = syncFns[index];
        syncFn();
    }
}

module.exports['runSync'] = runSync;

function f1Async(next) {
    console.log('f1Async started');
    setTimeout(function(){
        console.log('f1Async finished');
        if (typeof next === 'function')
            next();
    }, 5000)
}

function f2Async(next) {
    console.log('f2Async started');
    setTimeout(function(){
        console.log('f2Async finished');
        if (typeof next === 'function')
            next();
    }, 4000)
}

function f3Async(next) {
    console.log('f3Async started');
    setTimeout(function(){
        console.log('f3Async finished');
        if (typeof next === 'function')
            next();
    }, 2000)
}

function f4Async(next) {
    console.log('f4Async started');
    setTimeout(function(){
        console.log('f4Async finished');
        if (typeof next === 'function')
            next();
    }, 3000)
}

/* 
function runAsync() {
    f1Async(function(){
        f2Async(function(){
            f3Async(function(){
                f4Async();
            });
        });
    });
} 
*/

var asyncFns = [f1Async, f2Async, f3Async, f4Async];

/* 
sum(10,20,30,40)
    => 10 + sum(20,30,40)
            => 20 + sum(30, 40)
                    => 30 + sum(40)
                            => 40

*/
function exec(fns){
    var first = fns[0],
        remaining = fns.slice(1),
        next = function(){
            exec(remaining)
        };
    if (typeof first === "function")
        first(next);
}

function runAsync(){
    exec(asyncFns);
}

module.exports['runAsync'] = runAsync;
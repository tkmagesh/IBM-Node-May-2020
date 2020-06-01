function addAsync(x, y) {
    var p = new Promise(function (resolveFn, rejectFn) {
        setTimeout(function () {
            var result = x + y;
            console.log('job done');
            resolveFn(result);
        }, 4000);
    });
    return p;
}

//client
function addAsyncClient(){
    var p = addAsync(100, 200);
    p.then(function (result) {
        console.log('result = ', result);
    });
}


//using async await
async function addAsyncClient(x, y) {
    var result = await addAsync(x, y);
    console.log('result = ', result);
}

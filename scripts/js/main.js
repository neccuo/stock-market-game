// Placeholder

// IDEA: CORRELATED STOCKS
// SOME STOCKS MAY BE PARALLEL TO EACHOTHER.
// THEIR "RISK" VALUES CAN BE CLOSER TO DO THAT.


/***
 * "graph": chart.data.datasets[0] might  cause problems when STOCKS is going to be extracted from a JSON file
 * Ordering of the script tags should be JSON -> graph.js -> main.js
 * When a JSON file is implemented, "graph" key should be deleted (or find a better way)
 ***/

var STOCKS = [
    {"name": "stockA", "price": 100.0, "risk": 5.0, "inc": true, "graph": chart.data.datasets[0]}, 
    {"name": "stockB", "price": 50.0, "risk": 7.5, "inc": true, "graph": chart.data.datasets[1]}
];
// var databaseSize = Object.keys(stockDatabase).length;

// STOCK SIZE REMAINS THE SAME ALL THE TIME
// IF THERE IS A LOCKED STOCK,
// IT WILL CONTINUE TO UPDATE ITSELF ON THE BACKGROUND


var tickInterval = 3; // seconds
var millisecond = 1000;

var decPrec = 2; // Decimal precision
var minValue = Math.pow(10, -decPrec); // 0.01

var labelLimit = chart.data.labels.length; 

setInterval(mainLoop, tickInterval*millisecond);

function mainLoop(){
    stockChange();
    
    stockGraphUpdate();


}

// NO CHANGE FACTORS FOR NOW, PURE RANDOMNESS
function stockChange(){
    let changeNum;
    for(let i = 0; i < STOCKS.length; i++)
    {
        changeNum = Math.random() * STOCKS[i].risk;
        // changeNum = floatPrecision(changeNum, decPrec);

        symbol = upOrDown();
        STOCKS[i].price += changeNum * symbol;
        STOCKS[i].price = floatPrecision(STOCKS[i].price, decPrec);

        if(STOCKS[i].price < minValue){ STOCKS[i].price = minValue; }

        if(symbol == 1){ STOCKS[i].inc = true; }
        else if(symbol == -1){ STOCKS[i].inc = false; }

    }
}

// NEEDS SOME POLISHING
// CONSTANT UPDATES ON DATA SEGMENTS WHEN THEY ARE FULL
function stockGraphUpdate(){
    for(let i = 0; i < STOCKS.length; i++)
    {
        if(STOCKS[i].graph.data.length == labelLimit)
        {
            STOCKS[i].graph.data.shift();
        }
        STOCKS[i].graph.data.push(STOCKS[i].price);
        console.log(stockUpdateYeller(i));
    }
    chart.update("none"); // NONE TO DISABLE UGLY ANIMATIONS
}


function floatPrecision(val, power){ // power == decPrec
    let pwr = Math.pow(10, power);
    let num = val;

    num *= pwr;
    num = Math.floor(num);
    return num / pwr;
}

function upOrDown(){
    let num = Math.random();
    if(num > 0.5){ return 1; }
    else{ return -1; }
}

function stockUpdateYeller(index){ // TEMPORARY toString() method
    if(STOCKS.length <= index){return null;}
    let stock = STOCKS[index];

    return "" + stock.name + ": " + ((stock.inc) ? "increased ": "decreased ") +
    "to " + stock.price + " per unit.";
}
var tickInterval = 3; // seconds
var millisecond = 1000;

var decPrec = 2; // Decimal precision
var minValue = Math.pow(10, -decPrec); // 0.01

var STOCKS = [
    {"name": "stockA", "price": 100.0, "risk": 5.0, "inc": true}, 
    {"name": "stockB", "price": 50.0, "risk": 7.5, "inc": true}
];

function floatPrecision(val, power=decPrec){ // power == decPrec
    let pwr = Math.pow(10, power);
    let num = val;

    num *= pwr;
    num = Math.floor(num);
    return num / pwr;
}
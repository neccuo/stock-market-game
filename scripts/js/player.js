// PLAYER INIT

var PLAYER = {
    "savings": 1000.0,
    "stock_limit": 50
}

var STOCK_INVENTORY = {} // Gives the count of every stock of the player

init();

function init(){
    for(let i = 0; i < STOCKS.length; i++)
    {
        let stock_name = STOCKS[i].name;
        STOCK_INVENTORY[stock_name] = 0;
    }
}
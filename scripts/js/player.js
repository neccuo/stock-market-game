// PLAYER INIT

var PLAYER = { // By default
    "savings": 1000.0,
    "stock_limit": 50,
    "stock_owned": 0
};

/*if(localStorage.savings){
    PLAYER.savings = Number(localStorage.savings);
}
else{ 
    localStorage.savings = Number(1000);
}*/

// Keys are the stock names, values are the amount owned
var STOCK_INVENTORY = {}; // Gives the count of every stock of the player

// DICTIONARIES INSIDE AN ARRAY
var TRANSACTION_HISTORY = [] // {"process": "buy"/"sell", "stock": stock_name, "unit": 100, "price_ea": stock_price, "price_total": stock_price * unit}

init();

function init(){
    for(let i = 0; i < STOCKS.length; i++)
    {
        let stock_name = STOCKS[i].name;
        STOCK_INVENTORY[stock_name] = 0;
    }
}

function transactionHistoryFill(process, stock, unit, price_ea){
    let dic = {}
    dic["process"] = process;
    dic["stock"] = stock;
    dic["unit"] = unit;
    dic["price_ea"] = price_ea;
    dic["price_total"] = unit * price_ea;

    TRANSACTION_HISTORY.push(dic);
}

// BUY-SELL REALM

function buy(stock_index, amount){
    // test realm-0
    if(stock_index >= STOCKS.length || 0 > stock_index){ alert("Index input is unavailable."); return; }
    if(0 > amount){ alert("Bad input for amount."); return; }

    let stock = STOCKS[stock_index];
    let stock_name = stock.name;

    // test realm-1
    if(PLAYER.savings < stock.price * amount){ alert("Not enough funds."); return; }
    if(PLAYER.stock_limit < PLAYER.stock_owned + amount){ alert("Not enough stock."); return; }

    // process realm
    PLAYER.savings -= stock.price * amount;
    PLAYER.stock_owned += amount;
    STOCK_INVENTORY[stock_name] += amount;

    let message = "" + "Successfully bought [" + amount + "] units of [" + stock_name + "] for [" + stock.price + "] funds ea!";
    console.log(message); 

    transactionHistoryFill("buy", stock_name, amount, stock.price);
}

function sell(stock_index, amount){
    // test realm-0
    if(stock_index >= STOCKS.length || 0 > stock_index){ alert("Index input is unavailable."); return; }
    if(0 > amount){ alert("Bad input for amount."); return; }

    let stock = STOCKS[stock_index];
    let stock_name = stock.name;

    // test realm-1
    if(amount > STOCK_INVENTORY[stock_name]){ alert("Not enough inventory to sell " + amount + " units of stocks.")}

    //process realm
    PLAYER.savings += stock.price * amount;
    PLAYER.stock_owned -= amount;
    STOCK_INVENTORY[stock_name] -= amount;

    let message = "" + "Successfully sold [" + amount + "] units of [" + stock_name + "] for [" + stock.price + "] funds ea!";
    console.log(message); 

    transactionHistoryFill("sell", stock_name, amount, stock.price);

}
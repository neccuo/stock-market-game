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

var selectedStockIndex = Number(document.getElementById("stock-select").value); // by default, selectedStock = -1
var buyOrSellAmount = Number(document.getElementById("buy-amount-input").value); // Basically var buyAmount = 1;


function setSelectedStockIndex(val){
    selectedStockIndex = Number(val);
}

function setBuyOrSellAmount(val){
    let num = Number(val);
    buyOrSellAmount = floatPrecision(num);

    // MAKE IT BETTER labelUpdate();
    /*let label = document.getElementById("buy-amount-input-price-calculation");
    label.innerText = String(num*STOCKS[selectedStockIndex].price)*/
}

function showPlayerStats(){}

function buyOrSell(process){
    // test realm-0
    if(process != "buy" && process != "sell"){return;} // something bad happened
    if(selectedStockIndex >= STOCKS.length || 0 > selectedStockIndex){ alert("Index input " + selectedStockIndex + " is unavailable.\nSelect a valid stock first"); return; }
    if(0 > buyOrSellAmount){ alert("Bad input for amount."); return; }

    let stock = STOCKS[selectedStockIndex];

    // test realm-1
    if(process == "buy"){
        if(PLAYER.savings < stock.price * buyOrSellAmount){ alert("Not enough funds."); return; }
        if(PLAYER.stock_limit < PLAYER.stock_owned + buyOrSellAmount){ alert("Not enough stock."); return; }
        buyProcess(stock, buyOrSellAmount);
    }else if(process == "sell"){
        if(buyOrSellAmount > STOCK_INVENTORY[stock.name]){ alert("Not enough inventory to sell " + buyOrSellAmount + " units of stocks."); return;}
        sellProcess(stock, buyOrSellAmount);
    }
    // floatPrecision(PLAYER.savings);
    // floatPrecision(PLAYER.stock_owned);
    transactionHistoryFill(process, stock.name, buyOrSellAmount, stock.price);
}

function buyProcess(stock, amount){
    PLAYER.savings -= stock.price * amount;
    PLAYER.stock_owned += amount;
    STOCK_INVENTORY[stock.name] += amount;

    let message = "" + "Successfully bought [" + amount + "] units of [" + stock.name + "] for [" + stock.price + "] funds ea!";
    console.log(message); 
}

function sellProcess(stock, amount){
    PLAYER.savings += stock.price * amount;
    PLAYER.stock_owned -= amount;
    STOCK_INVENTORY[stock.name] -= amount;

    let message = "" + "Successfully sold [" + amount + "] units of [" + stock.name + "] for [" + stock.price + "] funds ea!";
    console.log(message); 
}
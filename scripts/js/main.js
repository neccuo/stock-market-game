// Placeholder

// IDEA: CORRELATED STOCKS
// SOME STOCKS MAY BE PARALLEL TO EACHOTHER.
// THEIR "RISK" VALUES CAN BE CLOSER TO DO THAT.


/***
 * "graph": chart.data.datasets[0] might  cause problems when STOCKS is going to be extracted from a JSON file
 * Ordering of the script tags should be JSON -> graph.js -> main.js
 * When a JSON file is implemented, "graph" key should be deleted (or find a better way)
 ***/


// var databaseSize = Object.keys(stockDatabase).length;

// STOCK SIZE REMAINS THE SAME ALL THE TIME
// IF THERE IS A LOCKED STOCK,
// IT WILL CONTINUE TO UPDATE ITSELF ON THE BACKGROUND

if (localStorage.data){ localStorage.data = Number(localStorage.data) + 1; }
else { localStorage.data = 1; }

document.getElementById("storage-test").innerText =  localStorage.data;


ready();
setInterval(mainLoop, tickInterval*millisecond);


function localStorageReset(){
    let arr = Object.keys(localStorage);
    for(let i = 0; i < arr.length; i++)
    {
        localStorage.removeItem(arr[i]);
    }
}

function ready(){ // init of hud
    buySellHUD();
    setStatsHUD();
}


function mainLoop(){
    stockChange();
    
    stockGraphUpdate();

    amountLabelUpdate()
}

function userAction(val){
    buyOrSell(val);
    playerValuesPrecision();
    setStatsHUD();
}

// STOCK UPDATE REALM

// NO CHANGE FACTORS FOR NOW, PURE RANDOMNESS
function stockChange(){
    let changeNum;
    let init_price;
    let final_price;
    for(let i = 0; i < STOCKS.length; i++)
    {
        symbol = upOrDown();
        changeNum = Math.random() * STOCKS[i].risk * symbol;
        STOCKS[i].percent = devaluationPercentage(STOCKS[i].price, changeNum)

        STOCKS[i].price += changeNum;
        STOCKS[i].price = floatPrecision(STOCKS[i].price);

        if(STOCKS[i].price < minValue){ STOCKS[i].price = minValue; }

        if(symbol == 1){ STOCKS[i].inc = true; }
        else if(symbol == -1){ STOCKS[i].inc = false; }

    }
}

function upOrDown(){
    let num = Math.random();
    if(num > 0.5){ return 1; }
    else{ return -1; }
}

function devaluationPercentage(initVal, diffVal){
    if(diffVal == 0){return 0;}
    return floatPrecision(diffVal/initVal, 3);
}


// HUD DESING REALM
function buySellHUD()
{
    alignStockSelect();
}

function alignStockSelect(){ // for init
    let select = document.getElementById("stock-select");
    
    for(let inp, i = 0; i < STOCKS.length; i++)
    {
        inp = document.createElement("option");
        
        inp.label = STOCKS[i].name; // for accessability
        // STOCK INDEX NUMBER IS THE VALUE TO BE TAKEN
        inp.value = i; // index -1 is reserved for default value
        inp.innerText = STOCKS[i].name; // for display
        select.appendChild(inp);
    }
    if(STOCKS.length == 0){setDefaultOption(select);}
}

function setDefaultOption(elem){
    let opt = document.createElement("option");
    opt.selected = true;
    opt.value = -1;
    opt.label = "default";
    opt.innerText = "--";
    elem.appendChild(opt);
}

function setStatsHUD(){
    let lbl;

    lbl = document.getElementById("stat-currency");
    lbl.innerText = PLAYER.savings;

    lbl = document.getElementById("stat-inventory");
    lbl.innerText = showInventory();
}

function showInventory(){
    let msg = ""
    for(const [key, value] of Object.entries(STOCK_INVENTORY)){
        msg += key + ": " + value + "\n";
    }
    console.log(msg); 
    return msg;
}
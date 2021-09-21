// ADD A SYSTEM TO READ DATA FROM A JSON FILE

let foo = [];

for (let i = 0; i < 25; i++) {
   foo.push(i);
}

let myChart = document.getElementById("myChart").getContext("2d");
var chart = new Chart(myChart, 
{
    type: "line",
    borderWidth: 100,
    data:
    {
        labels: foo, // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        datasets:
        [
            {
                label:"StockA",
                data:[],
                borderColor: 'rgb(75, 192, 192)',
                fill: false,
                tension: 0.1
            },
            {
                label:"StockB",
                data:[],
                borderColor: 'rgb(100, 100, 100)',
                fill: false,
                tension: 0.1
            }
        ]
    },
})



var labelLimit = chart.data.labels.length; 

stockShortCut(); // used for adding a new key to STOCKS to increase readibility...
// STOCKS[i].graph == chart.data.datasets[i]


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


function stockShortCut() // use at init process
{
    for(let i = 0; i < STOCKS.length; i++)
    {
        STOCKS[i].graph = chart.data.datasets[i];
    }
}

// ADD A SYSTEM TO READ DATA FROM A JSON FILE

let foo = [];

for (let i = 0; i < 21; i++) {
   foo.push(i);
}

let myChart = document.getElementById("myChart").getContext("2d");
var chart = new Chart(myChart, 
{
    type: "line",
    borderWidth: 100,
    options: {
        responsive: true,
        maintainAspectRatio: false
    },
    data:
    {
        labels: foo, // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        datasets: // Do something if there is no stock,
        [ // BAD PRACTICE
            {
                label: STOCKS[0].name,
                data:[ STOCKS[0].price ], // only as the first element
                borderColor: 'rgb(75, 192, 192)',
                fill: false,
                tension: 0.1
            },
            {
                label: STOCKS[1].name,
                data:[ STOCKS[1].price ],
                borderColor: 'rgb(100, 100, 100)',
                fill: false,
                tension: 0.1
            }
        ]
    },
})



var labelLimit = chart.data.labels.length; 

var openYeller = false; // Do you want to get constant console update messages about the stock price changes?


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

        if(openYeller){console.log(stockUpdateYeller(i));} // constant updates
    }
    chart.update("none"); // "none" TO DISABLE UGLY ANIMATIONS
}


function stockUpdateYeller(index){ // TEMPORARY toString() method
    if(STOCKS.length <= index){return null;}
    let stock = STOCKS[index];

    return "" + stock.name + ": " + ((stock.inc) ? "increased ": "decreased ") +
    "to " + stock.price + " per unit.";
}

function toggleYeller(){
    openYeller = !openYeller;
}


function stockShortCut() // use at init process
{
    for(let i = 0; i < STOCKS.length; i++)
    {
        STOCKS[i].graph = chart.data.datasets[i];
    }
}

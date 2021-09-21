// ADD A SYSTEM TO READ DATA FROM A JSON FILE

let myChart = document.getElementById("myChart").getContext("2d");
        var num = 1;
        var chart = new Chart(myChart, {
            type:"line",
            data:{
                labels:[0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
                datasets:[{
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
                }]
            },
        })


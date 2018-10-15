axios.get('http://api.coindesk.com/v1/bpi/historical/close.json')
    .then(res => {
    console.log(res.data.bpi);
    printTheChart(res.data);
});

let printTheChart = ((stockData) => {
    let stockLabels = Object.keys(stockData.bpi);
    let stockPrice = Object.values(stockData.bpi);
    let ctx = document.getElementById('myChart').getContext('2d');
    let chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: stockLabels,
            datasets: [{
                label: "Stock Chart",
                backgroundColor: 'rgb(95, 99, 132)',
                borderColor: 'rgb(75, 99, 132)',
                data: stockPrice,
            }]
        }
    });
});
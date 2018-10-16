// ***** //
// CHART //
// ***** //
axios .get(`http://api.coindesk.com/v1/bpi/historical/close.json`)
      .then(info => {
        console.log(info.data.bpi);
        printTheChart(info.data.bpi);
      });

let printTheChart = (stockData => {
  let stockLabels = Object.keys(stockData),
      stockPrice = Object.values(stockData),
      minValue = Math.min.apply(Math,stockPrice),
      maxValue = Math.max.apply(Math,stockPrice),
      ctx = document.getElementById('chart').getContext('2d'),
      chart = new Chart(ctx, {
        type: 'line',
        lineTension: 0,
        data: {
          labels: stockLabels,
          datasets: [{
            label: "Stock Chart",
            backgroundColor: 'rgba(255, 99, 132, 0.4)',
            borderColor: 'rgb(255, 99, 132)',
            data: stockPrice,
          }]
        }
      });
  printValues(minValue,maxValue);
  console.log(minValue);
  console.log(maxValue);
});


// *********** //
// DATE UPDATE //
// *********** //

const today     = new Date,
      formDates = document.getElementById(`formDates`),
      inputs    = document.getElementsByTagName(`input`),
      from      = document.getElementById(`from`),
      to        = document.getElementById(`to`),
      curr      = document.getElementById(`curr`);
var   obj       = {};

from.valueAsDate = today;
to.valueAsDate = today; // Today's date in 'to'


function valueToObjt() { // To place the keys and values in obj
  for (let i = 0; i < inputs.length; i++) { obj[inputs[i].name] = inputs[i].value; }
  return obj;
}

function getNewDates() { // Axios Get request
  axios .get(`https://api.coindesk.com/v1/bpi/historical/close.json?start=${obj.from}&end=${obj.to}`, obj)
        .then(info => {
          printTheChart(info.data.bpi);
        });
}

function getNewCurrency(value) {
  axios .get(`https://api.coindesk.com/v1/bpi/historical/close.json?currency=${value}`)
        .then(info => {
          printTheChart(info.data.bpi);
        });
}

from.onchange = () => {
  valueToObjt();
  getNewDates();
}

to.onchange = () => {
  valueToObjt();
  getNewDates();
}

formDates.onsubmit = (e) => {
  e.preventDefault();
  valueToObjt();
  getNewDates();
}

curr.onchange = (e) => {
  e.preventDefault();
  getNewCurrency(e.target.value);
}

function printValues(min, max){
  let minLabel = document.getElementById('minValue'),
      maxLabel = document.getElementById('maxValue');
  minLabel.innerHTML = "Min Value: <b>" + min + "</b>";
  maxLabel.innerHTML = "Max Value: <b>" + max + "</b>";
}
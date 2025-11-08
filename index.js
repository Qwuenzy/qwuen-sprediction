import { dates } from "./utils/dates.js";

const inputText = document.querySelector(".input-el");
const inputP = document.querySelector(".input-para");
const cont = document.querySelector(".cont");
const genrep = document.querySelector(".genrep");
const report = document.querySelector(".report");
const maincont = document.querySelector(".main-cont");
const crtrep = document.querySelector(".crtrep");
const pCont = document.querySelector(".p-cont")
const tickerArr = [];
const label = document.getElementsByTagName('Label')[0]

window.addEventListener("load", () => {
  inputP.textContent = "Your tickers will appear here...";
  genrep.disabled = true;
});

const btnAdd = document.querySelector(".add");
function addBtn() {
  if (inputText.value.trim() !== "" && inputText.value.length > 2) {
    label.style.display = "none"
    genrep.disabled = false;
    if (inputP.textContent === "Your tickers will appear here...") {
      inputP.textContent = "";
    }
    inputP.textContent += inputText.value.toUpperCase() + ",";
    tickerArr.push(inputP.textContent);
    inputText.value = "";
  } else {
    label.style.display = "block"
    label.style.color = 'red'
    label.textContent = 'You must add atleast one ticker. A ticker is a 3 letter or more code for a stock.Eg TSLA for tesla'
  }
}
btnAdd.addEventListener("click", addBtn);
inputText.addEventListener(
  "keydown",
  (event) => event.key === "Enter" && addBtn()
);

inputText.value.trim() !== ""
  ? (btnAdd.disabled = true)
  : (btnAdd.disabled = false);

const spin = document.createElement("img");
spin.src = "images/Iphone-spinner-2.gif";
spin.alt = "loading image";
spin.classList.add("spinn");
cont.appendChild(spin);
spin.style.display = "none";
report.style.display = "none";

genrep.addEventListener("click", fetchStockData);

async function fetchStockData() {
  spin.style.display = "block";
  maincont.style.display = "none";
  const pReport = document.querySelector(".p-report")

  try{
    const stockData = await Promise.all(tickerArr.map(async (ticker) => {
      const url = `https://api.polygon.io/v2/aggs/ticker/${ticker}/range/1/day/
      ${dates.startDate}/${dates.endDate}?apiKey=${process.env.API_KEY}`
      const response = await fetch(url)
      const data = await response.text()
      pReport.textContent = data
      const status = await response.status
      if (status === 200){
        crtrep.textContent = "Creating report...";
        report.style.display = "block";
        return data
      }else {
        crtrep.textContent = "There was an error fetching stock data";
      }
    }))
    fetchReport(stockData.join('')) 
  }catch(err){
    crtrep.textContent = "There was an error fetching stock data";
    console.log("the error is :" + err);
  }
}






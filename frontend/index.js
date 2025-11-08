
import { dates } from "./utils/dates.js";

const inputText = document.querySelector(".input-el");
const inputP = document.querySelector(".input-para");
const cont = document.querySelector(".cont");
const genrep = document.querySelector(".genrep");
const report = document.querySelector(".report");
const maincont = document.querySelector(".main-cont");
const crtrep = document.querySelector(".crtrep");

const tickerArr = [];
const label = document.getElementsByTagName("Label")[0];

window.addEventListener("load", () => {
  inputP.textContent = "Your tickers will appear here...";
  genrep.disabled = true;
});

const btnAdd = document.querySelector(".img-add");
function addBtn() {
  if (inputText.value.trim() !== "" && inputText.value.length > 2) {
    label.style.display = "none";
    genrep.disabled = false;
    if (inputP.textContent === "Your tickers will appear here...") {
      inputP.textContent = "";
    }
    inputP.textContent += inputText.value.toUpperCase() + ",";
    tickerArr.push(inputText.value.toUpperCase());
    inputText.value = "";
  } else {
    label.style.display = "block";
    label.style.color = "red";
    label.textContent =
      "You must add atleast one ticker. A ticker is a 3 letter or more code for a stock.Eg TSLA for tesla";
  }
}
btnAdd.addEventListener("click", addBtn);
inputText.addEventListener(
  "keydown",
  (event) => event.key === "Enter" && addBtn()
);

inputText.addEventListener("input", () => {
  inputText.value.trim() !== ""
    ? (btnAdd.disabled = true)
    : (btnAdd.disabled = false);
});
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
  crtrep.textContent = "Creating report..."
  const pReport = document.querySelector(".p-report");
  const apiKey = import.meta.env.VITE_API_KEY;

  try {
    const stockData = await Promise.all(
      tickerArr.map(async (ticker) => {
        const url = `https://api.polygon.io/v2/aggs/ticker/${ticker}/range/1/day/${dates.startDate}/${dates.endDate}?apiKey=${apiKey}`;

        const response = await fetch(url);
        const data = await response.text();
        const status = response.status;

        if (status === 200) {
          return data;
        } else {
          console.log("Error fetching stock data");
        }
      })
    );
    const responseReport = await fetch("http://localhost:3000/fetchReport", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ stockData: stockData.join("") }),
    });
    const reportData = await responseReport.json();
    setTimeout(() => {
      spin.style.display = "none";
      crtrep.textContent = "Report created!";
      report.style.display = "block";
      pReport.textContent = reportData.report;
    }, 4000);
  } catch (err) {
    crtrep.textContent = err;
    console.log("the error is :" + err);
  }
}

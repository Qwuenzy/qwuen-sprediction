const inputText = document.querySelector(".input-el");
const inputP = document.querySelector(".input-para");
const cont = document.querySelector(".cont");
const foot = document.querySelector(".foot");
const genrep = document.querySelector(".genrep");
const report = document.querySelector(".report")
const maincont = document.querySelector(".main-cont")


window.addEventListener("load",() => {
  inputP.textContent = "Your tickers will appear here..."
  genrep.disabled = true
})

const btnAdd = document.querySelector(".add")
function addBtn(){
  if ( inputText.value.trim() !== "") {
    if (inputP.textContent === "Your tickers will appear here...") {
      inputP.textContent = "";
    }
        inputP.textContent += inputText.value.toUpperCase() + ",";
        inputText.value = "";
        genrep.disabled = false
    }
}
btnAdd.addEventListener("click", addBtn);
inputText.addEventListener("keydown", (event) => event.key === "Enter" && addBtn());

inputText.value.trim() !== "" ? btnAdd.disabled = true : btnAdd.disabled = false

const spin = document.createElement("img");
spin.src = "images/Iphone-spinner-2.gif";
spin.alt = "loading image";
spin.classList.add("spinn")
cont.appendChild(spin);
spin.style.display = "none";
report.style.display="none"

genrep.addEventListener("click", () => {
  spin.style.display = "block";
  maincont.style.display= "none"
  foot.textContent = "Loading..."

  setTimeout(() => {
    spin.style.display = "none";
    maincont.style.display= "none"
    report.style.display = "block"
    foot.textContent = "Warning: This is not real financial advice!!!"
  }, 4000);
});

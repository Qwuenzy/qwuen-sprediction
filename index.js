const inputText = document.querySelector(".input-el");
const inputP = document.querySelector(".input-para");
const cont = document.querySelector(".cont");
const foot = document.querySelector(".foot");
const genrep = document.querySelector(".genrep");
const report = document.querySelector(".report")
const maincont = document.querySelector(".main-cont")

const btnAdd = document.querySelector(".add");

btnAdd.addEventListener("click", function add() {
  inputP.textContent += inputText.value + ",";
  inputText.value = "";
});
inputText.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && inputText.value.trim() !== "") {
        inputP.textContent += inputText.value + ",";
        inputText.value = "";
    }
  });

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

  setTimeout(() => {
    spin.style.display = "none";
    maincont.style.display= "none"
    report.style.display = "block"
  }, 4000);
});

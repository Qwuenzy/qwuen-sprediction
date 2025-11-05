const inputText = document.querySelector(".input-el");
const inputP = document.querySelector(".input-para");
const cont = document.querySelector(".cont");
const foot = document.querySelector(".foot");
const genrep = document.querySelector(".genrep");

const btnAdd = document.querySelector(".add");

btnAdd.addEventListener("click", () => {
  inputP.textContent += inputText.value + ",";
  inputText.value = "";
});

const spin = document.createElement("img");
  spin.src = "images/Iphone-spinner-2.gif";
  spin.alt = "loading image";
  cont.appendChild(spin)
  spin.style.display = "none"

genrep.addEventListener("click", () => {
    
    setTimeout(() => {
    spin.style.display = "block"
    cont.innerHTML = spin
    foot.style.display = "none"
  }, 1000)
  cont.style.display = "block"
    
  
});

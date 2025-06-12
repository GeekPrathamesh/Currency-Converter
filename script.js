let selects = document.querySelectorAll("select");

const btn = document.querySelector("form button");
let fromcurr = document.querySelector(".from select");
let tocurr = document.querySelector(".to select");
const BASE_URL = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/`;
let msg = document.querySelector(".msg");
for (let select of selects) {
  for (let code in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = code;
    newOption.value = code;
    select.append(newOption);
    if (select.name === "from" && code === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && code === "INR") {
      newOption.selected = "selected";
    }
  }
  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
      msg.classList.add("msgvsb");


  });
}

const updateFlag = (element) => {
  let currentcode = element.value;
  let currentCcode = countryList[currentcode];
  let srclink = `https://flagsapi.com/${currentCcode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = srclink;
};

btn.addEventListener("click", async (evt) => {
  evt.preventDefault();
  let amount = document.querySelector(".amount input ");
  let val = amount.value;
  // console.log(val);
  if (val === "" || val <= 0) {
    val = "1";
  }

  console.log(BASE_URL);
  const URL = BASE_URL + fromcurr.value.toLowerCase() + ".json";
  console.log(URL);
  let response = await fetch(URL);
  //  console.log(response);
  //  console.log(response.status);
  let data = await response.json();

  let rate = data[fromcurr.value.toLowerCase()][tocurr.value.toLowerCase()];
  console.log(msg.innerText);
  msg.innerText = `${val} ${fromcurr.value} = ${val * rate} ${tocurr.value} `;
  msg.classList.remove("msgvsb");
  msg.classList.remove("animate"); // Reset if previously added
  void msg.offsetWidth; // Trigger reflow
  msg.classList.add("animate");

  console.log(rate);
});

// usd.json"
//  window.addEventListener("load", ()=>{update exchange rate})
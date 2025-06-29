const BASE_URL = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json`;
let selects = Array.from(document.querySelectorAll("select"));
let inputVal = document.querySelector(".amount input");
let msg = document.querySelector(".msg");
// not allowed name returns array
// let select1 = document.getElementsByName("from");
// let select2 = document.getElementsByName("to");

let select1 = document.querySelector(".from select");
let select2 = document.querySelector(".to select");
let button = document.querySelector("button");

////////////////updating all options
for (let select of selects) {
  for (let CountryName in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = CountryName;
    newOption.value = CountryName;

    select.append(newOption);
  }
  if (select.getAttribute("name") === "from") {
    select.value = "USD";
  } else if (select.getAttribute("name") === "to") {
    select.value = "INR";
  }
}

///////////////flag change acc to option can put this inside updateoption also

for (let select of selects) {
  select.addEventListener("change", (e) => {
    console.log(e.target.value);
    msg.classList.add("msgvsb");

    if (select.getAttribute("name") === "from") {
      let container = select.closest(".select-Container");
      let img = container.querySelector("img");
      img.src = `https://flagsapi.com/${countryList[select.value]}/flat/64.png`;
      // let apiCountry = e.target.value.toLowerCase();
      // console.log(apiCountry)
      // BASE_URL = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${e.target.value}.json`
    } else if (select.getAttribute("name") === "to") {
      let container = select.closest(".select-Container");
      let img = container.querySelector("img");
      img.src = `https://flagsapi.com/${countryList[select.value]}/flat/64.png`;
    }
  });
}

/////////////////calc

button.addEventListener("click", (e) => {
  e.preventDefault();
  (async function getData(BASE_URL) {
    let fromCountry = select1.value.toLowerCase();
    let toCountry = select2.value.toLowerCase();
    try {
      let response = await fetch(
        `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${fromCountry}.json`
      );
      let data = await response.json();
      let convertedCurr = data[fromCountry][toCountry];
      convertedCurr *= inputVal.value;
      console.log(convertedCurr);
      if (inputVal.value >= 1) {
        msg.innerText = `${inputVal.value} ${select1.value} = ${convertedCurr} ${select2.value}`;
      } else {
        msg.innerText = `Enter The valid Amount`;
      }

      msg.classList.remove("msgvsb");
      msg.classList.remove("animate");
      void msg.offsetWidth; // Trigger reflow
      msg.classList.add("animate");
    } catch (err) {
      console.log(err + "here");
    }
  })();
});

////////set value only after full list loaded
//////////////////.closest search only for the parent not relative siblings
////////////////////  e.preventDefault(); makes reload avoid

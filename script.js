const body = document.querySelector("body");
const section1 = document.querySelector(".section-1");
const section2 = document.querySelector(".section-2");
const mainContainer = document.querySelector(".countries");
const options = document.querySelectorAll(".options");
const option = document.querySelectorAll(".options .option");
const detailSection = document.querySelector(".detail-section");
const darkModeBtn = document.querySelector(".dark-mode-btn");
const dropdown = document.querySelector(".dropdown");
const selectedInput = document.querySelector(".selected-dropdown");
const searchBoxInput = document.querySelector(".search-box input");

let url;
let region;

// toggle dark mode
darkModeBtn?.addEventListener("click", () => {
  if (!body.classList.contains("dark-mode")) {
    section1?.classList.add("dark-mode");
    section2?.classList.add("dark-mode");
    detailSection?.classList.add("dark-mode");
    body.classList.add("dark-mode");
    darkModeBtn.innerHTML = `<i class="fas fa-lightbulb"></i>
    <p>Light Mode</p>`;
  } else {
    section1?.classList.remove("dark-mode");
    section2?.classList.remove("dark-mode");
    detailSection?.classList.remove("dark-mode");
    body.classList.remove("dark-mode");
    darkModeBtn.innerHTML = `<i class="fas fa-moon"></i>
    <p>Dark Mode</p>`;
  }
});

// initiate dropdown menu
dropdown?.addEventListener("click", () => {
  dropdown.classList.toggle("active");
});

// functionality for filtering countries container by region

option.forEach((item) => {
  item.addEventListener("click", (e) => {
    if (e.target.textContent == "All") {
      selectedInput.value = "Filter by Region";
      url = "https://restcountries.com/v2/all";
      generateCountries(url);
    } else {
      selectedInput.value = e.target.textContent;
      region = e.target.textContent;
      url = `https://restcountries.com/v2/region/${region}`;
      byRegion(url, region);
    }
  });
});

// populate countries for home page
window.addEventListener("DOMContentLoaded", () => {
  url = "https://restcountries.com/v2/all";
  generateCountries(url);
});

// function to populate all countries
function generateCountries(url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      const countryNameArray = data.map((item) => {
        return ` <div class="country">
      <img src="${item.flags.png}" alt="${item.name}" />
      <div class="country-details">
        <h3>${item.name}</h3>

        <p><b>population:</b> ${item.population}</p>
        <p><b>region:</b> ${item.region}</p>
        <p><b>capital:</b> ${item.capital}</p>
      </div>
    </div>`;
      });
      mainContainer.innerHTML = countryNameArray.join("");
    })
    .catch((err) => {
      console.log(err);
    });
}

// function to populate countries by region
function byRegion(url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      const countryNameArray = data.map((item) => {
        return ` <div class="country">
      <img src="${item.flags.png}" alt="${item.name}" />
      <div class="country-details">
        <h3>${item.name}</h3>

        <p><b>population:</b> ${item.population}</p>
        <p><b>region:</b> ${item.region}</p>
        <p><b>capital:</b> ${item.capital}</p>
      </div>
    </div>`;
      });
      mainContainer.innerHTML = countryNameArray.join("");
    })
    .catch((err) => {
      console.log(err);
    });
}

// functionality for searching countries

searchBoxInput.addEventListener("keyup", () => {
  const value = searchBoxInput.value;

  // if search input is empty
  if (value.length == 0) {
    console.log(`is empty`);
    url = "https://restcountries.com/v2/all";
    generateCountries(url);
  }

  url = `https://restcountries.com/v2/name/${value}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      const countryNameArray = data.map((item) => {
        return ` <div class="country">
        <img src="${item.flags.png}" alt="${item.name}" />
        <div class="country-details">
          <h3>${item.name}</h3>
  
          <p><b>population:</b> ${item.population}</p>
          <p><b>region:</b> ${item.region}</p>
          <p><b>capital:</b> ${item.capital}</p>
        </div>
      </div>`;
      });
      if (data.status == "404") {
        mainContainer.innerHTML = `<div class="error">...no results found</div>`;
      } else {
        mainContainer.innerHTML = countryNameArray.join("");
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

console.log(country);
const 
console.log(country);
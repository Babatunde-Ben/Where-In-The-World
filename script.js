const body = document.querySelector("body");
const section1 = document.querySelector(".section-1");
const section2 = document.querySelector(".section-2");
const mainContainer = document.querySelector(".countries");
const detailSection = document.querySelector(".detail-section");
const darkModeBtn = document.querySelector(".dark-mode-btn");
const dropdown = document.querySelector(".dropdown");
const selectedInput = document.querySelector(".selected-dropdown");
const searchBoxInput = document.querySelector(".search-box input");

let url;

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

// populate countries for home page
window.addEventListener("DOMContentLoaded", () => {
  url = "https://restcountries.com/v2/all";
  generateCountries(url);
});

// function to populate countries
function generateCountries(url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      const countryNameArray = data.map((item) => {
        console.log(item);
        //   return `<div class="country">
        //   <p>${item.name}, </p>
        //   <a href="/more_info.html?country=${item.name}">see more details</a>
        // </div>`;
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

(function () {
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

  toggleDarkMode();

  // save dark mode memory to local storage
  darkModeBtn?.addEventListener("click", () => {
    if (!body.classList.contains("dark-mode")) {
      localStorage.setItem("darkMode", "true");
      toggleDarkMode();
    } else {
      localStorage.setItem("darkMode", "false");
      toggleDarkMode();
    }
  });

  // toggle dark mode
  function toggleDarkMode() {
    if (localStorage.getItem("darkMode") == "true") {
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
  }
  // initiate dropdown menu
  dropdown?.addEventListener("click", () => {
    dropdown.classList.toggle("active");
  });

  // functionality for filtering countries container by region

  option.forEach((item) => {
    item.addEventListener("click", async (e) => {
      if (e.target.textContent == "All") {
        selectedInput.value = "Filter by Region";
        url = "https://restcountries.com/v2/all";
        generateCountries(url);
      } else {
        selectedInput.value = e.target.textContent;
        region = e.target.textContent;
        url = `https://restcountries.com/v2/region/${region}`;
        await byRegion(url, region);
        redirect();
      }
    });
  });

  // populate countries for home page
  window.addEventListener("DOMContentLoaded", async () => {
    url = "https://restcountries.com/v2/all";
    await generateCountries(url);
    redirect();
  });

  // function to populate all countries
  function generateCountries(url) {
    return new Promise((resolve, reject) => {
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          const countryNameArray = data.map((item) => {
            return ` <div class="country" data-country="${item.name}">
    <img src="${item.flags.png}" alt="${item.name}" />
    <div class="country-details">
      <h3>${item.name}</h3>

      <p><b>population:</b> ${item.population}</p>
      <p><b>region:</b> ${item.region}</p>
      <p><b>capital:</b> ${item.capital}</p>
      <p id="see-more"> see more...</p>
    </div>
  </div>`;
          });
          if (mainContainer) {
            mainContainer.innerHTML = countryNameArray.join("");
          }

          return resolve(countryNameArray);
        })
        .catch((err) => {
          return reject(err);
        });
    });
  }

  // function to populate countries by region
  function byRegion(url) {
    return new Promise((resolve, reject) => {
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          const countryNameArray = data.map((item) => {
            return ` <div class="country" data-country="${item.name}">
        <img src="${item.flags.png}" alt="${item.name}" />
        <div class="country-details">
          <h3>${item.name}</h3>
  
          <p><b>population:</b> ${item.population}</p>
          <p><b>region:</b> ${item.region}</p>
          <p><b>capital:</b> ${item.capital}</p>
      <p id="see-more"> see more...</p>

        </div>
      </div>`;
          });
          mainContainer.innerHTML = countryNameArray.join("");
          return resolve(countryNameArray);
        })
        .catch((err) => {
          return reject(err);
        });
    });
  }

  // function to populate countries by search
  function searchCountries(url) {
    return new Promise((resolve, reject) => {
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          const countryNameArray = data.map((item) => {
            return ` <div class="country" data-country="${item.name}">
    <img src="${item.flags.png}" alt="${item.name}" />
    <div class="country-details">
      <h3>${item.name}</h3>

      <p><b>population:</b> ${item.population}</p>
      <p><b>region:</b> ${item.region}</p>
      <p><b>capital:</b> ${item.capital}</p>
      <p id="see-more"> see more...</p>

    </div>
  </div>`;
          });
          if (data.status == "404") {
            mainContainer.innerHTML = `<div class="error">...no results found</div>`;
          } else {
            mainContainer.innerHTML = countryNameArray.join("");
          }
          return resolve(countryNameArray);
        })
        .catch((err) => {
          return reject(err);
        });
    });
  }

  // functionality for searching countries

  searchBoxInput?.addEventListener("keyup", async () => {
    const value = searchBoxInput.value;

    // if search input is empty
    if (value.length == 0) {
      url = "https://restcountries.com/v2/all";
      await generateCountries(url);
      redirect();
    }

    url = `https://restcountries.com/v2/name/${value}`;
    await searchCountries(url);
    redirect();
  });

  function redirect() {
    const country = document.querySelectorAll(".country");
    country.forEach((item) => {
      item.addEventListener("click", () => {
        const value = item.dataset.country;
        window.location.href = `/detail-page.html?country=${value}`;
      });
    });
  }
})();

// scroll back to top
const backToTop = document.getElementById("top");
window.addEventListener("scroll", () => {
  if (window.pageYOffset > 1200) {
    backToTop?.classList.add("active");
  } else {
    backToTop?.classList.remove("active");
  }
});

backToTop?.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    left: 0,
  });
});

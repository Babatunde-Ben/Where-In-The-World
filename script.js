const body = document.querySelector("body");
const section1 = document.querySelector(".section-1");
const section2 = document.querySelector(".section-2");
const darkModeBtn = document.querySelector(".dark-mode-btn");
const dropdown = document.querySelector(".dropdown");

// toggle dark mode
darkModeBtn.addEventListener("click", () => {
  if (!body.classList.contains("dark-mode")) {
    section1.classList.add("dark-mode");
    section2.classList.add("dark-mode");
    body.classList.add("dark-mode");
    darkModeBtn.innerHTML = `<i class="fas fa-lightbulb"></i>
    <p>Light Mode</p>`;
  } else {
    section1.classList.remove("dark-mode");
    section2.classList.remove("dark-mode");
    body.classList.remove("dark-mode");
    darkModeBtn.innerHTML = `<i class="fas fa-moon"></i>
    <p>Dark Mode</p>`;
  }
});

// initiate dropdown menu
dropdown.addEventListener("click", () => {
  dropdown.classList.toggle("active");
});

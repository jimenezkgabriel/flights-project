// ===============================
// LIGHT / DARK THEME TOGGLE
// ===============================
//
// This code:
// 1. Finds the toggle button in the nav.
// 2. Checks the current theme on <body> (data-theme="light" or "dark").
// 3. Switches between them when the button is clicked.
// 4. Updates the button text so users know which mode they are switching to.
// ===============================

document.addEventListener("DOMContentLoaded", () => {
  // Get the toggle button and body element
  const toggleButton = document.getElementById("theme-toggle");
  const body = document.body;

  // Safety check: if we cannot find the button, stop here
  if (!toggleButton) {
    console.log("Theme toggle button not found.");
    return;
  }

  // Helper function to switch theme
  function toggleTheme() {
    const currentTheme = body.getAttribute("data-theme") || "light";
    const newTheme = currentTheme === "light" ? "dark" : "light";

    // Set the new theme on the body
    body.setAttribute("data-theme", newTheme);

    // Update button label
    if (newTheme === "dark") {
      toggleButton.textContent = "☀️ Light";
    } else {
      toggleButton.textContent = "🌙 Dark";
    }

    console.log("Theme changed to:", newTheme);
  }

  // Set initial button text based on starting theme
  const startingTheme = body.getAttribute("data-theme") || "light";
  toggleButton.textContent =
    startingTheme === "light" ? "🌙 Dark" : "☀️ Light";

  // When user clicks the button → switch theme
  toggleButton.addEventListener("click", toggleTheme);
});
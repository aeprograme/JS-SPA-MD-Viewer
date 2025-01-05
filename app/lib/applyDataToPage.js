import { routes } from "../routes.js";
import Navigation from "./navigation.js";
import { config } from "../config.js";
/**
 * Manipulates most of the application
 */
const applyDataToPage = {
  /**
   * Initialize the sidenav
   */
  sideNavInit() {
    const routesList = document.getElementById("routesList");
    routesList.innerHTML = "";
    routes.forEach((route) => {
      const li = document.createElement("li");
      li.classList.add("nav-item");
      const a = document.createElement("a");
      a.classList.add("nav-link");
      a.href = Navigation.createUrl(route.url);
      a.textContent = route.title;
      li.appendChild(a);
      routesList.appendChild(li);
    });
  },
  /**
   * Manipulates the url in all anchors to point to the application
   * unless it starts with http / ftp / mailto
   */
  urlInit() {
    const anchors = document.querySelectorAll("a");
    anchors.forEach((anchor) => {
      if (anchor.href.startsWith(config.appUrl)) {
        anchor.addEventListener("click", function (e) {
          e.preventDefault();
          var url = anchor.href;
          //remove the appUrl from the url
          url = url.replace(config.appUrl, "");
          Navigation.redirect(url);

          //Refresh the sidnavactive by recalling it on clicking the anchor
          applyDataToPage.sideNavActive();
        });
      } else {
        //If its not part of the application
        //then open it in a new tab
        //currently not working :(
        anchor.target = "_blank";
      }
    });
  },
  /**
   * Manipulates the page title
   */
  titleInit() {
    const topNavTitle = document.getElementById("page-title");
    const pageTitle = document.getElementsByTagName("title")[0];
    topNavTitle.innerText = config.appTitle;
    pageTitle.innerText = config.appTitle;
  },
  /**
   * Applies .active to the anchor with similar url
   */
  sideNavActive() {
    const routesList = document.getElementById("routesList");
    const currentUrl = window.location.href;
    const allRoutes = routesList.querySelectorAll(".nav-link");

    allRoutes.forEach((route) => {
      const routeURL = route.getAttribute("href");

      if (currentUrl === routeURL || currentUrl === routeURL + "/") {
        route.classList.add("active");
      } else {
        route.classList.remove("active");
      }
    });
  },
  /**
   * Search in sidenav
   */
  searchInSidenav() {
    const searchInput = document.getElementById("search-sidenav");
    const routesList = document.getElementById("routesList");
    const allRoutes = routesList.querySelectorAll(".nav-link");

    // Set up the event listener for search input
    searchInput.addEventListener("input", () => {
      const searchValue = searchInput.value.toLowerCase();

      allRoutes.forEach((route) => {
        const routeTitle = route.textContent.toLowerCase();

        if (searchValue === "" || routeTitle.includes(searchValue)) {
          // Show the route if the search value matches
          route.style.display = "block";
        } else {
          // Hide the route if the search value doesn't match
          route.style.display = "none";
        }
      });
    });
  },
  /**
   * Toggle the sidenav visibility
   */
  toggleSideNav() {
    const sideNav = document.getElementById("sideNav");
    const togglerButton = document.getElementById("sidenavToggle");
    const appContainer = document.getElementById("app");

    togglerButton.addEventListener("click", () => {
      sideNav.classList.toggle("d-none");
      appContainer.classList.toggle(
        "full-width",
        sideNav.classList.contains("d-none")
      );
    });
  },
  /**
   * Apply bootstrap tooltip style on load
   */
  applyToolTips() {
    const tooltips = document.querySelectorAll("[data-bs-title]");
    tooltips.forEach((tooltip) => {
      new bootstrap.Tooltip(tooltip);
    });
  }
};

//Refresh the sidnavactive by recalling it on popstate
window.addEventListener("popstate", applyDataToPage.sideNavActive);

export default applyDataToPage;

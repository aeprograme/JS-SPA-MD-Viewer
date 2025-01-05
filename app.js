import Navigation from "./app/lib/navigation.js";
import pageAttr from "./app/lib/pageAttr.js";
import applyDataToPage from "./app/lib/applyDataToPage.js";
import { config } from "./app/config.js";

document.addEventListener("DOMContentLoaded", () => {
  //Start the application with a fresh and clean console
  console.clear();

  //Start the navigation
  Navigation.init();
  /**
   * Set the default attributes
   */
  // Set default lang en = English
  // Can have any like ar for arabic, fr for french ..etc.
  pageAttr.setLang(config.appLang);
  // Set default direction ltr = Left to Right
  // Can have ltr or rtl
  pageAttr.setDir(config.appDir);
  // Set default theme light
  // Can have light or dark
  pageAttr.setTheme(config.appTheme);
  /**
   * Apply the side nav
   */
  applyDataToPage.sideNavInit();
  /**
   * Apply the url
   */
  applyDataToPage.urlInit();
  /**
   * Apply the page title
   */
  applyDataToPage.titleInit();
  /**
   * Apply the active route
   */
  applyDataToPage.sideNavActive();
  /**
   * Apply the search in sidenav
   */
  applyDataToPage.searchInSidenav();
  /**
   * Apply the toggle sidenav
   */
  applyDataToPage.toggleSideNav();
  /**
   * Apply the tooltips
   */
  applyDataToPage.applyToolTips();
});

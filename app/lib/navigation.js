import { routes } from "../routes.js"; // Import the list of valid routes
import mdToHtml from "./mdToHtml.js"; // Import the mdToHtml function
import { config } from "../config.js"; // Import the configs
import customErrorHTML from "./customErrorHTML.js"; // Import custom error html
import siteMapGenerator from "./siteMapGenerator.js"; // Import the siteMapGenerator

const Navigation = {
  defaultUrl: "/", // Default URL to redirect to on first load

  /**
   * Initializes the application by checking the current URL and redirecting if necessary.
   */
  init() {
    const currentUrl = this.normalizeUrl(window.location.pathname);

    //Add the sitemap to the routes on the fly
    routes.push({
      title: "Sitemap",
      url: "/sitemap.xml",
      type: "sitemap" // custom attr for this url only
    });

    if (!this.validateRoute(currentUrl)) {
      // If the route is invalid, show the custom 404 page
      this.showCustomError(customErrorHTML.error_404());
    } else {
      // If the route is valid, load the appropriate content
      const route = this.getRoute(currentUrl);
      if (route) {
        this.load(route, "app");
      } else {
        this.showCustomError(customErrorHTML.error_404());
      }
    }

    // Ensure the popstate listener is always active
    window.removeEventListener("popstate", this.handlePopState.bind(this)); // Avoid duplicate listeners
    window.addEventListener("popstate", this.handlePopState.bind(this));
  },

  /**
   * Handles the popstate event for history navigation
   */
  handlePopState() {
    const currentUrl = this.normalizeUrl(window.location.pathname);
    const route = this.getRoute(currentUrl);

    if (route) {
      this.load(route, "app");
    } else {
      //show the custom 404 page
      this.showCustomError(customErrorHTML.error_404());
    }
  },

  /**
   * Redirects to a given URL if it exists in the routes
   * @param {string} url - The URL to navigate to.
   */
  redirect(url) {
    const normalizedUrl = this.normalizeUrl(url);
    const route = this.getRoute(normalizedUrl);

    if (!route) {
      //   this.abort(404, "Route not found.");

      //show the custom 404 page
      this.showCustomError(customErrorHTML.error_404());
      return;
    }
    // Update the browser's history
    window.history.pushState({}, "", normalizedUrl);
    this.load(route, "app");
  },

  /**
   * Aborts with a given HTTP status code (mimics a http status page error)
   * @param {number} code - The HTTP status code (e.g., 404, 500).
   * @param {string} message - Optional message to display.
   */
  abort(code, message = "") {
    const container = document.getElementById("app");
    container.innerHTML = `
      <div style="text-align: center; margin-top: 50px;">
        <h1>Status: ${code}</h1>
        <p>${message || "Something went wrong."}</p>
      </div>
    `;
    console.error(`Aborted with status code: ${code}`);
  },

  /**
   * Displays a custom error message
   * @param {string} htmlCode
   */
  showCustomError(htmlCode) {
    const container = document.getElementById("app");
    container.innerHTML = htmlCode;
  },

  /**
   * Dynamically loads a page (Single Page App behavior) if the route exists
   * @param {object} route - The route object containing metadata (e.g., title, page).
   * @param {string} containerId - The ID of the container to update with the page content.
   */
  async load(route, containerId) {
    const { title, page } = route;
    const container = document.getElementById(containerId);

    if (!container) {
      console.error(`Container with ID "${containerId}" not found.`);
      return;
    }

    if (title) {
      // Set the page title
      document.title = title;
    }

    if (page) {
      try {
        // Load the markdown page
        const content = await mdToHtml(page);
        if (content == null) {
          //show the custom 500 page
          this.showCustomError(customErrorHTML.error_500());
          return;
        }
        container.innerHTML = content;
      } catch (error) {
        //show the custom 500 page
        this.showCustomError(customErrorHTML.error_500());
        console.error(error);
      }
    } else {
      //   this.abort(404, "Page not found in the route.");
      //Check if its a sitemap
      if (route.type !== undefined && route.type === "sitemap") {
        //show the sitemap
        this.handleSiteMap();
      } else {
        //show the custom 500 page
        this.showCustomError(customErrorHTML.error_500());
      }
    }
  },
  /**
   * Validates if a given route exists in the routes array
   * @param {string} url - The URL to validate.
   * @returns {boolean} - True if the route exists, false otherwise.
   */
  validateRoute(url) {
    return !!this.getRoute(url);
  },

  /**
   * Retrieves the route object for a given URL
   * @param {string} url - The URL to get the route metadata for.
   * @returns {object|null} - The route object if it exists, otherwise null.
   */
  getRoute(url) {
    const normalizedUrl = this.normalizeUrl(url);

    return routes.find((route) => {
      const routeRegex = new RegExp(
        `^${route.url.replace(/\{[^\}]+\}/g, "[^/]+")}$`
      );
      return routeRegex.test(normalizedUrl);
    });
  },

  /**
   * Normalizes the URL to ensure consistent matching.(Thanks to ChatGPT for this one)
   * @param {string} url - The URL to normalize.
   * @returns {string} - Normalized URL.
   */
  normalizeUrl(url) {
    if (url === "" || url === window.location.origin || url === "/") {
      return "/";
    }
    return url.startsWith("/") ? url : `/${url}`;
  },

  /**
   * Creates a URL with the app URL prefix
   * @param {string} url - The URL to create
   * @returns {string} - The URL with the app URL prefix
   */
  createUrl(url) {
    const normalizedUrl = this.normalizeUrl(url);
    const appUrl = config.appUrl;

    return this.removeTrailingSlash(appUrl) + normalizedUrl;
  },

  /**
   * Removes the trailing slash from a given URL
   * @param {string} url
   * @returns {string}
   */
  removeTrailingSlash(url) {
    return url.replace(/\/$/, "");
  },
  /**
   * Handles rendering the sitemap content
   */
  handleSiteMap() {
    const siteMapContent = siteMapGenerator.createBlob();
    const reader = new FileReader();
    // Read the content as text
    // Thanks again for the help from ChatGPT for this code.
    reader.onload = function (event) {
      // Render the content as text
      document.documentElement.innerHTML = event.target.result;
    };

    reader.readAsText(siteMapContent);
  }
};

export default Navigation;

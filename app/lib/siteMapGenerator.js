import { routes } from "../routes.js"; // Import the list of valid routes
import { config } from "../config.js"; // Import the configs
import Navigation from "./navigation.js";
/**
 * Generates sitemap on the fly.
 * DON'T USE IT FOR PRODUCTION
 * OR EVEN FOR A SEO RELATED STUFF
 */
const siteMapGenerator = {
  /**
   * Generates sitemap on the fly.
   * @returns {string} - The generated sitemap.
   */
  generate: function () {
    return `<?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${this.buildRoutesList()}
      </urlset>`;
  },
  /**
   * Collect routes from the routes.js
   * @returns {object[]}
   */
  collectRoutes: function () {
    return routes;
  },
  /**
   * Builds a list of routes in xml
   * @returns {string[]}
   */
  buildRoutesList: function () {
    // Combine all routes into a single string
    return this.collectRoutes()
      .map(
        (route) => `
        <url>
          <loc>${Navigation.removeTrailingSlash(
            config.appUrl
          )}${Navigation.normalizeUrl(route.url)}</loc>
        </url>
      `
      )
      .join("<br/>");
  },
  /**
   * Creates a file in the memory to serve
   * @returns {string}
   */
  createBlob: function () {
    return new Blob([this.generate()], {
      //text/xml for xml
      //text/plain for a plain text file
      //since sitemap is sitemap.xml text/xml is used
      type: "text/xml"
    });
  },
  /**
   * Creates a blob url
   * @returns {string}
   */
  createBlobUrl: function () {
    return URL.createObjectURL(this.createBlob());
  }
};

export default siteMapGenerator;

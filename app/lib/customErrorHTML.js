/**
 * Custom status code error html.
 * contains html for 404 / 500
 */
const customErrorHTML = {
  /**
   * Error 404 html
   * @returns {string}
   */
  error_404() {
    return ` <div class="d-flex flex-column align-items-center justify-content-center h-100">
           <h1>404 - Page Not Found</h1>
           <p>Nope, can't seem to find the cat mr. Schrödinger.</p>
           <p>
             Maybe it's in a superposition of both existing and not existing.
           </p>
         </div>`;
  },
  /**
   * Error 500 html
   * @returns {string}
   */
  error_500() {
    return ` <div class="d-flex flex-column align-items-center justify-content-center h-100">
    <h1>500 - Internal Server Error</h1>
    <p>Houston, we have a problem.</p>
    <p>Server is currently in orbit... but we've lost communication!</p>
</div>`;
  }
};

export default customErrorHTML;

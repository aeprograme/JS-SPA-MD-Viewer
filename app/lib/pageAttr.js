/**
 * Sets the attributes of the page
 * Dark/Light mode
 * Language
 */
const pageAttr = {
  /**
   * Set default direction
   */
  defaultDir: "ltr",
  /**
   * set default theme
   */
  defaultTheme: "light",
  /**
   * set default language
   */
  defaultLang: "en",
  /**
   * set allowed directions
   */
  allowedDir: ["ltr", "rtl"],
  /**
   * set allowed themes
   */
  allowedTheme: ["light", "dark"],
  /**
   * set Language
   * @param {string} dir
   */
  setDir(dir) {
    if (!this.allowedDir.includes(dir)) {
      dir = this.defaultDir;
    }
    document.dir = dir;
  },
  /**
   * set Theme
   * @param {string} theme
   */
  setTheme(theme) {
    if (!this.allowedTheme.includes(theme)) {
      theme = this.defaultTheme;
    }
    document.documentElement.setAttribute("data-bs-theme", theme);
  },
  /**
   * set Language
   * @param {string} lang
   */
  setLang(lang) {
    document.documentElement.setAttribute("lang", lang);
  },
  /**
   * get direction. Returns default direction if direction is not allowed or not set in html
   * @returns {string}
   */
  getDir() {
    const dir = document.dir;
    if (dir == undefined || dir == null || !this.allowedDir.includes(dir)) {
      return this.defaultDir;
    }
    return dir;
  },
  /**
   * get theme. Returns default theme if theme is not allowed or not set in html
   * @returns {string}
   */
  getTheme() {
    const theme = document.documentElement.getAttribute("data-bs-theme");
    if (
      theme == undefined ||
      theme == null ||
      !this.allowedTheme.includes(theme)
    ) {
      return this.defaultTheme;
    }
    return theme;
  },
  /**
   * get language. Returns default language if language is not allowed or not set in html
   * @returns {string}
   */
  getLang() {
    return document.documentElement.getAttribute("lang");
  }
};

export default pageAttr;

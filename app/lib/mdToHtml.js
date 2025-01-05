import "./markdown-it.min.js"; // Ensure the markdown-it library is available

// Initialize markdown-it instance
const md = markdownit({
  html: true,
  linkify: true,
  typographer: true,
  breaks: true
});
// const md = markdownit();
// disables converting email to link
md.linkify.set({ fuzzyEmail: false });

/**
 * Converts a markdown file into HTML content
 * @param {string} mdFile - The relative path to the markdown file (e.g., "home.md").
 * @returns {Promise<string>} - The parsed HTML content.
 */
export async function mdToHtml(mdFile) {
  const pagesPath = "../../app/pages/"; // Relative path for markdown files
  const pagePath = pagesPath + mdFile; // Build the complete file path

  try {
    const response = await fetch(pagePath);

    if (!response.ok) {
      console.error(`Failed to fetch the file: ${pagePath}`);
      return null;
    }

    const markdownContent = await response.text(); // Fetch the file and read its content
    return md.render(markdownContent); // Parse markdown into HTML
  } catch (error) {
    console.error("Error in mdToHtml:", error);
    return null;
  }
}

export default mdToHtml;

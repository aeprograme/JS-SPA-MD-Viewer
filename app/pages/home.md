# JS-SPA-MD-Viewer
    A Pure JS documentation like SPA website for viewing .md files on the fly. with routing, 404,500 error page and sitemap on the fly.

### how to use (1):
    1) add your routes to `app/routes.js` file

```javascript
    {
      title: "Home",
      url: "/",
      page: "home.md"
    }
```
    * `title` is the page title.
    * `url` the page url
    * `page` is the .md file in the `pages` directory.

    1) add your .md files to `app/pages/`.

    2) Modify the config.js with an actual data

```javascript
    {
      appUrl: "http://jsmdviewer.local/",
      appTitle: "JS MD Viewer",
      appDir: "ltr",
      appLang: "en",
      appTheme: "dark"
    }
```
    * `appUrl` is actual website url.
    * `appTitle` Title in the navigation bar
    * `appDir` Direction of the html
    * `appLang` Html language en/ar/fr ..etc.
    * `appTheme` Theme for the pages. dark/light

    3) That's all

### How to use (2):
   ` just clone the project `

### Mentions
    This project is by no means is a production ready application. I just created this project for learning purpose.

    Thanks to `Chat-GPT` for helping in writing the route code.

    And most thanks to

- `markdown-it` lib for the .md render
- [markdown-it](https://github.com/markdown-it/markdown-it)

- `Github Markdown` css for the html styling
- [github-markdown-css](https://github.com/sindresorhus/github-markdown-css)

### TO DO
- Add the ability to handle images and support it.
- Add the ability to handle videos and support it.
- Edit the layout with a better documentation like view.
- Clean the code and make it more readable.

# Webpack boilerplate

>Webpack config that uses `sass` to convert `.scss` to `.css` and transform newer (ES6 and up) JavaScript with `babel`

**If you want to change the html, change the file: `index.ejs`. And your main entry point for writing javascript is in `app.js`.

In `app.js` I have imported `main.scss` so webpack will convert the scss-files and output them as `styles.css` in `dist`-folder. As long as you don't delete that line you should just be able to write `scss` and `js` as usual. Your finshed files are located inside of the `dist`-folder.

## Installation

1. Clone this repository
2. `cd` into the folder `webpack-boilerplate` that is created when cloning
3. Install all dependencies with `npm`
```bash
npm install
```

## Usage

### Development
To run development server on localhost (you can choose port of your choice in the config-file)

```bash
npm run dev
```

### Production

To create a production ready build that is minified and properly packed:

```bash
npm run build
```

## Packages used

* [Webpack](https://github.com/webpack/webpack)
  * Webpack handles converting and packaging all the resources in your project so they can be read by a browser.
* [Webpack-dev-server](https://github.com/webpack/webpack-dev-server)
  * Webpack does not handle creating a `localhost` and serving the content, you need to have a separate module that handles reloading and updating the page when in development mode
* [Webpack Dashboard](https://github.com/FormidableLabs/webpack-dashboard)
  * yeah this is just for show, a cool dashboard, doesn't do anything special
* [Webpack Babel Loader](https://github.com/babel/babel-loader)
  * Handles converting JavaScript with Babel
* [Style-loader](https://github.com/webpack-contrib/style-loader)
  * Handles `<style>`-tags and inserting css via webpack. Needed for loading CSS
* [CSS-loader](https://github.com/webpack-contrib/css-loader)
  * Makes it possible to do `import './styles.css` inside our `app.js`-file. Without this loader, webpack does not know how to handle `.css`-files.
* [Sass-loader](https://github.com/webpack-contrib/sass-loader)
  * Makes it possible to do `import './styles.scss` inside our `app.js`-file. Without this loader, webpack does not know how to handle `.scss`-files.
* [ExtractTextPlugin](https://github.com/webpack-contrib/extract-text-webpack-plugin)
  * By default, webpack inlines css into your JavaScript, it does not actually create a `.css`-file. This plugin handles extracting the `css` into a separate file.
* [HtmlWebpackPlugin](https://github.com/jantimon/html-webpack-plugin)
 * This plugin handles creating a `index.html` from `index.ejs`. This is mainly so we don't have to handle linking and moving our files, webpack moves and inserts script-tags for us.
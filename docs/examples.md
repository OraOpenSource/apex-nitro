# Features Examples

## Browsersync
VMORNEAU TODO

## Sass
VMORNEAU TODO

## Autoprefixer
You write:
```css
a { display: flex }
```
Gets parsed to:
```css
a {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex
}
```

## UglifyJS
You write:
```javascript
function myFunction() {
    console.log("Hello World!");
}
```
Gets parsed to:
```javascript
function myFunction(){console.log("Hello World!")}
```

## Sourcemaps
Map the final (concatenated and minified) file to your original source file.  
**Example:**  
Your application is pointing to `app.min.css`, but the browser reads `custom.scss`  
![](sourcemaps.png)

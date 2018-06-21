# inview.js: React to Being in View

Makes a page element react to being in view.

Try the <a href="http://www.woollymittens.nl/default.php?url=useful-inview">demo</a>.

## How to include the script

The stylesheet is best included in the header of the document.

```html
<link rel="stylesheet" href="./css/inview.css"/>
```

This include can be added to the header or placed inline before the script is invoked.

```html
<script src="./js/inview.js"></script>
```

## How to start the script

```javascript
var inView = new InView({
	'element': document.querySelector('.inview-lead'),
	'target': document.querySelector('.inview-message'),
	'ifAbove': ' scrolled-above',
	'ifBelow': ' scrolled-below',
	'ifVisible': ' scrolled-visible',
	'ifRevealed': ' scrolled-revealed',
	'ifUpwards': ' scrolled-up',
	'ifDownwards': ' scrolled-down',
	'offset': -50,
	'tolerance': 10,
	'toggle': true,
	'navigate': false,
	'step': 0.1
});
```

**'element' : {DOM node}** - The element to watch and/or affect.

**'target' : {DOM node}** - The optional target of the effect.

**'ifAbove' : {className}** - The class name to assign to the target when the element is above the view.

**'ifBelow' : {className}** - The class name to assign to the target when the element is below the view.

**'ifVisible' : {className}** - The class name to assign to the target when the element is in view.

**'ifRevealed' : {className}** - The class name to assign to the target when the element has filled the view.

**'ifUpwards': {className}** - The class name to assign to the target when the page is scrolled up.

**'ifDownwards': {className}** - The class name to assign to the target when the page is scrolled down.

**'offset' : {integer | DOM node}** - Extra distance to scroll before the element reacts.

**'tolerance' : {integer}** - Allow rounding errors of this size.

**'toggle' : {boolean}** - Allow the affected element to change more than once.

**'navigate' : {boolean}** - Allow a click on the target to scroll to the element.

**'step' : {float}** - Fraction of total distance to scroll each animation step.

## How to build the script

This project uses node.js from http://nodejs.org/

This project uses gulp.js from http://gulpjs.com/

The following commands are available for development:
+ `npm install` - Installs the prerequisites.
+ `gulp import` - Re-imports libraries from supporting projects to `./src/libs/` if available under the same folder tree.
+ `gulp dev` - Builds the project for development purposes.
+ `gulp dist` - Builds the project for deployment purposes.
+ `gulp watch` - Continuously recompiles updated files during development sessions.
+ `gulp serve` - Serves the project on a temporary web server at http://localhost:8500/.
+ `gulp php` - Serves the project on a temporary php server at http://localhost:8500/.

## License

This work is licensed under a Creative Commons Attribution 3.0 Unported License. The latest version of this and other scripts by the same author can be found at http://www.woollymittens.nl/

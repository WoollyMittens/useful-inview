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
	'element': document.querySelector('.inview-message'),
	'source': document.querySelector('.inview-lead'),
	'ifAbove': ' scrolled-above',
	'ifBelow': ' scrolled-below',
	'ifVisible': ' scrolled-visible',
	'ifRevealed': ' scrolled-revealed',
	'ifUpwards': ' scrolled-up',
	'ifDownwards': ' scrolled-down',
	'offset': -50,
	'tolerance': 10,
	'reversible': true,
	'navigate': false,
	'easing': 'linear',
	'step': 0.1,
	'transform': function(transit){ return 'translateX(' + (transit * 100) + '%)' },
	'opacity': function(transit){ return transit },
	'play': function(transit){ return (transit <= 0.5) }
});
```

**'element' : {DOM node}** - The element to watch and/or affect.

**'source' : {DOM node}** - The position of this element will be used instead.

**'ifAbove' : {className}** - The class name to assign to the target when the element is above the view.

**'ifBelow' : {className}** - The class name to assign to the target when the element is below the view.

**'ifVisible' : {className}** - The class name to assign to the target when the element is in view.

**'ifRevealed' : {className}** - The class name to assign to the target when the element has filled the view.

**'ifUpwards': {className}** - The class name to assign to the body when the page is scrolled up.

**'ifDownwards': {className}** - The class name to assign to the body when the page is scrolled down.

**'offset' : {integer | DOM node}** - Extra distance to scroll before the element reacts.

**'tolerance' : {integer}** - Allow rounding errors up to this size.

**'reversible' : {boolean}** - Allow the affected element to change more than once.

**'navigate' : {boolean}** - Allow a click on the target to scroll to the element.

**'easing' : {linear|easein|easeout|easinout}** - Apply an easing function to the motion.

**'step' : {float}** - Fraction of total distance to scroll each animation step.

**'transform' : {function(transit)}** - Optional function that returns a CSS transformation based on the transit of the element.
- **'transit' : {float}** - Number that decrease from 1 to 0 as the objects scrolls from bottom to top.

**'opacity' : {function(exposure)}** - Optional function that returns a CSS opacity based on the transit.
- **'exposure' : {float}** - Number that increase from 0 to 1 as the objects scrolls into view.

**'play' : {function(transit)}** - Optional function that triggers a video to play based on the transit.
- **'exposure' : {float}** - Number that decrease from 1 to 0 as the objects scrolls into view.

```html
<aside class="inview-inline" data-translate-x="150%,0%" data-translate-y="150%,0%" data-rotate="0deg,180deg" data-scale="0.5,1" data-opacity="0,1">
	Lorem ipsum dolor sit amet.
</aside>
```

**'data-translate-x' : {from,to}** - The element will translate horizontally from the first to the second value as it scrolls up the screen.

**'data-translate-y' : {from,to}** - The element will translate horizontally from the first to the second value as it scrolls up the screen.

**'data-rotate' : {from,to}** - The element will rotate from the first to the second value as it scrolls up the screen.

**'data-scale' : {from,to}** - The element will scale from the first to the second value as it scrolls up the screen.

**'data-opacity' : {from,to}** - The element will fade from the first to the second value as it scrolls up the screen.


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

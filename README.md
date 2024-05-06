# inview.js: React to Being in View

*DEPRICATION WARNING: the functionality in this script has been superceeded / trivialised by updated web standards.*

Makes a page element react to being in view.

## How to include the script

The stylesheet is best included in the header of the document.

```html
<link rel="stylesheet" href="css/inview.css"/>
```

This include can be added to the header or placed inline before the script is invoked.

```html
<script src="js/inview.js"></script>
```

Or use [Require.js](https://requirejs.org/).

```js
requirejs([
	'js/inview.js'
], function(InView) {
	...
});
```

Or use imported as a component in existing projects.

```js
@import {InView} from "js/inview.js";
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
	'transform': function(position){ return 'translateX(' + (position.transit * 100) + '%)' },
	'opacity': function(position){ return position.transit },
	'play': function(position){ return (position.transit <= 0.5) }
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

**'transform' : {function(position)}** - Optional function that returns a CSS transformation based on the position of the element.

+ *'position.top' : {integer}* - Distance from the top of the screen in pixels.
+ *'position.bottom' : {integer}* - Distance from the bottom of the screen in pixels.
+ *'position.scrolled' : {integer}* - Total distance scrolled.
+ *'position.above' : {boolean}* - True if completely above the screen.
+ *'position.below' : {boolean}* - True is completely below the screen.
+ *'position.visible' : {boolean}* - True if visivle on the screen.
+ *'position.revealed' : {boolean}* - True if completely revealed.
+ *'position.entering' : {float}* - A value that changed between 1 and 0 as the object enters the screen.
+ *'position.leaving' : {float}* - A value that changed between 1 and 0 as the object leaves the screen.
+ *'position.transit' : {float}* - A value that changed between 1 and 0 as the object traverses the screen.

**'opacity' : {function(position)}** - Optional function that returns a CSS opacity based on the position of the element.

**'play' : {function(position)}** - Optional function that triggers a video to play based on the position of the element.

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


## License

This work is licensed under a [MIT License](https://opensource.org/licenses/MIT). The latest version of this and other scripts by the same author can be found on [Github](https://github.com/WoollyMittens).

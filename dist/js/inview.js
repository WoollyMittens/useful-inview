/*
	Source:
	van Creij, Maurice (2018). "inview.js: Makes a page element react to being in view.", http://www.woollymittens.nl/.

	License:
	This work is licensed under a Creative Commons Attribution 3.0 Unported License.
*/

// establish the class
var InView = function (config) {

	this.only = function (config) {
		// start an instance of the script
		return new this.Main(config, this);
	};

	this.each = function (config) {
		var _config, _context = this, instances = [];
		// for all element
		for (var a = 0, b = config.elements.length; a < b; a += 1) {
			// clone the configuration
			_config = Object.create(config);
			// insert the current element
			_config.element = config.elements[a];
			// start a new instance of the object
			instances[a] = new this.Main(_config, _context);
		}
		// return the instances
		return instances;
	};

	return (config.elements) ? this.each(config) : this.only(config);

};

// return as a require.js module
if (typeof module !== 'undefined') {
	exports = module.exports = InView;
}

// extend the class
InView.prototype.Main = function(config, context) {

	// PROPERTIES

	this.context = context;
	this.element = config.element;
	this.previous = {};
	this.regexps = {};
	this.config = {
		'target': config.element,
		'ifAbove': ' scrolled-above',
		'ifBelow': ' scrolled-below',
		'ifVisible': ' scrolled-visible',
		'ifRevealed': ' scrolled-revealed',
		'ifUpwards': ' scrolled-up',
		'ifDownwards': ' scrolled-down',
		'offset': 0,
		'tolerance': 10,
		'toggle': true,
		'navigate': false,
		'step': 0.1,
		'transform': null,
		'opacity': null
	};

	for (var key in config) {
		this.config[key] = config[key];
	}

	// METHODS

	this.init = function() {
		// if the elements exist
		if (this.config.element) {
			// generate regexp
			this.regexps.direction = new RegExp(this.config.ifDownwards + '|' + this.config.ifUpwards);
			// interpret the tag attributes
			this.attribs(this.config.element);
			// initial scroll position
			this.previous.scrolled = window.pageYOffset;
			// add the event handler
			window.addEventListener('scroll', this.onScrolled.bind(this));
			// initial refresh
			this.onScrolled();
			// if there is a navigation target
			if (this.config.navigate && this.config.target) {
				this.config.target.addEventListener('click', this.onNavigate.bind(this, this.config.element));
			}
		}
		// return the object
		return this;
	};

	this.parse = function(attr) {
		if(!attr) return null;
		var values = attr.split(',');
		var unit = values[0].match(/\%|deg|rem|em|pt|px/);
		values[0] = parseFloat(values[0]);
		values[1] = parseFloat(values[1]);
		return {'from': values[0], 'to': values[1], 'unit': unit};
	};

	this.attribs = function(element) {
		var dataTranslateX = element.getAttribute('data-translate-x');
		var dataTranslateY = element.getAttribute('data-translate-y');
		var dataRotate = element.getAttribute('data-rotate');
		var dataScale = element.getAttribute('data-scale');
		var dataOpacity = element.getAttribute('data-opacity');
		if (dataTranslateX || dataTranslateY || dataRotate || dataScale) {
			var hor = this.parse(dataTranslateX);
			var ver = this.parse(dataTranslateY);
			var rot = this.parse(dataRotate);
			var scale = this.parse(dataScale);
			this.config.transform = function(transit) {
				var translation = (hor) ? 'translateX(' + ((hor.to - hor.from) * (1 - transit) + hor.from) + hor.unit + ')' : '';
				translation += (ver) ? ' translateY(' + ((ver.to - ver.from) * (1 - transit) + ver.from) + ver.unit + ')' : '';
				translation += (rot) ? ' rotate(' + ((rot.to - rot.from) * (1 - transit) + rot.from) + rot.unit + ')' : '';
				translation += (scale) ? ' scale(' + ((scale.to - scale.from) * (1 - transit) + scale.from) + ')' : '';
				return translation;
			};
		}
		if (dataOpacity) {
			var opacity = this.parse(dataOpacity);
			this.config.opacity = function(transit) {
				return ((opacity.to - opacity.from) * transit + opacity.from);
			}
		}
	};

	this.offset = function() {
		// measure the offset in realtime if a DOM element was supplied
		return isNaN(this.config.offset)
			? Math.max(this.config.offset.offsetHeight + this.config.offset.getBoundingClientRect().y + this.config.tolerance, 0)
			: this.config.offset;
	};

	this.isElementInViewport = function(el) {
		var rect = el.getBoundingClientRect();
		var height = (window.innerHeight || document.documentElement.clientHeight);
		var width = (window.innerWidth || document.documentElement.clientWidth);
		var offset = this.offset();
		var scrolled = window.pageYOffset;
		var minY = -el.offsetHeight;
		var maxY = height;
		return ({
			'scrolled': scrolled,
			'distance': rect.top - offset,
			'above': rect.bottom < offset,
			'below': rect.top > (height + offset),
			'visible': rect.top <= (height + offset) && rect.bottom >= offset,
			'revealed': rect.top <= offset && rect.bottom >= offset,
			'transit': Math.min(Math.max((rect.top - minY - offset) / (maxY - minY - offset), 0), 1)
		});
	};

	this.ifDirection = function(position, previous) {
		if (position.scrolled > previous.scrolled && document.body.className.indexOf(this.config.ifDownwards) < 0) {
			document.body.className = document.body.className.replace(this.regexps.direction, '') + this.config.ifDownwards;
		} else if (position.scrolled < previous.scrolled && document.body.className.indexOf(this.config.ifUpwards) < 0) {
			document.body.className = document.body.className.replace(this.regexps.direction, '') + this.config.ifUpwards;
		}
	};

	this.ifAbove = function(position, changed) {
		if (position.above) {
			// and the element doesn't have the class name yet
			if (changed.className.indexOf(this.config.ifAbove) < 0) {
				// give it the class name
				changed.className += this.config.ifAbove;
			}
			// or if the element has the class name
		} else if (changed.className.indexOf(this.config.ifAbove) >= 0) {
			// remove the class name
			changed.className = changed.className.replace(new RegExp(this.config.ifAbove, 'g'), '');
		}
	};

	this.ifBelow = function(position, changed) {
		if (position.below) {
			// and the element doesn't have the class name yet
			if (changed.className.indexOf(this.config.ifBelow) < 0) {
				// give it the class name
				changed.className += this.config.ifBelow;
			}
			// or
		} else if (changed.className.indexOf(this.config.ifBelow) >= 0) {
			// remove the class name
			changed.className = changed.className.replace(new RegExp(this.config.ifBelow, 'g'), '');
		}
	};

	this.ifVisible = function(position, changed) {
		if (position.visible) {
			// and the element doesn't have the class name yet
			if (changed.className.indexOf(this.config.ifVisible) < 0) {
				// give it the class name
				changed.className += this.config.ifVisible;
			}
			// or if its supposed to toggle
		} else if (this.config.toggle) {
			// if the element has the class name
			if (changed.className.indexOf(this.config.ifVisible) >= 0) {
				// remove the class name
				changed.className = changed.className.replace(new RegExp(this.config.ifVisible, 'g'), '');
			}
		}
	};

	this.ifRevealed = function(position, changed) {
		if (position.revealed) {
			// and the element doesn't have the class name yet
			if (changed.className.indexOf(this.config.ifRevealed) < 0) {
				// give it the class name
				changed.className += this.config.ifRevealed;
			}
			// or if its supposed to toggle
		} else if (this.config.toggle) {
			// if the element has the class name
			if (changed.className.indexOf(this.config.ifRevealed) >= 0) {
				// remove the class name
				changed.className = changed.className.replace(new RegExp(this.config.ifRevealed, 'g'), '');
			}
		}
	};

	this.ifTransformed = function(position, changed) {
		if (this.config.transform) {
			changed.style.transform = this.config.transform(position.transit);
		}
	};

	this.ifFaded = function(position, changed) {
		if (this.config.opacity) {
			changed.style.opacity = this.config.opacity(1 - position.transit);
		}
	};

	// EVENTS

	this.onNavigate = function(destination, evt) {
		// cancel the click
		if (evt && evt.preventDefault)
			evt.preventDefault();

		// if not near the destination
		var position = this.isElementInViewport(destination);
		if (Math.abs(position.distance) > this.config.tolerance) {
			// approach the destination
			var scrollTop = window.pageYOffset + position.distance * this.config.step;
			document.documentElement.scrollTop = document.body.scrollTop = scrollTop;
			// order the next step
			window.requestAnimationFrame(this.onNavigate.bind(this, destination));
		}
	};

	this.onScrolled = function(evt) {
		// if the element is in view
		var watched = this.config.element;
		var changed = this.config.target || watched;
		var position = this.isElementInViewport(watched);
		var previous = this.previous;
		// note the direction the page is being scrolled in
		this.ifDirection(position, previous);
		// if the watched object is above the viewport
		this.ifAbove(position, changed);
		// if the watched object is under the viewport
		this.ifBelow(position, changed);
		// if the watched object is visible in the viewport
		this.ifVisible(position, changed);
		// if the watched object has filled the viewport
		this.ifRevealed(position, changed);
		// apply the transformations
		this.ifTransformed(position, changed);
		// apply the opacity
		this.ifFaded(position, changed);
		// store the position
		this.previous = position;
	};

	this.init();

};

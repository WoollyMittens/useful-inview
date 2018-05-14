/*
	Source:
	van Creij, Maurice (2014). "useful.inview.js: Makes a page element react to being in view.", version 20141127, http://www.woollymittens.nl/.

	License:
	This work is licensed under a Creative Commons Attribution 3.0 Unported License.
*/

// create the constructor if needed
var useful = useful || {};
useful.InView = useful.InView || function() {};

// extend the constructor
useful.InView.prototype.Main = function(config, context) {

	// PROPERTIES

	"use strict";
	this.context = context;
	this.element = config.element;
	this.config = {
		'target': config.element,
		'ifAbove': ' scrolled-above',
		'ifBelow': ' scrolled-below',
		'ifVisible': ' scrolled-visible',
		'offset': 0,
		'toggle': true
	};

	for (name in config) {
		this.config[name] = config[name];
	}

	// METHODS

	this.init = function() {
		// if the elements exist
		if (this.config.element) {
			// add the event handler
			window.addEventListener('scroll', this.onScrolled.bind(this));
			// initial refresh
			this.onScrolled();
		}
		// return the object
		return this;
	};

	this.isElementInViewport = function(el) {
		var rect = el.getBoundingClientRect();
		var height = (window.innerHeight || document.documentElement.clientHeight);
		var width = (window.innerWidth || document.documentElement.clientWidth);
		return ({
			'above': rect.bottom < this.config.offset,
			'below': rect.top > (height + this.config.offset),
			'visible': rect.top < (height + this.config.offset) && rect.bottom > this.config.offset
		});
	};

	// EVENTS

	this.onScrolled = function(evt) {
		// if the element is in view
		var watched = this.config.element;
		var changed = this.config.target || watched;
		var position = this.isElementInViewport(watched);
		// if the watched object is above the viewport
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
		// if the watched object is under the viewport
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
		// if the watched object is visible in the viewport
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

};

// return as a require.js module
if (typeof module !== 'undefined') {
	exports = module.exports = useful.InView.Main;
}

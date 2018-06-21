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
		'step': 0.1
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
		return ({
			'scrolled': window.pageYOffset,
			'distance': rect.top - offset,
			'above': rect.bottom < offset,
			'below': rect.top > (height + offset),
			'visible': rect.top <= (height + offset) && rect.bottom >= offset,
			'revealed': rect.top <= offset && rect.bottom >= offset
		});
	};

	// EVENTS

	this.onNavigate = function(destination, evt) {
		// cancel the click
		if (evt && evt.preventDefault) evt.preventDefault();
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
		if (position.scrolled > previous.scrolled && document.body.className.indexOf(this.config.ifDownwards) < 0) {
			document.body.className = document.body.className.replace(this.regexps.direction, '') + this.config.ifDownwards;
		} else if (position.scrolled < previous.scrolled && document.body.className.indexOf(this.config.ifUpwards) < 0) {
			document.body.className = document.body.className.replace(this.regexps.direction, '') + this.config.ifUpwards;
		}
		this.previous = position.scrolled;
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
		// if the watched object has filled the viewport
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
		// store the position
		this.previous = position;
	};

	this.init();

};

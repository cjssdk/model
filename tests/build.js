/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/*!***********************!*\
  !*** ./tests/main.js ***!
  \***********************/
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @author Stanislav Kalashnik <darkpark.main@gmail.com>
	 * @license GNU GENERAL PUBLIC LICENSE Version 3
	 */

	'use strict';

	/* jshint undef:false */

	// dependencies
	var Model = __webpack_require__(/*! ../index */ 1);


	// declare named module
	QUnit.module('model');


	test('constructor', function testConstructor () {
		var m;

		m = new Model();
		strictEqual(typeof m.data, 'object', 'type');
		strictEqual(typeof m.events, 'object', 'type');
		strictEqual(m.data.constructor, Object, 'constructor type');
		strictEqual(Object.keys(m.data).length, 0, 'keys');

		m = new Model(null);
		strictEqual(m.data.constructor, Object, 'constructor type');
		strictEqual(Object.keys(m.data).length, 0, 'keys');

		m = new Model(undefined);
		strictEqual(m.data.constructor, Object, 'constructor type');
		strictEqual(Object.keys(m.data).length, 0, 'keys');

		m = new Model(123);
		strictEqual(m.data.constructor, Object, 'constructor type');
		strictEqual(Object.keys(m.data).length, 0, 'keys');

		m = new Model('qwe');
		strictEqual(m.data.constructor, Object, 'constructor type');
		strictEqual(Object.keys(m.data).length, 0, 'keys');

		m = new Model(true);
		strictEqual(m.data.constructor, Object, 'constructor type');
		strictEqual(Object.keys(m.data).length, 0, 'keys');

		m = new Model([]);
		strictEqual(m.data.constructor, Array, 'constructor type');
		strictEqual(Object.keys(m.data).length, 0, 'keys');

		m = new Model({a:1});
		strictEqual(m.data.constructor, Object, 'constructor type');
		strictEqual(Object.keys(m.data).length, 1, 'keys');
	});


	test('data', function testData () {
		var m;

		expect(16);

		m = new Model();
		strictEqual(m.init(), false, 'wrong param');
		strictEqual(m.init(''), false, 'wrong param');
		strictEqual(m.init('qwe'), false, 'wrong param');
		strictEqual(m.init(null), false, 'wrong param');
		strictEqual(m.init(undefined), false, 'wrong param');
		strictEqual(m.init(123), false, 'wrong param');
		strictEqual(m.init(12.3), false, 'wrong param');
		strictEqual(m.init(true), false, 'wrong param');
		strictEqual(m.init(false), false, 'wrong param');
		strictEqual(m.init(1,1,1,1), false, 'wrong param');
		strictEqual(m.init([]), true, 'wrong array param');

		strictEqual(m.init({}), true, 'normal param');

		m.init({a:1,b:2});
		propEqual(m.data, {a:1,b:2}, 'normal param');

		m.addListener('init', function ( event ) {
			propEqual(event.data, {a:123}, 'init event');
		});
		m.addListener('clear', function ( event ) {
			propEqual(event.data, {a:1,b:2}, 'clear event');
			propEqual(m.data, {}, 'clear event check');
		});
		m.init();
		m.init({a:123});
	});


	test('clear', function testClear () {
		var m;

		expect(5);

		m = new Model({a:1,b:2});
		propEqual(m.data, {a:1,b:2}, 'normal init');

		m.addListener('clear', function ( event ) {
			propEqual(event.data, {a:1,b:2}, 'clear event');
			propEqual(m.data, {}, 'clear event check');
		});
		ok(m.clear(), 'do clear');
		ok(!m.clear(), 'do clear again');
	});


	test('has', function testHas () {
		var m;

		m = new Model({a:1,b:2});
		propEqual(m.data, {a:1,b:2}, 'normal init');

		ok(m.has('a'), 'present');
		ok(m.has('b'), 'present');
		ok(!m.has('c'), 'not present');
		ok(!m.has(''), 'not present');
		ok(!m.has(null), 'not present');
		ok(!m.has(), 'not present');
		ok(!m.has(123), 'not present');
		ok(!m.has(undefined), 'not present');
		ok(!m.has(false), 'not present');
		ok(!m.has(true), 'not present');
		ok(!m.has([]), 'not present');
		ok(!m.has({}), 'not present');

		m.clear();
		ok(!m.has('a'), 'not present');
	});


	test('get', function testGet () {
		var m;

		m = new Model({a:1,b:2});
		propEqual(m.data, {a:1,b:2}, 'normal init');

		strictEqual(m.get('a'), 1, 'one attr');
		strictEqual(m.get('c'), undefined, 'missing attr');
		strictEqual(m.get(123), undefined, 'missing attr');
		strictEqual(m.get(null), undefined, 'missing attr');
		strictEqual(m.get(true), undefined, 'missing attr');
		strictEqual(m.get(false), undefined, 'missing attr');
		strictEqual(m.get(undefined), undefined, 'missing attr');
		strictEqual(m.get({}), undefined, 'missing attr');
		strictEqual(m.get([]), undefined, 'missing attr');
	});


	test('set', function testSet () {
		var m;

		expect(14);

		m = new Model();
		m.addListener('change', function ( event ) {
			strictEqual(event.name, 'a', 'create: name');
			strictEqual('prev' in event, false, 'create: prev');
			strictEqual('curr' in event, true, 'create: curr');
			strictEqual(event.curr, 123, 'create: curr data');
		});
		ok(m.set('a', 123), 'set operation');
		propEqual(m.data, {a:123}, 'check');

		m = new Model({a:0});
		m.addListener('change', function ( event ) {
			strictEqual(event.name, 'a', 'update: name');
			strictEqual('prev' in event, true, 'update: prev');
			strictEqual('curr' in event, true, 'update: curr');
			strictEqual(event.curr, 222, 'update: curr data');
		});
		ok(m.set('a', 222), 'set operation');
		propEqual(m.data, {a:222}, 'check');

		m = new Model({a:0});
		m.addListener('change', function () {
			ok(false, 'should not be called');
		});
		ok(!m.set('a', 0), 'set operation');
		propEqual(m.data, {a:0}, 'check');
	});


	test('unset', function testUnset () {
		var m;

		expect(11);

		m = new Model();
		propEqual(m.data, {}, 'normal init');
		m.addListener('change', function () {
			ok(false, 'should not be called');
		});
		ok(!m.unset('qwe'), 'nothing to remove');

		m = new Model({a:1,b:2});
		propEqual(m.data, {a:1,b:2}, 'normal init');

		m.addListener('change', function ( event ) {
			strictEqual(event.name, 'a', 'removal: name');
			strictEqual('prev' in event, true, 'removal: prev');
			strictEqual('curr' in event, false, 'removal: curr');
			strictEqual(event.prev, 1, 'removal: prev data');
			propEqual(m.data, {b:2}, 'result');
		});
		ok(m.unset('a'), 'do removal');
		ok(!m.unset('a'), 'do removal again');
		ok(!m.unset('qwe'), 'nothing to remove');
	});


/***/ },
/* 1 */
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__filename) {/**
	 * @module stb-model
	 *
	 * @author Stanislav Kalashnik <darkpark.main@gmail.com>
	 * @license GNU GENERAL PUBLIC LICENSE Version 3
	 */

	'use strict';

	var Emitter = __webpack_require__(/*! stb-emitter */ 2);


	/**
	 * Base model implementation.
	 *
	 * Represents domain-specific data or information that an application will be working with.
	 * A typical example is a user account (e.g name, avatar, e-mail) or a music track (e.g title, year, album).
	 * Holds information, but don’t handle behaviour and don’t format information or influence how data appears.
	 *
	 * @constructor
	 * @extends Emitter
	 *
	 * @param {Object} [data={}] init attributes
	 */
	function Model ( data ) {
		if ( true ) {
			if ( typeof this !== 'object' ) { throw new Error(__filename + ': must be constructed via new'); }
			if ( data && typeof data !== 'object' ) { throw new Error(__filename + ': wrong data type'); }
		}

		// parent constructor call
		Emitter.call(this);

		/**
		 * Model attributes with given data or empty hash table.
		 *
		 * @member {Object.<string, *>}
		 **/
		this.data = data || {};
	}


	// inheritance
	Model.prototype = Object.create(Emitter.prototype);
	Model.prototype.constructor = Model;


	/**
	 * Remove all attributes from the model event.
	 *
	 * @event Model#clear
	 *
	 * @type {Object}
	 * @property {Object} data old model attributes
	 */


	/**
	 * Remove all attributes from the model.
	 *
	 * @return {boolean} operation status
	 *
	 * @fires Model#clear
	 */
	Model.prototype.clear = function () {
		var data = this.data;

		if ( true ) {
			if ( typeof data !== 'object' ) { throw new Error(__filename + ': wrong data type'); }
		}

		// is there any data?
		if ( Object.keys(data).length > 0 ) {
			// reset
			this.data = {};

			// there are some listeners
			if ( this.events['clear'] ) {
				// notify listeners
				this.emit('clear', {data: data});
			}

			return true;
		}

		// nothing was done
		return false;
	};


	/**
	 * Set model data event.
	 *
	 * @event Model#init
	 *
	 * @type {Object}
	 * @property {Object} data new model attributes
	 */


	/**
	 * Clear and set model data.
	 *
	 * @param {Object} data attributes
	 * @return {boolean} operation status
	 *
	 * @fires Model#clear
	 * @fires Model#init
	 */
	Model.prototype.init = function ( data ) {
		if ( true ) {
			if ( typeof data !== 'object' ) { throw new Error(__filename + ': wrong data type'); }
		}

		// valid input
		if ( data ) {
			// reset data
			this.clear();

			// init with given data
			this.data = data;

			// there are some listeners
			if ( this.events['init'] ) {
				// notify listeners
				this.emit('init', {data: data});
			}

			return true;
		}

		// nothing was done
		return false;
	};


	/**
	 * Check an attribute existence.
	 *
	 * @param {string} name attribute
	 *
	 * @return {boolean} attribute exists or not
	 */
	Model.prototype.has = function ( name ) {
		if ( true ) {
			if ( typeof this.data !== 'object' ) { throw new Error(__filename + ': wrong this.data type'); }
		}

		// hasOwnProperty method is not available directly in case of Object.create(null)
		//return Object.hasOwnProperty.call(this.data, name);
		return this.data.hasOwnProperty(name);
	};

	/**
	 * Get a model attribute value by name.
	 *
	 * @param {string} name attribute
	 *
	 * @return {*} associated value
	 */
	Model.prototype.get = function ( name ) {
		if ( true ) {
			if ( typeof this.data !== 'object' ) { throw new Error(__filename + ': wrong this.data type'); }
		}

		return this.data[name];
	};


	/**
	 * Update or create a model attribute event.
	 *
	 * @event Model#change
	 *
	 * @type {Object}
	 * @property {string} name attribute name
	 * @property {*} [prev] old/previous attribute value (can be absent on attribute creation)
	 * @property {*} [curr] new/current attribute value (can be absent on attribute removal)
	 */


	/**
	 * Update or create a model attribute.
	 *
	 * @param {string} name attribute
	 * @param {*} value associated value
	 * @return {boolean} operation status (true - attribute value was changed/created)
	 *
	 * @fires Model#change
	 */
	Model.prototype.set = function ( name, value ) {
		var isAttrSet = name in this.data,
			emitData  = {name: name, curr: value};

		if ( true ) {
			if ( typeof this.data !== 'object' ) { throw new Error(__filename + ': wrong this.data type'); }
		}

		if ( isAttrSet ) {
			// update
			emitData.prev = this.data[name];
			// only if values are different
			if ( value !== emitData.prev ) {
				this.data[name] = value;

				// there are some listeners
				if ( this.events['change'] ) {
					// notify listeners
					this.emit('change', emitData);
				}

				return true;
			}
		} else {
			// create
			this.data[name] = value;

			// there are some listeners
			if ( this.events['change'] ) {
				// notify listeners
				this.emit('change', emitData);
			}

			return true;
		}

		// nothing was done
		return false;
	};


	/**
	 * Delete the given attribute by name.
	 *
	 * @param {string} name attribute
	 * @return {boolean} operation status (true - attribute was deleted)
	 *
	 * @fires Model#change
	 */
	Model.prototype.unset = function ( name ) {
		var isAttrSet = name in this.data,
			emitData;

		if ( true ) {
			if ( typeof this.data !== 'object' ) { throw new Error(__filename + ': wrong this.data type'); }
		}

		if ( isAttrSet ) {
			emitData = {name: name, prev: this.data[name]};
			delete this.data[name];

			// there are some listeners
			if ( this.events['change'] ) {
				// notify listeners
				this.emit('change', emitData);
			}

			return true;
		}

		// nothing was done
		return false;
	};


	if ( true ) {
		// expose to the global scope
		window.Model = Model;
	}


	// public
	module.exports = Model;

	/* WEBPACK VAR INJECTION */}.call(exports, "/index.js"))

/***/ },
/* 2 */
/*!********************************!*\
  !*** ./~/stb-emitter/index.js ***!
  \********************************/
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__filename) {/**
	 * @author Stanislav Kalashnik <darkpark.main@gmail.com>
	 * @license GNU GENERAL PUBLIC LICENSE Version 3
	 */

	'use strict';


	/**
	 * Base Events Emitter implementation.
	 *
	 * @see http://nodejs.org/api/events.html
	 * @constructor
	 */
	function Emitter () {
		if ( true ) {
			if ( typeof this !== 'object' ) { throw new Error(__filename + ': must be constructed via new'); }
		}

		/**
		 * Inner hash table for event names and linked callbacks.
		 * Manual editing should be avoided.
		 *
		 * @member {Object.<string, function[]>}
		 *
		 * @example
		 * {
		 *     click: [
		 *         function click1 () { ... },
		 *         function click2 () { ... }
		 *     ],
		 *     keydown: [
		 *         function () { ... }
		 *     ]
		 * }
		 **/
		this.events = {};
	}


	Emitter.prototype = {
		/**
		 * Bind an event to the given callback function.
		 * The same callback function can be added multiple times for the same event name.
		 *
		 * @param {string} name event identifier
		 * @param {function} callback function to call on this event
		 *
		 * @example
		 * var obj = new Emitter();
		 * obj.addListener('click', function ( data ) { ... });
		 * // one more click handler
		 * obj.addListener('click', function ( data ) { ... });
		 */
		addListener: function ( name, callback ) {
			if ( true ) {
				if ( arguments.length !== 2 ) { throw new Error(__filename + ': wrong arguments number'); }
				if ( typeof name !== 'string' || name.length === 0 ) { throw new Error(__filename + ': wrong or empty name'); }
				if ( typeof callback !== 'function' ) { throw new Error(__filename + ': wrong callback type'); }
			}

			// initialization may be required
			this.events[name] = this.events[name] || [];
			// append this new event to the list
			this.events[name].push(callback);
		},


		/**
		 * Add a one time listener for the event.
		 * This listener is invoked only the next time the event is fired, after which it is removed.
		 *
		 * @param {string} name event identifier
		 * @param {function} callback function to call on this event
		 */
		once: function ( name, callback ) {
			// current execution context
			var self = this;

			if ( true ) {
				if ( arguments.length !== 2 ) { throw new Error(__filename + ': wrong arguments number'); }
				if ( typeof name !== 'string' || name.length === 0 ) { throw new Error(__filename + ': wrong or empty name'); }
				if ( typeof callback !== 'function' ) { throw new Error(__filename + ': wrong callback type'); }
			}

			// initialization may be required
			this.events[name] = this.events[name] || [];
			// append this new event to the list
			this.events[name].push(function onceWrapper ( data ) {
				callback(data);
				self.removeListener(name, onceWrapper);
			});
		},


		/**
		 * Apply multiple listeners at once.
		 *
		 * @param {Object} callbacks event names with callbacks
		 *
		 * @example
		 * var obj = new Emitter();
		 * obj.addListeners({click: function ( data ) {}, close: function ( data ) {}});
		 */
		addListeners: function ( callbacks ) {
			var name;

			if ( true ) {
				if ( arguments.length !== 1 ) { throw new Error(__filename + ': wrong arguments number'); }
				if ( typeof callbacks !== 'object' ) { throw new Error(__filename + ': wrong callbacks type'); }
				if ( Object.keys(callbacks).length === 0 ) { throw new Error(__filename + ': no callbacks given'); }
			}

			// valid input
			if ( typeof callbacks === 'object' ) {
				for ( name in callbacks ) {
					if ( callbacks.hasOwnProperty(name) ) {
						this.addListener(name, callbacks[name]);
					}
				}
			}
		},


		/**
		 * Remove all instances of the given callback.
		 *
		 * @param {string} name event identifier
		 * @param {function} callback function to remove
		 *
		 * @example
		 * obj.removeListener('click', func1);
		 */
		removeListener: function ( name, callback ) {
			if ( true ) {
				if ( arguments.length !== 2 ) { throw new Error(__filename + ': wrong arguments number'); }
				if ( typeof name !== 'string' || name.length === 0 ) { throw new Error(__filename + ': wrong or empty name'); }
				if ( typeof callback !== 'function' ) { throw new Error(__filename + ': wrong callback type'); }
				if ( this.events[name] && !Array.isArray(this.events[name]) ) { throw new Error(__filename + ': corrupted inner data'); }
			}

			// the event exists and should have some callbacks
			if ( this.events[name] ) {
				// rework the callback list to exclude the given one
				this.events[name] = this.events[name].filter(function callbacksFilter ( fn ) { return fn !== callback; });
				// event has no more callbacks so clean it
				if ( this.events[name].length === 0 ) {
					// as if there were no listeners at all
					this.events[name] = undefined;
				}
			}
		},


		/**
		 * Remove all callbacks for the given event name.
		 * Without event name clears all events.
		 *
		 * @param {string} [name] event identifier
		 *
		 * @example
		 * obj.removeAllListeners('click');
		 * obj.removeAllListeners();
		 */
		removeAllListeners: function ( name ) {
			if ( true ) {
				if ( arguments.length !== 0 && (typeof name !== 'string' || name.length === 0) ) { throw new Error(__filename + ': wrong or empty name'); }
			}

			// check input
			if ( arguments.length === 0 ) {
				// no arguments so remove everything
				this.events = {};
			} else if ( name ) {
				if ( true ) {
					if ( this.events[name] ) { throw new Error(__filename + ': event is not removed'); }
				}

				// only name is given so remove all callbacks for the given event
				// but object structure modification should be avoided
				this.events[name] = undefined;
			}
		},


		/**
		 * Execute each of the listeners in the given order with the supplied arguments.
		 *
		 * @param {string} name event identifier
		 * @param {Object} [data] options to send
		 *
		 * @todo consider use context
		 *
		 * @example
		 * obj.emit('init');
		 * obj.emit('click', {src:panel1, dst:panel2});
		 *
		 * // it's a good idea to emit event only when there are some listeners
		 * if ( this.events['click'] ) {
		 *     this.emit('click', {event: event});
		 * }
		 */
		emit: function ( name, data ) {
			var event = this.events[name],
				i;

			if ( true ) {
				if ( arguments.length < 1 ) { throw new Error(__filename + ': wrong arguments number'); }
				if ( typeof name !== 'string' || name.length === 0 ) { throw new Error(__filename + ': wrong or empty name'); }
			}

			// the event exists and should have some callbacks
			if ( event ) {
				if ( true ) {
					if ( !Array.isArray(event) ) { throw new Error(__filename + ': wrong event type'); }
				}

				for ( i = 0; i < event.length; i++ ) {
					if ( true ) {
						if ( typeof event[i] !== 'function' ) { throw new Error(__filename + ': wrong event callback type'); }
					}

					// invoke the callback with parameters
					// http://jsperf.com/function-calls-direct-vs-apply-vs-call-vs-bind/6
					event[i].call(this, data);
				}
			}
		}
	};

	// correct constructor name
	Emitter.prototype.constructor = Emitter;


	if ( true ) {
		// expose to the global scope
		window.Emitter = Emitter;
	}


	// public
	module.exports = Emitter;

	/* WEBPACK VAR INJECTION */}.call(exports, "/index.js"))

/***/ }
/******/ ]);
//# sourceMappingURL=build.js.map

/**
 * @author Stanislav Kalashnik <darkpark.main@gmail.com>
 * @license GNU GENERAL PUBLIC LICENSE Version 3
 */

'use strict';

/** @private */
var Emitter = require('cjs-emitter');


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
	if ( DEBUG ) {
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

	if ( DEBUG ) {
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
	if ( DEBUG ) {
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
	if ( DEBUG ) {
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
	if ( DEBUG ) {
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

	if ( DEBUG ) {
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

	if ( DEBUG ) {
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


// public
module.exports = Model;

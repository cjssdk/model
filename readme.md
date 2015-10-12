STB SDK base model implementation
=================================

[![NPM version](https://img.shields.io/npm/v/stb-model.svg?style=flat-square)](https://www.npmjs.com/package/stb-model)
[![Dependencies Status](https://img.shields.io/david/stbsdk/model.svg?style=flat-square)](https://david-dm.org/stbsdk/model)
[![Gitter](https://img.shields.io/badge/gitter-join%20chat-blue.svg?style=flat-square)](https://gitter.im/DarkPark/stb)


Represents domain-specific data or information that an application will be working with.
A typical example is a user account (e.g name, avatar, e-mail) or a music track (e.g title, year, album).
Holds information, but don’t handle behaviour and don’t format information or influence how data appears.


## Installation

```bash
npm install stb-model
```


## Usage

Add the constructor to the scope:

```js
var Model = require('stb-model');
```

Create an empty instance:

```js
var model = new Model();
```

Create an instance with some data:

```js
var model = new Model({
	attr1: value1,
	attr2: value2,
});
```

Clear all data:

```js
model.clear();
```

> emits `clear` event in case some data is present

Clear and set new model data:

```js
model.init({
	attr3: value3,
	attr4: value4,
});
```

> can emit `clear` and `init` events

Check an attribute existence:

```js
if ( model.has('attr3') ) {
    ...
}
```

Get a model attribute value by name:

```js
var value = model.get('attr1');
```

Update or create a model attribute:

```js
var operationStatus = model.set('attr5', 'value5');
```

> emits `change` event with `prev` field in data in case of update operation

Delete the given attribute by name:

```js
var operationStatus = model.unset('attr5');
```

> emits `change` event



## Debug mode

> There is a global var `DEBUG` which activates additional consistency checks and protection logic not available in release mode.

In debug mode the constructor is exposed to the global namespace as `window.Model`.


## Contribution

If you have any problem or suggestion please open an issue [here](https://github.com/stbsdk/model/issues).
Pull requests are welcomed with respect to the [JavaScript Code Style](https://github.com/DarkPark/jscs).


## License

`stb-model` is released under the [GPL-3.0 License](http://opensource.org/licenses/GPL-3.0).

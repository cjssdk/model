Basic model implementation
==========================

[![build status](https://img.shields.io/travis/cjssdk/model.svg?style=flat-square)](https://travis-ci.org/cjssdk/model)
[![npm version](https://img.shields.io/npm/v/@cjssdk/model.svg?style=flat-square)](https://www.npmjs.com/package/@cjssdk/model)
[![dependencies status](https://img.shields.io/david/cjssdk/model.svg?style=flat-square)](https://david-dm.org/cjssdk/model)
[![devDependencies status](https://img.shields.io/david/dev/cjssdk/model.svg?style=flat-square)](https://david-dm.org/cjssdk/model?type=dev)
[![Gitter](https://img.shields.io/badge/gitter-join%20chat-blue.svg?style=flat-square)](https://gitter.im/DarkPark/cjssdk)
[![RunKit](https://img.shields.io/badge/RunKit-try-yellow.svg?style=flat-square)](https://npm.runkit.com/@cjssdk/model)


Represents domain-specific data or information that an application will be working with.
A typical example is a user account (e.g name, avatar, e-mail) or a music track (e.g title, year, album).
Holds information, but don’t handle behaviour and don’t format information or influence how data appears.

`@cjssdk/model` extends [Emitter](https://github.com/cjssdk/emitter) interface.


## Installation ##

```bash
npm install @cjssdk/model
```


## Usage ##

Add the constructor to the scope:

```js
var Model = require('@cjssdk/model');
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
    /* ... */
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


## Performance notes ##

It is highly advisable to access a model data directly in case **no events are required**.

So instead of

```js
var value = model.get('attr1');
model.set('attr5', 'value5');
```

to avoid performance penalty it's better to use

```js
var value = model.data.attr1;
model.data.attr5 = 'value5';
```



## Development mode ##

> There is a global var `DEVELOP` which activates additional consistency checks and protection logic not available in release mode.


## Contribution ##

If you have any problems or suggestions please open an [issue](https://github.com/cjssdk/model/issues)
according to the contribution [rules](.github/contributing.md).


## License ##

`@cjssdk/model` is released under the [MIT License](license.md).

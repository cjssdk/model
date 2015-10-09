Model component
===============

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

Create an instance:

```js
var model = new Model();
```


## Debug mode

> There is a global var `DEBUG` which activates additional consistency checks and protection logic not available in release mode.

In debug mode the constructor is exposed to the global namespace as `window.Model`.


## Contribution

If you have any problem or suggestion please open an issue [here](https://github.com/stbsdk/model/issues).
Pull requests are welcomed with respect to the [JavaScript Code Style](https://github.com/DarkPark/jscs).


## License

`stb-model` is released under the [GPL-3.0 License](http://opensource.org/licenses/GPL-3.0).

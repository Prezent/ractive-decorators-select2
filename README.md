Ractive.js select2 decorator plugin
======================================================

Integrate Select2 with Ractive, including two-way binding.

*Find more Ractive.js plugins at [ractivejs.org/plugins](http://ractivejs.org/plugins)*

[See the demo here.](http://prezent.github.io/ractive-decorators-select2/)

Usage
-----

Include this file on your page below Ractive, e.g:

```html
<script src='lib/ractive.js'></script>
<script src='lib/ractive-decorators-select2.js'></script>
```

Or, if you're using a module loader, require this module:

```js
// requiring the plugin will 'activate' it - no need to use the return value
require( 'ractive-decorators-select2' );
```

Add the decorator to your select elements:

```html
<select decorator='select2' value='{{selected}}'>
    {{#options}}
        <option value='{{.}}'>{{.}}</option>
    {{/options}}
</select>
```

Add option objects to the `type` property to set select2 constructor options:

```js
Ractive.decorators.select2.type.demo = {
    width: '25%',
    // ... other select2 options
};
```

```html
<select decorator='select2:demo' value='{{selected}}'>
    {{#options}}
        <option value='{{.}}'>{{.}}</option>
    {{/options}}
</select>
```

You can also use a function that returns an options object. The function is passed the DOM node the select2 applies to:

```js
Ractive.decorators.select2.type.demo = function (node) {
    return {
        width: '25%',
        // ... other select2 options
    }
};
```

License
-------

Copyright (c) 2014 [Prezent Internet B.V.](http://www.prezent.nl). Licensed MIT

Created with the [Ractive.js plugin template](https://github.com/ractivejs/plugin-template) for Grunt.

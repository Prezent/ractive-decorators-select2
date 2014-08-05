/*

	ractive-decorators-select2
	=============================================

	Integrate Ractive with Select2

	==========================

	Troubleshooting: If you're using a module system in your app (AMD or
	something more nodey) then you may need to change the paths below,
	where it says `require( 'ractive' )` or `define([ 'ractive' ]...)`.

	==========================

	Usage: Include this file on your page below Ractive, e.g:

	    <script src='lib/ractive.js'></script>
	    <script src='lib/ractive-decorators-select2.js'></script>

	Or, if you're using a module loader, require this module:

	    // requiring the plugin will 'activate' it - no need to use
	    // the return value
	    require( 'ractive-decorators-select2' );

*/

(function ( global, factory ) {

	'use strict';

	// Common JS (i.e. browserify) environment
	if ( typeof module !== 'undefined' && module.exports && typeof require === 'function' ) {
		factory( require( 'ractive' ), require( 'jquery' ) );
	}

	// AMD?
	else if ( typeof define === 'function' && define.amd ) {
		define([ 'ractive', 'jquery' ], factory );
	}

	// browser global
	else if ( global.Ractive && global.jQuery) {
		factory( global.Ractive, global.jQuery );
	}

	else {
		throw new Error( 'Could not find Ractive or jQuery! They must be loaded before the ractive-decorators-select2 plugin' );
	}

}( typeof window !== 'undefined' ? window : this, function ( Ractive, $ ) {

	'use strict';

    var select2Decorator;

    select2Decorator = function (node, type) {

        var ractive = node._ractive.root;
        var setting = false;
        var observer;

        var options = {};
        if (type) {
            if (!select2Decorator.type.hasOwnProperty(type)) {
                throw new Error( 'Ractive Select2 type "' + type + '" is not defined!' );
            }

            options = select2Decorator.type[type];
            if (typeof options === 'function') {
                options = options.call(this, node);
            }
        }

        // Push changes from ractive to select2
        if (node._ractive.binding) {
            observer = ractive.observe(node._ractive.binding.keypath, function (newvalue) {
                if (!setting) {
                    setting = true;
                    window.setTimeout(function () {
                        if (newvalue === "")
                            $(node).select2("val", "");
                        
                        $(node).change();
                        setting = false;
                    }, 0);
                }
            });
        }

        // Pull changes from select2 to ractive
        $(node).select2(options).on('change', function () {
            if (!setting) {
                setting = true;
                ractive.updateModel();
                setting = false;
            }
        });

        return {
            teardown: function () {
                $(node).select2('destroy');

                if (observer) {
                    observer.cancel();
                }
            }
        };
    };

    select2Decorator.type = {};

    Ractive.decorators.select2 = select2Decorator;

}));

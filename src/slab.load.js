// Chiel Kunkels (@chielkunkels)

(function(context){
'use strict';

if (!context.slab) {
	context.slab = {};
}

var options = {
	tplRoot: '/tpl'
};

var templates = {};

// configure slab.load
context.slab.loadOptions = function(opts){
	Object.each(opts, function(v, k){
		options[k] = v;
	});
};

// register available templates
context.slab.register = function(tplObject){
	Object.each(tplObject, function(fn, key){
		templates[key] = fn;
	});
};

// load a template by name
context.slab.load = function(name){
	if (templates[name]) {
		return templates[name];
	}

	var tplString = null;
	new Request({
		url: options.tplRoot+'/'+name+'.slab',
		method: 'get',
		async: false,
		onComplete: function(){},
		onSuccess: function(response){
			tplString = response;
		},
		onFailure: function(){}
	}).send();

	return context.slab.compile(tplString)[name];
};

})(typeof exports != 'undefined' ? exports : this);

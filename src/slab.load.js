/*
slab.run.js

author: @chielkunkels
*/

(function(slab){
'use strict';

var options = {
	tplRoot: '/tpl'
};

var templates = {};

// configure slab.load
var loadOptions = function(options){
	console.log(loadOptions);
};

// register available templates
var register = function(tplObject){
	Object.each(tplObject, function(fn, key){
		templates[key] = fn;
	});
};

// load a template by name
var load = function(name){
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

	return slab.compile(tplString)[name];
};

slab.loadOptions = loadOptions;
slab.register = register;
slab.load = load;

})(typeof window.slab === 'undefined' ? (window.slab = {}) : window.slab);

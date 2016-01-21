'use strict';

var fs = require('fs');
var path = require('path');
var gutil = require('gulp-util');
var through = require('through2');

var PLUGIN_NAME = 'gulp-imageisux-poll';


module.exports = function(dest) {
	var duration;
	
	function exist(filePath, callback) {
		fs.stat(filePath, function(err) {
			if ( !err ) {
				callback();
			} else {
				if ( duration += 100 > 15000 ) { // Timeout
					callback(true);
				} else {
					setTimeout(function() {
						exist(filePath, callback);
					}, 100)
				}
			}
		})
	}

	return through.obj(function(file, enc, cb) {
		if ( file.isNull() ) {
			return cb(null, file);
		}
		
		// Resolve the dest path
		var filePath = path.resolve(file.base, dest, path.relative(file.base, file.path));
		duration = 0;
		exist(filePath, function(err) {
			if ( err ) {
				return cb(new gutil.PluginError(PLUGIN_NAME, 'File ' + file.name + ' is not exist.'));
			} else {
				cb(null, file)
			}
		});
	});
};
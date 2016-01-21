## Waiting till gulp-imageisux truly complete its work.

```
npm i gulp-imageisux-poll --save-dev
```

Append the code to imageisux plugin.

``` js
gulp.task('isux', function() {
	var dest = '_min';

	return gulp.src(['dist/img/**', '!dist/img/' + dest])
		.pipe(imageisux(dest, false))
		.pipe(imageisuxPoll(dest));
});
```
const gulp = require('gulp'),
	sass = require('gulp-sass'),
	browsersync = require('browser-sync').create(),
	del = require('del'),
	imagemin = require('gulp-imagemin'),
	autoprefixer = require('gulp-autoprefixer'),
	csso = require('gulp-csso'),
	pug = require('gulp-pug'),
	data = require('gulp-data'),
	htmlmin = require('gulp-htmlmin'),
	uglify = require('gulp-uglify'),
	concat = require('gulp-concat'),
	babel = require('gulp-babel'),
	pump = require('pump');


const path = {
	build: './build',
	css: {
		source: './source/styles/main.+(scss|sass)',
		dest: './build/styles/',
		watchSource: './source/styles/**/*.scss',
	},
	html: {
		source: './source/pages/*.pug',
		dest: './build/',
		watchSource: './source/pages/**/*.pug',
	},
	scripts: {
		source: './source/js/**/*',
		dest: './build/js/',
		watchSource: './source/js/**/*.js',
	},
	images: {
		source: './source/img/**/*',
		dest: './build/img/',
	},
	fonts: {
		source: './source/fonts/**/*',
		dest: './build/fonts/',
	},
};

// Clean
gulp.task('clean', done => {
	del.sync(path.build);
	done();
});

// Css
gulp.task('css', done => {
	gulp
		.src(path.css.source)
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer(['last 5 versions', '> 1%', 'ie 8', 'ie 7'], {
			cascade: true
		}))
		.pipe(csso())
		.pipe(gulp.dest(path.css.dest))
		.pipe(browsersync.stream());
	done();
});

// De-caching for Data files
function requireUncached($module) {
	delete require.cache[require.resolve($module)];
	return require($module);
}

// Html
gulp.task('html', done => {
	gulp
		.src(path.html.source)
		.pipe(data(() => {
			return requireUncached('./source/data.json')
		}))
		.pipe(pug())
		.pipe(htmlmin({
			collapseWhitespace: true
		}))
		.pipe(gulp.dest(path.build))
		.pipe(browsersync.stream());
	done();
});

// Scripts
gulp.task('scripts', cb => {
	pump([
			gulp.src(path.scripts.source),
			babel({
				presets: ['@babel/env']
			}),
			concat('script.js'),
			uglify(),
			gulp.dest(path.scripts.dest),
		],
		cb,
	);
});

// Images
gulp.task('images', done => {
	gulp
		.src(path.images.source)
		.pipe(imagemin([
			imagemin.gifsicle({
				interlaced: true
			}),
			imagemin.optipng({
				optimizationLevel: 5
			}),
			imagemin.svgo({
				plugins: [{
						removeViewBox: true
					},
					{
						cleanupIDs: false
					},
				],
			}),
		]))
		.pipe(gulp.dest(path.images.dest));
	done();
});

//Fonts
gulp.task('fonts', done => {
	gulp
		.src(path.fonts.source)
		.pipe(gulp.dest(path.fonts.dest));
	done();
});

// BrowserSync
function reload(done) {
	browsersync.reload();
	done();
}

gulp.task('browser-sync', done => {
	browsersync.init({
		server: {
			baseDir: path.build,
		},
		notify: false,
	});
	done();
});

// Watch files
gulp.task('watch', done => {
	gulp.watch(path.css.watchSource, gulp.series('css', reload));
	gulp.watch(path.html.watchSource, gulp.series('html', reload));
	gulp.watch(path.scripts.watchSource, gulp.series('scripts', reload));
	done();
});

gulp.task('default', gulp.parallel('clean', 'css', 'html', 'scripts', 'fonts', 'images', 'browser-sync', 'watch'));
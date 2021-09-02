var gulp = require('gulp');
// var sass = require('gulp-sass'); //Sassコンパイル
var sass = require('gulp-sass')(require('sass'));
var plumber = require('gulp-plumber'); //エラー時の強制終了を防止
var notify = require('gulp-notify'); //エラー発生時にデスクトップ通知する
var sassGlob = require('gulp-sass-glob'); //@importの記述を簡潔にする
var browserSync = require('browser-sync'); //ブラウザ反映
var imagemin = require('gulp-imagemin');
var optipng = require('imagemin-optipng');
var mozjpeg = require('imagemin-mozjpeg');

var sourcemaps = require('gulp-sourcemaps')
const typescript = require('gulp-typescript');
var pug = require("gulp-pug");

// scssのコンパイル
gulp.task('sass', function () {
    return gulp
        .src('./src/scss/style/**/*.scss',{sourcemaps: true})
        .pipe(plumber({ errorHandler: notify.onError("Error: <%= error.message %>") }))//エラーチェック
        .pipe(sassGlob())//importの読み込みを簡潔にする
        .pipe(sass({
            outputStyle: 'expanded' //expanded, nested, campact, compressedから選択
        }))
        .pipe(gulp.dest('./dist/css',{sourcemaps: true}));//コンパイル後の出力先
});
// 保存時のリロード
gulp.task('browser-sync', function (done) {
    browserSync.init({
        //ローカル開発
        server: {
            baseDir: "./dist",
            index: "index.html"
        }
    });
    done();
});
gulp.task('bs-reload', function (done) {
    browserSync.reload();
    done();
});


gulp.task('ts',  () => {
    return gulp
        .src('./src/ts/main/**/*')
        .pipe(sourcemaps.init())
        .pipe(typescript())
        .js
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./dist/js'));
});


gulp.task('pug', function (done) {
    gulp.src('src/**/*.pug')
    .pipe(plumber({ errorHandler: notify.onError("Error: <%= error.message %>") }))//エラーチェック
    .pipe(pug({pretty: true}))
    .pipe(gulp.dest('./dist'))
    done()
});

// 監視
gulp.task('watch', function (done) {
    gulp.watch('./src/ts/**/*.ts', gulp.task('ts')); //tsが更新されたらgulp sassを実行
    gulp.watch('./src/ts/**/*.ts', gulp.task('bs-reload')); //tsが更新されたらgulp sassを実行
    gulp.watch('./src/**/*.pug', gulp.task('pug')); //htmlが更新されたらgulp sassを実行
    gulp.watch('./src/**/*.pug', gulp.task('bs-reload')); //htmlが更新されたらgulp sassを実行
    gulp.watch('./src/scss/**/*.scss', gulp.task('sass')); //sassが更新されたらgulp sassを実行
    gulp.watch('./src/scss/**/*.scss', gulp.task('bs-reload')); //sassが更新されたらbs-reloadを実行
});
// default
gulp.task('default', gulp.series(gulp.parallel('browser-sync', 'watch')));
//圧縮率の定義
var imageminOption = [
    optipng({ optimizationLevel: 5 }),
    mozjpeg({ quality: 85 }),
    imagemin.gifsicle({
        interlaced: false,
        optimizationLevel: 1,
        colors: 256
    }),
    imagemin.mozjpeg(),
    imagemin.optipng(),
    imagemin.svgo()
];
// 画像の圧縮
// $ gulp imageminで./src/img/base/フォルダ内の画像を圧縮し./src/img/フォルダへ
// .gifが入っているとエラーが出る
gulp.task('imagemin', function () {
    return gulp
        .src('./src/img/*.{png,jpg,jpeg,gif,svg}')
        .pipe(imagemin(imageminOption))
        .pipe(gulp.dest('./dist/img'));
});
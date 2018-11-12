module.exports = function (grunt) {
    var shopId = grunt.option('shopId') || 1,
        file = '/app/web/cache/config_' + Number(shopId) + '.json',
        config = grunt.file.readJSON(file),
        lessTargetFile = {},
        jsFiles = [],
        jsTargetFile = {},
        content = '',
        variables = {};

    lessTargetFile['/app/' + config.lessTarget] = '/app/web/cache/all.less';

    config['js'].forEach(function (item) {
        jsFiles.push('/app/' + item);
    });
    jsTargetFile['/app/' + config.jsTarget] = jsFiles;

    config['less'].forEach(function (item) {
        content += '@import "/app/' + item + '";';
        content += "\n";
    });
    grunt.file.write('/app/web/cache/all.less', content);

    for (var key in config.config) {
        variables[key] = config.config[key];
    }

    grunt.initConfig({
        uglify: {
            production: {
                options: {
                    compress: true,
                    preserveComments: false
                },
                files: jsTargetFile
            },
            development: {
                options: {
                    mangle: false,
                    compress: false,
                    beautify: true,
                    preserveComments: 'all'
                },
                files: jsTargetFile
            }
        },
        browserSync: {
            dev: {
                bsFiles: {
                    src: [
                        '/app/web/cache/*.css',
                        '/app/web/cache/*.js',
                        '/app/themes/Frontend/**/*.tpl'
                    ]
                },
                options: {
                    open: false,
                    watchTask: true,
                    reloadOnRestart: true,
                    ws: true,
                    proxy: process.env.SYNC_PROXY_HOST,
                    socket: {
                        domain: process.env.SYNC_WS_PROXY_HOST
                    }
                }
            }
        },
        less: {
            production: {
                options: {
                    compress: true,
                    modifyVars: variables,
                    relativeUrls: true
                },
                files: lessTargetFile
            },
            development: {
                options: {
                    modifyVars: variables,
                    dumpLineNumbers: 'all',
                    relativeUrls: true,
                    sourceMap: true,
                    sourceMapFileInline: true,
                    sourceMapRootpath: '/app/'
                },
                files: lessTargetFile
            }
        },
        watch: {
            less: {
                files: [
                    '/app/engine/Shopware/Plugins/**/*.less',
                    '/app/custom/plugins/**/*.less',
                    '/app/themes/Frontend/**/*.less'
                ],
                tasks: ['less:development'],
                options: {
                    spawn: false
                }
            },
            js: {
                files: [
                    '/app/themes/Frontend/**/_public/src/js/*.js',
                    '/app/engine/Shopware/Plugins/**/frontend/**/src/js/**/*.js',
                    '/app/custom/plugins/**/frontend/**/src/js/**/*.js'
                ],
                tasks: ['uglify:development', 'eslint'],
                options: {
                    spawn: false
                }
            }
        },
        eslint: {
            src: [
                'Gruntfile.js',
                '/app/themes/Frontend/' + process.env.THEME + '/frontend/_public/src/js/*.js'
            ]
        }
    });

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-chokidar');
    grunt.loadNpmTasks('gruntify-eslint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-browser-sync');

    grunt.registerTask('production', [ 'eslint', 'less:production', 'uglify:production' ]);
    grunt.registerTask('default', [ 'less:development', 'uglify:development', 'browserSync', 'watch' ]);
};

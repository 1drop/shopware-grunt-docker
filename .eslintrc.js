module.exports = {
    'extends': 'standard',
    'root': true,
    'env': {
        'browser': true,
        'jquery': true
    },
    'plugins': ['compat'],
    'browserslist': ['last 3 versions', 'ie > 10'],
    'globals': {
        'jQuery': true,
        'StateManager': true,
        'picturefill': true,
        'StorageManager': true,
        'Modernizr': true
    },
    'rules': {
        'compat/compat': 'error',
        'arrow-parens': 0,
        'space-before-function-paren': 0,
        'keyword-spacing': [
            'warn'
        ],
        'padded-blocks': [
            'warn'
        ],
        'space-in-parens': [
            'warn'
        ],
        'generator-star-spacing': 0,
        'no-shadow-restricted-names': 0,
        'no-console': [
            'error',
            {
                'allow': ['warn', 'error']
            }
        ],
        'eqeqeq': 0,
        'no-debugger': 0,
        'semi': [
            'error',
            'always'
        ],
        'one-var': [
            'error',
            'never'
        ],
        'indent': [
            'error',
            4
        ]
    }
};

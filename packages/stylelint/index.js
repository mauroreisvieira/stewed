module.exports = {
    extends: ['stylelint-config-standard', 'stylelint-config-recess-order'],
    plugins: ['stylelint-scss'],
    rules: {
        'font-family-name-quotes': 'always-where-recommended',
        'function-url-quotes': 'never',
        'selector-pseudo-class-disallowed-list': ['root'],
        'string-quotes': 'double',
        'declaration-property-unit-allowed-list': {
            'font-size': ['rem', 'px'],
        },
        'at-rule-no-vendor-prefix': true,
        'media-feature-name-no-vendor-prefix': true,
        'selector-no-vendor-prefix': true,
        'value-no-vendor-prefix': true,
        'max-nesting-depth': [
            4,
            {
                ignore: ['blockless-at-rules'],
            },
        ],
        'selector-max-specificity': '0,4,1',
        'at-rule-disallowed-list': ['extend'],
        'property-no-unknown': [
            true,
            {
                ignoreProperties: ['contain', 'overscroll-behavior'],
            },
        ],
        'selector-max-id': 0,
        'selector-no-qualifying-type': true,
        'selector-max-type': [
            0,
            {
                ignore: 'descendant',
            },
            {
                ignoreTypes: ['fieldset'],
            },
        ],
        'selector-max-universal': 0,
        'font-weight-notation': 'named-where-possible',
        'function-url-no-scheme-relative': true,
        'number-leading-zero': 'never',
        'no-invalid-position-at-import-rule': null,
        'value-keyword-case': null,
        'scss/selector-no-redundant-nesting-selector': true,
        'scss/at-import-no-partial-leading-underscore': true,
        'at-rule-no-unknown': null,
        'scss/at-rule-no-unknown': true,
    },
};

module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true
    },

    "extends": "eslint:recommended",

    globals: {
        // 这里填入你的项目需要的全局变量
        // jQuery: false,
        $: false,
        wx: false,
    },

    "parserOptions": {
        "ecmaFeatures": {
            "jsx": false
        },
        "sourceType": "module"
    },

    "rules": {
        "indent": ["error","tab"],

        "linebreak-style": ["error","unix"],

        "quotes": ["error","single"],

        "semi": ["error","always"],

        "semi": ["error","always"],

        "arrow-spacing": ["error", { "before": true, "after": true }],

        "no-unused-vars": "off", //禁止提示没有使用的变量，或者函数

        "block-spacing": "error",

        "no-console": "off", //可以使用console

        "keyword-spacing": ["error", { "before": true }] //强制关键字周围空格的一致性

    }
};

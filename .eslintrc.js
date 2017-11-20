module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true
    },

    "extends": "eslint:recommended",

    globals: {
        // 这里填入你的项目需要的全局变量
        // 这里值为 false 表示这个全局变量不允许被重新赋值，比如：
        //
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
        "indent": [
            "error",
            "tab"
        ],

        "linebreak-style": [
            "error",
            "unix"
        ],

        "quotes": [
            "error",
            "single"
        ],

        "semi": [
            "error",
            "always"
        ]
    }
};

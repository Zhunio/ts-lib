const { resolve } = require('path');
const merge       = require('webpack-merge');

const { HotModuleReplacementPlugin } = require('webpack');

const ProgressBarPlugin      = require('progress-bar-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const WebpackShellPlugin     = require('webpack-shell-plugin');

const app    = 'lib.ts';
const bundle = 'lib.js';

const entryPoint = resolve(__dirname, 'src', app);
const bundlePath = resolve(__dirname, 'dist');

const base = {
    entry: entryPoint,

    output: {
        filename: bundle,
        path: bundlePath,
        globalObject: 'this',
        library: 'lib',
    },

    devtool: 'source-map',

    stats: 'minimal',

    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.json'],
    },

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },

    plugins: [
        new CleanWebpackPlugin(),
        new ProgressBarPlugin()
    ],

    externals: {
        leaflet: {
            root: 'L'
        }
    }
};

const production = (env, argv) => {
    return {
        mode: 'production',
    }
};

const development = (env, argv) => {
    return {
        mode: 'development',

        watch: true,

        plugins: [
            new HotModuleReplacementPlugin(),
            new WebpackShellPlugin({
                onBuildEnd: ['nodemon dist/' + bundle]
            })
        ]
    }
};

module.exports = (env, argv) => {
    let config;

    if (argv.mode === 'production')
        config = merge(base, production(env, argv));
    else
        config = merge(base, development(env, argv));

    return config;
};

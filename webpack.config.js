const { resolve, join } = require('path');

const merge   = require('webpack-merge');

const HtmlWebpackPlugin      = require('html-webpack-plugin');
const UnminifiedWebpackPlugin = require('unminified-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const app    = 'lib.ts';
const bundle = 'lib.min.js';

const entryPoint = resolve(__dirname, 'src', app);
const bundlePath = resolve(__dirname, 'dist');

const base = {
    entry: entryPoint,

    output: {
        filename: bundle,
        path: bundlePath,
        globalObject: 'this',
        library: 'lib',
        libraryTarget: 'window',
    },

    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.json'],
    },

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
                options: {
                    // override tsconfig.json options
                    compilerOptions: {
                        declaration: false,
                    }
                }
            },
        ],
    },

    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        }),
        new UnminifiedWebpackPlugin()
    ],

    stats: {
        modules: false,
        entrypoints: false,
        children: false
    },

    externals: {
        leaflet: 'L'
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

        devtool: 'source-map',

        devServer: {
            contentBase: join(__dirname, 'dist'),
        },
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

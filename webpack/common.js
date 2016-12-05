import cssImport from 'postcss-import';
import cssAutoPrefixer from 'autoprefixer';
import cssPxToRem from 'postcss-pxtorem';
import cssNesting from 'postcss-nesting';
import cssNested from 'postcss-nested';
import cssModulesValues from 'postcss-modules-values';

class BuildCompletePlugin {

  constructor(callback) {
    this.firstBuild = true;
    this.callback = callback;
  }

  apply(compiler) {
    compiler.plugin('done', () => {
      if (this.firstBuild) {
        setTimeout(this.callback, 100);
        this.firstBuild = false;
      }
    });
  }
}

function rewriteSourceMaps({ protocol, host, port }) {
  return (info) => {
    let path = info.resourcePath;

    if (!path) {
      return '';
    }
    if (/^\.\//.test(path)) {
      path = path.replace(/^\.\//, '');
    }
    if (/^~/.test(path)) {
      return '';
    }
    if (/^external/.test(path)) {
      return '';
    }
    if (/(ignored)$/.test(path)) {
      return '';
    }
    if (/\.css$/.test(path)) {
      return '';
    }
    if (/webpack/.test(path)) {
      return '';
    }

    let sourceMapPath = '';
    if (protocol) {
      sourceMapPath += `${protocol}://`;
    }
    if (host) {
      sourceMapPath += `${host}`;
    } else {
      sourceMapPath += `${process.cwd()}`;
    }
    if (port) {
      sourceMapPath += `:${port}`;
    }
    sourceMapPath += `/${path}`;

    return sourceMapPath;
  };
}

const statsConfig = {
  version: false,
  hash: false,
  timings: false,
  chunks: false,
  chunkModules: false,
};

const commonConfig = {
  cache: true,

  postcss(webpack) {
    return [
      cssImport({ addDependencyTo: webpack }),
      cssNested(),
      cssNesting(),
      cssPxToRem(),
      cssAutoPrefixer({
        browsers: [
          'last 2 Chrome versions',
          'Explorer >= 10',
          'last 2 Firefox versions',
          'Safari >= 8',
        ],
      }),
      cssModulesValues,
    ];
  },

  module: {
    noParse: /\.min\.js/,
    loaders: [{
      test: /\.ico$/,
      loader: 'file?name=[name].[ext]',
    }],
  },
};

export { commonConfig, statsConfig, BuildCompletePlugin, rewriteSourceMaps };

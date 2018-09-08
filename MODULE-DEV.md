# some-impletement-imitation
Some impletement imitation, just for my interest

## Version define
see: https://semver.org/lang/zh-CN/?spm=a2c4e.11153940.blogcont592213.15.1f067eedo6OI6g

## Dev Tool
### Rollup/Webpack
Preferred to use rollup, see: https://github.com/rollup/rollup
https://www.rollupjs.com/guide/zh
```bash
npm i -g rollup
```
use pkg.module

> `es` output use external and `umd` output do not use

### Unpkg
CDN
use pkg.unpkg


## Compatibility

### IE not supported, need polyfill
#### function 
`Array.prototype.includes`

`Array.prototype.find`

`String.prototype.includes`

`String.prototype.startsWith`

`String.prototype.endsWith`

`Object.prototype.assign`

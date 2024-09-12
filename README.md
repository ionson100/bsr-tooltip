# bsr-tooltip

> React component tooltip

[![NPM](https://img.shields.io/npm/v/bsr-tooltip.svg)](https://www.npmjs.com/package/bsr-tooltip-menu) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save bsr-tooltip
```

## Usage

```tsx
import {useRef} from "react";
import {useToolTip} from 'bsr-tooltip'
import 'bsr-tooltip/dist/index.css'

export default function P11_1 (){
    const mRefDiv=useRef<HTMLDivElement>(null)
    useToolTip(mRefDiv,'Simple Text')
    return <div ref={mRefDiv} style={{padding:50,background:'grey',width:0,height:0}}></div>
}
```

## License

MIT © [ionson100](https://github.com/ionson100)



[Examples, Help pages](https://ionson100.github.io/wwwroot/index.html#page=11-1).

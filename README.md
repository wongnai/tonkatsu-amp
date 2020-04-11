```
________            ______        _____                     _____________  __________ 
___  __/_______________  /_______ __  /___________  __      ___    |__   |/  /__  __ \
__  /  _  __ \_  __ \_  //_/  __ `/  __/_  ___/  / / /________  /| |_  /|_/ /__  /_/ /
_  /   / /_/ /  / / /  ,<  / /_/ // /_ _(__  )/ /_/ /_/_____/  ___ |  /  / / _  ____/ 
/_/    \____//_/ /_//_/|_| \__,_/ \__/ /____/ \__,_/        /_/  |_/_/  /_/  /_/      
                                                                                      
```


[![Build Status](https://travis-ci.com/wongnai/tonkatsu-amp.svg?branch=master)](https://travis-ci.com/wongnai/tonkatsu-amp)
[![GitHub license](https://flat.badgen.net/badge/license/MIT/blue)](https://github.com/wongnai/tonkatsu-amp/blob/master/LICENSE)
![Typed with TypeScript](https://flat.badgen.net/badge/-/typescript?icon=typescript&label)


## Installation
```
npm i tonkatsu-amp
```

## Documentation
The documentation is divided into several sections:
* TBA
* TBA

## Examples
Image tag `<img />`  

From
```
<img src="https://picsum.photos/id/59/1920/1080" />
```

To
```
<div style="width: 100vw; margin: 0 calc(50% - 50vw);">
    <amp-img src="https://picsum.photos/id/59/1920/1080" layout="responsive" width="1920" height="1080"></amp-img>
</div>
```

Twitter ``

From
```
<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr" xml:lang="en">Our previous NYE tweet was in poor taste &amp; does not reflect our values. We apologize. We are dedicated to the security of America &amp; allies.</p>\n<p>— US Strategic Command (@US_Stratcom) <a href="https://twitter.com/US_Stratcom/status/1079881433072717824?ref_src=twsrc%5Etfw">December 31, 2018</a></p></blockquote>'
```

```
<amp-twitter layout="responsive" width="1920" height="1280" data-tweetid="1079881433072717824"></amp-twitter>
```

## Contributing
TBA

### [Code of Conduct]()

### [Contributing Guide]()

## License
(C) 2019 Wongnai Media Co, Ltd.  

Tonkatsu-AMP is [MIT licensed](https://github.com/wongnai/tonkatsu-amp/blob/master/LICENSE).

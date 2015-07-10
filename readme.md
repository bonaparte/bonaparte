# Bonaparte - Backend UI Framework

[Kitchen-Sink](https://github.dowjones.net/pages/newsroomdevelopment/bonaparte/examples/kitchen-sink.html)
<br>
[Toolbar](https://github.dowjones.net/pages/newsroomdevelopment/bonaparte/examples/toolbar.html)
<br>
[Xavier](https://github.dowjones.net/pages/newsroomdevelopment/bonaparte/examples/Xavier.html)

### Use

- Download / Clone Repository.
- Include files: 

  ```
  ./dist/SUI/semantic.min.css
  ./dist/bonaparte.css

  ./dist/SUI/semantic.min.js
  ./dist/bonaparte.js
  ```

## SUI

### Install / Build

- Run `npm install` in `./`. _(Select **NO** for all options for fastes result)_

### Development

> __One doesn't simply work in `dist/` directly.__ <br>
> _- Wise Man_

- Install / Build SUI.
- Run `gulp SUI-watch` to watch `.SUI/ui/` and keep `dist/` up to date.
- Work in `ui/`. _( Theme: `./ui/src/themes/bonaparte/` )_

### Build Docs 

- Install / Build SUI.
- Run `npm install` in `./SUI/docs/`.
- Follow Instructions: https://github.com/Semantic-Org/Semantic-UI-Docs.


## Bonaparte

### Install / Build

- Run `npm install` in `./`.

### Development

> __One doesn't simply work in `dist/` directly.__ <br>
> _- Wise Man_

- Run `gulp BPA-watch` to watch `./src/` and keep `./dist/` up to date.


## Tags

```html
<toolbar
  cornerstone=[top|bottom][left|right][outside]?

  extends:sidebar
>

  <!-- Required -->
  <1st-child sidebar />
  <2nd-child content /> 

  <!-- Optional -->
  <cornerstone-bonaparte />

</toolbar-bonaparte>
```

```html
<sidebar
  sidebar=[left|top|right|bottom]
  size=[value][px|%|rem|em]
  open=[true|false]
>

  <!-- Required -->
  <1st-child sidebar />
  <2nd-child content /> 
  
</sidebar-bonaparte>
```

```html
<!-- only as direct child of <toolbar-bonaparte> -->
<cornerstone-bonaparte
  open=[false|true]
>
</cornerstone-bonaparte>
```

```html
<!-- parent element must not be position:static -->
<panel-bonaparte
  position=[left|top|right|bottom]
  open=[false|true]
>
</panel-bonaparte>

<!-- events -->
"bonaparte.panel.open"
"bonaparte.panal.close"

```

```html
<!-- parent element must not be position:static -->
<scroll-bonaparte
  scrollBar=[hover|visible|hidden|native]
>

  <!-- Required -->
  <1st-child content />

</scroll-bonaparte>
```

```html

<button-bonaparte
  target=[querySelector]
  action=[event]
  toggle=[false|true]?[attribute]*
  trigger=[event]
  bubbles=[true|false]
  
  target-[attribute]=[value]
>
</button-bonaparte>
```

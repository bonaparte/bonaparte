# Bonaparte - Backend UI Framework

[DEMO Kitchen-Sink](https://github.dowjones.net/pages/adrianp/bonaparte/dist/examples/kitchen-sink)

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
  sidebar=[top|right|bottom|left]
  cornerstone=[top|bottom][right|left][outside]?
>

  <!-- Required -->
  <nth-child-1 sidebar />
  <nth-child-2 content /> 

  <!-- Optional -->
  <cornerstone-bonaparte />

</toolbar-bonaparte>
```

```html
<!-- only as direct child of <toolbar-bonaparte> -->
<cornerstone-bonaparte
  open=[true|false]
>
</cornerstone-bonaparte>
```

```html
<!-- parent element must not be position:static -->
<panel-bonaparte
  position=[top|right|bottom|left]
  open=[true|false]
  <!-- stayOpen=[true|false] -->
>
</panel-bonaparte>
```

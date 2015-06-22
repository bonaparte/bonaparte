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

- Run `npm install` in `./` and `./SUI/ui/`.
- Run `gulp SUI-install` from `./`

### Build Docs 

- Install / Build SUI.
- Run `npm install` in `./SUI/docs/`.
- Follow Instructions: https://github.com/Semantic-Org/Semantic-UI-Docs.

### Development

> __One doesn't simply work in `dist/` directly.__ <br>
> _- Wise Man_

- Install / Build SUI.
- Run `gulp SUI-watch` to watch `.SUI/ui/` and keep `dist/` up to date.
- Work in `ui/`. _( Theme: `./ui/src/themes/bonaparte/` )_


## Bonaparte

### Install / Build

- Run `npm install` in `./` .

### Development

> __One doesn't simply work in `dist/` directly.__ <br>
> _- Wise Man_

- Run `gulp watch` to watch `./src/` and keep `./dist/` up to date.


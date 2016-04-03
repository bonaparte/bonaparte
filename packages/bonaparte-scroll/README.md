# < bonaparte-scroll >

[![npm version](https://badge.fury.io/js/bonaparte-scroll.svg)](http://badge.fury.io/js/bonaparte-scroll)

The scroll component is used to implement scrolling in a container.

> Note: Currently only supports vertical scrolling.

#### Examples

- [Example Page](http://bonaparte.github.io/bonaparte/packages/bonaparte-scroll/examples/index.html)
- [Starter](http://bonaparte.github.io/starter-vanilla)


## Structure
```html
<!-- Position relative to parent element. Parent must not be position:static. -->
<bonaparte-scroll
  scrollbar
>
  <1st-child> <!-- scrolling content -->

</bonaparte-scroll>
```
---

#### `<1st-child>` Scrolling content
Content that will be scrolled.


## Attributes

#### `scrollbar`
Allows the button to restore the targets state when clicked a second time.

- _Default `hover`_
- _Values_
  - _`hover`: Scroll bar is only visible if the user hover over the scrollable area._
  - _`visible`: Scroll bar is always visible._
  - _`hidden`: Scroll bar is never visible._
  - _`native`: The native scroll bar will not be replaced and is visible._

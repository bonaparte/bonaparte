# < bonaparte-button >

[![npm version](https://badge.fury.io/js/bonaparte-button.svg)](http://badge.fury.io/js/bonaparte-button)

The button component is a tool to manipulate attributes on HTML elements.

A button defines _target-attributes_ which it updates on the _target_ element when its action is triggered.

On activation, the button syncs all the _target-attributes_ with the attibutes on the _target_ elements. When all _target-attributes_ match all attributes on the _target_ elements, the *active-class* is set.

#### Examples

- [Dropdown Example Page](http://bonaparte.github.io/bonaparte-dropdown/examples/index.html)<br>_Although it's the example page for `bonaparte-dropdown`, all the functionality on the page is achieved through `bonaparte-button` – There is no custom JavaScript on the page._
- [Starter](http://bonaparte.github.io/starter-vanilla)


## Structure

```html
<bonaparte-button
  action
  active-class
  bubbles
  shortcut
  target
  target-[attribute]
  toggle
  trigger
>
</bonaparte-button>
```
## Attributes

#### `action`
HTMLEvent that triggers the button<br>
- _Default `click`_

#### `active-class`
Class to be added when all _target-attributes_ match the attributes on the target.
- _Default `active`_

#### `bubbles`
Defines if the action-event bubbels up the DOM
- _Default `true`_
- _Values `true` `false`_

#### `shortcut`
Keyboard shortcut to trigger this button.
- _Values `k` `command+shift+k` `command+k enter` See [Mousetrap](https://craig.is/killing/mice)_

#### `target`
CSS Selector defining the elements this button affects

#### `target-[attribute]`
___[attribute]:___ An attribute on the target element.

Defines an attribute value this button will set on the target element when it is triggered by the action.

#### `toggle`
Allows the button to restore the targets state when clicked a second time.
- _Default `false`_
- _Values_
  - _`false`: Clicking the button again will set the button state again._
  - _`true`: Clicking the button again will revert the elements state._
  - _`attribute, attribute`: Comma separated list of attributes that should toggle_

#### `trigger`
HTMLEvent that will be triggered on the _target-element_

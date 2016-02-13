# < bonaparte-button >

The button component is a tool to manipulate attributes on HTML elements. 

A button defines _target-attributes_ which it updates on the _target_ element when its action is triggered.

On activation, the button syncs all the _target-attributes_ with the attibutes on the _target_ elements. When all _target-attributes_ match all attributes on the _target_ elements, the *active-class* is set.


## Structure 

```html
<bonaparte-button
  action
  active-class
  target
  target-[attribute]
  toggle
  trigger
  bubbles
  shortcut
>
</bonaparte-button>
```
## Attributes


#### `action`
HTMLEvent that triggers the button<br>
_Default: `click`_

#### `active-class`
Class to be added when all _target-attributes_ match the attributes on the target.<br>
_Default: `active`_

#### `bubbles`
Defines if the action-event bubbels up the DOM<br>
_Default: `true`_
_Values: `true` `false`_<br>

#### `shortcut`
Keyboard shortcut to trigger this button.<br>
_Values: `k` `command+shift+k` `command+k enter`, See: [Mousetrap](https://craig.is/killing/mice)_

#### `target`
CSS Selector defining the elements this button affects

#### `target-[attribute]`
___[attribute]:___ An attribute on the target element.<br>
Defines an attribute value this button will set on the target element when it is triggered by the action.


#### `toggle`
Allows the button to restore the targets state when clicked a second time.<br>
_Default: `false`_<br> 
_Values:<br> 
`false`: Clicking the button again will set the button state again.<br>
`true`: Clicking the button again will revert the elements state.<br> 
`attribute, attribute`: Comma separated list of attributes that should toggle_ 


Name | Values | Default | Description 
:--------- | :--- | :------ | :----------
__action__ | _Event_ |  | HTMLEvent that triggers the button.
__active-class__ | className | `active` | Defines which class will be added to the button if all target-attributes are matched on (all) target-elements.<br>Setting this explicitly to `""` will disable the active class.
__bubbles__ | `true`<br>`false` | `true` | Defines if the action-event bubbels up the DOM
__shortcut__ | _key combination_ | | Defines keyboard shortcuts to trigger this button. (For more details see: [Mousetrap](https://craig.is/killing/mice))
__target__ | _querySelector_ |  | CSS Selector defining the elements this button affects.
__target-*__ | target-value |  | * : attribute on target element<br>Attribute value this button will set on the target element when it is triggered by the action.
__toggle__ | `true` | `false` | Clicking a button a second time will restore its state before it was affected by this button. All attributes will toggle.
 | `false` | | This button doesn't toggle any attributes. Clicking the button again will set the target-* values again.
 | _attribute-name_, _attribute-name_ | | Only the listed attributes toggle.
__trigger__ | (String) _Event_ |  | Event to be triggered on the target element.



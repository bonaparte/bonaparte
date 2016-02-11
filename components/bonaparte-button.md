# < bonaparte-button >
Bonaparte buttons are a powerfull tool to define interface behaviour. <br>A button defines a target-state which it invokes on a target-element when its action is triggered.<br> A button defines one or more target elements on the page. On those target-elements it affects the specified target-attributes and syncs their values with the correlating attribute on the target. The active state is automatically set when all target-attributes match the attributes on all target-elements. <br>
With this mechanic most UI behaviour can be implemented without writing any javascript.


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
### Attributes
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



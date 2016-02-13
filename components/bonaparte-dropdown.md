# < bonaparte-dropdown >
The cropdown component is a temporary UI element that appears along one edge of the `<bonaparte-dropdown>` tag when _open_.

## Structure
```html
<bonaparte-dropdown
  action
  handler
  open
  position
>
  <1st-child> <!-- dropdown content -->
 
</bonaparte-dropdown>
```

#### `<1st-child>` Dropdown content
Container which is placed along one edge of `<bonaprate-dropdown>` and is only visible when `open=true`.


## Attributes


#### `action`
HTMLEvent that _opens_ the dropdown. (sets `open=true`)<br>
_Default: `click`_


#### `handler`
CSS Selector to specify which element within `<bonaparte-dropdown>` will trigger the action.<br>
_Default: By default the whole `<bonaparte-dropdown>` tag is the handler_

#### `open`
Defines if the _dropdown content_ is visible or not.<br>
_Default: `false`_<br>
_Values: `false` `true`_


#### `position`
Defines the position of the _dropdown content_ relative to `<bonaparte-dropedown>`. The first value defines the side the content appears on. The second value defines the edge the content aligns to.<br>
_Default: `bottom left`_<br>
_Values: `top` `right` `bottom` `left` `top right` `top left` `right top` `right bottom` `bottom left` `bottom right` `left top` `left bottom`


Name | Values | Default | Description 
:--------- | :--- | :------ | :----------
__position__ | `top` `top left` ` top right` <br /> `right` `right top` right `bottom` <br />`bottom` `bottom left`  `bottom right`<br />`left` `left top` `left bottom`  <br />  | `left bottom` | Defines the position of the content within the toolbar. The first value indicates the which side the content will appear, the second value the the anchor edge. If the anchor edge is not specified then top or left is applyed. 
__handler__ | querySelector |  | CSS Selector defining the elements 
__action__  | HTML event type | click | HTMLEvent that triggers the content

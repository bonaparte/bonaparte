# < bonaparte-dropdown >
The cropdown component is a temporary UI element that appears along one edge of the `<bonaparte-dropdown>` tag when _open_.

[Example](https://dowjones.github.io/bonaparte/examples/dropdown.html)

## Structure
```html
<bonaparte-dropdown
  position
  open
  action
  handler
>
  <1st-child> <!-- dropdown content -->
 
</bonaparte-dropdown>
```

##### Child elements
Index | Name |  Required | Description 
:--------- | :--- | :------ | :-----
__1__ | content | yes | Holds the main content. 
__2__ | handler | (yes) | the trigger to show the content


##### Attributes
Name | Values | Default | Description 
:--------- | :--- | :------ | :----------
__position__ | `top` `top left` ` top right` <br /> `right` `right top` right `bottom` <br />`bottom` `bottom left`  `bottom right`<br />`left` `left top` `left bottom`  <br />  | `left bottom` | Defines the position of the content within the toolbar. The first value indicates the which side the content will appear, the second value the the anchor edge. If the anchor edge is not specified then top or left is applyed. 
__handler__ | querySelector |  | CSS Selector defining the elements 
__action__  | HTML event type | click | HTMLEvent that triggers the content

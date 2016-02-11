# < bonaparte-dropdown >
The Dropdown is a UI element consisting of to two areas, a content area and a handler. When the user interacts with the handler the content area is show. The position of the content area is relative to the bonaparte-dropdown tag, this can be set by using a position attribute on the tag.

Note: if placed inside a < p > then block elements (ie div) may break the flow of the HTML

[Example](https://dowjones.github.io/bonaparte/examples/dropdown.html)

### Structure
```html
<bonaparte-dropdown
  position
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

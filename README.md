# < bonaparte-dropdown >
TODO: Description 


```html
<bonaparte-dropdown
  position=[top|bottom][left|right] ?
  handler=[querySelector] ?
>
  <1st-child content />

  <2nd-child handler /> 

</bonaparte-dropdown>
```

##### Child elements
Index | Name |  Required | Description 
:--------- | :--- | :------ | :-----
__1__ | content | yes | Holds the main content. 
__2__ | handler | (yes) | Holds the main content. The sidebar is placed around this element.


##### Attributes
Name | Values | Default | Description 
:--------- | :--- | :------ | :----------
__position__ | `left` `right`<br>`top` `bottom` | `left top` | Defines the position of the cornerstone within the toolbar.
__handler__ | querySelector |  | CSS Selector defining the elements this button affects

# < bonaparte-scroll >
The scroll component can be used to very easily implement scrolling in a container.

```html
<!-- parent element must not be position:static -->
<bonaparte-scroll
  scrollBar
>

  <1st-child content />

</bonaparte-scroll>
```

##### Attributes
Name | Values | Default | Description 
:--------- | :--- | :------ | :---------
__scrollbar__  |  `hover`  | `hover` | Scrollbar is only visible if the user hover over the scrollable area. 
 | `visible`  | | Scrollbar is always visible.
 | `hidden` | | Scrollbar is never visible
 | `native` | | The native scrollbar will not be replaced and is visible.


##### Child elements
Index | Name |  Required | Description 
:--------- | :--- | :------ | :-----
__1__ | content | yes | Content that will be scrolled.

# < panel-bonaparte >
A panel is a temporary UI element that slides in from one side. It automatically attaches itself to its next positioned parent element. There can only be one panel open at a time and opening another panel or clicking outside of it will close the current panel.
(For a permanent sidebar, use the `<sidebar-bonaparte>` tag)
```html
<!-- parent element must not be position:static -->
<panel-bonaparte 
  position 
  open
>
</panel-bonaparte>
```

##### Attributes
Name | Values | Default | Description 
:--------- | :--- | :------ | :----------
__position__ | `left`<br>`top`<br>`right`<br>`bottom` | `left` | Defines the position and direction of the panel within its parent element.
__open__ | `false` | `false` | Panel is not visible and moves out of its parent element.
 | `true` | | Panel is visible and moves into its parent element

##### Events
Name | Target | Bubbles | Description 
:--------- | :--- | :------ | :------
__bonaparte.panel.open__ | `<panel-bonaparte>` | yes | Triggers when a panel opens.
__bonaparte.panel.close__ | `<panel-bonaparte>` | yes | Triggers when a panel closes.

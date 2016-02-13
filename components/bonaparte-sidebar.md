# < bonaparte-sidebar >
The sidebar component divides the space into two areas: _sidebar_ and _content_. The *sidebar* can be positioned on either side of the *content*. 
As opposed to the panel, the sidebar does not overlay the content but pushes it. There can be multiple sidebars open at the same time and they can be nested.

> If you plan to only have buttons in the sidebar have a look at [`<toolbar-bonaparte>`](bonaparte-toolbar.html) instead.


## Structure
```html
<bonaparte-sidebar
  position
  open
>
  <1st-child> <!-- sidebar -->
  
  <2nd-child> <!-- content --> 
  
</bonaparte-sidebar>
```

#### `<1st-child>` Sidebar
Place on one side of the _content_ according to the `sidebar` attribute.

#### `<2nd-child>` Content
Holds the main content. The sidebar is placed around this element.


## Attributes
Name | Values | Default | Description 
:--------- | :--- | :------ | :---------
__position__  |   `left`<br>`top`<br>`right`<br>`bottom` | `left` | Defines the position of the sidebar relative to its content area.
__open__ | `true` | `true` | Displays the Sidebar according to its `min-width`.
 | `false` | | Sets the size of the sidebar to 0px.




##### Events
[Not yet implemented.. sry]
Name | Target | Bubbles | Description 
:--------- | :--- | :------ | :------
__bonaparte.sidebar.open__ | `<bonaparte-sidebar>` | yes | Triggers when a sidebar opens.
__bonaparte.sidebar.close__ | `<bonaparte-sidebar>` | yes | Triggers when a sidebar closes.


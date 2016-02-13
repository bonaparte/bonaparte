# < bonaparte-panel >
A panel is a temporary UI element that slides in from one side and overlays the content. 
There can only be one panel open at a time. Clicking outside of a panel or opening an second panel will close the currently open one.

> For a permanent sidebar that doesn't overlay the content use [`<sidebar-bonaparte>`](bonaparte-sidebar.html)

## Structure
```html
<!-- Position relative to parent element. Parent must not be position:static. -->
<bonaparte-panel
  open 
  position 
>
</bonaparte-panel>
```

## Attributes

#### `open`
Defines if the panel is visible or not.<br>
- _Default: `false`_<br>
- _Values: `false` `true`_


#### `position`
Defines the position of the panel relative to it's parent container.<br>
- _Default: `left`_<br>
- _Values: `top` `right` `bottom` `left`_

## Events

#### `bonaparte.panel.open`
Triggers when a panel opens.

- _Source: `<bonaparte-panel>`_<br>
- _Bubbles: Yes_

#### `bonaparte.panel.close`
Triggers when a panel closes.<br>
- _Source: `<bonaparte-panel>`_<br>
- _Bubbles: Yes_

Name | Target | Bubbles | Description 
:--------- | :--- | :------ | :------
__bonaparte.panel.open__ | `<bonaparte-panel>` | yes | Triggers when a panel opens.
__bonaparte.panel.close__ | `<bonaparte-panel>` | yes | Triggers when a panel closes.

# Bonaparte Components
Bonaparte provides a set of loosely connected UX components that can be used together or separately. Components are written in vanilla JavaScript. And are placed in HTML as WebComponents using custom tags:
```html
<bonaparte-scroll>
    <div>
    
        <!-- Scrolling Content -->
    
    </div>
</bonaparte-scroll>
```

## Core Principles
All Bonaparte components follow three core principles:

#### 1. Components are design agnostic
> Placing a Bonaparte component on a page provides structure and functionality – not design.<br>
**No Bonaparte component uses or requires CSS classes to provide functionality.**

This allows Bonaparte components to be used in any website with any set of CSS. It's also compatible with existing UI frameworks like Bootstrap, Foundation and Semantic UI.

#### 2. Functionality is purely defined by custom attributes.
> All customization of functionality on a Bonaparte component is through its attributes.
Some components provide APIs to help modify their attributes. APIs do *not* provide additional functionality.

Through this, Bonaparte components are defined and configured in HTML. It is now up to the user to choose how to generate the HTML. This can be done in any programming language and works nicely with standard JavaScript frameworks like React and Angular.

#### 3. Required child elements are not expected to be of a certain type.
> Bonaparte Components can require a number of direct children in order to provide structure. These child elements can be any type of HTML tag (div, article, aside, bonaparte-..., etc.).  

This provides the user with the option to choose which HTML tag semantically fits best for their application. It also allows for tighter nesting which reduces elements on the page.


## Component Interfaces

Each Component has three interfaces it can define:

#### Required child Elements
Components can require one or more (*n*) child elements. 
These components will use the first *n* children to provide functionality.
Every child element after the *n-th* is not affected and can be anything the user wishes.
In some cases the required children must be marked by a custom attribute specified in the documentation. In these cases the component will not use the first *n* children but the marked ones.
```html
<bonaparte-scroll>
    <1st-child: scrollable content >
</bonaparte-scroll>
```


#### Custom attributes
All customization of a components functionality is done through custom attributes.<br>
Custom attributes are defined with and without `data-` prefix. 
```html
<bonaparte-scroll
    scrollbar = visible|hidden|hover|native
>
</bonaparte-scroll>
```

#### Custom events
Components can emit custom events to notify other parts of the page about their state. <br>
Bonaparte Events are named with the pattern: `bonaparte.tag-name.event`<br>
Listen to events on the component or ancestor elements: 
```javascript
document.getElementById('myBonaparteComponent').addEventListener('bonaparte.scroll.scrolling', handler);
```

#### Component APIs
Some components provide an API to help modify its attributes.<br>
**Component APIs do not add any functionality to the component.** <br>
They are simple convenience methods to change the components attributes. 
The Component API can be accessed on the component itself under the `bonaparte` namespace: 
```
document.getElementById('myBonaparteComponent').bonaparte.changeAttribute();
```

## Component Types

There are two types of components:

#### 1. Basic components
Basic Components provide simple structure and minimal functionality to be as versatile as possible:
  - [< bonaparte-dropdown >](../packages/bonaparte-dropdown/README.md)
  - [< bonaparte-panel >](../packages/bonaparte-panel/README.md)
  - [< bonaparte-scroll  >](../packages/bonaparte-scroll/README.md)
  - [< bonaparte-sidebar  >](../packages/bonaparte-sidebar/README.md)

#### 2. Opinionated high level components
High level components are more opinionated in their functionality and are build for a certain use case.
  - [< bonaparte-button >](../packages/bonaparte-button/README.md)
  - [< bonaparte-toolbar  >](../packages/bonaparte-toolbar/README.md)
 

## Creating Components
Creating Bonaparte Components is easy!<br>Learn more: [4.2 Development / Contribute](advanced/contribute.html)
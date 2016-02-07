# Bonaparte Components
Bonaparte provides a set of loosely connected UX components that can be used together or separately. They are placed in HTML in form of custom tags. 

All Bonaparte components follow three core principles:

#### 1. Components are design agnostic
> Placing a Bonaparte component on a page provides structure and functionality – not design.<br>
**No Bonaparte component uses or requires CSS classes to provide functionality.**

This allows Bonaparte components to be used in any website with any set of CSS. It's also compatible with existing UI frameworks like Bootstrap, Foundation and Semantic UI.

#### 2. Functionality is purely defined by custom attributes.
> All customization of functionality on a Bonaparte component is through its attributes.
Some components provide APIs to help modify their attributes. APIs do *not* provide additional functionality.

Through this, Bonaparte components are defined and configured in HTML. It is now up to the user to choose how to generate the HTML. This can be done in any programming language and works nicely with standard JavaScript frameworks like React and Angular.

#### 3. Required child elements are not required to be of a certain type.
> 

This provides the user with the option to choose which HTML tag semantically fits best for their application. It also allows for tighter nesting which reduces elements on the page.

---

- Components create structure but are otherwise design agnostic.
- Components are _pure_. Functionality is controlled by custom attributes only.
- No use of the `class` attribute to create functionality.


There are two types of components:

## 1. Basic structural components
Basic Components provide simple structure and minimal functionality to be as versatile as possible.

## 2. Opinionated high level components
High level components are more opinionated in their functionality and are build for a certain use case.
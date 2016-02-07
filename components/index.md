# Bonaparte Components

Bonaparte provides a set of loosely connected components that can be used together or separately by themselves.


## Bonaparte Components
Bonaparte Components are library and design agnostic UX components. They are placed in HTML in form of custom tags. 
Each components functionality can be customized through attributes.

Some components define a number of `required` child tags. Required children must be the first children. After the required child elements, there can be arbitrary additional content.

> Note: (Design Agnostic) No component uses the `class` attribute in any way. You can use your favorite frontend frameworks classes for styling.

> Note: Required children can be any type of tag. (i.e. the < sidebar-bonaparte >'s first child can be a `<div>` or more semantically correct an `<aside>` tag.

#### Standard Components

  - [< button-bonaparte >](https://github.com/bonaparte/bonaparte-button)
  - [< scroll-bonaparte >](https://github.com/bonaparte/bonaparte-scroll)
  - [< sidebar-bonaparte >](https://github.com/bonaparte/bonaparte-sidebar)
  - [< panel-bonaparte >](https://github.com/bonaparte/bonaparte-panel)


#### Highlevel Components
Highlevel components enforce a certain level of design hierarchy by implementing some restrictions.
For the best result, use as many highlevel components in your design as possible.

  - [< bonaparte-button >](https://github.com/bonaparte/bonaparte-button)
  - [< bonaparte-toolbar >](https://github.com/bonaparte/bonaparte-toolbar)



All Bonaparte components follow a set of core principles:

## 1. Components are design agnostic
This 


- Components create structure but are otherwise design agnostic.
- Components are _pure_. Functionality is controlled by custom attributes only.
- No use of the `class` attribute to create functionality.


There are two types of components:

## 1. Basic structural components
Basic Components provide simple structure and minimal functionality to be as versatile as possible.

## 2. Opinionated high level components
High level components are more opinionated in their functionality and are build for a certain use case.
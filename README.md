# Didof Common

I like to build stuff from scratch. But it gets old after a while.
Hence, here I'm collecting a series of Vue components & directives that I use regularly across my other projects.

## Demo

Clone repo and run

`npm install`

then

`npm run demo`

## Components

### IntersectionObserver

```html
<IntersectionObserver
  :threshold="[0.5, 1]"
  @in="inFn"
  @out="outFn"
  @observe="observeFn"
  @update="updateFn"
  @disconnect="disconnectFn"
>
  Anything you want to observe
</IntersectionObserver>
```

#### Abstract

A simple and immediate way to wrap any component and obtain info about it position relatively to the view.
It works both with a single child or multiple. In the latter case, the events `in` and `out` are fired for all children.

#### Props

See [official docs](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) for their purpose.

- **threshold**: if updated, the observer is disconnected, then reconnected with the new value of the prop. The event _update_ is emitted.

#### Events

- **in**: dispatched for each entry, triggered when the entry enters in view. Brings as payload the entry itself.
- **out**: like previous, but triggered when the entry slips out of view
- **update**: emitted when any props (only _threshold_ right now) is changed. Brings as payload the following structure: `{ name, currentValue, oldValue }`
- **disconnect**: literally the last thing the component emits before being unmounted.

---

### MultiLevel [WIP]

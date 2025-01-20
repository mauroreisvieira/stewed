# @stewed/react

## 2.2.0

### Minor Changes

  - Added a `padding` prop on `Drawer` component allow to customize the padding of the Drawer.
  - Fixed `safeMargin` styles on `Dialog` and `Drawer`.
  - Resolved an issue where the **theme scope** was being created inside elements that were not
    present in the DOM. This ensures that styles are applied correctly only to elements that are
    rendered.

## 2.1.0

### Minor Changes

- Fixed the polymorphic component's `ref` type to depend on the element specified by the `as` prop
- Fixed loading button styles

### Patch Changes

- Updated dependencies [27184d7]
  - @stewed/utilities@0.3.3
  - @stewed/hooks@2.0.2

## 2.0.0

### Major Changes

- initial implementation

---
title: Minimal Mistakes Adaptation
subtitle: 
layout: single
---

Here is a list of things I have changed in the minimal mistakes template.

## Author Profile

- Added Lab
- Added School
- Added Resume
- Added Resume of Failure

## Table Style

- Added rounded corner table

```css
th:first-child {
    border-radius: 6px 0 0 0;
}

th:last-child {
    border-radius: 0 6px 0 0;
}

th:only-child{
    border-radius: 6px 6px 0 0;
}
```

- Added background colors

```css
tr:nth-child(odd) {
  background-color: $lighter-gray}

thead tr:first-child {
  background-color: $darker-gray;
}
```

- Updated border colors

## Footer

- Updated Footer Information



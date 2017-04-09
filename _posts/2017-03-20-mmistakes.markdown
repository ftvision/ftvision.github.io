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

## Font Size

- decreased font-size shrikage in `_variables.scss`

```css
$type-size-6                : 0.85em !default;   // ~12px
```

- reset page `p, li, dl` in `_page.scss`

```css
p, li, dl {
  font-size: 0.75em;
  text-align: justify;
}
``` 

- overwritten `.page__content li` in `_notice.scss`

```scss
@at-root .page__content #{&} li {
  /* using at-root to override .page-content li font size*/
  margin: 0;
  font-size: 1em;
}
``` 
- reset side-bar link font-size in `_sidebar.scss`

```css
a {
  display: block;
  margin-bottom: 5px;
  padding-right: 5px;
  padding-top: 2px;
  padding-bottom: 2px;
  color: inherit;
  //font-size: $type-size-6;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
}
```

## MathJax

Learned from [MathJax Official Document](http://docs.mathjax.org/en/latest/start.html) and added the following snippet into `/head/custom.html`

```javascript
<script type="text/x-mathjax-config">
  MathJax.Hub.Config({tex2jax: {inlineMath: [['$','$'], ['\\(','\\)']]}});
</script>
<script type="text/javascript" async
  src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS_CHTML">
</script>
```

## Footer

- Updated Footer Information



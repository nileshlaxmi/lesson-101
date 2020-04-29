# Sharing SCSS variables in Javascript files

```css
$white-color: #fcf5ed;
$dark-color: #402f2b;
$light-color: #e6d5c3;
$medium-color: #977978;
$alert-color: #cb492a;
$light-black-color: #706e72;
$black-color: #414042;

// the :export directive is the magic sauce for webpack

:export {
  whitecolor: $white-color;
  darkcolor: $dark-color;
  lightcolor: $light-color;
  mediumcolor: $medium-color;
  alertcolor: $alert-color;
  lightblackcolor: $light-black-color;
  blackcolor: $black-color;
}
```

```javascript
import variables from 'variables.scss';

const CSS = {
  backgroundColor: variables.blackcolor
}

export default ({}) => {
  return <div style={CSS}>Content</div>
}
```

## Reference

[Share SCSS variables in JS](https://til.hashrocket.com/posts/sxbrscjuqu-share-scss-variables-with-javascript)

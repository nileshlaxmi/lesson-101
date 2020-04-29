# React Fragment

Fragment lets you group a list of children without adding extra nodes to the DOM.

```javascript
import React from 'react';

const Display = () => {
    return (
        <div>
            <Child1 />
            <Child2 />
        </div>
    )
}
```

Here div will add extra node to DOM and this div is also not required. Earlier if we don't add this div then React will show you an error that Child Components need to be wrapped in Parent.  

So instead of adding dom, we use Fragment, this will not add any node to DOM. Below is the example:

```javascript
import React, {Fragment}  from 'react';

const Display = () => {
    return (
        <Fragment>
            <Child1 />
            <Child2 />
        </Fragment>
    )
}
```

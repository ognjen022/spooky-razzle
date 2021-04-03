# Input

How to use this `<Input>` component

#### Required: `type` and `placeholder`
_____________

Default (required props):

```HTML
<Input type="text" placeholder="Enter text" />
```

Readonly:

```HTML
<Input type="text" placeholder="Read only text" readonly/>
```

Required:

```HTML
<Input type="text" placeholder="Required text" required/>
```

autoFocus:

```HTML
<Input type="text" placeholder="Has auto-focus text" autoFocus/>
```

maxLength:

```HTML
<Input type="..." placeholder="..." maxLength={10}/>
```

## ClassName:

To add custom CSS class you can pass it as props

```HTML
<Input type="..." placeholder="..." className="custom email class names"/>
```

## Type:

By default it uses `text`

```HTML
<Input type="email" placeholder="..."/>
```

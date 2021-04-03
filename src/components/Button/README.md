# Button

How to use this `<Button>` component


## Default

You can add the text of the button by passing `label` or as children
```HTML
<Button label="Regular button" />
```
```HTML
<Button>Regular button</Button>
```

## Outline is called `ghost`

```HTML
<Button color="ghost" label="Outlined primary button" />
```

## Success

```HTML
<Button color="success" label="..." />
```

## Variant:  `secondary` | `facebook` | `google`

```HTML
<Button variant="secondary" label="..." />
```

## ClassName:

By default it adds the class `.button`
to add custom CSS class you can pass it as props

```HTML
<Button label="..." className="my-other css-class names" />
```

## Type:

By default it use `button` but can receive `button`, `submit`, `reset`

```HTML
<Button label="submit" type="submit" />
```

## Icon or Children:

The use of `label` is not required if passing down components as a child of `Button`

```HTML
<Button onClick={handleClick}>
    <Icon />
    Sign in with Facebook
</Button>
```

## ARIA and other props:

Aria labels and any other prop can be passed as regular props

Aria-label:

```HTML
<Button aria-label="button with aria label" />
```

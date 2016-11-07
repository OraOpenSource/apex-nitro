# Configuration

```
afeb config <project>
```

## Options

### Global

Name | Type | Default | Description
--- | --- | -- |
`App URL` | string | | This is the URL to your APEX application homepage.
`Source Folder` | string | | This is the path to your application src folder. If nothing is filled, the current repository will be used with the `/src/` folder. This is the URL to your APEX application homepage.
`Dist Folder` | string | | This is the path to your application dist folder. If nothing is filled, the current repository will be used with the `/dist/` folder.


### Javascript Concatenation

Name | Type | Default | Description
-- | -- | -- | --
`Enabled` | boolean | `false` | Turns on and off the JavaScript concatenation feature.
`Final Name` | string | `app` | Represents the name of the final file, after concatenation.

### CSS Concatenation

Name | Type | Default | Description
-- | -- | -- | --
`Enabled` | boolean | `false` | Turns on and off the JavaScript concatenation feature.
`Final Name` | string | `app` | Represents the name of the final file, after concatenation.

### Sass

Name | Type | Default | Description
-- | -- | -- | --
`Enabled` | boolean | `false` | Turns on and off the Sass parsing feature.
`Include Path` | string | | Include a path to an external Sass folder. Allows to use the `@import` feature from within that folder.

### Less

Name | Type | Default | Description
-- | -- | -- | --
`Enabled` | boolean | `false` | Turns on and off the Less parsing feature.
`Include Path` | string | | Include a path to an external Less folder. Allows to use the `@import` feature from within that folder.

### Browsersync

Name | Type | Default | Description
-- | -- | -- | --
`Enabled` | boolean | `false` | Turns on and off the Browsersync feature.
`Notify` | boolean | `true` | This option makes Browsersync alert you when a file is dynamically injected to you browser.
`Ghost Mode` | boolean | `false` | This option makes clicking, scrolling and typing being replicated on all devices.

### Header

Name | Type | Default | Description
-- | -- | -- | --
`Enabled` | boolean | `false` | Turns on and off the automatic header comment block feature.
`package.json Path` | string | | Points to your project's `package.json` file.

### Theme Roller

Name | Type | Default | Description
-- | -- | -- | --
`Enabled` | boolean | `false` | Turns on and off the Theme Roller feature. This will generate a `less` file that you can import into your application theme style. It will add editable variables to theme roller.
`Final Name` | string | `themeroller` | Represents the name of the final Less file, after concatenating the files array.
`Files` | array | | Include the order of `scss` or `less` files to be parsed by Theme Roller.

### Image Optimization

Name | Type | Default | Description
-- | -- | -- | --
`Enabled` | boolean | `false` | Turns on and off automatic image lossless optimizers.

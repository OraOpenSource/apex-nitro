# Configuration
```
afeb config <project>
```

## Options

### Global

Name | Type | Default | Description
--- | --- | -- |
`App URL` | string | | This is the URL to your APEX application homepage.
`Source Folder` | string | | This is where you do the coding. It should point to a local directory.
`Dist Folder` | string | | This is where the files will be compiled. It should point to a local directory.


### Javascript Concatenation

Name | Type | Default | Description
-- | -- | -- | --
`Enabled` | boolean | `false` | Enables the JavaScript concatenation feature.
`Final Name` | string | `app` | Represents the name of the final file, after concatenating your source folder.

### CSS Concatenation

Name | Type | Default | Description
-- | -- | -- | --
`Enabled` | boolean | `false` | Enables the JavaScript concatenation feature.
`Final Name` | string | `app` | Represents the name of the final file, after concatenating your source folder.

### Sass

Name | Type | Default | Description
-- | -- | -- | --
`Enabled` | boolean | `false` | Enables the Sass parsing feature.
`Include Path` | string | | Include a path to an external Sass folder. Allows to use the `@import` feature from within that folder.

### Less

Name | Type | Default | Description
-- | -- | -- | --
`Enabled` | boolean | `false` | Enables the Less parsing feature.
`Include Path` | string | | Include a path to an external Less folder. Allows to use the `@import` feature from within that folder.

### Browser

Name | Type | Default | Description
-- | -- | -- | --
`Notify` | boolean | `true` | This option makes APEX Front-End Boost alert you when a file is dynamically injected to you browser.
`Ghost Mode` | boolean | `false` | This option makes clicking, scrolling and typing being replicated on all devices.

### Header

Name | Type | Default | Description
-- | -- | -- | --
`Enabled` | boolean | `false` | Enables the automatic header comment block feature.
`package.json Path` | string | | Points to your project's `package.json` file.

### Theme Roller

Name | Type | Default | Description
-- | -- | -- | --
`Enabled` | boolean | `false` | Enables the Theme Roller feature. This will generate a `less` file that you can import into your application theme style. It will add editable variables to theme roller.
`Final Name` | string | `themeroller` | Represents the name of the final Less file, after concatenating the files array.
`Files` | array | | Include the order of `scss` or `less` files to be parsed by Theme Roller.

### Image Optimization

Name | Type | Default | Description
-- | -- | -- | --
`Enabled` | boolean | `false` | Enables automatic image lossless optimizers.

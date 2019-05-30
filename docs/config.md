# APEX Nitro Configuration

For APEX Nitro to connect to your APEX application, it needs configuring. Most  parameters (e.g. Application URL, Absolute Path to local directory, etc.).

Execute this command to configure an APEX Nitro project:

```bash
apex-nitro config <project>
```

A new browser tab will open and you can simply fill the form:

![APEX Nitro Configuration](/docs/img/command-config.png)

*You can also read about the different options by hovering the help icons.*

## Properties

### Required

Required information for any APEX Nitro project.

Property | Description | Options
--|--|--
Mode | Drives the complexity of your APEX Nitro configuration | basic, advanced
App URL | This is the URL to your APEX application homepage. |
Source Folder | This is where you do the coding. It should point to a local directory |
Distributable Folder | This is where the files will be compiled. It should point to a local directory. |

### JavaScript

Settings for serving JavaScript to your application.

Property | Description | Options
--|--|--
Processor | Choose how your JavaScript will be processed.

#### Processor: Default

Property | Description | Options
--|--|--
Concatenate JavaScript Files | Enable this to concatenate all your JavaScript files into one. | true, false
Concatenate JavaScript Filename | This is the name of the concatenated file. |

### CSS

Settings for serving JavaScript to your application.

Property | Description | Options
--|--|--
Language | Your source files stylesheet language. | css, sass, less

#### Language: CSS

Settings for serving CSS to your application.

Property | Description | Options
--|--|--
Concatenate CSS Files | Enable this to concatenate all your CSS files into one. | true, false
Concatenate CSS Filename | This is the name of the concatenated file. |

#### Language: Sass

Property | Description | Options
--|--|--
Include Path | Include a path to an external Sass folder. Allows to use the `@import` feature from within that folder. |

#### Language: Less

Property | Description | Options
--|--|--
Include Path | Include a path to an external Less folder. Allows to use the `@import` feature from within that folder. |

### Additional Options

Additional options when using APEX Nitro.

Property | Description | Options
--|--|--
Enable Real-time Synchronization | Enabling this will automatically inject CSS and reload JavaScript on your page. This is the default behavior, but it can be turned off. | true, false
Enable External Devices Synchronization | Enabling this synchronizes clicking, scrolling and typing on all devices connected to your APEX Nitro app. | true, false
Push Notifications on Success/Errors | Enabling this will push system notifications to you if your code compiles successfully or fails. | true, false

### Header

This feature adds an automatic comment block at the top of your CSS and JavaScript files with your project information.

Property | Description | Options
--|--|--
Enable | Enables the automatic header comment block feature. | true, false
package.json Path | Points to your project's `package.json` file. |

### APEX Options

Property | Description | Options
--|--|--
Open Builder | Determines if the APEX builder should open alongside the application itself. | true, false

### Publish

Required if you want to publish your files to APEX automatically.

Property | Description | Options
--|--|--
APEX Files Destination | This is used for the 'publish' feature and will determine where the files should be uploaded. | application, workspace, theme, plugin
SQLcl Path | Enter the path to SQLcl. If it's been added to your environment variable, it should be `sql`. Otherwise enter a full path. Example: `/Users/vmorneau/sqlcl/bin/sql` |
Connection Type | Enter your connection type | basic, custom

#### APEX Files Destination: Plugin

Property | Description | Options
--|--|--
Plugin Internal Name | The internal name of the plugin is required to map the files to the correct plugin. |

#### Connection Type: Basic

Property | Description | Options
--|--|--
User | Enter your user |
Password (Optional) | If you do not enter your password here, it will be prompted to you when using [apex-nitro publish project] |
host | Enter your host |
port | Enter your port |
Connection Type | Enter your connection type | sid, service name, tns
SID | Enter the [SID] for user/pass@db:port:[SID] |
Service Name | Enter the [SERVICE NAME] for user/pass@db:port/[SERVICE NAME] |
TNS | Enter the [TNS] for user/pass@[TNS] |

#### Connection Type: Custom

Property | Description | Options
--|--|--
Connection String | Enter your connection string |

### Theme Roller

This feature will generate a `less` file that you can import into your application theme style. It will add editable variables to theme roller.

Property | Description | Options
--|--|--
Files | Include the list of `scss` or `less` files to be parsed by Theme Roller. |

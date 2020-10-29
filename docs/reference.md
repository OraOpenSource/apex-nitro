# Reference your files

Your APEX application must references the APEX Nitro files. Now you have to reference your files for them to be included when you run your application. You can do in many locations.

| Level       | Access Point                                                                                                             | Purpose                                                                                                  |
| ----------- | ------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------- |
| Application | `Shared Components` > `User Interfaces` > `User Interface Details` > `JavaScript / Cascading Style Sheets` > `File URLs` | Files available for all pages in your app                                                      |
| Theme       | `Shared Components` > `Themes` > `Create / Edit Theme` > `JavaScript and Cascading Style Sheets` > `File URLs`           | Files available for all pages that uses a specific theme in your app                           |
| Theme Style | `Shared Components` > `Themes` > `Create / Edit Theme` > `Theme Styles` > `Create / Edit Theme Style` > `File URLs`      | Files available for all pages that uses a specific theme style of a specific theme in your app |
| Template    | `Shared Components` > `Templates` > `Edit Page Template` > `JavaScript / Cascading Style Sheet` > `File URLs`            | Files available for all pages that uses a specific page template in your app                   |
| Plugin      | `Shared Components` > `Plug-ins` > `Create / Edit Plug-in:` > `File URLs to Load`                                        | Files available for all pages that uses a specific APEX plugin in your app                     |
| Page        | `Page Designer` > `Page X` > `JavaScript / CSS` > `File URLs`                                                            | Files available on one specific page in your app                                               |

Example referencing at the application level:

![setup-reference-application1](/docs/img/setup-reference-application1.png)

![setup-reference-application2](/docs/img/setup-reference-application2.png)

We recommend using the Application level (User Interface Attributes), because this will make your files available across the entire application.

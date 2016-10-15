# APEX Application Setup

APEX Front-End Boost requires some slight modifications to your APEX application. These changes are required in order to have your APEX application communicate with APEX Front-End Boost.

There are two options to setup your application:
- **[Option 1) Standard](#option-1-standard)**
    - 1 Build Option
    - 1 Application Process
- **[Option 2) Custom Application Item](#option-2-custom-application-item)**
    - 1 Build Option
    - 1 Application Item
    - 2 Application Processes

The choice that you use is dependent on how you reference images. If you use `APP_IMAGES` throughout your application then use the first option. If you use a custom application item for the image prefix then use the second option.

## Build Option
**Note: This is required in both options.**

APEX Front-End Boost isn't meant to run in production. This build option is used to limit the scope of APEX Front-End Boost to the development environment only.

In `Shared Components > Build Options (BO)` create a new BO with the following attributes:

Name | Setting
--- | ---
Build Option | `DEV_ONLY`
Status | `Include`
Default on Export | `Exclude`

When you copy/import this application in a different schema anything tagged with the `DEV_ONLY` BO will not be run. If you re-import back into a development environment you'll need to manually change the status to `Include`.

## Option 1) Standard
In this case all your images reference the standard `APP_IMAGES` substitution string.

**Note:** Using this approach has a small known issue. When a page validation fails (ex required item is null and page is submitted), `APP_IMAGES` will **not** point APEX Front-End Boost. Instead it will point to the default location from APEX. There is currently no known fix for this as you can not run a process when a validation fails. For more information please read [What Happens When a Validation Fails?](https://docs.oracle.com/database/121/HTMDB/bldr_validate.htm#HTMDB29158) in the APEX documentation.

#### Application Processes
In `Shared Components > Application Processes` create a new application process with the following attributes:

Name | Setting | Comment
--- | --- | ---
Name | `OOS APEX Front-End Boost Config` |
Sequence | `-999` | Ensures this happens first
Process Point | `On Load: Before Header (page template header)` |
Source | *see below* |
Build Option | `DEV_ONLY` | For security reasons only want this to happen in a controlled development environment

*Source:*
```plsql
declare
    l_cookie owa_cookie.cookie;
begin
    l_cookie := owa_cookie.get('oos-apex-frontend-boost-app-images');

    if l_cookie.vals.count > 0 then
        apex_application.g_flow_images := l_cookie.vals(1);
    end if;
end;
```

Your application need to reference `#APP_IMAGES#`.
> *Examples:*  
> - #APP_IMAGES#js/app#MIN#.js  
> - #APP_IMAGES#css/app#MIN#.css

This can be done at multiple levels:
- **Application level**
    - Shared Components > User Interfaces > User Interface Details > JavaScript / Cascading Style Sheets > File URLs
- **Theme level**
    - Shared Components > Themes > Create / Edit Theme > JavaScript and Cascading Style Sheets > File URLs
- **Template level**
    - Shared Components > Templates > Edit Page Template > JavaScript / Cascading Style Sheet > File URLs
- **Page level**
    - Page Designer > Page X > JavaScript / CSS > File URLs

## Option 2) Custom Application Item
In this case all your images reference a custom image prefix. This example will use `G_APP_IMAGES` which can be replaced with any application item.

#### Application Items
In `Shared Components > Application Items` create a new application item with the following attributes:

Name | Setting
--- | ---
Name | `G_APP_IMAGES`
Scope | `Application`
Session State Protection | `Restricted - May not be set from browser`

`G_APP_IMAGES` replaces #APP_IMAGES#. Your static files need to reference `G_APP_IMAGES` instead of #APP_IMAGES#.
> *Examples:*  
> - &G_APP_IMAGES.js/app#MIN#.js  
> - &G_APP_IMAGES.css/app#MIN#.css

#### Application Processes
In `Shared Components > Application Processes` create these two new application processes with the following attributes:

**1st application process:**

Name | Setting | Comment
--- | --- | ---
Sequence | `-999` | Ensures this happens first
Process Point | `On Load: Before Header (page template header)` |
Name | `OOS APEX Front-End Boost (Dev)` |
Source | *see below* |
Build Option | `DEV_ONLY` | For security reasons only want this to happen in a controlled development environment

*Source:*
```plsql
declare
    l_cookie owa_cookie.cookie;
begin
    l_cookie := owa_cookie.get('oos-apex-frontend-boost-app-images');
    if l_cookie.vals.count > 0 then
        :G_APP_IMAGES := l_cookie.vals(1);
    else
        :G_APP_IMAGES := :APP_IMAGES;
    end if;
end;
```

**2nd Application Process**

Name | Setting | Comment
--- | --- | ---
Sequence | `-999` | Ensures this happens first
Process Point | `On Load: Before Header (page template header)` |
Name | `OOS APEX Front-End Boost (Not Dev)` |
Source | *see below* |
Condition Type | `Value of Item / Column in Expression 1 Is NULL` | Ensures this happens only once per session
Condition Expression 1 | G_APP_IMAGES |
Build Option | `{Not DEV_ONLY} ` | Will run in non-dev environments

*Source:*
```plsql
:G_APP_IMAGES := :APP_IMAGES;
```

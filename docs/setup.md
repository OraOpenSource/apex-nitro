# APEX Setup

APEX Nitro requires some modifications to your app.

### Build Option

APEX Nitro isn't meant to run in production. This build option is used to limit the scope of APEX Nitro to the development environment only.

Head to `Shared Components > Build Options` and create a new build option with the following attributes:

Name | Setting
--- | ---
Build Option | `DEVELOPMENT_ONLY`
Status | `Include`
Default on Export | `Exclude`

When you import an application in a different schema, anything tagged with the `DEVELOPMENT_ONLY` build option will not be run. If you re-import back into a development environment you'll need to manually change the status to `Include`.

### Application Process
Head to `Shared Components > Application Processes` and create a new application process with the following attributes:

Name | Setting | Comment
--- | --- | ---
Name | `OOS APEX Nitro` |
Sequence | `-999` | Ensures this happens first
Process Point | `On Load: Before Header (page template header)` |
Source | *see below* |
Build Option | `DEVELOPMENT_ONLY` | Ensures this only gets run in a development environment

```plsql
declare
	l_cookie owa_cookie.cookie;
begin
	l_cookie := owa_cookie.get('oos-apex-nitro');

	if l_cookie.vals.count > 0 then
		-- Use one of the following depending on your files location
		-- apex_application.g_flow_images := l_cookie.vals(1);
		-- apex_application.g_company_images := l_cookie.vals(1);
		-- apex_application.g_theme_file_prefix := l_cookie.vals(1);
		-- :G_APP_IMAGES := l_cookie.vals(1);
	end if;
end;
```

Which one of the expressions above is right for you?

Substitution String | Files Location | How to Reference
--- | ---
apex_application.g_flow_images | Application Static Files | `#APP_IMAGES#js/app#MIN#.js`<br>`#APP_IMAGES#css/app#MIN#.css`
apex_application.g_company_images | Workspace Static Files | `#WORKSPACE_IMAGES#js/app#MIN#.js`<br>`#WORKSPACE_IMAGES#css/app#MIN#.css`
apex_application.g_theme_file_prefix | Theme Static Files | `#THEME_IMAGES#js/app#MIN#.js`<br>`#THEME_IMAGES#css/app#MIN#.css`
:G_APP_IMAGES | Custom Application Item that contains the path of your files. Name could be different. | `&G_APP_IMAGES.js/app#MIN#.js`<br>`&G_APP_IMAGES.css/app#MIN#.css`

In APEX, you can reference your files at many levels

Level | Access Point
--- | ---
Application | Shared Components > User Interfaces > User Interface Details > JavaScript / Cascading Style Sheets > File URLs
Theme | Shared Components > Themes > Create / Edit Theme > JavaScript and Cascading Style Sheets > File URLs
Template | Shared Components > Templates > Edit Page Template > JavaScript / Cascading Style Sheet > File URLs
Page | Page Designer > Page X > JavaScript / CSS > File URLs

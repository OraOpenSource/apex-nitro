# Troubleshoot
Here are the most common issues people are having.

Please submit an issue on Github if you can't find a solution to your problem.

#### EPERM: operation not permitted
Sometimes when you are trying to launch a project with `apex-nitro launch <project>`, you might get an error like this:

```
APEX Nitro
is now processing your files...
Error: EPERM: operation not permitted, mkdir 'C:\Users\vmorneau\Project\dist\css'
```

It means your operating system is locking the folder APEX Nitro is trying to delete and recreate. It creates a conflict with the operating system and APEX Nitro is unable to process your files.

It usually happens with you are trying to open the `/dist/` folder yourself. There is no need to open the `/dist/` folder yourself. Only the `/src/` folder is relevant to you.

To fix this, close down any program that might interfere with the `/dist/` folder (example: Windows Explorer, Finder, or your code editor) and start again.

#### Unable to publish files
APEX Nitro allows you to automatically publish your files to APEX using this command: `apex-nitro publish <project>`

This is achievable only if you have configured SQLcl properly in your APEX Nitro configuration.

Start by reviewing your configuration using this command: `apex-nitro config <project>`

Look for a section called SQLcl and fill out the fields. You will need to have SQLcl locally on your system. No need to install anything, just point the SQLcl directory to the appropriate field of the APEX Nitro configuration.

This section is inspired by SQL Developer, and allows you to enter your database information using 4 different methods:
1- with SID
2- with Service Name
3- with TNS
4- custom connect string

APEX Nitro doesn't provide any way of validating your connection info. Please validate it yourself in SQL Developer if `apex-nitro publish <project>` doesn't work.

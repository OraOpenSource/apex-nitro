# Moving from APEX Nitro v4 to v5

IMPORTANT: APEX Nitro v5 is NOT backwards compatible with v4. This page will highlight how to take your existing APEX Nitro v4 code to v5.

## Assumptions

- [APEX Nitro v5 is already installed](install.md)

## Migration Steps

1. With APEX Nitro v4, we had a centralized UI to manage all project configurations. That is gone in v5.
2. Identify the project you want to migrate from v4 to v5. This project has a source folder (directory) on your system.
3. Open a command line and go to the source folder from #2
4. Run `apex-nitro init`
5. Answer the questions to configure your project
6. A file `apexnitro.config.json` will be created on the current directory
7. You are done.

You can now use APEX Nitro v5 commands, such as

- `apex-nitro build`
- `apex-nitro launch`
- `apex-nitro upload`

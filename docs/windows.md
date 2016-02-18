You might run into issues with `npm install` on Windows. That is because one of the packages (browsersync) requires C++ runtime libraries.

![](windows-npm-install.png)

**As far as we've tested, these errors/warnings do not affect the project. You will still be able to run `npm start -- --project=yourProjectName`.**

As instructed by [Browsersync's website](https://www.browsersync.io/docs/#windows-users):
> The way to resolve this is to install Visual Studio. At the time of this writing (Feb 2015) the compilation works fine with Visual Studio 2013 Update 4.
> After installation of Visual Studio npm should not throw errors any longer, but only issue warnings.

**Feel free to install Visual Studio or not.** If you do, these errors/warnings will disappear, but it won't change anything to APEX Front-End Boost.

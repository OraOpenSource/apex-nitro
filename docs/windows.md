You might run into issues with `npm install` on Windows. That is because one of the packages (browsersync) requires C++ runtime libraries.

As instructed by [Browsersync's website](https://www.browsersync.io/docs/#windows-users):
> The way to resolve this is to install Visual Studio. At the time of this writing (Feb 2015) the compilation works fine with Visual Studio 2013 Update 4.
> After installation of Visual Studio npm should not throw errors any longer, but only issue warnings.

**As far as we've tested, these errors or warnings do not affect this project. You will still be able to run `npm start -- --project=yourProjectName`.**

Feel free to install Visual Studio or not.

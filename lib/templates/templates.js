var template = function(body) {
    return `
        <html>

            <head>
                <title>AFEB Config</title>

                <meta charset="utf-8">
                <meta name="author" content="OraOpenSource">
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>

                <link href="http://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.7/css/materialize.min.css">
                <style type="text/css">
                    .switch {
                        margin-top: 1.8rem;
                        margin-bottom: 1.8rem;
                    }

                    .switch label {
                        top: 1.25rem;
                    }

                    .input-field .switch+label {
                        margin-top: -1.8rem;
                        font-size: 0.8rem;
                    }

                    body {
                      display: flex;
                      min-height: 100vh;
                      flex-direction: column;
                    }

                    main {
                      flex: 1 0 auto;
                    }

                    .invisible {
                        visibility:hidden!important;
                    }
                </style>
            </head>

            <body>
            <form action="/saveConfig" method="post">
                <!-- Header -->
                <header>
                <nav class="light-blue lighten-1" role="navigation">
                <div class="nav-wrapper container">
                    <span class="brand-logo hide-on-small-only">APEX Front-End Boost Config</span>
                    <span class="brand-logo hide-on-med-and-up">AFEB Config</span>

                    <ul class="right">
                        <li>
                            <button class="btn waves-effect waves-light orange" type="submit" name="action">
                                Save
                            </button>
                        </li>
                    </ul>
                </div>
                </nav>
                </header>
                <!-- / Header -->

                <main>
                    ${body}
                </main>

            </form>

                <!-- Footer -->
                <footer class="page-footer light-blue lighten-1">
                    <div class="container">
                        <div class="row">
                            <div class="col m6 s12">
                                <h5 class="white-text">APEX Front-End Boost</h5>
                                <p class="grey-text text-lighten-4">Boost your JavaScript and CSS productivity in Oracle APEX</p>
                            </div>
                            <div class="col m6 s12 right-align">
                                <h5 class="white-text">About Us</h5>
                                <ul>
                                    <li><a class="white-text" href="http://www.oraopensource.com/">Website</a></li>
                                    <li><a class="white-text" href="https://github.com/OraOpenSource/">Github</a></li>
                                    <li><a class="white-text" href="https://twitter.com/oraopensource">Twitter</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <!-- Footer Bottom -->
                    <div class="footer-copyright">
                        <div class="container">
                            <div class="row">
                                <div class="col s12">
                                    © 2016 OraOpenSource
                                    <span class="grey-text text-lighten-4 right">MIT License</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>

                <script src="https://code.jquery.com/jquery-2.2.4.min.js"></script>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.7/js/materialize.min.js"></script>
                <script>
                    $("#jsConcat_enabled").click(function(){
                        $("#jsConcat_finalName").attr('required', function(_, attr){ return !attr});
                        $("#jsConcat_finalName").parent().toggleClass('invisible');
                    });
                    $("#cssConcat_enabled").click(function(){
                        $("#cssConcat_finalName").attr('required', function(_, attr){ return !attr});
                        $("#cssConcat_finalName").parent().toggleClass('invisible');
                    });
                    $("#sass_enabled").click(function(){
                        $("#sass_includePath").parent().toggleClass('invisible');
                    });
                    $("#less_enabled").click(function(){
                        $("#less_includePath").parent().toggleClass('invisible');
                    });
                    $("#browsersync_enabled").click(function(){
                        $("#browsersync_notify").closest(".input-field").toggleClass('invisible');
                        $("#browsersync_ghostMode").closest(".input-field").toggleClass('invisible');
                    });
                    $("#header_enabled").click(function(){
                        $("#header_packageJsonPath").attr('required', function(_, attr){ return !attr});
                        $("#header_packageJsonPath").parent().toggleClass('invisible');
                    });
                    $("#themeroller_enabled").click(function(){
                        $("#themeroller_finalName").attr('required', function(_, attr){ return !attr});
                        $("#themeroller_finalName").parent().toggleClass('invisible');
                        $("#themeroller_files").attr('required', function(_, attr){ return !attr});
                        $("#themeroller_files").parent().toggleClass('invisible');
                    });
                </script>
            </body>

        </html>
        `;
};

module.exports = {
    asciiAFEB: function() {
        return String.raw`
       ___       _______  _______ .______
      /   \     |   ____||   ____||   _  \
     /  ^  \    |  |__   |  |__   |  |_)  |
    /  /_\  \   |   __|  |   __|  |   _  <
   /  _____  \  |  |     |  |____ |  |_)  |
  /__/     \__\ |__|     |_______||______/

        `;
    },

    banner: function() {
        return ['/*!',
            ' * <%= pkg.name %> - <%= pkg.description %>',
            ' * @author <%= pkg.author %>',
            ' * @version v<%= pkg.version %>',
            ' * @link <%= pkg.homepage %>',
            ' * @license <%= pkg.license %>',
            ' */',
            ''];
    },

    configSavedHTML: function(project) {
        let body = `
            <div class="section">
                <div class="container">
                    <h1 class="header center orange-text">${project}</h1>
                    <div class="row center">
                        <h5 class="header col s12 light">Configuration Saved.</h5>
                        <h5 class="header col s12 light">You can now close this window.</h5>
                    </div>
                </div>
            </div>
        `;

        return template(body);
    },

    // validates if an object is empty (true), otherwise (false)
    configFormHTML: function(project, config) {
        let body = `
            <div class="no-container">
                <div class="row">
                    <div class="col s12">
                        <h2 class="header center orange-text">${project}</h1>
                    </div>
                    <!-- Global -->
                    <div class="col s12 m4">
                        <h5 class="header orange-text">Global</h5>
                        <div class="input-field">
                            <i class="material-icons prefix tooltipped" data-position="top" data-tooltip="This is the URL to your APEX application homepage.">help</i>
                            <input type="url" id="appURL" class="validate" name="appURL" value="${config.appURL}" required placeholder="Example: https://apex.oracle.com/pls/apex/f?p=12192">
                            <label for="appURL">Application URL</label>
                        </div>
                        <div class="input-field">
                            <i class="material-icons prefix tooltipped" data-position="top" data-tooltip="This is the path to your application src folder. If nothing is filled, the current repository will be used with the src folder. This is the URL to your APEX application homepage.">help</i>
                            <input type="text" id="srcFolder" class="validate" name="srcFolder" value="${config.srcFolder}" required placeholder="Example: C:\\Users\\project\\src">
                            <label for="srcFolder">Source Folder</label>
                        </div>
                        <div class="input-field">
                            <i class="material-icons prefix tooltipped" data-position="top" data-tooltip="This is the path to your application dist folder. If nothing is filled, the current repository will be used with the dist folder.">help</i>
                            <input type="text" id="distFolder" class="validate" name="distFolder" value="${config.distFolder}" required placeholder="Example: C:\\Users\\project\\dist">
                            <label for="distFolder">Dist Folder</label>
                        </div>
                    </div>
                    <!-- /Global -->
                    <div class="col m4 s12">
                        <!-- jsConcat -->
                        <h5 class="header orange-text">JavaScript Concatenation</h5>
                        <div class="row">
                            <div class="col s3 input-field switch-fix">
                                <div class="switch">
                                    <label>
                                        <input type="checkbox" id="jsConcat_enabled" name="jsConcat_enabled" value="true" ${(config.jsConcat.enabled ? "checked" : "")}>
                                        <span class="lever"></span>
                                    </label>
                                </div>
                                <label for="jsConcat_enabled">Enabled</label>
                            </div>
                            <div class="col s9 input-field ${(config.jsConcat.enabled ? "" : "invisible")}">
                                <i class="material-icons prefix tooltipped" data-position="top" data-tooltip="Represents the name of the final file, after concatenation.">help</i>
                                <input type="text" id="jsConcat_finalName" name="jsConcat_finalName" value="${config.jsConcat.finalName}" ${(config.jsConcat.enabled ? "required" : "")} placeholder="Example: app">
                                <label for="jsConcat_finalName">Final Name</label>
                            </div>
                        </div>
                        <!-- /jsConcat -->
                        <!-- cssConcat -->
                        <h5 class="header orange-text">CSS Concatenation</h5>
                        <div class="row">
                            <div class="col s3 input-field switch-fix">
                                <div class="switch">
                                    <label>
                                        <input type="checkbox" id="cssConcat_enabled" name="cssConcat_enabled" value="true" ${(config.cssConcat.enabled ? "checked" : "")}>
                                        <span class="lever"></span>
                                    </label>
                                </div>
                                <label for="cssConcat_enabled">Enabled</label>
                            </div>
                            <div class="col s9 input-field ${(config.cssConcat.enabled ? "" : "invisible")}">
                                <i class="material-icons prefix tooltipped" data-position="top" data-tooltip="Represents the name of the final file, after concatenation.">help</i>
                                <input type="text" id="cssConcat_finalName" name="cssConcat_finalName" value="${config.cssConcat.finalName}" ${(config.cssConcat.enabled ? "required" : "")} placeholder="Example: app">
                                <label for="cssConcat_finalName">Final Name</label>
                            </div>
                        </div>
                        <!-- /cssConcat -->
                    </div>
                    <div class="col m4 s12">
                        <!-- Sass -->
                        <h5 class="header orange-text">Sass</h5>
                        <div class="row">
                            <div class="col s3 input-field switch-fix">
                                <div class="switch">
                                    <label>
                                        <input type="checkbox" id="sass_enabled" name="sass_enabled" value="true" ${(config.sass.enabled ? "checked" : "")}>
                                        <span class="lever"></span>
                                    </label>
                                </div>
                                <label for="sass_enabled">Enabled</label>
                            </div>
                            <div class="col s9 input-field ${(config.sass.enabled ? "" : "invisible")}">
                                <i class="material-icons prefix tooltipped" data-position="top" data-tooltip="Include a path to an external Sass folder. Allows to use the @import feature from within that folder.">help</i>
                                <input type="text" id="sass_includePath" name="sass_includePath" value="${config.sass.includePath}" placeholder="Example: C:\\Users\\AnotherProject\\Sass">
                                <label for="sass_includePath">Include Path</label>
                            </div>
                        </div>
                        <!-- /Sass -->
                        <!-- Less -->
                        <h5 class="header orange-text">Less</h5>
                        <div class="row">
                            <div class="col s3 input-field switch-fix">
                                <div class="switch">
                                    <label>
                                        <input type="checkbox" id="less_enabled" name="less_enabled" value="true" ${(config.less.enabled ? "checked" : "")}>
                                        <span class="lever"></span>
                                    </label>
                                </div>
                                <label for="less_enabled">Enabled</label>
                            </div>
                            <div class="col s9 input-field ${(config.less.enabled ? "" : "invisible")}">
                                <i class="material-icons prefix tooltipped" data-position="top" data-tooltip="Include a path to an external Less folder. Allows to use the @import feature from within that folder.">help</i>
                                <input type="text" id="less_includePath" name="less_includePath" value="${config.less.includePath}" placeholder="Example: C:\\Users\\AnotherProject\\Sass">
                                <label for="less_includePath">Include Path</label>
                            </div>
                        </div>
                        <!-- /Less -->
                    </div>
                </div>
                <div class="row">
                    <div class="col m4 s12">
                        <!-- Browsersync -->
                        <h5 class="header orange-text">Browsersync</h5>
                        <div class="row">
                            <div class="col s4 input-field switch-fix">
                                <div class="switch">
                                    <label>
                                        <input type="checkbox" id="browsersync_enabled" name="browsersync_enabled" value="true" ${(config.browsersync.enabled ? "checked" : "")}>
                                        <span class="lever"></span>
                                    </label>
                                </div>
                                <label for="browsersync_enabled">Enabled</label>
                            </div>
                            <div class="col s4 input-field switch-fix ${(config.browsersync.enabled ? "" : "invisible")}">
                                <div class="switch">
                                    <label>
                                        <input type="checkbox" id="browsersync_notify" name="browsersync_notify" value="true" ${(config.browsersync.notify ? "checked" : "")}>
                                        <span class="lever"></span>
                                    </label>
                                </div>
                                <label for="browsersync_notify">Notify</label>
                            </div>
                            <div class="col s4 input-field switch-fix ${(config.browsersync.enabled ? "" : "invisible")}">
                                <div class="switch">
                                    <label>
                                        <input type="checkbox" id="browsersync_ghostMode" name="browsersync_ghostMode" value="true" ${(config.browsersync.ghostMode ? "checked" : "")}>
                                        <span class="lever"></span>
                                    </label>
                                </div>
                                <label for="browsersync_ghostMode">Ghost Mode</label>
                            </div>
                        </div>
                        <!-- /Browsersync -->
                    </div>
                    <div class="col m4 s12">
                        <!-- Header -->
                        <h5 class="header orange-text">Header</h5>
                        <div class="row">
                            <div class="col s3 input-field switch-fix">
                                <div class="switch">
                                    <label>
                                        <input type="checkbox" id="header_enabled" name="header_enabled" value="true" ${(config.header.enabled ? "checked" : "")}>
                                        <span class="lever"></span>
                                    </label>
                                </div>
                                <label for="header_enabled">Enabled</label>
                            </div>
                            <div class="col s9 input-field ${(config.header.enabled ? "" : "invisible")}"">
                                <i class="material-icons prefix tooltipped" data-position="top" data-tooltip="Points to your project's package.json file.">help</i>
                                <input type="text" id="header_packageJsonPath" name="header_packageJsonPath" value="${config.header.packageJsonPath}" ${(config.header.enabled ? "required" : "")} placeholder="Example: C:\\Users\\project\\package.json">
                                <label for="header_packageJsonPath">package.json Path</label>
                            </div>
                        </div>
                        <!-- /Header -->
                    </div>
                    <div class="col m4 s12">
                        <!-- Image Optimization -->
                        <h5 class="header orange-text">Image Optimization</h5>
                        <div class="input-field switch-fix">
                            <div class="switch">
                                <label>
                                    <input type="checkbox" id="imageOptimization_enabled" name="imageOptimization_enabled" value="true" ${(config.imageOptimization.enabled ? "checked" : "")}>
                                    <span class="lever"></span>
                                </label>
                            </div>
                            <label for="imageOptimization_enabled">Enabled</label>
                        </div>
                        <!-- /Image Optimization -->
                    </div>
                </div>

                <!-- Theme Roller -->
                <div class="row">
                    <div class="col s12">
                        <h5 class="header orange-text">Theme Roller</h5>
                        <div class="row">
                            <div class="col s3 m2 input-field switch-fix">
                                <div class="switch">
                                    <label>
                                        <input type="checkbox" id="themeroller_enabled" name="themeroller_enabled" value="true" ${(config.themeroller.enabled ? "checked" : "")}>
                                        <span class="lever"></span>
                                    </label>
                                </div>
                                <label for="themeroller_enabled">Enabled</label>
                            </div>
                            <div class="col s9 m4 input-field ${(config.themeroller.enabled ? "" : "invisible")}"">
                                <i class="material-icons prefix tooltipped" data-position="top" data-tooltip="Represents the name of the final Less file, after concatenating the files array">help</i>
                                <input type="text" id="themeroller_finalName" name="themeroller_finalName" value="${config.themeroller.finalName}" ${(config.themeroller.enabled ? "required" : "")} placeholder="Example: themeroller">
                                <label for="themeroller_finalName">Final Name</label>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col s12 input-field ${(config.themeroller.enabled ? "" : "invisible")}"">
                                <i class="material-icons prefix tooltipped" data-position="top" data-tooltip="Include the order of scss or less files to be parsed by Theme Roller.">help</i>
                                <textarea id="themeroller_files" name="themeroller_files" class="materialize-textarea" ${(config.themeroller.enabled ? "required" : "")} placeholder="Example: C:\\Users\\project\\Sass\\app.scss">${String(config.themeroller.files).replace(/,/g, "\n")}</textarea>
                                <label for="themeroller_files">Files</label>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- / Theme Roller -->
            </div>
        `;

        return template(body);
    }
};

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
                </style>
            </head>

            <body>
                <!-- Header -->
                <header>
                <nav class="light-blue lighten-1" role="navigation">
                    <div class="nav-wrapper container">
                        <a id="logo-container" href="#" class="brand-logo">APEX Front-End Boost Config</a>

                        <ul class="right hide-on-med-and-down">
                            <li><a href="https://github.com/OraOpenSource/apex-frontend-boost">Github</a></li>
                        </ul>

                        <ul id="nav-mobile" class="side-nav">
                            <li><a href="https://github.com/OraOpenSource/apex-frontend-boost">Github</a></li>
                        </ul>

                        <a href="#" data-activates="nav-mobile" class="button-collapse"><i class="material-icons">menu</i></a>
                    </div>
                </nav>
                </header>
                <!-- / Header -->

                <main>
                    ${body}
                </main>

                <!-- Footer -->
                <footer class="page-footer light-blue lighten-1">
                    <div class="container">
                        <div class="row">
                            <div class="col l6 s12">
                                <h5 class="white-text">APEX Front-End Boost</h5>
                                <p class="grey-text text-lighten-4">Boost your JavaScript and CSS productivity in Oracle APEX</p>
                            </div>
                            <div class="col l6 s12 right-align">
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
                    });
                    $("#cssConcat_enabled").click(function(){
                        $("#cssConcat_finalName").attr('required', function(_, attr){ return !attr});
                    });
                    $("#header_enabled").click(function(){
                        $("#header_packageJsonPath").attr('required', function(_, attr){ return !attr});
                    });
                    $("#themeroller_enabled").click(function(){
                        $("#themeroller_finalName").attr('required', function(_, attr){ return !attr});
                        $("#themeroller_files").attr('required', function(_, attr){ return !attr});
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
            <form action="/saveConfig" method="post">
                <div class="section">
                    <div class="container">
                        <h1 class="header center orange-text">${project}</h1>
                        <div class="row center">
                            <h5 class="header col s12 light">Fill out your project configuration below</h5>
                        </div>
                    </div>
                </div>

                <!-- Global -->
                <div class="section">
                    <div class="container">
                        <h3 class="header orange-text">Global</h3>
                        <div class="row">
                            <div class="col s12 input-field">
                                <input type="url" id="appURL" class="validate" name="appURL" value="${config.appURL}" required>
                                <label for="appURL">Application URL</label>
                            </div>
                            <div class="col s12 input-field">
                                <input type="text" id="srcFolder" class="validate" name="srcFolder" value="${config.srcFolder}" required>
                                <label for="srcFolder">Source Folder</label>
                            </div>
                            <div class="col s12 input-field">
                                <input type="text" id="distFolder" class="validate" name="distFolder" value="${config.distFolder}" required>
                                <label for="distFolder">Dist Folder</label>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- /Global -->

                <!-- jsConcat & cssConcat -->
                <div class="section">
                    <div class="container">
                        <div class="row">
                            <div class="col l6 s12">
                                <h3 class="header orange-text">JavaScript<br>Concatenation</h3>
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
                                    <div class="col s9 input-field">
                                        <input type="text" id="jsConcat_finalName" name="jsConcat_finalName" value="${config.jsConcat.finalName}" ${(config.jsConcat.enabled ? "required" : "")}>
                                        <label for="jsConcat_finalName">Final Name</label>
                                    </div>
                                </div>
                            </div>
                            <div class="col l6 s12">
                                <h3 class="header orange-text">CSS<br>Concatenation</h3>
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
                                    <div class="col s9 input-field">
                                        <input type="text" id="cssConcat_finalName" name="cssConcat_finalName" value="${config.cssConcat.finalName}" ${(config.cssConcat.enabled ? "required" : "")}>
                                        <label for="cssConcat_finalName">Final Name</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- / jsConcat & cssConcat -->

                <!-- Sass & Less -->
                <div class="section">
                    <div class="container">
                        <div class="row">
                            <div class="col l6 s12">
                                <h3 class="header orange-text">Sass</h3>
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
                                    <div class="col s9 input-field">
                                        <input type="text" id="sass_includePath" name="sass_includePath" value="${config.sass.includePath}">
                                        <label for="sass_includePath">Include Path</label>
                                    </div>
                                </div>
                            </div>
                            <div class="col l6 s12">
                                <h3 class="header orange-text">Less</h3>
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
                                    <div class="col s9 input-field">
                                        <input type="text" id="less_includePath" name="less_includePath" value="${config.less.includePath}">
                                        <label for="less_includePath">Include Path</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- / Sass & Less -->

                <!-- Browsersync & Header -->
                <div class="section">
                    <div class="container">
                        <div class="row">
                            <div class="col l6 s12">
                                <h3 class="header orange-text">Browsersync</h3>
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
                                    <div class="col s4 input-field switch-fix">
                                        <div class="switch">
                                            <label>
                                                <input type="checkbox" id="browsersync_notify" name="browsersync_notify" value="true" ${(config.browsersync.notify ? "checked" : "")}>
                                                <span class="lever"></span>
                                            </label>
                                        </div>
                                        <label for="browsersync_notify">Notify</label>
                                    </div>
                                    <div class="col s4 input-field switch-fix">
                                        <div class="switch">
                                            <label>
                                                <input type="checkbox" id="browsersync_ghostMode" name="browsersync_ghostMode" value="true" ${(config.browsersync.ghostMode ? "checked" : "")}>
                                                <span class="lever"></span>
                                            </label>
                                        </div>
                                        <label for="browsersync_ghostMode">Ghost Mode</label>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col s4 input-field">
                                        <input type="number" id="browsersync_port" class="validate" name="browsersync_port" value="${config.browsersync.port}" min="0">
                                        <label for="browsersync_port">Port</label>
                                    </div>
                                    <div class="col s4 input-field">
                                        <input type="number" id="browsersync_uiPort" class="validate" name="browsersync_uiPort" value="${config.browsersync.uiPort}" min="0">
                                        <label for="browsersync_uiPort">UI Port</label>
                                    </div>
                                    <div class="col s4 input-field">
                                        <input type="number" id="browsersync_weinrePort" class="validate" name="browsersync_weinrePort" value="${config.browsersync.weinrePort}" min="0">
                                        <label for="browsersync_weinrePort">Weinre Port</label>
                                    </div>
                                </div>
                            </div>
                            <div class="col l6 s12">
                                <h3 class="header orange-text">Header</h3>
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
                                    <div class="col s9 input-field">
                                        <input type="text" id="header_packageJsonPath" name="header_packageJsonPath" value="${config.header.packageJsonPath}" ${(config.header.enabled ? "required" : "")}>
                                        <label for="header_packageJsonPath">package.json Path</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- / Sass & Less -->

                <!-- Theme Roller -->
                <div class="section">
                    <div class="container">
                        <div class="row">
                            <div class="col s12">
                                <h3 class="header orange-text">Theme Roller</h3>
                                <div class="row">
                                    <div class="col s3 input-field switch-fix">
                                        <div class="switch">
                                            <label>
                                                <input type="checkbox" id="themeroller_enabled" name="themeroller_enabled" value="true" ${(config.themeroller.enabled ? "checked" : "")}>
                                                <span class="lever"></span>
                                            </label>
                                        </div>
                                        <label for="themeroller_enabled">Enabled</label>
                                    </div>
                                    <div class="col s9 input-field">
                                        <input type="text" id="themeroller_finalName" name="themeroller_finalName" value="${config.themeroller.finalName}" ${(config.themeroller.enabled ? "required" : "")}>
                                        <label for="themeroller_finalName">Final Name</label>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col s12 input-field">
                                        <textarea id="themeroller_files" name="themeroller_files" class="materialize-textarea" ${(config.themeroller.enabled ? "required" : "")}>${String(config.themeroller.files).replace(/,/g, "\n")}</textarea>
                                        <label for="themeroller_files">Files</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- / Theme Roller -->

                <!-- Image Optimization -->
                <div class="section">
                    <div class="container">
                        <div class="row">
                            <div class="col s12">
                                <h3 class="header orange-text">Image Optimization</h3>
                                <div class="row">
                                    <div class="col s12 input-field switch-fix">
                                        <div class="switch">
                                            <label>
                                                <input type="checkbox" id="imageOptimization_enabled" name="imageOptimization_enabled" value="true" ${(config.imageOptimization.enabled ? "checked" : "")}>
                                                <span class="lever"></span>
                                            </label>
                                        </div>
                                        <label for="imageOptimization_enabled">Enabled</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- / Image Optimization -->

                <!-- Submit -->
                <div class="section">
                    <div class="container">
                        <div class="row center">
                            <div class="col s12">
                                <button class="btn waves-effect waves-light orange" type="submit" name="action">
                                    Save Configuration
                                    <i class="material-icons right">send</i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- / Submit -->
            </form>
        `;

        return template(body);
    }
};

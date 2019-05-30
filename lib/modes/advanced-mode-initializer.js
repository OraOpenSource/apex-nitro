const path = require('path');
const fs = require('fs');
const inquirer = require('inquirer');
const chalk = require('chalk');

module.exports = class AdvancedModeInitializer {
	async init(config) {
		// Ask the questions for advanced mode
		const advancedModeQuestions = this.getQuestions();
		const advancedModeConfig = await inquirer.prompt(advancedModeQuestions);

		// Set js defaults
		if (advancedModeConfig.js.defaults === 'default') {
			advancedModeConfig.js.processor = 'javascript';
			advancedModeConfig.js.jsConcat = true;
			advancedModeConfig.js.jsConcatFilename = 'app';
			delete advancedModeConfig.js.defaults;
		}

		// Set css defaults
		if (advancedModeConfig.cssDefaults === 'default') {
			advancedModeConfig.css.language = 'css';
			advancedModeConfig.css.cssConcat = true;
			advancedModeConfig.css.cssConcatFilename = 'app';
			delete advancedModeConfig.css.defaults;
		}

		// Set browser defaults
		if (advancedModeConfig.browsersync.defaults === 'default') {
			advancedModeConfig.browsersync.realTime = true;
			advancedModeConfig.browsersync.ghostMode = false;
			advancedModeConfig.browsersync.notify = true;
			advancedModeConfig.apex = {};
			advancedModeConfig.apex.openBuilder = false;
			delete advancedModeConfig.browsersync.defaults;
		}

		// Set header defaults
		if (advancedModeConfig.header.defaults === 'default') {
			advancedModeConfig.header.enabled = false;
			delete advancedModeConfig.header.defaults;
		}

		// Set publish defaults
		if (advancedModeConfig.publish.defaults === 'default') {
			advancedModeConfig.publish.destination = 'application';
			advancedModeConfig.publish.path = 'sqlcl';
			advancedModeConfig.publish.username = '';
			advancedModeConfig.publish.password = '';
			advancedModeConfig.publish.connectionString = '';
			delete advancedModeConfig.publish.defaults;
		} else if (advancedModeConfig.publish.password !== '') {
			advancedModeConfig.publish.password = '***************';
		}

		// Add default port 4000 for nitro
		advancedModeConfig.launchPort = 4000;

		return {...config, ...advancedModeConfig};
	}

	initFiles(config) {
		const files = [];

		if (config.js.processor === 'javascript') {
			const content = `(function (apex, $) {
    console.log('Your JavaScript here');
})(apex, apex.jQuery);`;

			if (config.js.jsConcat) {
				files.push({
					path: path.resolve(config.srcFolder, 'js', `${config.js.jsConcatFilename}.js`),
					content
				});
			} else {
				files.push({
					path: path.resolve(config.srcFolder, 'js', 'app.js'),
					content
				});
			}
		}

		if (config.css.language === 'css') {
			if (config.cssCssConcat) {
				files.push({
					path: path.resolve(
						config.srcFolder,
						'css',
						`${config.cssCssConcatFilename}.css`
					),
					content: ''
				});
			} else {
				files.push({
					path: path.resolve(config.srcFolder, 'css', 'app.css'),
					content: ''
				});
			}
		}

		files.forEach(file => {
			fs.outputFileSync(file.path, file.content);
			console.log(`${file.path} ${chalk.green('created')}.`);
		});
	}

	isRequired(input) {
		if (input !== '') {
			return true;
		}

		return 'Required.';
	}

	getQuestions() {
		const questions = [
			{
				type: 'input',
				name: 'appURL',
				message: 'The URL of your APEX application?',
				validate: this.isRequired
			},
			{
				type: 'input',
				name: 'srcFolder',
				message: 'Location of the source folder?',
				default: './src',
				validate: this.isRequired
			},
			{
				type: 'input',
				name: 'distFolder',
				message: 'Location of the distribution folder?',
				default: './dist',
				validate: this.isRequired
			},
			{
				type: 'list',
				name: 'js.defaults',
				message: 'Configure JavaScript settings',
				choices: [
					{
						name: 'Use APEX Nitro default JavaScript settings',
						value: 'default'
					},
					{
						name: 'Customize',
						value: 'custom'
					}
				],
				default: 'default'
			},
			{
				type: 'list',
				name: 'js.processor',
				message: 'Choose how your JavaScript will be processed',
				choices: [
					{
						name: 'JavaScript (default)',
						value: 'javascript'
					},
					{
						name: 'TypeScript',
						value: 'typescript'
					}
				],
				default: 'javascript',
				when(answers) {
					return answers.js.defaults === 'custom';
				}
			},
			{
				type: 'confirm',
				name: 'js.jsConcat',
				message: 'Concatenate all final JavaScript files into one?',
				default: true,
				when(answers) {
					return (
						answers.js.defaults === 'custom' && answers.js.processor === 'javascript'
					);
				}
			},
			{
				type: 'input',
				name: 'js.jsConcatFilename',
				message: 'Name of the final concatenated JavaScript file?',
				default: 'app',
				when(answers) {
					return (
						answers.js.defaults === 'custom' &&
						answers.js.processor === 'javascript' &&
						answers.js.jsConcat
					);
				},
				validate: this.isRequired
			},
			{
				type: 'confirm',
				name: 'js.tsConcat',
				message: 'Concatenate all final JavaScript files into one?',
				default: true,
				when(answers) {
					return (
						answers.js.defaults === 'custom' && answers.js.processor === 'typescript'
					);
				}
			},
			{
				type: 'input',
				name: 'js.tsConcatFilename',
				message: 'Name of the final concatenated JavaScript file?',
				default: 'app',
				when(answers) {
					return (
						answers.js.defaults === 'custom' &&
						answers.js.processor === 'typescript' &&
						answers.jsTSConcat
					);
				},
				validate: this.isRequired
			},
			{
				type: 'list',
				name: 'css.defaults',
				message: 'Configure CSS settings',
				choices: [
					{
						name: 'Use APEX Nitro default CSS settings',
						value: 'default'
					},
					{
						name: 'Customize',
						value: 'custom'
					}
				],
				default: 'default'
			},
			{
				type: 'list',
				name: 'css.language',
				message: 'Choose how your CSS will be processed',
				choices: [
					{
						name: 'CSS (default)',
						value: 'css'
					},
					{
						name: 'Sass',
						value: 'sass'
					},
					{
						name: 'Less',
						value: 'less'
					}
				],
				default: 'css',
				when(answers) {
					return answers.css.defaults === 'custom';
				}
			},
			{
				type: 'confirm',
				name: 'css.cssConcat',
				message: 'Concatenate all final CSS files into one?',
				default: false,
				when(answers) {
					return answers.css.defaults === 'custom';
				}
			},
			{
				type: 'input',
				name: 'css.cssConcatFilename',
				message: 'Name of the final concatenated CSS file?',
				default: 'app',
				when(answers) {
					return answers.cssDefaults === 'custom' && answers.cssCssConcat;
				},
				validate: this.isRequired
			},
			{
				type: 'input',
				name: 'css.sassIncludePath',
				message: 'Path to import an external Sass folder (optional)',
				when(answers) {
					return answers.cssDefaults === 'custom' && answers.css.language === 'sass';
				}
			},
			{
				type: 'input',
				name: 'css.lessIncludePath',
				message: 'Path to import an external Less folder (optional)',
				when(answers) {
					return answers.cssDefaults === 'custom' && answers.css.language === 'less';
				}
			},
			{
				type: 'list',
				name: 'browsersync.defaults',
				message: 'Configure browser settings',
				choices: [
					{
						name: 'Use APEX Nitro default browser settings',
						value: 'default'
					},
					{
						name: 'Customize',
						value: 'custom'
					}
				],
				default: 'default'
			},
			{
				type: 'confirm',
				name: 'browsersync.realTime',
				message: 'Enable real-time synchronization?',
				default: true,
				when(answers) {
					return answers.browsersync.defaults === 'custom';
				}
			},
			{
				type: 'confirm',
				name: 'browsersync.ghostMode',
				message: 'Enable external devices synchronization?',
				default: false,
				when(answers) {
					return answers.browsersync.defaults === 'custom';
				}
			},
			{
				type: 'confirm',
				name: 'browsersync.notify',
				message: 'Enable push notifications on success and errors?',
				default: false,
				when(answers) {
					return answers.browsersync.defaults === 'custom';
				}
			},
			{
				type: 'confirm',
				name: 'apex.openBuilder',
				message: 'Open APEX builder when launching APEX Nitro?',
				when(answers) {
					return answers.browsersync.defaults === 'custom';
				}
			},
			{
				type: 'list',
				name: 'header.defaults',
				message: 'Configure header settings',
				choices: [
					{
						name: 'Use APEX Nitro default header settings',
						value: 'default'
					},
					{
						name: 'Customize',
						value: 'custom'
					}
				],
				default: 'default'
			},
			{
				type: 'confirm',
				name: 'header.enabled',
				message: 'Enable automatic header comment blocks on distribution files?',
				default: false,
				when(answers) {
					return answers.header.defaults === 'custom';
				}
			},
			{
				type: 'input',
				name: 'header.packageJsonPath',
				message: 'Path to the project "package.json" file',
				when(answers) {
					return answers.header.defaults === 'custom' && answers.header.enabled;
				},
				validate: this.isRequired
			},
			{
				type: 'list',
				name: 'publish.defaults',
				message: 'Configure publish settings',
				choices: [
					{
						name: 'Use APEX Nitro default publish settings',
						value: 'default'
					},
					{
						name: 'Customize',
						value: 'custom'
					}
				],
				default: 'default'
			},
			{
				type: 'list',
				name: 'publish.destination',
				message: 'Choose where to upload your files in APEX',
				choices: [
					{
						name: 'Application static files (default)',
						value: 'application'
					},
					{
						name: 'Workspace static files',
						value: 'workspace'
					},
					{
						name: 'Theme files',
						value: 'theme'
					},
					{
						name: 'Plugin files',
						value: 'plugin'
					}
				],
				default: 'application',
				when(answers) {
					return answers.publish.defaults === 'custom';
				}
			},
			{
				type: 'input',
				name: 'publish.pluginName',
				message: 'Plugin internal name?',
				when(answers) {
					return (
						answers.publish.defaults === 'custom' &&
						answers.publishDestination === 'plugin'
					);
				},
				validate: this.isRequired
			},
			{
				type: 'input',
				name: 'publish.path',
				message: 'Path to SQLcl?',
				default: 'sqlcl',
				when(answers) {
					return answers.publish.defaults === 'custom';
				},
				validate: this.isRequired
			},
			{
				type: 'input',
				name: 'publish.username',
				message: 'Enter database user:',
				when(answers) {
					return answers.publish.defaults === 'custom';
				},
				validate: this.isRequired
			},
			{
				type: 'password',
				name: 'publish.password',
				message: 'Enter database password (optional):',
				when(answers) {
					return answers.publish.defaults === 'custom';
				}
			},
			{
				type: 'input',
				name: 'publish.connectionString',
				message: 'Enter database connection string:',
				when(answers) {
					return answers.publish.defaults === 'custom';
				},
				validate: this.isRequired
			}
		];
		return questions;
	}
};

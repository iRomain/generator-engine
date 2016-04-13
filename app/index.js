var generators = require('yeoman-generator');
var yosay = require('yosay');
var _ = require('lodash');

module.exports = generators.Base.extend({

  constructor: function () {
    
    // Calling the super constructor is important so our generator is correctly set up
    generators.Base.apply(this, arguments);

    // Skip welcome message
    this.option('skip-welcome-message', {
      desc: 'Skips the welcome message',
      type: Boolean
    });

    // Static input
    this.option('email', {
      desc: 'Your email address',
      type: String,
      defaults: 'no@email.com'
    });
    //access with this.options['email']

  },


  initializing: function () {
    console.log('initializing is running');
    this.pkg = require('../package.json');
  },
  

  prompting: function () {

    var done = this.async();

    if (!this.options['skip-welcome-message']) {
      this.log(yosay('Welcome to the business generator!'));
    }

    var prompts = [{
      type    : 'input',
      name    : 'name',
      message : 'Your business name',
      default : _.camelCase(this.appname) // Default to current folder name
    }, {
      type: 'checkbox',
      name: 'frontends',
      message: 'Which frontend(s) would you like to build?',
      choices: [{
          name: 'Web',
          value: 'includeWeb',
          checked: true
        }, {
          name: 'Android',
          value: 'includeAndroid',
          checked: false
        }, {
          name: 'iOS',
          value: 'includeIOS',
          checked: false
        }, {
          name: 'Mac',
          value: 'includeMac',
          checked: false
        }, {
          name: 'Linux',
          value: 'includeLinux',
          checked: false
        }, {
          name: 'Windows',
          value: 'includeWindows',
          checked: false
        }]
    }];

    this.prompt(prompts, function (answers) {
      var frontends = answers.frontends;

      function hasFrontend(front) {
        return frontends && frontends.indexOf(front) !== -1;
      };

      // manually deal with the response, get back and store the results.
      // we change a bit this way of doing to automatically do this in the self.prompt() method.
      this.includeWeb = hasFrontend('includeWeb');
      this.includeAndroid = hasFrontend('includeAndroid');
      this.includeIOS = hasFrontend('includeIOS');
      this.includeMac = hasFrontend('includeMac');
      this.includeLinux = hasFrontend('includeLinux');
      this.includeWindows = hasFrontend('includeWindows');

      done();
    }.bind(this));
  },




  configuring: function () {
    console.log('configuring is running');
  },




  default: function () {
    console.log('default is running');
  },




  writing: function () {
    console.log('writing is running');
  },




  conflicts: function () {
    console.log('conflicts is running');
  },




  install: function () {
    console.log('install is running');
  },




  end: function () {
    console.log('end is running');
  },













  method1: function () {
    console.log('method 1 just ran');
  },
  method2: function () {
    console.log('method 2 just ran');
  }

});

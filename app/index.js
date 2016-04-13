var generators = require('yeoman-generator');
var yosay = require('yosay');
var _ = require('lodash');
var mkdirp = require('mkdirp');

module.exports = generators.Base.extend({

  constructor: function () {
    
    // Calling the super constructor is important so our generator is correctly set up
    generators.Base.apply(this, arguments);

    // Skip welcome message
    this.option('skip-welcome-message', {
      desc: 'Skips the welcome message',
      type: Boolean
    });

  },


  initializing: function () {
    this.log('initializing is running');
    this.pkg = require('../package.json');
    this.dateCreated = Date();
  },
  

  prompting: function () {

    var done = this.async();

    if (!this.options['skip-welcome-message']) {
      this.log(yosay('Welcome to the business generator!'));
    }

    var prompts = [{
      type    : 'input',
      name    : 'businessName',
      message : 'Your Business Name',
      default : _.startCase(this.appname) // Default to current folder name
    }, {
      type    : 'input',
      name    : 'ownerName',
      message : 'Your Name',
      store   : true
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
      this.businessName = answers.businessName;
      this.ownerName = answers.ownerName;
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
    this.log('configuring is running');
  },




  default: function () {
    this.log('default is running');
  },




  writing: function () {
    this.log('writing is running');

    // Init ReadMe file
    this.fs.copyTpl(
      this.templatePath('README.md'),
      this.destinationPath('README.md'),
      { businessName: this.businessName,
        dateCreated: this.dateCreated,
        ownerName: this.ownerName
      }
    );

    // Add backend
    mkdirp('code/backend');

    // Add frontend(s)
    if(this.includeWeb) {
      mkdirp('code/web');
    }

    if(this.includeAndroid) {
      mkdirp('code/android');
    }

    if(this.includeIOS) {
      mkdirp('code/ios');
    }

    if(this.includeMac) {
      mkdirp('code/mac');
    }

    if(this.includeLinux) {
      mkdirp('code/linux');
    }

    if(this.includeWindows) {
      mkdirp('code/windows');
    }

    //this.directory('code/android', 'code/android');

  },




  conflicts: function () {
    this.log('conflicts is running');
  },




  install: function () {
    this.log('install is running');
  },




  end: function () {
    this.log('end is running');
  },













  method1: function () {
    this.log('method 1 just ran');
  },
  method2: function () {
    this.log('method 2 just ran');
  }

});

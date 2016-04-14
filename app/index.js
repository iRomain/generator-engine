var generators = require('yeoman-generator');
var cowsay = require('cowsay');
var _ = require('lodash');
var mkdirp = require('mkdirp');
var optionOrPrompt = require('yeoman-option-or-prompt');


module.exports = generators.Base.extend({

  _optionOrPrompt: optionOrPrompt,

  constructor: function () {
    
    // Calling the super constructor is important so our generator is correctly set up
    generators.Base.apply(this, arguments);

  },


  initializing: function () {
    this.log('initializing is running');
    this.pkg = require('../package.json');
    this.dateCreated = Date();
  },
  

  prompting: function () {

    var done = this.async();

    this.log(cowsay.think({
        text : 'Let\'s prepare the engine...',
        f: 'default'
    }));

    var prompts = [

    // Provided by generator-business (if used within)
    {
      type    : 'input',
      name    : 'businessName',
      message : 'Your Business Name',
      default : _.startCase(this.appname)
    }, {
      type    : 'input',
      name    : 'ownerName',
      message : 'Your Name',
      store   : true
    }, {
      type    : 'input',
      name    : 'ownerEmail',
      message : 'Your Email',
      store   : true
    }, {
      type    : 'input',
      name    : 'domainName',
      message : 'Your business domain name:',
      default : _.kebabCase(this.appname) + '.com'
    }, {
      type: 'confirm',
      name: 'generateDesign',
      message: 'Do you wish to bootstrap some design?',
      default: false
    }, {
      type: 'confirm',
      name: 'generateMarketing',
      message: 'Do you wish to bootstrap some marketing?',
      default: false
    }, {
      type: 'confirm',
      name: 'generateSEO',
      message: 'Do you wish to generate some SEO?',
      default: false
    },

    // Not provided by generator-business (if used within)
    {
      type: 'confirm',
      name: 'includeBackend',
      message: 'Do you wish to build a backend?',
      default: true
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
    }, {
      type: 'confirm',
      name: 'createRepos',
      message: 'Do you wish to create the accounts and repositories?',
      default: false
    }];

    this._optionOrPrompt(prompts, function (answers) {
      
      this.answers = answers;
      var frontends = answers.frontends;

      function hasFrontend(front) {
        return frontends && frontends.indexOf(front) !== -1;
      };

      this.businessName = answers.businessName;
      this.ownerName = answers.ownerName;
      this.ownerEmail = answers.ownerEmail;
      this.domainName = answers.domainName;

      this.includeBackend = answers.includeBackend;
      this.createRepos = answers.createRepos;

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

    // Add backend
    if(this.includeBackend) {

      mkdirp('code');
      this.spawnCommandSync('git', ['clone', 'https://github.com/iRomain/api-bootstrap.git', 'code/backend']); 

      if(this.createRepos) {
                
        process.chdir("code/backend/");
        this.spawnCommandSync('git', ['add', '.']);
        this.spawnCommandSync('git', ['commit', '-m"Initial commit"']);
        this.spawnCommandSync('git', ['remote', 'remove', 'origin']);
        this.spawnCommandSync('hub', ['create', '-d', 'Backend for ' + this.domainName, _.kebabCase(this.businessName) + '-backend']);
        //this.spawnCommandSync('git', ['remote', 'add', 'origin', repo]);
        this.spawnCommandSync('git', ['push', '--set-upstream', 'origin', 'master']);
      }
    }
    
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










  _createGithubRepo: function (appendix) {
    var repo = _.kebabCase(this.businessName) + '-' + appendix;
    return 'https://github.com/iRomain/' + repo;
  },


  method1: function () {
    this.log('method 1 just ran');
  },
  method2: function () {
    this.log('method 2 just ran');
  }

});

Router.configure({
  layoutTemplate: 'MasterLayout',
  // loadingTemplate: 'Loading',
  // notFoundTemplate: 'NotFound',
  templateNameConverter: 'upperCamelCase',
  routeControllerNameConverter: 'upperCamelCase'
});

Router.map(function () {
  this.route('home', {
    path: '/'
  });
});
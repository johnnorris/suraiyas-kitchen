HomeController = RouteController.extend({
  waitOn: function () {
    Meteor.subscribe("products");
  },
  data: function () {
    return {
      products: Products.find()
    }
  }
});
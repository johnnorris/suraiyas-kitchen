Meteor.startup(function () {
  fill = function(collection, source) {
    collection.remove();
    return JSON.parse(Assets.getText(source)).forEach(function(it) {
      return Meteor.call("createProduct", it);
    });
  };

  fill(Products, "products.json", function(name) {
    return {
      name: name
    };
  });
});

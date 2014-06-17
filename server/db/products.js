Meteor.startup(function () {
  fill = function(collection, source) {
    collection.remove();
    return JSON.parse(Assets.getText(source)).forEach(function(it) {
      return Meteor.call("create_product", it);
    });
  };

  fill(Products, "products.json", function(name) {
    return {
      name: name
    };
  });
});

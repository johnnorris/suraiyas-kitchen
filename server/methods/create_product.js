Meteor.methods({

	createProduct: function (product) {

		var slug = product.name.toLowerCase().replace(/\W/g, '-');

		product = _.extend(product, {slug: slug});

		return Products.insert(product);
	}

});
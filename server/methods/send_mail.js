Meteor.methods({
  sendEnquiry: function (options) {
    var email = {
      to: "johntnorris@outlook.com", 
      from: options.from,
      subject: "CUSTOMER ENQUIRY",
      html: options.message
    };

    Meteor.Mandrill.send(email);
  }
});

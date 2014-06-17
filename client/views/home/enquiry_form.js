Template.EnquiryForm.events({
  'submit form': function (e, tmpl) {
    console.log("send");
    e.preventDefault();
    Meteor.call("sendEnquiry", {from: "adamdawkins@gmail.com", message: "hello john" });
  }
});

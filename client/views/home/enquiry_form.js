Template.EnquiryForm.events({
  'submit form': function (e, tmpl) {
    e.preventDefault();

    var form = tmpl.find('form'),
      enquiry = {from: form.from.value, message: form.message.value };

    console.log('EnquiryForm', form, enquiry);

    Meteor.call("sendEnquiry", enquiry);
  }
});
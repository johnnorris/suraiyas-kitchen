var suraiya = suraiya || {};

suraiya.setHeaderHeight = function () {
  $('header').css('height', $(window).height());
}

suraiya.internalLinkScroll = function () {
  $('[href^="#"]').click(function () {
    var id = this.href.split('#')[1];

    $('html, body').animate({
      scrollTop: $('#' + id).offset().top
    }, 1000)
  });
};

suraiya.showContactForm = function (e) {
  if (e) e.preventDefault();

  var productName = $(this).siblings('.name').text();
  var occassionID = Math.floor(Math.random() * 3);
  var occassion = ['my son\'s birthday', 'my wife\'s 50th', 'a family get together'][occassionID];
  var loves = ['He loves Superman', 'She loves sparkley things', 'They love chocolate'][occassionID];
  var name = ['Daisy', 'Mark', 'Melissa'][occassionID];

  var message =
    'Hi Suraiya!\n'+
    'I love your ' + productName + ', and think it\'ll be perfect for ' + occassion + ' this Saturday 9th August.\n'+
    loves + '! :)\n'+
    'Can you let me know how much that will be?\n'+
    'Thanks,\n'+
    name;

  $('button', '.contact.modal').text('Send');


  $('.contact.modal').modal('show');

  $('textarea', '.contact.modal').val(message);
  $('[name="product"]', '.contact.modal').val(productName);
};


Meteor.startup(function () {

  $(window).on('resize.suraiya', suraiya.setHeaderHeight);

  Template.Header.rendered = function () {
    suraiya.setHeaderHeight();
  };

  Template.Home.rendered = function () {
    suraiya.internalLinkScroll();

    $.stellar();

    GoogleMaps.init(
      {},
      function(){
          var mapOptions = {
              zoom: 13,
              mapTypeId: google.maps.MapTypeId.ROADMAP
          };
          map = new google.maps.Map(document.getElementsByClassName('map')[0], mapOptions);
          map.setCenter(new google.maps.LatLng( 51.6270739, -0.7528838 ));
      }
    );
  };

  Template.Product.rendered = function () {
    $('button', '#products').click(suraiya.showContactForm);
  };

  Template.EnquiryForm.rendered = function () {
    $('.contact .form')
      .form({
        firstName: {
          identifier  : 'your-email',
          rules: [
            {
              type   : 'empty',
              prompt : 'Please enter your email'
            }
          ]
        },
        lastName: {
          identifier  : 'your-message',
          rules: [
            {
              type   : 'empty',
              prompt : 'Please enter a message for me!'
            }
          ]
        }
      }, {
        inline: true,
        on: 'submit',
        onSuccess: function (e) {
          e.preventDefault();

          var form = this;
          var enquiry = {
            from: form['your-email'].value,
            message: form['your-message'].value.replace(/\n/g, '<br>'),
            product: form['product'].value
          };

          $('button', form).text('Sending...').removeClass('positive');

          $('button', form).animate({
            width: '100%'
          }, 3000, function () {
            $('button', form).text('Sent!').addClass('positive').transition('pulse');
          });

          setTimeout(function () {
            Meteor.call("sendEnquiry", enquiry);
            $('.contact.modal').modal('hide');
          }, 4000);
        }
      })
    ;
  };
});
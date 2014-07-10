var suraiya = suraiya || {};

suraiya.setHeaderHeight = function () {
  $('header').css('height', $(window).height());
}

suraiya.internalLinkScroll = function () {
  $('[href^="#"]').click(function () {
    var id = this.href.split('#')[1];

    $('html, body').animate({
      scrollTop: $('#' + id).offset().top
    }, 500)
  });
};



Meteor.startup(function () {

  $(window).on('resize.suraiya', suraiya.setHeaderHeight);

  Template.Header.rendered = function () {
    suraiya.setHeaderHeight();
  };

  Template.Home.rendered = function () {
    suraiya.internalLinkScroll();

    $.stellar();
  };

});
// Back to top button
// $(window).scroll(function () {
    // if ($(this).scrollTop() > 0) {
        $('.back-to-top').fadeIn('slow');
    // } else {
    //     $('.back-to-top').fadeOut('slow');
    // }
// });
$('.back-to-top').click(function () {
    window.location.href = '/cart.html'; // Redirecciona a /cart.html
    return false;
});



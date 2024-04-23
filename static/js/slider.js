$(document).ready(function(){
    $('.slider').slick({
        arrows: false,
        autoplay: true,
        autoplaySpeed: 6000,
    });

})

$('.arrow_left').click(()=>{
    $('.slider').slick('slickPrev');
})
$('.arrow_right').click(()=>{
    $('.slider').slick('slickNext');
})

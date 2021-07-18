import '../scss/index.scss'

(function() {
    /* 시작 이미지 슬라이드 */
    const swiperPicture = new Swiper(".swiper-picture", {
        speed: 1000,
        autoplay: {
            delay: 3000,
        },
        loop: true,
        pagination: {
            el: ".swiper-pagination",
        },
    });

    /* 멘트 */
    const swiperCatchphrase = new Swiper(".swiper-catchphrase", {
        allowTouchMove: false,
        effect: "fade",
        speed: 1000,
        autoplay: {
            delay: 3000,
        },
        loop: true
    });
})()
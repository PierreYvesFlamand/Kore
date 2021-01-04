var burger = document.querySelector('.burger-area');
var nav = document.querySelector('.menu');
var nav_a = document.querySelectorAll('.menu a');

burger.addEventListener('click', () => {
    nav_change_state();
});

nav_a.forEach((link) => {
    link.addEventListener('click', () => {
        if (window.innerWidth < 580) {
            nav_change_state();
        }
    });
});

function nav_change_state() {
    // Toggle nav
    nav.classList.toggle('is-open');
    // Burger animation
    burger.classList.toggle('is-active');
    // Hide overflow
    document.querySelector('body').classList.toggle('nav-is-open');
}

window.onscroll = () => {
    if (window.scrollY != 0) {
        document.querySelector('.l-nav').classList.add('vanish');
    } else {
        document.querySelector('.l-nav').classList.remove('vanish');
    }
};

console.log('hey');

// Testimonial Carousel
const testi_dots = [document.querySelector('.testi-dot-0'), document.querySelector('.testi-dot-1')];
var current_testi_dot = testi_dots[0];
block_auto_slide_testi = false;

const testiCarousel = new Siema({
    selector: '.testi-carousel',
    duration: 500,
    easing: 'ease-out',
    perPage: 1,
    startIndex: 0,
    draggable: true,
    multipleDrag: true,
    threshold: 20,
    loop: true,
    rtl: false,
    onInit: () => {},
    onChange: () => {
        current_testi_dot.classList.toggle('is-active');
        testi_dots[testiCarousel.currentSlide].classList.toggle('is-active');
        current_testi_dot = testi_dots[testiCarousel.currentSlide];
        block_auto_slide = true;
    },
});

testi_dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        testiCarousel.goTo(index);
    });
});

setInterval(() => {
    if (block_auto_slide_testi) {
        block_auto_slide_testi = false;
    } else {
        testiCarousel.next();
    }
}, 10000);

// Cool Nav
// The checker
const gambitGalleryIsInView = (el) => {
    const scroll = window.scrollY || window.pageYOffset;
    const boundsTop = el.getBoundingClientRect().top + scroll;

    const viewport = {
        top: scroll,
        bottom: scroll + window.innerHeight,
    };

    const bounds = {
        top: boundsTop,
        bottom: boundsTop + el.clientHeight,
    };

    return (
        (bounds.bottom >= viewport.top && bounds.bottom <= viewport.bottom) ||
        (bounds.top <= viewport.bottom && bounds.top >= viewport.top)
    );
};

// Usage.
const links = [
    document.getElementById('a-contact'),
    document.getElementById('a-about'),
    document.getElementById('a-services'),
    document.getElementById('a-projects'),
    document.getElementById('a-home'),
];
var current_nav = links[4];

document.addEventListener('DOMContentLoaded', () => {
    const anchors = [
        document.getElementById('nav-index-4'),
        document.getElementById('nav-index-3'),
        document.getElementById('nav-index-2'),
        document.getElementById('nav-index-1'),
        document.getElementById('nav-index-0'),
    ];

    const handler = () =>
        raf(() => {
            // answer.innerHTML = 'Is the div visible? ' + (gambitGalleryIsInView(tester) ? 'Yes' : 'No');
            if (gambitGalleryIsInView(anchors[4]) && current_nav != links[4]) {
                links[4].classList.toggle('is-active');
                current_nav.classList.toggle('is-active');
                current_nav = links[4];
            }
            anchors.forEach((anchor, index) => {
                if (gambitGalleryIsInView(anchor) && current_nav != links[index]) {
                    links[index].classList.toggle('is-active');
                    current_nav.classList.toggle('is-active');
                    current_nav = links[index];
                }
            });
        });

    handler();
    window.addEventListener('scroll', handler);
});

// requestAnimationFrame
const raf =
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    function (callback) {
        window.setTimeout(callback, 1000 / 60);
    };

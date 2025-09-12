$(document).ready(function () {

    // Menü toggle işlevi - TailwindCSS sınıfları ile
    $('#liteMenuToggle').click(function () {
        openSlideMenu();
    });

    // Menü kapatma butonu
    $('#liteMenuClose').click(function () {
        closeSlideMenu();
    });

    function openSlideMenu() {
        const $slideMenu = $('#liteSlideMenu');
        const $overlay = $('#liteOverlay');

        $slideMenu.removeClass('-translate-x-full').addClass('translate-x-0');
        $overlay.removeClass('opacity-0 invisible').addClass('opacity-100 visible');
    }

    function closeSlideMenu() {
        const $slideMenu = $('#liteSlideMenu');
        const $overlay = $('#liteOverlay');

        $slideMenu.removeClass('translate-x-0').addClass('-translate-x-full');
        $overlay.removeClass('opacity-100 visible').addClass('opacity-0 invisible');
    }

    // Alt menü toggle işlevi
    $('.lite-submenu-toggle').click(function () {
        const target = $(this).data('target');
        const $submenu = $('#' + target);
        const $icon = $(this).find('i');


        // Diğer alt menüleri kapat
        $('.lite-submenu').not($submenu).removeClass('lite-submenu-active');
        $('.lite-submenu-toggle').not(this).removeClass('lite-submenu-open');

        // Bu alt menüyü toggle et
        $submenu.toggleClass('lite-submenu-active');
        $(this).toggleClass('lite-submenu-open');

    });

    // Arama toggle işlevi
    $('#liteSearchToggle').click(function () {
        const $searchContainer = $('#liteSearchContainer');
        $searchContainer.toggleClass('-translate-y-full translate-y-0');
    });

    // Bildirim popup toggle işlevi
    $('#liteNotificationToggle').click(function (e) {
        e.stopPropagation();
        const $popup = $('#liteNotificationPopup');
        $popup.toggleClass('opacity-0 invisible -translate-y-2 opacity-100 visible translate-y-0');
    });

    // Tema toggle işlevi
    $('#liteThemeToggle').click(function () {
        toggleTheme();
    });

    function toggleTheme() {
        const $icon = $('#liteThemeIcon');
        const $bannerLogo = $('#liteBannerLogo');
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        // Icon animasyonu
        $icon.addClass('lite-theme-icon-spin');

        setTimeout(() => {
            // Tema değiştir
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('lite-theme', newTheme);

            // Icon'u değiştir
            if (newTheme === 'dark') {
                $icon.removeClass('ri-sun-line').addClass('ri-moon-line');
                // Dark tema logosu
                $bannerLogo.attr('src', 'assets/dark-logo.png');
                $('#liteFooterLogo').attr('src', 'assets/dark-logo.png');
            } else {
                $icon.removeClass('ri-moon-line').addClass('ri-sun-line');
                // Light tema logosu
                $bannerLogo.attr('src', 'assets/light-logo.png');
                $('#liteFooterLogo').attr('src', 'assets/light-logo.png');
            }

            // Animasyonu kaldır
            setTimeout(() => {
                $icon.removeClass('lite-theme-icon-spin');
            }, 250);

        }, 250);

        console.log('Tema değiştirildi:', newTheme);
    }

    // Overlay tıklandığında menüyü kapat
    $('#liteOverlay').click(function () {
        closeSlideMenu();
    });

    // Popup dışına tıklandığında popup'ı kapat
    $(document).click(function (e) {
        if (!$(e.target).closest('#liteNotificationPopup, #liteNotificationToggle').length) {
            const $popup = $('#liteNotificationPopup');
            $popup.removeClass('opacity-100 visible translate-y-0').addClass('opacity-0 invisible -translate-y-2');
        }
    });

    // Arama kutusunda Enter tuşu
    $('#liteSearchInput').keypress(function (e) {
        if (e.which === 13) {
            performSearch();
        }
    });

    // Arama butonu tıklama
    $('#liteSearchSubmit').click(function () {
        performSearch();
    });

    // Arama fonksiyonu
    function performSearch() {
        var searchTerm = $('#liteSearchInput').val().trim();
        if (searchTerm) {
            console.log('Arama yapılıyor:', searchTerm);
            // Burada arama işlemi yapılacak
            alert('Arama: ' + searchTerm);
        }
    }

    // ESC tuşu ile popup'ları kapat
    $(document).keyup(function (e) {
        if (e.keyCode === 27) { // ESC tuşu
            // Slide menüyü kapat
            closeSlideMenu();

            // Arama kutusunu kapat
            const $searchContainer = $('#liteSearchContainer');
            $searchContainer.removeClass('translate-y-0').addClass('-translate-y-full');

            // Bildirimi kapat
            const $popup = $('#liteNotificationPopup');
            $popup.removeClass('opacity-100 visible translate-y-0').addClass('opacity-0 invisible -translate-y-2');
        }
    });

    // Slick Slider başlatma fonksiyonu
    function initializeSlider() {
        $('.lite-slider-container').slick({
            dots: false,
            infinite: true,
            speed: 500,
            fade: true,
            autoplay: true,
            autoplaySpeed: 4000,
            pauseOnHover: true,
            pauseOnFocus: true,
            cssEase: 'ease-in-out',
            arrows: false,
            prevArrow: '<button type="button" class="slick-prev"><i class="ri-arrow-left-line"></i></button>',
            nextArrow: '<button type="button" class="slick-next"><i class="ri-arrow-right-line"></i></button>',
            responsive: [
                {
                    breakpoint: 768,

                    settings: {
                        arrows: false,
                        dots: true
                    }
                }
            ]
        });

        console.log('Slick Slider başlatıldı');
    }

    // Manşet Slider başlatma fonksiyonu
    function initializeMansetSlider() {
        $('.lite-manset-container').slick({
            dots: false,
            infinite: true,
            speed: 500,
            fade: false,
            autoplay: false,
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: true,
            prevArrow: '<button type="button" class="slick-prev"><i class="ri-arrow-left-line"></i></button>',
            nextArrow: '<button type="button" class="slick-next"><i class="ri-arrow-right-line"></i></button>',
            responsive: [
                {
                    breakpoint: 768,
                    settings: {
                        arrows: true
                    }
                }
            ]
        });

        console.log('Manşet Slider başlatıldı');
    }

    // Yazarlar Slider başlatma fonksiyonu
    function initializeAuthorsSlider() {
        $('.lite-authors-container').slick({
            dots: false,
            infinite: true,
            speed: 300,
            slidesToShow: 3,
            slidesToScroll: 1,
            autoplay: false,
            arrows: false,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1,
                        arrows: false
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        arrows: false
                    }
                }
            ]
        });

        // Custom navigation butonları için event listeners
        $('.lite-authors-prev').click(function () {
            $('.lite-authors-container').slick('slickPrev');
        });

        $('.lite-authors-next').click(function () {
            $('.lite-authors-container').slick('slickNext');
        });

        console.log('Yazarlar Slider başlatıldı');
    }

    function initializeCardsSlider() {
        $('.lite-cards-container').slick({
            infinite: true,
            arrows: false,
            dots: true,
            slidesToShow: 3,
            slidesToScroll: 3,
            adaptiveHeight: false,
            cssEase: 'ease',
            responsive: [
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        });

        console.log('Cards Slider başlatıldı');
    }

    function initializeTheme() {
        // LocalStorage'dan tema tercihi al
        const savedTheme = localStorage.getItem('lite-theme');
        const $icon = $('#liteThemeIcon');
        const $bannerLogo = $('#liteBannerLogo');

        if (savedTheme) {
            document.documentElement.setAttribute('data-theme', savedTheme);

            // Icon ve logo'yu güncelle
            if (savedTheme === 'dark') {
                $icon.removeClass('ri-sun-line').addClass('ri-moon-line');
                $bannerLogo.attr('src', 'assets/dark-logo.png');
                $('#liteFooterLogo').attr('src', 'assets/dark-logo.png');
            } else {
                $icon.removeClass('ri-moon-line').addClass('ri-sun-line');
                $bannerLogo.attr('src', 'assets/light-logo.png');
                $('#liteFooterLogo').attr('src', 'assets/light-logo.png');
            }
        }
    }



    // Loader initialization
    function initLoader() {
        const loader = document.getElementById('litePageLoader');
        if (!loader) return;

        // Simulate loading progress
        simulateLoading();

        // Hide loader when page is fully loaded
        window.addEventListener('load', function () {
            setTimeout(() => {
                hideLoader();
            }, 1000); // Minimum 1 second display
        });
    }

    // Simulate realistic loading progress
    function simulateLoading() {
        const progressBar = document.querySelector('.lite-loader-progress');
        if (!progressBar) return;

        let progress = 0;
        const targetProgress = 100;
        const duration = 1000; 
        const startTime = performance.now();

        function updateProgress(currentTime) {
            const elapsed = currentTime - startTime;
            const progressPercent = Math.min(elapsed / duration, 1);

            // Realistic loading curve (fast start, slow end)
            const easedProgress = 1 - Math.pow(1 - progressPercent, 2);
            progress = Math.floor(easedProgress * targetProgress);

            // Update progress bar width
            progressBar.style.width = progress + '%';

            if (progressPercent < 1) {
                requestAnimationFrame(updateProgress);
            }
        }

        requestAnimationFrame(updateProgress);
    }

    // Hide loader with fade out effect
    function hideLoader() {
        const loader = document.getElementById('litePageLoader');
        if (!loader) return;

        loader.classList.add('fade-out');

        // Remove from DOM after animation
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }

    // Initialize loader when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initLoader);
    } else {
        initLoader();
    }

    // Sayfa yüklendiğinde tema kontrolü
    initializeTheme();

    // Slick Slider başlat
    initializeSlider();

    // Manşet Slider başlat
    initializeMansetSlider();

    // Yazarlar Slider başlat
    initializeAuthorsSlider();

    // Cards Slider başlatma fonksiyonu
    initializeCardsSlider();


    // Global tema değiştirme fonksiyonu
    window.liteToggleTheme = function () {
        toggleTheme();
    };

    // Smooth scrolling için
    $('a[href^="#"]').click(function (e) {
        e.preventDefault();
        const target = $(this.getAttribute('href'));
        if (target.length) {
            $('html, body').animate({
                scrollTop: target.offset().top - 60
            }, 500);
        }
    });

});






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
        const slideMenu = $('#liteSlideMenu');
        const overlay = $('#liteOverlay');
        if (!slideMenu.length || !overlay.length) return;

        slideMenu.removeClass('-translate-x-full').addClass('translate-x-0');
        overlay.removeClass('opacity-0 invisible').addClass('opacity-100 visible');
    }

    function closeSlideMenu() {
        const slideMenu = $('#liteSlideMenu');
        const overlay = $('#liteOverlay');
        if (!slideMenu.length || !overlay.length) return;

        slideMenu.removeClass('translate-x-0').addClass('-translate-x-full');
        overlay.removeClass('opacity-100 visible').addClass('opacity-0 invisible');
    }

    // Alt menü toggle işlevi
    $('.lite-submenu-toggle').click(function () {
        const target = $(this).data('target');
        if (!target) return;

        const submenu = $('#' + target);
        const icon = $(this).find('i');
        if (!submenu.length || !icon.length) return;


        // Diğer alt menüleri kapat
        $('.lite-submenu').not(submenu).removeClass('lite-submenu-active');
        $('.lite-submenu-toggle').not(this).removeClass('lite-submenu-open');

        // Bu alt menüyü toggle et
        submenu.toggleClass('lite-submenu-active');
        $(this).toggleClass('lite-submenu-open');

    });

    // Arama toggle işlevi
    $('#liteSearchToggle').click(function () {
        const searchContainer = $('#liteSearchContainer');
        if (!searchContainer.length) return;

        searchContainer.toggleClass('-translate-y-full translate-y-0');
    });

    // Bildirim popup toggle işlevi
    $('#liteNotificationToggle').click(function (e) {
        e.stopPropagation();
        const popup = $('#liteNotificationPopup');
        if (!popup.length) return;

        popup.toggleClass('opacity-0 invisible -translate-y-2 opacity-100 visible translate-y-0');
    });

    // Whatsapp popup toggle işlevi
    $('#liteWhatsappToggle').click(function (e) {
        e.stopPropagation();
        const popup = $('#liteWhatsappPopup');
        if (!popup.length) return;

        popup.toggleClass('opacity-0 invisible -translate-y-2 opacity-100 visible translate-y-0');
    });

    // Tema toggle işlevi
    $('#liteThemeToggle').click(function () {
        toggleTheme();
    });

    function toggleTheme() {
        const icon = $('#liteThemeIcon');
        const bannerLogo = $('#liteBannerLogo');
        if (!icon.length || !bannerLogo.length) return;

        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        // Icon animasyonu
        icon.addClass('lite-theme-icon-spin');

        setTimeout(() => {
            // Tema değiştir
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('lite-theme', newTheme);

            // Icon'u değiştir
            if (newTheme === 'dark') {
                icon.removeClass('ri-sun-line').addClass('ri-moon-line');
                // Dark tema logosu
                bannerLogo.attr('src', 'assets/dark-logo.png');
                $('#liteFooterLogo').attr('src', 'assets/dark-logo.png');
            } else {
                icon.removeClass('ri-moon-line').addClass('ri-sun-line');
                // Light tema logosu
                bannerLogo.attr('src', 'assets/light-logo.png');
                $('#liteFooterLogo').attr('src', 'assets/light-logo.png');
            }

            // Animasyonu kaldır
            setTimeout(() => {
                icon.removeClass('lite-theme-icon-spin');
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

    // Popup dışına tıklandığında popup'ı kapat
    $(document).click(function (e) {
        if (!$(e.target).closest('#liteWhatsappPopup, #liteWhatsappToggle').length) {
            const $popup = $('#liteWhatsappPopup');
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
        const searchInput = $('#liteSearchInput');
        if (!searchInput.length) return;

        const searchTerm = searchInput.val().trim();
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

            // Whatsapp kutusunu kapat
            const $popupWhatsapp = $('#liteWhatsappPopup');
            $popupWhatsapp.removeClass('opacity-100 visible translate-y-0').addClass('opacity-0 invisible -translate-y-2');
        }
    });

    // Slick Slider başlatma fonksiyonu
    function initializeSlider() {
        const slider = $('.lite-slider-container');
        if (!slider.length) return;

        // İtemları sığdığı kadar göstermek için slidesToShow: 'auto' ve variableWidth: true kullanıyoruz.
        slider.slick({
            dots: false,
            infinite: true,
            speed: 10000, // Kayma hızı (daha yüksek değer daha yavaş kayar)
            fade: false,
            autoplay: true,
            autoplaySpeed: 1, // Otomatik kayma arası bekleme süresi çok kısa (0 olunca bazen kaymıyor)
            pauseOnHover: true,
            pauseOnFocus: false,
            cssEase: 'linear', // Düzgün ve sürekli kayma için linear
            slidesToShow: 2, // 'auto' yerine 2 yazdık, çünkü slick 'auto' değerini desteklemez
            slidesToScroll: 1,
            variableWidth: true, // Her item genişliğine göre sığdır
            arrows: false,
            prevArrow: '<button type="button" class="slick-prev"><i class="ri-arrow-left-line"></i></button>',
            nextArrow: '<button type="button" class="slick-next"><i class="ri-arrow-right-line"></i></button>',
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 1,
                        arrows: false,
                        dots: true
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 1,
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
        const mansetSlider = $('.lite-manset-container');
        if (!mansetSlider.length) return;

        mansetSlider.slick({
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
        const authorsSlider = $('.lite-authors-container');
        if (!authorsSlider.length) return;

        authorsSlider.slick({
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
        const cardsSlider = $('.lite-cards-container');
        if (!cardsSlider.length) return;

        cardsSlider.slick({
            infinite: true,
            arrows: false,
            dots: true,
            slidesToShow: 4,
            slidesToScroll: 4,
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

    function initializeGallerySlider() {
        const gallerySlider = $('.lite-gallery-container');
        if (!gallerySlider.length) return;

        gallerySlider.slick({
            infinite: true,
            arrows: false,
            dots: true,
            slidesToShow: 4,
            slidesToScroll: 2,
            adaptiveHeight: false,
            cssEase: 'cubic-bezier(0.4, 0, 0.2, 1)',
            autoplay: false,
            speed: 600,
            responsive: [
                {
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 2
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1,
                        autoplaySpeed: 3000
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        autoplaySpeed: 3000
                    }
                }
            ]
        });

        console.log('Gallery Slider başlatıldı');
    }

    function initializeTheme() {
        // LocalStorage'dan tema tercihi al
        const savedTheme = localStorage.getItem('lite-theme');
        const icon = $('#liteThemeIcon');
        const bannerLogo = $('#liteBannerLogo');
        if (!icon.length || !bannerLogo.length) return;

        if (savedTheme) {
            document.documentElement.setAttribute('data-theme', savedTheme);

            // Icon ve logo'yu güncelle
            if (savedTheme === 'dark') {
                icon.removeClass('ri-sun-line').addClass('ri-moon-line');
                bannerLogo.attr('src', 'assets/dark-logo.png');
                $('#liteFooterLogo').attr('src', 'assets/dark-logo.png');
            } else {
                icon.removeClass('ri-moon-line').addClass('ri-sun-line');
                bannerLogo.attr('src', 'assets/light-logo.png');
                $('#liteFooterLogo').attr('src', 'assets/light-logo.png');
            }
        }
    }



    // Loader initialization
    function initLoader() {
        const loader = $('#litePageLoader');
        if (!loader.length) return;

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
        const progressBar = $('.lite-loader-progress');
        if (!progressBar.length) return;

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
            progressBar.css('width', progress + '%');

            if (progressPercent < 1) {
                requestAnimationFrame(updateProgress);
            }
        }

        requestAnimationFrame(updateProgress);
    }

    // Hide loader with fade out effect
    function hideLoader() {
        const loader = $('#litePageLoader');
        if (!loader.length) return;

        loader.addClass('fade-out');

        // Remove from DOM after animation
        setTimeout(() => {
            loader.hide();
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

    // Gallery Slider başlatma fonksiyonu
    initializeGallerySlider();


    // Global tema değiştirme fonksiyonu
    window.liteToggleTheme = function () {
        toggleTheme();
    };

    // Smooth scrolling için
    $('a[href^="#"]').click(function (e) {
        e.preventDefault();
        const href = this.getAttribute('href');
        if (!href) return;

        const target = $(href);
        if (!target.length) return;

        $('html, body').animate({
            scrollTop: target.offset().top - 60
        }, 500);
    });

    // Reading progress bar
    updateReadingProgress();

    $(window).scroll(updateReadingProgress);

    // Back to top button
    $(window).scroll(toggleBackToTop);
    $('#liteBackToTop').click(function () {
        $('html, body').animate({ scrollTop: 0 }, 600);
    });

    // Font size controls (both navbar and sidebar)
    let currentFontSize = 16;

    function increaseFontSize() {
        if (currentFontSize < 20) {
            currentFontSize += 1;
            $('#liteArticleContent').css('font-size', currentFontSize + 'px');
            localStorage.setItem('lite-font-size', currentFontSize);
        }
    }

    function decreaseFontSize() {
        if (currentFontSize > 12) {
            currentFontSize -= 1;
            $('#liteArticleContent').css('font-size', currentFontSize + 'px');
            localStorage.setItem('lite-font-size', currentFontSize);
        }
    }

    // Load saved font size
    const savedFontSize = localStorage.getItem('lite-font-size');
    if (savedFontSize) {
        currentFontSize = parseInt(savedFontSize);
        $('#liteArticleContent').css('font-size', currentFontSize + 'px');
    }

    // Bind events to both navbar and sidebar controls
    $('#liteFontIncrease, #liteSidebarFontIncrease').click(increaseFontSize);
    $('#liteFontDecrease, #liteSidebarFontDecrease').click(decreaseFontSize);

    // Save/Bookmark functionality (both navbar and sidebar)
    let isSaved = localStorage.getItem('lite-article-saved') === 'true';

    function updateSaveStatus() {
        const navIcon = $('#liteSaveBtn i');
        const sidebarIcon = $('#liteSidebarSaveIcon');

        if (isSaved) {
            navIcon.removeClass('ri-bookmark-line').addClass('ri-bookmark-fill');
            sidebarIcon.removeClass('ri-bookmark-line').addClass('ri-bookmark-fill');
            $('#liteSaveBtn').addClass('text-red-500');
        } else {
            navIcon.removeClass('ri-bookmark-fill').addClass('ri-bookmark-line');
            sidebarIcon.removeClass('ri-bookmark-fill').addClass('ri-bookmark-line');
            $('#liteSaveBtn').removeClass('text-red-500');
        }
    }

    function toggleSave() {
        isSaved = !isSaved;
        localStorage.setItem('lite-article-saved', isSaved);
        updateSaveStatus();

        if (isSaved) {
            showToast('Makale kaydedildi!');
        } else {
            showToast('Makale kayıtlardan kaldırıldı!');
        }
    }

    // Initialize save status
    updateSaveStatus();

    // Bind save events
    $('#liteSaveBtn, #liteSidebarSave').click(toggleSave);

    // Share modal (both navbar and sidebar)
    function openShareModal() {
        $('#liteShareModal').removeClass('hidden').addClass('flex');
    }

    $('#liteShareBtn, #liteSidebarShare').click(openShareModal);

    $('#liteShareModalClose').click(function () {
        $('#liteShareModal').addClass('hidden').removeClass('flex');
    });

    function openToolBoxModal() {
        $('#liteToolBoxContainer').toggleClass('hidden');
    }

    $('#liteToolBox').click(openToolBoxModal);

    // Copy link functionality
    $('#liteCopyLinkBtn, #liteModalCopyLink').click(function () {
        navigator.clipboard.writeText(window.location.href).then(function () {
            showToast('Link kopyalandı!');
            $('#liteShareModal').addClass('hidden').removeClass('flex');
        });
    });





    function updateReadingProgress() {
        const article = $('#liteArticleContent');
        if (!article.length) return;
        const articleTop = article.offset().top;
        const articleHeight = article.outerHeight();
        const windowTop = $(window).scrollTop();
        const windowHeight = $(window).height();

        const progress = Math.max(0, Math.min(100,
            ((windowTop - articleTop + windowHeight) / articleHeight) * 100
        ));

        $('#liteReadingProgress div').css('width', progress + '%');
    }

    function toggleBackToTop() {
        const btn = $('#liteBackToTop');
        if (!btn.length) return;
        if ($(window).scrollTop() > 300) {
            btn.removeClass('opacity-0 pointer-events-none').addClass('opacity-100');
        } else {
            btn.addClass('opacity-0 pointer-events-none').removeClass('opacity-100');
        }
    }

    function showToast(message) {
        // Simple toast notification
        const toast = $(`
            <div class="fixed top-20 right-6 bg-lite-accent-primary text-white px-4 py-2 rounded-lg shadow-lg z-50 transform translate-x-full transition-transform duration-300">
                ${message}
            </div>
        `);

        $('body').append(toast);

        setTimeout(() => {
            toast.removeClass('translate-x-full');
        }, 100);

        setTimeout(() => {
            toast.addClass('translate-x-full');
            setTimeout(() => {
                toast.remove();
            }, 300);
        }, 3000);
    }



});






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

    // Arama toggle işlevi - Tüm arama butonları için
    $('#liteSearchToggleDesktop, #liteSearchToggleMobile, #liteSearchToggleDetail').click(function () {
        const searchContainer = $('#liteSearchContainer');
        if (!searchContainer.length) return;

        searchContainer.toggleClass('-translate-y-full translate-y-0');

        // Mobil menüde aktif durumu göster
        if ($(this).attr('id') === 'liteSearchToggleMobile') {
            $('.mobile-menu-btn').removeClass('active');
            $(this).addClass('active');

            // 2 saniye sonra aktif durumu kaldır
            setTimeout(() => {
                $(this).removeClass('active');
            }, 2000);
        }
    });

    // Bildirim popup toggle işlevi
    $('#liteNotificationToggle').click(function (e) {
        e.stopPropagation();
        const popup = $('#liteNotificationPopup');
        if (!popup.length) return;

        popup.toggleClass('opacity-0 invisible -translate-y-2 opacity-100 visible translate-y-0');
    });

    // Whatsapp popup toggle işlevi - Tüm whatsapp butonları için
    $('#liteWhatsappToggleDesktop, #liteWhatsappToggleMobile').click(function (e) {
        e.stopPropagation();
        const popup = $('#liteWhatsappPopup');
        if (!popup.length) return;

        popup.toggleClass('opacity-0 invisible -translate-y-2 opacity-100 visible translate-y-0');

        // Mobil menüde aktif durumu göster
        if ($(this).attr('id') === 'liteWhatsappToggleMobile') {
            $('.mobile-menu-btn').removeClass('active');
            $(this).addClass('active');

            // 2 saniye sonra aktif durumu kaldır
            setTimeout(() => {
                $(this).removeClass('active');
            }, 2000);
        }
    });

    // Tema toggle işlevi - Tüm tema butonları için
    $('#liteThemeToggleDesktop, #liteThemeToggleMobile, #liteThemeToggleDetail').click(function () {
        toggleTheme();

        // Mobil menüde aktif durumu göster
        if ($(this).attr('id') === 'liteThemeToggleMobile') {
            $('.mobile-menu-btn').removeClass('active');
            $(this).addClass('active');

            // 2 saniye sonra aktif durumu kaldır
            setTimeout(() => {
                $(this).removeClass('active');
            }, 2000);
        }
    });

    function toggleTheme() {
        const icons = $('#liteThemeIcon, #liteThemeIconDesktop, #liteThemeIconMobile, #liteThemeIconDetail');
        const bannerLogo = $('#liteBannerLogo');
        if (!icons.length || !bannerLogo.length) return;

        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        // Tüm iconlara animasyon ekle
        icons.addClass('lite-theme-icon-spin');

        setTimeout(() => {
            // Tema değiştir
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('lite-theme', newTheme);

            // Tüm iconları değiştir
            if (newTheme === 'dark') {
                icons.removeClass('ri-sun-line').addClass('ri-moon-line');
                // Dark tema logosu
                bannerLogo.attr('src', 'assets/dark-logo.png');
                $('#liteFooterLogo').attr('src', 'assets/dark-logo.png');
            } else {
                icons.removeClass('ri-moon-line').addClass('ri-sun-line');
                // Light tema logosu
                bannerLogo.attr('src', 'assets/light-logo.png');
                $('#liteFooterLogo').attr('src', 'assets/light-logo.png');
            }

            // Animasyonu kaldır
            setTimeout(() => {
                icons.removeClass('lite-theme-icon-spin');
            }, 250);

        }, 250);

        console.log('Tema değiştirildi:', newTheme);
    }

    // Canlı yayın butonuna aktif durumu ekle
    $('.mobile-menu-btn').first().click(function () {
        $('.mobile-menu-btn').removeClass('active');
        $(this).addClass('active');

        // 2 saniye sonra aktif durumu kaldır
        setTimeout(() => {
            $(this).removeClass('active');
        }, 2000);
    });

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
            const popupWhatsapp = $('#liteWhatsappPopup');
            popupWhatsapp.removeClass('opacity-100 visible translate-y-0').addClass('opacity-0 invisible -translate-y-2');
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
            dots: true,
            prevArrow: '<button type="button" class="slick-prev"><i class="ri-arrow-left-line"></i></button>',
            nextArrow: '<button type="button" class="slick-next"><i class="ri-arrow-right-line"></i></button>',
            responsive: [
                {
                    breakpoint: 768,
                    settings: {
                        arrows: true,
                        dots: true
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

    // Dik Foto Galeri Slider başlatma fonksiyonu
    function initializeVerticalGallerySlider() {
        const verticalGallerySlider = $('.lite-vertical-gallery-slider');
        if (!verticalGallerySlider.length) return;

        verticalGallerySlider.slick({
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1,
            arrows: false,
            autoplay: false,
            autoplaySpeed: 4000,
            responsive: [
                {
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1,
                        arrows: false,
                        dots: true
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        arrows: false,
                        dots: true
                    }
                }
            ]
        });


        // Custom navigation butonları için event listeners
        $('.lite-vertical-gallery-prev').click(function () {
            $('.lite-vertical-gallery-slider').slick('slickPrev');
        });

        $('.lite-vertical-gallery-next').click(function () {
            $('.lite-vertical-gallery-slider').slick('slickNext');
        });

        console.log('Dik Foto Galeri Slider başlatıldı');
    }

    function initializeTheme() {
        // LocalStorage'dan tema tercihi al
        const savedTheme = localStorage.getItem('lite-theme');
        const icons = $('#liteThemeIcon, #liteThemeIconDesktop, #liteThemeIconMobile, #liteThemeIconDetail');
        const bannerLogo = $('#liteBannerLogo');
        if (!icons.length || !bannerLogo.length) return;

        if (savedTheme) {
            document.documentElement.setAttribute('data-theme', savedTheme);

            // Tüm iconları ve logo'yu güncelle
            if (savedTheme === 'dark') {
                icons.removeClass('ri-sun-line').addClass('ri-moon-line');
                bannerLogo.attr('src', 'assets/dark-logo.png');
                $('#liteFooterLogo').attr('src', 'assets/dark-logo.png');
            } else {
                icons.removeClass('ri-moon-line').addClass('ri-sun-line');
                bannerLogo.attr('src', 'assets/light-logo.png');
                $('#liteFooterLogo').attr('src', 'assets/light-logo.png');
            }
        }
    }

    // Mobil haber kutusu scroll kontrolü
    function initializeMobileNewsCard() {
        const mobileNewsCard = $('#mobileNewsCard');
        if (!mobileNewsCard.length) return;

        let lastScrollTop = 0;
        let isScrollingDown = false;
        const scrollThreshold = 200; // 200px scroll sonrası göster

        $(window).scroll(function () {
            const currentScrollTop = $(this).scrollTop();

            // Scroll yönünü belirle
            isScrollingDown = currentScrollTop > lastScrollTop;

            // Scroll threshold kontrolü
            if (currentScrollTop > scrollThreshold) {
                if (isScrollingDown) {
                    // Aşağı scroll - kutu göster
                    mobileNewsCard.addClass('show');
                } else {
                    // Yukarı scroll - kutu gizle
                    mobileNewsCard.removeClass('show');
                }
            } else {
                // Threshold altında - kutu gizli
                mobileNewsCard.removeClass('show');
            }

            lastScrollTop = currentScrollTop;
        });

        // Haber kutusuna tıklama olayı
        mobileNewsCard.click(function () {
            // Burada haber detay sayfasına yönlendirme yapılabilir
            console.log('Mobil haber kutusuna tıklandı');
            // window.location.href = '/haber-detay.html';
        });

        console.log('Mobil haber kutusu scroll kontrolü başlatıldı');
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

    // Mobil haber kutusu scroll kontrolü
    initializeMobileNewsCard();

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

    // Dik Foto Galeri Slider başlat
    initializeVerticalGallerySlider();


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

    // ===== MINI POLL (COMPACT) =====
    function updateMiniPollButtons(optionsEls, options) {
        const total = options.reduce((sum, o) => sum + o.votes, 0);

        optionsEls.each(function (index) {
            const button = $(this);
            const option = options[index];
            const percentage = total > 0 ? Math.round((option.votes / total) * 100) : 0;

            // Buton textini güncelle: "Seçenek (%XX)"
            const originalText = option.text;
            button.text(`${originalText} (${percentage}%)`);

            // Buton stilini güncelle
            button.removeClass('lite-btn-outline').addClass('lite-btn-secondary');
        });
    }

    $('.lite-mini-poll').each(function () {
        const pollEl = $(this);
        const optionsEls = pollEl.find('.lite-mini-poll-option');


        // Mevcut butonlardan başlangıç verisini topla
        let options = [];
        optionsEls.each(function () {
            options.push({
                text: $(this).text(),
                votes: parseInt($(this).attr('data-votes') || '0', 10)
            });
        });

        // Tıklayınca oy ver ve sonucu göster
        optionsEls.on('click', function () {
            const idx = $(this).index();
            options[idx].votes += 1;

            // Butonları güncelle (yüzdelik sonuçları göster)
            updateMiniPollButtons(optionsEls, options);

            // Butonları pasifleştir
            optionsEls.removeClass("lite-btn-secondary");
            optionsEls.prop('disabled', true).addClass('opacity-60 cursor-not-allowed lite-bg-accent lite-text-third');
        });
    });

    // ===== ANKET MODÜLÜ FONKSİYONLARI =====

    // Anket verilerini yükle
    function loadPollData() {
        const pollData = localStorage.getItem('litePollData');
        if (pollData) {
            return JSON.parse(pollData);
        }

        // Varsayılan anket verisi
        return {
            id: 'poll_' + Date.now(),
            question: '2025 yılında en çok hangi teknoloji trendini takip ediyorsunuz?',
            options: [
                { id: 1, text: 'Yapay Zeka ve Makine Öğrenmesi', votes: 0 },
                { id: 2, text: 'Blockchain ve Kripto Para', votes: 0 },
                { id: 3, text: 'Metaverse ve VR/AR', votes: 0 },
                { id: 4, text: 'Quantum Computing', votes: 0 },
                { id: 5, text: 'Elektrikli Araçlar', votes: 0 }
            ],
            endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 gün sonra
            totalVotes: 0,
            userVoted: false
        };
    }

    // Anket verilerini kaydet
    function savePollData(pollData) {
        localStorage.setItem('litePollData', JSON.stringify(pollData));
    }

    // Anket arayüzünü oluştur
    function renderPoll() {
        const pollData = loadPollData();
        const container = $('#lite-poll-container');
        const resultsContainer = $('#lite-poll-results');

        if (!container.length) return;

        // Süre kontrolü
        const now = new Date();
        const timeLeft = pollData.endDate - now;

        if (timeLeft <= 0 || pollData.userVoted) {
            renderPollResults(pollData);
            return;
        }

        // Anket formu
        let pollHTML = `
            <div class="lite-poll-question">${pollData.question}</div>
            <div class="lite-poll-timer" id="lite-poll-timer">
                <i class="ri-time-line"></i>
                <span id="lite-timer-text">Kalan süre: <span id="lite-time-left"></span></span>
            </div>
            <div class="lite-poll-options">
        `;

        pollData.options.forEach(option => {
            pollHTML += `
                <div class="lite-poll-option" data-option-id="${option.id}">
                    <input type="radio" name="poll_option" value="${option.id}" id="option_${option.id}">
                    <label for="option_${option.id}">${option.text}</label>
                </div>
            `;
        });

        pollHTML += `
            </div>
            <button class="lite-poll-submit" id="lite-poll-submit" disabled>
                <i class="ri-send-plane-line"></i> Oyu Gönder
            </button>
        `;

        container.html(pollHTML);

        // Event listeners
        $('.lite-poll-option').on('click', function () {
            $('.lite-poll-option').removeClass('selected');
            $(this).addClass('selected');
            $(this).find('input[type="radio"]').prop('checked', true);
            $('#lite-poll-submit').prop('disabled', false);
        });

        $('#lite-poll-submit').on('click', function () {
            const selectedOption = $('input[name="poll_option"]:checked').val();
            if (selectedOption) {
                submitPoll(selectedOption);
            }
        });

        // Süre sayacı başlat
        startPollTimer(pollData.endDate);
    }

    // Anket sonuçlarını göster
    function renderPollResults(pollData) {
        const container = $('#lite-poll-container');
        const resultsContainer = $('#lite-poll-results');

        if (!container.length) return;

        // Sonuçları hesapla
        const totalVotes = pollData.options.reduce((sum, option) => sum + option.votes, 0);

        let resultsHTML = `
            <div class="lite-poll-question">${pollData.question}</div>
            <div class="lite-poll-results show">
        `;

        pollData.options.forEach(option => {
            const percentage = totalVotes > 0 ? Math.round((option.votes / totalVotes) * 100) : 0;
            resultsHTML += `
                <div class="lite-poll-result-item">
                    <div class="lite-poll-result-label">${option.text}</div>
                    <div class="lite-poll-result-bar">
                        <div class="lite-poll-result-fill" style="width: ${percentage}%"></div>
                    </div>
                    <div class="lite-poll-result-percentage">${percentage}%</div>
                </div>
            `;
        });

        resultsHTML += `
                <div class="lite-poll-total-votes">
                    <strong>${totalVotes}</strong> toplam oy
                </div>
            </div>
        `;

        container.html(resultsHTML);

        // Sağ sidebar'da da sonuçları göster
        if (resultsContainer.length) {
            let sidebarHTML = `
                <div class="text-center mb-4">
                    <div class="w-16 h-16 lite-bg-accent rounded-full flex items-center justify-center mx-auto mb-2">
                        <i class="ri-bar-chart-line text-lite-text-third text-2xl"></i>
                    </div>
                    <h4 class="lite-text-primary font-semibold">Anket Sonuçları</h4>
                </div>
            `;

            pollData.options.forEach((option, index) => {
                const percentage = totalVotes > 0 ? Math.round((option.votes / totalVotes) * 100) : 0;
                const colors = ['#cf1d39', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5'];

                sidebarHTML += `
                    <div class="mb-3">
                        <div class="flex justify-between items-center mb-1">
                            <span class="lite-text-primary text-sm font-medium">${option.text}</span>
                            <span class="lite-text-accent text-sm font-semibold">${percentage}%</span>
                        </div>
                        <div class="w-full bg-lite-bg-secondary rounded-full h-2">
                            <div class="h-2 rounded-full transition-all duration-1000" 
                                 style="width: ${percentage}%; background-color: ${colors[index % colors.length]}"></div>
                        </div>
                    </div>
                `;
            });

            sidebarHTML += `
                <div class="text-center mt-4 pt-4 border-t lite-border">
                    <span class="lite-text-secondary text-sm">
                        <strong class="lite-text-accent">${totalVotes}</strong> toplam oy
                    </span>
                </div>
            `;

            resultsContainer.html(sidebarHTML);
        }
    }

    // Anket oyu gönder
    function submitPoll(optionId) {
        const pollData = loadPollData();

        // Kullanıcı daha önce oy vermiş mi kontrol et
        if (pollData.userVoted) {
            showToast('Zaten oy vermişsiniz!', 'warning');
            return;
        }

        // Oyu ekle
        const option = pollData.options.find(opt => opt.id == optionId);
        if (option) {
            option.votes++;
            pollData.totalVotes++;
            pollData.userVoted = true;

            savePollData(pollData);
            showToast('Oyunuz başarıyla kaydedildi!', 'success');

            // Sonuçları göster
            setTimeout(() => {
                renderPollResults(pollData);
            }, 1000);
        }
    }

    // Süre sayacı
    function startPollTimer(endDate) {
        const timerElement = $('#lite-time-left');
        const timerContainer = $('#lite-poll-timer');

        if (!timerElement.length) return;

        function updateTimer() {
            const now = new Date();
            const timeLeft = endDate - now;

            if (timeLeft <= 0) {
                timerElement.text('Süre doldu!');
                timerContainer.addClass('urgent');
                // Anketi sonuç moduna geçir
                setTimeout(() => {
                    const pollData = loadPollData();
                    renderPollResults(pollData);
                }, 1000);
                return;
            }

            const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

            let timeString = '';
            if (days > 0) timeString += `${days}g `;
            if (hours > 0) timeString += `${hours}s `;
            if (minutes > 0) timeString += `${minutes}dk `;
            timeString += `${seconds}sn`;

            timerElement.text(timeString);

            // Son 1 saatte uyarı ver
            if (timeLeft < 60 * 60 * 1000) {
                timerContainer.addClass('urgent');
            }
        }

        updateTimer();
        const timerInterval = setInterval(updateTimer, 1000);

        // Timer'ı temizle (sayfa değiştiğinde)
        $(window).on('beforeunload', function () {
            clearInterval(timerInterval);
        });
    }

    // Anket modülünü başlat
    function initializePollModule() {
        renderPoll();
    }

    // Sayfa yüklendiğinde anket modülünü başlat
    if ($('#lite-poll-container').length) {
        initializePollModule();
    }

    // ===== MINI POLL (COMPACT) =====
    function renderMiniPollResults(container, options) {
        const total = options.reduce((sum, o) => sum + o.votes, 0);
        let html = '<div class="lite-mini-results-inner">';
        options.forEach(o => {
            const pct = total > 0 ? Math.round((o.votes / total) * 100) : 0;
            html += `
                <div class="lite-poll-result-item">
                    <div class="lite-poll-result-label">${o.text}</div>
                    <div class="lite-poll-result-bar">
                        <div class="lite-poll-result-fill" style="width:${pct}%"></div>
                    </div>
                    <div class="lite-poll-result-percentage">${pct}%</div>
                </div>
            `;
        });
        html += '</div>';
        container.html(html).removeClass('hidden');
    }

    $('.lite-mini-poll').each(function () {
        const pollEl = $(this);
        const optionsEls = pollEl.find('.lite-mini-poll-option');
        const resultsEl = pollEl.find('.lite-mini-results');

        // Mevcut butonlardan başlangıç verisini topla
        let options = [];
        optionsEls.each(function () {
            options.push({
                text: $(this).text(),
                votes: parseInt($(this).attr('data-votes') || '0', 10)
            });
        });

        // Tıklayınca oy ver ve sonucu göster
        optionsEls.on('click', function () {
            const idx = $(this).index();
            options[idx].votes += 1;
            // Butonları pasifleştir
            optionsEls.prop('disabled', true).addClass('opacity-60 cursor-not-allowed');
            // Sonuçları render et
            renderMiniPollResults(resultsEl, options);
        });
    });


    let currentZoom = 1;
    let currentImageSrc = '';
    let currentImageTitle = '';
    let currentImageAuthor = '';
    let currentImageDate = '';

    // Image loading with fade effect
    function handleImageLoad() {
        console.log('Resim yüklendi');
        const $img = $(this);
        const $skeleton = $img.siblings('.image-skeleton');

        // Skeleton'ı gizle
        $skeleton.fadeOut(500);

        // Resmi göster
        $img.animate({ opacity: 1 }, 500);

        // View count artır
        const $viewCount = $('#viewCount');
        let currentViews = parseInt($viewCount.text().replace(/,/g, '')) || 0;
        $viewCount.text((currentViews + 1).toLocaleString());
    }

    // Resim zaten yüklenmişse direkt çalıştır
    $('.article-image').each(function () {
        if (this.complete && this.naturalHeight !== 0) {
            console.log('Resim cache\'den geldi');
            handleImageLoad.call(this);
        } else {
            // Resim henüz yüklenmediyse event listener ekle
            $(this).on('load', handleImageLoad);
        }
    });

    // Error handling
    $('.article-image').on('error', function () {
        console.log('Resim yükleme hatası');
        $(this).siblings('.image-skeleton').fadeOut(500);
        showToast('Resim yüklenemedi!', 'error');
    });

    // Expand image button
    $('.expand-btn').on('click', function () {
        const imageSrc = $(this).data('image');
        const title = $(this).data('title');
        const description = $(this).data('description');
        const author = $(this).data('author');
        const date = $(this).data('date');
        openModal(imageSrc, title, description, author, date);
    });

    // Article image click
    $('.article-image').on('click', function () {
        const $expandBtn = $('.expand-btn');
        $expandBtn.trigger('click');
    });

    // Share button
    $('.share-btn').on('click', function () {
        shareImage();
    });

    // Bookmark button
    $('.bookmark-btn').on('click', function () {
        const $icon = $(this).find('.bookmark-icon');
        if ($icon.hasClass('far')) {
            $icon.removeClass('far').addClass('fas text-yellow-400');
            showToast('Yer imlerine eklendi!');
        } else {
            $icon.removeClass('fas text-yellow-400').addClass('far');
            showToast('Yer imlerinden çıkarıldı!');
        }
    });

    // Modal açma fonksiyonu
    function openModal(imageSrc, title, description, author, date) {
        const $modal = $('#imageModal');
        const $modalImage = $('#modalImage');
        const $modalTitle = $('#modalTitle');
        const $modalDescription = $('#modalDescription');
        const $imageAuthor = $('#imageAuthor');
        const $imageDate = $('#imageDate');
        const $imageSkeleton = $('#imageSkeleton');
        const $imageControls = $('#imageControls');

        currentImageSrc = imageSrc;
        currentImageTitle = title;
        currentImageAuthor = author;
        currentImageDate = date;

        // Modal'ı göster
        $modal.removeClass('hidden');
        $('body').css('overflow', 'hidden');

        // Bilgileri ayarla
        $modalTitle.text(title);
        $modalDescription.text(description);
        $imageAuthor.text(author);
        $imageDate.text(date);

        // Skeleton'ı göster, resmi gizle
        $imageSkeleton.removeClass('hidden');
        $modalImage.addClass('hidden');
        $imageControls.css('opacity', '0');

        // Resmi lazy load et
        const img = new Image();
        $(img).on('load', function () {
            setTimeout(() => {
                $modalImage.attr('src', imageSrc);
                $modalImage.removeClass('hidden');
                $imageSkeleton.addClass('hidden');

                updateImageSize(this.naturalWidth, this.naturalHeight);
                resetZoom();

                setTimeout(() => {
                    $imageControls.css('opacity', '1');
                }, 300);
            }, 500);
        }).on('error', function () {
            showToast('Resim yüklenemedi!', 'error');
            closeModal();
        });
        img.src = imageSrc;
    }

    // Modal kapatma fonksiyonu
    function closeModal() {
        const $modal = $('#imageModal');
        $modal.addClass('hidden');
        $('body').css('overflow', 'auto');

        // Favoriti sıfırla
        const $favoriteIcon = $('#favoriteIcon');
        $favoriteIcon.removeClass('fas text-red-500').addClass('far');
    }

    // Zoom fonksiyonları
    function zoomIn() {
        if (currentZoom < 3) {
            currentZoom += 0.25;
            applyZoom();
        }
    }

    function zoomOut() {
        if (currentZoom > 0.5) {
            currentZoom -= 0.25;
            applyZoom();
        }
    }

    function resetZoom() {
        currentZoom = 1;
        applyZoom();
    }

    function applyZoom() {
        const $modalImage = $('#modalImage');
        const $zoomLevel = $('#zoomLevel');

        $modalImage.css('transform', `scale(${currentZoom})`);
        $zoomLevel.text(`${Math.round(currentZoom * 100)}%`);
    }

    function updateImageSize(width, height) {
        const $imageSize = $('#imageSize');
        $imageSize.text(`${width}×${height}`);
    }

    function downloadImage() {
        const link = document.createElement('a');
        link.download = `${currentImageTitle}.jpg`;
        link.href = currentImageSrc;
        link.click();
        showToast('İndirme başlatıldı!');
    }

    function shareImage() {
        if (navigator.share) {
            navigator.share({
                title: currentImageTitle || 'Yapay Zeka Teknolojileri',
                text: 'İlginç bir makale görselini sizinle paylaşıyorum',
                url: window.location.href
            });
        } else {
            navigator.clipboard.writeText(window.location.href).then(() => {
                showToast('Bağlantı kopyalandı!');
            });
        }
    }

    function favoriteImage() {
        const $favoriteIcon = $('#favoriteIcon');

        if ($favoriteIcon.hasClass('far')) {
            $favoriteIcon.removeClass('far').addClass('fas text-red-500');
            showToast('Favorilere eklendi!');
        } else {
            $favoriteIcon.removeClass('fas text-red-500').addClass('far');
            showToast('Favorilerden çıkarıldı!');
        }
    }

    function showToast(message, type = 'success') {
        const $toast = $('#toast');
        const $toastMessage = $('#toastMessage');
        const $toastDiv = $toast.find('div');
        const $toastIcon = $toast.find('i');

        $toastMessage.text(message);

        if (type === 'error') {
            $toastDiv.removeClass('bg-green-500').addClass('bg-red-500');
            $toastIcon.removeClass('fa-check-circle').addClass('fa-exclamation-circle');
        }

        $toast.removeClass('hidden');

        setTimeout(() => {
            $toast.addClass('hidden');
            if (type === 'error') {
                $toastDiv.removeClass('bg-red-500').addClass('bg-green-500');
                $toastIcon.removeClass('fa-exclamation-circle').addClass('fa-check-circle');
            }
        }, 3000);
    }

    // Event listeners
    $('#imageModal .modal-backdrop').on('click', closeModal);
    $('#closeModalBtn, #closeFooterBtn').on('click', closeModal);
    $('#zoomInBtn').on('click', zoomIn);
    $('#zoomOutBtn').on('click', zoomOut);
    $('#resetZoomBtn').on('click', resetZoom);
    $('#downloadBtn, #downloadFooterBtn').on('click', downloadImage);
    $('#shareModalBtn').on('click', shareImage);
    $('#favoriteBtn').on('click', favoriteImage);

    // ESC tuşu ile modal kapatma
    $(document).on('keydown', function (e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });

    // Mouse wheel ile zoom
    $('#modalImage').on('wheel', function (e) {
        e.preventDefault();
        if (e.originalEvent.deltaY < 0) {
            zoomIn();
        } else {
            zoomOut();
        }
    });

    // ===== INSTAGRAM STORIES FUNCTIONALITY =====

    // Stories Data
    const storiesData = [
        {
            id: 1,
            title: 'Yapay Zeka Teknolojilerinde Son Gelişmeler',
            category: 'technology',
            image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=250&fit=crop',
            headline: 'Yapay Zeka Teknolojilerinde Son Gelişmeler',
            summary: 'AI teknolojilerinin günlük hayatımıza olan etkisi her geçen gün artıyor.',
            time: '2 saat önce',
            isViewed: false,
            isNew: false,
            likes: 154,
            url: '/detail.html'
        },
        {
            id: 2,
            title: 'Spor',
            category: 'sports',
            image: 'assets/haber-gorsel.png',
            headline: 'Futbol Dünyasından Son Dakika Haberleri',
            summary: 'Transfer döneminin en hareketli günlerinden birini yaşıyoruz.',
            time: '1 saat önce',
            isViewed: false,
            isNew: true,
            likes: 287,
            url: '/haber/futbol-transfer-haberleri'
        },
        {
            id: 3,
            title: 'Ekonomi',
            category: 'economy',
            image: 'assets/haber-gorsel.png',
            headline: 'Küresel Piyasalarda Bugünkü Durum',
            summary: 'Borsa İstanbul günü yükselişle kapatırken, dolar kurunda önemli hareketler yaşanıyor.',
            time: '3 saat önce',
            isViewed: false,
            isNew: false,
            likes: 98,
            url: '/haber/piyasa-analizi'
        },
        {
            id: 4,
            title: 'Sağlık',
            category: 'health',
            image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=250&fit=crop',
            headline: 'Sağlıklı Yaşam İçin Önemli Öneriler',
            summary: 'Uzmanlar kış aylarında bağışıklık sistemini güçlendirmek için öneriler paylaşıyor.',
            time: '4 saat önce',
            isViewed: false,
            isNew: false,
            likes: 142,
            url: '/detail.html'
        },
        {
            id: 5,
            title: 'Eğitim',
            category: 'education',
            image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=250&fit=crop',
            headline: 'Eğitimde Dijital Dönüşüm',
            summary: 'Pandemi sonrası eğitim sisteminde yaşanan değişiklikler ve gelecek planları.',
            time: '5 saat önce',
            isViewed: false,
            isNew: true,
            likes: 76,
            url: '/detail.html'
        },
        {
            id: 6,
            title: 'Otomotiv',
            category: 'automotive',
            image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=250&fit=crop',
            headline: 'Elektrikli Araçların Geleceği',
            summary: 'Otomotiv sektöründe elektrikli araçların payı hızla artıyor.',
            time: '6 saat önce',
            isViewed: false,
            isNew: false,
            likes: 203,
            url: '/detail.html'
        },
        {
            id: 7,
            title: 'Sanat',
            category: 'art',
            image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=250&fit=crop',
            headline: 'Modern Sanat Sergilerinden Kareler',
            summary: 'Şehrin prestijli galerilerinde açılan yeni sergiler sanatseverların ilgisini çekiyor.',
            time: '7 saat önce',
            isViewed: false,
            isNew: false,
            likes: 89,
            url: '/detail.html'
        },
        {
            id: 8,
            title: 'Seyahat',
            category: 'travel',
            image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=250&fit=crop',
            headline: 'Bu Kış Gidilecek En İyi Destinasyonlar',
            summary: 'Kış tatili için en popüler destinasyonları ve seyahat ipuçlarını derledik.',
            time: '8 saat önce',
            isViewed: false,
            isNew: false,
            likes: 256,
            url: '/detail.html'
        },
        {
            id: 9,
            title: 'Bilim',
            category: 'science',
            image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=400&h=250&fit=crop',
            headline: 'Uzay Araştırmalarında Yeni Bulgular',
            summary: 'NASA\'nın son keşifleri uzay bilimi alanında yeni ufuklar açıyor.',
            time: '9 saat önce',
            isViewed: false,
            isNew: true,
            likes: 178,
            url: '/detail.html'
        },
        {
            id: 10,
            title: 'Müzik',
            category: 'music',
            image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=250&fit=crop',
            headline: 'Yeni Çıkan Albümler ve Konserler',
            summary: 'Bu ay müzik dünyasından en çok konuşulan gelişmeler.',
            time: '10 saat önce',
            isViewed: false,
            isNew: false,
            likes: 134,
            url: '/detail.html'
        },
        {
            id: 11,
            title: 'Müzik',
            category: 'music',
            image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=250&fit=crop',
            headline: 'Yeni Çıkan Albümler ve Konserler',
            summary: 'Bu ay müzik dünyasından en çok konuşulan gelişmeler.',
            time: '10 saat önce',
            isViewed: false,
            isNew: false,
            likes: 134,
            url: '/detail.html'
        },
        {
            id: 12,
            title: 'Müzik',
            category: 'music',
            image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=250&fit=crop',
            headline: 'Yeni Çıkan Albümler ve Konserler',
            summary: 'Bu ay müzik dünyasından en çok konuşulan gelişmeler.',
            time: '10 saat önce',
            isViewed: false,
            isNew: false,
            likes: 134,
            url: '/detail.html'
        },
        {
            id: 13,
            title: 'Müzik',
            category: 'music',
            image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=250&fit=crop',
            headline: 'Yeni Çıkan Albümler ve Konserler',
            summary: 'Bu ay müzik dünyasından en çok konuşulan gelişmeler.',
            time: '10 saat önce',
            isViewed: false,
            isNew: false,
            likes: 134,
            url: '/detail.html'
        },
        {
            id: 14,
            title: 'Müzik',
            category: 'music',
            image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=250&fit=crop',
            headline: 'Yeni Çıkan Albümler ve Konserler',
            summary: 'Bu ay müzik dünyasından en çok konuşulan gelişmeler.',
            time: '10 saat önce',
            isViewed: false,
            isNew: false,
            likes: 134,
            url: '/detail.html'
        },
        {
            id: 15,
            title: 'Müzik',
            category: 'music',
            image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=250&fit=crop',
            headline: 'Yeni Çıkan Albümler ve Konserler',
            summary: 'Bu ay müzik dünyasından en çok konuşulan gelişmeler.',
            time: '10 saat önce',
            isViewed: false,
            isNew: false,
            likes: 134,
            url: '/detail.html'
        },
        {
            id: 16,
            title: 'Müzik',
            category: 'music',
            image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=250&fit=crop',
            headline: 'Yeni Çıkan Albümler ve Konserler',
            summary: 'Bu ay müzik dünyasından en çok konuşulan gelişmeler.',
            time: '10 saat önce',
            isViewed: false,
            isNew: false,
            likes: 134,
            url: '/detail.html'
        },
        {
            id: 17,
            title: 'Müzik',
            category: 'music',
            image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=250&fit=crop',
            headline: 'Yeni Çıkan Albümler ve Konserler',
            summary: 'Bu ay müzik dünyasından en çok konuşulan gelişmeler.',
            time: '10 saat önce',
            isViewed: false,
            isNew: false,
            likes: 134,
            url: '/detail.html'
        },
        {
            id: 10,
            title: 'Müzik',
            category: 'music',
            image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=250&fit=crop',
            headline: 'Yeni Çıkan Albümler ve Konserler',
            summary: 'Bu ay müzik dünyasından en çok konuşulan gelişmeler.',
            time: '10 saat önce',
            isViewed: false,
            isNew: false,
            likes: 134,
            url: '/detail.html'
        },
        {
            id: 19,
            title: 'Müzik',
            category: 'music',
            image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=250&fit=crop',
            headline: 'Yeni Çıkan Albümler ve Konserler',
            summary: 'Bu ay müzik dünyasından en çok konuşulan gelişmeler.',
            time: '10 saat önce',
            isViewed: false,
            isNew: false,
            likes: 134,
            url: '/detail.html'
        },
        {
            id: 20,
            title: 'Müzik',
            category: 'music',
            image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=250&fit=crop',
            headline: 'Yeni Çıkan Albümler ve Konserler',
            summary: 'Bu ay müzik dünyasından en çok konuşulan gelişmeler.',
            time: '10 saat önce',
            isViewed: false,
            isNew: false,
            likes: 134,
            url: '/detail.html'
        },
    ];

    // Stories functionality
    function initializeStories() {
        console.log('Stories initialized');

        // Create story items dynamically
        createStoryItems();

        // Initialize Slick Slider
        initializeStoriesSlider();

        // Bind click events to story items
        $(document).on('click', '.lite-story-item', function () {
            const storyId = $(this).data('story-id') || 1;
            openStoryModal(storyId);
        });

        // Keyboard navigation support
        $(document).on('keydown', '.lite-story-item', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const storyId = $(this).data('story-id') || 1;
                openStoryModal(storyId);
            }
        });

        // Navigation - Slider başlatıldıktan sonra bağla
        setTimeout(() => {
            console.log('Setting up navigation buttons...');
            console.log('Prev button:', $('.lite-stories-prev').length);
            console.log('Next button:', $('.lite-stories-next').length);

            $('.lite-stories-prev').off('click').on('click', function () {
                console.log('Previous clicked');
                if ($('.lite-stories-slick-slider').hasClass('slick-initialized')) {
                    $('.lite-stories-slick-slider').slick('slickPrev');
                } else {
                    console.log('Slider not initialized');
                }
            });

            $('.lite-stories-next').off('click').on('click', function () {
                console.log('Next clicked');
                if ($('.lite-stories-slick-slider').hasClass('slick-initialized')) {
                    $('.lite-stories-slick-slider').slick('slickNext');
                } else {
                    console.log('Slider not initialized');
                }
            });
        }, 500);
    }

    function createStoryItems() {
        const slider = $('.lite-stories-slick-slider');
        slider.empty();

        storiesData.forEach((story, index) => {
            const storyItem = $(`
                    <div class="lite-story-item flex flex-col items-center" data-story-id="${story.id}" tabindex="0" role="button" aria-label="Hikaye: ${story.title}">
                        <div class="lite-story-circle relative">
                            <div class="lite-story-gradient ${!story.isViewed ? 'lite-story-unviewed' : ''} absolute inset-0 rounded-full p-1">
                                <div class="w-full h-full lite-bg-primary rounded-full p-1">
                                    <img src="${story.image}" alt="${story.title}" 
                                         class="w-full h-full object-cover rounded-full">
                                </div>
                            </div>
                            ${story.isNew ? '<div class="lite-story-new absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white"></div>' : ''}
                            ${story.isViewed ? '<div class="lite-story-viewed absolute bottom-1 right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>' : ''}
                        </div>
                        <p class="lite-story-title text-sm lite-text-primary mt-2 text-center font-medium group-hover:lite-text-accent transition-colors">
                            ${story.title}
                        </p>
                    </div>
                `);

            slider.append(storyItem);
        });

        // Mobilde slider'ın başlangıç pozisyonunu ayarla
        setTimeout(() => {
            if (window.innerWidth <= 768) {
                $('.lite-stories-slick-slider').slick('slickGoTo', 0, true);
            }
        }, 100);

        // Mobilde daha iyi kontrol için
        // if (window.innerWidth <= 768) {
        //     // Mobilde slider'ın başlangıç ve bitiş pozisyonlarını kontrol et
        //     $('.lite-stories-slick-slider').on('afterChange', function (event, slick, currentSlide) {
        //         console.log('Current slide:', currentSlide, 'Total slides:', storiesData.length);

        //         // Son slide'da ise infinite scroll'u devre dışı bırak
        //         if (currentSlide >= storiesData.length - 4) {
        //             $('.lite-stories-slick-slider').slick('slickSetOption', 'infinite', false, true);
        //         }
        //     });

        //     // Touch start event'i ekle
        //     $('.lite-stories-slick-slider').on('touchstart', function (e) {
        //         console.log('Touch start');
        //     });

        //     // Touch end event'i ekle
        //     $('.lite-stories-slick-slider').on('touchend', function (e) {
        //         console.log('Touch end');
        //     });
        // }
    }

    function initializeStoriesSlider() {
        const isMobile = window.innerWidth <= 768;

        const sliderConfig = {
            infinite: !isMobile,
            slidesToShow: isMobile ? 4 : 1,
            slidesToScroll: 1,
            variableWidth: !isMobile, // Desktop: serbest genişlik; Mobile: sabit
            centerMode: false,
            arrows: false, // Custom okları kullanıyoruz
            dots: false,
            swipeToSlide: true,
            draggable: true,
            touchMove: true,
            swipe: true,
            waitForAnimate: false,
            edgeFriction: 0.15,
            touchThreshold: isMobile ? 30 : 5,
            speed: isMobile ? 100 : 300,
            cssEase: 'ease-out',
            responsive: [
                {
                    breakpoint: 768,
                    settings: {
                        infinite: false,
                        slidesToShow: 4,
                        slidesToScroll: 1,
                        variableWidth: false,
                        centerMode: false,
                        arrows: false,
                        dots: false,
                        swipeToSlide: true,
                        draggable: true,
                        touchMove: true,
                        swipe: true,
                        touchThreshold: 30,
                        speed: 100,
                        cssEase: 'ease-out'
                    }
                }
            ]
        };

        $('.lite-stories-slick-slider').slick(sliderConfig);

        // Accessibility fix - Remove aria-hidden from focusable elements
        setTimeout(() => {
            $('.lite-stories-slick-slider .slick-slide').each(function () {
                const $slide = $(this);
                const $focusableElements = $slide.find('button, [tabindex], input, select, textarea, a[href]');

                if ($focusableElements.length > 0) {
                    $slide.removeAttr('aria-hidden');
                }
            });
        }, 100);

        console.log('Slider initialized with config:', sliderConfig);
        console.log('Slider element:', $('.lite-stories-slick-slider'));
        console.log('Slider has slick class:', $('.lite-stories-slick-slider').hasClass('slick-initialized'));
    }

    function openStoryModal(storyId) {
        const story = storiesData.find(s => s.id === storyId) || storiesData[0];
        const modal = $('#liteStoryModal');

        // Update modal content
        $('#liteStoryTitle').text(story.title);
        $('#liteStoryTime').text(story.time);
        $('#liteStoryImage').attr('src', story.image);
        $('#liteStoryImageBackground').attr('src', story.image);
        $('#liteStoryHeadline').text(story.headline);
        $('#liteStorySummary').text(story.summary);

        modal.removeClass('hidden').addClass('show');
        $('body').css('overflow', 'hidden');

        startStoryProgress();
    }

    function closeStoryModal() {
        const modal = $('#liteStoryModal');
        modal.addClass('hidden').removeClass('show');
        $('body').css('overflow', 'auto');
        stopStoryProgress();
    }

    let storyTimer = null;
    function startStoryProgress() {
        const progressBar = $('.lite-story-progress-bar');
        let progress = 0;

        storyTimer = setInterval(() => {
            progress += 2;
            progressBar.css('width', progress + '%');

            if (progress >= 100) {
                closeStoryModal();
            }
        }, 100);
    }

    function stopStoryProgress() {
        if (storyTimer) {
            clearInterval(storyTimer);
            storyTimer = null;
        }
    }

    // slideStories function removed - now using slick slider

    // Initialize modal events
    $('#liteStoryModal .ri-close-line').parent().on('click', closeStoryModal);
    $('#liteStoryPrev').on('click', function () { console.log('Previous story'); });
    $('#liteStoryNext').on('click', function () { console.log('Next story'); });

    // Keyboard navigation
    $(document).on('keydown', function (e) {
        if (!$('#liteStoryModal').hasClass('hidden')) {
            if (e.key === 'Escape') {
                closeStoryModal();
            }
        }
    });

    // Initialize stories when DOM is ready
    if ($('.lite-stories-container').length) {
        initializeStories();
    }

    // Window resize event for responsive slider (debounced, breakpoint-aware)
    let storiesResizeTimer = null;
    let wasMobile = window.innerWidth <= 768;
    $(window).on('resize', function () {
        clearTimeout(storiesResizeTimer);
        storiesResizeTimer = setTimeout(() => {
            const isMobile = window.innerWidth <= 768;
            if (isMobile === wasMobile) return; // breakpoint değişmediyse dokunma

            const $slider = $('.lite-stories-slick-slider');
            if ($slider.hasClass('slick-initialized')) {
                const currentIndex = $slider.slick('slickCurrentSlide');
                $slider.slick('unslick');
                initializeStoriesSlider();
                // Eski index'e mümkün olduğunca yakın konumlandır
                setTimeout(() => {
                    if ($('.lite-stories-slick-slider').hasClass('slick-initialized')) {
                        $('.lite-stories-slick-slider').slick('slickGoTo', currentIndex, true);
                    }
                }, 50);
            }

            wasMobile = isMobile;
        }, 150);
    });

});



function openCommentModal() {
    $('#liteCommentModal').removeClass('hidden').addClass('flex');
}

$('#liteCommentLoadMore').click(openCommentModal);


$('#liteCommentModalClose').click(function () {
    $('#liteCommentModal').addClass('hidden').removeClass('flex');
});

$('#liteCommentModal').on('click', function (e) {
    if (e.target === this) {
        $(this).addClass('hidden').removeClass('flex');
    }
});










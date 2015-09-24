if (!window.console) {
    window.console = {
        log: function() {}
    };
}

// store references to DOM elements to save on subsequent traversals
var $window = $(window),
    $html = $("html"),
    $body = $('body'),
    $closeButton = $('#ut_close'),
    $openButton = $('#ut_open'),
    $leavebehind = $('.leavebehind'),
    $interactive = $('.interactive');

var clickButton = false;

var UT_CM = {};
UT_CM.isAutoOpened = false;
UT_CM.width = $window.width();
UT_CM.height = $window.height();

UT_CM.closeBtnClass = "rotate-ani"; //rotate-ani & opacity-ani


// UT_CM.ignoreWraps = ['.placeholder'];



var ua = window.navigator.userAgent.toLowerCase();
window.platform = {
    isHD: window.devicePixelRatio > 1,
    isiPad: ua.match(/ipad/i) !== null,
    isNexus7: ua.match(/Nexus 7/gi) !== null,
    isMobile: ua.match(/Android|webOS|iPhone|iPod|BlackBerry|IEMobile/i) !== null && ua.match(/Mobile/i) !== null,
    isiPhone: ua.match(/iphone/i) !== null,
    isAndroid: ua.match(/android/i) !== null,
    // isAndroid444: ua.match(/android 4\.4\.4/i) !== null,
    // isAndroid43: ua.match(/android 4\.3/i) !== null,
    isS3: ua.match(/gt\-i9300/i) !== null,
    isS4: ua.match(/(gt\-i95)|(sph\-l720)/i) !== null,
    isS5: ua.match(/sm\-g900/i) !== null,
    isIE: /(msie|trident)/i.test(navigator.userAgent),
    ltIE9: $("html").hasClass("lt-ie9"),
    isIE9: $("html").hasClass('ie9'),
    isIE11: ua.match(/Trident\/7\.0/i) !== null,
    isChrome: ua.match(/Chrome/gi) !== null,
    isFirefox: ua.match(/firefox/gi) !== null,
    hasTouch: ('ontouchstart' in window),
    supportsSvg: !!document.createElementNS && !!document.createElementNS('http://www.w3.org/2000/svg', 'svg').createSVGRect
};

window.platform.isAndroidPad = platform.isAndroid && !platform.isMobile;
window.platform.isTablet = platform.isiPad || platform.isAndroidPad;
window.platform.isDesktop = !(platform.isMobile || platform.isTablet);
window.platform.isIOS = platform.isiPad || platform.isiPhone;





TweenMax.delayedCall(0.5, function() {
    window.startAd();
});

var startAdIsCalled = false;


window.startAd = function() {
    if (startAdIsCalled) return;

    startAdIsCalled = true;

    if (!UT_CM.isAutoOpened) {
        UT_CM.isAutoOpened = true;
        $closeButton.css("visibility", "visible");
        $openButton.css("visibility", "hidden");
        $body.removeClass('closed').addClass('opened');

        UT_CM.openAnimation();
    }
};

window.closeAd = function() {
    if ($body.hasClass('opened')) {
        UT_CM.clickCloseBtn();
    }
};

$closeButton.on("click", function() {
    if (clickButton) return false;
    clickButton = true;

    UT_CM.clickCloseBtn();
});

UT_CM.clickCloseBtn = function() {
    $closeButton.css("visibility", "hidden");
    $openButton.css("visibility", "visible");
    $closeButton.removeClass(UT_CM.closeBtnClass);
    $openButton.addClass(UT_CM.closeBtnClass);

    TweenMax.to($interactive, 0.8, {
        autoAlpha: 0,
        onComplete: function() {
            $interactive.css('display', 'none');
        }
    });
    
    TweenMax.to($leavebehind, 0.8, {
        autoAlpha: 1,
        delay: 0.8,
        onComplete: function() {
            clickButton = false;
            $body.removeClass('opened').addClass('closed');

            UT_CM.afterCollapseAd();
        }
    });

    TweenMax.fromTo(UT_CM.$ad_choices, 0.3, {
        autoAlpha: 1
    }, {
        autoAlpha: 0
    });

    TweenMax.fromTo(UT_CM.$ad_choices, 0.2, {
        autoAlpha: 0
    }, {
        autoAlpha: 1,
        delay: 1
    });

    UT_CM.collapseAd();
}

$openButton.on("click", function() {
    if (clickButton) return false;
    clickButton = true;

    UT_CM.clickOpenBtn();
});

UT_CM.clickOpenBtn = function() {
    $closeButton.css("visibility", "visible");
    $openButton.css("visibility", "hidden");
    $openButton.removeClass(UT_CM.closeBtnClass);
    $closeButton.addClass(UT_CM.closeBtnClass);

    TweenMax.to($leavebehind, 0.6, {
        autoAlpha: 0
    });

    
    $interactive.css('display', 'block');
    TweenMax.to($interactive, 1, {
        autoAlpha: 1,
        delay: 0.6,
        onComplete: function() {
            clickButton = false;
            $body.removeClass('closed').addClass('opened');

            UT_CM.afterExpandAd();
        }
    });

    TweenMax.fromTo(UT_CM.$ad_choices, 0.6, {
        autoAlpha: 0
    }, {
        autoAlpha: 1,
        delay: 0.6
    });

    UT_CM.expandAd();
}

$window.on("resize", function() {
    //
    UT_CM.updateUI();
});

UT_CM.updateUI = function() {
    UT_CM.width = $window.width();
    UT_CM.height = $window.height();

    if (typeof UT_CM.resizeAd == "function") {
        UT_CM.resizeAd(UT_CM.width, UT_CM.height);
    }
}

UT_CM.checkPlatform = function() {
    if (platform.isHD) $html.addClass('hd');
    if (platform.isiPad) $html.addClass('ipad');
    if (platform.isNexus7) $html.addClass('nexus7');
    if (platform.isMobile) $html.addClass('mobile');
    if (platform.isiPhone) $html.addClass('iphone');
    if (platform.isAndroid) $html.addClass('android');
    if (platform.isS3) $html.addClass('s3');
    if (platform.isS4) $html.addClass('s4');
    if (platform.isS5) $html.addClass('s5');
    if (platform.isIE) $html.addClass('ie');
    if (platform.isIE11) $html.addClass('ie11');
    if (platform.isChrome) $html.addClass('chrome');
    if (platform.isFirefox) $html.addClass('firefox');
    if (platform.hasTouch) $html.addClass('has-touch');
    if (!platform.hasTouch) $html.addClass('no-touch');
    if (platform.supportsSvg) $html.addClass('support-svg');

    if (platform.isAndroidPad) $html.addClass('android-pad');
    if (platform.isTablet) $html.addClass('tablet');
    if (platform.isDesktop) $html.addClass('desktop');
    if (platform.isIOS) $html.addClass('ios');
}

UT_CM.pictureLoad = function() {
    $(".preload").each(function() {
        var $this = $(this);
        var src = $this.data("source");

        var img = $("<img>").attr({
            src: src,
            alt: ''
        });

        $this.append(img);
    });
}

UT_CM.registerEvent = function() {
    $('.btn-container').on('mouseenter', function() {
        if (!platform.hasTouch) {
            var normal = $(this).find('.normal');
            TweenMax.to(normal, 0.2, {
                autoAlpha: 0
            });
        }
    });

    $('.btn-container').on('mouseleave', function(e) {
        if (!platform.hasTouch) {
            var normal = $(this).find('.normal');
            TweenMax.to(normal, 0.2, {
                autoAlpha: 1
            });
        }
    });

    $(UT_CM.trackingList).each(function(index, el) {
        if (el[2]) {
            $(el[2]).on('click', function() {
                undertone.creative.redirectTo(el[1], el[0]);
                return false;
            });
        }
    });

    $(UT_CM.ignoreWraps).each(function  (index,el) {
        $(el).on('click',function  () {
            console.log("::::::",el);
            return false;
        });
    });
    $('.wrapper-container').on("click", function(e) {

        
        if ($(e.target).parents('#ut_open').length > 0) {
            return;
        }
        if ($(e.target).parents('#ut_close').length > 0) {
            return;
        }
        if ($(e.target).parents('.utvp_controls').length > 0) {
            // console.log("message");
            return;
        }
        if (!$(e.target).data("utclickid")) {
            if ($body.hasClass("opened")) {
                undertone.creative.redirectTo(UT_CM.trackingList[1][1],UT_CM.trackingList[1][0]);
            } else {
                undertone.creative.redirectTo(UT_CM.trackingList[0][1],UT_CM.trackingList[0][0]);
            }
            return false;
        }
    });
}

UT_CM.fixAdChoices = function(){
    //
    UT_CM.$ad_choices.appendTo($('.wrapper-1280'));
}
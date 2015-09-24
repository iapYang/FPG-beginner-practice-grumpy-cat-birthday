//xxx
var $video, vp;
var $videoContainer = $('.video-container');


//define TweenMax vars
var t1 = $('.interactive .t1');
var t2 = $('.interactive .t2');
var t3 = $('.interactive .t3');
var t4 = $('.interactive .t4');
var t5 = $('.interactive .t5');
var dark = $('.interactive .dark');
var contentContainer = $('.interactive .content-container');
var title = $('.interactive .title');

//define my canvas vars
var canvas = document.getElementById('canvas');
var context = canvas.getContext("2d");
canvas.width = 300;
canvas.height = 291;
var animalImg = document.getElementById('animal');
var animalLeftImg = document.getElementById('animalLeft');
var animalTopImg = document.getElementById('animalTop');
var animal = {
    xTimes: 14,
    yTimes: 1,
    img: animalImg
};
var animalLeft = {
    xTimes: 32,
    yTimes: 1,
    img: animalLeftImg
};
var animalTop = {
    xTimes: 23,
    yTimes: 1,
    img: animalTopImg
};
var choice = 0; //for change pics
var objs = new Array(3);
objs[0] = animal;
objs[1] = animalLeft;
objs[2] = animalTop;
var currentValue; //animate's callback
// var flag = false; //can i play the animation
// var hasChange = false; //did I change it

//cat-animation
function catAnimation() {
    currentValue = animate({
        xTimes: objs[choice].xTimes,
        yTimes: objs[choice].yTimes
    }, {
        cxt: context,
        width: canvas.width,
        height: canvas.height,
        image: objs[choice].img
    });
}

function animate(obj1, obj2) {
    var obj = {
        count: 0,
        xTimes: 1,
        yTimes: 1
    };

    $.extend(true, obj, obj1);

    var x_count = 0;
    var y_count = 0;
    var callback = {
        count: 0,
        id: 0,
        flag: false
    };

    var id = setInterval(function() {
        x_count = obj.count % obj.xTimes;
        y_count = parseInt(obj.count / obj.xTimes);
        animateImage(x_count, y_count, obj2);
        // console.log(obj.count);
        obj.count++;
        // if (obj.count > xTimes * yTimes) {
        //     obj.count = 0;
        // }
        if (obj.count == obj.xTimes * obj.yTimes) {
            clearInterval(id);
            obj.count = 0;
            callback.flag = true;
        }
        callback.count = obj.count;
    }, 1000 / 24);
    callback.id = id;

    return callback;
}

function animateImage(sx, sy, obj) {
    obj.cxt.clearRect(0, 0, obj.width, obj.height);
    obj.cxt.drawImage(obj.image, sx * obj.width, sy * obj.height, obj.width, obj.height, 0, 0, obj.width, obj.height);
}

//cat Hover
$videoContainer.on('mouseenter', function() {
    if (currentValue.flag && (!platform.hasTouch)) {
        choice = 2;
        catAnimation();
    }
});
dark.on('mouseenter', function() {
    if (currentValue.flag && (!platform.hasTouch)) {
        choice = 1;
        catAnimation();
    }
});

//Aniamtion
function expandAnimation() {
    var time1 = 0.4;
    var time2 = 0.3;
    //t1
    TweenMax.fromTo(t1, time1, {
        opacity: 0,
        x: calculateX(t1),
        y: calculateY(t1),
        scale: 0,
    }, {
        opacity: 1,
        scale: 1,
        x: 0,
        y: 0,
        ease: Back.easeOut,
        delay: 1.5
    });
    //t2
    TweenMax.fromTo(t2, time1, {
        opacity: 0,
        x: calculateX(t2),
        y: calculateY(t2),
        scale: 0,
    }, {
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        ease: Back.easeOut,
        delay: 1.5 + (time1 - time2),
    });
    //t3
    TweenMax.fromTo(t3, time1, {
        opacity: 0,
        x: calculateX(t3),
        y: calculateY(t3),
        scale: 0,
    }, {
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        ease: Back.easeOut,
        delay: 1.5 + (time1 - time2) * 2,
    });
    //t4
    TweenMax.fromTo(t4, time1, {
        opacity: 0,
        x: calculateX(t4),
        y: calculateY(t4),
        scale: 0,
    }, {
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        ease: Back.easeOut,
        delay: 1.5 + (time1 - time2) * 3,
    });
    //t5
    TweenMax.fromTo(t5, time1, {
        opacity: 0,
        x: calculateX(t5),
        y: calculateY(t5),
        scale: 0,
    }, {
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        ease: Back.easeOut,
        delay: 1.5 + (time1 - time2) * 4,
    });
    //video-container
    TweenMax.fromTo($videoContainer, 0.5, {
        scale: 0.0001,
        autoAlpha: 1,
    }, {
        scale: 1,
        ease: Back.easeOut,
        delay: 2.25,
        onStart: function() {
            // fixVideo();
            // $window.trigger('resize');
        },
        onComplete: function() {
            setTimeout(function() {
                $window.trigger('resize');
            }, 800);

        },
    });
}

function calculateY(element) {
    var obj = element[0];
    var top = obj.offsetTop + title[0].offsetTop;
    top = contentContainer.height() / 2 - top;
    return top;
}

function calculateX(element) {
    var obj = element[0];
    var left = obj.offsetLeft + title[0].offsetLeft;
    left = contentContainer.width() / 2 - left;
    return left;
}




UT_CM.$ad_choices = $('#ad_choices');
UT_CM.closeBtnClass = 'rotate-ani'; //rotate-ani & opacity-ani & none
UT_CM.ignoreIDArray = ['ut_open', 'ut_close', 'ad_choices'];
UT_CM.ignoreWraps = '#ut_open, #ut_close, .utvp_controls, .placeholder';


UT_CM.trackingList = [
    ['COLLAPSED_BACKGROUND', 1, '.leavebehind .bg'],
    ['EXPANDED_BACKGROUND', 4, '.interactive .interactive-container'],
    ['COLLAPSED_LOGO', 2, '.leavebehind .logo'],
    ['COLLAPSED_PRODUCT', 3, '.leavebehind .cat'],
    ['EXPANDED_LOGO', 5, '.interactive .logo,.interactive .star-container'],
    ['EXPANDED_CTA', 6, '.interactive .cta-container'],
    ['EXPANDED_PRODUCT', 7, '.interactive .dark']
];

UT_CM.openAnimation = function() {
    // setInterval(function() {
    //     undertone.creative.trackEvent("event", "id");
    // }, 5000);

    //do opening animating
    needVideo(10);

    setTimeout(function() {
        TweenMax.set($videoContainer, {
            scale: 0.001
        });
        expandAnimation();
    }, 100);
    // expandAnimation();
    setTimeout(catAnimation, 1000);


};

UT_CM.expandAd = function() {
    //console.log('=== expandAd ===');
    fixVideo();
};

UT_CM.afterExpandAd = function() {
    //console.log('=== afterExpandAd ===');

};

UT_CM.collapseAd = function() {
    //console.log('=== collapseAd ===');
};

UT_CM.afterCollapseAd = function() {
    //console.log('=== afterCollapseAd ===');
};

UT_CM.resizeAd = function(width, height) {
    //console.log(width, height);
    $video && fixVideo();
    if (platform.isMobile && !platform.isiPhone && width > height && vp) {
        vp.pause();
    }
};
/* Extended  UTCommonModule End*/

function initVideo() {

    var sourceMp4 = 'video/video.mp4';

    var startCover = 'video/firstFrame.jpg';
    var endCover = 'video/endFrame.jpg';
    var config = {
        aspectRatio: '16:9',
        source_mp4: sourceMp4,
        slate: startCover,
        endSlate: endCover,
        displayHidden: false,
        preload: 'none',
        clickID: 7
    };

    if ($('#VIDEO_PLAYER').data('ut_videoplayer')) {
        $('#VIDEO_PLAYER').data('ut_videoplayer').videoPlayer._instances['VIDEO_PLAYER'].params.clickID = config.clickID;
    }


    vp = $('.video').attr('id', 'VIDEO_PLAYER').ut_videoplayer(config);

    // $('video').on('play pause', function() {
    //     $('.utvp_controls').css('-webkit-transform', 'translate3d(0,0,0)');
    // });
    $video = $('video');

    fixPlayBtn();

    $video.on('ended', function() {
        $html.addClass('videoComplete');

        if (platform.isiPhone) {
            $('.utvp_play_toggle_wrapper').css({
                opacity: 1
            });
        }
    }).on('play', function() {
        $html.removeClass('videoComplete');
        fixVideo();
    });
    $video.on('pause', fixPlayBtn);
}

function fixPlayBtn() {
    if (platform.isiPhone) {
        $('.utvp_play_toggle_wrapper').css({
            'display': 'inline-block',
            opacity: 0
        });
    }
}

function fixVideo() {
    if (!platform.isDesktop) {
        var h = $videoContainer.width() * 9 / 16 - 0;
        $videoContainer.height(h);
        if (platform.isiPhone) {
            $video.css({
                'height': Math.ceil(h) + 'px!important',
                '-webkit-transform': 'scale(1.11)'
            });
            // console.log("============",$videoContainer.width());
        }
        if (platform.isTablet) {
            if (platform.isiPad) {
                h = h + (h > 300 ? 2 : -4);
            } else {
                h = h + (h > 300 ? 2 : 1);
            }
            $video.css('height', h + 'px!important');
        }
    } else {
        var h = $video.height();
        platform.isIE10 && (h = h - 2);
        $videoContainer.height(h);
    }
}

function needVideo(fixDelay) {
    initVideo();
    // if (platform.isFirefox) {
    //     TweenMax.set($videoContainer, {
    //         autoAlpha: 0
    //     });
    // }

    setTimeout(function() {
        fixVideo();
        // if (platform.isFirefox) {
        //     TweenMax.set($videoContainer, {
        //         autoAlpha: 1
        //     });
        // }

        $window.trigger('resize');

    }, fixDelay);
}

UT_CM.pictureLoad();
UT_CM.registerEvent();
UT_CM.checkPlatform();
UT_CM.fixAdChoices();
UT_CM.updateUI();


// keep the unused css rules
function tmp() {
    var tmp = {};
    tmp.className = "video";
    tmp.className = "ul, ol, li";
    tmp.className = ".clear_both";
    tmp.className = ".clearfix:after";
    tmp.className = ".clearfix";
    tmp.className = "* html .clearfix";
    tmp.className = "a";
    tmp.className = "a:active, a:focus, input";
    tmp.className = ".leavebehind .icon";
    tmp.className = "#ut_close.rotate-ani, #ut_open.rotate-ani";
    tmp.className = "#ut_close.opacity-ani, #ut_open.opacity-ani";
    tmp.className = "undefined";
    tmp.className = ".utvp_player_frame, .utvp_video, .utvp_slate, .utvp_cover, .utvp_play_toggle_wrapper_insert";
    tmp.className = ".utvp_player_frame, object";
    tmp.className = ".utvp_play_toggle";
    tmp.className = ".utvp_player_frame, .utvp_video";
    tmp.className = "table";
    tmp.className = ".utvp_time_current, .utvp_time_duration";
    tmp.className = ".utvp_volume_slider";
    tmp.className = ".utvp_player_frame";
    tmp.className = ".utvp_controls, .picture-holder, .utvp_play_toggle, .utvp_buffer_wrapper, .utvp_slate, .utvp_player_frame";
    tmp.className = ".icon-play-toggle:before";
    tmp.className = ".utvp_play_toggle_wrapper:hover .icon-play-toggle:before";
    tmp.className = ".utvp_control_bar_buttons";
    tmp.className = ".utvp_control_bar_buttons:hover";
    tmp.className = ".utvp_progress_down";
    tmp.className = ".utvp_progress_current";
    tmp.className = ".btn-container";
    tmp.className = ".btn-container .normal";
    tmp.className = ".btn-container .hover";
    tmp.className = ".preload img";
    tmp.className = "#ad_choices";
    // tmp.className = "normal";
}

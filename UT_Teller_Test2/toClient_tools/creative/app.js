//xxx
var $video, vp;
var $videoContainer = $('.video-container');
var t = TweenMax;

UT_CM.$ad_choices = $('#ad_choices');
UT_CM.closeBtnClass = 'rotate-ani'; //rotate-ani & opacity-ani & none
UT_CM.ignoreWraps = ['.placeholder'];

UT_CM.trackingList = [
    ['COLLAPSED_BACKGROUND', 1, ''],
    ['EXPANDED_BACKGROUND', 4, '']
];
UT_CM.openAnimation = function() {
    // setInterval(function() {
    //     undertone.creative.trackEvent("event", "id");
    // }, 5000);

    //do opening animating

    if (datas) {
        t.delayedCall(0.2, function() {
            handleAnimate(datas.animation.interactive);

            handleEvents(datas.localEvent);
        })
    } else {
        throw new Error("Data load fail!")
    }

    initVideo();
    setTimeout(fixVideo, 10);


};

UT_CM.expandAd = function() {
    //console.log('=== expandAd ===');
};

UT_CM.afterExpandAd = function() {
    //console.log('=== afterExpandAd ===');
}

UT_CM.collapseAd = function() {
    //console.log('=== collapseAd ===');
};

UT_CM.afterCollapseAd = function() {
    //console.log('=== afterCollapseAd ===');
}

UT_CM.resizeAd = function(width, height) {
    //console.log(width, height);
    $video && fixVideo();
    if (platform.isMobile && !platform.isiPhone && width > height && vp) {
        vp.pause();
    }
};
/* Extended  UTCommonModule End*/


function handleAnimate (d) {
    $(d).each(function  (index1,el1) {
        
        if (el1.ifMobile&&platform.isMobile) {
            allAnimates(el1.allAnimate1,el1.container);

        }else if(el1.ifTablet&&platform.isTablet){
            allAnimates(el1.allAnimate2,el1.container);

        }else{
            allAnimates(el1.allAnimate,el1.container);

        }
    })
}

function allAnimates (allAnimates,container) {
    $(allAnimates).each(function  (index,el) {
        if (el.animateWay === "fromTo") {

                    t[el.animateWay](container,el.duration,el.params1,el.params2);

                }else{
                    if (el.params.onComplete) {

                        el.params.onComplete = function  () {
                            eval(el.onCompleteName+"()");
                        }
                    }
                    if (el.params.onStart) {

                        el.params.onStart = function  () {
                            eval(el.onStartName+"()");
                        }
                    }
                    t[el.animateWay](container,el.duration,el.params);

                }
    })
}
function handleEvents (d) {
    
    $(d).each(function  (index1,el1) {
        $interactive.on(el1.eventName,el1.originContainer,function  () {

            $(el1.targets).each(function  (index2,el2) {

                if (el2.animateWay === "fromTo") {

                    t[el2.animateWay](el2.targetName,el2.duration,el2.params1,el2.params2);

                }else{
                    t[el2.animateWay](el2.targetName,el2.duration,el2.params);
                }
                if (!el2.trackName) {

                    undertone.creative.trackEvent(el1.eventName.toUpperCase(), el1.trackName);
                };
                if (el2.extendFun) {
                    eval(el2.extendFun+"()");
                };
            })
            return false;
        })
    })
}
function frame1End () {
    // $('.flashAnimation').remove();

}
function initVideo() {

    var sourceMp4 = platform.isMobile ? 'video/videomobile.mp4' : 'video/video.mp4';

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

    $video.on('ended', function() {
        $html.addClass('videoComplete');
    });
    $video.on('play', function() {
        $html.removeClass('videoComplete');
        fixVideo();
    });
}

function fixVideo() {
    if (!platform.isDesktop) {
        var h = $videoContainer.width() * 9 / 16 - 0;
        $videoContainer.height(h);
        if (platform.isiPhone) {
            $video.css({
                'height': Math.ceil(h) + 'px!important',
                '-webkit-transform': 'scale(1.001)'
            });
        }
        if (platform.isTablet) {
            h = h + (h > 300 ? 2 : 1);
            $video.css('height', h + 'px!important');
        }
    } else {
        var h = $video.height();
        platform.isIE10 && (h = h - 2);
        $videoContainer.height(h);
    }
}

var datas;
$.getJSON('config.json',function  (data) {
    datas = data;
});
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

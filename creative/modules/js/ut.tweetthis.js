var TweetThis,root;root="undefined"!=typeof window&&null!==window?window:global,root.TweetThis=TweetThis={_utcenv:function(){var e=!1;return undertone&&undertone.creative&&(e=!0),e},_triggerEvent:function(e,t,a){var n=a||document.body;$(n).trigger("tweetthis-"+e,[t])},init:function(e,t){var a=this;return a.options=$.extend({},this.defaults,e),a.elem=t,a._build(a.elem,a.options,function(){a._loaded=!0}),a},defaults:{module:"data",source:"generic",buttonText:"Tweet This",showChars:!0,maxChars:140,invert:!1,style:!1},_build:function(e,t,a){var n=this,r=t||n.options||{maxChars:140};e=e[0]||e;var i;(e&&e.nodeName||e[0]&&e[0].nodeName)&&(i=(e.nodeName||e[0].nodeName).toLowerCase());var s=r.initContents||$(e).html(),o=document.createElement("textarea");o.className="inserted",o.value=s,$(o).on("focus",function(){if(undertone.creative.isFullPageFlex()){var e=o.style.fontSize||o.getAttribute("data-preFontSize")||"";(""==e||parseInt(e,10)<16)&&(o.setAttribute("data-preFontSize",e),o.style.fontSize="16px")}}),$(o).on("blur",function(){undertone.creative.isFullPageFlex()&&(o.style.fontSize=o.getAttribute("data-preFontSize"),undertone.creative.sendMessage("scrollToTop"))}),n.textarea=o,e.innerHTML="",$(e).append(o),$(e).addClass("ut-tweetthis-wrapper"),n.setupRegex(),r.showChars&&n._setupCharCount(n.textarea,r.maxChars),n._writeButton($(e),function(){r.style?n._addStyles(e,n.textarea,n.button,function(){a()}):a()})},_addStyles:function(e,t,a,n){$(e).css({"text-align":"center"}),$(t).css({display:"block",width:"80%",margin:"auto"}),n()},_changeEvent:function(e,t,a){var n=this;n.currentCount=n.getTweetLength($(e).val()),console.log("self.currentCount",n.currentCount),n.remaining=a-n.currentCount,n.options.invert&&(n.remaining=n.currentCount),$(t).html(n.remaining),n.currentCount>a?$(t).addClass("limit-exceeded"):$(t).removeClass("limit-exceeded")},_setupCharCount:function(e,t,a){var n=this,r=a||n.elem;n.currentCount=n.getTweetLength($(e).val()),t=t||this.options.maxChars,n.remaining=t-n.currentCount,n.options.invert&&(n.remaining=n.currentCount);var i=document.createElement("div");i.className="charcount",i.textContent=n.remaining,$(r).append(i),n.options.showChars&&$(e).on("keyup keydown keypress",function(){n._changeEvent(e,i,t,n.remaining)})},_writeButton:function(e,t,a){var n=document.createElement("button"),r=this,i=a||r.elem;r.button=n,$(r.button).on("click",function(e){e.preventDefault(),r._triggerEvent("buttonClick",r.elem,i),r._parseData(r.textarea,function(e){r._handleTweet(e)})}),n.className="ut_tweetthis-button",$(n).html(r.options.buttonText),$(n).attr("data-uttweetthis-src",e.attr("id")),$(i).append(n),t()},_getInput:function(e){var t=e||this,a=t.textinput.innerHTML;return a},_parseData:function(e,t){var a=this,n=$(e).val(),r=encodeURIComponent(n);a._triggerEvent("parseData",null,e),t(r)},_handleTweet:function(e){var t=screen.height,a=screen.width,n=Math.round(a/2-275),r=0;t>420&&(r=Math.round(t/2-210));var i="https://twitter.com/intent/tweet?text="+e;this._utcenv()&&undertone.creative.trackEvent("REDIRECT",i,!0),window.open(i,"intent","scrollbars=yes,resizable=yes,toolbar=no,location=yes,width=550,height=420,left="+n+",top="+r)},addCharsToCharClass:function(e,t,a){var n=String.fromCharCode(t);return a!==t&&(n+="-"+String.fromCharCode(a)),e.push(n),e},latinAccentChars:[],filloutLatin:function(){return this.addCharsToCharClass(this.latinAccentChars,192,214),this.addCharsToCharClass(this.latinAccentChars,216,246),this.addCharsToCharClass(this.latinAccentChars,248,255),this.addCharsToCharClass(this.latinAccentChars,256,591),this.addCharsToCharClass(this.latinAccentChars,595,596),this.addCharsToCharClass(this.latinAccentChars,598,599),this.addCharsToCharClass(this.latinAccentChars,601,601),this.addCharsToCharClass(this.latinAccentChars,603,603),this.addCharsToCharClass(this.latinAccentChars,611,611),this.addCharsToCharClass(this.latinAccentChars,616,616),this.addCharsToCharClass(this.latinAccentChars,623,623),this.addCharsToCharClass(this.latinAccentChars,626,626),this.addCharsToCharClass(this.latinAccentChars,649,649),this.addCharsToCharClass(this.latinAccentChars,651,651),this.addCharsToCharClass(this.latinAccentChars,699,699),this.addCharsToCharClass(this.latinAccentChars,768,879),this.addCharsToCharClass(this.latinAccentChars,7680,7935),this.latinAccentChars},UNICODE_SPACES:[String.fromCharCode(32),String.fromCharCode(133),String.fromCharCode(160),String.fromCharCode(5760),String.fromCharCode(6158),String.fromCharCode(8232),String.fromCharCode(8233),String.fromCharCode(8239),String.fromCharCode(8287),String.fromCharCode(12288)],addUnicodeSpaces:function(){return this.addCharsToCharClass(this.UNICODE_SPACES,9,13),this.addCharsToCharClass(this.UNICODE_SPACES,8192,8202),this.UNICODE_SPACES},INVALID_CHARS:[String.fromCharCode(65534),String.fromCharCode(65279),String.fromCharCode(65535)],addInvalidChars:function(){return this.addCharsToCharClass(this.INVALID_CHARS,8234,8238),this.INVALID_CHARS},regexen:{non_bmp_code_pairs:/[\uD800-\uDBFF][\uDC00-\uDFFF]/gm,urlHasHttps:/^https:\/\//i,invalidUrlWithoutProtocolPrecedingChars:/[-_.\/]$/,punct:/\!'#%&'\(\)*\+,\\\-\.\/:;<=>\?@\[\]\^_{|}~\$/,validTcoUrl:/^https?:\/\/t\.co\/[a-z0-9]+/i,validUrlQueryChars:/[a-z0-9!?\*'@\(\);:&=\+\$\/%#\[\]\-_\.,~|]/i,validUrlQueryEndingChars:/[a-z0-9_&=#\/]/i},setupRegex:function(){var e=this;e.regexen.spaces_group=e.regexSupplant(e.addUnicodeSpaces().join("")),e.regexen.invalid_chars_group=e.regexSupplant(e.addInvalidChars().join("")),e.regexen.validGTLD=e.regexSupplant(/(?:(?:aero|asia|biz|cat|com|coop|edu|gov|info|int|jobs|mil|mobi|museum|name|net|org|pro|tel|travel|xxx)(?=[^0-9a-zA-Z]|$))/),e.regexen.validCCTLD=e.regexSupplant(/(?:(?:ac|ad|ae|af|ag|ai|al|am|an|ao|aq|ar|as|at|au|aw|ax|az|ba|bb|bd|be|bf|bg|bh|bi|bj|bm|bn|bo|br|bs|bt|bv|bw|by|bz|ca|cc|cd|cf|cg|ch|ci|ck|cl|cm|cn|co|cr|cs|cu|cv|cx|cy|cz|dd|de|dj|dk|dm|do|dz|ec|ee|eg|eh|er|es|et|eu|fi|fj|fk|fm|fo|fr|ga|gb|gd|ge|gf|gg|gh|gi|gl|gm|gn|gp|gq|gr|gs|gt|gu|gw|gy|hk|hm|hn|hr|ht|hu|id|ie|il|im|in|io|iq|ir|is|it|je|jm|jo|jp|ke|kg|kh|ki|km|kn|kp|kr|kw|ky|kz|la|lb|lc|li|lk|lr|ls|lt|lu|lv|ly|ma|mc|md|me|mg|mh|mk|ml|mm|mn|mo|mp|mq|mr|ms|mt|mu|mv|mw|mx|my|mz|na|nc|ne|nf|ng|ni|nl|no|np|nr|nu|nz|om|pa|pe|pf|pg|ph|pk|pl|pm|pn|pr|ps|pt|pw|py|qa|re|ro|rs|ru|rw|sa|sb|sc|sd|se|sg|sh|si|sj|sk|sl|sm|sn|so|sr|ss|st|su|sv|sy|sz|tc|td|tf|tg|th|tj|tk|tl|tm|tn|to|tp|tr|tt|tv|tw|tz|ua|ug|uk|us|uy|uz|va|vc|ve|vg|vi|vn|vu|wf|ws|ye|yt|za|zm|zw|sx)(?=[^0-9a-zA-Z]|$))/),e.regexen.validPunycode=e.regexSupplant(/(?:xn--[0-9a-z]+)/),e.regexen.invalidDomainChars=e.stringSupplant("#{punct}#{spaces_group}#{invalid_chars_group}",e.regexen),e.regexen.validDomainChars=e.regexSupplant(/[^#{invalidDomainChars}]/),e.regexen.validDomainName=e.regexSupplant(/(?:(?:#{validDomainChars}(?:-|#{validDomainChars})*)?#{validDomainChars}\.)/),e.regexen.validAsciiDomain=e.regexSupplant(/(?:(?:[\-a-z0-9#{latinAccentChars}]+)\.)+(?:#{validGTLD}|#{validCCTLD}|#{validPunycode})/gi),e.regexen.invalidShortDomain=e.regexSupplant(/^#{validDomainName}#{validCCTLD}$/),e.regexen.validUrlPrecedingChars=e.regexSupplant(/(?:[^A-Za-z0-9@＠$#＃#{invalid_chars_group}]|^)/),e.regexen.validPortNumber=e.regexSupplant(/[0-9]+/),e.regexen.validGeneralUrlPathChars=e.regexSupplant(/[a-z0-9!\*';:=\+,\.\$\/%#\[\]\-_~@|&#{latinAccentChars}]/i),e.regexen.validUrlPathEndingChars=e.regexSupplant(/[\+\-a-z0-9=_#\/#{latinAccentChars}]|(?:#{validUrlBalancedParens})/i),e.regexen.validUrlBalancedParens=e.regexSupplant(/\(#{validGeneralUrlPathChars}+\)/i),e.regexen.validSubdomain=e.regexSupplant(/(?:(?:#{validDomainChars}(?:[_-]|#{validDomainChars})*)?#{validDomainChars}\.)/),e.regexen.validDomain=e.regexSupplant(/(?:#{validSubdomain}*#{validDomainName}(?:#{validGTLD}|#{validCCTLD}|#{validPunycode}))/),e.regexen.validUrlPath=e.regexSupplant("(?:(?:#{validGeneralUrlPathChars}*(?:#{validUrlBalancedParens}#{validGeneralUrlPathChars}*)*#{validUrlPathEndingChars})|(?:@#{validGeneralUrlPathChars}+/))","i"),e.regexen.latinAccentChars=e.regexSupplant(e.filloutLatin().join("")),e.regexen.extractUrl=e.regexSupplant("((#{validUrlPrecedingChars})((https?:\\/\\/)?(#{validDomain})(?::(#{validPortNumber}))?(\\/#{validUrlPath}*)?(\\?#{validUrlQueryChars}*#{validUrlQueryEndingChars})?))","gi")},regexSupplant:function(e,t){var a=this;return t=t||"","string"!=typeof e&&(e.global&&t.indexOf("g")<0&&(t+="g"),e.ignoreCase&&t.indexOf("i")<0&&(t+="i"),e.multiline&&t.indexOf("m")<0&&(t+="m"),e=e.source),new RegExp(e.replace(/#\{(\w+)\}/g,function(e,t){var n=a.regexen[t]||"";return"string"!=typeof n&&(n=n.source),n}),t)},stringSupplant:function(e,t){return e.replace(/#\{(\w+)\}/g,function(e,a){return t[a]||""})},getTweetLength:function(e,t){var a=this;t||(t={short_url_length:22,short_url_length_https:23});var n=a.getUnicodeTextLength(e),r=a.extractUrlsWithIndices(e);a.modifyIndicesFromUTF16ToUnicode(e,r);for(var i=0;i<r.length;i++)n+=r[i].indices[0]-r[i].indices[1],n+=r[i].url.toLowerCase().match(a.regexen.urlHasHttps)?t.short_url_length_https:t.short_url_length;return n},getUnicodeTextLength:function(e){var t=this;return e.replace(t.regexen.non_bmp_code_pairs," ").length},modifyIndicesFromUTF16ToUnicode:function(e,t){this.convertUnicodeIndices(e,t,!0)},convertUnicodeIndices:function(e,t,a){if(0!=t.length){var n=0,r=0;t.sort(function(e,t){return e.indices[0]-t.indices[0]});for(var i=0,s=t[0];n<e.length;){if(s.indices[0]==(a?n:r)){var o=s.indices[1]-s.indices[0];if(s.indices[0]=a?r:n,s.indices[1]=s.indices[0]+o,i++,i==t.length)break;s=t[i]}var l=e.charCodeAt(n);l>=55296&&56319>=l&&n<e.length-1&&(l=e.charCodeAt(n+1),l>=56320&&57343>=l&&n++),r++,n++}}},extractUrlsWithIndices:function(e,t){var a=this;if(t||(t={extractUrlsWithoutProtocol:!0}),!e||(t.extractUrlsWithoutProtocol?!e.match(/\./):!e.match(/:/)))return[];for(var n=[];a.regexen.extractUrl.exec(e);){var r=RegExp.$2,i=RegExp.$3,s=RegExp.$4,o=RegExp.$5,l=RegExp.$7,h=a.regexen.extractUrl.lastIndex,c=h-i.length;if(s)i.match(a.regexen.validTcoUrl)&&(i=RegExp.lastMatch,h=c+i.length),n.push({url:i,indices:[c,h]});else{if(!t.extractUrlsWithoutProtocol||r.match(a.regexen.invalidUrlWithoutProtocolPrecedingChars))continue;var d=null,u=!1,C=0;if(o.replace(a.regexen.validAsciiDomain,function(e){var t=o.indexOf(e,C);C=t+e.length,d={url:e,indices:[c+t,c+C]},u=e.match(a.regexen.invalidShortDomain),u||n.push(d)}),null==d)continue;l&&(u&&n.push(d),d.url=i.replace(o,d.url),d.indices[1]=h)}}return n},setContent:function(e){var t=this;t.textarea.value=e,$(t.textarea).trigger("keyup")}},"function"!=typeof Object.create&&(Object.create=function(e){function t(){}return t.prototype=e,new t}),$.fn.tweetthis=function(e){return this.each(function(){var t=Object.create(TweetThis);t.init(e,this);var a=$(this),n=a.data("tweetthis");n||a.data("tweetthis",t)})};
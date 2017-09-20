var template = {};
var emotes = {};
var twitchApiLoaded = false;
var d;
var $;
(function () {
    var script = document.createElement("SCRIPT");
    script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js';
    script.type = 'text/javascript';
    script.onload = function () {
        $ = window.jQuery;
        d = document.getElementById('live-chat-iframe') == null ? d = document : d = document.getElementById('live-chat-iframe').contentWindow.document;
        $(d).ready(function () {
            loadTwitchApi();
            loadIFrame();
        });
    };
    document.getElementsByTagName("head")[0].appendChild(script);
})();

function loadIFrame() {
    if (twitchApiLoaded && $(d).find('#chat-messages').length > 0) {
        userPhotoUrl = $('#avatar').attr('src');
        let searchParams = new URLSearchParams(window.location.search);
        var observer = new MutationObserver(function (mutations) {
            mutations.forEach(function (mutation) {
                for (var i = 0; i < mutation.addedNodes.length; i++) {
                    if ($(mutation.addedNodes[i]).prop('tagName') == 'YT-LIVE-CHAT-TEXT-MESSAGE-RENDERER') {

                        addEmotes($(mutation.addedNodes[i]).find('#message'), true);
                    }
                }

            })
        });
        observer.observe(d.querySelector('#item-offset'), { childList: true, subtree: true });

        $(d).find('span#message').each(function (i, v) { addEmotes($(v), false); });
        d.styleSheets[0].insertRule('img[alt="🌝"] { background:url("https://static-cdn.jtvnw.net/emoticons/v1/25/1.0") no-repeat; width:0px; height:0px; padding-right:22px; padding-bottom:28px; background-size: 22px 28px; box-sizing:border-box;}', 0);
        d.styleSheets[0].insertRule('.twitch-emote { width: auto !important; height: auto !important;}', 0);
        //var style = d.createElement('style');
        //style.innerHTML = 'img[alt="🌝"] { background:url("https://static-cdn.jtvnw.net/emoticons/v1/25/1.0") no-repeat; width:0px; height:0px; padding-right:22px; padding-bottom:28px; background-size: 22px 28px;}@import url("https://fonts.googleapis.com/css?family=Changa One"); @import url("https://fonts.googleapis.com/css?family=Imprima");  /* Background colors*/ body {   background-color: rgba(0,255,0,0); }     /* Transparent background. */ yt-live-chat-renderer {  background-color: rgba(0,255,0,0); }  /* Outlines */ yt-live-chat-renderer * {   text-shadow: -2px -2px #000000,-2px -1px #000000,-2px 0px #000000,-2px 1px #000000,-2px 2px #000000,-1px -2px #000000,-1px -1px #000000,-1px 0px #000000,-1px 1px #000000,-1px 2px #000000,0px -2px #000000,0px -1px #000000,0px 0px #000000,0px 1px #000000,0px 2px #000000,1px -2px #000000,1px -1px #000000,1px 0px #000000,1px 1px #000000,1px 2px #000000,2px -2px #000000,2px -1px #000000,2px 0px #000000,2px 1px #000000,2px 2px #000000;   font-family: "Imprima";   font-size: 18px !important;   line-height: 18px !important; }  yt-live-chat-text-message-renderer #content, yt-live-chat-legacy-paid-message-renderer #content {   overflow: initial; !important }  /* Hide scrollbar. */ yt-live-chat-item-list-renderer #items{   overflow: hidden !important; }  yt-live-chat-item-list-renderer #item-scroller{   overflow: hidden !important; }  /* Hide header and input. */ yt-live-chat-header-renderer, yt-live-chat-message-input-renderer {   display: none !important; }  /* Reduce side padding. */ yt-live-chat-text-message-renderer, yt-live-chat-legacy-paid-message-renderer {     padding-left: 4px !important;   padding-right: 4px !important; }  yt-live-chat-paid-message-renderer #header {     padding-left: 4px !important;   padding-right: 4px !important; }  /* Avatars. */ yt-live-chat-text-message-renderer #author-photo, yt-live-chat-paid-message-renderer #author-photo, yt-live-chat-legacy-paid-message-renderer #author-photo {      width: 24px !important;   height: 24px !important;   border-radius: 24px !important;   margin-right: 6px !important; }  /* Hide badges. */ yt-live-chat-text-message-renderer #author-badges {   display: none !important;   vertical-align: text-top !important; }  /* Timestamps. */ yt-live-chat-text-message-renderer #timestamp {      color: #999999 !important;   font-family: "Imprima";   font-size: 16px !important;   line-height: 16px !important; }  /* Badges. */ yt-live-chat-text-message-renderer #author-name[type="owner"], yt-live-chat-text-message-renderer yt-live-chat-author-badge-renderer[type="owner"] {   color: #ffd600 !important; }  yt-live-chat-text-message-renderer #author-name[type="moderator"], yt-live-chat-text-message-renderer yt-live-chat-author-badge-renderer[type="moderator"] {   color: #5e84f1 !important; }  yt-live-chat-text-message-renderer #author-name[type="member"], yt-live-chat-text-message-renderer yt-live-chat-author-badge-renderer[type="member"] {   color: #0f9d58 !important; }  /* Channel names. */ yt-live-chat-text-message-renderer #author-name {   color: #cccccc !important;   font-family: "Changa One";   font-size: 20px !important;   line-height: 20px !important; }  yt-live-chat-text-message-renderer #author-name::after {   content: ":";   margin-left: 2px; }  /* Messages. */ yt-live-chat-text-message-renderer #message, yt-live-chat-text-message-renderer #message * {   color: #ffffff !important;   font-family: "Imprima";   font-size: 18px !important;   line-height: 18px !important; }   /* SuperChat/Fan Funding Messages. */ yt-live-chat-paid-message-renderer #author-name, yt-live-chat-paid-message-renderer #author-name *, yt-live-chat-legacy-paid-message-renderer #event-text, yt-live-chat-legacy-paid-message-renderer #event-text * {   color: #ffffff !important;   font-family: "Changa One";   font-size: 20px !important;   line-height: 20px !important; }  yt-live-chat-paid-message-renderer #purchase-amount, yt-live-chat-paid-message-renderer #purchase-amount *, yt-live-chat-legacy-paid-message-renderer #detail-text, yt-live-chat-legacy-paid-message-renderer #detail-text * {   color: #ffffff !important;   font-family: "Imprima";   font-size: 18px !important;   line-height: 18px !important; }  yt-live-chat-paid-message-renderer #content, yt-live-chat-paid-message-renderer #content * {   color: #ffffff !important;   font-family: "Imprima";   font-size: 18px !important;   line-height: 18px !important; }  yt-live-chat-paid-message-renderer {   margin: 4px 0 !important; }  yt-live-chat-legacy-paid-message-renderer {   background-color: #0f9d58 !important;   margin: 4px 0 !important; }  yt-live-chat-text-message-renderer a, yt-live-chat-legacy-paid-message-renderer a {   text-decoration: none !important; }  yt-live-chat-text-message-renderer[is-deleted], yt-live-chat-legacy-paid-message-renderer[is-deleted] {   display: none !important; }  yt-live-chat-ticker-renderer {   background-color: transparent !important;   box-shadow: none !important; } yt-live-chat-ticker-renderer {   display: none !important; }   yt-live-chat-ticker-paid-message-item-renderer, yt-live-chat-ticker-paid-message-item-renderer *, yt-live-chat-ticker-sponsor-item-renderer, yt-live-chat-ticker-sponsor-item-renderer * {   color: #ffffff !important;   font-family: "Imprima"; }  ';

        //d.head.appendChild(style);
    }
    else {
        if ($(d).find('#chat-messages').length <= 0) {
            d = document.getElementById('live-chat-iframe').contentWindow.document;
        }
        (setTimeout(loadIFrame, 100));
    }
}

function tryAddEmotes(nodes) {
    addEmotes($(nodes).find('#message'));
    console.log($(nodes).find('div#menu'));
    if ($(nodes).find('div#menu:visible').length < 1) {
        setTimeout(function () { tryAddEmotes(nodes) }, 100);
    }
}

function loadTwitchApi() {
    $.get('https://twitchemotes.com/api_cache/v3/global.json', function (data) {
        template = {
            "small": "https://static-cdn.jtvnw.net/emoticons/v1/{image_id}/1.0",
            "medium": "https://static-cdn.jtvnw.net/emoticons/v1/{image_id}/2.0",
            "large": "https://static-cdn.jtvnw.net/emoticons/v1/{image_id}/3.0"
        }
        emotes = data;
        twitchApiLoaded = true;
    });
}

function addEmotes(spanObj, needsObserving) {
    var innerHtml = ' ' + spanObj.html().replace('﻿', '').replace('​', '') + ' ';

    var wordsArray = $(innerHtml.split(" "));
    wordsArray.each(function (i, word) {
        if (emotes[word] !== undefined) {
            var imgHtml = '<img class="twitch-emote style-scope yt-live-chat-text-message-renderer" src="' + template['small'].replace('{image_id}', emotes[word].id) + '" />';

            innerHtml = innerHtml.replace(' ' + word + ' ', ' ' + imgHtml + ' ');
        }
    });
    innerHtml = innerHtml.substring(1, innerHtml.length - 1);
    spanObj.html(innerHtml);
    innerHtml = spanObj.html();
    if (needsObserving) {
        var observer = new MutationObserver(function (mutations) {
            mutations.forEach(function (mutation) {
                var changedHtml = '';
                for (var i = 0; i < mutation.addedNodes.length; i++) {
                    changedHtml += $(mutation.addedNodes[i]).prop('outerHTML');
                }
                if (spanObj.html() != innerHtml) {
                    spanObj.html(innerHtml);
                }

            })
        });
        observer.observe($(spanObj).get(0), { childList: true });

        setTimeout(function () { observer.disconnect(); }, 5000)
    }
}
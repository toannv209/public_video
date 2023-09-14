<script
      async
      src="https://securepubads.g.doubleclick.net/tag/js/gpt.js"
    ></script>
    <script>
      window.googletag = window.googletag || { cmd: [] };
      googletag.cmd.push(function () {
        googletag
          .defineSlot(
            "/93656639,22942653061/Tinmoi.vn_Oustream/Tinmoi.vn_Passback_Oustream",
            [300, 250],
            "div-gpt-ad-1693194589701-0"
          )
          .addService(googletag.pubads());
        googletag.pubads().enableSingleRequest();
        googletag.enableServices();
      });
    </script>
    <script></script>
    <script
      type="text/javascript"
      src="//imasdk.googleapis.com/js/sdkloader/ima3.js"
    ></script>
    <!-- <script type="text/javascript" src="application.js"></script>
    <script type="text/javascript" src="ads.js"></script>
    <script type="text/javascript" src="video_player.js"></script> -->
    <script type="text/javascript">
      // Copyright 2013 Google Inc. All Rights Reserved.
      // You may study, modify, and use this example for any purpose.
      // Note that this example is provided "as is", WITHOUT WARRANTY
      // of any kind either expressed or implied.

      /**
       * Shows how to use the IMA SDK to request and display ads.
       */
      var count = 1;
      var Ads = function (application, videoPlayer, isMuted) {
        this.application_ = application;
        this.videoPlayer_ = videoPlayer;
        this.isMuted = isMuted;
        this.contentCompleteCalled_ = false;
        google.ima.settings.setVpaidMode(
          google.ima.ImaSdkSettings.VpaidMode.ENABLED
        );
        // Call setLocale() to localize language text and downloaded swfs
        // google.ima.settings.setLocale('fr');
        this.adDisplayContainer_ = new google.ima.AdDisplayContainer(
          this.videoPlayer_.adContainer,
          this.videoPlayer_.contentPlayer
        );
        this.adsLoader_ = new google.ima.AdsLoader(this.adDisplayContainer_);
        this.adsManager_ = null;

        this.adsLoader_.addEventListener(
          google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED,
          this.onAdsManagerLoaded_,
          false,
          this
        );
        this.adsLoader_.addEventListener(
          google.ima.AdErrorEvent.Type.AD_ERROR,
          this.onAdError_,
          false,
          this
        );
      };

      Ads.prototype.initialUserAction = function () {
        this.adDisplayContainer_.initialize();
        this.videoPlayer_.contentPlayer.load();
      };

      Ads.prototype.requestAds = function (adTagUrl) {
        var adsRequest = new google.ima.AdsRequest();
        adsRequest.adTagUrl = adTagUrl;
        adsRequest.linearAdSlotWidth = this.videoPlayer_.width;
        adsRequest.linearAdSlotHeight = this.videoPlayer_.height;
        adsRequest.nonLinearAdSlotWidth = this.videoPlayer_.width;
        adsRequest.nonLinearAdSlotHeight = this.videoPlayer_.height;
        this.adsLoader_.requestAds(adsRequest);
      };

      // muted
      Ads.prototype.mute = function () {
        this.adsManager_.setVolume(1);
      };

      Ads.prototype.unmute = function () {
        this.adsManager_.setVolume(0);
      };

      Ads.prototype.pause = function () {
        if (this.adsManager_) {
          this.adsManager_.pause();
        }
      };

      Ads.prototype.resume = function () {
        if (this.adsManager_) {
          this.adsManager_.resume();
        }
      };

      Ads.prototype.resize = function (width, height) {
        if (this.adsManager_) {
          this.adsManager_.resize(
            width,
            height,
            google.ima.ViewMode.FULLSCREEN
          );
        }
      };

      Ads.prototype.contentEnded = function () {
        this.contentCompleteCalled_ = true;
        this.adsLoader_.contentComplete();
      };

      Ads.prototype.onAdsManagerLoaded_ = function (adsManagerLoadedEvent) {
        this.application_.log("Ads loaded.");
        var adsRenderingSettings = new google.ima.AdsRenderingSettings();
        adsRenderingSettings.restoreCustomPlaybackStateOnAdBreakComplete = true;
        this.adsManager_ = adsManagerLoadedEvent.getAdsManager(
          this.videoPlayer_.contentPlayer,
          adsRenderingSettings
        );
        this.startAdsManager_(this.adsManager_);
      };

      Ads.prototype.startAdsManager_ = function (adsManager) {
        if (adsManager.isCustomClickTrackingUsed()) {
          // this.customClickDiv_.style.display = "table";
        }
        if (this.isMuted) {
          this.adsManager_.setVolume(1);
        } else {
          this.adsManager_.setVolume(0);
        }

        // Attach the pause/resume events.
        adsManager.addEventListener(
          google.ima.AdEvent.Type.CONTENT_PAUSE_REQUESTED,
          this.onContentPauseRequested_,
          false,
          this
        );
        adsManager.addEventListener(
          google.ima.AdEvent.Type.CONTENT_RESUME_REQUESTED,
          this.onContentResumeRequested_,
          false,
          this
        );
        adsManager.addEventListener(
          google.ima.AdEvent.Type.COMPLETE,
          this.onAdComplete_,
          false,
          this
        );

        adsManager.addEventListener(
          google.ima.AdEvent.Type.LOADED,
          this.onAdLoaded_,
          false,
          this
        );
        adsManager.addEventListener(
          google.ima.AdEvent.Type.STARTED,
          this.onAdStarted_,
          false,
          this
        );

        // Handle errors.
        adsManager.addEventListener(
          google.ima.AdErrorEvent.Type.AD_ERROR,
          this.onAdError_,
          false,
          this
        );
        var events = [
          google.ima.AdEvent.Type.ALL_ADS_COMPLETED,
          google.ima.AdEvent.Type.CLICK,
          google.ima.AdEvent.Type.COMPLETE,
          google.ima.AdEvent.Type.FIRST_QUARTILE,
          google.ima.AdEvent.Type.LOADED,
          google.ima.AdEvent.Type.MIDPOINT,
          google.ima.AdEvent.Type.PAUSED,
          google.ima.AdEvent.Type.STARTED,
          google.ima.AdEvent.Type.THIRD_QUARTILE,
        ];
        for (var index in events) {
          adsManager.addEventListener(
            events[index],
            this.onAdEvent_,
            false,
            this
          );
        }

        var initWidth, initHeight;
        if (this.application_.fullscreen) {
          initWidth = this.application_.fullscreenWidth;
          initHeight = this.application_.fullscreenHeight;
        } else {
          initWidth = this.videoPlayer_.width;
          initHeight = this.videoPlayer_.height;
        }
        adsManager.init(initWidth, initHeight, google.ima.ViewMode.NORMAL);

        adsManager.start();
      };

      Ads.prototype.onAdComplete_ = function () {
        this.application_.close();
      };
      Ads.prototype.onAdLoaded_ = function () {};
      Ads.prototype.onAdStarted_ = function () {
        var timer = this.adsManager_.getRemainingTime();
        this.application_.countdownUi(timer);
        this.application_.autoplayAds_();
      };
      Ads.prototype.onContentPauseRequested_ = function () {
        this.application_.pauseForAd();
        this.application_.setVideoEndedCallbackEnabled(false);
      };

      Ads.prototype.onContentResumeRequested_ = function () {
        this.application_.setVideoEndedCallbackEnabled(true);
        // Without this check the video starts over from the beginning on a
        // post-roll's CONTENT_RESUME_REQUESTED
        if (!this.contentCompleteCalled_) {
          this.application_.resumeAfterAd();
        }
      };

      Ads.prototype.onAdEvent_ = function (adEvent) {
        this.application_.log("Ad event: " + adEvent.type);
        // this.application_.countdownUi(this.adsManager_.getRemainingTime());
        if (adEvent.type == google.ima.AdEvent.Type.CLICK) {
          this.application_.adClicked();
        } else if (adEvent.type == google.ima.AdEvent.Type.LOADED) {
          var ad = adEvent.getAd();
          if (!ad.isLinear()) {
            this.onContentResumeRequested_();
          }
        } else if (adEvent.type == google.ima.AdEvent.Type.MIDPOINT) {
        }
      };

      Ads.prototype.onAdError_ = function (adErrorEvent) {
        this.application_.log(
          "Ad error: " + adErrorEvent.getError().toString()
        );
        if (count <= 3) {
          setTimeout(() => {
            this.application_.loadAds_();
          }, 3000);
          count++;
        } else {
          var bannerAfter = document.getElementById("bannerAfter");
          var closeBanner = document.getElementById("closeBanner");
          var idAdUnit = document.createElement("div");
          idAdUnit.id = "div-gpt-ad-1693194589701-0";
          bannerAfter.appendChild(idAdUnit);
          var isClose = false;
          googletag.cmd.push(function () {
            googletag.display("div-gpt-ad-1693194589701-0");
            googletag.pubads().addEventListener("slotOnload", (event) => {
              closeBanner.style.display = "block";
            });
          });

          closeBanner.addEventListener("click", function () {
            if (isClose) {
              closeBanner.title = "Hidden";
              closeBanner.innerHTML = "&#711;";
              bannerAfter.classList.remove("bannerAfterClose--transition");
              closeBanner.classList.remove("closeBanner--transition");
            } else {
              closeBanner.title = "Show";
              closeBanner.innerHTML = "&#710;";
              bannerAfter.classList.add("bannerAfterClose--transition");
              closeBanner.classList.add("closeBanner--transition");
            }
            isClose = !isClose;
          });
        }
        if (this.adsManager_) {
          this.adsManager_.destroy();
        }
        this.application_.resumeAfterAd();
      };
    </script>
    <script>
      // Copyright 2013 Google Inc. All Rights Reserved.
      // You may study, modify, and use this example for any purpose.
      // Note that this example is provided "as is", WITHOUT WARRANTY
      // of any kind either expressed or implied.

      /**
       * Handles video player functionality.
       */
      var VideoPlayer = function () {
        this.contentPlayer = document.getElementById("content");
        this.adContainer = document.getElementById("adcontainer");
        this.videoPlayerContainer_ = document.getElementById("videoplayer");

        this.width = 300;
        this.height = 250;
      };

      VideoPlayer.prototype.preloadContent = function (contentLoadedAction) {
        // If this is the initial user action on iOS or Android device,
        // simulate playback to enable the video element for later program-triggered
        // playback.
        if (this.isMobilePlatform()) {
          this.preloadListener_ = contentLoadedAction;
          this.contentPlayer.addEventListener(
            "loadedmetadata",
            contentLoadedAction,
            false
          );
          this.contentPlayer.load();
        } else {
          contentLoadedAction();
        }
      };

      VideoPlayer.prototype.removePreloadListener = function () {
        if (this.preloadListener_) {
          this.contentPlayer.removeEventListener(
            "loadedmetadata",
            this.preloadListener_,
            false
          );
          this.preloadListener_ = null;
        }
      };

      VideoPlayer.prototype.play = function () {
        this.contentPlayer.play();
      };

      VideoPlayer.prototype.pause = function () {
        this.contentPlayer.pause();
      };

      VideoPlayer.prototype.isMobilePlatform = function () {
        return (
          this.contentPlayer.paused &&
          (navigator.userAgent.match(/(iPod|iPhone|iPad)/) ||
            navigator.userAgent.toLowerCase().indexOf("android") > -1)
        );
      };

      VideoPlayer.prototype.resize = function (
        position,
        top,
        left,
        width,
        height
      ) {
        this.videoPlayerContainer_.style.position = position;
        this.videoPlayerContainer_.style.top = top + "px";
        this.videoPlayerContainer_.style.left = left + "px";
        this.videoPlayerContainer_.style.width = width + "px";
        this.videoPlayerContainer_.style.height = height + "px";
        this.contentPlayer.style.width = width + "px";
        this.contentPlayer.style.height = height + "px";
      };

      VideoPlayer.prototype.registerVideoEndedCallback = function (callback) {
        this.contentPlayer.addEventListener("ended", callback, false);
      };

      VideoPlayer.prototype.removeVideoEndedCallback = function (callback) {
        this.contentPlayer.removeEventListener("ended", callback, false);
      };
    </script>
    <script>
      var time = null;
      var progessValue = 0;

      const Application = function () {
        this.mainSticky = document.getElementById("mainSticky");
        this.mute_ = document.getElementById("mute");
        this.mute_.addEventListener(
          "click",
          this.bind_(this, this.onMute_),
          false
        );
        this.fullscreenButton_ = document.getElementById("fullscreen");
        this.fullscreenButton_.addEventListener(
          "click",
          this.bind_(this, this.onFullscreenClick_),
          false
        );

        //resize
        this.resizeads_ = document.getElementById("resizeads");
        this.resizeads_.addEventListener(
          "click",
          this.bind_(this, this.resizeads),
          false
        );
        this.isResizeads_ = false;

        //progess
        countdownUi = document.getElementById("countdownUi");
        progressAds = document.getElementById("progressAds");
        //full screen
        this.fullscreenWidth = null;
        this.fullscreenHeight = null;
        const fullScreenEvents = [
          "fullscreenchange",
          "mozfullscreenchange",
          "webkitfullscreenchange",
        ];
        for (let key in fullScreenEvents) {
          document.addEventListener(
            fullScreenEvents[key],
            this.bind_(this, this.onFullscreenChange_),
            false
          );
        }
        this.playing_ = false;
        this.adsActive_ = false;
        this.adsDone_ = false;
        this.fullscreen = false;
        this.adsMute_ = false;
        this.videoPlayer_ = new VideoPlayer();
        this.ads_ = new Ads(this, this.videoPlayer_, this.adsMute_);
        this.adTagUrl_ = "";
        this.videoEndedCallback_ = this.bind_(this, this.onContentEnded_);
        this.setVideoEndedCallbackEnabled(true);
        setTimeout(this.bind_(this, this.onClick_), 3000);
        document.addEventListener("visibilitychange", () => {
          if (document.visibilityState === "visible") {
            this.ads_.resume();
            countdownTimer();
          } else {
            this.ads_.pause();
            clearInterval(time);
          }
        });
      };

      Application.prototype.SAMPLE_AD_TAG_ =
      "https://pubads.g.doubleclick.net/gampad/ads?iu=/93656639,22942653061/Tinmoi.vn_Oustream/Tinmoi.vn_Vast_Test&description_url=https%3A%2F%2Ftinmoi.vn%2F&tfcd=0&npa=0&sz=400x300%7C640x360%7C640x480&gdfp_req=1&output=vast&unviewed_position_start=1&env=vp&impl=s&correlator=";
      Application.prototype.setVideoEndedCallbackEnabled = function (enable) {
        if (enable) {
          this.videoPlayer_.registerVideoEndedCallback(
            this.videoEndedCallback_
          );
        } else {
          this.videoPlayer_.removeVideoEndedCallback(this.videoEndedCallback_);
        }
      };

      Application.prototype.log = function (message) {
        console.log(message);
      };

      Application.prototype.countdownUi = function (timer) {
        progressAds.max = timer;
        progessValue = timer;
        countdownTimer();
      };

      function countdownTimer() {
        time = setInterval(function () {
          progressAds.value = progessValue;
          var minutes = Math.floor((progessValue % (60 * 60)) / 60);
          var seconds = Math.floor(progessValue % 60);
          if (progessValue > 0) {
            progessValue--;
          } else {
            countdownUi.style.display = "none";
          }
          countdownUi.innerHTML =
            (minutes > 11 ? minutes : "0" + minutes) +
            ":" +
            (seconds >= 10 ? seconds : "0" + seconds);
        }, 1000);
      }

      /**
       * Handles resuming content following ads.
       */
      Application.prototype.resumeAfterAd = function () {
        // this.videoPlayer_.play();
        this.adsActive_ = false;
      };
      Application.prototype.close = function () {
        if (this.fullscreen) {
          document.exitFullscreen();
        }
        this.fullscreenButton_.style.display = "none";
        this.mute_.style.display = "none";
        if (this.isResizeads_) {
          this.mainSticky.classList.remove("mainSticky--scale");
        }
        this.mainSticky.classList.add("mainSticky--transition");
        var bannerAfter = document.getElementById("bannerAfter");
        var closeBanner = document.getElementById("closeBanner");
        var idAdUnit = document.createElement("div");
        idAdUnit.id = "div-gpt-ad-1693194589701-0";
        bannerAfter.appendChild(idAdUnit);
        var isClose = false;
        googletag.cmd.push(function () {
          googletag.display("div-gpt-ad-1693194589701-0");
          googletag.pubads().addEventListener("slotOnload", (event) => {
            closeBanner.style.display = "block";
          });
        });
        closeBanner.addEventListener("click", function () {
          if (isClose) {
            closeBanner.title = "Hidden";
            closeBanner.innerHTML = "&#711;";
            bannerAfter.classList.remove("bannerAfterClose--transition");
            closeBanner.classList.remove("closeBanner--transition");
          } else {
            closeBanner.title = "Show";
            closeBanner.innerHTML = "&#710;";
            bannerAfter.classList.add("bannerAfterClose--transition");
            closeBanner.classList.add("closeBanner--transition");
          }
          isClose = !isClose;
        });
      };
      Application.prototype.remove_ = function () {};
      Application.prototype.autoplayAds_ = function () {
        mainSticky.style.display = "block";
      };

      /**
       * Handles pausing content for ad breaks.
       */
      Application.prototype.pauseForAd = function () {
        this.adsActive_ = true;
        this.playing_ = true;
        this.videoPlayer_.pause();
      };

      /**
       * Pauses video on ad clicks.
       */
      Application.prototype.adClicked = function () {};

      /**
       * Function binding helper function.
       * @param {!Object} thisObj object to bind function.
       * @param {!Function} fn function being bound to object.
       * @return {!Function} returns the bound function.
       */
      Application.prototype.bind_ = function (thisObj, fn) {
        return function () {
          fn.apply(thisObj, arguments);
        };
      };
      Application.prototype.onClick_ = function () {
        if (!this.adsDone_) {
          this.adTagUrl_ = this.SAMPLE_AD_TAG_;
          this.ads_.initialUserAction();
          this.videoPlayer_.preloadContent(this.bind_(this, this.loadAds_));
          this.adsDone_ = true;
          return;
        }

        if (this.adsActive_) {
          if (this.playing_) {
            this.ads_.pause();
            clearInterval(time);
          } else {
            this.ads_.resume();
            countdownTimer();
          }
        }
        this.playing_ = !this.playing_;
      };
      Application.prototype.resizeads = function () {
        if (this.isResizeads_) {
          this.mainSticky.classList.remove("mainSticky--scale");
          this.resizeads_.innerHTML = "&#x21d9;";
          this.fullscreenButton_.style.display = "block";
        } else {
          this.mainSticky.classList.add("mainSticky--scale");
          this.resizeads_.innerHTML = "&#x21d7;";
          this.fullscreenButton_.style.display = "none";
        }
        this.isResizeads_ = !this.isResizeads_;
      };

      Application.prototype.onMute_ = function () {
        if (this.adsActive_) {
          if (this.adsMute_) {
            this.ads_.unmute();
          } else {
            this.ads_.mute();
          }
        }
        this.adsMute_ = !this.adsMute_;

        this.updateMuted_();
      };

      Application.prototype.updateMuted_ = function () {
        if (this.adsMute_) {
          this.mute_.textContent = "🔈";
        } else {
          this.mute_.textContent = "🔇";
        }
      };

      Application.prototype.onFullscreenClick_ = function () {
        if (this.fullscreen) {
          this.resizeads_.style.display = "block";
          // The video is currently in fullscreen mode
          const cancelFullscreen =
            document.exitFullscreen ||
            document.exitFullScreen ||
            document.webkitCancelFullScreen ||
            document.mozCancelFullScreen;
          if (cancelFullscreen) {
            cancelFullscreen.call(document);
          } else {
            this.onFullscreenChange_();
          }
        } else {
          this.resizeads_.style.display = "none";
          const requestFullscreen =
            document.documentElement.requestFullscreen ||
            document.documentElement.webkitRequestFullscreen ||
            document.documentElement.mozRequestFullscreen ||
            document.documentElement.requestFullScreen ||
            document.documentElement.webkitRequestFullScreen ||
            document.documentElement.mozRequestFullScreen;
          if (requestFullscreen) {
            this.fullscreenWidth = window.screen.width;
            this.fullscreenHeight = window.screen.height;
            requestFullscreen.call(document.documentElement);
          } else {
            this.fullscreenWidth = window.innerWidth;
            this.fullscreenHeight = window.innerHeight;
            this.onFullscreenChange_();
          }
        }
        requestFullscreen.call(document.documentElement);
      };

      /**
       * Handles updating the play button image.
       */

      /**
       * Removes the 'loadedmetadata' listener and makes the ad request.
       */
      Application.prototype.loadAds_ = function () {
        this.videoPlayer_.removePreloadListener();
        this.ads_.requestAds(this.adTagUrl_);
      };

      /**
       * Handles resizing ads and content during fullscreen button clicks.
       */
      Application.prototype.onFullscreenChange_ = function () {
        if (this.fullscreen) {
          // The user just exited fullscreen
          // Resize the ad container
          this.ads_.resize(this.videoPlayer_.width, this.videoPlayer_.height);
          // Return the video to its original size and position
          this.videoPlayer_.resize(
            "relative",
            "",
            "",
            this.videoPlayer_.width,
            this.videoPlayer_.height
          );
          this.fullscreen = false;
        } else {
          // The fullscreen button was just clicked
          // Resize the ad container
          const width = this.fullscreenWidth;
          const height = this.fullscreenHeight;
          this.makeAdsFullscreen_();
          // Make the video take up the entire screen
          this.videoPlayer_.resize("relative", 0, 0, width, height);
          this.fullscreen = true;
        }
      };

      /**
       * Resizes ads for fullscreen.
       */
      Application.prototype.makeAdsFullscreen_ = function () {
        this.ads_.resize(this.fullscreenWidth, this.fullscreenHeight);
      };

      /**
       * Makes call to update UI on content ending.
       */
      Application.prototype.onContentEnded_ = function () {
        this.ads_.contentEnded();
      };
    </script>
    <title>OutStream Video Ads</title>
    <style>
      body {
        font-family: arial, verdana, sans-serif;
      }

      #container {
        width: 728px;
      }

      #videoplayer {
        position: relative;
        background-color: #000;
        /* border-radius: 5px; */
        box-shadow: 0px 0px 20px rgba(50, 50, 50, 0.5);
        width: 300px;
        height: 250px;
      }

      #content-wrapper {
        position: relative;
      }
      #mainSticky {
        position: fixed;
        bottom: 0;
        left: 0;
        display: none;
        opacity: 1;
        transition: transform 0.5s, opacity 0.5s, scale 0.3s;
        transform-origin: bottom left;
        z-index: 10000;
      }
      .mainSticky--transition {
        transform: translateY(100%);
        opacity: 0;
        display: none;
      }
      .mainSticky--scale {
        transform: scale(0.5);
      }
      #fullscreen {
        position: absolute;
        bottom: 15px;
        right: 25px;
        height: 20px;
        width: 40px;
        border-style: none;
        font-weight: bold;
        font-size: 15px;
        opacity: 0.5;
        background-color: #fff;
        border-radius: 5px;
        border: 1px transparent solid;
        color: #000;
        /* cursor: pointer; */
        border-color: #000;
        line-height: 0;
      }

      #fullscreen:hover {
        border: 1px #f00 solid;
        color: #f00;
      }

      #content {
        overflow: hidden;
      }

      #content,
      #adcontainer {
        position: absolute;
        width: 640px;
        height: 360px;
      }
      #mute {
        position: absolute;
        left: 15px;
        bottom: 15px;
        height: 20px;
        width: 40px;
        border-style: none;
        font-weight: bold;
        font-size: 15px;
        opacity: 0.5;
        background-color: #fff;
        border-radius: 5px;
        border: 1px transparent solid;
        color: #000;
        cursor: pointer;
        border-color: #000;
        line-height: 0;
      }

      #mute:hover {
        border: 1px #f00 solid;
        color: #f00;
      }
      #resizeads {
        position: absolute;
        right: 0px;
        top: 0px;
        height: 30px;
        width: 30px;
        border-style: none;
        font-weight: bold;
        font-size: 18px;
        background-color: #ffffff9f;
        border-radius: 5px;
        border: 1px transparent solid;
        color: #000;
        cursor: pointer;
        border-color: #00000054;
        line-height: 0;
      }

      #resizeads:hover {
        border: 1px rgba(255, 0, 0, 0.5) solid;
        color: #f00;
      }
      #countdownUi {
        position: absolute;
        right: 0px;
        bottom: -10px;
        height: 20px;
        width: 40px;
        font-weight: normal;
        font-size: 11px;
        opacity: 0.5;
        color: #ffffff;
        text-align: center;
        cursor: pointer;
        line-height: 0;
      }

      #progressAds {
        position: absolute;
        background-color: rgb(80, 97, 5);
        height: 3px;
        width: 100%;
        bottom: 0;
      }
      progress::-moz-progress-bar {
        background: rgb(209, 126, 1);
      }
      progress::-webkit-progress-value {
        background: rgb(209, 126, 1);
      }

      #bannerAfter {
        position: fixed;
        left: 0;
        bottom: 0px;
        height: 250px;
        width: 300px;
        transition: transform 0.7s;
        z-index: 9999;
      }

      #closeBanner {
        position: absolute;
        left: 0px;
        top: -20px;
        height: 20px;
        display: none;
        width: 40px;
        border-style: none;
    	font-size: 45px;
    	line-height: 45px;
        background-color: #fff;
        border-radius: 0 5px 0 0;
        cursor: pointer;
        border-top: 2px solid #e1e1e1;
        border-left: 2px solid #e1e1e1;
        border-right: 2px solid #e1e1e1;
        transition: transform 0.7s;
      }
      .bannerAfterClose--transition {
        transform: translateY(100%);
      }
      .closeBanner--transition {
        transform: translateY(0%);
      }
    </style>
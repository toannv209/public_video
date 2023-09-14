<div id="mainSticky">
      <div id="videoplayer">
        <video id="content"></video>
        <div id="adcontainer"></div>
        <button id="fullscreen" title="Full screen">
          [&nbsp;&nbsp;&nbsp;]
        </button>
        <button id="mute" title="Mute">🔇</button>
        <button id="resizeads" title="Resize">&#x21d9;</button>
        <div id="countdownUi"></div>
        <progress id="progressAds"></progress>
      </div>
    </div>
    <div id="bannerAfter">
      <button id="closeBanner" title="Hidden">&#711;</button>
    </div>
    <script type="text/javascript">
      window.onload = function () {
        var innerWidth = window.innerWidth;
        var application = null;
        if (innerWidth >= 768) {
          application = new Application();
        } else {
          document.getElementById("bannerAfter").style.display = "none";
        }
      };
      window.addEventListener("resize", function () {
        if (window.innerWidth < 768) {
          document.getElementById("bannerAfter").style.display = "none";
        }
      });
    </script>
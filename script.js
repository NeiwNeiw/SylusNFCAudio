const mediaMap = {
  "dailyrX3c3zRX": {
    title: "If you're tired, or worn out, or not okay… I’m right behind you.",
    image: "dailyrX3c3zRX.png",
    audio: "dailyrX3c3zRX.m4a"
  },
  "dailyi6lqoap3c": {
    title: "My little kitten can always be spoiled by me.",
    image: "dailyi6lqoap3c.jpg",
    audio: "dailyi6lqoap3c.mp3"
  },
  "dailyekqx9tokk": {
    title: "Be yourself—with me.",
    image: "dailyekqx9tokk.jpg",
    audio: "dailyekqx9tokk.mp3"
  }
};

const imageFolder = "./images/";
const audioFolder = "./audio/";

const audioPlayer = document.getElementById("audioPlayer");
const audioSource = document.getElementById("audioSource");
const bgImage = document.getElementById("bgImage");
const pageTitle = document.getElementById("pageTitle");
const playOverlay = document.getElementById("playOverlay");
const playButton = document.getElementById("playButton");
const messageLayer = document.getElementById("messageLayer");
const messageTitle = document.getElementById("messageTitle");
const messageText = document.getElementById("messageText");

function getUrlParam(name) {
  const params = new URLSearchParams(window.location.search);
  return params.get(name);
}

function showMessage(title, text) {
  messageTitle.textContent = title;
  messageText.textContent = text;
  messageLayer.classList.remove("hidden");
}

function hideMessage() {
  messageLayer.classList.add("hidden");
}

function setTitle(title) {
  const finalTitle = title || "專屬語音播放頁";
  document.title = finalTitle;
  pageTitle.textContent = finalTitle;
}

function showPlayButton() {
  playOverlay.classList.remove("hidden");
}

function hidePlayButton() {
  playOverlay.classList.add("hidden");
}

function initMedia() {
  const key = getUrlParam("v");

  if (!key) {
    setTitle("未提供播放參數");
    showMessage(
      "找不到播放參數"
    );
    return;
  }

  const targetMedia = mediaMap[key];

  if (!targetMedia || !targetMedia.audio || !targetMedia.image) {
    setTitle("查無對應內容");
    showMessage(
      "查無對應內容",
      "目前沒有這組參數對應的背景圖或語音檔，請確認網址參數是否正確。"
    );
    return;
  }

  const finalImagePath = `${imageFolder}${targetMedia.image}`;
  const finalAudioPath = `${audioFolder}${targetMedia.audio}`;

  setTitle(targetMedia.title);

  bgImage.style.backgroundImage = `url("${finalImagePath}")`;

  showMessage("語音載入中", "正在準備音訊內容，請稍候...");
  showPlayButton();

  audioSource.src = finalAudioPath;
  audioPlayer.load();

  audioPlayer.addEventListener(
    "loadeddata",
    () => {
      hideMessage();
      showPlayButton();
    },
    { once: true }
  );

  audioPlayer.addEventListener(
    "error",
    () => {
      showMessage(
        "語音載入失敗",
        `無法讀取語音檔案：${finalAudioPath}`
      );
    },
    { once: true }
  );
}

playButton.addEventListener("click", () => {
  audioPlayer.play();
});

audioPlayer.addEventListener("play", () => {
  hidePlayButton();
});

audioPlayer.addEventListener("pause", () => {
  showPlayButton();
});

audioPlayer.addEventListener("ended", () => {
  showPlayButton();
});

initMedia();

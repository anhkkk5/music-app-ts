//aplayer
const aplayer = document.querySelector("#aplayer");
if (aplayer) {
  let dataSong = aplayer.getAttribute("data-song") || "";
  let dataSinger = aplayer.getAttribute("data-singer") || "";

  try {
    dataSong = JSON.parse(dataSong);
    dataSinger = JSON.parse(dataSinger);
  } catch (e) {
    console.error("Invalid JSON in #aplayer data attributes", e);
    dataSong = null;
    dataSinger = null;
  }

  if (!dataSong || !dataSinger) {
    throw new Error("Missing song/singer data for APlayer");
  }

  const ap = new APlayer({
    container: aplayer,
    audio: [
      {
        name: dataSong.title,
        artist: dataSinger.fullName,
        url: dataSong.audio,
        cover: dataSong.avatar,
      },
    ],
    autoplay: true,
  });
  const avatarImg = document.querySelector(".singer-detail .inner-avatar img");

  const setAvatarSpin = (isPlaying) => {
    if (!avatarImg) return;
    avatarImg.style.animationPlayState = isPlaying ? "running" : "paused";
  };

  setAvatarSpin(!ap.audio.paused);

  ap.on("play", function () {
    setAvatarSpin(true);
  });

  ap.on("pause", function () {
    setAvatarSpin(false);
  });
}

//end aplayer

//button like
const buttonLike = document.querySelector("[button-like]");
if (buttonLike) {
  buttonLike.addEventListener("click", () => {
    const idSong = buttonLike.getAttribute("button-like");

    const isActive = buttonLike.classList.contains("active");

    const typeLike = isActive ? "dislike" : "like";
    const link = `/songs/like/${typeLike}/${idSong}`;

    const options = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
    };
    fetch(link, options)
      .then((response) => response.json())
      .then((data) => {
        console.log("Like response:", data);
        const span = buttonLike.querySelector("span");
        span.innerHTML = `${data.like} thích`;
        buttonLike.classList.toggle("active");
      })
      .catch((error) => {
        console.error("Error liking song:", error);
      });
    console.log(link);
  });
}
//end button like

//button favorite
const buttonFavorite = document.querySelector("[button-favorite]");
if (buttonFavorite) {
  buttonFavorite.addEventListener("click", () => {
    const idSong = buttonFavorite.getAttribute("button-favorite");

    const isActive = buttonFavorite.classList.contains("active");

    const typeFavorite = isActive ? "unfavorite" : "favorite";
    const link = `/songs/favorite/${typeFavorite}/${idSong}`;

    const options = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
    };
    fetch(link, options)
      .then((response) => response.json())
      .then((data) => {
        if (data.code === 200) {
          buttonFavorite.classList.toggle("active");
        } else {
          console.error("Failed to favorite song:", data);
        }
      })
      .catch((error) => {
        console.error("Error favoriting song:", error);
      });
    console.log(link);
  });
}
//end button favorite

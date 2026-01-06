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
    loop: "none",
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
  ap.on("ended", function () {
    ap.pause();
    if (ap.audio) {
      ap.audio.currentTime = 0;
    }
    const link = `/songs/listen/${dataSong._id}`;

    const options = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
    };
    fetch(link, options)
      .then((response) => response.json())
      .then((data) => {
        const elementListenSpan = document.querySelector(
          ".singer-detail .inner-listen span"
        );
        if (elementListenSpan) {
          elementListenSpan.innerHTML = `${data.listen} lượt nghe`;
        }
      });
  });
}

//end aplayer

//button like
const buttonLike = document.querySelector("[button-like]");
if (buttonLike) {
  const idSongInit = buttonLike.getAttribute("button-like");
  try {
    const likedRaw = localStorage.getItem("likedSongs") || "[]";
    const likedSongs = JSON.parse(likedRaw);
    if (
      idSongInit &&
      Array.isArray(likedSongs) &&
      likedSongs.includes(idSongInit)
    ) {
      buttonLike.classList.add("active");
    }
  } catch (e) {
    localStorage.removeItem("likedSongs");
  }

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

        try {
          const likedRaw = localStorage.getItem("likedSongs") || "[]";
          const likedSongs = JSON.parse(likedRaw);
          const safeList = Array.isArray(likedSongs) ? likedSongs : [];
          if (!idSong) return;

          const nowActive = buttonLike.classList.contains("active");
          const next = nowActive
            ? Array.from(new Set([...safeList, idSong]))
            : safeList.filter((x) => x !== idSong);
          localStorage.setItem("likedSongs", JSON.stringify(next));
        } catch (e) {
          localStorage.removeItem("likedSongs");
        }
      })
      .catch((error) => {
        console.error("Error liking song:", error);
      });
    console.log(link);
  });
}
//end button like

//button favorite
const ListbuttonFavorite = document.querySelectorAll("[button-favorite]");
if (ListbuttonFavorite.length > 0) {
  ListbuttonFavorite.forEach((buttonFavorite) => {
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
  });
}
//end button favorite

//search Suggest
const boxSearch = document.querySelector(".box-search");
if (boxSearch) {
  const input = document.querySelector("input[name='keyword']");
  const boxSuggest = document.querySelector(".inner-suggest");
  const boxList = boxSuggest ? boxSuggest.querySelector(".inner-list") : null;

  if (input && boxSuggest && boxList) {
    input.addEventListener("keyup", () => {
      const keyword = input.value || "";
      if (!keyword.trim()) {
        boxSuggest.classList.remove("show");
        boxList.innerHTML = "";
        return;
      }

      const link = `/search/suggest?keyword=${encodeURIComponent(keyword)}`;
      fetch(link)
        .then((response) => response.json())
        .then((data) => {
          const songs = data && Array.isArray(data.songs) ? data.songs : [];
          if (songs.length === 0) {
            boxSuggest.classList.remove("show");
            boxList.innerHTML = "";
            return;
          }

          boxSuggest.classList.add("show");
          boxList.innerHTML = songs
            .map((song) => {
              const singerName = song.infoSinger || "";
              return `<a class="inner-item" href="/songs/detail/${song.slug}">
  <div class="inner-image"><img src="${song.avatar}" alt="${song.title}"></div>
  <div class="inner-info">
    <div class="inner-title">${song.title}</div>
    <div class="inner-singer"><i class="fa-solid fa-microphone-lines"></i> ${singerName}</div>
  </div>
</a>`;
            })
            .join("");
        })
        .catch((error) => {
          console.error("Error fetching search suggestions:", error);
        });
    });
  }
}
//end search Suggest

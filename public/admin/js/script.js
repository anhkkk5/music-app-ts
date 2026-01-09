// Upload Image
const uploadImage = document.querySelector("[upload-image]");
if (uploadImage) {
  const uploadImageInput = uploadImage.querySelector("[upload-image-input]");
  const uploadImagePreview = uploadImage.querySelector(
    "[upload-image-preview]"
  );

  let currentImageUrl = null;

  uploadImageInput.addEventListener("change", (e) => {
    if (e.target.files.length) {
      if (currentImageUrl) URL.revokeObjectURL(currentImageUrl);
      const image = URL.createObjectURL(e.target.files[0]);

      currentImageUrl = image;

      uploadImagePreview.src = image;
      uploadImagePreview.style.display = "inline-block";
    } else {
      if (currentImageUrl) URL.revokeObjectURL(currentImageUrl);
      currentImageUrl = null;
      uploadImagePreview.src = "";
      uploadImagePreview.style.display = "none";
    }
  });
}
// End Upload Image

// Upload Audio

const uploadAudio = document.querySelector("[upload-audio]");
if (uploadAudio) {
  const uploadAudioInput = uploadAudio.querySelector("[upload-audio-input]");
  const uploadAudioPlay = uploadAudio.querySelector("[upload-audio-play]");

  let currentAudioUrl = null;

  uploadAudioInput.addEventListener("change", (e) => {
    if (e.target.files.length) {
      if (currentAudioUrl) URL.revokeObjectURL(currentAudioUrl);
      const audio = URL.createObjectURL(e.target.files[0]);

      currentAudioUrl = audio;

      uploadAudioPlay.src = audio;
      uploadAudioPlay.style.display = "block";
      uploadAudioPlay.load();
    } else {
      if (currentAudioUrl) URL.revokeObjectURL(currentAudioUrl);
      currentAudioUrl = null;
      uploadAudioPlay.src = "";
      uploadAudioPlay.style.display = "none";
    }
  });
}

window.addEventListener("DOMContentLoaded", () => {
  const closeButton = document.getElementById("close-btn");
  const maxButton = document.getElementById("maximize-btn");
  const minButton = document.getElementById("minimize-btn");

  closeButton.addEventListener('click', e => {
    window.closeWindow();
  });

  maxButton.addEventListener('click', e => {
    window.maxUnmaxWindow();
  });

  minButton.addEventListener('click', e => {
    window.minimizeWindow();
  });
});

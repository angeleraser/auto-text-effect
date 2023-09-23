const form = document.getElementById("form");
const textarea = document.getElementById("textarea");
const textHtml = document.getElementById("text");
const speedSelector = document.getElementById("speed-selector");

const textFromUrlParam = new URLSearchParams(location.search).get("text");

let intervalId;
let textValue = textFromUrlParam ?? "We love Programming!";

function timer({ durationMs, callback, intervalMs = 100 }) {
  let totalMs = 0;

  callback?.();

  const interval = setInterval(() => {
    totalMs += intervalMs;
    callback?.();
    if (totalMs >= durationMs) {
      onComplete?.();
      clearInterval(interval);
    }
  }, intervalMs);

  return interval;
}

function initAutoTextEffect() {
  if (!textValue) return;

  clearInterval(intervalId);
  let wordIndex = 0;

  textHtml.innerText = "";
  const speed = Number(speedSelector.value) * 100;
  textHtml.style.animationDuration = `${speed * 2.5}ms`;

  intervalId = timer({
    durationMs: Infinity,
    intervalMs: speed,
    callback() {
      if (wordIndex === textValue.length) {
        textHtml.textContent = "";
        wordIndex = 0;
      }
      textHtml.textContent += textValue[wordIndex];
      wordIndex += 1;
    },
  });
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  textValue = textarea.value.trim();
  textarea.value = "";
  initAutoTextEffect();
});

speedSelector.addEventListener("change", initAutoTextEffect);

initAutoTextEffect();

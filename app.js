const canvas = document.getElementById("jsCanvas");
const colors = document.getElementsByClassName("jsColor");
const controls = document.getElementById("jsControls");
const mode = document.getElementById("jsMode");
const range = document.getElementById("jsRange");

const ctx = canvas.getContext("2d");

const INITIAL_STYLE = "#2d3436";

ctx.lineWidth = 2.5;
ctx.strokeStyle = INITIAL_STYLE;
ctx.fillStyle = INITIAL_STYLE;

let isPainting = false;
let isFilling = false;

const stopPainting = () => {
  isPainting = false;
};

const startPainting = () => {
  isPainting = true;
};

const onMouseMove = event => {
  const x = event.offsetX;
  const y = event.offsetY;
  if (!isPainting) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
};

const handleClickedColor = event => {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
};

const handleRange = event => {
  const size = event.target.value;
  ctx.lineWidth = size;
};

const handleMode = () => {
  if (!isFilling) {
    isFilling = true;
    mode.innerText = "Paint";
  } else {
    isFilling = false;
    mode.innerText = "Fill";
  }
};

const handleFilling = () => {
  if (isFilling) {
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
};

const canvasInit = () => {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", handleFilling);
};

const controlsInit = () => {
  range.addEventListener("input", handleRange);
  mode.addEventListener("click", handleMode);
  Array.from(colors, color =>
    color.addEventListener("click", handleClickedColor)
  );
};

if (canvas) {
  canvasInit();
}

if (controls) {
  controlsInit();
}

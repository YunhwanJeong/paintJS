const canvas = document.getElementById("jsCanvas");
const colors = document.getElementsByClassName("jsColor");

const ctx = canvas.getContext("2d");

ctx.lineWidth = 2.5;
ctx.strokeStyle = "#2d3436";

let isPainting = false;

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
};

const init = () => {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  Array.from(colors, color =>
    color.addEventListener("click", handleClickedColor)
  );
};

if (canvas) {
  init();
}

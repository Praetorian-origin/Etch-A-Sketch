const divContainer = document.getElementById("container");
const buttonClearSquare = document.getElementById("clearSquareButton");

buttonClearSquare.addEventListener("click", () => {
  resetContainer();
  const numberOfSquaresPerSide = prompt(
    "Please enter number of squares per side"
  );
  init(numberOfSquaresPerSide);
});

function resetContainer() {
  while (divContainer.firstChild) {
    divContainer.removeChild(divContainer.firstChild);
  }
}

function init(numberSquaresPerSide) {
  const totalNumberOfSquares = numberSquaresPerSide ** 2;

  divContainer.style.gridTemplateColumns = `repeat(${numberSquaresPerSide}, 1fr)`;
  divContainer.style.gridTemplateRows = `repeat(${numberSquaresPerSide}, 1fr)`;

  let i = 0;

  for (i = 0; i < totalNumberOfSquares; i++) {
    const squareDiv = document.createElement("div");
    squareDiv.style.border = "solid 0.1px #D3F1DD";

    squareDiv.addEventListener("mouseover", () => {
      if (squareDiv.style.backgroundColor == "") {
        addRGBCodeToElement(squareDiv);
      } else {
        faintToBlackBy10Percent(squareDiv);
      }
    });

    divContainer.appendChild(squareDiv);
  }
}


function addRGBCodeToElement(element) {
  const rgbCode = generateRGBArray();
  element.style.backgroundColor = `rgb(${rgbCode.toString()})`;

  element.dataset.dataInitR = `${rgbCode[0]}`;
  element.dataset.dataInitG = `${rgbCode[1]}`;
  element.dataset.dataInitB = `${rgbCode[2]}`;
}



function generateRGBArray() {
  const R = Math.floor(Math.random() * Math.floor(255));
  const G = Math.floor(Math.random() * Math.floor(255));
  const B = Math.floor(Math.random() * Math.floor(255));

  const colorArray = [R, G, B];
  return colorArray;
}

function faintToBlackBy10Percent(divToFaint) {
  const currentSquareRgbStr = divToFaint.style.backgroundColor.substring(
    4,
    divToFaint.style.backgroundColor.lastIndexOf(")")
  );
  const currentSquareRgb = currentSquareRgbStr.split(",");
  const newR = faintColor(currentSquareRgb[0], divToFaint.dataset.dataInitR);

  const newG =faintColor(currentSquareRgb[1], divToFaint.dataset.dataInitG);

  const newB =faintColor(currentSquareRgb[2], divToFaint.dataset.dataInitB);
    divToFaint.style.backgroundColor = `rgb(${newR},${newG},${newB})`;
}


function faintColor (currentColor ,initColor) {
  const faintedColor  =
  currentColor - initColor / 10 < 0
    ? 0
    : currentColor - initColor / 10;

    return faintedColor;
}

init(16);
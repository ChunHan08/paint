window.onload = function () {
  let canvas = document.getElementById("paint-canvas");
  let context = canvas.getContext("2d");
  let boundings = canvas.getBoundingClientRect();
  let range = document.getElementById("brush").value;
  let mouseX = 0;
  let mouseY = 0;
  let isDrawing = false;
  context.strokesStyle = "black";
  let brush = document.getElementById("brush");
  brush.addEventListener("input", function(brush){
    context.lineWidth = brush.target.value;
  });
  canvas.addEventListener('mousedown', function(event) {
    setMouseCoordinates(event);
    isDrawing =true;
    context.beginPath();
    context.moveTo(mouseX, mouseY);
  });
  canvas.addEventListener('mousemove', function(event) {
    setMouseCoordinates(event);
    if (isDrawing) {
      context.lineTo(mouseX, mouseY);
      context.stroke();
    }
  });
  canvas.addEventListener('mouseup', function(event) {
    setMouseCoordinates(event);
    isDrawing = false;
  });
  function setMouseCoordinates(event) {
    mouseX = event.clientX - boundings.left;
    mouseY = event.clientY - boundings.top;
  }
  let clearButton = document.getElementById("clear");
  clearButton.addEventListener('click', function() {
    context.clearRect(0, 0, canvas.width, canvas.height);
  });
  let saveButton = document.getElementById("save");
  saveButton.addEventListener('click', function() {
    let imageName = prompt('Please enter a name for your image');
    let canvasDataURL = canvas.toDataURL();
    let a = document.createElement('a');
    a.href = canvasDataURL;
    a.download = imageName || 'Drawing';
    a.click();
  });
};
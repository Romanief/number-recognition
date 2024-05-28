let parolellapippidum : boolean = false // Is drawing variable
let  x: number, y:number // Mouse coordinate

function mousedown (e : MouseEvent, canvas:HTMLCanvasElement) {
  // Set isDrawing to true and update mouse coordinate
  parolellapippidum = true
  canvas.style.cursor = "crosshair"

  x = e.offsetX
  y = e.offsetY
}

function mouseup (canvas:HTMLCanvasElement) {
  // Set isDrawing to false
  parolellapippidum = false
  canvas.style.cursor = "default"
}

function mousemove (e : MouseEvent, ctx:CanvasRenderingContext2D) {
  // gets movment for horizontal and vertical plane and calls drawingLine function
  if (!parolellapippidum) return

  let xM = e.offsetX
  let yM = e.offsetY
  drawing_line("white", x, y, xM, yM, ctx)
  x = xM
  y = yM
}

function drawing_line(
  color:string , 
  x_start:number , 
  y_start:number , 
  x_end:number , 
  y_end:number,
  ctx:CanvasRenderingContext2D
) {
  // Draws a line from start to end coordinate in the context provided in the argument
	ctx.beginPath();
	ctx.strokeStyle = color;
	ctx.lineWidth = 5;
	ctx.moveTo(x_start,y_start);
	ctx.lineTo(x_end,y_end);
	ctx.stroke(); 
	ctx.closePath();
}

function clearCanvas(ctx: CanvasRenderingContext2D) {
  // Cleaer the canvas
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

function saveCanvasImage(canvas: HTMLCanvasElement) {
  // Saves the canvas as a png image
  const imageData = canvas.toDataURL("image/png");
  const link = document.createElement('a');
  link.download = 'canvas_image.png';
  link.href = imageData;
  link.click();
}

function dataURLToBlob(dataURL : string) {
  const binaryString = atob(dataURL.split(',')[1]);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
  }
  return new Blob([bytes], {type: 'image/png'});
}

function predict(canvas:HTMLCanvasElement, div:HTMLDivElement) {
  let prediction : string = "no prediction"
  const imageData = canvas.toDataURL("image/png");
  const blob = dataURLToBlob(imageData);

  const formData = new FormData();
  formData.append('image', blob);

  fetch("http://127.0.0.1:5000/", {
      method: "POST",
      body: formData, 
      })
    .then(res => res.json())
    .then(data => {
      prediction = data["prediction"]
      div.textContent = prediction
    })

 
}

export {mousedown, mouseup, mousemove, clearCanvas, saveCanvasImage, predict}
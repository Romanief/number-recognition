import './style.css'
import { clearCanvas, mousedown, mousemove, mouseup, saveCanvasImage, predict } from './canvas'

const canvas : HTMLCanvasElement | null = document.querySelector("#canvas")
const clearButton : HTMLButtonElement | null = document.querySelector("#clear")
const saveButtton : HTMLButtonElement | null = document.querySelector("#save")
const predictDiv : HTMLDivElement | null = document.querySelector("#prediction")
const ctx = canvas?.getContext("2d")

const SIZE = 400

document.addEventListener("DOMContentLoaded", () => {
  if (!ctx || !canvas || !predictDiv) return console.error("Unable to find context")

  canvas.width = SIZE
  canvas.height = SIZE
  
  document.addEventListener("mousedown", (e) => mousedown(e, canvas))
  document.addEventListener("mouseup", () => mouseup(canvas))
  document.addEventListener("mousemove", (e) => mousemove(e, ctx))

  if (clearButton) clearButton.addEventListener("click", () => clearCanvas(ctx))
  if (saveButtton) saveButtton.addEventListener("click", () => predict(canvas, predictDiv))
})

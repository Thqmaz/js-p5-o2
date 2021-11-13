const sectors = [
    { color: "#f82", label: "1" },
    { color: "#0bf", label: "2" },
    { color: "#fb0", label: "3" },
    { color: "#0fb", label: "4" },
    { color: "#b0f", label: "5" },
    { color: "#f0b", label: "6" },
    { color: "#f82", label: "8" },
    { color: "#0bf", label: "9" },
    { color: "#b0f", label: "0" }
]

const rand = (m, M) => Math.random() * (M - m) + m
const sectorCount = sectors.length
const spinElem = document.querySelector("#spinBtn")
const ctx = document.querySelector("#wheel").getContext('2d')
const width = ctx.canvas.width
const rad = width / 2
const TAU = 2 * Math.PI
const arc = TAU / sectors.length

const friction = 0.995
let angVel = 0
let ang = 0

const getIndex = () => Math.floor(sectorCount - ang / TAU * sectorCount) % sectorCount

function drawSector(sector, i) {
    const ang = arc * i
    ctx.save()
    ctx.beginPath()
    ctx.fillStyle = sector.color
    ctx.moveTo(rad, rad)
    ctx.arc(rad, rad, rad, ang, ang + arc)
    ctx.lineTo(rad, rad)
    ctx.fill()
    
    ctx.translate(rad, rad)
    ctx.rotate(ang + arc / 2)
    ctx.textAlign = "right"
    ctx.fillStyle = "#fff"
    ctx.font = "bold 24px sans-serif"
    ctx.fillText(sector.label, rad - 10, 10)

    ctx.restore()
}

function rotate() {
    const sector = sectors[getIndex()]
    ctx.canvas.style.transform = `rotate(${ang - Math.PI / 2}rad)`
    spinElem.textContent = !angVel ? "MEOW" : sector.label
    spinElem.style.background = sector.color
}

function frame() {
    const sector = sectors[getIndex()]
    if (!angVel) return
    angVel *= friction
    if (angVel < 0.002) angVel = 0
    ang += angVel
    ang %= TAU

    // Laat zien waar hij op eindigt
    if(angVel <= 0.000) {
        alert("Resultaat: " + sector.label)
    }

    rotate()
}

function engine() {
    frame()
    requestAnimationFrame(engine)
}

// INITIALIZE
sectors.forEach(drawSector)
rotate()
engine()
spinElem.addEventListener("click", () => {
    if (!angVel) angVel = rand(0.25, 0.35)
})
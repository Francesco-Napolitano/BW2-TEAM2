const draw = function (img) {
  let canvas = document.createElement('canvas')
  let c = canvas.getContext('2d')
  c.width = canvas.width = img.clientWidth
  c.height = canvas.height = img.clientHeight
  c.clearRect(0, 0, c.width, c.height)
  c.drawImage(img, 0, 0, img.clientWidth, img.clientHeight)
  return c
}

const getColors = function (c) {
  let col,
    colors = {}
  let pixels, r, g, b, a
  r = g = b = a = 0
  pixels = c.getImageData(0, 0, c.width, c.height)
  for (let i = 0, data = pixels.data; i < data.length; i += 4) {
    r = data[i]
    g = data[i + 1]
    b = data[i + 2]
    a = data[i + 3]
    if (a < 255 / 2) continue
    col = rgbToHex(r, g, b)
    if (!colors[col]) colors[col] = 0
    colors[col]++
  }
  return colors
}

const findMostRecurrentColor = function (colorMap) {
  let highestValue = 0
  let mostRecurrent = null
  for (const hexColor in colorMap) {
    if (colorMap[hexColor] > highestValue) {
      mostRecurrent = hexColor
      highestValue = colorMap[hexColor]
    }
  }
  return mostRecurrent
}

const rgbToHex = function (r, g, b) {
  if (r > 255 || g > 255 || b > 255) {
    throw 'Invalid color component'
  } else {
    return ((r << 16) | (g << 8) | b).toString(16)
  }
}

const pad = function (hex) {
  return ('000000' + hex).slice(-6)
}

const isLightColor = function (hexColor) {
  const r = parseInt(hexColor.substr(0, 2), 16)
  const g = parseInt(hexColor.substr(2, 2), 16)
  const b = parseInt(hexColor.substr(4, 2), 16)

  const brightness = 0.2126 * r + 0.7152 * g + 0.0722 * b

  return brightness > 200
}

const start = function () {
  let imgReference = document.querySelector('#cover')
  let context = draw(imgReference)

  let allColors = getColors(context)

  let mostRecurrent = findMostRecurrentColor(allColors)

  let mostRecurrentHex = pad(mostRecurrent)

  if (isLightColor(mostRecurrentHex)) {
    mostRecurrentHex = '808080'
  }

  console.log(mostRecurrentHex)
  const divElement = document.getElementById('colonna-centrale')

  divElement.style.background = `linear-gradient(to bottom, #${mostRecurrentHex} 30%, black 70%)`
}

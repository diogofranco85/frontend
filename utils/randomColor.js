export function getRandomColor(inicio) {
  const letters = '0123456789ABCDEF'
  let color = '#'
  let numero = 0
  if (inicio === 0) {
    let inverter = true
    for (let i = 0; i < 6; i++) {
      numero = Math.random() * 16
      if (inverter === true) {
        numero = 16 - numero
        inverter = false
      } else {
        inverter = true
      }
      color += letters[Math.floor(numero)]
    }
  } else {
    color += letters[inicio]
    for (let i = 0; i < 5; i++) {
      numero = Math.random()
      color += letters[Math.floor(numero * 16)]
    }
  }
  return color
}



export function hex2rgba(hex, alpha = 1) {
  const [r, g, b] = hex.match(/\w\w/g).map((x) => parseInt(x, 16))
  return `rgba(${r},${g},${b},${alpha})`
}

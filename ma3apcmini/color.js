// Mapa kolorów do velocity
const colorToVelocity = {
  '#000000': 0, '#1E1E1E': 1, '#7F7F7F': 2, '#FFFFFF': 3,
  '#FF4C4C': 4, '#FF0000': 5, '#590000': 6, '#190000': 7,
  '#FFBD6C': 8, '#FF5400': 9, '#591D00': 10, '#271B00': 11,
  '#FFFF4C': 12, '#FFFF00': 13, '#595900': 14, '#191900': 15,
  '#88FF4C': 16, '#54FF00': 17, '#1D5900': 18, '#142B00': 19,
  '#4CFF4C': 20, '#00FF00': 21, '#005900': 22, '#001900': 23,
  '#4CFF5E': 24, '#00FF19': 25, '#00590D': 26, '#001902': 27,
  '#4CFF88': 28, '#00FF55': 29, '#00591D': 30, '#001F12': 31,
  '#4CFFB7': 32, '#00FF99': 33, '#005935': 34, '#001912': 35,
  '#4CC3FF': 36, '#00A9FF': 37, '#004152': 38, '#001019': 39,
  '#4C88FF': 40, '#0055FF': 41, '#001D59': 42, '#000819': 43,
  '#4C4CFF': 44, '#0000FF': 45, '#000059': 46, '#000019': 47,
  '#874CFF': 48, '#5400FF': 49, '#190064': 50, '#0F0030': 51,
  '#FF4CFF': 52, '#FF00FF': 53, '#590059': 54, '#190019': 55,
  '#FF4C87': 56, '#FF0054': 57, '#59001D': 58, '#220013': 59,
  '#FF1500': 60, '#993500': 61, '#795100': 62, '#436400': 63,
  '#033900': 64, '#005735': 65, '#00547F': 66, '#0000FF': 67,
  '#00454F': 68, '#2500CC': 69, '#7F7F7F': 70, '#202020': 71,
  '#FF0000': 72, '#BDFF2D': 73, '#AFED06': 74, '#64FF09': 75,
  '#108B00': 76, '#00FF87': 77, '#00A9FF': 78, '#002AFF': 79,
  '#3F00FF': 80, '#7A00FF': 81, '#B21A7D': 82, '#402100': 83,
  '#FF4A00': 84, '#88E106': 85, '#72FF15': 86, '#00FF00': 87,
  '#3BFF26': 88, '#59FF71': 89, '#38FFCC': 90, '#5B8AFF': 91,
  '#3151C6': 92, '#877FE9': 93, '#D31DFF': 94, '#FF005D': 95,
  '#FF7F00': 96, '#B9B000': 97, '#90FF00': 98, '#835D07': 99,
  '#392b00': 100, '#144C10': 101, '#0D5038': 102, '#15152A': 103,
  '#16205A': 104, '#693C1C': 105, '#A8000A': 106, '#DE513D': 107,
  '#D86A1C': 108, '#FFE126': 109, '#9EE12F': 110, '#67B50F': 111,
  '#1E1E30': 112, '#DCFF6B': 113, '#80FFBD': 114, '#9A99FF': 115,
  '#8E66FF': 116, '#404040': 117, '#757575': 118, '#E0FFFF': 119,
  '#A00000': 120, '#350000': 121, '#1AD000': 122, '#074200': 123,
  '#B9B000': 124, '#3F3100': 125, '#B35F00': 126, '#4B1502': 127
};

// Funkcja konwertująca kolor z heksadecymalnego na wartości RGB z walidacją
function hexToRgb(hex) {
  if (!/^#([0-9A-F]{3}){1,2}$/i.test(hex)) {
    throw new Error('Nieprawidłowy format koloru: ' + hex);
  }
  let bigint = parseInt(hex.slice(1), 16);
  let r = (bigint >> 16) & 255;
  let g = (bigint >> 8) & 255;
  let b = bigint & 255;
  return { r, g, b };
}

// Funkcja obliczająca odległość Manhattan między dwoma kolorami RGB
function colorDistanceManhattan(color1, color2) {
  return Math.abs(color1.r - color2.r) +
         Math.abs(color1.g - color2.g) +
         Math.abs(color1.b - color2.b);
}

// Funkcja zwracająca velocity dla najbardziej zbliżonego koloru
function getClosestVelocity(color) {
  let targetRgb = hexToRgb(color);
  let closestColor = null;
  let closestDistance = Infinity;

  for (let key in colorToVelocity) {
    let currentRgb = hexToRgb(key);
    let distance = colorDistanceManhattan(targetRgb, currentRgb);
    if (distance < closestDistance) {
      closestDistance = distance;
      closestColor = key;
    }
  }
  
  return colorToVelocity[closestColor];
}

// Przykładowe użycie
const color = '#3B1501';
try {
  const velocity = getClosestVelocity(color);
  console.log(`Velocity for color ${color} is ${velocity}`);
} catch (error) {
  console.error(error.message);
}

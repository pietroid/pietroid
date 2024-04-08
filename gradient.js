const outerBorder = document.getElementById('outer-border');

function interpolateColor(colors, time, period) {
    const colorCount = colors.length;
    colors = colors.map(color => hexToRgb(color));
    const t = Math.sin((time % period) / period * Math.PI);
    const index1 = Math.floor(t * colorCount);
    const index2 = (index1 + 1) % colorCount;
    const color1 = colors[index1];
    const color2 = colors[index2];
  
    const r = Math.round(color1[0] * (1 - t) + color2[0] * t);
    const g = Math.round(color1[1] * (1 - t) + color2[1] * t);
    const b = Math.round(color1[2] * (1 - t) + color2[2] * t);

    return `rgb(${r}, ${g}, ${b})`;
}

function createLinearGradient(colors) {
    const gradient = `linear-gradient(to right, ${colors.join(', ')})`;
    return gradient;
}

function hexToRgb(hex) {
    // Remove # if it's included
    hex = hex.replace('#', '');

    // Parse hex to RGB components
    let r = parseInt(hex.substring(0, 2), 16);
    let g = parseInt(hex.substring(2, 4), 16);
    let b = parseInt(hex.substring(4, 6), 16);

    return [r, g, b];
}

function update() {
    const currentTimeInMillis = Date.now();
    const period = 10000;
    const colors = [
      interpolateColor(['#4E009B','#005555','#989B00','#550F00',"#810000"], currentTimeInMillis, period),
      interpolateColor(['#005555','#989B00','#550F00',"#810000","#4E009B"], currentTimeInMillis, period),
    ];
    const linearGradient = createLinearGradient(colors);
    outerBorder.style.backgroundImage = linearGradient;
    // Call requestAnimationFrame to schedule the next update
    requestAnimationFrame(update);
  }
  
  // Call update for the first time
  update();
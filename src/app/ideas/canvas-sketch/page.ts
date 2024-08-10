// const canvasSketch = require('canvas-sketch');

// const settings = {
//   dimensions: [600, 600],
//   animate: true,
//   duration: 4,
//   fps: 24,
// };

// const sketch = () => {
//   return ({ context, width, height }) => {
//     context.fillStyle = 'white';
//     context.fillRect(0, 0, width, height);

//     const w = width * 0.1;
//     const h = height * 0.1;
//     const gap = width * 0.03;
//     const ix = width * 0.17;
//     const iy = height * 0.17;

//     const off = width * 0.02;

//     for (let i = 0; i < 5; i++) {
//       for (let j = 0; j < 5; j++) {
//         let x = ix + (w + gap) * i;
//         let y = iy + (h + gap) * j;
//         context.beginPath();
//         context.rect(x, y, width, height);
//         context.stroke();
//         if (Math.random() > 0.5) {
//           context.beginPath();
//           context.rect(x + 8, y + 8, width - 16, height - 16);
//           context.stroke();
//         }
//       }
//     }
//   };
// };

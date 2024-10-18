gsap.registerPlugin(Draggable, InertiaPlugin);

// make snowflakes
// lil snowflake generator
class Snowflake {
  constructor() {
    this.el = document.createElementNS("http://www.w3.org/2000/svg", "image");
    const href = `https://assets.codepen.io/16327/flake-${gsap.utils.random(1,6,1)}.png`;
    const size = gsap.utils.random([60, 30, 70]);
    const xPosition = gsap.utils.random(0, 1000);

    this.el.setAttributeNS("http://www.w3.org/1999/xlink", "href", href);
    this.el.setAttributeNS(null, "width", size);
    this.el.setAttributeNS(null, "height", size);
    this.el.setAttributeNS(null, "x", xPosition);

    this.el.setAttributeNS(null, "y", -50);
  }

  get element() {
    return this.el;
  }
}
// create snowflakes
function createSnowflakes() {
  const snowContainer = document.getElementById("snow");

  for (let i = 0; i < 30; i++) {
    const snowflake = new Snowflake();
    snowContainer.appendChild(snowflake.element);
  }
}
createSnowflakes();

let snowfall = gsap.to("#snow image", {
  y: 1000,
  ease: "none",
  duration: "random([3, 4, 5])",
  rotation: "random(-360, 360, 5)",
  x: "random(-1000, 1000, 5)",
  transformOrigin: "center",
  stagger: {
    amount: 5,
    repeat: -1
  },
  paused: true
});


const coords = document.querySelector("#coords");
const tracker = InertiaPlugin.track("#snowglobe", "x,y")[0];

gsap.set("#snowman", { transformOrigin: "bottom center" });

const wobbleSnowman = gsap.quickTo("#snowman", "rotation", { duration: 0.4 });
const moveSkyX = gsap.quickTo("#sky", "xPercent", { duration: 0.4 });

function transformer(min, max, value) {
  let clamp = gsap.utils.clamp(-2000, 2000);
  let mapToRange = gsap.utils.mapRange(-2000, 2000, min, max);
  let transform = gsap.utils.pipe(clamp, mapToRange);
  return transform(value);
}

let isSnowing = false;
Draggable.create("#snowglobe", {
  inertia: true,
  bounds: "body",
  onDragStart: () => {
    isSnowing = true;

    gsap.to("#snow", {
      opacity: 1,
      overwrite: true
    });
    snowfall.play(0);
  },
  onDragEnd: () => {
    isSnowing = false;

    gsap.to("#snow", {
      opacity: 0,
      overwrite: true,
      onComplete: () => {
        if (isSnowing) return;
        console.log("pause");
        snowfall.pause();
      }
    });
  }
});

function updateOnVelocity() {
  let x = tracker.get("x");

  if (x === 0) return;
  coords.innerHTML = x;

  wobbleSnowman(transformer(90, -90, x));
  moveSkyX(transformer(40, -40, x));

  let speed = transformer(-10, 10, x);

  gsap.to(snowfall, {
    duration: 1,
    timeScale: Math.abs(speed) + 0.2
  });
}

gsap.ticker.add(updateOnVelocity);

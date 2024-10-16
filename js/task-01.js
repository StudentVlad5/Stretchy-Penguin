
let select = (s) => document.querySelector(s),
  selectAll = (s) => document.querySelectorAll(s),
  penguinTop = select(".penguinTop"),
  penguinHead = select(".penguinHead"),
  maxDragY = 260,
  dragPosY = 0,
  stretchBoxInitHeight = 7,
  armL = select(".armL"),
  armR = select(".armR"),
  maxArmRotation = 100,
  maxHeadRotation = 12;

gsap.set("svg", {
  visibility: "visible",
});

gsap.set(armL, {
  transformOrigin: "100% 5%",
});
gsap.set(armR, {
  transformOrigin: "30% 20%",
});
gsap.set(penguinHead, {
  transformOrigin: "80% 95%",
});

let onDrag = () => {
  dragPosY = gsap.getProperty(penguinTop, "y");
  dragPosY = dragPosY <= 0 ? dragPosY : 0;
  gsap.set(".stretch rect", {
    attr: {
      height: stretchBoxInitHeight - dragPosY,
    },
    y: dragPosY,
    roundProps: "height,y",
  });

  gsap.to(armL, {
    duration: 0.8,
    rotation: (-dragPosY / maxDragY) * maxArmRotation,
    ease: "elastic(0.65, 0.34)",
  });
  gsap.to(armR, {
    duration: 1,
    rotation: (dragPosY / maxDragY) * maxArmRotation,
    ease: "elastic(0.5, 0.36)",
  });
  gsap.to(penguinHead, {
    duration: 1,
    rotation: (dragPosY / maxDragY) * maxHeadRotation,
    ease: "elastic(0.85, 0.31)",
  });
};

var topDrag = Draggable.create(penguinTop, {
  type: "y",
  bounds: { minY: -maxDragY, maxY: 0 },
  onDrag: onDrag,
  throwProps: true,
  onThrowUpdate: onDrag,
  overshootTolerance: 0,
  onThrowComplete: () => {
    var duration = -dragPosY / maxDragY;
    gsap.delayedCall(duration / 2, resetPenguin);
  },
});

let resetPenguin = () => {
  var duration = -dragPosY / maxDragY;
  gsap.to(penguinTop, {
    duration: duration + 0.1,
    y: 0,
    onUpdate: onDrag,
    ease: `elastic(${duration / 2}, 0.4)`, // Elastic.easeOut.config(duration/2 , 0.4)
  });
};

let headNod = (_duration) => {
  gsap.to(penguinHead, {
    duration: 0.6,
    rotation: -8,
    delay: _duration / 2,
    ease: "wiggle({type:uniform, wiggles:2})",
  });
};

let blink = () => {
  gsap.to(".eye", 0.3, {
    opacity: 0,
    delay: "random(1, 10)",
    ease: "wiggle({type:uniform, wiggles:1})",
    onComplete: blink,
  });
};
gsap.defaults({ lazy: false });
let init = () => {
  blink();
  gsap.to(penguinTop, {
    duration: 0.6,
    y: -160,
    onUpdate: onDrag,
    onComplete: () => {
      gsap.delayedCall(0.3, resetPenguin);
    },
  });
};

init();

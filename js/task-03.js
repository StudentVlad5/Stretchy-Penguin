const imageContainer = document.querySelector(".imgContainer");
const images = imageContainer.querySelectorAll("img");

const timeline = gsap.timeline();

let current = 0;
let z = 1000000;

timeline
	.set(images, {
		x: () => {
			return 500 * Math.random() - 250;
		},
		y: "500%",
		rotation: () => {
			return Math.random() * 90 - 45;
		},
	})
	.to(images, {
		x: 0,
		y: 0,
		stagger: -0.25,
	})
	.to(images, {
		rotation: () => {
			return Math.random() * 16 - 8;
		},
	});

images.forEach((image) => {
	z--;

	image.style.zIndex = z;
});

imageContainer.addEventListener("click", () => {
	z--;

	let direction = "150%";
	let rotationAngle = 15;

	if (Math.random() > 0.5) {
		direction = "-150%";
		rotationAngle = -15;
	}

	const currentImage = images[current];

	const flipTimeline = gsap.timeline();

	flipTimeline
		.set(currentImage, { x: 0 })
		.to(currentImage, {
			x: direction,
			rotation: () => {
				return rotationAngle;
			},
		})
		.set(currentImage, { zIndex: z })
		.to(currentImage, {
			x: 0,
			rotation: () => {
				return Math.random() * 16 - 8;
			},
		});

	// currentImage.style.zIndex = z;

	current++;
	current = current % images.length;
});

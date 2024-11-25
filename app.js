const tlLeave = gsap.timeline({
  defaults: {
    duration: 0.75,
    ease: "Power2.easeOut",
  },
});

const tlEnter = gsap.timeline({
  defaults: {
    duration: 0.75, // Duration for entrance animation
    ease: "Power2.easeOut",
  },
});

// Leave animation for the product page
const leaveAnimation = (current, done) => {
  const product = current.querySelector(".image-container");
  const text = current.querySelector(".showcase-text");
  const circles = current.querySelectorAll(".circle");
  const arrow = current.querySelector(".showcase-arrow");

  tlLeave
    .fromTo(
      arrow,
      {
        opacity: 1,
        y: 0,
      },
      {
        opacity: 0,
        y: 50,
      }
    )
    .fromTo(
      product,
      {
        opacity: 1,
        y: 0,
      },
      {
        opacity: 0,
        y: 100,
        onComplete: done,
      },
      "<"
    )
    .fromTo(
      text,
      {
        y: 0,
        opacity: 1,
      },
      {
        y: 100,
        opacity: 0,
      },
      "<"
    )
    .fromTo(
      circles,
      {
        y: 0,
        opacity: 1,
      },
      {
        y: -200,
        opacity: 0,
        stagger: 0.15,
        ease: "back.out(1.7)",
        duration: 1,
      },
      "<"
    );
};

// Enter animation for the product page
const enterAnimation = (next, done, gradient) => {
  const product = next.querySelector(".image-container");
  const text = next.querySelector(".showcase-text");
  const circles = next.querySelectorAll(".circle");
  const arrow = next.querySelector(".showcase-arrow");

  tlEnter
    .fromTo(
      arrow,
      {
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
      }
    )
    .to(
      "body",
      {
        background: gradient,
      },
      "<"
    )
    .fromTo(
      product,
      {
        opacity: 0,
        y: 100,
      },
      {
        opacity: 1,
        y: 0,
        onComplete: done,
      },
      "<"
    )
    .fromTo(
      text,
      {
        y: 100,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
      },
      "<"
    )
    .fromTo(
      circles,
      {
        y: -200,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        stagger: 0.15,
        ease: "back.out(1.7)",
        duration: 1,
      },
      "<"
    );
};

// Transition for product page
barba.init({
  preventRunning: true,
  transitions: [
    // Default transition
    {
      name: "default",
      once(data) {
        const done = this.async();
        let next = data.next.container;
        let gradient = getGradient(data.next.namespace);

        gsap.set("body", {
          background: gradient,
        });

        enterAnimation(next, done, gradient);
      },
      leave(data) {
        const done = this.async();
        let current = data.current.container;
        leaveAnimation(current, done);
      },
      enter(data) {
        const done = this.async();
        let next = data.next.container;
        let gradient = getGradient(data.next.namespace);
        enterAnimation(next, done, gradient);
      },
    },
    // Product page transition
    {
      name: "product-transition",
      sync: true,
      from: {
        namespace: ["handbag", "product"],
      },
      to: {
        namespace: ["product", "handbag"],
      },
      enter(data) {
        const done = this.async();
        let next = data.next.container;
        productEnterAnimation(next, done);
      },
      leave(data) {
        const done = this.async();
        let current = data.current.container;
        productLeaveAnimation(current, done);
      },
    },
  ],
});

// Product page enter animation
function productEnterAnimation(next, done) {
  // This timeline moves the page vertically and animates the card
  tlEnter
    .fromTo(
      next,
      {
        y: "100%",
      },
      {
        y: "0%",
      }
    )
    .fromTo(
      ".card",
      {
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        onComplete: done,
      }
    );
}

// Product page leave animation
function productLeaveAnimation(current, done) {
  tlLeave.fromTo(
    current,
    {
      y: "0%",
    },
    {
      y: "100%",
      onComplete: done,
    }
  );
}

// Changing the gradient based on the namespace (no changes to colors)
function getGradient(name) {
  switch (name) {
    case "handbag":
      return "linear-gradient(260deg,#b75b62, #75d4d4f)";
    case "boot":
      return "linear-gradient(260deg,#5d8cb7, #4c4f70)";
    case "hat":
      return "linear-gradient(260deg,#b27a5c, #7f5450)";
  }
}

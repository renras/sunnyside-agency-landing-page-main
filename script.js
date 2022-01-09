// elements
const mobileViewSection = document.querySelector("#mobile-view-section");
const desktopViewSection = document.querySelector("#desktop-view-section");
const loadMoreButtonMobile = document.querySelector("#load-more-button-mobile");
const loadMoreButtonDesktop = document.querySelector(
  "#load-more-button-desktop"
);
const menu = document.querySelector("#menu");
const drawerBackground = document.querySelector("#drawer-background");
const drawer = document.querySelector("#drawer");
const body = document.querySelector("body");
const scrollToTopButton = document.querySelector("#scroll-to-top-button");

// load api
const loadData = async () => {
  const response = await fetch(
    "https://renras.github.io/sunny-side-api/testimonials.json"
  );
  return await response.json();
};

document.addEventListener("DOMContentLoaded", async () => {
  const clients = await loadData();

  const testimonials = [];
  const testimonialsDesktop = [];
  let testimonialsToAdd = 1;
  let testimonialsToAddDesktop = 3;
  let activeIndex = 0;
  let activeIndexDesktop = 0;

  const incrementActiveIndex = () => {
    activeIndex = activeIndex === 2 ? 0 : activeIndex + 1;
  };

  const incrementActiveIndexDesktop = () => {
    activeIndexDesktop = activeIndexDesktop === 2 ? 0 : activeIndexDesktop + 1;
  };

  const addTestimonial = (element, index) => {
    element.insertAdjacentHTML(
      "beforeend",
      `
        <div class='client-testimonial-mobile'>
            <img src=${clients[index].image} alt="avatar"></img>
            <p class='message'>${clients[index].message}</p>
            <div class='client-info'>
            <b>${clients[index].name}</b>
            <p class='position'>${clients[index].position}</p>
            </div>
        </div>
        `
    );
  };

  clients.forEach((client, index) => {
    if (index < testimonialsToAdd) {
      testimonials.push(client);
    }
    if (index < testimonialsToAddDesktop) {
      testimonialsDesktop.push(client);
    }
  });

  testimonials.forEach(() => {
    addTestimonial(mobileViewSection, activeIndex);
    incrementActiveIndex();
  });

  testimonialsToAdd = 2;

  testimonialsDesktop.forEach(() => {
    addTestimonial(desktopViewSection, activeIndexDesktop);
    incrementActiveIndexDesktop();
  });

  testimonialsToAddDesktop = 3;

  loadMoreButtonMobile.addEventListener("click", () => {
    let counter = 0;
    while (counter !== testimonialsToAdd) {
      counter++;
      addTestimonial(mobileViewSection, activeIndex);
      incrementActiveIndex();
    }
    counter = 0;
  });

  loadMoreButtonDesktop.addEventListener("click", () => {
    let counter = 0;
    while (counter !== testimonialsToAddDesktop) {
      counter++;
      addTestimonial(desktopViewSection, activeIndexDesktop);
      incrementActiveIndexDesktop();
    }
    counter = 0;
  });
});

// open drawer

const openDrawer = () => {
  drawerBackground.style.display =
    drawerBackground.style.display !== "block" ? "block" : "none";
};

menu.addEventListener("click", openDrawer);
drawerBackground.addEventListener("click", openDrawer);
drawer.addEventListener("click", (e) => {
  e.stopPropagation();
});

window.addEventListener("resize", () => {
  if (drawerBackground.style.display === "block") {
    drawerBackground.style.display = "none";
  }
});

// check if document is scrolled down to half the page

let isPositionFarDown = false;

document.addEventListener("scroll", () => {
  const position = window.scrollY;
  const halfHeight = document.body.clientHeight / 2;

  if (position >= halfHeight && !isPositionFarDown) {
    isPositionFarDown = true;
    scrollToTopButton.style.display = "block";
  }

  if (position < halfHeight && isPositionFarDown) {
    isPositionFarDown = false;
    scrollToTopButton.style.display = "none";
  }
});

// scrollToTopButton

scrollToTopButton.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

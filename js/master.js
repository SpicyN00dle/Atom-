// Check for colors in local storage
const mainColors = window.localStorage.getItem("color_option");

if (mainColors !== null) {
  // console.log(`localstorage not empty`);
  // console.log(localStorage.getItem("color_option"));

  document.documentElement.style.setProperty("--main-color", mainColors);

  // Remove and add active class on elements
  document.querySelectorAll(".color-list li").forEach((element) => {
    element.classList.remove("active");

    if (element.dataset.color === mainColors) {
      element.classList.add("active");
    }
  });
}
//
//
//
let backgroundOption = true;

//
let backgroundInterval;
//
//

// Add Backgrounds to LocalStorage
const backgroundLocalItem = localStorage.getItem("backGround_option");

if (backgroundLocalItem !== null) {
  if (backgroundLocalItem === "true") {
    backgroundOption = true;
  } else {
    backgroundOption = false;
  }

  document.querySelectorAll(".random-backgrounds span").forEach((element) => {
    element.classList.remove("active");
  });

  if (backgroundLocalItem === "true") {
    document.querySelector(".random-backgrounds .on").classList.add("active");
  } else {
    document.querySelector(".random-backgrounds .off").classList.add("active");
  }
}
//
//
//
// add open class to the setting box
const gear = document.querySelector(".gear");

gear.addEventListener("click", () => {
  const settingsBox = document.querySelector(".settings-box");
  gear.classList.toggle("fa-spin");
  settingsBox.classList.toggle("open");
});
// Change Main color
const colorsLi = document.querySelectorAll(".color-list li");

colorsLi.forEach((li) => {
  li.addEventListener("click", (e) => {
    // Set new main color
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );

    localStorage.setItem("color_option", e.target.dataset.color);

    handleActive(e);
  });
});
//
//
//
//
//

// Change Main BackGrounds Elements
const backGroundEl = document.querySelectorAll(".random-backgrounds span");

backGroundEl.forEach((span) => {
  span.addEventListener("click", (e) => {
    handleActive(e);

    if (e.target.dataset.background === "on") {
      backgroundOption === true;
      normalize();

      localStorage.setItem("backGround_option", true);
    } else {
      backgroundOption === false;
      clearInterval(backgroundInterval);

      localStorage.setItem("backGround_option", false);
    }
  });
});

//
//
//
//
// Select Landing Page
const landingPage = document.querySelector(".landing-page");
//
// Get an array of images
const arrImages = ["01.jpg", "02.jpg", "03.jpg"];
//
//
//
window.addEventListener("load", () => {
  landingPage.style.backgroundImage = 'url("imgs/' + arrImages[0] + '")';
});
//
//
//
// Change the bakckground of landing page

function normalize() {
  if (backgroundOption === true) {
    backgroundInterval = setInterval(() => {
      // Get Rnadom Number
      const randomNumber = Math.floor(Math.random() * arrImages.length);

      // Change the background image
      landingPage.style.backgroundImage =
        'url("imgs/' + arrImages[randomNumber] + '")';
    }, 5000);
  }
}
normalize();
//
//
//
// Select Skills Section

const ourSkills = document.querySelector(".skills");

window.onscroll = function () {
  // Skills Offest Top
  const skillsOffestTop = ourSkills.offsetTop;
  // this.console.log(skillsOffestTop);

  // Skills Offest Height
  const skillsOffestHeight = ourSkills.offsetHeight;
  // this.console.log(skillsOffestHeight);

  // Window Height
  const windowHeight = this.innerHeight;
  // this.console.log(windowHeight);

  // Window Scroll Top
  const windowSctollTop = this.pageYOffset;
  // this.console.log(windowSctollTop);

  if (
    windowSctollTop >
    skillsOffestTop + skillsOffestHeight - windowHeight - 5
  ) {
    let allSkills = document.querySelectorAll(
      ".skill-box .skill-progress span"
    );
    allSkills.forEach((skill) => {
      skill.style.width = skill.dataset.progress;
    });
  }
};
//
//
// Gallary Section => Create popup box
let gallaryImages = document.querySelectorAll(".gallary img");

gallaryImages.forEach((img) => {
  img.addEventListener("click", (e) => {
    // Create Overlay
    let overlay = document.createElement("div");
    overlay.className = "overlay-popup";
    document.body.appendChild(overlay);
    // Create the popup for the image
    const popupBox = document.createElement("div");
    popupBox.className = "popup-box";
    // Add image alt text
    if (img.alt !== null) {
      const imageHeading = document.createElement("h3");
      const imageText = document.createTextNode(img.alt);
      imageHeading.className = "img-alt";
      imageHeading.appendChild(imageText);
      popupBox.appendChild(imageHeading);
    }
    // Create the image itself
    const popupImage = document.createElement("img");
    // Change src for image
    popupImage.src = img.src;
    // popupimage to popup box
    popupBox.appendChild(popupImage);
    // popupBox to the body
    document.body.appendChild(popupBox);

    // Create Close Span
    const closeButton = document.createElement("span");
    const spanText = document.createTextNode("X");
    closeButton.className = "close-button";
    closeButton.appendChild(spanText);
    popupBox.appendChild(closeButton);
  });
});

// CLose Popup Box
document.addEventListener("click", function (e) {
  if (e.target.className === "close-button") {
    e.target.parentNode.remove();

    document.querySelector(".overlay-popup").remove();
  }
});
//
//
//
//Get all tooltips

const allBullets = document.querySelectorAll(".nav-bullets .bullet ");
const allLinks = document.querySelectorAll(".links a");
// allBullets.forEach((bullet) => {
//   bullet.addEventListener("click", (e) => {
//     document.querySelector(e.target.dataset.section).scrollIntoView({
//       behavior: "smooth",
//     });
//   });
// });

function scrollToSection(elements) {
  elements.forEach((ele) => {
    ele.addEventListener("click", (e) => {
      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}
scrollToSection(allBullets);
scrollToSection(allLinks);
//  Function To Handle active classes

function handleActive(ev) {
  // Remove and add active class on elements
  ev.target.parentElement
    .querySelectorAll(".active")
    .forEach((element) => element.classList.remove("active"));

  // Add Active Class on the clicked element
  ev.target.classList.add("active");
}
//
//
//

const bulletsSpan = document.querySelectorAll(".bullets-option span");
const bulletsContainer = document.querySelector(".nav-bullets");
const bulletLocalItem = localStorage.getItem("bullets_option");

if (bulletLocalItem !== null) {
  bulletsSpan.forEach((span) => {
    span.classList.remove("active");
  });

  if (bulletLocalItem === "block") {
    bulletsContainer.style.display = "block";
    document.querySelector(".bullets-option .on").classList.add("active");
  } else {
    bulletsContainer.style.display = "none";
    document.querySelector(".bullets-option .off").classList.add("active");
  }
}

bulletsSpan.forEach((span) => {
  span.addEventListener("click", (e) => {
    if (span.dataset.display === "on") {
      bulletsContainer.style.display = "block";

      localStorage.setItem("bullets_option", "block");
    } else {
      bulletsContainer.style.display = "none";

      localStorage.setItem("bullets_option", "none");
    }

    handleActive(e);
  });
});
//
//
//Reset Options

document.querySelector(".reset-options").onclick = function () {
  localStorage.clear();
  // localStorage.removeItem("color_option");
  // localStorage.removeItem("bullets_option");
  // localStorage.removeItem("backGround_option");
  window.location.reload();
};
//
//
// Toggle Button and links
const toggleBtn = document.querySelector(".toggle-menu");
const toggleLinks = document.querySelector(".links");

document.addEventListener("click", (e) => {
  // console.log(e.target);

  if (e.target !== toggleBtn && e.target !== toggleLinks) {
    if (toggleLinks.classList.contains("open")) {
      toggleBtn.classList.toggle("menu-active");
      //
      toggleLinks.classList.toggle("open");
    }
  }
});

toggleBtn.onclick = function (e) {
  e.stopPropagation();
  //
  this.classList.toggle("menu-active");
  //
  toggleLinks.classList.toggle("open");
};

toggleLinks.onclick = function (e) {
  e.stopPropagation();
};

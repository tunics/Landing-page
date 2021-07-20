/**
 * Define Global Variables
 */
var mainSections = document.querySelectorAll(".main-sections");
var menuItens = document.querySelector("#menu-itens");
var pageHeader = document.querySelector("#page-header");
const menuBtn = document.querySelector("#menu-btn");
var backTopBt = document.querySelector("#back-top");
var logo = document.querySelector(".menu-logo");
var desktopBreakPoint = window.matchMedia("(min-width: 920px)");
var timer = null;

/**
 * End Global Variables
 * Start Helper Functions
 *
 */
function backToTop(element) {
    element.addEventListener("click", function (e) {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    });
}

function openMenu() {
    menuBtn.addEventListener("click", function (e) {
        if (menuItens.style.display === "none") {
            menuItens.style.display = "inline-flex";
            menuBtn.innerHTML = "close";
        } else {
            menuItens.style.display = "none";
            menuBtn.innerHTML = "menu";
        }
    });
}

function checkScreenSize(breakPoint) {
    if (breakPoint.matches) {
        menuItens.style.display = "inline-flex";
        menuBtn.style.display = "none";
    } else {
        menuBtn.style.display = "inline-block";
        menuBtn.innerHTML = "menu";
        menuItens.style.display = "none";
    }
}

/**
 * End Helper Functions
 * Begin Main Functions
 *
 */

// Build nav
for (let section of mainSections) {
    let item = document.createElement("a");
    item.innerHTML = section.firstElementChild.innerText;
    // item.href = `#${section.id}`;
    menuItens.appendChild(item);
}

// Add class 'active' to section when near top of viewport and change active nav button
document.addEventListener("scroll", function (e) {
    let items = menuItens.children;

    for (var i = 0; i < mainSections.length; i++) {
        if (
            mainSections[i].getBoundingClientRect().y <=
                pageHeader.offsetHeight &&
            mainSections[i].getBoundingClientRect().y >=
                pageHeader.offsetHeight - mainSections[i].offsetHeight
        ) {
            mainSections[i].classList.add("active");
            items[i].classList.add("active");
        } else {
            mainSections[i].classList.remove("active");
            items[i].classList.remove("active");
        }
    }
});

// Hide after stop scrolling
window.addEventListener(
    "scroll",
    function () {
        if (
            (window.scrollY === 0 && timer !== null) ||
            (window.scrollY < window.innerHeight / 2 && timer !== null)
        ) {
            backTopBt.style.display = "none";
            pageHeader.style.display = "block";
            clearTimeout(timer);
        } else {
            if (timer !== null) {
                clearTimeout(timer);
                backTopBt.style.display = "block";
                pageHeader.style.display = "block";
            }
            timer = setTimeout(function () {
                backTopBt.style.display = "none";
                pageHeader.style.display = "none";
            }, 3000);
        }
    },
    false
);

// Scroll to sections
for (var i = 0; i < menuItens.children.length; i++) {
    let section =
        mainSections[i].getBoundingClientRect().y -
        pageHeader.offsetHeight +
        window.scrollY +
        1;
    menuItens.children[i].addEventListener("click", function (e) {
        window.scrollTo({
            top: section,
            behavior: "smooth",
        });
    });
}

/**
 * End Main Functions
 * Begin Events
 *
 */

// Build menu

// Scroll to section on link click

// Set sections as active

// Scroll to top on click
backToTop(backTopBt);
backToTop(logo);

// Hide when not scrolling

// Open Menu on mobile
openMenu();
desktopBreakPoint.addEventListener("change", checkScreenSize);

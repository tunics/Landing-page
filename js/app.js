/**
 * Define Global Variables
 */
var mainSections = document.querySelectorAll(".main-sections");
var menuItens = document.querySelector("#menu-itens");
var pageHeader = document.querySelector("#page-header");
var backTopBt = document.querySelector("#back-top");
var logo = document.querySelector(".menu-logo");
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
        if (window.scrollY === 0 || window.scrollY < window.innerHeight / 2) {
            backTopBt.style.display = "none";
            pageHeader.style.display = "block";
        } else {
            if (timer !== null) {
                clearTimeout(timer);
                backTopBt.style.display = "block";
                pageHeader.style.display = "block";
            }
            timer = setTimeout(function () {
                backTopBt.style.display = "none";
                pageHeader.style.display = "none";
            }, 5000);
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

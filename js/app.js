/**
 * Define Global Variables
 */
const main = document.getElementsByTagName("main")[0];
const mainSections = document.querySelectorAll(".main-sections");
const sectionTxt = document.querySelectorAll(".section-txt");
const menuItens = document.querySelector("#menu-itens");
const pageHeader = document.querySelector("#page-header");
const headerHeight = pageHeader.offsetHeight;
const menuBtn = document.querySelector("#menu-btn");
const backTopBt = document.querySelector("#back-top");
const logo = document.querySelector(".menu-logo");
var desktopBreakPoint = window.matchMedia("(min-width: 992px)");
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
function buildMenu() {
    for (let section of sectionTxt) {
        let item = document.createElement("a");
        item.innerHTML = section.firstElementChild.innerText;
        // item.href = `#${section.id}`;
        menuItens.appendChild(item);
    }
}

// Add class 'active' to section when near top of viewport and change active nav button
function setActive() {
    document.addEventListener("scroll", function () {
        let items = menuItens.children;

        for (var i = 0; i < mainSections.length; i++) {
            if (
                i === mainSections.length - 1 &&
                window.innerHeight + window.scrollY >=
                    document.body.offsetHeight
            ) {
                mainSections[i].classList.add("active");
                items[i].classList.add("active");
            } else if (
                mainSections[i].getBoundingClientRect().top <=
                    window.innerHeight / 2 &&
                mainSections[i].getBoundingClientRect().top >=
                    window.innerHeight / 2 - mainSections[i].offsetHeight
            ) {
                mainSections[i].classList.add("active");
                items[i].classList.add("active");
            } else {
                mainSections[i].classList.remove("active");
                items[i].classList.remove("active");
            }
        }
    });
}

// Hide after stop scrolling
function hideHeader() {
    window.addEventListener(
        "scroll",
        function () {
            if (window.scrollY < window.innerHeight / 2 && timer !== null) {
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
                }, 5000);
            }
        },
        false
    );
}

// Scroll to sections
function scrollToSection() {
    for (var i = 0; i < menuItens.children.length; i++) {
        let section =
            mainSections[i].getBoundingClientRect().top - headerHeight;

        menuItens.children[i].addEventListener("click", function (e) {
            window.scrollTo({
                top: section,
                behavior: "smooth",
            });
        });
    }
}

/**
 * End Main Functions
 * Begin Events
 *
 */
// Build menu
buildMenu();

// Add padding top to main
main.style.paddingTop = headerHeight + "px";

// Set main sections height
mainSections.forEach(
    (el) => (el.style.minHeight = window.innerHeight - headerHeight + "px")
);

// Scroll to section on link click
scrollToSection();

// Set sections as active
setActive();

// Scroll to top on click
backToTop(backTopBt);
backToTop(logo);

// Hide when not scrolling
hideHeader();

// Open Menu on mobile
openMenu();
desktopBreakPoint.addEventListener("change", checkScreenSize);

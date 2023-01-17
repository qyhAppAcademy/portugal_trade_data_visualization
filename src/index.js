import World from "./scripts/world.js";

const EXPORT_URL = "https://qyhappacademy.github.io/portugal_trade_data_visualization/data/exports.json";
const IMPORT_URL = "https://qyhappacademy.github.io/portugal_trade_data_visualization/data/imports.json";

document.addEventListener("DOMContentLoaded", () => {
    createUserGuide()
    let world = new World(IMPORT_URL);
    world.render();

    const toggleBtn = document.getElementById("toggle-trade-button");
    toggleBtn.addEventListener("click", (event) => {
        event.preventDefault();
        
        toggleBtn.children[0].children[0].innerText = world.tradeURL === EXPORT_URL ? "To Exports" : "To Imports";
        document.getElementById("project-title").innerText = world.tradeURL === EXPORT_URL ? "Portugal Exports Data Visualization" : "Portugal Imports Data Visualization";
        reset();
        
        world = world.tradeURL === EXPORT_URL ? new World(IMPORT_URL) : new World(EXPORT_URL);
        world.render();

        // world = world.tradeURL === EXPORT_URL ? new World(IMPORT_URL) : new World(EXPORT_URL);
        // reset(world);
    });
});

function reset() {
    document.getElementById("world").innerHTML = "";
    document.getElementById("world-tooltip").innerHTML = "";
    document.getElementById("range-slider").innerHTML = "";
    document.getElementById("bar-chart").innerHTML = "";
}

function createUserGuide(){
    const userGuide = document.getElementById("user-guide-modal");

    // Get the button that opens the user guide
    document.getElementById("user-guide-button")
        .addEventListener("click", (event) => {
            event.preventDefault();
            userGuide.style.display = "block";
        });

    // Get the <span> element that closes the user guide
    document.getElementsByClassName("close")[0]
        .addEventListener("click", (event) => {
            event.preventDefault();
            userGuide.style.display = "none";
        });

    // When the user clicks anywhere outside of the user guide, close it
    window.addEventListener("click", (event) => {
        // event.preventDefault();
        if (event.target == userGuide) {
            userGuide.style.display = "none";
        }
    });
}

// function reset(world){
//     document.getElementById("world-tooltip").innerHTML = "";
//     document.getElementById("range-slider").innerHTML = "";
//     document.getElementById("bar-chart").innerHTML = "";

//     world.reset(world.tradeURL === EXPORT_URL ? IMPORT_URL : EXPORT_URL);
// }
import World from "./scripts/world.js";

const EXPORT_URL = "https://qyhappacademy.github.io/portugal_trade_data_visualization/data/exports.json";
const IMPORT_URL = "https://qyhappacademy.github.io/portugal_trade_data_visualization/data/imports.json";

document.addEventListener("DOMContentLoaded", () => {
    let world = new World(IMPORT_URL);
    world.render();

    const toggleBtn = document.getElementById("toggle-trade-button");
    toggleBtn.addEventListener("click", (event) => {
        event.preventDefault();
        reset();
        toggleBtn.children[0].children[0].innerText = world.tradeURL === EXPORT_URL ? "To Exports" : "To Imports";
        world = world.tradeURL === EXPORT_URL ? new World(IMPORT_URL) : new World(EXPORT_URL);
        world.render();
    });
});

function reset(){
    const world = document.getElementById("world");
    const worldTooltip = document.getElementById("world-tooltip");
    const rangeSlider = document.getElementById("range-slider");
    const barChart = document.getElementById("bar-chart");
    world.innerHTML = "";
    worldTooltip.innerHTML = "";
    rangeSlider.innerHTML = "";
    barChart.innerHTML = "";
}
import World from "./scripts/world.js";

const EXPORT_URL = "https://qyhappacademy.github.io/portugal_trade_data_visualization/data/exports.json";
const IMPORT_URL = "https://qyhappacademy.github.io/portugal_trade_data_visualization/data/imports.json";

document.addEventListener("DOMContentLoaded", () => {
    const world = new World(IMPORT_URL);
    world.render();

    const toggleBtn = document.getElementById("import-export-button");
    toggleBtn.addEventListener("click", (event) => {
        
    });
});
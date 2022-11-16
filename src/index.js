import World from "./scripts/world.js";

const EXPORT_URL = "https://qyhappacademy.github.io/portugal_trade_data_visualization/data/exports.json";
const IMPORT_URL = "https://qyhappacademy.github.io/portugal_trade_data_visualization/data/imports.json";

document.addEventListener("DOMContentLoaded", () => {
    let world = new World(IMPORT_URL);
    world.render();

    const toggleBtn = document.getElementById("import-export-button");
    toggleBtn.addEventListener("click", (event) => {
        if (world.tradeURL === EXPORT_URL){
            world = new World(IMPORT_URL);
        }
        else {
            world = new World(EXPORT_URL);
        }
        let body = document.getElementsByTagName("body")[0];
        body.innerHTML = '';
        world.render()
    });
});
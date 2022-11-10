import Example from "./scripts/example";

document.addEventListener("DOMContentLoaded", () => {
    console.log("Hello world!");
    // npm run watch
    const main = document.getElementById("main");
    new Example(main);
});
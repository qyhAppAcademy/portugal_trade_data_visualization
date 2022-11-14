import Globe from "./scripts/globe.js";
import { getTradeAmountRange } from "./scripts/trade.js";
import { getSliderRange } from "./scripts/sliderRange.js";
import World from "./scripts/world.js";

document.addEventListener("DOMContentLoaded", () => {
    // npm run watch
    // const main = document.getElementById("main");
    // new Example(main);
    // const canvas = d3.select("#globe");
    // canvas.attr('width', 1000).attr('height', 1000);
    // const context= canvas.node().getContext('2d');

    // const globe = new Globe(context,1000,1000);
    // globe.render();

    // const trade = new Trade();

    // const trades = findTradesByProductGroup();

    // const ul = document.querySelector("ul");
    // trades.forEach((trade) => {
    // });

    // const svg = d3.select('body').append('svg').attr('width', width).attr('height', height);
    
    // const projection = d3.geoMercator().scale(140).translate([width/2, height/1.4]);
    // const path = d3.geoPath(projection);

    // const g = svg.append('g');

    // d3.json('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json')
    //     .then(world => {
    //         const countries = topojson.feature(world, world.objects.countries);
    //         g.selectAll('path')
    //             .data(countries.features)
    //             .enter().append('path')
    //             .attr('class', 'country')
    //             .attr('d', path);
    //     });

    const world = new World();
    world.render();
    getTradeAmountRange();
    // getSliderRange(data);
    // console.log(range);
});
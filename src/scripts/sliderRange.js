import { Trade, findTradesByProductGroup, findTradesByAmountRange } from "./trade.js";

export function getSliderRange(data){
    let sliderRange = d3
        .sliderBottom()
        .min(d3.min(data))
        .max(d3.max(data))
        .width(735)
        .tickFormat(d3.format(''))
        .ticks(5)
        .default([data[0], data[1]])
        .fill('#2196f3')
        .on('onchange', val => {
            // console.log(val);
            // d3.select('p#value-range').text(val.map(d3.format('')).join('-'));
            findTradesByAmountRange(val);
        });

    let gRange = d3
        .select('div#slider-range')
        .append('svg')
        .attr('width', 800)
        .attr('height', 100)
        .append('g')
        .attr('transform', 'translate(30,30)');

    gRange.call(sliderRange);

    d3.select('p#value-range').text(
        sliderRange
            .value()
            .map(d3.format('.2'))
            .join('-')
    );
}
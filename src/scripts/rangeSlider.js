import BarChart from "./barChart.js";

const SLIDER_WIDTH = 850;
const SLIDER_COLOR = '#5c9946';

const CONTAINER_WIDTH = 900;
const CONTAINER_HEIGHT = 90;

class RangeSlider {
    constructor(trades){
        this.trades = trades;

        const top10thTradeAmount = Math.floor(this.trades[9].amount);
        
        this.range = [0, top10thTradeAmount];

        this.barChart = new BarChart(this.trades, this.range);

        let that = this;
        this.slider = d3
            .sliderBottom()
            .min(d3.min(this.range))
            .max(d3.max(this.range))
            .width(SLIDER_WIDTH)
            .tickFormat(d3.format(',.0f'))
            .ticks(10)
            .default([this.range[0], this.range[1]])
            .handle(
                d3.symbol()
                    .type(d3.symbolCircle)
                    .size(200)
            )
            .fill(SLIDER_COLOR)
            .on('onchange', function(range){
                that.range = range;

                that._renderTradePartnersWithinRange();

                that.barChart.render(range);
            });

        this.gRange = d3
            .select('#range-slider')
            .append('svg')
            .attr('width', CONTAINER_WIDTH)
            .attr('height', CONTAINER_HEIGHT)
            .append('g')
            .attr('transform', 'translate(30,30)');
    }

    render(){
        this.gRange.call(this.slider);

        d3.select('p#value-range').text(
            this.slider
                .value()
                .map(d3.format(',.0f'))
                .join('-')
        );
    }

    _renderTradePartnersWithinRange(){
        d3.selectAll(".country").classed("selected-by-range-top-10", false);
        d3.selectAll(".country").classed("selected-by-range", false);
        const countries = d3.selectAll(".country");
        const selected = [];
        this.trades.forEach(trade => {
            if (this.range[0] <= trade.amount && trade.amount <= this.range[1]) {
                countries.each(function(country, i) {
                    const name = country.properties.name;
                    if (trade.partner === name) {
                        selected.push(this);
                    }
                });
            }
        });
        selected.forEach((el, idx) => {
            if (idx < 10){
                d3.select(el).classed("selected-by-range-top-10", true);
            }else{
                d3.select(el).classed("selected-by-range", true);
            }
        });
    }
}

export default RangeSlider;
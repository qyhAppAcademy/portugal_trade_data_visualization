import Trade, { getOrigin } from "./trade.js";
import RangeSlider from "./rangeSlider.js";

const WIDTH = 900;
const HEIGHT = 600;
const WORLD_MAP_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';
const TRADES_URL = "https://qyhappacademy.github.io/portugal_trade_data_visualization/data/all_products.json";

class World {
    constructor() {
        this.width = WIDTH;
        this.height = HEIGHT;

        this.svg = d3.select('#world')
            .append('svg')
            .attr('width', this.width)
            .attr('height', this.height)
            .append("g");

        this.projection = d3.geoMercator()
            .translate([this.width / 2, this.height / 1.5])
            .scale(143);

        this.path = d3.geoPath().projection(this.projection);

        this.worldMap = this._fetchWorldMap();

        this.trades = this._fetchTrades();
    }

    render(){
        this.worldMap
            .then((world) => {
                let that = this;

                let countries = topojson.feature(world, world.objects.countries).features;

                this.trades.then(function(trades) {
                    that.svg.selectAll(".country")
                        .data(countries)
                        .enter()
                        .append("path")
                        .attr("class", "country")
                        .attr("d", that.path)
                        .on('mouseover', function (country) {
                            that.mouseOverCountry(country, this, trades);
                        })
                        .on('mouseout', function (country) {
                            that.mouseOutCountry(country, this);
                        });
                        // .on('mousemove', this.mousemove.bind(this))

                    const top10TradePartners = trades.slice(0, 10).map(trade => trade.partner);
                    that._renderTradePartners(top10TradePartners);

                    that.rangeSlider = new RangeSlider(trades);
                    that.rangeSlider.render();
                });
            });
    }

    mouseOverCountry(country, context, trades){
        d3.select(context)
            .classed("mouseover", true)
            .style("display: block");

        const name = country.properties.name;

        for (let i = 0; i < trades.length; i++) {
            const trade = trades[i];
            if (trade.partner.includes(name) || name.includes(trade.partner)) {
                d3.select("#world-tooltip")
                    .style("display", "inline")
                    .style("left", (d3.event.pageX) + "px")
                    .style("top", (d3.event.pageY) + "px")
                    .insert("div")
                    .classed("world-tooltip-content", true);

                d3.select(".world-tooltip-content")
                    .html(trade.toHTML());

                break;
            }
        }
    }

    mouseOutCountry(country, context){
        // console.log(country);

        d3.select(context)
            .classed("mouseover", false)
            .style("display: none");

        d3.select("#world-tooltip")
            .style("display", "none");

        d3.selectAll(".world-tooltip-content").remove();
    }
    
    mousemove(){

    }

    async _fetchWorldMap() {
        return await d3.json(WORLD_MAP_URL);
    }

    async _fetchTrades() {
        const trades = await d3.json(TRADES_URL);
        const result = [];
        trades.Partner.forEach(trade => {
            result.push(new Trade(
                trade["Partner Name"],
                trade["Year"],
                trade["Trade Flow"],
                trade["Product Group"],
                trade["Export (US$ Thousand)"]));
        });
        result.sort(function (left, right) {
            if (left.amount < right.amount) {
                return 1;
            }
            else if (left.amount > right.amount) {
                return -1;
            }
            else {
                return 0;
            }
        });
        return result;
    }

    _renderTradePartners(partners) {
        d3.selectAll(".country")
            .each(function (country, i) {
                const name = country.properties.name;
                if (partners.some(function (partner) {
                    return partner.includes(name) || name.includes(partner);
                })) {
                    d3.select(this).classed("selected-top-10", true);
                }
                if (name === getOrigin()){
                    d3.select(this).classed("origin", true);
                }
            });
    }
}

export default World;
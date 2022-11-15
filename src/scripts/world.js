import { Trade, findTrades, findTradesByProductGroup, findTopTenTradePartners } from "./trade.js";

const TRADES_URL = "../../data/all_products.json";

const TRADES = findTrades(TRADES_URL);

class World {
    constructor(url) {
        this.url = url;
        this.width = 800;
        this.height = 533;

        this.svg = d3.select('#world')
            .append('svg')
            .attr('width', this.width)
            .attr('height', this.height)
            .append("g");

        this.projection = d3.geoMercator()
            .translate([this.width/2, this.height/1.5])
            .scale(130);

        this.path = d3.geoPath().projection(this.projection);

        this.trades = findTrades(TRADES_URL);
    }

    render(){
        d3.json(this.url)
            .then((world) => {
                let countries = topojson.feature(world, world.objects.countries).features;
                let that = this;
                this.svg.selectAll(".country")
                    .data(countries)
                    .enter()
                    .append("path")
                    .attr("class", "country")
                    .attr("d", this.path)
                    .on('mouseover', function(country) {
                        that.mouseOverCountry(country, that.trades);
                    })
                    .on('mouseout', this.mouseOutCountry)
                    // .on('mousemove', this.mousemove.bind(this))

                    findTopTenTradePartners();
            });
    }

    mouseOverCountry(country, trades){
        console.log(this);
        debugger
        d3.select(this)
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

    mouseOutCountry(){
        d3.select(this)
            .classed("mouseover", false)
            .style("display: none");

        d3.select("#world-tooltip")
            .style("display", "none");

        d3.selectAll(".world-tooltip-content").remove();
    }
    
    mousemove(){

    }
}

export default World;
import { Trade, findTradesByProductGroup } from "./trade.js";

const TRADES = findTradesByProductGroup();

class World {
    constructor() {
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
        this.trades = findTradesByProductGroup();
        this.tooltip_x = undefined;
        this.tooltip_y = undefined;
    }

    render(){
        d3.json('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json')
            .then(this._render.bind(this));
    }

    _render(world){
        let countries = topojson.feature(world, world.objects.countries).features;
        this.svg.selectAll(".country")
            .data(countries)
            .enter()
            .append("path")
            .attr("class", "country")
            .attr("d", this.path)
            // .attr("data-country", function(d){
            //     return d.properties.name;
            // })
            .on('mouseover', this.countryOn)
            .on('mousemove', this.mousemove.bind(this))
            .on('mouseout', this.countryOff)
            .each((country => {
                console.log(country);
            }));
            // .on("click", function(d){
            //     d3.select(this).classed("selected", true);
            // });
            // .attr("fill", "#cccccc");
    }

    countryOn(d){
        let countryName = d.properties.name;
        const countryElement = d3.select(this);
        countryElement.classed("selected", true);
        countryElement.style("display: block");
        for(let i=0; i<TRADES.length; i++){
            const trade = TRADES[i];
            if(trade.partner.includes(countryName) || countryName.includes(trade.partner)){
                // const htmlEle = document.querySelector("ul");
                // const li = document.createElement("li");
                // li.append(trade.partner);
                // htmlEle.appendChild(li);
                d3.select("#world-tooltip")
                    .style("display", "inline")
                    .style("left", (d3.event.pageX) + "px")
                    .style("top", (d3.event.pageY) + "px")
                    .insert("p")
                    .classed("world-tooltip-content", true)
                    
                d3.select(".world-tooltip-content")
                    .html(trade.toHTML());
                // console.log(trade.toHTML());
                break;
            }
        }
    }

    countryOff(d){
        d3.select(this).classed("selected", false);
        // const htmlEle = document.querySelector("ul");
        // while(htmlEle.firstChild){
        //     htmlEle.removeChild(htmlEle.firstChild);
        // }
        // this.tooltip_x = undefined;
        // this.tooltip_y = undefined;

        d3.select("#world-tooltip").style("display", "none")
        d3.selectAll(".world-tooltip-content").remove();
    }
    
    mousemove(){
        // if (this.tooltip_x === undefined){
        //     this.tooltip_x = d3.event.pageX;
        // }
        // if (this.tooltip_y === undefined){
        //     this.tooltip_y = d3.event.pageY;
    }

    // render(){
    //     d3.json('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json')
    //         .then(world => {
    //             const countries = topojson.feature(world, world.objects.countries);
    //             g.selectAll('path')
    //                 .data(countries.features)
    //                 .enter().append('path')
    //                 .attr('class', 'country')
    //                 .attr('d', path);
    //         });
    // }
}

export default World;
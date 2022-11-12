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
    }

    render(){
        d3.json('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json')
            .then(this._render.bind(this));
    }

    _render(world){
        let countries = topojson.feature(world, world.objects.countries).features;
        console.log(countries);
        this.svg.selectAll(".country")
            .data(countries)
            .enter()
            .append("path")
            .attr("class", "country")
            .attr("d", this.path)
            .on('mouseover', this.countryOn)
            .on('mouseout', this.countryOff);
            // .on("click", function(d){
            //     d3.select(this).classed("selected", true);
            // });
            // .attr("fill", "#cccccc");
    }

    countryOn(d){
        let countryName = d.properties.name;
        console.log(countryName);
        d3.select(this).classed("selected", true);
        for(let i=0; i<TRADES.length; i++){
            const trade = TRADES[i];
            if(trade.partner.includes(countryName) || countryName.includes(trade.partner)){
                console.log(trade);
                const htmlEle = document.querySelector("ul");
                const li = document.createElement("li");
                li.append(trade.partner);
                htmlEle.appendChild(li);
                break;
            }
        }
    }

    countryOff(d){
        d3.select(this).classed("selected", false);
        const htmlEle = document.querySelector("ul");
        while(htmlEle.firstChild){
            htmlEle.removeChild(htmlEle.firstChild);
        }
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
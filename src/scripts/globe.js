const COLOR_OCEAN = '#111'
const COLOR_LAND = '#111'
const COLOR_GRATICULE = '#ccc'
const COLOR_COUNTRY = '#a00'

class Globe {
    constructor(context, width, height) {
        this.context = context;
        this.width = width;
        this.height = height;
        
        this.ocean = {type: "Sphere"};
        this.projection = d3.geoOrthographic().precision(0.1);
        this.graticule = d3.geoGraticule10();
        this.path = d3.geoPath(this.projection).context(this.context);

        // var v0 // Mouse position in Cartesian coordinates at start of drag gesture.
        // var r0 // Projection rotation as Euler angles at start.
        // var q0 // Projection rotation as versor at start.
        // var lastTime
        // var degPerMs
        
        this.land = 0;
        this.countries = 0;
    }

    render(){
        this.context.clearRect(0, 0, this.width, this.height);
        this._fill(this.ocean, COLOR_OCEAN);
        // this.stroke(this.graticule, COLOR_GRATICULE);
        // this._fill(this.land, COLOR_LAND);
        console.log("render");
    }

    _fill(obj, color){
        console.log(this);
        this.context.beginPath();
        this.path(obj);
        this.context.fillStyle = color;
        this.context.fill();
    }
}

export default Globe;

// function comments() {
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
// }

// import Globe from "./scripts/globe.js";
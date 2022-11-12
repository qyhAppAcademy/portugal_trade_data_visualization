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
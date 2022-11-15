export function getBarChart(range) {
    d3.select("#bar-chart").select("svg").remove();

    // set the dimensions and margins of the graph
    const margin = { top: 40, right: 40, bottom: 60, left: 100 };
    const width = 800 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    const svg = d3.select("#bar-chart")
        .append("svg")
        .attr("width", 800)
        .attr("height", 400)
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);
    
    // Parse the Data
    d3.json("./data/all_products.json").then(function (data) {
        const data2 = data.Partner.filter(trade => {
            let amount = parseFloat(trade["Export (US$ Thousand)"]);
            // console.log(range);
            return range[0] <= amount && amount <= range[1]; 
        });
        console.log(data2);
        const data3 = data2.map(d => {
            return { Country: d["Partner Name"], Value: parseFloat(d["Export (US$ Thousand)"])};
        });

        data3.sort(function compareFn(a, b) {
            if (a.Value < b.Value) {
                return -1;
            }
            else if (a.Value > b.Value) {
                return 1;
            }
            else {
                return 0;
            }
        });

        const data4 = data3.length > 10 ? data3.slice(0, 11) : data3;
        console.log(data4);
        // Add X axis
        const x = d3.scaleLinear()
            .domain([0, range[1]])
            .range([0, width]);
        svg.append("g")
            .attr("transform", `translate(0, ${height})`)
            .call(d3.axisBottom(x))
            .selectAll("text")
            .attr("transform", "translate(-10,0)rotate(-45)")
            .style("text-anchor", "end");

        // Y axis
        const y = d3.scaleBand()
            .range([0, height])
            .domain(data4.map(d => d.Country))
            .padding(.2);
        svg.append("g")
            .call(d3.axisLeft(y))

        //Bars
        svg.selectAll("myRect")
            .data(data4)
            .join("rect")
            .attr("x", x(0))
            .attr("y", d => y(d.Country))
            .attr("width", d => x(d.Value))
            .attr("height", y.bandwidth())
            .attr("fill", "#69b3a2")

    });
}

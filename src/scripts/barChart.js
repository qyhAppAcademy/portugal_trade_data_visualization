export function getBarChart() {
    d3.json("./data/all_products.json")
        .then((response) => response.json())
        .then((json) => {
            const data = json.Partner;
            // json.Partner.forEach(trade => {
            //     trades.push(trade);    
            // });
            // console.log(data);

            const width = 800;

            const x = d3.scaleLinear()
                .domain([0, d3.max(data, d => console.log(d))])
                .range([0, width]);

            // const y = d3.scaleBand()
            //     .domain(d3.map(d => d.name))
            //     .range([0, 20 * data.length]);

            const barChartSVG = d3.select("#bar-chart")
                .append("svg")
                .attr("width", width)
                .attr("height", y.range()[1])
                .attr("font-family", "sans-serif")
                .attr("font-size", "10")
                .attr("text-anchor", "end");

            // const bar = barChartSVG.selectAll("g")
            //     .data(data)
            //     .join("g")
            //     .attr("transform", d => `translate(0, ${y(d.name)})`);

            // bar.append("rect")
            //     .attr("fill", "steelblue")
            //     .attr("width", d => x(d.value))
            //     .attr("height", y.bandwidth() - 1);

            // bar.append("text")
            //     .attr("fill", "white")
            //     .attr("x", d => x(d.value) - 3)
            //     .attr("y", (y.bandwidth() - 1) / 2)
            //     .attr("dy", "0.35em")
            //     .text(d => d.value);
        });

    const width = 800;
    
    const barChartSVG = d3.select("#bar-chart")
        .append("svg")
        .attr("width", width)
        .attr("height", y.range()[1])
        .attr("font-family", "sans-serif")
        .attr("font-size", "10")
        .attr("text-anchor", "end");

    d3.json("./data/all_products.json", function (data) {

        var x = d3.scaleLinear()
            .domain([0, 16000000])
            .range([0, width]);

        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x))
            .selectAll("text")
            .attr("transform", "translate(-10,0)rotate(-45)")
            .style("text-anchor", "end");

        // Y axis
        var y = d3.scaleBand()
            .range([0, height])
            .domain(data.map(function (d) { return d.Country; }))
            .padding(.1);
        svg.append("g")
            .call(d3.axisLeft(y))

        //Bars
        svg.selectAll("myRect")
            .data(data)
            .enter()
            .append("rect")
            .attr("x", x(0))
            .attr("y", function (d) { return y(d.Country); })
            .attr("width", function (d) { return x(d.Value); })
            .attr("height", y.bandwidth())
            .attr("fill", "#69b3a2")


        // .attr("x", function(d) { return x(d.Country); })
        // .attr("y", function(d) { return y(d.Value); })
        // .attr("width", x.bandwidth())
        // .attr("height", function(d) { return height - y(d.Value); })
        // .attr("fill", "#69b3a2")

    })
}

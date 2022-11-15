export function getBarChart() {
    const data = [4, 8, 15, 16, 23, 42];

    const x = d3.scaleLinear()
        .domain([0, d3.max(data)])
        .range([0, 420]);

    d3.select("#bar-chart")
        .data(data)
        .join("div")
        .style("background", "steelblue")
        .style("padding", "3px")
        .style("margin", "1px")
        .style("width", d => `${x(d)}px`)
        .text(d => d);
}

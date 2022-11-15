export function getBarChart() {
    const data = [4, 8, 15, 16, 23, 42];

    d3.select("#bar-chart")
        .data(data)
        .join("div")
        .style("background", "steelblue")
        .style("padding", "3px")
        .style("margin", "1px")
        .style("width", d => `${d * 10}px`)
        .text(d => d);
}
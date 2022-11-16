const WIDTH = 1000;
const HEIGHT = 500;
const BAR_COLOR = "#ffa876";

class BarChart{
    constructor(trades, range){
        this.trades = trades;

        this.range = range;

        this.margin = { top: 20, right: 90, bottom: 80, left: 180 };

        this.width = WIDTH - this.margin.left - this.margin.right;
        this.height = HEIGHT - this.margin.top - this.margin.bottom;
    }

    render(range){
        d3.select("#bar-chart").select("svg").remove();
        this.svg = d3.select("#bar-chart")
            .append("svg")
            .attr("width", WIDTH)
            .attr("height", HEIGHT)
            .append("g")
            .attr("transform", `translate(${this.margin.left}, ${this.margin.top})`)
            .attr("font-family", "sans-serif")
            .style("font-size", "1.2em");

        this.range = range;

        const tradesWithinRange = this.trades.filter(trade => {
            return this.range[0] <= trade.amount && trade.amount <= this.range[1];
        });

        const trades = tradesWithinRange.map(trade => {
            return {
                partner: trade.partner,
                amount: trade.amount
            };
        });

        trades.sort(function(left, right) {
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

        const top10Trades = trades.length > 10 ? trades.slice(0, 10) : trades;
        
        // X axis
        const x = d3.scaleLinear()
            .domain([0, this.range[1]])
            .range([0, this.width]);

        this.svg.append("g")
            .attr("transform", `translate(0, ${this.height})`)
            .call(d3.axisBottom(x))
            .selectAll("text")
            .attr("transform", "translate(-10,0)rotate(-45)")
            .style("text-anchor", "end")
            .attr("font-family", "sans-serif")
            .style("font-size", "1.2em");

        // Y axis
        const y = d3.scaleBand()
            .range([0, this.height])
            .domain(top10Trades.map(trade => trade.partner))
            .padding(.4);

        this.svg.append("g")
            .call(d3.axisLeft(y))
            .attr("font-family", "sans-serif")
            .style("font-size", "1em");

        // Bars with animation
        this.svg.selectAll("myRect")
            .data(top10Trades)
            .join("rect")
            .attr("x", x(0))
            .attr("y", trade => y(trade.partner))
            .attr("width", 0)
            .transition()
            .duration(1000)
            .delay(function (trade, i) { return i * 50 })
            .attr("width", trade => x(trade.amount))
            .attr("height", y.bandwidth())
            .attr("fill", BAR_COLOR);
        
        // Label
        this.svg.append('text')
            .attr('x', this.width / 2)
            .attr('y', this.height + 70)
            .attr('text-anchor', 'middle')
            .text('Trade Amount (US$ Thousand)');
    }
}

export default BarChart;
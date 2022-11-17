# Portugal Trade Data Visualization

[Portugal Trade Data Visualization](https://qyhappacademy.github.io/portugal_trade_data_visualization/) is a data visualization of Portugal imports and exports trade. It displays every nation Portugal trades with on a global map. Users are able to interact with the map to get an in-depth look into the trade data. This project is inspired by the history of Portugal being a strong trade nation since the Age of Discovery.


## <a name="wireframes"></a> Wireframes

![alt text](https://github.com/qyhAppAcademy/portugal_trade_data_visualization/blob/main/wireframe.png)

* At the top, a world map on which users can interact with, and view trade partners of Portugal.

* In the middle, a range slider for users to filter trade partners to render on the map and on the bar chart.

* At the bottom, a bar chart for users to see the trade value of each trade partner.


## <a name="functionality"></a> Functionality & MVPs

### With this Portugal Trade Data Visualization App, users are able to:

- [x] Browse individual trade partner of Portugal on the map

- [x] Filter trade partners to display based on trade values

- [x] View comparisons of trade values among trade partners

- [x] Toggle between imports data and exports data


## <a name="technologies"></a> Technologies, Libraries, APIs

### This project uses the following technologies:

* `HTML` to structure the app

* `SCSS` to style

* `JavaScript` to implement application logic, fetch data, create animations, and add interactivity

* `D3.js` to display a world map, a range slider, and a bar chart

* `Webpack` to bundle and transpile the source JavaScript code

* `NPM` to manage project dependencies

* Trade data is first fetched using d3.json. After the promise is fulfilled, data then is processed into trade objects and pushed into an array. Afterwards, that array is sorted and returned.

```js
    async _fetchTrades() {
        const trades = await d3.json(this.tradeURL);
        const result = [];
        return this.worldMap.then((world) => {
            let countries = topojson
                                .feature(world, world.objects.countries)
                                .features
                                .map((feature)=>{
                                    return feature.properties.name;
                                });
            trades.Partner.forEach(trade => {
                const partner = trade["Partner Name"].trim();
                const matchedPartner = countries.find((country) => {
                    if(country.includes(partner) || partner.includes(country)){
                        return country;
                    }
                });
                if (matchedPartner !== undefined){
                    let tradeAmount = trade["Export (US$ Thousand)"] || trade["Import (US$ Thousand)"];
                    result.push(new Trade(
                        matchedPartner,
                        trade["Year"],
                        trade["Trade Flow"],
                        trade["Product Group"],
                        tradeAmount));
                }
            });
            result.sort(function (left, right) {
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
            return result;
        });
    }
```

* World map is rendered by drawing each country in a D3 SVG element. Top 10 trade partners are highlighted. Each country is then bounded with a MOUSEOVER, a MOUSEMOVE, and a MOUSEOUT listener for users to view its trade data when hovered with a mouse.

```js
    render(){
        this.worldMap
            .then((world) => {
                let that = this;

                let countries = topojson.feature(world, world.objects.countries).features;

                this.trades.then(function(trades) {
                    that.svg.selectAll(".country")
                        .data(countries)
                        .enter()
                        .append("path")
                        .attr("class", "country")
                        .attr("d", that.path)
                        .on('mouseover', function (country) {
                            that.mouseOverCountry(country, this, trades);
                        })
                        .on('mousemove', function (country) {
                            that.mouseMove(country, this);
                        })
                        .on('mouseout', function (country) {
                            that.mouseOutCountry(country, this);
                        });

                    const top10TradePartners = trades.slice(0, 10).map(trade => trade.partner);
                    that._renderTradePartners(top10TradePartners);

                    that.rangeSlider = new RangeSlider(trades);
                    that.rangeSlider.render();
                });
            });
    }
```

* Trade partners within a trade value range are first selected. Then, the top 10 trade partners within that range and the rest are rendered with 2 different color.

```js
    _renderTradePartnersWithinRange(){
        d3.selectAll(".country").classed("selected-by-range-top-10", false);
        d3.selectAll(".country").classed("selected-by-range", false);
        const countries = d3.selectAll(".country");
        const selected = [];
        this.trades.forEach(trade => {
            if (this.range[0] <= trade.amount && trade.amount <= this.range[1]) {
                countries.each(function(country, i) {
                    const name = country.properties.name;
                    if (trade.partner === name) {
                        selected.push(this);
                    }
                });
            }
        });
        selected.forEach((el, idx) => {
            if (idx < 10){
                d3.select(el).classed("selected-by-range-top-10", true);
            }else{
                d3.select(el).classed("selected-by-range", true);
            }
        });
    }
```

* Bar chart animation is created using transition, duration, and delay.

```js
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
```

## <a name="implementation-timeline"></a> Implementation Timeline

* Friday & Weekend: Setup project, getting webpack up and running. Get the world map to display on the screen, and spend time getting comfortable with d3.js.

* Monday: Create a browsing functionality on the world map to enable users to view each trade partner’s data in detail.

* Tuesday: Create a range slider for users to filter trade partners on the map, based on trade value.

* Wednesday: Create a bar chart for users to view the trade data of each partner.

* Thursday Morning: Deploy to Github pages.


## <a name="future-implementations"></a> Future Implementations:

* Add more statistical analysis on trades.

* Use a 3D globe to display trade nations.

* On the globe, display major trade routes that Portugal uses.


## <a name="licensing"></a> CC Licensing:

* Portugal Trade Data from World Integrated Trade Solution (https://wits.worldbank.org/).
import { range } from "d3";
import { getSliderRange } from "./sliderRange.js";

const ORIGIN = "Portugal";
const TOP_FIVE_AMOUNT = 800000;

class Trade {
    constructor(partner, year, tradeFlow, productGroup, amount){
        this.origin = ORIGIN;
        this.partner = partner.trim();
        this.year = year.trim();
        this.tradeFlow = tradeFlow.trim();
        this.productGroup = productGroup.trim();
        this.amount = amount.trim();
    }

    toHTML() {
        return `<ul>
                    <li>Trade Product ${this.productGroup}</li>
                    <li>${this.tradeFlow} ${this.tradeFlow === 'Export' ? 'to' : 'from'} ${this.partner}</li>
                    <li>Year ${this.year}</li>
                    <li>Trade Amount $${this.amount}</li>
                </ul>`
    }
}

function findTrades(url){
    const result = [];
    fetch(url)
        .then((response) => response.json())
        .then((json) => {
            json.Partner.forEach(trade => {
                result.push(new Trade(
                    trade["Partner Name"],
                    trade["Year"],
                    trade["Trade Flow"],
                    trade["Product Group"],
                    trade["Export (US$ Thousand)"]));
            });
        });
    return result;
}

export function findTradesByProductGroup() {
    return findTrades("./data/all_products.json");
}

export function findTradesByAnimal() {
    const result = [];
    fetch("./data/all_products.json")
        .then((response) => response.json())
        .then((json) => {
            json.Partner.forEach(trade => {
                result.push(new Trade(
                    trade["Partner Name"],
                    trade["Year"],
                    trade["Trade Flow"],
                    trade["Product Group"],
                    trade["Export (US$ Thousand)"]));
            });
        });
    return result;
}

export function findTradesByAmountRange(range) {
    fetch("./data/all_products.json")
        .then((response) => response.json())
        .then((json) => {
            const countries = d3.selectAll(".country").classed("selected-by-range", false);
            // console.log(countries);
            json.Partner.forEach(trade => {
                if (range[0] <= parseFloat(trade["Export (US$ Thousand)"]) 
                    && parseFloat(trade["Export (US$ Thousand)"]) <= range[1]) {
                    countries.each(function(d, i) {
                        const countryName = d.properties.name;
                        if (trade["Partner Name"].includes(countryName) || countryName.includes(trade["Partner Name"])) {
                            // console.log(this)
                            d3.select(this).classed("selected-by-range", true);
                        }
                    });
                }
            });
        });
}

export function findTopTenTradePartners() {
    fetch("./data/all_products.json")
        .then((response) => response.json())
        .then((json) => {
            const trades = [];
            json.Partner.forEach(trade => {
                trades.push(trade);
            });
            trades.sort(function compareFn(a, b){
                if (parseFloat(a["Export (US$ Thousand)"]) < parseFloat(b["Export (US$ Thousand)"])) {
                    return -1;
                }
                else if (parseFloat(a["Export (US$ Thousand)"]) > parseFloat(b["Export (US$ Thousand)"])) {
                    return 1;
                }
                else {
                    return 0;
                }
            });
            // const countriesList = d3.selectAll(".country");
            d3.selectAll(".country").each(function (d, i) {
                const countryName = d.properties.name;
                const topTenTradePartners = trades.slice(trades.length - 10).map(function (trade) {
                        return trade["Partner Name"];
                    })
                if (topTenTradePartners.includes(countryName) || topTenTradePartners.some(function(name){
                    return countryName.includes(name);
                })) {
                    d3.select(this).classed("selected-top-10", true);
                }
            });
        });
}

export function getTradeAmountRange() {
    // findTrades("./data/all_products.json", (trades) => {
    //     console.log(trades);
    //     for (let i = 0; i < trades.length; i++) {
    //         console.log(trades[i]);
    //         let amount = parseInt(trades[i].amount);

    //         if (min === undefined) {
    //             min = amount;
    //         }
    //         if (max === undefined) {
    //             max = amount;
    //         }
    //         min = amount < min ? amount : min;
    //         max = amount > max ? amount : max;
    //     };
    //     return [min, max];
    // });
    fetch("./data/all_products.json")
        .then((response) => response.json())
        .then((json) => {
            // let max = TOP_FIVE_AMOUNT;
            // json.Partner.forEach(trade => {
            //     let amount = parseFloat(trade["Export (US$ Thousand)"]);
            //     max = amount > max ? amount : max;
            // });
            const trades = [];
            json.Partner.forEach(trade => {
                trades.push(parseFloat(trade["Export (US$ Thousand)"]));
            });
            trades.sort(function compareFn(a, b) {
                if (a < b) {
                    return -1;
                }
                else if (a > b) {
                    return 1;
                }
                else {
                    return 0;
                }
            });
            // console.log(trades);
            // amounts.sort();
            // console.log(amounts);
            // const range = [
            //     amounts[0], 
            //     amounts[Math.floor(1 * ((amounts.length - 1) / 4))],
            //     amounts[Math.floor(2 * ((amounts.length - 1) / 4))], 
            //     amounts[Math.floor(3 * ((amounts.length - 1) / 4))],
            //     amounts[Math.floor(amounts.length - 1)]];
            // console.log(trades[trades.length - 10]);
            // getSliderRange([0, trades[trades.length-10]]);
            getSliderRange([0, Math.ceil(trades[trades.length - 10])]);
        });
}

// let range = findTradeAmountRange();
// let data = [0, 0.005, 0.01, 0.015, 0.02, 0.025];
// getSliderRange(range);
// console.log(range);

export default Trade;
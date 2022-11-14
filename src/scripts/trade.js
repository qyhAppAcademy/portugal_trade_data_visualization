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
            let max = TOP_FIVE_AMOUNT;
            json.Partner.forEach(trade => {
                let amount = parseFloat(trade["Export (US$ Thousand)"]);
                max = amount > max ? amount : max;
            });
            // amounts.sort();
            // console.log(amounts);
            // const range = [
            //     amounts[0], 
            //     amounts[Math.floor(1 * ((amounts.length - 1) / 4))],
            //     amounts[Math.floor(2 * ((amounts.length - 1) / 4))], 
            //     amounts[Math.floor(3 * ((amounts.length - 1) / 4))],
            //     amounts[Math.floor(amounts.length - 1)]];
            getSliderRange([0, TOP_FIVE_AMOUNT]);
        });
}

// let range = findTradeAmountRange();
// let data = [0, 0.005, 0.01, 0.015, 0.02, 0.025];
// getSliderRange(range);
// console.log(range);

export default Trade;
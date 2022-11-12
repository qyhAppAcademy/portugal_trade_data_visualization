const ORIGIN = "Portugal";

class Trade {
    constructor(partner, year, tradeFlow, productGroup, amount){
        this.origin = ORIGIN;
        this.partner = partner;
        this.year = year;
        this.tradeFlow = tradeFlow;
        this.productGroup = productGroup;
        this.amount = amount;
    }
}

export function findTradesByProductGroup() {
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

export default Trade;
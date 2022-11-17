const ORIGIN = "Portugal";

class Trade {
    constructor(partner, year, tradeFlow, productGroup, amount){
        this.origin = ORIGIN;
        this.partner = partner.trim();
        this.year = parseInt(year.trim());
        this.tradeFlow = tradeFlow.trim();
        this.productGroup = productGroup.trim();
        this.amount = parseFloat(amount.trim());
    }

    toHTML() {
        return `<ul>
                    <li>In ${this.year}</li>
                    <li>${this.productGroup}</li>
                    <li>${this.tradeFlow} ${this.tradeFlow === 'Export' ? 'to' : 'from'} ${this.partner}</li>
                    <li>Trade Amount $${(this.amount * 1000).toLocaleString("en-US")}</li>
                </ul>`;
    }
}

export function getOrigin(){
    return ORIGIN;
}

export default Trade;
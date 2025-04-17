interface Trade {
  quantity: number;
  price: number;
  fee: number;
  date: string;
}

class ETFBacktest {
  private initialCapital: number;
  private cash: number;
  private holdings: number;
  private trades: Trade[];
  private dailyKLine: { date: string; price: number }[];

  constructor(initialCapital: number) {
    this.initialCapital = initialCapital;
    this.cash = initialCapital;
    this.holdings = 0;
    this.trades = [];
    this.dailyKLine = [];
  }

  buy(quantity: number, price: number, fee: number, date: string) {
    const cost = quantity * price + fee;
    if (cost > this.cash) {
      throw new Error("Insufficient funds to buy");
    }
    this.cash -= cost;
    this.holdings += quantity;
    this.trades.push({ quantity, price, fee, date });
  }

  sell(quantity: number, price: number, fee: number, date: string) {
    if (quantity > this.holdings) {
      throw new Error("Insufficient holdings to sell");
    }
    const revenue = quantity * price - fee;
    this.cash += revenue;
    this.holdings -= quantity;
    this.trades.push({ quantity: -quantity, price, fee, date });
  }

  addDailyKLine(date: string, price: number) {
    this.dailyKLine.push({ date, price });
  }

  calculateDailyReturns() {
    const returns = [];
    for (let i = 1; i < this.dailyKLine.length; i++) {
      const prev = this.dailyKLine[i - 1];
      const curr = this.dailyKLine[i];
      const dailyReturn = (curr.price - prev.price) / prev.price;
      returns.push({ date: curr.date, dailyReturn });
    }
    return returns;
  }

  calculatePosition() {
    return {
      cash: this.cash,
      holdings: this.holdings,
      totalValue:
        this.cash +
        this.holdings *
          (this.dailyKLine.length > 0
            ? this.dailyKLine[this.dailyKLine.length - 1].price
            : 0),
    };
  }
}

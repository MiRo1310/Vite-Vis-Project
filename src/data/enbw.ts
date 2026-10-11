class Enbw {
  private unit = "KWh";
  private data = [
    { kwh: 28, price: 16.64, date: "06.10.2026", unitPrice: 56 },
    { kwh: 35, price: 18.03, date: "21.09.2026", unitPrice: 51 },
    { kwh: 18, price: 9.38, date: "21.09.2026", unitPrice: 51 },
    { kwh: 41, price: 21.1, date: "21.09.2026", unitPrice: 51 },
    { kwh: 37, price: 18.65, date: "15.09.2026", unitPrice: 51 },
    { kwh: 1.5, price: 0.74, date: "14.09.2026", unitPrice: 51 },
  ];

  public get totalPrice() {
    const total = this.data.reduce((prev, curr) => prev + curr.price, 0);
    return { price: total, toString: total + " " + "€" };
  }

  public get totalKW() {
    const total = this.data.reduce((prev, curr) => prev + curr.kwh, 0);
    return { value: total, toString: total + " " + this.unit };
  }
}

export default new Enbw();

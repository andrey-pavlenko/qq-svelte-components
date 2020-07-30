const defaultChecked = true;

class Item implements ItemSource {
  public readonly pos: number;
  public readonly name: string;
  public readonly nights: number;
  public readonly extra_nights: number;
  public readonly nightsStr: string;
  public readonly checkin: string;
  public readonly initial_price: number;
  public readonly price: number;
  public readonly currency: string;

  public checked: boolean;

  public readonly checkinStr: string;
  public readonly initialPriceStr: string;
  public readonly priceStr: string;

  constructor(item: ItemSource) {
    Object.assign(this, item);
    this.checked = defaultChecked;
    this.checkinStr = Item.formmatDate(new Date(this.checkin));
    this.initialPriceStr = Item.formatNumber(this.initial_price);
    this.priceStr = Item.formatNumber(this.price);
    this.nightsStr = Item.pluralNights(this.nights, this.extra_nights);
  }

  getNewPrice(params?: CalcParams): number {
    if (params == null && !this.checked) {
      return this.price;
    }

    let newPrice =
      params.action === 'revert' ? this.initial_price : this[params.priceKey];

    if (params.action !== 'revert') {
      if (params.calcValue != null) {
        const amount =
          params.calcValue.type === 'amount'
            ? params.calcValue.value
            : (newPrice / 100) * params.calcValue.value;
        newPrice = Math.round(
          params.action == 'discount' ? newPrice - amount : newPrice + amount
        );
      }
    }

    if (params.round != null) {
      newPrice =
        Math[params.round.method](newPrice / params.round.to) * params.round.to;
    }

    if (Number.isFinite(params.decrease) && params.decrease > 0) {
      newPrice -= params.decrease;
    }
    return newPrice;
  }

  static formmatDate(date: Date): string {
    return date.toLocaleDateString();
  }

  static formatNumber(num: number): string {
    return num.toLocaleString();
  }

  static pluralNights(nights: number, extra?: number): string {
    if (!Number.isInteger(extra)) {
      extra = 0;
    }

    const plurals = {
      zero: 'ночей',
      one: 'ночь',
      two: 'ночи',
      few: 'ночи',
      many: 'ночей'
    };

    let plural = 'unknown';

    // @ts-ignore
    if (Intl != null && Intl.PluralRules) {
      // @ts-ignore
      plural = new Intl.PluralRules('ru-RU').select(extra > 0 ? extra : nights);
    }
    return `${nights}${extra > 0 ? '+' + extra : ''} ${
      plurals[plural] || 'ночей'
    }`;
  }
}

export default Item;

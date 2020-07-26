import Item from './Item';

const baseItem = {
  pos: 0,
  checkin: '2020-11-11',
  currency: 'RUB',
  name: 'Test hotel',
  nights: 10,
  extra_nights: 0
};

describe('Item', () => {
  it('revert', () => {
    expect(
      new Item({
        ...baseItem,
        ...{ price: 100000, initial_price: 100 }
      }).getNewPrice({ action: 'revert', priceKey: 'initial_price' })
    ).toBe(100);

    expect(
      new Item({
        ...baseItem,
        ...{ price: 100000, initial_price: 100 }
      }).getNewPrice({ action: 'revert', priceKey: 'price' })
    ).toBe(100);

    expect(
      new Item({
        ...baseItem,
        ...{ price: 100, initial_price: 100000 }
      }).getNewPrice({ action: 'revert', priceKey: 'initial_price' })
    ).toBe(100000);

    expect(
      new Item({
        ...baseItem,
        ...{ price: 100, initial_price: 100000 }
      }).getNewPrice({ action: 'revert', priceKey: 'price' })
    ).toBe(100000);
  });

  it('discount amount', () => {
    const item = new Item({
      ...baseItem,
      ...{ price: 1000, initial_price: 2000 }
    });

    expect(
      item.getNewPrice({
        action: 'discount',
        priceKey: 'price',
        calcValue: {
          type: 'amount',
          value: 100
        }
      })
    ).toBe(900);
    expect(
      item.getNewPrice({
        action: 'discount',
        priceKey: 'initial_price',
        calcValue: {
          type: 'amount',
          value: 100
        }
      })
    ).toBe(1900);
    expect(
      item.getNewPrice({
        action: 'discount',
        priceKey: 'price',
        calcValue: {
          type: 'amount',
          value: 99.9
        }
      })
    ).toBe(900);
    expect(
      item.getNewPrice({
        action: 'discount',
        priceKey: 'initial_price',
        calcValue: {
          type: 'amount',
          value: 99.9
        }
      })
    ).toBe(1900);
    expect(
      item.getNewPrice({
        action: 'discount',
        priceKey: 'price',
        calcValue: {
          type: 'amount',
          value: 99.1
        }
      })
    ).toBe(901);
    expect(
      item.getNewPrice({
        action: 'discount',
        priceKey: 'initial_price',
        calcValue: {
          type: 'amount',
          value: 99.1
        }
      })
    ).toBe(1901);
    expect(
      item.getNewPrice({
        action: 'discount',
        priceKey: 'price'
      })
    ).toBe(1000);
    expect(
      item.getNewPrice({
        action: 'discount',
        priceKey: 'initial_price'
      })
    ).toBe(2000);
  });

  it('discount percent', () => {
    const item = new Item({
      ...baseItem,
      ...{ price: 1000, initial_price: 2000 }
    });
    expect(
      item.getNewPrice({
        action: 'discount',
        priceKey: 'price',
        calcValue: {
          type: 'percent',
          value: 10
        }
      })
    ).toBe(900);
    expect(
      item.getNewPrice({
        action: 'discount',
        priceKey: 'initial_price',
        calcValue: {
          type: 'percent',
          value: 10
        }
      })
    ).toBe(1800);
    expect(
      item.getNewPrice({
        action: 'discount',
        priceKey: 'price',
        calcValue: {
          type: 'percent',
          value: 33.333
        }
      })
    ).toBe(667);
    expect(
      item.getNewPrice({
        action: 'discount',
        priceKey: 'initial_price',
        calcValue: {
          type: 'percent',
          value: 33.333
        }
      })
    ).toBe(1333);
    expect(
      item.getNewPrice({
        action: 'discount',
        priceKey: 'price'
      })
    ).toBe(1000);
    expect(
      item.getNewPrice({
        action: 'discount',
        priceKey: 'initial_price'
      })
    ).toBe(2000);
  });

  it('markup amount', () => {
    const item = new Item({
      ...baseItem,
      ...{ price: 1000, initial_price: 2000 }
    });

    expect(
      item.getNewPrice({
        action: 'markup',
        priceKey: 'price',
        calcValue: {
          type: 'amount',
          value: 100
        }
      })
    ).toBe(1100);
    expect(
      item.getNewPrice({
        action: 'markup',
        priceKey: 'initial_price',
        calcValue: {
          type: 'amount',
          value: 100
        }
      })
    ).toBe(2100);
    expect(
      item.getNewPrice({
        action: 'markup',
        priceKey: 'price',
        calcValue: {
          type: 'amount',
          value: 99.9
        }
      })
    ).toBe(1100);
    expect(
      item.getNewPrice({
        action: 'markup',
        priceKey: 'initial_price',
        calcValue: {
          type: 'amount',
          value: 99.9
        }
      })
    ).toBe(2100);
    expect(
      item.getNewPrice({
        action: 'markup',
        priceKey: 'price',
        calcValue: {
          type: 'amount',
          value: 99.1
        }
      })
    ).toBe(1099);
    expect(
      item.getNewPrice({
        action: 'markup',
        priceKey: 'initial_price',
        calcValue: {
          type: 'amount',
          value: 99.1
        }
      })
    ).toBe(2099);
    expect(
      item.getNewPrice({
        action: 'markup',
        priceKey: 'price'
      })
    ).toBe(1000);
    expect(
      item.getNewPrice({
        action: 'markup',
        priceKey: 'initial_price'
      })
    ).toBe(2000);
  });

  it('markup percent', () => {
    const item = new Item({
      ...baseItem,
      ...{ price: 1000, initial_price: 2000 }
    });
    expect(
      item.getNewPrice({
        action: 'markup',
        priceKey: 'price',
        calcValue: {
          type: 'percent',
          value: 10
        }
      })
    ).toBe(1100);
    expect(
      item.getNewPrice({
        action: 'markup',
        priceKey: 'initial_price',
        calcValue: {
          type: 'percent',
          value: 10
        }
      })
    ).toBe(2200);
    expect(
      item.getNewPrice({
        action: 'markup',
        priceKey: 'price',
        calcValue: {
          type: 'percent',
          value: 33.333
        }
      })
    ).toBe(1333);
    expect(
      item.getNewPrice({
        action: 'markup',
        priceKey: 'initial_price',
        calcValue: {
          type: 'percent',
          value: 33.333
        }
      })
    ).toBe(2667);
    expect(
      item.getNewPrice({
        action: 'markup',
        priceKey: 'price'
      })
    ).toBe(1000);
    expect(
      item.getNewPrice({
        action: 'markup',
        priceKey: 'initial_price'
      })
    ).toBe(2000);
  });

  it('round', () => {
    expect(
      new Item({
        ...baseItem,
        ...{ price: 100333, initial_price: 100333 }
      }).getNewPrice({
        action: 'revert',
        priceKey: 'price',
        round: { method: 'round', to: 1000 }
      })
    ).toBe(100000);

    expect(
      new Item({
        ...baseItem,
        ...{ price: 100333, initial_price: 100333 }
      }).getNewPrice({
        action: 'revert',
        priceKey: 'initial_price',
        round: { method: 'round', to: 1000 }
      })
    ).toBe(100000);

    expect(
      new Item({
        ...baseItem,
        ...{ price: 111555, initial_price: 111555 }
      }).getNewPrice({
        action: 'discount',
        priceKey: 'price',
        round: { method: 'round', to: 1000 }
      })
    ).toBe(112000);

    expect(
      new Item({
        ...baseItem,
        ...{ price: 111555, initial_price: 111555 }
      }).getNewPrice({
        action: 'markup',
        priceKey: 'initial_price',
        round: { method: 'round', to: 1000 }
      })
    ).toBe(112000);

    expect(
      new Item({
        ...baseItem,
        ...{ price: 111999, initial_price: 111999 }
      }).getNewPrice({
        action: 'markup',
        priceKey: 'price',
        round: { method: 'floor', to: 1000 }
      })
    ).toBe(111000);

    expect(
      new Item({
        ...baseItem,
        ...{ price: 111999, initial_price: 111999 }
      }).getNewPrice({
        action: 'discount',
        priceKey: 'initial_price',
        round: { method: 'floor', to: 1000 }
      })
    ).toBe(111000);

    expect(
      new Item({
        ...baseItem,
        ...{ price: 111001, initial_price: 111001 }
      }).getNewPrice({
        action: 'markup',
        priceKey: 'price',
        round: { method: 'ceil', to: 1000 }
      })
    ).toBe(112000);

    expect(
      new Item({
        ...baseItem,
        ...{ price: 111001, initial_price: 111001 }
      }).getNewPrice({
        action: 'discount',
        priceKey: 'initial_price',
        round: { method: 'ceil', to: 1000 }
      })
    ).toBe(112000);

    expect(
      new Item({
        ...baseItem,
        ...{ price: 1555, initial_price: 1555 }
      }).getNewPrice({
        action: 'discount',
        priceKey: 'price',
        round: { method: 'round', to: 100 }
      })
    ).toBe(1600);

    expect(
      new Item({
        ...baseItem,
        ...{ price: 1555, initial_price: 1555 }
      }).getNewPrice({
        action: 'markup',
        priceKey: 'initial_price',
        round: { method: 'round', to: 100 }
      })
    ).toBe(1600);

    expect(
      new Item({
        ...baseItem,
        ...{ price: 1099, initial_price: 1099 }
      }).getNewPrice({
        action: 'discount',
        priceKey: 'price',
        round: { method: 'floor', to: 100 }
      })
    ).toBe(1000);

    expect(
      new Item({
        ...baseItem,
        ...{ price: 1099, initial_price: 1099 }
      }).getNewPrice({
        action: 'discount',
        priceKey: 'initial_price',
        round: { method: 'floor', to: 100 }
      })
    ).toBe(1000);

    expect(
      new Item({
        ...baseItem,
        ...{ price: 1001, initial_price: 1001 }
      }).getNewPrice({
        action: 'markup',
        priceKey: 'price',
        round: { method: 'ceil', to: 100 }
      })
    ).toBe(1100);

    expect(
      new Item({
        ...baseItem,
        ...{ price: 1001, initial_price: 1001 }
      }).getNewPrice({
        action: 'discount',
        priceKey: 'initial_price',
        round: { method: 'ceil', to: 100 }
      })
    ).toBe(1100);

    expect(
      new Item({
        ...baseItem,
        ...{ price: 991, initial_price: 991 }
      }).getNewPrice({
        action: 'discount',
        priceKey: 'price',
        round: { method: 'round', to: 10 }
      })
    ).toBe(990);

    expect(
      new Item({
        ...baseItem,
        ...{ price: 991, initial_price: 991 }
      }).getNewPrice({
        action: 'markup',
        priceKey: 'initial_price',
        round: { method: 'round', to: 10 }
      })
    ).toBe(990);

    expect(
      new Item({
        ...baseItem,
        ...{ price: 991, initial_price: 991 }
      }).getNewPrice({
        action: 'markup',
        priceKey: 'initial_price',
        round: { method: 'ceil', to: 10 }
      })
    ).toBe(1000);

    expect(
      new Item({
        ...baseItem,
        ...{ price: 991, initial_price: 991 }
      }).getNewPrice({
        action: 'discount',
        priceKey: 'price',
        round: { method: 'ceil', to: 10 }
      })
    ).toBe(1000);

    expect(
      new Item({
        ...baseItem,
        ...{ price: 999, initial_price: 999 }
      }).getNewPrice({
        action: 'discount',
        priceKey: 'price',
        round: { method: 'floor', to: 10 }
      })
    ).toBe(990);

    expect(
      new Item({
        ...baseItem,
        ...{ price: 999, initial_price: 999 }
      }).getNewPrice({
        action: 'markup',
        priceKey: 'initial_price',
        round: { method: 'floor', to: 10 }
      })
    ).toBe(990);
  });

  it('decrease', () => {
    expect(
      new Item({
        ...baseItem,
        ...{ price: 991, initial_price: 991 }
      }).getNewPrice({
        action: 'markup',
        priceKey: 'initial_price',
        round: { method: 'ceil', to: 10 },
        decrease: 1
      })
    ).toBe(999);

    expect(
      new Item({
        ...baseItem,
        ...{ price: 991, initial_price: 991 }
      }).getNewPrice({
        action: 'discount',
        priceKey: 'price',
        round: { method: 'ceil', to: 10 },
        decrease: 1
      })
    ).toBe(999);

    expect(
      new Item({
        ...baseItem,
        ...{ price: 991, initial_price: 991 }
      }).getNewPrice({
        action: 'markup',
        priceKey: 'initial_price',
        round: { method: 'ceil', to: 10 },
        decrease: -10
      })
    ).toBe(1000);
  });
});

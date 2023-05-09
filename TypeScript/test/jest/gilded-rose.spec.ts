import { Item, GildedRose } from '@/gilded-rose';

describe('Gilded Rose', () => {
  it('At the end of a day, the quality of a normal item is lowered by 1', () => {
    const gildedRose = new GildedRose([new Item('foo', 5, 8)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(7);
  });

  it('At the end of a day, the sell-in date of a normal item is lowered by 1', () => {
    const gildedRose = new GildedRose([new Item('foo', 5, 8)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(4);
  });

  it('Aged Brie quality increases', () => {
    const gildedRose = new GildedRose([new Item('Aged Brie', 5, 8)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(9);
  });

  it('Quality is never more than 50', () => {
    const gildedRose = new GildedRose([new Item('Aged Brie', 5, 50)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(50);
  });

  it('Sulfuras doesnt decrease in quality or sell-in', () => {
    const gildedRose = new GildedRose([new Item('Sulfuras', 5, 8)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(8);
    expect(items[0].sellIn).toBe(5);
  });

  it('Backstage passes quality increases 2 when there are 10 days or less to the sell in date', () => {
    const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 8, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(12);
  });

  it('Backstage passes quality increases 3 when there are 5 days or less to the sell in date', () => {
    const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 3, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(13);
  });

  it('Once the sell date has passed, backstage passes have quality 0', () => {
    const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 0, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(0);
  });

  it('Once the sell date has passed, normal items quality decreases twice as fast', () => {
    const gildedRose = new GildedRose([new Item('Foo', 0, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(8);
  });

  it('Quality can never be negative', () => {
    const gildedRose = new GildedRose([new Item('Foo', 0, 1)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(0);
  });

  it('Quality of conjured items decreases by 2 before sell-in', () => {
    const gildedRose = new GildedRose([new Item('Conjured', 5, 8)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(6);
  });

  it('Quality of conjured items decreases by 4 after sell-in', () => {
    const gildedRose = new GildedRose([new Item('Conjured', 0, 8)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(4);
  });
});

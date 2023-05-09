export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  incrementQuality(index: number): void {
    if (this.items[index].quality >= 50) {
      return;
    }

    this.items[index].quality = this.items[index].quality + 1;
  }

  decrementQuality(index: number): void {
    if (this.items[index].quality <= 0 || this.itemDoesntLoseValue(index)) {
      return;
    }

    const degree = this.itemIsConjured(index) ? 2 : 1;
    this.items[index].quality = this.items[index].quality - degree;
  }

  setQualityToZero(index: number): void {
    this.items[index].quality = 0;
  }

  decrementSellIn(index: number): void {
    if (this.itemDoesntLoseValue(index)) {
      return;
    }

    this.items[index].sellIn = this.items[index].sellIn - 1;
  }

  sellInHasPassed = (index: number): boolean => this.items[index].sellIn < 0;

  private itemsThatGetBetterAfterSellIn = ['Aged Brie'];
  private itemsThatGetBetterUntilSellIn = ['Backstage passes to a TAFKAL80ETC concert'];
  private itemsThatDontChangeInQuality = ['Sulfuras', 'Hand of Ragnaros'];
  private itemsThatAreBackstagePasses = ['Backstage passes to a TAFKAL80ETC concert'];
  private itemsThatAreConjured = ['Conjured'];

  itemGetsBetterAfterSellIn  = (index: number): boolean => this.itemsThatGetBetterAfterSellIn.includes(this.items[index].name);
  itemGetsBetterUntilSellIn =  (index: number): boolean => this.itemsThatGetBetterUntilSellIn.includes(this.items[index].name);
  itemGetsBetterWithAge = (index: number): boolean => this.itemGetsBetterAfterSellIn(index) || this.itemGetsBetterUntilSellIn(index);
  itemDoesntLoseValue = (index: number): boolean => this.itemsThatDontChangeInQuality.includes(this.items[index].name);
  itemIsBackstagePass = (index: number): boolean => this.itemsThatAreBackstagePasses.includes(this.items[index].name);
  itemIsConjured = (index: number): boolean => this.itemsThatAreConjured.includes(this.items[index].name);

  handleBackstagePassSellIn(index: number): void {
    if (this.items[index].sellIn < 11) {
      this.incrementQuality(index);
    }
    if (this.items[index].sellIn < 6) {
      this.incrementQuality(index);
    }
  }

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      if (!this.itemGetsBetterWithAge(i)) {
        this.decrementQuality(i);
      } else {
        this.incrementQuality(i);

        if (this.itemIsBackstagePass(i)) {
          this.handleBackstagePassSellIn(i);
        }
      }

      this.decrementSellIn(i);

      if (!this.sellInHasPassed(i)) {
        continue;
      }

      if (this.itemGetsBetterAfterSellIn(i)) {
        this.incrementQuality(i);
      }
      else if (this.itemIsBackstagePass(i)) {
        this.setQualityToZero(i);
      }
      else {
        this.decrementQuality(i);
      }
    }

    return this.items;
  }
}

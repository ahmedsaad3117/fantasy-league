class Generator {
  constructor() {
    this.strChar =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    this.colorChar = "ABCDEF0123456789";
    this.numbers = "0123456789";
  }

  randomCollectin(str, length) {
    const charactersLength = str.length;
    let result = "";
    for (var i = 0; i < length; i++) {
      result += str.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  generateStr() {
    return this.randomCollectin(this.strChar, 7);
  }

  generateColor() {
    return this.randomCollectin(this.colorChar, 6);
  }

  generateNumbers() {
    return this.randomCollectin(this.numbers, 2);
  }

  generateWinningChance() {
    return Math.floor(Math.random() * 25) ;
  }

  generateWinningChanceChampion() {
    return Math.floor(Math.random() * 50) ;
  }
}

const generator = new Generator();

module.exports = generator;

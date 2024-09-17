export class Drug {
  constructor(name, expiresIn, benefit) {
    this.name = name;
    this.expiresIn = expiresIn;
    this.benefit = benefit;
  }
}

class HerbalTeal extends Drug {
  update () {
    this.benefit = Math.min(50, this.benefit + 1);
    this.expiresIn -= 1;
    if (this.expiresIn < 0) {
      this.benefit = Math.min(50, this.benefit + 1);
    }
  }
}

class Fervex extends Drug {
  update () {
    if (this.benefit < 50) {
      this.benefit += 1;
      if (this.expiresIn < 11) {
        this.benefit += 1;
      }
      if (this.expiresIn < 6) {
        this.benefit += 1;
      }
    }
    this.expiresIn -= 1;
    if (this.expiresIn < 0) {
      this.benefit = 0;
    }
  }
}

class MagicPill extends Drug {
  update () {
    return;
  }
}

class RegularDrug extends Drug {
  update () {
    if (this.benefit > 0) {
      this.benefit -= 1;
    }
    this.expiresIn -= 1;
    if (this.expiresIn < 0 && this.benefit > 0) {
      this.benefit -= 1;
    }
  }
}

export class Pharmacy {
  constructor(drugs = []) {
    this.drugs = drugs.map(drug=>this.createDrug(drug));
  }

  createDrug(drug) {
    switch (drug.name) {
      case "Herbal Tea":
        return new HerbalTeal(drug.name, drug.expiresIn, drug.benefit);
      case "Fervex":
        return new Fervex(drug.name, drug.expiresIn, drug.benefit);
      case "Magic Pill":
        return new MagicPill(drug.name, drug.expiresIn, drug.benefit)
      default:
        return new RegularDrug(drug.name, drug.expiresIn, drug.benefit)
    }
  }
  updateBenefitValue() {
    this.drugs.forEach(drug => drug.update());
    return this.drugs;
  }
}

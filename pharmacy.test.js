import { Drug, Pharmacy } from "./pharmacy";

describe("Pharmacy", () => {
  it("should decrease the benefit and expiresIn", () => {
    expect(new Pharmacy([new Drug("test", 2, 3)]).updateBenefitValue()).toEqual(
      [new Drug("test", 1, 2)],
    );
  });
  it('should degrade benefit twice as fast after expiration', () => {
    const drugs = [new Drug('Regular Drug', 1, 10)];
    const pharmacy = new Pharmacy(drugs);

    pharmacy.updateBenefitValue();
    expect(pharmacy.drugs[0].expiresIn).toBe(0);
    expect(pharmacy.drugs[0].benefit).toBe(9);

    pharmacy.updateBenefitValue();
    expect(pharmacy.drugs[0].expiresIn).toBe(-1);
    expect(pharmacy.drugs[0].benefit).toBe(7);

    pharmacy.updateBenefitValue();
    expect(pharmacy.drugs[0].expiresIn).toBe(-2);
    expect(pharmacy.drugs[0].benefit).toBe(5);
  });
  it('should ensure the benefit of any drug never goes below 0', () => {
    const drugs = [
      new Drug('Regular Drug', 1, 1),
      new Drug('Herbal Tea', 1, 0),
      new Drug('Fervex', 1, 0),
      new Drug('Magic Pill', 1, 40)
    ];
    const pharmacy = new Pharmacy(drugs);

    for (let day = 0; day < 5; day++) {
      pharmacy.updateBenefitValue();
    }

    pharmacy.drugs.forEach(drug => {
      expect(drug.benefit).toBeGreaterThanOrEqual(0);
    });
  });
  it('should ensure the Herbal Tea Drug increases in benefit the older it gets, and increases twice as fast after expiration', () => {
    const drugs = [new Drug('Herbal Tea', 2, 10)];
    const pharmacy = new Pharmacy(drugs);

    pharmacy.updateBenefitValue();
    expect(pharmacy.drugs[0].expiresIn).toBe(1);
    expect(pharmacy.drugs[0].benefit).toBe(11);

    pharmacy.updateBenefitValue();
    expect(pharmacy.drugs[0].expiresIn).toBe(0);
    expect(pharmacy.drugs[0].benefit).toBe(12);

    pharmacy.updateBenefitValue();
    expect(pharmacy.drugs[0].expiresIn).toBe(-1);
    expect(pharmacy.drugs[0].benefit).toBe(14);

    pharmacy.updateBenefitValue();
    expect(pharmacy.drugs[0].expiresIn).toBe(-2);
    expect(pharmacy.drugs[0].benefit).toBe(16);
  });
  it('should not change Magic Pill benefit or expiresIn', () => {
    const drugs = [new Drug('Magic Pill', 10, 40)];
    const pharmacy = new Pharmacy(drugs);

    pharmacy.updateBenefitValue();

    expect(pharmacy.drugs[0].expiresIn).toBe(10);
    expect(pharmacy.drugs[0].benefit).toBe(40);
  });
  it('should ensure the benefit of any drug never exceeds 50', () => {
    const drugs = [
      new Drug('Herbal Tea', 5, 50),
      new Drug('Fervex', 5, 49),
      new Drug('Magic Pill', 5, 50)
    ];
    const pharmacy = new Pharmacy(drugs);

    for (let day = 0; day < 5; day++) {
      pharmacy.updateBenefitValue();
    }

    pharmacy.drugs.forEach(drug => {
      expect(drug.benefit).toBeLessThanOrEqual(50);
    });
  });
  it('should ensure the Fervex Drug increases in benefit as expiration date approaches and drops to 0 after expiration', () => {
    const drugs = [new Drug('Fervex', 11, 20)];
    const pharmacy = new Pharmacy(drugs);

    pharmacy.updateBenefitValue();
    expect(pharmacy.drugs[0].expiresIn).toBe(10);
    expect(pharmacy.drugs[0].benefit).toBe(21);

    pharmacy.updateBenefitValue();
    expect(pharmacy.drugs[0].expiresIn).toBe(9);
    expect(pharmacy.drugs[0].benefit).toBe(23);

    for (let day = 0; day < 4; day++) {
      pharmacy.updateBenefitValue();
    }
    expect(pharmacy.drugs[0].expiresIn).toBe(5);
    expect(pharmacy.drugs[0].benefit).toBe(31);

    pharmacy.updateBenefitValue();
    expect(pharmacy.drugs[0].expiresIn).toBe(4);
    expect(pharmacy.drugs[0].benefit).toBe(34);

    for (let day = 0; day < 4; day++) {
      pharmacy.updateBenefitValue();
    }
    expect(pharmacy.drugs[0].expiresIn).toBe(0);
    expect(pharmacy.drugs[0].benefit).toBe(46);

    pharmacy.updateBenefitValue();
    expect(pharmacy.drugs[0].expiresIn).toBe(-1);
    expect(pharmacy.drugs[0].benefit).toBe(0);
  });
});

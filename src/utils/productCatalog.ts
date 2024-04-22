import { ProductDataInterface } from "./interfaces";

const productCatalog: ProductDataInterface[] = [
  {
    name: "ACS-10-28",
    quantityInBox: 25,
    singleWeight: 0.97,
    get boxWeight() {
      return this.quantityInBox * this.singleWeight;
    },
  },
  {
    name: "ACS-10-32S",
    quantityInBox: 25,
    singleWeight: 0.8,
    get boxWeight() {
      return this.quantityInBox * this.singleWeight;
    },
  },
  {
    name: "ACS-10-32B",
    quantityInBox: 25,
    singleWeight: 1.32,
    get boxWeight() {
      return this.quantityInBox * this.singleWeight;
    },
  },
  {
    name: "ACS-10-36",
    quantityInBox: 25,
    singleWeight: 3,
    get boxWeight() {
      return this.quantityInBox * this.singleWeight;
    },
  },
  {
    name: "ACS-10-40",
    quantityInBox: 25,
    singleWeight: 1.68,
    get boxWeight() {
      return this.quantityInBox * this.singleWeight;
    },
  },
  {
    name: "ACS-12-22",
    quantityInBox: 50,
    singleWeight: 0.66,
    get boxWeight() {
      return this.quantityInBox * this.singleWeight;
    },
  },
  {
    name: "ACS-12-26",
    quantityInBox: 50,
    singleWeight: 0.88,
    get boxWeight() {
      return this.quantityInBox * this.singleWeight;
    },
  },
  {
    name: "ACS-31-15",
    quantityInBox: 10,
    singleWeight: 3,
    get boxWeight() {
      return this.quantityInBox * this.singleWeight;
    },
  },
  {
    name: "ACS-31-15MS",
    quantityInBox: 10,
    singleWeight: 3,
    get boxWeight() {
      return this.quantityInBox * this.singleWeight;
    },
  },
  {
    name: "ACS-34-15",
    quantityInBox: 10,
    singleWeight: 3,
    get boxWeight() {
      return this.quantityInBox * this.singleWeight;
    },
  },
];

export default productCatalog;

import { Product } from "../../contexts/TotalsContext";

export const emptyData: Product[] = [
  {
    id: 0,
    name: null,
    totalWeight: null,
    totalCount: null,
  },
];

export const fakeDataSingle: Product[] = [
  {
    id: 0,
    name: "ACS-10-40",
    totalWeight: 4,
    totalCount: 2,
  },
];

export const fakeDataMultiple: Product[] = [
  {
    id: 0,
    name: "ACS-10-40",
    totalWeight: 4,
    totalCount: 2,
  },

  {
    id: 1,
    name: "ACS-12-22",
    totalWeight: 33,
    totalCount: 50,
  },

  {
    id: 2,
    name: "ACS-31-15MS",
    totalWeight: 156,
    totalCount: 52,
  },
];

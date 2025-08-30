import { LayoutHeader } from "@/src/shared/ui/primitives/LayoutHeader";
import data from "../../../../data.json";
import { PotsList } from "./components/PotsList";

export type PotItem = {
  name: string;
  target: number;
  total: number;
  theme: string; // hex from data.json mapped to CSS vars via mapping
};

type Data = { pots: PotItem[] };

export const PotsScreen = () => {
  const pots: PotItem[] = (data as Data).pots;
  return (
    <>
      <LayoutHeader title="Pots" actionName="Add New Pot" />
      <PotsList items={pots} />
    </>
  );
};

export default PotsScreen;
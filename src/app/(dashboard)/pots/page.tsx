import { PotsProvider } from "@/modules/pots/ui/context/PotsProvider";
import { PotsScreen } from "@/modules/pots/ui/PotsScreen";

const PotsPage = () => {
  return (
    <PotsProvider>
      <PotsScreen />
    </PotsProvider>
  );
};

export default PotsPage;

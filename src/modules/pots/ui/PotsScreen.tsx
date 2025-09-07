"use client";
import { LayoutHeader } from "@/shared/ui/primitives/LayoutHeader";
import { PotsList } from "./components/PotsList";
import { PotsAddPotModal } from "./components/PotsAddPotModal";
import { PotsEditPotModal } from "./components/PotsEditPotModal";
import { PotsDeletePotModal } from "./components/PotsDeletePotModal";
import { PotsAddMoneyModal } from "./components/PotsAddMoneyModal";
import { PotsWithdrawMoneyModal } from "./components/PotsWithdrawMoneyModal";
import { usePotsCtx } from "./context/PotsProvider";
import { usePotsActions } from "./hooks/usePotsActions";

export const PotsScreen = () => {
  const { data: pots, loading, error, setPots } = usePotsCtx();
  const {
    modals,
    actions,
    handlers,
    computed,
    data,
  } = usePotsActions(pots, setPots);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <LayoutHeader
        title="Pots"
        actionName="+Add New Pot"
        onActionClick={actions.openAdd}
      />
      <PotsList
        items={pots ?? []}
        onEdit={actions.openEdit}
        onDelete={actions.openDelete}
        onAddMoney={actions.openAddMoney}
        onWithdraw={actions.openWithdraw}
      />
      <PotsAddPotModal
        open={modals.isAddOpen}
        onClose={actions.closeAdd}
        onSubmit={handlers.handleAdd}
        themes={data.themes}
      />
      <PotsEditPotModal
        open={modals.editIndex !== null}
        onClose={actions.closeEdit}
        onSubmit={handlers.handleEdit}
        initial={computed.editing}
        themes={data.themes}
      />
      <PotsDeletePotModal
        open={modals.deleteIndex !== null}
        onClose={actions.closeDelete}
        onConfirm={handlers.handleDelete}
        name={computed.deleting?.name ?? ""}
      />
      <PotsAddMoneyModal
        open={modals.addMoneyIndex !== null}
        onClose={actions.closeAddMoney}
        onConfirm={handlers.handleAddMoney}
        pot={computed.addingTo ?? undefined}
      />
      <PotsWithdrawMoneyModal
        open={modals.withdrawIndex !== null}
        onClose={actions.closeWithdraw}
        onConfirm={handlers.handleWithdraw}
        pot={computed.withdrawingFrom ?? undefined}
      />
    </>
  );
};

export default PotsScreen;

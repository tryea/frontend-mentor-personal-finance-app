import {
  IconCaretDown,
  IconFilterMobile,
  IconSearch,
  IconSortMobile,
} from "@/src/shared/ui/icons";

export const FilterAndSearchTable = () => {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="relative w-full md:w-auto">
        <input
          type="text"
          placeholder="Search transaction"
          className="text-preset-4 w-full rounded-lg border border-gray-200 bg-white py-3 pl-12 pr-4 md:w-80"
        />
        <IconSearch
          width={20}
          height={20}
          className="absolute left-4 top-1/2 -translate-y-1/2"
        />
      </div>

      {/* Mobile filter/sort icons */}
      <div className="flex items-center gap-2 md:hidden">
        <button className="flex h-12 w-12 items-center justify-center rounded-lg border border-gray-200 bg-white">
          <IconSortMobile width={20} height={20} />
        </button>
        <button className="flex h-12 w-12 items-center justify-center rounded-lg border border-gray-200 bg-white">
          <IconFilterMobile width={20} height={20} />
        </button>
      </div>

      {/* Desktop sort/category dropdowns */}
      <div className="hidden items-center gap-4 md:flex">
        <div className="flex items-center gap-2">
          <span className="text-preset-4 text-gray-400">Sort by</span>
          <div className="relative">
            <select className="text-preset-4 appearance-none rounded-lg border border-gray-200 bg-white py-3 pl-4 pr-10">
              <option>Latest</option>
              <option>Oldest</option>
            </select>
            <IconCaretDown
              width={16}
              height={16}
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2"
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-preset-4 text-gray-400">Category</span>
          <div className="relative">
            <select className="text-preset-4 appearance-none rounded-lg border border-gray-200 bg-white py-3 pl-4 pr-10">
              <option>All Transactions</option>
              <option>Groceries</option>
              <option>Transport</option>
              <option>Entertainment</option>
            </select>
            <IconCaretDown
              width={16}
              height={16}
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

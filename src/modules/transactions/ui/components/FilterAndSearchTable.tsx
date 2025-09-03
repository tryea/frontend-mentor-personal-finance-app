import {
  IconCaretDown,
  IconFilterMobile,
  IconSearch,
  IconSortMobile,
} from "@/shared/ui/icons";

export const FilterAndSearchTable = () => {
  return (
    <div className="flex flex-row items-center justify-between gap-6 max-w-full min-w-0 shrink-0 min-h-0 h-[50px]">
      {/* Search Box */}
      <div className="flex flex-row flex-1 min-w-0 max-w-[320px] shrink grow items-center justify-start gap-4 border border-beige-500 rounded-lg pr-5 lg:justify-between ">
        <input
          type="text"
          placeholder="Search transaction"
          className="flex flex-1 min-w-0 pl-5 pr-0 py-3 placeholder:text-beige-500 text-grey-900 outline-0 text-ellipsis"
        />
        <IconSearch className="w-4 h-4" />
      </div>

      {/* Mobile filter/sort icons */}
      <div className="flex items-center gap-6 md:hidden">
        <button>
          <IconSortMobile className="w-5 h-5" />
        </button>
        <button>
          <IconFilterMobile className="w-5 h-5" />
        </button>
      </div>

      {/* Desktop sort/category dropdowns */}
      <div className="hidden items-center gap-4 md:flex flex-none w-[438px] shrink-0">
        {/* Sort By */}
        <div className="flex flex-1 flex-nowrap items-center gap-2">
          <span className="text-preset-4 text-grey-900 text-nowrap">
            Sort by
          </span>
          <div className="relative">
            <select className="text-preset-4 appearance-none rounded-lg border border-beige-500 bg-white py-3 pl-5 pr-13">
              <option>Latest</option>
              <option>Oldest</option>
            </select>
            <IconCaretDown
              width={16}
              height={16}
              className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2"
            />
          </div>
        </div>
        {/* Category */}
        <div className="flex flex-1 items-center gap-2">
          <span className="text-preset-4 text-grey-900">Category</span>
          <div className="relative">
            <select className="text-preset-4 appearance-none rounded-lg border border-beige-500 bg-white py-3 pl-5 pr-13">
              <option>All Transactions</option>
              <option>Groceries</option>
              <option>Transport</option>
              <option>Entertainment</option>
            </select>
            <IconCaretDown
              width={16}
              height={16}
              className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

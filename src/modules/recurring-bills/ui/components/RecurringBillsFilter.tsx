import { useState } from "react";
import { IconCaretDown, IconSearch, IconSortMobile } from "@/shared/ui/icons";

type RecurringBillsFilterProps = {
  sortOptions: string[];
  onSortChange: (sortOption: string) => void;
  onSearchQueryChange: (query: string) => void;
};
export const RecurringBillsFilter = ({
  sortOptions,
  onSortChange,
  onSearchQueryChange,
}: RecurringBillsFilterProps) => {
  const [sortMenuOpen, setSortMenuOpen] = useState(false);

  const toggleSortMenu = () => {
    setSortMenuOpen(!sortMenuOpen);
  };

  const closeMobileMenus = () => {
    setSortMenuOpen(false);
  };

  const handleSortSelect = (sortOption: string) => {
    onSortChange(sortOption);
    closeMobileMenus();
  };

  return (
    <div className="flex flex-row items-center justify-between gap-6 max-w-full w-full min-w-0 shrink-0 min-h-0 h-[50px]">
      {/* Search Box */}
      <div className="flex flex-row flex-1 min-w-0 max-w-[320px] shrink grow items-center justify-start gap-4 border border-beige-500 rounded-lg pr-5 lg:justify-between ">
        <input
          type="text"
          onChange={(e) => onSearchQueryChange(e.target.value)}
          placeholder="Search bills"
          className="flex flex-1 min-w-0 pl-5 pr-0 py-3 placeholder:text-beige-500 text-grey-900 outline-0 text-ellipsis"
        />
        <IconSearch className="w-4 h-4" />
      </div>

      {/* Mobile filter/sort icons */}
      <div className="flex items-center gap-6 md:hidden">
        <div className="relative">
          <button
            onClick={toggleSortMenu}
            className="p-2 rounded-lg hover:bg-grey-100"
            aria-label="Sort options"
          >
            <IconSortMobile className="w-5 h-5" />
          </button>
          {sortMenuOpen && (
            <div className="action-menu" onMouseLeave={closeMobileMenus}>
              {sortOptions.map((sortOption) => (
                <button
                  key={sortOption}
                  className="action-menu-item"
                  onClick={() => handleSortSelect(sortOption)}
                >
                  {sortOption}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Desktop sort/category dropdowns */}
      <div className="hidden items-center gap-4 md:flex flex-none w-[180px] shrink-0">
        {/* Sort By */}
        <div className="flex flex-1 flex-nowrap items-center gap-2">
          <span className="text-preset-4 text-grey-900 text-nowrap">
            Sort by
          </span>
          <div className="relative">
            <select
              onChange={(e) => onSortChange(e.target.value)}
              className="text-preset-4 appearance-none rounded-lg border border-beige-500 bg-white py-3 pl-5 pr-13"
            >
              {sortOptions.map((sortOption) => {
                return <option key={sortOption}>{sortOption}</option>;
              })}
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

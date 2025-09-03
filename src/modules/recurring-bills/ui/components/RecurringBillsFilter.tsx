import { IconCaretDown, IconSearch } from "@/shared/ui/icons";

export const RecurringBillsFilter = ({
  search,
  sortBy,
  onSearch,
  onSort,
}: {
  search: string;
  sortBy: "latest" | "oldest";
  onSearch: (v: string) => void;
  onSort: (v: "latest" | "oldest") => void;
}) => {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      {/* Search */}
      <div className="flex flex-row flex-1 min-w-0 max-w-[320px] shrink grow items-center justify-start gap-4 border border-beige-500 rounded-lg pr-5">
        <input
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          type="text"
          placeholder="Search bills"
          className="flex flex-1 min-w-0 pl-5 pr-0 py-3 placeholder:text-beige-500 text-grey-900 outline-0 text-ellipsis"
        />
        <IconSearch className="w-4 h-4" />
      </div>

      {/* Sort */}
      <div className="flex items-center gap-2">
        <span className="text-preset-4 text-grey-900">Sort by</span>
        <div className="relative">
          <select
            value={sortBy}
            onChange={(e) => onSort(e.target.value as any)}
            className="text-preset-4 appearance-none rounded-lg border border-beige-500 bg-white py-3 pl-5 pr-13"
          >
            <option value="latest">Latest</option>
            <option value="oldest">Oldest</option>
          </select>
          <IconCaretDown
            width={16}
            height={16}
            className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2"
          />
        </div>
      </div>
    </div>
  );
};

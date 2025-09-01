"use client";
type LayoutHeaderProps = {
  title: string;
  actionName?: string;
  onActionClick?: () => void;
};

export const LayoutHeader = ({
  title,
  actionName,
  onActionClick,
}: LayoutHeaderProps) => {
  return (
    <div className="flex flex-row items-center justify-between">
      <h1 className="text-preset-1 text-grey-900">{title}</h1>
      {onActionClick && (
        <button
          onClick={onActionClick}
          className="bg-grey-900 hover:bg-grey-500 hover:text-white text-white flex flex-row p-4 gap-4 justify-center items-center rounded-lg text-preset-4-bold"
        >
          {actionName}
        </button>
      )}
    </div>
  );
};

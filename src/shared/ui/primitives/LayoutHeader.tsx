type LayoutHeaderProps = {
  title: string;
  actionName: string;
  onActionClick?: () => void;
};

export const LayoutHeader = ({
  title,
  actionName,
  onActionClick,
}: LayoutHeaderProps) => {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-preset-1 font-bold">{title}</h1>
      {onActionClick && (
        <button
          onClick={onActionClick}
          className="text-preset-4-bold rounded-full bg-primary-500 px-6 py-3 text-white"
        >
          {actionName}
        </button>
      )}
    </div>
  );
};

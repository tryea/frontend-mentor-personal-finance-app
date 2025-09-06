export const dateFormatter = (iso: string) => {
  const normalized = iso.replace(/\.(\d{3})\d+/, ".$1");

  return new Date(normalized).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

export const currencyFormatter = (current: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(current);
};

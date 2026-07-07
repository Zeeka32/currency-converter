export function formatTimeAgo(dateValue: string | Date) {
  const date = dateValue instanceof Date ? dateValue : new Date(dateValue);
  const now = new Date();

  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (Number.isNaN(diffInSeconds)) {
    return "N/A";
  }

  if (diffInSeconds < 60) {
    return `${Math.max(diffInSeconds, 0)}s`;
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);

  if (diffInMinutes < 60) {
    return `${diffInMinutes}M`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);

  if (diffInHours < 24) {
    return `${diffInHours}H`;
  }

  const diffInDays = Math.floor(diffInHours / 24);

  return `${diffInDays}D`;
}
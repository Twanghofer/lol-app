export function formatDate(
  dateString: string,
  options: Intl.DateTimeFormatOptions = { month: "short", day: "numeric" }
) {
  const event = new Date(dateString);
  return event.toLocaleDateString("en", options);
}

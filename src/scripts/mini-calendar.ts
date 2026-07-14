const weekdays = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

export function initMiniCalendar(root: HTMLElement, today = new Date()): void {
  const heading = root.querySelector<HTMLElement>("[data-calendar-month]");
  const grid = root.querySelector<HTMLElement>("[data-calendar-grid]");
  if (!heading || !grid) return;

  heading.textContent = new Intl.DateTimeFormat("en", {
    month: "long",
    year: "numeric",
  }).format(today);
  grid.replaceChildren();
  for (const weekday of weekdays) {
    const label = document.createElement("span");
    label.className = "calendar-weekday";
    label.textContent = weekday;
    grid.append(label);
  }

  const year = today.getFullYear();
  const month = today.getMonth();
  const startDay = (new Date(year, month, 1).getDay() + 6) % 7;
  const previousMonthDays = new Date(year, month, 0).getDate();
  const currentMonthDays = new Date(year, month + 1, 0).getDate();
  const dates: Array<{ day: number; adjacent: boolean; today: boolean }> = [];
  for (let offset = startDay - 1; offset >= 0; offset--)
    dates.push({
      day: previousMonthDays - offset,
      adjacent: true,
      today: false,
    });
  for (let day = 1; day <= currentMonthDays; day++)
    dates.push({ day, adjacent: false, today: day === today.getDate() });
  for (let day = 1; dates.length % 7 !== 0; day++)
    dates.push({ day, adjacent: true, today: false });

  for (const date of dates) {
    const cell = document.createElement("span");
    cell.className = `calendar-date${date.adjacent ? " is-adjacent" : ""}${date.today ? " is-today" : ""}`;
    cell.textContent = String(date.day);
    if (date.today) cell.setAttribute("aria-current", "date");
    grid.append(cell);
  }
}

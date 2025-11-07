// public/src/core/widget-registry.js
import { NotesWidget } from "../widgets/notes-widget.js";
import { WeatherWidget } from "../widgets/weather-widget.js";
import { PomodoroWidget } from "../widgets/pomodoro-widget.js";
import { RSSWidget } from "../widgets/rss-widget.js";

export const registry = {
  notes: NotesWidget,
  weather: WeatherWidget,
  pomodoro: PomodoroWidget,
  rss: RSSWidget
};

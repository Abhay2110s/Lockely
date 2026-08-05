// CSV helpers — small, dependency-free utilities for exporting
// and importing vault data in CSV format. Handles quoting of
// commas, quotes, and newlines within fields.

/**
 * Escape a single CSV field. If the value contains commas,
 * quotes, or newlines, it is wrapped in double quotes and
 * internal quotes are doubled.
 */
const escapeField = (value) => {
  const str = value === null || value === undefined ? "" : String(value);
  if (/[",\n]/.test(str)) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
};

// Convert an array of row objects to a CSV string using the given column keys.
export const toCSV = (rows, columns) => {
  const header = columns.join(",");
  const lines = rows.map((row) =>
    columns.map((col) => escapeField(row[col])).join(",")
  );
  return [header, ...lines].join("\n");
};

// Parse a single CSV line respecting quoted fields (handles embedded
// commas, escaped quotes "" and does not split on commas inside quotes).
const parseLine = (line) => {
  const fields = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];

    if (inQuotes) {
      if (char === '"') {
        if (line[i + 1] === '"') {
          current += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        current += char;
      }
    } else if (char === '"') {
      inQuotes = true;
    } else if (char === ",") {
      fields.push(current);
      current = "";
    } else {
      current += char;
    }
  }

  fields.push(current);
  return fields;
};

// Parse a full CSV text into an array of row objects keyed by the header row.
export const fromCSV = (text) => {
  const normalized = text.replace(/\r\n/g, "\n").trim();
  if (!normalized) return [];

  const lines = normalized.split("\n");
  const header = parseLine(lines[0]).map((h) => h.trim());

  return lines.slice(1).map((line) => {
    const values = parseLine(line);
    const row = {};
    header.forEach((col, idx) => {
      row[col] = values[idx] !== undefined ? values[idx] : "";
    });
    return row;
  });
};

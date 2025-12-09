/**
 * Table utilities for Gherkin data tables
 *
 * Provides helper functions to work with Cucumber/CodeceptJS data tables.
 */

/**
 * Get rows from a data table, optionally extracting a specific column
 * @param {Object} table - The data table object
 * @param {string} [columnName] - Optional column name to extract
 * @returns {string[]} Array of values
 */
function getTableRows (table, columnName = null) {
  const rows = table.rows.map(row => {
    if (columnName && row[columnName]) {
      return row[columnName]
    }
    return row[0] || ''
  }).filter(Boolean)

  // Skip header row if it matches the column name
  return columnName && rows[0] === columnName ? rows.slice(1) : rows
}

/**
 * Get cell values from a data table with headers
 * @param {Object} table - The data table object
 * @param {number} [columnIndex] - Column index to extract (default: 0)
 * @returns {string[]} Array of cell values (excluding header)
 */
function getTableCells (table, columnIndex = 0) {
  // table.rows is an array of row objects, skip header row
  // Each row has a cells array with cell objects containing value property
  return table.rows.slice(1).map(row => row.cells[columnIndex].value)
}

module.exports = {
  getTableRows,
  getTableCells
}

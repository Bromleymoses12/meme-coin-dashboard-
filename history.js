const fs = require('fs');
const path = 'alertHistory.json';

function loadHistory() {
  try {
    return JSON.parse(fs.readFileSync(path));
  } catch {
    return [];
  }
}

function saveHistory(history) {
  fs.writeFileSync(path, JSON.stringify(history));
}

module.exports = { loadHistory, saveHistory };

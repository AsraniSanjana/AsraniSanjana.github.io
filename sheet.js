document.addEventListener('DOMContentLoaded', () => {
    const sheetId = 'YOUR_SHEET_ID';
    const gid = 'YOUR_GID'; // Tab's gid
    const url = `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv&gid=${gid}`;
  
    fetch(url)
      .then(res => res.text())
      .then(csv => {
        const rows = csv.trim().split('\n').map(row => row.split(','));
        const container = document.getElementById('sheet-data');
        let html = '<table><thead><tr>';
  
        // Headers
        rows[0].forEach(header => {
          html += `<th>${header}</th>`;
        });
        html += '</tr></thead><tbody>';
  
        // Data rows
        rows.slice(1).forEach(row => {
          html += '<tr>';
          row.forEach(cell => {
            html += `<td>${cell}</td>`;
          });
          html += '</tr>';
        });
  
        html += '</tbody></table>';
        container.innerHTML = html;
      })
      .catch(err => {
        document.getElementById('sheet-data').innerHTML = 'Failed to load data.';
        console.error('Error fetching CSV:', err);
      });
  });
  
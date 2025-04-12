document.addEventListener('DOMContentLoaded', function () {
    Tabletop.init({
      key: '1LJeX3N3Uvfew29LR_xo13nJTCJ6vqBQaawZJT0yZNwY', // ← Replace this!
      callback: function (data, tabletop) {
        const container = document.getElementById('sheet-data');
        let html = '<table><thead><tr>';
        
        // Headers
        Object.keys(data[0]).forEach(key => {
          html += `<th>${key}</th>`;
        });
        html += '</tr></thead><tbody>';
  
        // Rows
        data.forEach(row => {
          html += '<tr>';
          Object.values(row).forEach(cell => {
            html += `<td>${cell}</td>`;
          });
          html += '</tr>';
        });
  
        html += '</tbody></table>';
        container.innerHTML = html;
      },
      simpleSheet: true
    });
  });
  
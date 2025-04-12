document.addEventListener('DOMContentLoaded', function () {
    const sheetId = '1LJeX3N3Uvfew29LR_xo13nJTCJ6vqBQaawZJT0yZNwY'; // Replace with your actual Sheet ID
    const topicLinks = document.querySelectorAll('.topic-link');
    const titleEl = document.getElementById('topic-title');
    const container = document.getElementById('sheet-data');
    const contextDiv = document.getElementById('blog-context');
  
    const blogContent = {
      transactions: `
        <p>All cases what classifies a transaction domestic or cross-border</p>
        <p><strong>WIP:</strong> CP & CNP summary</p>
      `,
      dpdp: `
        <p>These controls are designed to align with the Digital Personal Data Protection Act (DPDP) wrt. certain roles.</p>
        <p>Each entry maps to specific controls outlined by the Act, along with suggested technical measures.</p>
      `,
      dataelements: `
        <p>List of permissible and non-permissible data elements which will be present in all types of transactions.</p>
      `
    };
  
    function clearActive() {
      topicLinks.forEach(link => link.classList.remove('active-tab'));
    }
  
    topicLinks.forEach(link => {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        const gid = this.getAttribute('data-gid');
        const titleKey = this.getAttribute('data-title');
  
        clearActive();
        this.classList.add('active-tab');
        loadData(gid, titleKey);
      });
    });
  
    function loadData(gid, titleKey) {
      const url = `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv&gid=${gid}`;
      titleEl.textContent = titleKey.charAt(0).toUpperCase() + titleKey.slice(1);
      contextDiv.innerHTML = blogContent[titleKey] || '';
  
      fetch(url)
        .then(res => res.text())
        .then(csv => {
          const data = Papa.parse(csv, { header: false }).data;
          if (!data || data.length < 2) {
            container.innerHTML = '<p>No data found in this sheet.</p>';
            return;
          }
  
          let html = '<table><thead><tr>';
          data[0].forEach(header => html += `<th>${header}</th>`);
          html += '</tr></thead><tbody>';
  
          data.slice(1).forEach(row => {
            html += '<tr>';
            row.forEach(cell => html += `<td>${cell}</td>`);
            html += '</tr>';
          });
  
          html += '</tbody></table>';
          container.innerHTML = html;
        })
        .catch(err => {
          container.innerHTML = '❌ Failed to load data.';
          console.error('Error fetching CSV:', err);
        });
    }
  });
  
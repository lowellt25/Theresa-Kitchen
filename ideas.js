fetch('ideas.json')
  .then(response => response.json())
  .then(data => {
    const list = document.getElementById('ideasList');

    data[category].forEach(item => {
      const li = document.createElement('li');
      li.textContent = item;
      list.appendChild(li);
    });
  })
  .catch(error => console.error('Error loading ideas:', error));

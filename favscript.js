
  document.addEventListener('DOMContentLoaded', function () {
    const isFavoritePage = window.location.pathname.endsWith('favorit.html');

    if (isFavoritePage) {
      loadFavoriteBooks();
    }

    // Untuk viewer.html
    const urlParams = new URLSearchParams(window.location.search);
    let file = urlParams.get('file');

    if (file) {
      if (file.endsWith('.pdf')) {
        file = file.slice(0, -4);
      }

      const folderBase = detectFolder(file);
      const folderPath = `/${folderBase}/${file}`;
      const iframe = document.getElementById('pdf-frame');
      if (iframe) {
        iframe.src = `${folderPath}/index.html`;
      }
    }
  });

  function loadFavoriteBooks() {
    const favorites = JSON.parse(localStorage.getItem('bookFavorites')) || [];
    const favoriteBookList = document.getElementById('booksGrid');
    if (!favoriteBookList) return;

    if (favorites.length === 0) {
      favoriteBookList.innerHTML = `
        <div class="empty-favorites">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 
                    2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 
                    14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 
                    11.54L12 21.35z"/>
          </svg>
          <p>Kamu belum memiliki buku favorit.</p>
          <p>Kembali ke <a href="pilihan-buku.html">Pilihan Buku</a> untuk menambahkan favorit.</p>
        </div>
      `;
      return;
    }

    let booksHTML = '';
    favorites.forEach(book => {
      booksHTML += `
        <div class="book-item">
          <div class="book-image">
            <button class="favorite-btn active" onclick="removeFavorite('${book.filename}', this)">
              <i class="fas fa-heart"></i>
            </button>
            <a href="/viewer.html" data-filename="${book.filename}">
              <img src="${book.cover}" alt="${book.title}">
              <span class="book-tag">PDF</span>
              <span class="book-level">${book.level}</span>
            </a>
          </div>
          <div class="book-info">
            <h3>${book.title}</h3>
          </div>
        </div>
      `;
    });

    favoriteBookList.innerHTML = booksHTML;

    setupViewerLinks();
    fixCoverPaths(); // Set path gambar cover
  }

  function removeFavorite(filename, button) {
    let favorites = JSON.parse(localStorage.getItem('bookFavorites')) || [];
    favorites = favorites.filter(book => book.filename !== filename);
    localStorage.setItem('bookFavorites', JSON.stringify(favorites));

    const bookItem = button.closest('.book-item');
    bookItem.style.animation = 'fadeOut 0.3s';
    setTimeout(() => {
      bookItem.remove();
      if (favorites.length === 0) {
        loadFavoriteBooks();
      }
    }, 300);
  }

  function setupViewerLinks() {
    document.querySelectorAll('a[data-filename]').forEach(link => {
      let filename = link.getAttribute('data-filename');
      if (!filename) return;

      if (filename.endsWith('.pdf')) {
        filename = filename.slice(0, -4);
      }

      link.href = `/viewer.html?file=${encodeURIComponent(filename)}`;
    });
  }

  function detectFolder(filename) {
    const normalized = filename.replace(/-/g, '_');

    if (normalized.includes('KLS_XII')) {
      return 'books/book12';
    } else if (normalized.includes('KLS_XI')) {
      return 'books/book11';
    } else if (normalized.includes('KLS_X')) {
      return 'books/book10';
    }

    return '';
  }

  // Atur ulang path cover image sesuai kelas
  function fixCoverPaths() {
    document.querySelectorAll('.book-item').forEach(book => {
      const link = book.querySelector('.book-image a');
      const img = book.querySelector('.book-image img');

      if (link && img) {
        let filename = link.dataset.filename;
        if (!filename) return;

        const normalized = filename.replace(/-/g, '_');

        let folder = 'kls10'; // default
        if (normalized.includes('KLS_XII')) {
          folder = 'kls12';
        } else if (normalized.includes('KLS_XI')) {
          folder = 'kls11';
        }

        const imgFile = img.src.split('/').pop();
        img.src = `${folder}/cover/${imgFile}`;
      }
    });
  }


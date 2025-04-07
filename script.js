
    document.querySelectorAll('a[data-filename]').forEach(link => {
        let filename = link.getAttribute('data-filename');

        if (filename) {
            // Hapus ekstensi .pdf
            if (filename.endsWith('.pdf')) {
                filename = filename.slice(0, -4);
            }

            // Ganti href link
            link.href = `/viewer.html?file=${encodeURIComponent(filename)}`;
        }
    });

    // Deteksi folder berdasarkan nama file
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

    // Load index.html dari folder yang cocok
    const urlParams = new URLSearchParams(window.location.search);
    let file = urlParams.get('file');

    if (file) {
        // Hapus .pdf jika masih ada
        if (file.endsWith('.pdf')) {
            file = file.slice(0, -4);
        }

        const folderBase = detectFolder(file);
        const folderPath = `/${folderBase}/${file}`; // Contoh: /books/book10/Bahasa_Indonesia_BS_KLS_X_Rev
        const iframe = document.getElementById('pdf-frame');
        iframe.src = `${folderPath}/index.html`; // Buka index.html di dalam folder itu
    }






document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const booksGrid = document.getElementById('booksGrid');
    const bookItems = document.querySelectorAll('.book-item');
    const noResults = document.getElementById('noResults');
    
    // Function to perform search
    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        let resultsFound = false;
        
        // If search is empty, show all books
        if (searchTerm === '') {
            bookItems.forEach(item => {
                item.style.display = 'block';
            });
            noResults.style.display = 'none';
            return;
        }
        
        // Search through book titles
        bookItems.forEach(item => {
            const bookTitle = item.querySelector('.book-info h3').textContent.toLowerCase();
            const bookLevel = item.querySelector('.book-level').textContent.toLowerCase();
            
            if (bookTitle.includes(searchTerm) || bookLevel.includes(searchTerm)) {
                item.style.display = 'block';
                resultsFound = true;
            } else {
                item.style.display = 'none';
            }
        });
        
        // Show or hide "no results" message
        if (resultsFound) {
            noResults.style.display = 'none';
        } else {
            noResults.style.display = 'block';
        }
    }
    
    // Add event listeners
    searchBtn.addEventListener('click', performSearch);
    
    // Search on Enter key press
    searchInput.addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
            performSearch();
        }
    });
    
    // Add real-time search (optional)
    searchInput.addEventListener('input', function() {
        // Only do real-time search if input has at least 2 characters
        if (this.value.length >= 2 || this.value.length === 0) {
            performSearch();
        }
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const path = window.location.pathname;
  
    // Cek apakah sedang di index.html
    if (path.includes("pilihan-buku.html")) {
        document.querySelectorAll('.book-item').forEach(book => {
            const link = book.querySelector('.book-image a');
            const img = book.querySelector('.book-image img');
    
            if (link && img) {
            let filename = link.dataset.filename;
            const normalized = filename.replace(/-/g, '_'); // Normalisasi
    
            let folder = 'kls10'; // Default
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
  
    // Script lain bisa tetap ditaruh di bawah ini
});

document.addEventListener("DOMContentLoaded", function () {
    const itemsPerPage = 12;
    const bookItems = Array.from(document.querySelectorAll('.book-item'));
    const totalPages = Math.ceil(bookItems.length / itemsPerPage);
    const pagination = document.getElementById('pagination-controls');
    const bookList = document.getElementById('book-list');

    function showPage(page) {
        bookItems.forEach((item, index) => {
            item.style.display = (index >= (page - 1) * itemsPerPage && index < page * itemsPerPage) ? 'block' : 'none';
        });
    }

    function renderPagination() {
        pagination.innerHTML = '';
        for (let i = 1; i <= totalPages; i++) {
            const btn = document.createElement('button');
            btn.textContent = i;
            btn.style.margin = '0 5px';
            btn.onclick = () => showPage(i);
            pagination.appendChild(btn);
        }
    }

    renderPagination();
    showPage(1); // Tampilkan halaman pertama
});
  
document.addEventListener('DOMContentLoaded', function () {
    loadFavoriteStatus();
  });

  // Fungsi untuk toggle favorit
  function toggleFavorite(button) {
    button.classList.toggle('active');
    const bookItem = button.closest('.book-item');
    const bookLink = bookItem.querySelector('a');
    const bookImage = bookItem.querySelector('img');
    const bookLevel = bookItem.querySelector('.book-level')?.textContent || '';
    const bookTitle = bookItem.querySelector('.book-info h3')?.textContent || '';

    const bookData = {
      filename: bookLink.getAttribute('data-filename'),
      cover: bookImage.getAttribute('src'),
      level: bookLevel,
      title: bookTitle
    };

    // Ambil data favorit saat ini dari localStorage
    let favorites = JSON.parse(localStorage.getItem('bookFavorites')) || [];

    // Cek apakah buku sudah ada di favorit
    const existingIndex = favorites.findIndex(fav => fav.filename === bookData.filename);

    if (button.classList.contains('active')) {
      // Tambahkan ke favorit jika belum ada
      if (existingIndex === -1) {
        favorites.push(bookData);
      }
    } else {
      // Hapus dari favorit jika sudah ada
      if (existingIndex !== -1) {
        favorites.splice(existingIndex, 1);
      }
    }

    // Simpan kembali ke localStorage
    localStorage.setItem('bookFavorites', JSON.stringify(favorites));
  }

  // Fungsi untuk memuat status favorit
  function loadFavoriteStatus() {
    const favorites = JSON.parse(localStorage.getItem('bookFavorites')) || [];
    const bookItems = document.querySelectorAll('.book-item');

    bookItems.forEach(item => {
      const filename = item.querySelector('a')?.getAttribute('data-filename');
      const favoriteBtn = item.querySelector('.favorite-btn');

      const isFavorite = favorites.some(fav => fav.filename === filename);
      if (isFavorite) {
        favoriteBtn.classList.add('active');
      }
    });
  }



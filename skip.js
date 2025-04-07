document.addEventListener("DOMContentLoaded", () => {
    const books = [
        { title: "Kelas X Bahasa Inggris", filename: "Bahasa-Inggris-BS-KLS-X" },
        { title: "Kelas X Bahasa Indonesia", filename: "Bahasa_Indonesia_BS_KLS_X_Rev" },
        { title: "Kelas X Informatika", filename: "Informatika-BS-KLS-X" },
        { title: "Kelas X Ilmu Pengetahuan Alam", filename: "IPA_BS_KLS_X_Rev" },
        { title: "Kelas X Ilmu Pengetahuan Sosial", filename: "IPS_BG_KLS_X_Rev" },
        { title: "Kelas X Pendidikan Agama Islam", filename: "Islam-BS-KLS-X" },
        { title: "Kelas X Pendidikan Agama Katolik", filename: "Katolik-BS-KLS-X" },
        { title: "Kelas X Pendidikan Agama Kristen", filename: "Kristen-BS-KLS-X" },
        { title: "Kelas X Matematika", filename: "Matematika-BS-KLS-X" },
        { title: "Kelas X Matematika (Revisi)", filename: "Matematika_BS_KLS_X_Rev" },
        { title: "Kelas X Pancasila", filename: "Pendidikan-Pancasila-BS-KLS-X" },
        { title: "Kelas X Sejarah", filename: "Sejarah-BS-KLS-X" },
      
        { title: "Kelas XI Antropologi", filename: "Antropologi-BS-KLS-XI" },
        { title: "Kelas XI Bahasa Indonesia", filename: "Bahasa-Indonesia-BS-KLS-XI" },
        { title: "Kelas XI Bahasa Indonesia Tingkat Lanjut", filename: "Bahasa-Indonesia-Tingkat-Lanjut-BS-KLS-XI" },
        { title: "Kelas XI Bahasa Inggris", filename: "Bahasa-Inggris-BS-KLS-XI-efc" },
        { title: "Kelas XI Bahasa Inggris Tingkat Lanjut", filename: "Bahasa-Inggris-Tingkat-Lanjut-BS-KLS-XI" },
        { title: "Kelas XI Biologi", filename: "Biologi-BS-KLS-XI" },
        { title: "Kelas XI Ekonomi", filename: "Ekonomi-BS-KLS-XI" },
        { title: "Kelas XI Fisika", filename: "Fisika-BS-KLS-XI" },
        { title: "Kelas XI Geografi", filename: "Geografi-BS-KLS-XI" },
        { title: "Kelas XI Informatika", filename: "Informatika-BS-KLS-XI" },
        { title: "Kelas XI Pendidikan Agama Islam", filename: "Islam-BS-KLS-XI" },
        { title: "Kelas XI Pendidikan Agama Katolik", filename: "Katolik-BS-KLS-XI" },
        { title: "Kelas XI Kimia", filename: "Kimia-BS-KLS-XI" },
        { title: "Kelas XI Pendidikan Agama Kristen", filename: "Kristen-BS-KLS-XI" },
        { title: "Kelas XI Matematika", filename: "Matematika-BS-KLS-XI" },
        { title: "Kelas XI Matematika Tingkat Lanjut", filename: "Matematika-Tingkat-Lanjut-BS-KLS-XI" },
        { title: "Kelas XI Pancasila (Revisi)", filename: "Pendidikan-Pancasila-BS-KLS-XI-Rev" },
        { title: "Kelas XI Sejarah", filename: "Sejarah-BS-KLS-XI" },
        { title: "Kelas XI Sosiologi", filename: "Sosiologi-BS-KLS-XI" },
      
        { title: "Kelas XII Antropologi", filename: "Antropologi_BS_KLS_XII" },
        { title: "Kelas XII Biologi (Revisi)", filename: "Biologi_BS_KLS_XII_Rev" },
        { title: "Kelas XII Ekonomi", filename: "Ekonomi_BS_KLS_XII" },
        { title: "Kelas XII Fisika", filename: "Fisika_BS_KLS_XII" },
        { title: "Kelas XII Bahasa Indonesia", filename: "Indonesia_BS_KLS_XII" },
        { title: "Kelas XII Bahasa Indonesia Tingkat Lanjut", filename: "Indonesia_Lanjut_BS_KLS_XII" },
        { title: "Kelas XII Informatika", filename: "Informatika_BS_KLS_XII" },
        { title: "Kelas XII Bahasa Inggris", filename: "Inggris_BS_KLS_XII" },
        { title: "Kelas XII Bahasa Inggris Tingkat Lanjut", filename: "Inggris_Lanjut_BG_KLS_XII" },
        { title: "Kelas XII Pendidikan Agama Islam", filename: "Islam_BS_KLS_XII_" },
        { title: "Kelas XII Pendidikan Agama Katolik", filename: "Katolik_BS_KLS_XII" },
        { title: "Kelas XII Kimia", filename: "Kimia_BS_KLS_XII" },
        { title: "Kelas XII Pendidikan Agama Kristen", filename: "Kristen-BS-KLS-XII" },
        { title: "Kelas XII Matematika", filename: "Matematika-BS-KLS-XII" },
        { title: "Kelas XII Matematika Tingkat Lanjut", filename: "Matematika-Lanjut-BS-KLS-XII" },
        { title: "Kelas XII Pancasila", filename: "Pendidikan-Pancasila-BS-KLS-XII" },
        { title: "Kelas XII Sejarah", filename: "Sejarah_BS_KLS_XII" },
        { title: "Kelas XII Sosiologi", filename: "Sosiologi_BS_KLS_XII" }
      ];
  
    const input = document.getElementById("searchInput");
    const results = document.getElementById("searchResults");
  
    input.addEventListener("input", () => {
      const query = input.value.toLowerCase();
      results.innerHTML = "";
  
      if (query.trim() === "") {
        results.style.display = "none";
        return;
      }
  
      const matchedBooks = books.filter(book =>
        book.title.toLowerCase().includes(query)
      );
  
      if (matchedBooks.length === 0) {
        results.style.display = "none";
        return;
      }
  
      matchedBooks.forEach(book => {
        const li = document.createElement("li");
        li.style.padding = "10px";
        li.style.cursor = "pointer";
        li.innerHTML = `<i class="fa-solid fa-book" style="margin-right: 8px;"></i> ${book.title}`;
  
        li.addEventListener("click", () => {
          window.location.href = `/viewer.html?file=${encodeURIComponent(book.filename)}`;
        });
  
        results.appendChild(li);
      });
  
      results.style.display = "block";
    });
  
    // Sembunyikan dropdown ketika klik di luar
    document.addEventListener("click", (e) => {
      if (!document.querySelector(".search-container").contains(e.target)) {
        results.style.display = "none";
      }
    });
  });
  
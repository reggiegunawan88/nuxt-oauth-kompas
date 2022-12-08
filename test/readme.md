Unit Test Nuxt JS by Jest

- Apa itu unit test?
  Unit test adalah proses pengecekan yang dilakukan oleh unit pada suatu program, misalkan sebuah method.

- Tujuan unit test?
  Unit test biasanya dibuat oleh developer untuk memastikan agar unit komponen program yang dihasilkan sesuai dengan
  hasil yang diharapkan.

Secara garis besar ada 3 tahapan testing yaitu:

- unit test
- integration test
- end to end test

Apa yang akan di test? (referensi: https://www.vuemastery.com/courses/unit-testing-vue-3/what-to-test-vue-3/)
Input:

1. Component Data
2. Component Props
3. User interaction (klik button, isi field input, dsb)
4. Lifecycle method (mounted, created, updated, dsb)
5. Vuex store
6. Routing (jika ada)

Output:

1. Hasil render pada DOM
2. Pemanggilan fungsi
3. Update data ke Vuex
4. Hubungan antar parent dan child component (jika ada)

Apa yang seharusnya tidak di test?

- Detil implementasi (terutama logic)
- Third party lib (lib sudah terdapat unit test nya sendiri)
- Fungsi bawaan framework -> contoh kita define parameter sebuah data INT, jika kita masukkan tipe data STRING maka akan
  otomatis di throw oleh Nuxt/Vue nya.

  Referensi:
  https://www.webtips.dev/writing-your-very-first-unit-test-with-jest
  https://id.quora.com/Seberapa-pentingkah-unit-test-dalam-pengembangan-perangkat-lunak
  https://testdriven.io/blog/vue-unit-testing/
  https://medium.com/@lachlanmiller_52885/mocking-vuex-in-vue-unit-tests-b6eda1c4d301

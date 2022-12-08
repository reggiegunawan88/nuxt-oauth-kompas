Metode populer CSS front-end yang ada sekarang:

1. Inline CSS -> direct styling, tailwind, windiCSS
2. Regular CSS -> external .css file
3. Styled components -> emotions, 1 script style utk 1 komponen
4. CSS preprocessing (SASS, LESS) -> external .sass file
5. Framework -> Bootstrap, Material, SemanticUI, etc

Breakdown:

1. Inline CSS
   a. direct styling -> <p style="padding: 20px, margin: 20px, background-color dsb"></p> (VanillaCSS)
   b. tailwind/windiCSS -> <p class="p-20 m-20"></p> <button class="btn-secondary"></button>

2. Regular CSS -> harus import external file per komponen (VanillaCSS) -> pakai tailwind
   Contoh: index.css
   Output:
   {
   #title {
   font-size: 20px
   margin: 10px
   }
   .description {
   background-color: red
   }
   }
   Notes: file bisa sangat panjang dan susah untuk dimaintain kalo scope project semakin besar, size css bengkak

3. Styled components -> scripting css, apply ke komponen HTML/DOM (emotions.js) -> pakai tailwind
   Output:
   const styledDiv = styled.div ` background-color: blue margin: 10px`
   const styledText = styled.p` font-size: 10px padding: 5px`

const styledComponent = (
<styledDiv>
<styledText>

<p>Hello world</p>
</styldText>
</styledDiv>
)
Notes: file .vue ato .jsx bisa sangat panjang, maintainability ga seoptimal inline css

4.  CSS Preprocessing -> SASS, SCSS, LESS (external file import)
    Contoh: style.sass, style.less
    Output:
    {
    bg-color: red
    padding-text: 10px

    #title-text {
    color: $bg-color
    padding: $padding-text
    {
    <!-- bisa nested styling -->

    .description{

    }

    }

    }
    }
    Notes: butuh import external file, scope besar -> css size bengkak

5.  Framework
Contoh: Bootstrap, W3, SemanticUI
Output:
<div>
  <Grid>
    <Column>
    <Table>
    <Carousel>
    <Button>Hello World</Button>
    </Carousel>
    </Table>
    </Column>
  </Grid>
</div>

Notes: Pemakaian plug & play, cocok untuk scope kecil yang ga ada design system khusus. Concern utama yaitu
size bundle besar dan sangat sulit untuk dicustomize.

Best practice saat ini: TailwindCSS (approach: reusable style/reusable components/inline-tailwind).
Why?
Pros:

1. Lightweight
2. Maintainable
3. Cocok untuk perusahaan yang udah punya design system khusus
4. Bisa solve styling problem sampai ke low-level component
5. Kerja lebih cepet, ga pusing buat nge define nama kelas
6. Initial configuration diawal project
7. Directly update tag
8. Ga perlu file eksternal css

Cons:

1. Berantakan -> ini concern terbesar saat ini
2. Komponen tertentu seperti modal, carousel, slider dkk harus diimplementasi sendiri (ga bisa plug & play)
3. Tidak cocok untuk scope projek kecil tanpa framework apapun

Conclusion:
Pilihan: Reusable style TailwindCSS (with JIT engine).

Cara kerja:

1. Define tailwind.css pada folder assets/css (index file)
2. import library tailwind "@tailwind base, @tailwind components, dan @tailwind utilities"
3. Define file .css lain yang akan digunakan (reusable.css) lalu diimport ke tailwind.css
4. Tambahkan mode:'JIT' pada tailwind.config.js
5. Pakai style yang sudah dibuat langsung ke template.html

Pros:

1. Membuat reusable style.
2. Membuat kode styling pada template.html menjadi jauh lebih singkat dan lebih rapih.
3. Fleksibel, dapat dikombinasikan dengan inline-tailwind css.
4. JIT engine (salah satu library Tailwind CSS yang paling powerful saat ini).

Homework:

1. Perlu standarisasi style apa saja yang sekiranya akan dipakai berkali-kali.
2. Naming convention harus kuat (menghindari ambiguitas)
3. Jika file style sudah terlalu panjang, harus dipisah menjadi chunks lagi.

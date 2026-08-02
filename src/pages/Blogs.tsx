import { useState, useEffect } from "react";
import { BookOpen, Sparkles, Hourglass, ArrowLeft, Calendar, Clock, ChevronRight, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import PageNavButtons from "../components/PageNavButtons";
import SEOHead from "../components/SEOHead";

export const BLOG_POSTS = [
  {
    id: "ai-search-recommendation",
    title: "Kā panākt, lai AI aģents pēc meklētāja pieprasījuma piedāvā tieši Jūsu mājaslapu",
    category: "Optimizācija",
    date: "17.07.2026",
    readTime: "5 min lasīšana",
    image: "https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=800&q=80",
    excerpt: "Tīmekļa meklēšana piedzīvo milzīgas pārmaiņas. Uzziniet, kā optimizēt savu mājaslapu GEO (Generative Engine Optimization) standartiem, lai ChatGPT, Gemini un citi mākslīgā intelekta aģenti ieteiktu tieši Jūsu uzņēmumu.",
    content: `Tīmekļa meklēšana šobrīd piedzīvo lielākās pārmaiņas kopš Google pirmsākumiem. Tradicionālo meklētājprogrammu vietā arvien vairāk lietotāju izmanto AI aģentus, ChatGPT, Google Gemini un Perplexity, lai saņemtu tūlītējas, personalizētas atbildes un ieteikumus. Šo jauno disciplīnu sauc par GEO (Generative Engine Optimization) jeb ģeneratīvo dzinēju optimizāciju.

### Kāpēc tradicionālais SEO vairs nav pilnīgs?

Tradicionālo meklētājprogrammu rezultātos lietotājs saņem vienkāršu saišu sarakstu. Turpretī AI aģenti analizē tīmekļa resursus reāllaikā, apkopo informāciju un sniedz konkrētu, gatavu ieteikumu. Ja Jūsu uzņēmums un pakalpojumi nav pielāgoti šo dzinēju darbības principiem, Jūs riskējat palikt nepamanīti.

### Kā optimizēt mājaslapu AI aģentiem?

1. Strukturēti dati un Schema marķējums:
AI aģenti uztver un nolasa mājaslapu saturu caur skaidru datu struktūru. Izmantojot detalizētu JSON-LD Schema marķējumu, Jūs palīdzat AI labāk saprast Jūsu pakalpojumus, darba laikus, cenas un klientu atsauksmes.

2. Dabiskās valodas un jautājumu-atbilžu saturs:
AI vaicājumi visbiežāk tiek formulēti kā pilni jautājumi. Saturs, kas veidots skaidrā, dabiskā valodā un tieši atbild uz biežāk uzdotajiem jautājumiem ("Cik maksā...", "Kāpēc izvēlēties..."), ir daudz piemērotāks AI dzinēju apstrādei.

3. Zīmola pieminējumi un atsauksmes tīmeklī:
AI mācās no uzticamiem ārējiem avotiem. Jo biežāk Jūsu uzņēmums ir pozitīvi minēts nozares portālos, katalogos un atsauksmju vietnēs (Google Business, Trustpilot), jo lielāka ir iespēja, ka AI ieteiks tieši Jūs.

Sageon Media savos projektos jau šodien iestrādā visus nepieciešamos tehniskos parametrus, lai Jūsu zīmols būtu līderpozīcijās ne tikai Google meklētājā, bet arī visu populārāko mākslīgā intelekta aģentu ieteikumos.`
  },
  {
    id: "page-speed",
    title: "Kāpēc ātrs ielādes laiks ir kritisks Jūsu mājaslapas panākumiem",
    category: "Optimizācija",
    date: "14.07.2026",
    readTime: "4 min lasīšana",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80",
    excerpt: "Lapas ielādes ātrums ir pirmais iespaids par Jūsu uzņēmumu tīmeklī. Uzziniet, kā katra milisekunde ietekmē lietotāju pacietību un konversijas rādītājus.",
    content: `Mūsdienu dinamiskajā pasaulē lietotāju pacietība tīmeklī mērāma sekundes desmitdaļās. Ja Jūsu mājaslapa ielādējas ilgāk par 3 sekundēm, vairāk nekā puse apmeklētāju to pametīs vēl pirms satura ieraudzīšanas.

### Kāpēc ātrums ir tik svarīgs?

1. Lietotāju pieredze (UX): Ātra mājaslapa rada uzticamību un profesionālu tēlu. Lietotāji jūtas ērti un labprātāk pārlūko citas Jūsu sadaļas.
2. Mobilā responsivitāte: Ļoti bieži lietotāji tīmekli pārlūko, izmantojot mobilos datus (3G/4G/5G). Šādos apstākļos smagas lapas ar neoptimizētiem attēliem var ielādēties pat desmitiem sekunžu.
3. Konversijas rādītāji: Pētījumi rāda, ka ielādes laika samazināšana par vienu sekundi var palielināt konversijas rādītājus pat par 20%.

### Kā mēs panākam maksimālu ātrumu?

Sageon Media izmanto modernākās izstrādes tehnoloģijas (piemēram, React un Vite), veic rūpīgu attēlu saspiešanu (WebP formāts) un koda minifikāciju. Tas nodrošina, ka Jūsu mājaslapa būs zibenīgi ātra jebkurā ierīcē.`
  },
  {
    id: "ui-ux-conversion",
    title: "5 būtiskākie UI/UX principi, kas palielina mājaslapas konversiju",
    category: "Dizains",
    date: "08.07.2026",
    readTime: "5 min lasīšana",
    image: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?auto=format&fit=crop&w=800&q=80",
    excerpt: "Skaists dizains ir tikai puse no uzvaras. Pārdomāta lietotāju pieredze (UX) ir tas, kas palīdz pārvērst parastus apmeklētājus par reāliem maksājošiem klientiem.",
    content: `Mājaslapas dizainam ir jābūt ne tikai estētiskam, bet arī funkcionālam. Izcils UI/UX dizains vada lietotāju pa skaidru ceļu līdz vēlamajam rezultātam – pirkumam, pieteikumam vai saziņai.

### 5 būtiskākie principi konversijas veicināšanai:

1. Skaidrs un redzams CTA (Call to Action): Saziņas un pieteikuma pogām ir jābūt pamanāmām, kontrastējošās krāsās un izvietotām loģiskās vietās.
2. Vizuālā hierarhija: Svarīgākajai informācijai un virsrakstiem ir jābūt lielākiem un skaidriem. Lietotājam jāspēj 5 sekunžu laikā saprast, ko Jūs piedāvājat.
3. Vienkārša navigācija: Nesarežģījiet izvēlni. Svarīgākajām sadaļām jābūt viegli pieejamām ar vienu klikšķi.
4. Gaisa un telpas izmantošana (White Space): Neaizpildiet katru pikseli ar tekstu vai elementiem. Brīva telpa palīdz acīm atpūsties un koncentrēties uz galveno saturu.
5. Uzticības elementi: Izvietojiet klientu atsauksmes, sadarbības partneru logo vai paveikto darbu piemērus redzamā vietā.

Mēs Sageon Media katru dizainu veidojam no nulles, analizējot Jūsu mērķauditorijas paradumus, lai izstrādātu maksimāli efektīvu pārdošanas instrumentu.`
  },
  {
    id: "maintenance-security",
    title: "Mājaslapas uzturēšana: Kāpēc drošība un rezerves kopijas ir obligātas",
    category: "Drošība",
    date: "29.06.2026",
    readTime: "4 min lasīšana",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80",
    excerpt: "Mājaslapas palaišana ir tikai sākums. Regulāri drošības atjauninājumi un rezerves kopijas pasargā Jūsu biznesu no negaidītiem datu zudumiem un uzbrukumiem.",
    content: `Daudzi uzņēmumi uzskata, ka pēc mājaslapas nodošanas ekspluatācijā par to var aizmirst. Tomēr tīmeklis nepārtraukti mainās – rodas jaunas drošības ievainojamības, spraudņu atjauninājumi un serveru tehnoloģiju pārmaiņas.

### Kāpēc uzturēšana ir kritiski svarīga?

1. Aizsardzība pret uzbrukumiem: Novecojusi programmatūra un spraudņi ir galvenais mērķis hakeru uzbrukumiem. Regulāri atjauninājumi aizver drošības caurumus.
2. Regulāras rezerves kopijas (Backups): Ja kaut kas noiet greizi vai serverim rodas tehniskas kļūmes, aktuāla rezerves kopija ļauj atjaunot lapas darbību dažu minūšu laikā.
3. Tehniskā stabilitāte: Gadu gaitā tīmekļa pārlūki (Chrome, Safari, Firefox) tiek atjaunināti. Regulāra pārbaude garantē, ka lapa vienmēr izskatīsies un darbosies perfekti.

Mūsu uzturēšanas plāns parūpējas par visu tehnisko pusi, lai Jūs varētu pilnībā koncentrēties uz sava biznesa vadību, zinot, ka mājaslapa ir drošās rokās.`
  },
  {
    id: "website-as-sales-rep",
    title: "Mājaslapa kā 24/7 pārdošanas speciālists: Kā pārvērst apmeklētājus reālos pieteikumos",
    category: "Pārdošana",
    date: "25.06.2026",
    readTime: "5 min lasīšana",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    excerpt: "Labi izstrādāta mājaslapa strādā bez brīvdienām un pusdienlaika pārtraukumiem. Uzziniet, kā pareizi strukturēts saturs un skaidri aicinājumi uz darbību pārvērš nejaušus apmeklētājus par ilgtermiņa klientiem.",
    content: `Daudzi uzņēmumu īpašnieki uzskata mājaslapu par statisku vizītkarti. Patiesībā pareizi veidota mājaslapa ir Jūsu labākais pārdošanas speciālists, kas strādā 24 stundas diennaktī, 7 dienas nedēļā.

### Kāpēc mājaslapa pārdod efektīvāk?

1. Apmeklētāja vadīšana pa pārdošanas piltuvi:
Katrai sadaļai ir jāsniedz atbilde uz konkrētu klienta jautājumu un pakāpeniski jānovada viņš līdz saziņas vai pieteikuma formai.

2. Šaubu kliedēšana pirms saziņas:
Biežāk uzdotie jautājumi (BUJ), caurspīdīga cenu politika un iepriekšējo klientu atsauksmes kliedē apmeklētāja šaubas un rada uzticamību.

3. Neatliekams pieteikuma aicinājums (CTA):
Lietotājam nevajadzētu meklēt, kā ar Jums sazināties. Saziņas pogām, zvana iespējām un formām ir jābūt organiski integrētām un viegli sasniedzamām no jebkuras ierīces.`
  },
  {
    id: "mobile-first-design",
    title: "Mobilā versija pirmajā vietā: Kāpēc vairāk nekā 70% lietotāju izvēlas viedtālruņus",
    category: "Lietojamība",
    date: "21.06.2026",
    readTime: "4 min lasīšana",
    image: "https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?auto=format&fit=crop&w=800&q=80",
    excerpt: "Vairums Jūsu klientu pirmo iespaidu par uzņēmumu gūst savā telefonā. Uzziniet, kāpēc Mobile-First dizains un skārienekrānam draudzīga navigācija nosaka biznesa veiksmi.",
    content: `Vairāk nekā 70% no visas tīmekļa satiksmes šodien nāk no mobilajām ierīcēm. Ja Jūsu mājaslapa telefonā izskatās neērta, teksts ir par mazu vai pogas ir grūti nospiežamas, Jūs zaudējat lielāko daļu no saviem klientiem.

### Mobile-First pieejas būtiskākie ieguvumi:

1. Apmeklētāju noturēšana: Mobilajā ierīcē lietotāja uzmanība ir īpaši trausla. Skaidra navigācija un lieli, viegli nospiežami elementi padara pārlūkošanu patīkamu.
2. Google meklēšanas reitingi: Google jau gadiem izmanto Mobile-First indeksāciju — tas nozīmē, ka Jūsu lapas pozīciju meklēšanas rezultātos nosaka tieši tās mobilā versija.
3. Ātra un ērta saziņa: Mobilajā versijā saziņas pogas ļauj veikt zvanu vai nosūtīt ziņu ar vienu vienīgu pieskārienu.`
  },
  {
    id: "landing-page-vs-website",
    title: "Kā pareizi izvēlēties mājaslapas struktūru: Mērķlapa (Landing Page) vai daudzu lapu risinājums?",
    category: "Stratēģija",
    date: "15.06.2026",
    readTime: "5 min lasīšana",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80",
    excerpt: "Vai Jūsu biznesam piemērotāka ir mērķtiecīga Landing lapa vai apjomīga Multiple Page mājaslapa? Apskatām katra modeļa priekšrocības un piemērotību konkrētiem mērķiem.",
    content: `Pareizas mājaslapas arhitektūras izvēle ir pirmais un svarīgākais solis projekta plānošanā. Nepareizs formāts var apgrūtināt lietotājus vai sadārdzināt izstrādi.

### Landing Page (Vienas lapas risinājums):
- Kam piemērots: Konkrēta pakalpojuma, produkta vai kampaņas reklamēšanai.
- Priekšrocības: Augsts konversijas rādītājs, mērķtiecīga un lineāra apmeklētāja vadīšana, ātra izstrāde.

### Multiple Page (Daudzu lapu risinājums):
- Kam piemērots: Uzņēmumiem ar plašu pakalpojumu klāstu, uzņēmuma vēsturi un blogu.
- Priekšrocības: Lieliskas iespējas apjomīgai SEO optimizācijai, katram pakalpojumam atsevišķa detalizēta sadaļa.`
  },
  {
    id: "seo-fundamentals-2026",
    title: "Google SEO pamati: Kā organiskā meklēšana sniedz bezmaksas klientu plūsmu",
    category: "SEO",
    date: "10.06.2026",
    readTime: "6 min lasīšana",
    image: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&w=800&q=80",
    excerpt: "Meklētājprogrammu optimizācija nav vienreizējs darbs, bet gan stratēģisks ieguldījums. Atklājiet svarīgākos atslēgvārdu, tehnisko uzlabojumu un satura optimizācijas stūrakmeņus.",
    content: `Katru dienu miljoniem cilvēku meklē pakalpojumus Google meklētājā. Nonākšana pirmajā lapā nodrošina nepārtrauktu, kvalitatīvu un bezmaksas potenciālo klientu plūsmu.

### Kā sasniegt augstas pozīcijas Google?

1. Tehniskā SEO tīrība: Ātrs lapas ātrums, pareizs HTML marķējums, SSL drošības sertifikāts un mobilā pielāgotība.
2. Kvalitatīvs saturs: Saturs, kas sniedz patiesu vērtību, izmantojot mērķtiecīgus nozares atslēgvārdus.
3. Vietējais SEO (Local SEO): Google Business profila sakārtošana un kartes integrācija, lai piesaistītu vietējos pircējus.`
  },
  {
    id: "custom-vs-template-website",
    title: "Kāpēc bezmaksas mājaslapu konstruktori bieži izmaksā dārgāk nekā profesionāla izstrāde",
    category: "Izstrāde",
    date: "04.06.2026",
    readTime: "5 min lasīšana",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80",
    excerpt: "Gatavās veidnes var šķist lēts sākums, taču slēptās izmaksas, lēns ātrums un ierobežota pielāgojamība bieži kļūst par šķērsli uzņēmuma tālākajai izaugsmei.",
    content: `Gatavie mājaslapu konstruktori no pirmā acu uzmetiena šķiet pievilcīgs un lēts veids, kā izveidot lapu pašu spēkiem. Tomēr praksē uzņēmumi ātri saskaras ar nemanāmiem šķēršļiem.

### Kāpēc pielāgota izstrāde atmaksājas?

1. Unikāls dizains bez ierobežojumiem: Jūsu zīmols neizskatīsies pēc simtiem citu uzņēmumu, kas izmanto tās pašas bezmaksas veidnes.
2. Lapas ātrums un koda tīrība: Konstruktori satur daudz lieka koda, kas palēnina lapu un pasliktina Google pozīcijas.
3. Drošība un mērogojamība: Pielāgots risinājums spēj augt kopā ar Jūsu biznesu un nav atkarīgs no trešo pušu platformu nosacījumiem.`
  },
  {
    id: "brand-visual-identity",
    title: "Zīmola vizuālā identitāte digitālajā vidē: Krāsu, šriftu un stila spēks",
    category: "Dizains",
    date: "28.05.2026",
    readTime: "4 min lasīšana",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80",
    excerpt: "Dizains pauž uzņēmuma vērtības vēl pirms tiek izlasīts pirmais teikums. Kā izvēlēties pareizos krāsu akcentus un tipogrāfiju, kas rada tūlītēju uzticību.",
    content: `Digitālajā vidē pirmais iespaids veidojas milisekunžu laikā. Krāsu palete, šriftu izvēle un vizuālais stils tiešā veidā ietekmē to, kā klienti uztver Jūsu pakalpojumu kvalitāti.

### Pārdomātas vizuālās identitātes spēks:

1. Uzticamības radīšana: Profesionāli saskaņotas krāsas un tipogrāfija pauž stabilitāti un nopietnu attieksmi pret darbu.
2. Atpazīstamība: Vienots stils visos kanālos – no mājaslapas līdz sociālajiem tīkliem – palīdz klientiem uzreiz atpazīt Jūsu zīmolu.
3. Emocionālā saikne: Krāsas izraisa konkrētas sajūtas: zaļā pauž izaugsmi un mieru, tumšie toņi piešķir eleganci un ekskluzivitāti.`
  },
  {
    id: "micro-interactions-animations",
    title: "Mikro-interakcijas un animācijas: Kā iepriecināt lietotāju un noturēt uzmanību",
    category: "Dizains",
    date: "22.05.2026",
    readTime: "4 min lasīšana",
    image: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=800&q=80",
    excerpt: "Pārdomātas pogu reakcijas, plūstošas pārejas un subtilas animācijas piešķir mājaslapai dzīvīgumu, uzlabojot lietošanas prieku un iesaisti.",
    content: `Lielisks dizains slēpjas detaļās. Subtilas mikro-interakcijas un animācijas padara mājaslapas lietošanu intuitīvu, mūsdienīgu un patīkamu.

### Kāpēc animācijām ir nozīme?

1. Atsaucības sajūta (Feedback): Kad lietotājs uzvirza kursoru pogai vai aizpilda lauku, neliela vizuāla reakcija apstiprina, ka darbība ir reģistrēta.
2. Uzmanības piesaistīšana svarīgākajam: Plūstošas parādīšanās animācijas palīdz pievērst skatienu svarīgākajiem piedāvājumiem un aicinājumiem uz darbību.
3. Elegants kopiespaids: Mūsdienīgs, plūstošs interfeiss atšķir premiālu mājaslapu no vienkāršas un statiskas šablona lapas.`
  },
  {
    id: "effective-copywriting",
    title: "Kāpēc skaidri un saprotami teksti (Copywriting) ir puse no mājaslapas panākumiem",
    category: "Saturs",
    date: "16.05.2026",
    readTime: "5 min lasīšana",
    image: "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?auto=format&fit=crop&w=800&q=80",
    excerpt: "Pat visskaistākais dizains nestrādās, ja teksti būs sarežģīti vai garlaicīgi. Uzziniet, kā rakstīt īsi, konkrēti un uz klientu ieguvumiem orientēti.",
    content: `Mājaslapas apmeklētāji nelasa katru vārdu — viņi pārskata lapu skatieniem, meklējot atbildes uz savām vajadzībām. Tāpēc tekstam ir jābūt īsam, precīzam un uz ieguvumiem orientētam.

### Efektīva mājaslapas teksta noteikumi:

1. Fokuss uz klienta ieguvumu: Tā vietā, lai tikai uzskaitītu pakalpojumus, paskaidrojiet, kādu problēmu Jūs atrisināt klienta labā.
2. Īsi un trāpīgi virsraksti: Lielie virsraksti ir pirmie, ko pamanīs apmeklētājs. Tiem ir jābūt skaidriem un piesaistošiem.
3. Skaidrs aicinājums uz darbību: Sakiet apmeklētājam tieši, kas jādara tālāk: "Pieteikties konsultācijai", "Aprēķināt izmaksas" vai "Sazināties ar mums".`
  }
];

export default function Blogs() {
  const [activeArticle, setActiveArticle] = useState<typeof BLOG_POSTS[0] | null>(null);

  useEffect(() => {
    if (activeArticle) {
      document.title = `${activeArticle.title} | Sageon Media Blogs`;
    } else {
      document.title = "Blogs & Raksti par Tīmekļa Izstrādi un SEO | Sageon Media";
    }
  }, [activeArticle]);

  return (
    <div className="min-h-screen bg-black font-sans text-left text-white relative overflow-hidden">
      <SEOHead
        title={activeArticle ? `${activeArticle.title} | Sageon Media Blogs` : "Blogs & Raksti par Tīmekļa Izstrādi un SEO | Sageon Media"}
        description={activeArticle ? activeArticle.excerpt : "Noderīgi raksti, nozares jaunumi un ieteikumi par mājaslapu izstrādi, SEO optimizāciju, konversiju uzlabošanu un digitālo mārketingu."}
        ogImage={activeArticle ? activeArticle.image : "/Logo-new.webp"}
        ogType={activeArticle ? "article" : "website"}
        schema={
          activeArticle ? [
            {
              "@context": "https://schema.org",
              "@type": "BlogPosting",
              "@id": `https://sageonmedia.eu/blogs#${activeArticle.id}`,
              "headline": activeArticle.title,
              "description": activeArticle.excerpt,
              "image": activeArticle.image,
              "datePublished": "2026-07-17",
              "author": {
                "@type": "Organization",
                "name": "Sageon Media",
                "url": "https://sageonmedia.eu"
              },
              "publisher": {
                "@type": "Organization",
                "name": "Sageon Media",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://sageonmedia.eu/Logo-new.webp"
                }
              },
              "mainEntityOfPage": `https://sageonmedia.eu/blogs`
            },
            {
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Sākums",
                  "item": "https://sageonmedia.eu"
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": "Blogs",
                  "item": "https://sageonmedia.eu/blogs"
                },
                {
                  "@type": "ListItem",
                  "position": 3,
                  "name": activeArticle.title,
                  "item": `https://sageonmedia.eu/blogs`
                }
              ]
            }
          ] : [
            {
              "@context": "https://schema.org",
              "@type": "Blog",
              "@id": "https://sageonmedia.eu/blogs#blog",
              "name": "Sageon Media Blogs",
              "description": "Padomi par mājaslapu izstrādi, SEO un digitālo mārketingu.",
              "blogPost": BLOG_POSTS.map(post => ({
                "@type": "BlogPosting",
                "headline": post.title,
                "description": post.excerpt,
                "image": post.image,
                "url": `https://sageonmedia.eu/blogs`
              }))
            },
            {
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Sākums",
                  "item": "https://sageonmedia.eu"
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": "Blogs",
                  "item": "https://sageonmedia.eu/blogs"
                }
              ]
            }
          ]
        }
      />
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-25 pointer-events-none z-0" />

      {/* Irregular Green Ambient Background Glows */}
      <div className="absolute -top-32 -left-20 w-[750px] h-[750px] bg-gradient-to-br from-[#BAFC50]/25 via-[#38b000]/20 to-transparent rounded-full blur-[180px] pointer-events-none z-0" />
      <div className="absolute top-1/2 -right-24 w-[800px] h-[800px] bg-gradient-to-bl from-[#38b000]/28 via-[#BAFC50]/22 to-transparent rounded-full blur-[180px] pointer-events-none z-0" />
      <div className="absolute -bottom-40 left-1/3 w-[750px] h-[750px] bg-gradient-to-tr from-[#BAFC50]/25 via-[#38b000]/20 to-transparent rounded-full blur-[180px] pointer-events-none z-0" />

      <div className="w-full max-w-[1380px] mx-auto px-4 sm:px-6 md:px-10 lg:px-12 py-12 md:py-20 space-y-12 relative z-10">
        
        {/* Header Block */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#18181b] border border-zinc-800 text-[#BAFC50] text-[11px] font-sans font-semibold tracking-wider uppercase shadow-sm">
            <BookOpen className="h-3.5 w-3.5 text-[#BAFC50]" />
            <span>Noderīgi raksti & padomi</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight leading-none text-center">
            Noderīga <span className="text-[#BAFC50]">informācija</span>
          </h1>
          <p className="text-sm md:text-base text-zinc-300 max-w-xl mx-auto font-light text-center">
            Noderīga informācija un praktiski padomi par mājaslapu izstrādi, dizainu, optimizāciju un drošību Jūsu biznesa izaugsmei.
          </p>
        </div>

        {/* Blog Posts Grid - Clean Layout with No Card Animations or Top-Left Category Badges */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
          {BLOG_POSTS.map((post) => (
            <article
              key={post.id}
              onClick={() => setActiveArticle(post)}
              className="bg-[#18181b] border border-zinc-800 overflow-hidden shadow-md flex flex-col justify-between group cursor-pointer rounded-2xl"
            >
              <div>
                {/* Image Area - Fixed compact height */}
                <div className="relative h-48 w-full overflow-hidden bg-zinc-900">
                  {/* Dark Image Bottom Vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 z-10" />
                  
                  <img
                    src={post.image}
                    alt={post.title}
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>

                {/* Content Area */}
                <div className="p-5 space-y-3.5">
                  <h3 className="text-base font-bold text-white uppercase tracking-tight group-hover:text-[#BAFC50] transition-colors duration-200 line-clamp-2 leading-snug">
                    {post.title}
                  </h3>
                  
                  <p className="text-xs text-zinc-400 font-light leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              {/* Read Action Row */}
              <div className="px-5 pb-5 pt-3 border-t border-zinc-800 mt-2 flex items-center justify-between">
                <span className="text-[10px] font-sans font-bold text-[#BAFC50] uppercase tracking-widest flex items-center gap-1">
                  Lasīt rakstu <ArrowRight className="h-3 w-3" />
                </span>
              </div>
            </article>
          ))}
        </div>

        {/* Detailed Modal Reader */}
        <AnimatePresence>
          {activeArticle && (
            <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-[100]">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                className="bg-white dark:bg-sageon-deep border border-slate-200 dark:border-sageon-accent/80 max-w-2xl w-full max-h-[85vh] overflow-y-auto rounded-2xl relative shadow-2xl flex flex-col justify-between"
              >
                {/* Header with image */}
                <div>
                  <div className="relative aspect-video w-full overflow-hidden bg-slate-100 dark:bg-sageon-dark">
                    <img
                      src={activeArticle.image}
                      alt={activeArticle.title}
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent" />
                    
                    <button
                      onClick={() => setActiveArticle(null)}
                      className="absolute top-4 right-4 bg-slate-950/80 hover:bg-slate-900 text-white p-2 border border-white/10 rounded-full transition-colors cursor-pointer"
                      aria-label="Aizvērt"
                    >
                      <X className="h-4 w-4" />
                    </button>

                    <div className="absolute bottom-4 left-6 right-6">
                      <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">
                        {activeArticle.title}
                      </h2>
                    </div>
                  </div>

                  {/* Meta removed */}

                  {/* Body Text */}
                  <div className="px-6 py-6 text-slate-700 dark:text-slate-300 space-y-4 text-xs md:text-sm font-light leading-relaxed whitespace-pre-wrap">
                    {activeArticle.content}
                  </div>
                </div>

                {/* Footer bar of Modal */}
                <div className="px-6 py-4 bg-slate-50 dark:bg-sageon-dark/40 border-t border-slate-100 dark:border-sageon-accent/60 flex justify-end items-center">
                  <button
                    onClick={() => setActiveArticle(null)}
                    className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold tracking-wider text-xs uppercase rounded-xl transition-colors cursor-pointer shadow-md hover:shadow-lg"
                  >
                    Aizvērt
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Page Nav Buttons */}
        <PageNavButtons />
      </div>
    </div>
  );
}


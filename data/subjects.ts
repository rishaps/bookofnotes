export interface Subject {
    title: string;
    year: 'Year 1' | 'Year 2' | 'Year 3';
    slug: string;
    image: string;
}

export const subjects: Subject[] = [
    // 1st Year
    {
        title: "Analisi Matematica 1",
        year: "Year 1",
        slug: "analisi-1",
        image: "/FIRST-YEAR-IMAGES/ANALISI-1.jpeg"
    },
    {
        title: "Fondamenti di Informatica",
        year: "Year 1",
        slug: "fondamenti-informatica",
        image: "/FIRST-YEAR-IMAGES/fondamenti-informatic.jpeg"
    },
    {
        title: "Geometria e Algebra Lineare",
        year: "Year 1",
        slug: "geometria-algebra",
        image: "/FIRST-YEAR-IMAGES/geometria-e-algebra-lineare.jpeg"
    },
    {
        title: "Fisica",
        year: "Year 1",
        slug: "fisica",
        image: "/fisica-images/fisica.jpeg"
    },
    {
        title: "Elettrotecnica",
        year: "Year 1",
        slug: "elettrotecnica",
        image: "/FIRST-YEAR-IMAGES/elettrotecnica.jpeg"
    },
    {
        title: "Economia e Org. Aziendale",
        year: "Year 1",
        slug: "economia",
        image: "/FIRST-YEAR-IMAGES/economia-e-org-aziendale.jpeg"
    },

    // 2nd Year
    {
        title: "Analisi Matematica 2",
        year: "Year 2",
        slug: "analisi-2",
        image: "/SECOND-YEAR-IMAGES/analisi2.png"
    },
    {
        title: "Architettura dei Calcolatori e SO",
        year: "Year 2",
        slug: "architettura-os",
        image: "/SECOND-YEAR-IMAGES/acso.png"
    },
    {
        title: "Logica e Algebra",
        year: "Year 2",
        slug: "logica-algebra",
        image: "/SECOND-YEAR-IMAGES/logica-algebra.png"
    },
    {
        title: "Elettromagnetismo e Campi",
        year: "Year 2",
        slug: "elettromagnetismo",
        image: "/SECOND-YEAR-IMAGES/elettromagnetismo.png"
    },
    {
        title: "Probabilità e Statistica",
        year: "Year 2",
        slug: "probabilita-statistica",
        image: "/SECOND-YEAR-IMAGES/probestat.png"
    },
    {
        title: "Informazione e Stima",
        year: "Year 2",
        slug: "informazione-stima",
        image: "/SECOND-YEAR-IMAGES/infoestima.png"
    },
    {
        title: "Segnali per le Comunicazioni",
        year: "Year 2",
        slug: "segnali-comunicazioni",
        image: "/SECOND-YEAR-IMAGES/segnali.png"
    },
    {
        title: "Algoritmi e Principi dell'Informatica",
        year: "Year 2",
        slug: "algoritmi",
        image: "/SECOND-YEAR-IMAGES/aedi.png"
    },
    {
        title: "Fondamenti di Automatica",
        year: "Year 2",
        slug: "automatica",
        image: "/SECOND-YEAR-IMAGES/automatica.png"
    },

    // 3rd Year
    {
        title: "Fondamenti di Elettronica",
        year: "Year 3",
        slug: "elettronica",
        image: "/THIRD-YEAR-IMAGES/fondamenti-elettronica.png"
    },
    {
        title: "Sistemi Informativi",
        year: "Year 3",
        slug: "sistemi-informativi",
        image: "/THIRD-YEAR-IMAGES/sistemi-informativi.png"
    },
    {
        title: "Basi di Dati 1",
        year: "Year 3",
        slug: "basi-dati-1",
        image: "/THIRD-YEAR-IMAGES/basi-dati-1.png"
    },
    {
        title: "Reti Logiche",
        year: "Year 3",
        slug: "reti-logiche",
        image: "/THIRD-YEAR-IMAGES/reti-logiche.png"
    },
    {
        title: "Ingegneria del Software",
        year: "Year 3",
        slug: "ingegneria-software",
        image: "/THIRD-YEAR-IMAGES/ingegneria-software.jpg"
    },
    {
        title: "Fond. Comunicazioni e Internet",
        year: "Year 3",
        slug: "internet",
        image: "/THIRD-YEAR-IMAGES/fondamenti-comunicazione-internet.png"
    },
];

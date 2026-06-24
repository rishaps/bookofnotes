export interface Subject {
    title: string;
    year: 'Year 1' | 'Year 2' | 'Year 3';
    slug: string;
}

export const subjects: Subject[] = [
    // 1st Year
    {
        title: "Analisi Matematica 1",
        year: "Year 1",
        slug: "analisi-1"
    },
    {
        title: "Fondamenti di Informatica",
        year: "Year 1",
        slug: "fondamenti-informatica"
    },
    {
        title: "Geometria e Algebra Lineare",
        year: "Year 1",
        slug: "geometria-algebra"
    },
    {
        title: "Fisica",
        year: "Year 1",
        slug: "fisica"
    },
    {
        title: "Elettrotecnica",
        year: "Year 1",
        slug: "elettrotecnica"
    },
    {
        title: "Economia e Org. Aziendale",
        year: "Year 1",
        slug: "economia"
    },

    // 2nd Year
    {
        title: "Analisi Matematica 2",
        year: "Year 2",
        slug: "analisi-2"
    },
    {
        title: "Architettura dei Calcolatori e SO",
        year: "Year 2",
        slug: "architettura-os"
    },
    {
        title: "Logica e Algebra",
        year: "Year 2",
        slug: "logica-algebra"
    },
    {
        title: "Elettromagnetismo e Campi",
        year: "Year 2",
        slug: "elettromagnetismo"
    },
    {
        title: "Probabilità e Statistica",
        year: "Year 2",
        slug: "probabilita-statistica"
    },
    {
        title: "Informazione e Stima",
        year: "Year 2",
        slug: "informazione-stima"
    },
    {
        title: "Segnali per le Comunicazioni",
        year: "Year 2",
        slug: "segnali-comunicazioni"
    },
    {
        title: "Algoritmi e Principi dell'Informatica",
        year: "Year 2",
        slug: "algoritmi"
    },
    {
        title: "Fondamenti di Automatica",
        year: "Year 2",
        slug: "automatica"
    },

    // 3rd Year
    {
        title: "Fondamenti di Elettronica",
        year: "Year 3",
        slug: "elettronica"
    },
    {
        title: "Sistemi Informativi",
        year: "Year 3",
        slug: "sistemi-informativi"
    },
    {
        title: "Basi di Dati 1",
        year: "Year 3",
        slug: "basi-dati-1"
    },
    {
        title: "Reti Logiche",
        year: "Year 3",
        slug: "reti-logiche"
    },
    {
        title: "Ingegneria del Software",
        year: "Year 3",
        slug: "ingegneria-software"
    },
    {
        title: "Fond. Comunicazioni e Internet",
        year: "Year 3",
        slug: "internet"
    },
];

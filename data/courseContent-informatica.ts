
import { MainSection } from '../types';


export const informaticaContent: MainSection[] = [
    {
        id: "rappresentazione-informazione",
        title: "Rappresentazione dell'Informazione",
        subsections: [
            {
                title: "Introduzione alla Rappresentazione",
                content: [
                    `**Concetto Fondamentale**`,
                    `I moderni calcolatori elettronici possono manipolare informazioni rappresentabili esclusivamente da sequenze composte da due possibili valori (1 o 0, vero o falso, acceso o spento). Nonostante questa apparente limitazione, i calcolatori sono in grado di memorizzare ed elaborare qualsiasi tipo di informazione numerica, testuale, visiva e sonora.`,
                    `In questo capitolo vediamo come sia possibile rappresentare informazioni di qualsiasi tipo usando sequenze di valori binari.`
                ]
            },
            {
                title: "La Logica Binaria",
                content: [
                    `**George Boole e l'Algebra Booleana**`,
                    `![George Boole](/informatica-images/boole-portrait.jpg)`,
                    `Ogni calcolatore elettronico moderno rappresenta qualsiasi tipo di informazione mediante sequenze di valori binari, cioè di elementi che possono assumere solo due possibili valori. Le regole che vengono impiegate per manipolare tali valori sono quelle dell'**algebra booleana**, inventata nel 1847 dal matematico e filosofo britannico **George Boole**.`,
                    `Il successo dell'algebra di Boole deriva dal fatto che può essere realizzata efficacemente mediante circuiti elettronici.`,
                    `**I Bit e gli Operatori Fondamentali**`,
                    `Nell'algebra booleana esistono due possibili valori, **vero** e **falso**, che vengono generalmente rappresentati con i **bit** (Binary Digit, ossia cifra binaria):`,
                    `- $0$ --> falso`,
                    `- $1$ --> vero`,
                    `L'algebra definisce alcune operazioni elementari tra bit:`,
                    `- **Congiunzione logica (AND)**: indicata con il simbolo $\\land$`,
                    `- **Disgiunzione logica (OR)**: indicata con il simbolo $\\lor$`,
                    `- **Negazione (NOT)**: indicata con il simbolo $\\neg$`,
                    `Gli operatori $\\textbf{and}$ e $\\textbf{or}$ si applicano a coppie di bit e restituiscono un singolo bit come risultato; l'operatore $\\textbf{not}$ opera su un singolo bit, e restituisce un bit come risultato.`
                ]
            },
            {
                title: "Tabelle di Verità",
                content: [
                    `**Definizione**`,
                    `Un modo semplice per descrivere il comportamento degli operatori logici è mediante l'uso di **tabelle di verità**. Una tabella di verità mostra il valore di una espressione logica per ogni possibile valore dei suoi parametri.`,
                    `**Tabella di Verità dell'operatore AND**`,
                    `$$\\begin{array}{|c|c|c|} \\hline x & y & x \\land y \\\\ \\hline 0 & 0 & 0 \\\\ 0 & 1 & 0 \\\\ 1 & 0 & 0 \\\\ 1 & 1 & 1 \\\\ \\hline \\end{array}$$`,
                    `Il risultato dell'operazione $x \\land y$ vale $1$ (vero) **se e solo se** sia $x$ che $y$ valgono $1$.`,
                    `**Tabella di Verità dell'operatore OR**`,
                    `$$\\begin{array}{|c|c|c|} \\hline x & y & x \\lor y \\\\ \\hline 0 & 0 & 0 \\\\ 0 & 1 & 1 \\\\ 1 & 0 & 1 \\\\ 1 & 1 & 1 \\\\ \\hline \\end{array}$$`,
                    `L'espressione $x \\lor y$ vale $1$ **se e solo se** almeno uno tra $x$ e $y$ vale $1$.`,
                    `**Tabella di Verità dell'operatore NOT**`,
                    `$$\\begin{array}{|c|c|} \\hline x & \\neg x \\\\ \\hline 0 & 1 \\\\ 1 & 0 \\\\ \\hline \\end{array}$$`,
                    `L'espressione $\\neg x$ vale $1$ **se e solo se** $x$ vale zero.`,
                    `**Costruzione di Tabelle di Verità Complesse**`,
                    `Applicando la definizione degli operatori di base possiamo costruire la tabella di verità di qualsiasi espressione booleana che combina tali operatori in modo arbitrario. Se una espressione booleana ha $n$ variabili, la sua tabella di verità sarà composta da $2^n$ righe che corrisponderanno a tutte le possibili combinazioni di valori delle variabili.`
                ]
            },
            {
                title: "Esempio: Costruzione di una Tabella di Verità",
                content: [
                    `**Problema**: Scrivere la tabella di verità dell'espressione $(x \\land y) \\lor (\\neg y)$`,
                    `**Svolgimento**:`,
                    `L'espressione ha due variabili, $x$ e $y$, per cui la tabella deve avere $4$ righe. È utile compilare la tabella di verità in modo incrementale.`,
                    `**Passo 1**: Elenchiamo tutte le possibili combinazioni di valori per $x$ e $y$.`,
                    `**Passo 2**: Riportiamo i valori di $x$ e $y$ sotto le occorrenze di queste variabili nell'espressione da valutare.`,
                    `**Passo 3**: Applichiamo le definizioni di AND e NOT per valutare le sotto-espressioni $(x \\land y)$ e $(\\neg y)$.`,
                    `**Passo 4**: Sfruttando i valori delle sotto-espressioni appena calcolati, valutiamo l'espressione completa.`,
                    `**Tabella di Verità Finale**:`,
                    `$$\\begin{array}{|c|c|c|} \\hline x & y & (x \\land y) \\lor (\\neg y) \\\\ \\hline 0 & 0 & 1 \\\\ 0 & 1 & 0 \\\\ 1 & 0 & 1 \\\\ 1 & 1 & 1 \\\\ \\hline \\end{array}$$`
                ]
            },
            {
                title: "Proprietà degli Operatori Booleani",
                content: [
                    `Usando le tabelle di verità è possibile dimostrare le seguenti proprietà degli operatori di base:`,
                    `**Commutatività**`,
                    `- $x \\land y = y \\land x$`,
                    `- $x \\lor y = y \\lor x$`,
                    `**Associatività**`,
                    `- $x \\land (y \\land z) = (x \\land y) \\land z$`,
                    `- $x \\lor (y \\lor z) = (x \\lor y) \\lor z$`,
                    `**Assorbimento**`,
                    `- $x \\land (x \\lor y) = x$`,
                    `- $x \\lor (x \\land y) = x$`,
                    `**Elemento Neutro**`,
                    `- $x \\land 1 = x$`,
                    `- $x \\lor 0 = x$`,
                    `**Complemento**`,
                    `- $x \\land (\\neg x) = 0$`,
                    `- $x \\lor (\\neg x) = 1$`,
                    `**Doppia Negazione**`,
                    `- $\\neg(\\neg x) = x$`,
                    `**Distributività**`,
                    `- $x \\land (y \\lor z) = (x \\land y) \\lor (x \\land z)$`,
                    `- $x \\lor (y \\land z) = (x \\lor y) \\land (x \\lor z)$`,
                    `**Leggi di De Morgan**`,
                    `- $\\neg(x \\land y) = (\\neg x) \\lor (\\neg y)$`,
                    `- $\\neg(x \\lor y) = (\\neg x) \\land (\\neg y)$`
                ]
            },
            {
                title: "Derivare Espressioni da Tabelle di Verità",
                content: [
                    `**Il Problema Inverso**`,
                    `Abbiamo visto come sia possibile scrivere la tabella di verità di una espressione booleana data. Tuttavia, è spesso necessario risolvere il **problema inverso**, cioè costruire una espressione booleana che corrisponda ad una tabella di verità assegnata.`,
                    `Questo problema si pone nella **progettazione di circuiti elettronici**, in cui è dato il comportamento del circuito sotto forma di tabella di verità, ed è necessario derivare l'espressione booleana corrispondente in modo da poterla realizzare mediante porte logiche.`,
                    `**Esempio: Operatore di Equivalenza**`,
                    `Definiamo l'operatore logico di **equivalenza** ($\\equiv$), tale che $x \\equiv y$ vale $1$ se e solo se $x$ e $y$ hanno lo stesso valore, cioè sono entrambi $1$ oppure entrambi $0$.`,
                    `**Tabella di Verità dell'operatore $\\equiv$**:`,
                    `$$\\begin{array}{|c|c|c|} \\hline x & y & x \\equiv y \\\\ \\hline 0 & 0 & 1 \\\\ 0 & 1 & 0 \\\\ 1 & 0 & 0 \\\\ 1 & 1 & 1 \\\\ \\hline \\end{array}$$`,
                    `**Derivazione dell'espressione**:`,
                    `Dalla tabella si vede che $x \\equiv y$ vale $1$ quando $x = 0$ e $y = 0$, oppure quando $x = 1$ e $y = 1$. Pertanto:`,
                    `$$x \\equiv y = ((\\neg x) \\land (\\neg y)) \\lor (x \\land y)$$`,
                    `**Nota Importante**: Sebbene il procedimento funzioni correttamente per qualsiasi tabella di verità, non è garantito che l'espressione booleana che si ottiene sia la più semplice possibile. La semplificazione di espressioni logiche richiede tecniche sofisticate.`
                ]
            },
            {
                title: "Altri Operatori Logici",
                content: [
                    `Gli operatori $\\land$, $\\lor$ e $\\neg$ sono sufficienti per definire qualsiasi espressione booleana, e quindi qualunque altro operatore logico. Esistono tuttavia altri operatori che vengono usati frequentemente.`,
                    `**Operatore XOR (OR Esclusivo)**`,
                    `L'espressione $x \\oplus y$ (XOR) vale $1$ **se e solo se** esattamente uno tra $x$ e $y$ vale $1$.`,
                    `$$\\begin{array}{|c|c|c|} \\hline x & y & x \\oplus y \\\\ \\hline 0 & 0 & 0 \\\\ 0 & 1 & 1 \\\\ 1 & 0 & 1 \\\\ 1 & 1 & 0 \\\\ \\hline \\end{array}$$`,
                    `È possibile realizzare l'operatore XOR usando i tre operatori primitivi:`,
                    `$$x \\oplus y = ((\\neg x) \\land y) \\lor (x \\land (\\neg y))$$`,
                    `**Operatori NAND e NOR**`,
                    `Altri operatori logici frequentemente usati sono la versione "negata" di AND e OR:`,
                    `- **NAND**: $x \\barwedge y = \\neg(x \\land y)$`,
                    `- **NOR**: $x \\veebar y = \\neg(x \\lor y)$`,
                    `**Universalità di NAND e NOR**`,
                    `Gli operatori NAND e NOR godono della proprietà di essere **universali**, nel senso che ogni altro operatore logico può essere realizzato in termini di NAND oppure NOR.`,
                    `Ad esempio: $\\neg x = x \\barwedge x$`
                ]
            },
            {
                title: "Esercizi sulla Logica Binaria",
                content: [
                    `**Esercizio 1.1** - L'implicazione logica $x \\rightarrow y$ ("se $x$ allora $y$") è definita come $(\\neg x) \\lor y$. Scrivere la tabella di verità dell'operatore $\\rightarrow$.`,
                    `**Esercizio 1.2** - Mostrare come sia possibile realizzare l'operatore $\\neg$ utilizzando esclusivamente l'operatore $\\oplus$ (XOR). *Suggerimento*: può essere utile far uso anche di costanti $0$ e/o $1$.`,
                    `**Esercizio 1.3** - Dimostrare che l'operatore NAND è universale, nel senso che è possibile esprimere gli operatori $\\land$, $\\lor$ e $\\neg$ utilizzando espressioni booleane che usano esclusivamente NAND. Ad esempio: $\\neg x = x \\barwedge x$.`,
                    `**Esercizio 1.4** - Dimostrare che l'operatore NOR è universale, nel senso che è possibile esprimere gli operatori $\\land$, $\\lor$ e $\\neg$ utilizzando espressioni booleane che usano esclusivamente NOR. Ad esempio: $\\neg x = x \\veebar x$.`,
                    `**Esercizio 1.5** - Definire una espressione booleana $M(x, y, z)$ (maggioranza) che accetta in input tre bit $x$, $y$ e $z$, e ritorna il valore che compare nella maggioranza degli input. Ad esempio, se $x = 0$, $y = 1$, $z = 0$ la funzione deve restituire $0$; se $x = 1$, $y = 1$, $z = 1$ la funzione deve restituire $1$.`,
                    `**Esercizio 1.6** - Dimostrare le seguenti proprietà dell'operatore XOR:`,
                    `- $(x \\oplus y) \\oplus z = x \\oplus (y \\oplus z)$`,
                    `- $x \\oplus x = 0$`,
                    `- $x \\oplus 0 = x$`,
                    `**Esercizio 1.7** - Dimostrare formalmente che la funzione $f_n(x_{n-1}, x_{n-2}, \\ldots, x_0) = x_{n-1} \\oplus x_{n-2} \\oplus \\ldots \\oplus x_0$ vale $1$ se e solo se la sequenza di bit $x_{n-1}x_{n-2}\\cdots x_0$ ha un numero dispari di cifre $1$.`,
                    `**Esercizio 1.8** - Vero o falso?`,
                    `(a) Consideriamo l'espressione booleana $R = x \\land (\\neg x) \\land y$. Allora esistono dei valori di $x$ e $y$ per i quali si abbia $R = 1$.`,
                    `(b) Consideriamo l'espressione booleana $R = x \\lor (\\neg x)$. Allora esistono dei valori di $x$ per i quali si abbia $R = 1$.`,
                    `(c) Consideriamo l'espressione booleana $R = x \\land (\\neg y)$. Allora se $x$ e $y$ hanno lo stesso valore, il risultato è $R = 0$.`,
                    `(d) Consideriamo l'espressione booleana $R = x \\land (\\neg y)$. Allora per tutte le possibili combinazioni di valori di $x$ e $y$ risulta sempre $R = 0$.`,
                    `**Esercizio 1.9** - Si consideri l'espressione booleana $R = (x \\land y \\land z) \\oplus (x \\lor y \\lor z)$. Per ciascuna delle affermazioni seguenti, dire se è vera o falsa:`,
                    `(a) Se $x = y = z = 1$ allora il risultato è $0$`,
                    `(b) Se $x = y = z = 0$ allora il risultato è $0$`,
                    `(c) Se uno solo tra $x$, $y$, $z$ è $1$, allora il risultato è $1$`,
                    `(d) Se $x = 1$, allora il risultato è sempre $1$ a prescindere dai valori di $y$ e $z$`
                ]
            }
        ]
    },
    // ============================================================
    // Rappresentazione dell'Informazione Numerica
    // ============================================================
    {
        id: "rappresentazione-numerica",
        title: "Rappresentazione dell'Informazione Numerica",
        subsections: [
            {
                title: "Sistemi di Numerazione Posizionali",
                content: [
                    `**Introduzione ai Numeri Naturali**`,
                    `In questa sezione esamineremo come vengono rappresentati i valori numerici all'interno di un calcolatore elettronico. Iniziamo dal tipo numerico più semplice, cioè i numeri naturali $\\mathbb{N} = \\{0, 1, 2, \\ldots\\}$ (valori interi non negativi).`,
                    `**Il Sistema Posizionale in Base 10**`,
                    `Il sistema di numerazione attualmente più utilizzato è il **sistema posizionale in base 10**. Il sistema prevede l'uso di dieci cifre $0, 1, \\ldots, 9$; il sistema decimale è posizionale perché il contributo di ciascuna cifra ("peso") al valore del numero dipende dalla sua posizione:`,
                    `- La cifra più a destra (**cifra meno significativa**) rappresenta le unità`,
                    `- Quella immediatamente precedente indica le decine`,
                    `- Quella ancora precedente le centinaia, e così via`,
                    `**Esempio**: Il numero $17\\,307_{10}$ rappresenta il valore:`,
                    `$$17\\,307_{10} = 1 \\times 10^4 + 7 \\times 10^3 + 3 \\times 10^2 + 0 \\times 10^1 + 7 \\times 10^0$$`,
                    `Si noti che le due cifre $7$ hanno pesi diversi, che dipendono dalla loro posizione nel numero.`,
                    `**Formula Generale**`,
                    `In generale, un numero naturale in base $b \\geq 2$ può essere rappresentato da una sequenza di $k$ cifre $c_{k-1}c_{k-2} \\ldots c_0$, ciascuna compresa tra $0$ e $b-1$ ($0 \\leq c_i \\leq b-1$, per ogni $i = 0, \\ldots, k-1$) e ha valore:`,
                    `$$(c_{k-1}c_{k-2} \\ldots c_0)_b = \\sum_{i=0}^{k-1} c_i \\cdot b^i$$`
                ]
            },
            {
                title: "Basi di Numerazione in Informatica",
                content: [
                    `![Sistemi Maya e Babilonesi](/informatica-images/maya-babylonian-numerals.jpg)`,
                    `Le basi più frequentemente usate in informatica sono:`,
                    `- **Base 2 (binaria)**: cifre $0, 1$`,
                    `- **Base 8 (ottale)**: cifre $0, 1, \\ldots, 7$`,
                    `- **Base 16 (esadecimale)**: cifre $0, \\ldots, 9, A, B, C, D, E, F$`,
                    `Nel sistema esadecimale ciascuna cifra può assumere 16 valori distinti. Poiché disponiamo di sole 10 cifre ($0, \\ldots, 9$), si aggiungono le prime sei lettere dell'alfabeto per indicare le cifre da 10 a 15:`,
                    `$$\\begin{array}{|c|c|c|c|c|c|c|c|} \\hline \\text{Hex} & \\text{Dec} & \\text{Hex} & \\text{Dec} & \\text{Hex} & \\text{Dec} & \\text{Hex} & \\text{Dec} \\\\ \\hline 0 & 0 & 4 & 4 & 8 & 8 & C & 12 \\\\ 1 & 1 & 5 & 5 & 9 & 9 & D & 13 \\\\ 2 & 2 & 6 & 6 & A & 10 & E & 14 \\\\ 3 & 3 & 7 & 7 & B & 11 & F & 15 \\\\ \\hline \\end{array}$$`,
                    `**Nota storica**: Nel corso della storia non si è sempre usata la base 10 per contare. Gli antichi **Maya** utilizzavano un sistema posizionale **vigesimale** (base 20). Gli antichi **Babilonesi** utilizzavano invece un sistema posizionale **sessagesimale** (base 60).`,
                    `Alcuni sistemi sessagesimali sono in uso anche oggi, ad esempio per la misura degli angoli (l'angolo giro misura $360°$) e del tempo (un'ora si compone di 60 minuti, un minuto di 60 secondi).`
                ]
            },
            {
                title: "Conversione da Base b a Base 10",
                content: [
                    `Per convertire un numero espresso in base $b$ nella corrispondente rappresentazione in base 10, si moltiplica ciascuna cifra per il corrispondente peso (potenza di $b$) e si sommano i risultati.`,
                    `**Esempio 2.1**: Convertire in decimale i seguenti valori:`,
                    `**(a)** $0110\\,1101_2$ (binario)`,
                    `$$\\begin{array}{|c|c|c|c|c|c|c|c|l|} \\hline 128 & 64 & 32 & 16 & 8 & 4 & 2 & 1 & \\text{Pesi} \\\\ \\hline 0 & 1 & 1 & 0 & 1 & 1 & 0 & 1 & \\\\ \\hline \\end{array}$$`,
                    `$$64 + 32 + 8 + 4 + 1 = 109_{10}$$`,
                    `**(b)** $736_8$ (ottale)`,
                    `$$\\begin{array}{|c|c|c|l|} \\hline 64 & 8 & 1 & \\text{Pesi} \\\\ \\hline 7 & 3 & 6 & \\\\ \\hline \\end{array}$$`,
                    `$$7 \\times 64 + 3 \\times 8 + 6 \\times 1 = 448 + 24 + 6 = 478_{10}$$`,
                    `**(c)** $D8FA_{16}$ (esadecimale)`,
                    `$$\\begin{array}{|c|c|c|c|l|} \\hline 4096 & 256 & 16 & 1 & \\text{Pesi} \\\\ \\hline D & 8 & F & A & \\\\ \\hline \\end{array}$$`,
                    `$$13 \\times 4096 + 8 \\times 256 + 15 \\times 16 + 10 \\times 1 = 53248 + 2048 + 240 + 10 = 55546_{10}$$`
                ]
            },
            {
                title: "Conversione da Base 10 a Base b",
                content: [
                    `Per la conversione in base $b \\geq 2$ di un intero $v \\geq 0$ si adotta il **procedimento della divisione ripetuta**. Si divide ripetutamente $v$ per $b$ fino a quando il risultato della divisione intera è zero. La sequenza dei **resti** indica la rappresentazione in base $b$ (il primo resto ottenuto indica la cifra meno significativa).`,
                    `**Algoritmo di Conversione**:`,
                    `\`\`\`
Pre: v ≥ 0, b ≥ 2
Post: c_{k-1}c_{k-2}...c_0 sono le cifre in base b

k ← 0
repeat
    c_k ← resto della divisione intera v/b
    v ← quoziente della divisione intera v/b
    k ← k + 1
until v = 0
\`\`\``,
                    `**Esempio 2.2**: Convertire $3853_{10}$ in binario, ottale ed esadecimale.`,
                    `**Conversione in binario** (divisione ripetuta per 2):`,
                    `\`\`\`
3853/2 = 1926 resto 1
1926/2 = 963  resto 0
963/2  = 481  resto 1
481/2  = 240  resto 1
240/2  = 120  resto 0
120/2  = 60   resto 0
60/2   = 30   resto 0
30/2   = 15   resto 0
15/2   = 7    resto 1
7/2    = 3    resto 1
3/2    = 1    resto 1
1/2    = 0    resto 1
\`\`\``,
                    `Da cui: $3853_{10} = 1111\\,0000\\,1101_2$`,
                    `**Conversione in ottale** (divisione ripetuta per 8):`,
                    `\`\`\`
3853/8 = 481 resto 5
481/8  = 60  resto 1
60/8   = 7   resto 4
7/8    = 0   resto 7
\`\`\``,
                    `Da cui: $3853_{10} = 7415_8$`,
                    `**Conversione in esadecimale** (divisione ripetuta per 16):`,
                    `\`\`\`
3853/16 = 240 resto D (13)
240/16  = 15  resto 0
15/16   = 0   resto F (15)
\`\`\``,
                    `Da cui: $3853_{10} = F0D_{16}$`
                ]
            },
            {
                title: "Somma Binaria Senza Segno",
                content: [
                    `La somma tra due numeri binari si esegue con lo stesso meccanismo della somma tra numeri decimali: si sommano le cifre corrispondenti da destra verso sinistra, tenendo conto di eventuali riporti.`,
                    `**Tabella della Somma Binaria**`,
                    `$$\\begin{array}{|c|c|c|c|c|} \\hline x & y & c & x+y+c & c' \\\\ \\hline 0 & 0 & 0 & 0 & 0 \\\\ 0 & 0 & 1 & 1 & 0 \\\\ 0 & 1 & 0 & 1 & 0 \\\\ 0 & 1 & 1 & 0 & 1 \\\\ 1 & 0 & 0 & 1 & 0 \\\\ 1 & 0 & 1 & 0 & 1 \\\\ 1 & 1 & 0 & 0 & 1 \\\\ 1 & 1 & 1 & 1 & 1 \\\\ \\hline \\end{array}$$`,
                    `Dove $c$ è il riporto in ingresso e $c'$ è il nuovo riporto.`,
                    `**Esempio 2.3**: Calcolare $1000\\,0111_2 + 0010\\,1101_2$ con $n = 8$ bit.`,
                    `\`\`\`
  0 0 0 1 1 1 1   Riporto
  1 0 0 0 0 1 1 1 +
  0 0 1 0 1 1 0 1 =
  ─────────────────
  1 0 1 1 0 1 0 0
\`\`\``,
                    `Risultato: $1000\\,0111_2 + 0010\\,1101_2 = 1011\\,0100_2$`,
                    `Verifica decimale: $135 + 45 = 180$ ✓`,
                    `**Errore di Overflow**: Si verifica quando il risultato è troppo grande per essere rappresentato con il numero di bit a disposizione. Nella somma binaria senza segno, si ha overflow quando l'ultimo riporto (quello più a sinistra) è uguale a $1$.`
                ]
            },
            {
                title: "Rappresentazione in Complemento a Due",
                content: [
                    `Per rappresentare anche valori interi negativi si utilizza la **rappresentazione in complemento a due**.`,
                    `**Metodo 1**: Se $v \\geq 0$, la rappresentazione coincide con quella binaria normale. Se $v < 0$, la rappresentazione è la codifica binaria del valore positivo $2^n + v$.`,
                    `**Metodo 2**: Se $v \\geq 0$, usa la rappresentazione binaria normale. Se $v < 0$:`,
                    `- Si calcola la rappresentazione binaria di $|v|$ usando $n$ bit`,
                    `- Si calcola il **complemento a uno** (si invertono le cifre: $0 \\rightarrow 1$, $1 \\rightarrow 0$)`,
                    `- Si incrementa di uno il risultato`,
                    `**Esempio 2.4**: Calcolare la rappresentazione in complemento a due di $-93_{10}$ con $n = 8$ bit.`,
                    `**Metodo 1**: $2^8 + (-93) = 256 - 93 = 163 = 1010\\,0011_2$`,
                    `**Metodo 2**:`,
                    `- $|{-93}| = 93 = 0101\\,1101_2$`,
                    `- Complemento a uno: $1010\\,0010_2$`,
                    `- Aggiungi 1: $1010\\,0011_{2C}$`,
                    `**Conversione da Complemento a Due a Decimale**`,
                    `Si procede come per la normale conversione, ma la prima cifra a sinistra ha peso $-(2^{n-1})$ anziché $2^{n-1}$.`,
                    `**Esempio 2.5**: Calcolare il valore di $1011\\,0001_{2C}$ in base 10.`,
                    `$$\\begin{array}{|c|c|c|c|c|c|c|c|l|} \\hline -128 & 64 & 32 & 16 & 8 & 4 & 2 & 1 & \\text{Pesi} \\\\ \\hline 1 & 0 & 1 & 1 & 0 & 0 & 0 & 1 & \\\\ \\hline \\end{array}$$`,
                    `$$-128 + 32 + 16 + 1 = -79_{10}$$`,
                    `**Proprietà del Complemento a Due**`,
                    `- Usando $n$ bit è possibile rappresentare tutti e soli gli interi nell'intervallo $[-(2^{n-1}), 2^{n-1} - 1]$`,
                    `- Il primo bit a sinistra è $0$ se e solo se $v \\geq 0$ (positivo o zero)`,
                    `$$\\begin{array}{|c|c|c|} \\hline \\text{N. bit} & \\text{Min} & \\text{Max} \\\\ \\hline 8 & -128 & 127 \\\\ 16 & -32768 & 32767 \\\\ 32 & -2147483648 & 2147483647 \\\\ \\hline \\end{array}$$`
                ]
            },
            {
                title: "Somma in Complemento a Due",
                content: [
                    `Un vantaggio della rappresentazione in complemento a due è che la somma si può effettuare con le stesse regole della somma binaria.`,
                    `**Esempio 2.6**: Calcolare $1101\\,0100_{2C} + 1110\\,0101_{2C}$ con $n = 8$ bit.`,
                    `\`\`\`
  1 1 0 0 0 1 0 0   Riporto
  1 1 0 1 0 1 0 0 +
  1 1 1 0 0 1 0 1 =
  ─────────────────
  1 0 1 1 1 0 0 1
\`\`\``,
                    `Risultato: $1011\\,1001_{2C} = -71_{10}$`,
                    `Verifica: $-44 + (-27) = -71$ ✓`,
                    `**Regole per Overflow e Underflow**`,
                    `- **Overflow**: addendi entrambi positivi e risultato negativo`,
                    `- **Underflow**: addendi entrambi negativi e risultato positivo`,
                    `- Se gli addendi sono di **segno opposto**, non si può mai verificare né overflow né underflow`,
                    `**Dimostrazione (addendi di segno opposto)**`,
                    `Se $x \\geq 0$ e $y < 0$, essendo rappresentabili con $n$ bit:`,
                    `$$0 \\leq x \\leq 2^{n-1} - 1$$`,
                    `$$-(2^{n-1}) \\leq y < 0$$`,
                    `Sommando: $-(2^{n-1}) \\leq x + y \\leq 2^{n-1} - 1$, quindi $x + y$ è sempre rappresentabile.`
                ]
            },
            {
                title: "Rappresentazione in Virgola Mobile (IEEE 754)",
                content: [
                    `La rappresentazione standard di valori reali nei calcolatori è basata sullo **standard IEEE 754**. Tale standard consente di rappresentare numeri reali con 32 (precisione singola), 64 (precisione doppia) oppure 128 bit (precisione quadrupla).`,
                    `Un valore reale può essere scritto in **notazione scientifica normalizzata** come $m \\times 2^n$, dove la mantissa $m$ è compresa tra $1$ e $2$ ($1 \\leq |m| < 2$).`,
                    `**Struttura IEEE 754 (Precisione Singola, 32 bit)**`,
                    `$$\\begin{array}{|l|c|l|} \\hline \\text{Campo} & \\text{Bit} & \\text{Descrizione} \\\\ \\hline \\text{Segno} & 1 & 0 = \\text{positivo}, 1 = \\text{negativo} \\\\ \\text{Esponente} & 8 & \\text{Notazione biased (bias = 127)} \\\\ \\text{Mantissa} & 23 & \\text{Parte frazionaria (1. implicito)} \\\\ \\hline \\end{array}$$`,
                    `**Formula per il valore**:`,
                    `$$(-1)^{\\text{segno}} \\times (1 + \\text{mantissa}) \\times 2^{\\text{esponente} - \\text{bias}}$$`,
                    `**Esempio 2.7**: Determinare il valore decimale di $1\\,01111100\\,10110000000000000000000$`,
                    `- Segno: $1$ (negativo)`,
                    `- Esponente: $01111100_2 = 124_{10}$, quindi esponente reale = $124 - 127 = -3$`,
                    `- Mantissa: $1.1011_2 = 1 + 0.5 + 0.125 + 0.0625 = 1.6875$`,
                    `$$(-1)^1 \\times 1.6875 \\times 2^{-3} = -0.2109375_{10}$$`,
                    `**Valori Speciali**`,
                    `$$\\begin{array}{|l|c|} \\hline \\text{Rappresentazione} & \\text{Valore} \\\\ \\hline \\text{Esp.} = 0, \\text{Mant.} = 0 & \\pm 0 \\\\ \\text{Esp. = tutti 1, Mant.} = 0 & \\pm \\infty \\\\ \\text{Esp. = tutti 1, Mant.} \\neq 0 & \\text{NaN} \\\\ \\hline \\end{array}$$`
                ]
            },
            {
                title: "Rappresentazione dell'Informazione Non Numerica",
                content: [
                    `**Codifica dei Caratteri**`,
                    `La codifica più diffusa è la **codifica ASCII** (American Standard Code for Information Interchange), che prevede 128 simboli codificati con 7 bit. In tutti i calcolatori moderni si usa una codifica a 8 bit (1 byte).`,
                    `Per alfabeti con più di 128 simboli è stata sviluppata la codifica **Unicode**, che può utilizzare 8, 16 oppure 32 bit. I primi 128 simboli della codifica a 8 bit coincidono con i caratteri ASCII per garantire compatibilità.`,
                    `**Rappresentazione delle Immagini**`,
                    `![Confronto vettoriale e bitmap](/informatica-images/bitmap-vs-vector.svg)`,
                    `Nelle **rappresentazioni raster** le immagini sono rappresentate da una matrice rettangolare di **pixel** (Picture Elements). La **profondità di colore** indica quanti bit sono usati per pixel:`,
                    `- **1 bpp**: bianco/nero`,
                    `- **8 bpp**: 256 colori (indicizzati)`,
                    `- **24 bpp**: true color (8 bit per canale RGB)`,
                    `Nelle **rappresentazioni vettoriali** le immagini sono descritte mediante entità geometriche (segmenti, curve, poligoni). Questo formato è usato per disegni tecnici e font, poiché può essere scalato senza perdita di qualità.`,
                    `**Esempio 2.8**: Un'immagine bitmap 1024 × 768 pixel con 9 bit per componente RGB richiede:`,
                    `$$1024 \\times 768 \\times 27 = 21\\,233\\,664 \\text{ bit} = 2\\,654\\,208 \\text{ byte}$$`
                ]
            },
            {
                title: "Rappresentazione Audio e Compressione",
                content: [
                    `![Campionamento audio](/informatica-images/campionamento-audio-nyquist.svg)`,
                    `**Campionamento e Quantizzazione**`,
                    `Un'onda sonora è un fenomeno analogico e continuo. Per digitalizzarla:`,
                    `- **Campionamento**: si misura l'ampiezza in istanti discreti $t_0, t_1, t_2, \\ldots$`,
                    `- **Quantizzazione**: si approssima ogni valore con il livello discreto più vicino`,
                    `Maggiore è la **frequenza di campionamento** e il **numero di livelli**, maggiore sarà la qualità audio.`,
                    `**Esempio 2.9**: Bit necessari per un campione audio di 10s:`,
                    `**(a)** 10 kHz, 2048 livelli (11 bit):`,
                    `$$10\\,000 \\times 10 \\times 11 = 1\\,100\\,000 \\text{ bit} = 137\\,500 \\text{ byte}$$`,
                    `**(b)** 20 kHz, 4096 livelli (12 bit):`,
                    `$$20\\,000 \\times 10 \\times 12 = 2\\,400\\,000 \\text{ bit} = 300\\,000 \\text{ byte}$$`,
                    `**Compressione dei Dati**`,
                    `- **Lossless** (senza perdita): è sempre possibile ricostruire esattamente i dati originali`,
                    `- **Lossy** (con perdita): compressione maggiore ma dati originali non ricostruibili; usata per audio/video sfruttando limiti della percezione umana`
                ]
            },
            {
                title: "Esercizi sulla Rappresentazione Numerica",
                content: [
                    `![Calcolatore Setun](/informatica-images/setun-computer.png)`,
                    `**Esercizio 2.1** - Si considerino $A = 0011\\,0110_{2C}$ e $B = 1000\\,1100_{2C}$ con 8 bit. Vero o falso?`,
                    `(a) $A$ rappresenta un valore positivo`,
                    `(b) $B$ rappresenta un valore positivo`,
                    `(c) La somma $A + B$ è rappresentabile in complemento a due con 8 bit`,
                    `(d) $A$ vale 87`,
                    `(e) $A < B$`,
                    `**Esercizio 2.2** - Convertire i valori seguenti da binario senza segno a decimale:`,
                    `(a) $1101\\,0100_2$ (b) $0000\\,1111_2$ (c) $1111\\,0000_2$ (d) $1010\\,1010_2$`,
                    `**Esercizio 2.3** - Convertire da decimale a binario in complemento a due (minimo numero di bit):`,
                    `(a) $2016_{10}$ (b) $47_{10}$ (c) $12_{10}$ (d) $-42_{10}$ (e) $-128_{10}$`,
                    `![Keyset di Engelbart](/informatica-images/engelbart-keyset.jpg)`,
                    `**Esercizio 2.4** - Il keyset di Engelbart ha 5 tasti. Ogni dito poggia su un tasto, e la pressione simultanea di uno o più tasti corrisponde ad un simbolo (se nessun tasto è premuto, il dispositivo è inerte). Quanti simboli diversi è possibile rappresentare?`,
                    `**Esercizio 2.5** - In notazione ternaria bilanciata si usano i simboli $T, 0, 1$ per rappresentare $-1, 0, +1$. Ad esempio: $10T_{bal3} = (+1) \\times 3^2 + 0 \\times 3^1 + (-1) \\times 3^0 = 9 - 1 = 8$. Qual è il massimo e minimo valore rappresentabile con $n$ trit?`,
                    `![Orologi binari](/informatica-images/binary-clock.svg)`,
                    `**Esercizio 2.6** - Calcolare il risultato delle somme seguenti usando $n = 8$ bit in complemento a due; indicare se c'è overflow o underflow:`,
                    `(a) $0110\\,0111_{2C} + 1011\\,1011_{2C}$`,
                    `(b) $0100\\,0001_{2C} + 0110\\,1111_{2C}$`,
                    `(c) $1101\\,1001_{2C} + 1111\\,0001_{2C}$`,
                    `(d) $0111\\,1111_{2C} + 0000\\,0001_{2C}$`,
                    `![Display a 16 segmenti](/informatica-images/display-16-segmenti.svg)`,
                    `**Esercizio 2.7** - Determinare i valori (in binario e decimale) che rappresentano lo stato dei display che mostrano i quattro caratteri CIAO.`,
                    `**Esercizio 2.8** - Un documento di 2 000 000 caratteri contiene solo 26 lettere minuscole, 26 maiuscole, punto e spazio.`,
                    `(a) Quanti bit con codifica ASCII?`,
                    `(b) Quanti bit con codifica ad hoc a lunghezza fissa?`
                ]
            }
        ]
    },
    // ============================================================
    // Architettura dei Calcolatori
    // ============================================================
    {
        id: "architettura-calcolatori",
        title: "Architettura dei Calcolatori",
        subsections: [
            {
                title: "Introduzione ai Circuiti Logici",
                content: [
                    `![Macchina Analitica di Babbage](/informatica-images/babbage-analytical-engine.jpg)`,
                    `Gli operatori booleani introdotti nella prima sezione possono essere efficientemente realizzati tramite dispositivi elettronici, e per questa ragione vengono impiegati come mattoni fondamentali per la costruzione di calcolatori.`,
                    `I calcolatori programmabili non sono stati sempre basati sull'elettronica. La **macchina analitica di Charles Babbage** è considerata il primo esempio di calcolatore programmabile di tipo generale ed era realizzabile interamente mediante parti meccaniche.`,
                    `![Porte logiche](/informatica-images/porte-logiche.svg)`,
                    `I circuiti logici che realizzano gli operatori booleani vengono rappresentati graficamente mediante forme standard. Tali circuiti sono detti **porte logiche**. Più porte logiche possono essere tra loro collegate formando una **rete logica** (o circuito logico), in grado di calcolare qualunque funzione booleana predefinita.`
                ]
            },
            {
                title: "Full Adder (Sommatore)",
                content: [
                    `Il **1-bit full adder** è una rete logica in grado di calcolare la somma binaria con riporto. Riceve in input tre valori binari $A$, $B$ e $C_{in}$, e calcola:`,
                    `- $S = A + B + C_{in}$ (somma)`,
                    `- $C_{out}$ (nuovo riporto)`,
                    `**Espressioni booleane ottimizzate**:`,
                    `$$S = (A \\oplus B) \\oplus C_{in}$$`,
                    `$$C_{out} = ((A \\oplus B) \\land C_{in}) \\lor (A \\land B)$$`,
                    `![Addizionatore completo a 1 bit](/informatica-images/full-adder-1bit.svg)`,
                    `**4-bit Full Adder (Ripple-Carry Adder)**`,
                    `![Addizionatore completo a 4 bit](/informatica-images/full-adder-4bit.svg)`,
                    `Il circuito sommatore ad un bit può essere utilizzato come base per costruire un sommatore per numeri a più bit. Quattro sommatori ad un bit possono calcolare: $A_3A_2A_1A_0 + B_3B_2B_1B_0$.`,
                    `Un sommatore basato sulla propagazione del riporto è detto **ripple-carry adder**. Sebbene sia semplice da realizzare, ha il difetto di essere inefficiente se il numero di cifre è elevato: ogni sommatore deve attendere il riporto dal precedente. Il tempo è proporzionale a $n$.`
                ]
            },
            {
                title: "Comparatore",
                content: [
                    `Un **comparatore ad 1 bit** riceve in input due bit $A$, $B$ e produce tre bit in output:`,
                    `- $GT = 1$ se e solo se $A > B$`,
                    `- $EQ = 1$ se e solo se $A = B$`,
                    `- $LT = 1$ se e solo se $A < B$`,
                    `**Espressioni booleane**:`,
                    `$$GT = A \\land (\\neg B)$$`,
                    `$$EQ = \\neg(A \\oplus B)$$`,
                    `$$LT = (\\neg A) \\land B$$`,
                    `![Comparatore a 1 bit](/informatica-images/comparatore-1bit.svg)`
                ]
            },
            {
                title: "Multiplexer",
                content: [
                    `Un **multiplexer 2-a-1** permette di selezionare il valore di uno dei 2 ingressi. Ha tre input binari $A$, $B$, $S$ (selettore) e produce un output $R$:`,
                    `- $R = A$ se $S = 0$`,
                    `- $R = B$ se $S = 1$`,
                    `![Multiplexer 2 a 1](/informatica-images/multiplexer-2-1.svg)`,
                    `È possibile realizzare multiplexer con più input (solitamente potenze di due): 4-a-1, 8-a-1, ecc. Per un multiplexer $2^n$-a-1 sono necessari $n$ segnali binari per il selettore.`,
                    `**Tabella di verità Multiplexer 4-a-1**`,
                    `$$\\begin{array}{|c|c|c|} \\hline S_1 & S_0 & R \\\\ \\hline 0 & 0 & In_0 \\\\ 0 & 1 & In_1 \\\\ 1 & 0 & In_2 \\\\ 1 & 1 & In_3 \\\\ \\hline \\end{array}$$`
                ]
            },
            {
                title: "Flip-Flop",
                content: [
                    `Un **flip-flop** è un circuito in grado di memorizzare un singolo valore binario per riutilizzarlo in seguito. Si basa su circuiti che contengono cicli, in cui uno o più segnali continuano a circolare.`,
                    `**SR and-or latch**`,
                    `![Latch SR con NAND](/informatica-images/sr-latch-nand.svg)`,
                    `Ha due ingressi $S$ (Set) e $R$ (Reset):`,
                    `$$\\begin{array}{|c|c|c|l|} \\hline S & R & Q' & \\text{Azione} \\\\ \\hline 0 & 0 & Q & \\text{Preserva stato} \\\\ 0 & 1 & 0 & \\text{Reset} \\\\ 1 & 0 & 1 & \\text{Set} \\\\ 1 & 1 & 1 & \\text{Set} \\\\ \\hline \\end{array}$$`,
                    `**SR nor latch**`,
                    `![Latch SR con NOR](/informatica-images/sr-latch-nor.png)`,
                    `Produce due output $Q$ e $\\overline{Q}$ (uno la negazione dell'altro):`,
                    `$$\\begin{array}{|c|c|c|l|} \\hline S & R & Q' & \\text{Azione} \\\\ \\hline 0 & 0 & Q & \\text{Preserva stato} \\\\ 0 & 1 & 0 & \\text{Reset} \\\\ 1 & 0 & 1 & \\text{Set} \\\\ 1 & 1 & ? & \\text{Non ammesso} \\\\ \\hline \\end{array}$$`
                ]
            },
            {
                title: "Unità Aritmetico-Logica (ALU)",
                content: [
                    `La **ALU ad 1 bit** combina le componenti viste fin qui. Ha tre input binari $A$, $B$, $C_{in}$, un input $Op$ (2 bit) e due output $R$ e $C_{out}$.`,
                    `**Operazioni supportate**`,
                    `$$\\begin{array}{|c|l|} \\hline Op & R \\\\ \\hline 00 & A + B + C_{in} \\ (\\text{somma}) \\\\ 01 & A \\lor B \\ (\\text{OR}) \\\\ 10 & A \\land B \\ (\\text{AND}) \\\\ 11 & \\neg A \\ (\\text{NOT}) \\\\ \\hline \\end{array}$$`,
                    `![ALU a 1 bit](/informatica-images/alu-1bit.png)`,
                    `La ALU calcola sempre tutte le quattro operazioni; un multiplexer 4-a-1 seleziona il risultato in base a $Op$. Con $n$ bit di selettore si possono selezionare $2^n$ operazioni diverse.`,
                    `**ALU a 4 bit**`,
                    `![ALU a 4 bit](/informatica-images/alu-4bit.svg)`,
                    `Le quattro unità sono collegate in cascata, con $C_{out}$ di una collegato a $C_{in}$ della successiva. Lo stesso valore di $Op$ viene trasmesso a tutte le unità.`
                ]
            },
            {
                title: "L'Architettura di von Neumann",
                content: [
                    `![John von Neumann](/informatica-images/john-von-neumann.jpg)`,
                    `L'**architettura di von Neumann** consiste in tre unità funzionali:`,
                    `- **CPU (processore)**: esegue le istruzioni dei programmi`,
                    `- **Memoria**: contiene sia le istruzioni che i dati`,
                    `- **Dispositivi I/O**: acquisiscono e trasmettono informazioni (tastiera, mouse, hard disk, video, audio...)`,
                    `Le unità sono collegate mediante un **bus** sul quale transitano dati e segnali di controllo. L'**architettura a bus** è caratterizzata da:`,
                    `- **Semplicità**: collegamento singolo anziché tutte le coppie`,
                    `- **Estensibilità**: facile aggiungere nuovi dispositivi`,
                    `- **Standardizzazione**: dispositivi di produttori diversi possono interagire`,
                    `- **Limitata capacità**: il bus può diventare un collo di bottiglia`,
                    `**Nota importante**: Nell'architettura di von Neumann, istruzioni e dati sono nella **stessa memoria**. L'alternativa è l'**architettura Harvard**, con memorie distinte.`
                ]
            },
            {
                title: "La CPU (Central Processing Unit)",
                content: [
                    `La **CPU** è responsabile dell'esecuzione delle istruzioni, che possono essere:`,
                    `- **Aritmetico/logiche**: somma, prodotto, AND, OR, ecc.`,
                    `- **Lettura/scrittura in memoria**`,
                    `- **Controllo di flusso**: indirizzano verso sequenze diverse di istruzioni`,
                    `- **Input/output**: comunicazione con dispositivi esterni`,
                    `![Struttura CPU](/informatica-images/cpu-block-diagram.svg)`,
                    `**Componenti della CPU**`,
                    `- **ALU**: esegue operazioni aritmetiche e logiche`,
                    `- **Registri di uso generale** ($R_0, \\ldots, R_{N-1}$): memorizzano i risultati della computazione. L'accesso ai registri è molto più efficiente dell'accesso alla memoria.`,
                    `- **Registri speciali**:`,
                    `  - **PC** (Program Counter): indirizzo dell'istruzione corrente`,
                    `  - **IR** (Instruction Register): codice binario dell'istruzione in esecuzione`,
                    `  - **PSW** (Program Status Word): condizioni come overflow, carry, zero`,
                    `**Esempi di registri**`,
                    `- Intel x86: 4 registri a 16 bit (AX, BX, CX, DX)`,
                    `- Intel x86_64: 12 registri a 64 bit (RAX, RBX, RCX, RDX, R8-R15)`,
                    `- ARM: 13 registri a 32 bit ($R_0, \\ldots, R_{12}$)`
                ]
            },
            {
                title: "Il Ciclo Fetch-Decode-Execute",
                content: [
                    `L'unità di controllo esegue ripetutamente il **ciclo fetch-decode-execute**:`,
                    `![Ciclo fetch-decode-execute](/informatica-images/fetch-decode-execute.svg)`,
                    `**Fase 1: Fetch**`,
                    `La CPU copia il contenuto dell'indirizzo di memoria indicato nel PC (Program Counter) all'interno del registro IR (Instruction Register). Il valore letto rappresenta il codice dell'istruzione da eseguire.`,
                    `**Fase 2: Decode**`,
                    `Il contenuto del registro IR viene analizzato; l'unità di controllo capisce il tipo di istruzione da eseguire.`,
                    `**Fase 3: Execute**`,
                    `L'unità di controllo esegue le operazioni elementari richieste:`,
                    `- Lettura dalla RAM e salvataggio in un registro`,
                    `- Attivazione della ALU per operazioni aritmetiche`,
                    `- Modifica del PC per salti condizionali`,
                    `**Nota sulla codifica delle istruzioni**: Alcune CPU usano un numero fisso di bit (es. 32), altre usano una rappresentazione a lunghezza variabile.`
                ]
            },
            {
                title: "La Memoria RAM",
                content: [
                    `La **RAM (Random Access Memory)** è una memoria volatile organizzata come una sequenza di byte.`,
                    `![Struttura di una cella DRAM](/informatica-images/dram-cell-structure.png)`,
                    `**Unità di misura**`,
                    `$$\\begin{array}{|l|c|l|c|} \\hline \\text{Potenze di 1000} & & \\text{Potenze di 1024} & \\\\ \\hline 1 \\text{ kilobyte (kB)} & 10^3 \\text{B} & 1 \\text{ kibibyte (kiB)} & 2^{10} \\text{B} \\\\ 1 \\text{ megabyte (MB)} & 10^6 \\text{B} & 1 \\text{ mebibyte (MiB)} & 2^{20} \\text{B} \\\\ 1 \\text{ gigabyte (GB)} & 10^9 \\text{B} & 1 \\text{ gibibyte (GiB)} & 2^{30} \\text{B} \\\\ 1 \\text{ terabyte (TB)} & 10^{12} \\text{B} & 1 \\text{ tebibyte (TiB)} & 2^{40} \\text{B} \\\\ \\hline \\end{array}$$`,
                    `**Indirizzamento**`,
                    `Ogni byte è individuato dal proprio **indirizzo** (da $0$ a $N-1$ per $N$ byte). L'ampiezza del bus di indirizzi determina la quantità massima di RAM indirizzabile:`,
                    `- Bus 16 bit: max $2^{16} = 65536$ byte`,
                    `- Bus 32 bit: max $2^{32} \\approx 4$ GiB`,
                    `- Bus 64 bit: max $2^{64} \\approx 16$ EiB`,
                    `![Moduli RAM](/informatica-images/ram-modules.jpg)`,
                    `La caratteristica "random" della RAM indica che si può accedere direttamente a qualunque indirizzo senza scorrere i precedenti (a differenza delle memorie sequenziali come i nastri magnetici).`
                ]
            },
            {
                title: "Esercizi sull'Architettura",
                content: [
                    `**Esercizio 3.1** - Disegnare un circuito logico con un input $A$ e un output $R$ che valga sempre $0$, usando solo porte AND, OR e NOT (senza costanti).`,
                    `$$\\begin{array}{|c|c|} \\hline A & R \\\\ \\hline 0 & 0 \\\\ 1 & 0 \\\\ \\hline \\end{array}$$`,
                    `**Esercizio 3.2** - Realizzare un multiplexer 4-a-1 con 4 ingressi $In_0, In_1, In_2, In_3$, un selettore $S = S_1S_0$ (2 bit) e un'uscita $R$.`,
                    `**Esercizio 3.3** - Estendere il full adder a 4 bit con un ulteriore bit in uscita che indichi se si è verificato overflow (assumendo complemento a due con 4 bit).`,
                    `**Esercizio 3.4** - Definire un comparatore a 2 bit per confrontare valori $A_1A_0$ e $B_1B_0$ in notazione binaria senza segno, producendo GT, EQ e LT.`,
                    `**Esercizio 3.5** - Definire un circuito con tre ingressi $A, B, C$ e un'uscita $P$ (parità) tale che $ABCP$ contenga un numero pari di cifre $1$.`,
                    `**Esercizio 3.6** - Definire un circuito con tre ingressi $A, B, C$ e un'uscita $M$ (maggioranza) che abbia lo stesso valore della maggioranza dei tre bit.`
                ]
            }
        ]
    },
    // ============================================================
    // Algoritmi
    // ============================================================
    {
        id: "algoritmi",
        title: "Algoritmi",
        subsections: [
            {
                title: "Introduzione agli Algoritmi",
                content: [
                    `![al-Khwārizmī](/informatica-images/al-khwarizmi-portrait.jpg)`,
                    `Un **algoritmo** è un procedimento che può essere usato per risolvere un problema mediante una sequenza finita di passi elementari.`,
                    `Il termine deriva da **al-Khwārizmī**, matematico e astronomo persiano che lavorò nell'odierna Baghdad intorno all'anno 800 D.C. Fu autore di un trattato di algebra in cui forniva le regole per la risoluzione di equazioni fino al secondo grado, descritte come sequenze di trasformazioni algebriche elementari.`,
                    `**Esempio: Ricerca nell'elenco telefonico**`,
                    `Per cercare un numero conoscendo il nome dell'abbonato:`,
                    `- Considera il primo abbonato nell'elenco`,
                    `- Se il nome corrente è quello cercato, leggi il numero e termina`,
                    `- Altrimenti, se è l'ultimo dell'elenco, il numero non è presente e termina`,
                    `- Passa all'abbonato successivo; torna al passo 2`,
                    `Questa strategia è detta **ricerca sequenziale**. Tuttavia, sapendo che l'elenco è ordinato alfabeticamente, esistono strategie più efficienti (come la **ricerca binaria**).`,
                    `**Algoritmi vs Programmi**`,
                    `- Gli **algoritmi** sono descritti in modo informale, per essere compresi da esseri umani`,
                    `- I **programmi** seguono le regole rigide di un linguaggio di programmazione, per essere elaborati da calcolatori`
                ]
            },
            {
                title: "Proprietà degli Algoritmi",
                content: [
                    `Un algoritmo deve godere delle seguenti proprietà fondamentali:`,
                    `**Atomicità**: I passi devono essere elementari, cioè non ulteriormente scomponibili in azioni più semplici.`,
                    `**Non ambiguità**: I passi devono essere interpretabili in modo diretto e univoco dall'esecutore (umano o artificiale).`,
                    `**Finitezza**: L'algoritmo deve essere composto da un numero finito di passi e richiedere una quantità finita di risorse.`,
                    `**Terminazione**: L'esecuzione deve avere termine dopo un tempo finito.`,
                    `**Correttezza**: L'algoritmo deve produrre il risultato corretto.`,
                    `**Esempio: Algoritmo di Euclide per il MCD**`,
                    `Dati due interi positivi $n$ e $m$, per determinare il Massimo Comun Divisore:`,
                    `- Se $n = m$, termina indicando $n$ come risultato`,
                    `- Se $n > m$, assegna a $n$ il valore $n - m$; torna al passo precedente`,
                    `- Se $n < m$, assegna a $m$ il valore $m - n$; torna al primo passo`
                ]
            },
            {
                title: "Concetti Fondamentali",
                content: [
                    `**Precondizioni e Postcondizioni**`,
                    `- **Precondizioni**: Proprietà che devono valere inizialmente affinché l'algoritmo produca il risultato corretto`,
                    `- **Postcondizioni**: Proprietà che valgono al termine dell'esecuzione`,
                    `Nell'algoritmo di Euclide: precondizione è "$n > 0$ e $m > 0$", postcondizione è "$n$ (o $m$) è il MCD".`,
                    `**Variabili**`,
                    `Una **variabile** è un nome a cui è assegnato un valore. Durante l'esecuzione è possibile assegnare nuovi valori alle variabili.`,
                    `**Costrutti Condizionali**`,
                    `- **se P allora Q**: se la condizione $P$ è vera, esegui $Q$; altrimenti passa all'istruzione successiva`,
                    `- **se P allora Q altrimenti R**: se $P$ è vera, esegui $Q$; se $P$ è falsa, esegui $R$`,
                    `**Iterazione**`,
                    `Meccanismo per ripetere l'esecuzione di uno o più passi fino a quando si verifica una certa condizione.`
                ]
            },
            {
                title: "Diagrammi di Flusso",
                content: [
                    `I **diagrammi di flusso** (flowchart) sono una notazione grafica in cui vari tipi di poligoni rappresentano i passi dell'algoritmo, e le frecce indicano l'ordine di esecuzione.`,
                    `![Diagramma di flusso - Euclide](/informatica-images/euclid-flowchart.svg)`,
                    `**Elementi dei diagrammi di flusso**:`,
                    `- **Nodo ovale**: Inizio/Fine dell'algoritmo`,
                    `- **Nodo rettangolare**: Istruzioni da eseguire (es. $n \\leftarrow n - m$)`,
                    `- **Nodo decisionale (rombo)**: Espressione booleana, con frecce V (vero) e F (falso)`,
                    `- **Nodo parallelogramma**: Istruzioni di input/output`,
                    `![Programma Buran e DRAKON](/informatica-images/drakon-flowchart.png)`,
                    `**Vantaggi**: Facilmente interpretabili anche da non specialisti.`,
                    `**Svantaggi**: Algoritmi complessi richiedono molto spazio; possono avere struttura arbitraria e difficile da comprendere.`
                ]
            },
            {
                title: "Pseudocodice e Programmazione Strutturata",
                content: [
                    `Lo **pseudocodice** è una notazione per descrivere algoritmi in modo più strutturato rispetto al linguaggio naturale, ma meno rigido di un linguaggio di programmazione.`,
                    `**Algoritmo di Euclide in pseudocodice**:`,
                    `\`\`\`
Pre: n > 0, m > 0
Post: Stampa il MCD di n e m

while (n ≠ m) do
    if n > m then
        n ← n - m
    else
        m ← m - n
    end if
end while
Stampa n
\`\`\``,
                    `![Costrutti di programmazione strutturata](/informatica-images/structured-program-patterns.svg)`,
                    `**Costrutti della programmazione strutturata**:`,
                    `- **Sequenza** ($S_1; S_2$): esecuzione in ordine`,
                    `- **if-then-else**: esecuzione condizionale con ramo alternativo`,
                    `- **if-then**: esecuzione condizionale senza ramo alternativo`,
                    `- **while-do**: iterazione con test all'inizio`,
                    `- **do-while**: iterazione con test alla fine`,
                    `Qualunque algoritmo può essere descritto mediante composizione di questi blocchi elementari.`
                ]
            },
            {
                title: "Logica di Floyd-Hoare",
                content: [
                    `La **logica di Floyd-Hoare** consente di dimostrare formalmente la correttezza di un algoritmo, specificando come le istruzioni modificano lo stato del programma.`,
                    `**Tripla di Hoare**`,
                    `$$\\{P\\} \\ S \\ \\{Q\\}$$`,
                    `dove $P$ è la **precondizione**, $S$ è un'istruzione o blocco, e $Q$ è la **postcondizione**. Significa: se $P$ è vera prima di $S$, allora al termine di $S$ sarà vera $Q$.`,
                    `**Esempi**:`,
                    `- $\\{\\text{True}\\} \\ x \\leftarrow 15 \\ \\{x = 15\\}$`,
                    `- $\\{x = 46\\} \\ y \\leftarrow x + 1 \\ \\{y = 47 \\land x = 46\\}$`,
                    `- $\\{x < n\\} \\ x \\leftarrow x + 1 \\ \\{x < n + 1\\}$`,
                    `**Regole di deduzione principali**:`,
                    `- **Istruzione vuota**: $\\{P\\} \\ \\text{skip} \\ \\{P\\}$`,
                    `- **Sequenza**: Se $\\{P\\} S_1 \\{Q\\}$ e $\\{Q\\} S_2 \\{R\\}$, allora $\\{P\\} S_1; S_2 \\{R\\}$`,
                    `- **Assegnamento**: $\\{P[x/E]\\} \\ x \\leftarrow E \\ \\{P\\}$ (si usa "a ritroso")`
                ]
            },
            {
                title: "Regole per Condizionali e Cicli",
                content: [
                    `**Struttura condizionale if-then-else**`,
                    `$$\\frac{\\{C \\land P\\} S_1 \\{Q\\}, \\ \\{\\neg C \\land P\\} S_2 \\{R\\}}{\\{P\\} \\ \\text{if } C \\text{ then } S_1 \\text{ else } S_2 \\ \\{Q \\lor R\\}}$$`,
                    `**Costrutti iterativi (while-do)**`,
                    `Per analizzare un ciclo bisogna identificare le **invarianti di ciclo**: proprietà che rimangono sempre vere.`,
                    `Formalmente, un'invariante $I$ è un'asserzione che:`,
                    `- È vera immediatamente prima di entrare nel ciclo`,
                    `- Rimane vera immediatamente dopo l'esecuzione del corpo del ciclo`,
                    `**Regola di derivazione**:`,
                    `$$\\frac{\\{C \\land I\\} \\ S \\ \\{I\\}}{\\{I\\} \\ \\text{while } C \\text{ do } S \\ \\{\\neg C \\land I\\}}$$`,
                    `**Esempio: Calcolo di $x^n$**`,
                    `\`\`\`
Pre: n ≥ 0, x ≠ 0
i ← 0
p ← 1
while (i < n) do
    p ← p × x
    i ← i + 1
end while
Post: p = x^n
\`\`\``,
                    `Invariante: $I = (p = x^i \\land i \\leq n)$`
                ]
            },
            {
                title: "Esempi di Dimostrazioni di Correttezza",
                content: [
                    `**Esempio 1: Scambio di variabili senza variabile temporanea**`,
                    `\`\`\`
{x = x₀ ∧ y = y₀}
x ← x - y
{x = x₀ - y₀ ∧ y = y₀}
y ← x + y
{x = x₀ - y₀ ∧ y = x₀}
x ← y - x
{x = y₀ ∧ y = x₀}
\`\`\``,
                    `L'algoritmo scambia i valori di $x$ e $y$ senza usare variabili temporanee.`,
                    `**Esempio 2: Valore assoluto**`,
                    `\`\`\`
{x = x₀}
if x < 0 then
    x ← -x
end if
{x = |x₀|}
\`\`\``,
                    `**Esempio 3: Somma degli elementi di un array**`,
                    `\`\`\`
Pre: n ≥ 0
i ← 0
s ← 0
while (i < n) do
    s ← s + a[i]
    i ← i + 1
end while
Post: s = Σa[0..n-1]
\`\`\``,
                    `Invariante: $I = (s = \\sum a[0..i-1] \\land i \\leq n)$`
                ]
            },
            {
                title: "Esercizi sugli Algoritmi",
                content: [
                    `**Esercizio 4.1** - Dati tre valori interi $a, b, c$ di cui due uguali, scrivere un algoritmo che determina il valore ripetuto. (Suggerimento: è possibile risolvere con un solo confronto)`,
                    `**Esercizio 4.2** - Nell'algoritmo di Euclide, cosa succede se la precondizione "$n > 0$ e $m > 0$" non è soddisfatta?`,
                    `**Esercizio 4.3** - Una ricetta di cucina può essere considerata un algoritmo? Giustificare la risposta.`,
                    `**Esercizio 4.4** - Scrivere un algoritmo che, dato un intero positivo $n$, stampa la sua rappresentazione binaria.`,
                    `**Esercizio 4.5** - Augustus deposita 1€ al 5% annuo, Claudia deposita 100€ al 4% annuo. In quale anno l'importo di Augustus supera quello di Claudia?`,
                    `**Esercizio 4.6** - Data una sequenza $v[0], v[1], \\ldots, v[n-1]$ con $n \\geq 1$, determinare il valore minimo e massimo.`,
                    `**Esercizio 4.7** - Data una sequenza di valori tutti distinti con $n \\geq 2$, determinare i due valori minimi.`,
                    `**Esercizio 4.8** - Mostrare che while-do e do-while sono equivalenti.`,
                    `**Esercizio 4.9** - Modificare la ricerca binaria per array ordinati in senso non crescente.`,
                    `**Esercizio 4.10** - Determinare la postcondizione di: $\\{x < n\\} \\ x \\leftarrow x + 1; \\ y \\leftarrow 2x \\ \\{???\\}$`,
                    `**Esercizio 4.11** - L'algoritmo seguente calcola il minimo di un array. Determinare l'invariante del ciclo:`,
                    `\`\`\`
i ← 1
m ← a[0]
while (i < n) do
    if m < a[i] then
        m ← a[i]
    end if
    i ← i + 1
end while
\`\`\``
                ]
            }
        ]
    },
    // ============================================================
    // Linguaggi di Programmazione
    // ============================================================
    {
        id: "linguaggi-programmazione",
        title: "Linguaggi di Programmazione",
        subsections: [
            {
                title: "Interpreti e Compilatori",
                content: [
                    `![Pannello PDP-8/E](/informatica-images/pdp8-panel.jpg)`,
                    `Le istruzioni eseguite dai processori sono rappresentate da sequenze di bit in memoria, dette **linguaggio macchina**. Le istruzioni sono di tre tipi:`,
                    `- **Lettura/scrittura in memoria**: es. "trasferisci la parola all'indirizzo 1024 nel registro R1"`,
                    `- **Istruzioni aritmetiche e logiche**: es. "somma il contenuto dei registri R1 e R2"`,
                    `- **Controllo del flusso**: es. "salta all'istruzione memorizzata all'indirizzo 8192"`,
                    `Agli albori dell'informatica, programmare significava inserire manualmente le sequenze binarie mediante pannelli con interruttori.`,
                    `**Linguaggio Assembly**`,
                    `Nei linguaggi **assembly** ogni istruzione è rappresentata da una sequenza di caratteri. Un programma **assemblatore** traduce la descrizione testuale in codici binari. Ogni famiglia di processori ha un proprio linguaggio assembly.`,
                    `\`\`\`
48 83 ec 08          sub $0x8,%rsp
48 8b 05 0d 0c 20 00 mov 0x200c0d(%rip),%rax
48 85 c0             test %rax,%rax
74 05                je 4003f5
\`\`\``,
                    `I valori esadecimali a sinistra sono i codici in linguaggio macchina; a destra le istruzioni assembly Intel x86_64.`
                ]
            },
            {
                title: "Linguaggi di Basso e Alto Livello",
                content: [
                    `**Linguaggi di basso livello**: Non forniscono alcuna astrazione rispetto alle caratteristiche del processore. I programmi possono usare solo le istruzioni direttamente supportate dal processore.`,
                    `**Svantaggi dei linguaggi di basso livello**:`,
                    `- Operazioni complesse richiedono molte istruzioni`,
                    `- Programmi lunghi e difficili da comprendere`,
                    `- Ogni famiglia di processori ha un linguaggio assembly diverso`,
                    `**Linguaggi di alto livello** (C, Java, Python): Forniscono costrutti avanzati (variabili, tipi di dato, funzioni, gestione memoria) che richiederebbero lunghe sequenze di istruzioni in linguaggio macchina.`,
                    `**Vantaggi**:`,
                    `- Programmi più corti e comprensibili`,
                    `- Portabilità: possono funzionare su diversi processori`,
                    `**Compilatori vs Interpreti**`,
                    `- **Compilatore**: Traduce il programma sorgente in linguaggio macchina. La compilazione avviene una sola volta; il risultato è direttamente eseguibile. Esempi: Fortran, C/C++, Java.`,
                    `- **Interprete**: Legge le istruzioni di alto livello e le esegue direttamente, senza traduzione preventiva. Facilitano l'uso interattivo. Esempi: BASIC, Perl, PHP.`
                ]
            },
            {
                title: "Esempio di Compilazione",
                content: [
                    `**Programma C**:`,
                    `\`\`\`c
#include <stdio.h>
int main(void) {
    int a = 3, b = 5;
    printf("a + b = %d\\n", a + b);
    return 0;
}
\`\`\``,
                    `Il compilatore traduce questo in codice assembly (Intel x86_64):`,
                    `\`\`\`
movl $3, -8(%rbp)
movl $5, -4(%rbp)
movl -4(%rbp), %eax
movl -8(%rbp), %edx
addl %edx, %eax
call printf
\`\`\``,
                    `Il programma sorgente in linguaggio C è molto più compatto e comprensibile rispetto al codice assembly generato.`,
                    `Lo stesso programma compilato per processori ARM produce codice assembly completamente diverso:`,
                    `\`\`\`
mov r3, #3
str r3, [fp, #-8]
mov r3, #5
str r3, [fp, #-12]
ldr r2, [fp, #-8]
ldr r3, [fp, #-12]
add r3, r2, r3
bl printf
\`\`\``,
                    `La generazione del codice per diversi processori è automatica, senza intervento del programmatore.`
                ]
            },
            {
                title: "Paradigmi di Programmazione",
                content: [
                    `I **paradigmi di programmazione** classificano i linguaggi in base alle loro caratteristiche.`,
                    `**Linguaggi Imperativi**`,
                    `I programmi sono sequenze di istruzioni che modificano lo stato della computazione. Esempi: C, Pascal, COBOL, FORTRAN, BASIC.`,
                    `\`\`\`c
int MCD(int n, int m) {
    while (n != m) {
        if (n > m) n = n - m;
        else m = m - n;
    }
    return n;
}
\`\`\``,
                    `**Linguaggi Funzionali**`,
                    `I programmi sono descritti mediante funzioni. Non è possibile alterare lo stato; il valore restituito dipende solo dai parametri. Esempi: Lisp, Erlang, Haskell.`,
                    `\`\`\`lisp
(define (square x) (* x x))
(define (double x) (* 2 x))
(define (compose f g) (lambda (x) (f (g x))))
((compose square double) 3)  ; --> 36
\`\`\``,
                    `**Linguaggi Object-Oriented**`,
                    `I programmi sono insiemi di oggetti con stato e operazioni. Esempi: SmallTalk, C++, Java, C#.`,
                    `**Linguaggi Dichiarativi**`,
                    `Si specificano le proprietà del risultato, non le istruzioni da eseguire. Esempio: Prolog.`,
                    `\`\`\`prolog
genitore(antonio, carlo).
genitore(fabio, anna).
genitore(anna, andrea).
discendente(X, Y) :- genitore(Y, X).
discendente(X, Y) :- genitore(Z, X), discendente(Z, Y).
\`\`\``
                ]
            },
            {
                title: "Grammatiche BNF",
                content: [
                    `La **sintassi** di un linguaggio specifica la struttura delle frasi valide. La **semantica** specifica il significato delle frasi.`,
                    `Una **grammatica** può specificare la sintassi:`,
                    `\`\`\`
⟨Frase⟩ ::= ⟨Articolo⟩ ⟨Soggetto⟩ ⟨Verbo⟩
⟨Articolo⟩ ::= il | un
⟨Soggetto⟩ ::= cane | gatto
⟨Verbo⟩ ::= mangia | dorme
\`\`\``,
                    `Formalmente, un linguaggio $L$ è una tupla $(T, N, P, S)$ dove:`,
                    `- $T$ = insieme finito di **simboli terminali** (vocabolario)`,
                    `- $N$ = insieme finito di **simboli non terminali**`,
                    `- $P$ = insieme finito di **regole di produzione** (grammatica)`,
                    `- $S \\in N$ = **simbolo iniziale**`,
                    `**Forma di Backus-Naur (BNF)**`,
                    `Regola di produzione: $\\langle X \\rangle ::= \\alpha_1 \\ | \\ \\ldots \\ | \\ \\alpha_n$`,
                    `Indica che $\\langle X \\rangle$ può essere rimpiazzato con una delle sequenze $\\alpha_i$.`,
                    `La sostituzione vuota $\\langle X \\rangle ::= \\varepsilon$ indica che il simbolo può essere cancellato.`
                ]
            },
            {
                title: "Alberi di Derivazione",
                content: [
                    `**Esempio: Grammatica per numeri**`,
                    `\`\`\`
⟨Num⟩ ::= ⟨Cifra⟩ | ⟨Cifra⟩ ⟨Num⟩
⟨Cifra⟩ ::= 0 | 1 | ... | 9
\`\`\``,
                    `Le frasi valide sono tutte le sequenze non vuote di cifre.`,
                    `![Albero di derivazione 047](/informatica-images/derivation-047.png)`,
                    `**Processo di derivazione per 047**:`,
                    `$$\\langle Num \\rangle \\to \\langle Cifra \\rangle \\langle Num \\rangle \\to 0 \\langle Num \\rangle \\to 0 \\langle Cifra \\rangle \\langle Num \\rangle \\to 04 \\langle Num \\rangle \\to 04 \\langle Cifra \\rangle \\to 047$$`,
                    `![Albero di derivazione 010](/informatica-images/derivation-010.png)`,
                    `La radice contiene il simbolo iniziale. Le foglie contengono simboli terminali. La frase è la sequenza delle foglie da sinistra a destra.`
                ]
            },
            {
                title: "Grammatiche Ambigue",
                content: [
                    `Una grammatica per cui esiste una frase con più alberi di derivazione distinti è detta **grammatica ambigua**.`,
                    `**Esempio: Espressioni aritmetiche**`,
                    `\`\`\`
⟨Expr⟩ ::= ⟨Num⟩ | ⟨Expr⟩ + ⟨Expr⟩ | ⟨Expr⟩ * ⟨Expr⟩
\`\`\``,
                    `L'espressione $34 \\times 21 + 3$ ha due alberi diversi: uno equivale a $34 \\times (21 + 3)$, l'altro a $(34 \\times 21) + 3$.`,
                    `**Grammatica non ambigua equivalente**:`,
                    `\`\`\`
⟨Expr⟩ ::= ⟨Term⟩ | ⟨Expr⟩ + ⟨Term⟩
⟨Term⟩ ::= ⟨Num⟩ | ⟨Term⟩ * ⟨Num⟩
\`\`\``,
                    `![Derivazione espressione](/informatica-images/derivation-expr.png)`,
                    `La struttura dell'albero rispetta l'ordine di valutazione naturale: prima il prodotto, poi la somma.`
                ]
            },
            {
                title: "Esercizi sulle Grammatiche",
                content: [
                    `![Rosa dei venti](/informatica-images/compass-rose.png)`,
                    `**Esercizio 5.1** - Estendere la grammatica italiana per includere "pecora" e l'articolo "la" senza generare frasi scorrette ("la cane", "il pecora").`,
                    `**Esercizio 5.2** - Scrivere una grammatica BNF per generare gli otto punti cardinali: N, S, E, O, NE, SE, NO, SO.`,
                    `**Esercizio 5.3** - Definire una grammatica per numeri interi con/senza segno (es. −129, +79, 76, 0). Non generare zeri iniziali ridondanti (0023) né +0, −0.`,
                    `**Esercizio 5.4** - Data la grammatica $\\langle A \\rangle ::= \\varepsilon \\ | \\ 0 \\ 0 \\langle A \\rangle$, dire se:`,
                    `  (a) Genera lo stesso linguaggio di $\\langle A \\rangle ::= \\varepsilon \\ | \\ 0 \\langle A \\rangle 0$`,
                    `  (b) Genera un linguaggio finito`,
                    `  (c) Può generare frasi con numero dispari di 0`,
                    `**Esercizio 5.5** - Scrivere una grammatica per sequenze binarie non vuote che rappresentano valori dispari (terminano con 1).`,
                    `**Esercizio 5.6** - Data la grammatica con simboli {cane, gatto, abbaia, miagola}, quali frasi può generare?`,
                    `**Esercizio 5.7** - Data $\\langle A \\rangle ::= 0 \\ | \\ 0 \\langle A \\rangle \\ | \\ 1 \\langle A \\rangle$, quali frasi genera: 111, 010, 000000, 101010?`,
                    `**Esercizio 5.8** - Data $\\langle A \\rangle ::= \\varepsilon \\ | \\ 0 \\langle A \\rangle \\ | \\ 11 \\langle A \\rangle$, quali frasi genera: 11000, 101101, 10, 0110?`,
                    `**Esercizio 5.9** - Per la grammatica delle parentesi $\\langle A \\rangle ::= () \\ | \\ (\\langle A \\rangle) \\ | \\ \\langle A \\rangle \\langle A \\rangle$, quali sono valide: (())(), ((())), ()((((, ()()()?`
                ]
            }
        ]
    },
    // ============================================================
    // C++
    // ============================================================
    {
        id: "cpp-introduzione",
        title: "C++: Fondamenti e Compilazione",
        subsections: [
            {
                title: "Panoramica",
                content: [
                    "**Obiettivo della sezione**",
                    "Capire perché C++ è un linguaggio compilato, come un file sorgente diventa un programma eseguibile e come leggere un primo programma completo.",
                    "Gli argomenti centrali sono: processo di compilazione, preprocessore, linker, `Hello, world`, token, tipi primitivi, operatori, variabili, input e debug.",
                    "![Pipeline di compilazione C++](https://commons.wikimedia.org/wiki/Special:FilePath/C%2B%2B_compilation_process.svg)"
                ]
            },
            {
                title: "Perché Usare C++",
                content: [
                    "Un processore esegue istruzioni elementari, come leggere o scrivere valori in memoria. Un linguaggio di alto livello permette di esprimere quelle operazioni in forma più compatta e leggibile.",
                    "**Vantaggi principali**:",
                    "- **Concisione**: un costrutto C++ rappresenta molte istruzioni macchina.",
                    "- **Manutenibilità**: modificare testo sorgente è più semplice che modificare direttamente istruzioni macchina.",
                    "- **Portabilità**: lo stesso sorgente può essere compilato per architetture diverse.",
                    "C++ resta vicino alla macchina: consente di controllare memoria, puntatori e prestazioni, ma offre anche astrazioni come classi, funzioni, template e librerie standard."
                ]
            },
            {
                title: "Dal Sorgente all'Eseguibile",
                content: [
                    "Un programma C++ parte da uno o più file sorgente (`.cpp`). Prima della compilazione interviene il **preprocessore**, che espande direttive come `#include` e macro. Poi il **compilatore** traduce ogni sorgente in un file oggetto. Infine il **linker** collega file oggetto e librerie per produrre l'eseguibile.",
                    "```text\nfile .cpp -> preprocessore -> codice espanso -> compilatore -> file oggetto -> linker -> eseguibile\n```",
                    "Il file oggetto è incompleto: può contenere riferimenti a funzioni definite altrove. Il linker risolve questi riferimenti usando altri file oggetto o librerie già compilate.",
                    "A differenza di molti linguaggi interpretati, C++ esegue questi passaggi prima dell'esecuzione. Questo contribuisce alle sue prestazioni, ma richiede attenzione agli errori rilevati in compilazione."
                ]
            },
            {
                title: "Hello World",
                content: [
                    "Il programma minimo tradizionale stampa una riga sul terminale:",
                    "```cpp\n#include <iostream>\n\nint main() {\n    std::cout << \"Hello, world!\\n\";\n    return 0;\n}\n```",
                    "`#include <iostream>` importa le funzionalità di input/output. `main` è la funzione da cui parte l'esecuzione. Le parentesi graffe delimitano il blocco di istruzioni. `std::cout` rappresenta l'output standard e `<<` invia valori verso il terminale.",
                    "`return 0` comunica al sistema operativo che il programma è terminato correttamente. Ogni istruzione C++ termina con `;`, salvo blocchi e direttive del preprocessore."
                ]
            },
            {
                title: "Token e Struttura del Codice",
                content: [
                    "Il compilatore legge il sorgente come sequenza di **token**, cioè le unità minime con significato nel linguaggio.",
                    "**Categorie principali**:",
                    "- **Parole chiave**: `int`, `double`, `for`, `return`.",
                    "- **Identificatori**: nomi scelti dal programmatore, come `x`, `somma`, `main`.",
                    "- **Letterali**: valori scritti direttamente, come `42`, `3.14`, `'a'`, `\"testo\"`.",
                    "- **Operatori**: `+`, `-`, `*`, `/`, `%`, `=`, `==`, `<<`.",
                    "- **Separatori**: `{}`, `()`, `,`, `;`.",
                    "- **Spazi bianchi e commenti**: rendono il codice leggibile ma, salvo separare token, non cambiano il significato.",
                    "I commenti su una riga iniziano con `//`; i commenti su più righe usano `/* ... */`."
                ]
            },
            {
                title: "Namespace, Stringhe ed Escape",
                content: [
                    "Molte funzionalità standard sono nello spazio dei nomi `std`. Si può scrivere `std::cout`, oppure dichiarare `using namespace std;` e poi usare `cout` direttamente. Nei progetti reali è spesso preferibile qualificare i nomi con `std::` per evitare conflitti.",
                    "Una stringa letterale è una sequenza di caratteri tra virgolette doppie. Alcuni caratteri speciali si scrivono con **sequenze di escape**:",
                    "- `\\n`: nuova riga.",
                    "- `\\t`: tabulazione.",
                    "- `\\\\`: backslash.",
                    "- `\\\"`: virgolette doppie dentro una stringa.",
                    "- `\\'`: apostrofo dentro un carattere o stringa.",
                    "```cpp\nstd::cout << \"Prima riga\\nSeconda riga\\n\";\n```"
                ]
            },
            {
                title: "Tipi, Espressioni e Operatori",
                content: [
                    "Un'**istruzione** esegue un'azione. Un'**espressione** produce un valore. Per esempio `4 + 2`, `x - 1` e `\"ciao\"` sono espressioni.",
                    "Ogni espressione ha un **tipo**, che determina quali valori può rappresentare e quali operazioni sono lecite.",
                    "**Tipi usati spesso**:",
                    "- `char`: un carattere o piccolo intero.",
                    "- `int`: numero intero.",
                    "- `bool`: valore logico `true` o `false`.",
                    "- `double`: numero reale in virgola mobile.",
                    "Gli operatori aritmetici principali sono `+`, `-`, `*`, `/`, `%`. Con due interi, `/` esegue divisione intera: `1 / 4` vale `0`. Per ottenere `0.25` serve almeno un operando reale, ad esempio `1 / 4.0`."
                ]
            },
            {
                title: "Variabili e Input",
                content: [
                    "Una **variabile** è una posizione di memoria con un nome e un tipo. Prima si dichiara il tipo, poi si può assegnare un valore.",
                    "```cpp\nint x = 4 + 2;\nstd::cout << x / 3 << ' ' << x * 2 << '\\n';\n```",
                    "L'operatore `=` assegna un valore. La forma `int x = 4 + 2;` dichiara e inizializza nello stesso punto, ed è preferibile quando il valore iniziale è noto.",
                    "Per leggere input dal terminale si usa `std::cin` con `>>`:",
                    "```cpp\nint x;\nstd::cin >> x;\nstd::cout << x / 3 << ' ' << x * 2 << '\\n';\n```",
                    "Un modo pratico per ricordare `cin >> x` e `cout << x` è pensare agli operatori come frecce: i dati entrano nella variabile da `cin` e escono verso `cout`."
                ]
            },
            {
                title: "Errori e Debug",
                content: [
                    "In C++ si incontrano soprattutto due famiglie di errori.",
                    "**Errori di compilazione**: il compilatore rifiuta il programma perché viola sintassi o regole di tipo. Esempi tipici: `;` mancante, nome scritto male, tipo incompatibile.",
                    "**Errori di runtime**: il programma compila ma non fa ciò che si voleva, oppure termina durante l'esecuzione. Esempi: divisione per zero, accesso fuori dai limiti di un array, puntatore non valido.",
                    "Per studiare un bug conviene ridurre il programma al caso minimo, stampare valori intermedi e distinguere sempre tra errore del linguaggio, errore di logica ed errore nei dati di input."
                ]
            }
        ]
    },
    {
        id: "cpp-controllo",
        title: "C++: Strutture di Controllo",
        subsections: [
            {
                title: "Panoramica",
                content: [
                    "**Obiettivo della sezione**",
                    "Controllare l'ordine di esecuzione delle istruzioni con condizioni, operatori logici, `if`, `switch`, cicli `while`, `do-while`, `for` e annidamento."
                ]
            },
            {
                title: "Flusso di Controllo",
                content: [
                    "Normalmente un programma esegue le istruzioni dall'alto verso il basso. Le strutture di controllo permettono di cambiare questa sequenza in base ai dati o di ripetere blocchi di istruzioni.",
                    "Le due famiglie principali sono:",
                    "- **Condizionali**: eseguono un blocco solo se una condizione è vera.",
                    "- **Cicli**: ripetono un blocco finché una condizione lo richiede.",
                    "Senza controllo del flusso, un programma produrrebbe sempre la stessa sequenza di azioni."
                ]
            },
            {
                title: "Operatori Relazionali e Logici",
                content: [
                    "Le condizioni producono valori booleani. Gli operatori relazionali confrontano due espressioni:",
                    "- `>` maggiore di, `>=` maggiore o uguale.",
                    "- `<` minore di, `<=` minore o uguale.",
                    "- `==` uguale, `!=` diverso.",
                    "Gli operatori logici combinano condizioni:",
                    "- `&&`: vero se entrambe le condizioni sono vere.",
                    "- `||`: vero se almeno una condizione è vera.",
                    "- `!`: nega una condizione.",
                    "```cpp\nint x = 6, y = 2;\nbool ok = (x > y) && (y > 0); // true\n```",
                    "In C++ il valore `0` è interpretato come falso; un valore numerico diverso da zero è interpretato come vero. Questa regola esiste, ma nei programmi leggibili conviene usare espressioni booleane esplicite."
                ]
            },
            {
                title: "if, else e else if",
                content: [
                    "`if` esegue un blocco se la condizione è vera:",
                    "```cpp\nif (x > y) {\n    std::cout << \"x e' maggiore di y\\n\";\n}\n```",
                    "Con `else` si definisce il ramo alternativo; con `else if` si controllano più condizioni in ordine.",
                    "```cpp\nif (x > y) {\n    std::cout << \"x e' maggiore di y\\n\";\n} else if (y > x) {\n    std::cout << \"y e' maggiore di x\\n\";\n} else {\n    std::cout << \"x e y sono uguali\\n\";\n}\n```",
                    "Le parentesi graffe sono tecnicamente omissibili per un'unica istruzione, ma tenerle sempre rende il codice più sicuro e leggibile."
                ]
            },
            {
                title: "switch",
                content: [
                    "`switch` è utile quando si confronta una stessa espressione con molti valori costanti.",
                    "```cpp\nswitch (x) {\n    case 1:\n        std::cout << \"x vale 1\\n\";\n        break;\n    case 2:\n    case 3:\n        std::cout << \"x vale 2 o 3\\n\";\n        break;\n    default:\n        std::cout << \"altro valore\\n\";\n}\n```",
                    "`break` interrompe il caso corrente. Senza `break`, l'esecuzione continua nel caso successivo: questo comportamento può essere voluto, ma spesso è fonte di bug. `default` gestisce tutti i valori non elencati."
                ]
            },
            {
                title: "while e do-while",
                content: [
                    "`while` controlla la condizione prima di ogni iterazione. Se la condizione è falsa subito, il corpo non viene mai eseguito.",
                    "```cpp\nint x = 0;\nwhile (x < 10) {\n    x = x + 1;\n}\nstd::cout << x << '\\n'; // 10\n```",
                    "`do-while` esegue il corpo almeno una volta e controlla la condizione alla fine.",
                    "```cpp\ndo {\n    std::cout << \"inserisci un valore positivo: \";\n    std::cin >> x;\n} while (x <= 0);\n```",
                    "Nel `do-while` il punto e virgola dopo `while (condizione);` è parte della sintassi."
                ]
            },
            {
                title: "for",
                content: [
                    "Il ciclo `for` raccoglie inizializzazione, condizione e incremento nella stessa intestazione. È ideale per contatori.",
                    "```cpp\nfor (int i = 0; i < 10; i = i + 1) {\n    std::cout << i << '\\n';\n}\n```",
                    "La forma generale è:",
                    "```cpp\nfor (inizializzazione; condizione; incremento) {\n    // corpo\n}\n```",
                    "Un `for` può essere riscritto come `while` spostando inizializzazione prima del ciclo e incremento alla fine del corpo."
                ]
            },
            {
                title: "Annidamento",
                content: [
                    "Condizioni e cicli possono essere annidati. L'annidamento permette comportamenti più ricchi, ma aumenta rapidamente la complessità.",
                    "```cpp\nfor (int riga = 0; riga < 4; riga = riga + 1) {\n    for (int col = 0; col < 4; col = col + 1) {\n        std::cout << col;\n    }\n    std::cout << '\\n';\n}\n```",
                    "Questo programma stampa quattro righe, ciascuna contenente `0123`. Quando i blocchi annidati diventano difficili da leggere, spesso conviene estrarre una funzione."
                ]
            }
        ]
    },
    {
        id: "cpp-funzioni",
        title: "C++: Funzioni",
        subsections: [
            {
                title: "Panoramica",
                content: [
                    "**Obiettivo della sezione**",
                    "Usare le funzioni per evitare ripetizione, organizzare il codice, passare argomenti, restituire valori, sovraccaricare nomi, dichiarare prototipi, gestire scope, ricorsione e passaggio per riferimento."
                ]
            },
            {
                title: "Perché Definire Funzioni",
                content: [
                    "Il copia-incolla rende i programmi lunghi, fragili e difficili da cambiare. Una funzione assegna un nome a un comportamento e lo rende riutilizzabile.",
                    "Esempio: invece di riscrivere ogni volta un ciclo per calcolare una potenza, definiamo `raiseToPower`.",
                    "```cpp\nint raiseToPower(int base, int exponent) {\n    int result = 1;\n    for (int i = 0; i < exponent; i = i + 1) {\n        result = result * base;\n    }\n    return result;\n}\n```",
                    "I benefici sono leggibilità, manutenibilità e riuso. `raiseToPower(3, 4)` comunica l'intenzione meglio del ciclo scritto in mezzo a `main`."
                ]
            },
            {
                title: "Dichiarazione e Invocazione",
                content: [
                    "Una definizione di funzione contiene tipo di ritorno, nome, parametri e corpo.",
                    "```cpp\nint raiseToPower(int base, int exponent) {\n    int result = 1;\n    for (int i = 0; i < exponent; i = i + 1) {\n        result *= base;\n    }\n    return result;\n}\n\nint main() {\n    int value = raiseToPower(3, 4);\n    std::cout << value << '\\n';\n}\n```",
                    "La **firma** comprende nome e tipi dei parametri. L'ordine degli argomenti conta: `raiseToPower(2, 3)` calcola $2^3$, mentre `raiseToPower(3, 2)` calcola $3^2$."
                ]
            },
            {
                title: "Valori di Ritorno e void",
                content: [
                    "Una funzione può restituire al massimo un valore tramite `return`. Il valore restituito deve essere compatibile con il tipo di ritorno.",
                    "```cpp\nint square(int x) {\n    return x * x;\n}\n```",
                    "Se una funzione non restituisce un valore, il tipo di ritorno è `void`.",
                    "```cpp\nvoid printNumber(int num) {\n    std::cout << \"number is \" << num << '\\n';\n}\n```",
                    "`return` può comparire prima della fine del corpo: quando viene eseguito, la funzione termina immediatamente."
                ]
            },
            {
                title: "Tipi degli Argomenti e Overloading",
                content: [
                    "Il tipo degli argomenti è parte del contratto della funzione. Una funzione che accetta `int` non accetta automaticamente una stringa se non esiste una conversione valida.",
                    "C++ consente **overloading**: più funzioni con lo stesso nome ma parametri diversi.",
                    "```cpp\nvoid printOnNewLine(int x) {\n    std::cout << \"Intero: \" << x << '\\n';\n}\n\nvoid printOnNewLine(const char *x) {\n    std::cout << \"Stringa: \" << x << '\\n';\n}\n```",
                    "Il compilatore sceglie quale funzione chiamare confrontando gli argomenti effettivi con le firme disponibili."
                ]
            },
            {
                title: "Prototipi, Header e Librerie",
                content: [
                    "Una funzione deve essere dichiarata prima di essere usata. Se l'implementazione arriva dopo, si usa un **prototipo**.",
                    "```cpp\nint bar();\n\nint foo() {\n    return bar() * 2;\n}\n\nint bar() {\n    return 3;\n}\n```",
                    "Nei progetti con più file, i prototipi stanno di solito in file header (`.h`), mentre le implementazioni stanno nei file `.cpp`.",
                    "```cpp\n// myLib.h\nint square(int);\nint cube(int);\n\n// myLib.cpp\n#include \"myLib.h\"\nint square(int x) { return x * x; }\nint cube(int x) { return x * square(x); }\n```",
                    "Le librerie distribuiscono spesso header più codice compilato (`.so`, `.dll`, `.a`). Il linker collega le chiamate alle implementazioni disponibili."
                ]
            },
            {
                title: "Ricorsione",
                content: [
                    "Una funzione è **ricorsiva** quando chiama se stessa. Serve sempre un caso base che termina la ricorsione.",
                    "```cpp\nint fibonacci(int n) {\n    if (n == 0 || n == 1) {\n        return 1;\n    }\n    return fibonacci(n - 1) + fibonacci(n - 2);\n}\n```",
                    "La ricorsione può rendere naturale la descrizione di problemi definiti in modo ricorsivo, ma ogni chiamata occupa memoria nello stack. Se manca il caso base, il programma può esaurire lo stack."
                ]
            },
            {
                title: "Scope e Variabili Globali",
                content: [
                    "Lo **scope** indica dove un nome è visibile. Una variabile dichiarata dentro una funzione non è visibile fuori da quella funzione; una variabile dichiarata dentro un blocco `{ ... }` vive solo in quel blocco.",
                    "```cpp\ndouble squareRoot(double num) {\n    double low = 1.0;\n    double high = num;\n    double estimate = 0.0;\n    for (int i = 0; i < 30; i = i + 1) {\n        estimate = (high + low) / 2;\n        if (estimate * estimate > num) high = estimate;\n        else low = estimate;\n    }\n    return estimate;\n}\n```",
                    "Le variabili globali sono visibili da più funzioni, ma rendono il programma meno prevedibile. Usale solo quando esiste una ragione chiara."
                ]
            },
            {
                title: "Valore, Riferimento e Valori Multipli",
                content: [
                    "Con il **passaggio per valore**, la funzione riceve una copia: modificare il parametro non modifica l'originale.",
                    "```cpp\nvoid increment(int a) {\n    a = a + 1;\n}\n```",
                    "Con il **passaggio per riferimento**, il parametro è un alias dell'argomento originale.",
                    "```cpp\nvoid increment(int &a) {\n    a = a + 1;\n}\n```",
                    "I riferimenti permettono anche di restituire più informazioni: un valore torna con `return`, gli altri attraverso parametri di output.",
                    "```cpp\nint divide(int numerator, int denominator, int &remainder) {\n    remainder = numerator % denominator;\n    return numerator / denominator;\n}\n```",
                    "La stessa tecnica implementa funzioni come `swap`, che devono modificare due variabili passate dal chiamante."
                ]
            }
        ]
    },
    {
        id: "cpp-array-stringhe",
        title: "C++: Array e Stringhe",
        subsections: [
            {
                title: "Panoramica",
                content: [
                    "**Obiettivo della sezione**",
                    "Memorizzare sequenze di valori con array, passare array a funzioni, usare array multidimensionali e capire le stringhe in stile C come array di caratteri terminati da `\\0`."
                ]
            },
            {
                title: "Array Monodimensionali",
                content: [
                    "Un **array** contiene un numero fisso di elementi dello stesso tipo, memorizzati in posizioni consecutive.",
                    "```cpp\nint values[5];\n```",
                    "Gli array C++ sono indicizzati da zero: il primo elemento è `values[0]`, l'ultimo è `values[4]`.",
                    "Gli elementi devono essere inizializzati prima dell'uso.",
                    "```cpp\nint values[5] = {2, 4, 6, 8, 10};\nstd::cout << values[2] << '\\n'; // 6\n```"
                ]
            },
            {
                title: "Scorrere un Array",
                content: [
                    "Il ciclo `for` è il modo naturale per visitare tutti gli elementi.",
                    "```cpp\nint values[5] = {2, 4, 6, 8, 10};\nint sum = 0;\nfor (int i = 0; i < 5; i = i + 1) {\n    sum += values[i];\n}\nstd::cout << sum << '\\n';\n```",
                    "L'indice deve restare nei limiti. Accedere a `values[5]` in un array di 5 elementi è un errore: il compilatore spesso non lo rileva, ma il comportamento a runtime è indefinito."
                ]
            },
            {
                title: "Array e Funzioni",
                content: [
                    "Quando un array viene passato a una funzione, non viene copiato: la funzione riceve un riferimento al primo elemento. Per questo si passa quasi sempre anche la lunghezza.",
                    "```cpp\nint sum(const int values[], int length) {\n    int total = 0;\n    for (int i = 0; i < length; i = i + 1) {\n        total += values[i];\n    }\n    return total;\n}\n```",
                    "`const int values[]` dice che la funzione non deve modificare gli elementi. Se l'array non è `const`, le modifiche fatte nella funzione sono visibili anche al chiamante."
                ]
            },
            {
                title: "Array Multidimensionali",
                content: [
                    "Un array multidimensionale è un array di array. Un array bidimensionale può rappresentare una matrice.",
                    "```cpp\nint matrix[2][3] = {\n    {1, 2, 3},\n    {4, 5, 6}\n};\nstd::cout << matrix[1][2] << '\\n'; // 6\n```",
                    "Il primo indice seleziona la riga, il secondo la colonna. Anche qui gli indici partono da zero."
                ]
            },
            {
                title: "Stringhe in Stile C",
                content: [
                    "Una stringa letterale come `\"Hello\"` è rappresentata come array di caratteri terminato dal carattere nullo `\\0`.",
                    "```cpp\nchar hello[] = {'H', 'e', 'l', 'l', 'o', '\\0'};\nchar same[] = \"Hello\";\n```",
                    "Il terminatore `\\0` permette alle funzioni di libreria di capire dove finisce la stringa. Dimenticarlo produce letture oltre i limiti dell'array."
                ]
            },
            {
                title: "Librerie per Caratteri e Stringhe",
                content: [
                    "C e C++ forniscono librerie per lavorare con caratteri e stringhe in stile C.",
                    "- `<cctype>`: funzioni su caratteri, come `isdigit`, `isalpha`, `toupper`.",
                    "- `<cstring>`: funzioni su stringhe C, come `strlen`, `strcmp`, `strcpy`.",
                    "- `<cstdlib>`: utilità generali e conversioni.",
                    "```cpp\n#include <cctype>\n\nchar c = 'a';\nif (std::isalpha(c)) {\n    c = std::toupper(c);\n}\n```",
                    "Nei programmi C++ moderni si preferisce spesso `std::string`, ma capire gli array di `char` è essenziale per puntatori, memoria e compatibilità con C."
                ]
            }
        ]
    },
    {
        id: "cpp-puntatori",
        title: "C++: Puntatori e Riferimenti",
        subsections: [
            {
                title: "Panoramica",
                content: [
                    "**Obiettivo della sezione**",
                    "Capire indirizzi di memoria, operatori `&` e `*`, dichiarazione di puntatori, aritmetica dei puntatori, relazione tra array e puntatori, stringhe `char *` e differenza tra puntatori e riferimenti."
                ]
            },
            {
                title: "Variabili e Indirizzi",
                content: [
                    "Ogni variabile occupa una posizione in memoria. Usando il nome della variabile, il compilatore sa dove leggere o scrivere il valore. L'operatore `&` restituisce l'indirizzo di una variabile.",
                    "```cpp\nint x = 5;\nstd::cout << &x << '\\n';\n```",
                    "Un indirizzo non è il valore della variabile: è la posizione in cui quel valore è memorizzato."
                ]
            },
            {
                title: "Dichiarare e Dereferenziare Puntatori",
                content: [
                    "Un puntatore è una variabile che contiene un indirizzo. Il tipo `int *` significa: puntatore a `int`.",
                    "```cpp\nint x = 5;\nint *p = &x;\nstd::cout << *p << '\\n'; // 5\n*p = 7;\nstd::cout << x << '\\n';  // 7\n```",
                    "L'operatore `*` usato su un puntatore dereferenzia l'indirizzo, cioè accede al valore memorizzato lì. In una dichiarazione, invece, `*` fa parte del tipo."
                ]
            },
            {
                title: "Puntatori, Riferimenti e Funzioni",
                content: [
                    "Puntatori e riferimenti permettono a una funzione di modificare dati esterni, ma hanno sintassi diversa.",
                    "```cpp\nvoid incrementByPointer(int *p) {\n    *p = *p + 1;\n}\n\nvoid incrementByReference(int &x) {\n    x = x + 1;\n}\n```",
                    "Con i puntatori il chiamante passa un indirizzo (`incrementByPointer(&value)`). Con i riferimenti il chiamante usa la variabile normale (`incrementByReference(value)`).",
                    "Un puntatore può essere nullo o cambiare destinazione; un riferimento è pensato come alias stabile di un oggetto esistente."
                ]
            },
            {
                title: "Array e Aritmetica dei Puntatori",
                content: [
                    "Il nome di un array può essere usato come puntatore al primo elemento. Per questo `arr[i]` e `*(arr + i)` indicano lo stesso elemento.",
                    "```cpp\nint arr[] = {10, 20, 30};\nint *p = arr;\nstd::cout << p[1] << '\\n';      // 20\nstd::cout << *(arr + 2) << '\\n'; // 30\n```",
                    "Quando si somma `1` a un puntatore, l'indirizzo avanza di un elemento del tipo puntato, non di un singolo byte. Per un `int *`, `p + 1` punta all'intero successivo."
                ]
            },
            {
                title: "Stringhe char*",
                content: [
                    "Una stringa in stile C è un puntatore al primo carattere di un array terminato da `\\0`.",
                    "```cpp\nchar courseName1[] = {'C', '+', '+', '\\0'};\nconst char *courseName2 = \"C++\";\n```",
                    "`courseName1` è un array modificabile. `courseName2` punta a una stringa letterale, che non deve essere modificata; per questo è corretto usare `const char *`."
                ]
            },
            {
                title: "Puntatori a Puntatori",
                content: [
                    "Un puntatore può puntare a un altro puntatore. Il tipo `int **` significa: puntatore a puntatore a `int`.",
                    "```cpp\nint x = 5;\nint *p = &x;\nint **pp = &p;\nstd::cout << **pp << '\\n'; // 5\n```",
                    "I puntatori a puntatori compaiono quando una funzione deve modificare un puntatore del chiamante, oppure quando si rappresentano strutture dati dinamiche più complesse."
                ]
            }
        ]
    },
    {
        id: "cpp-classi",
        title: "C++: Classi e Struct",
        subsections: [
            {
                title: "Panoramica",
                content: [
                    "**Obiettivo della sezione**",
                    "Costruire tipi definiti dall'utente con classi, campi, istanze, composizione, metodi, costruttori, costruttori di copia, `public`, `private`, getter, setter e `struct`."
                ]
            },
            {
                title: "Perché Servono le Classi",
                content: [
                    "Senza classi, dati correlati finiscono sparsi in molte variabili. Per rappresentare un vettore geometrico, ad esempio, potremmo usare quattro `double`: `xStart`, `yStart`, `xEnd`, `yEnd`. Ogni funzione dovrebbe ricevere tutti e quattro i valori, con rischio di confondere ordine e significato.",
                    "Una classe raggruppa dati correlati in un nuovo tipo.",
                    "```cpp\nclass Vector {\npublic:\n    double xStart;\n    double yStart;\n    double xEnd;\n    double yEnd;\n};\n```",
                    "Un oggetto `Vector` porta con sé tutte le informazioni necessarie."
                ]
            },
            {
                title: "Campi, Istanze e Accesso",
                content: [
                    "Una **classe** descrive la struttura; un'**istanza** è un oggetto concreto di quella classe.",
                    "```cpp\nclass Student {\npublic:\n    const char *name;\n    int studentID;\n};\n\nStudent student1;\nstudent1.name = \"Geza\";\nstudent1.studentID = 123456789;\n```",
                    "L'operatore `.` accede a un campo dell'istanza. Istanze diverse hanno campi distinti e possono contenere valori diversi."
                ]
            },
            {
                title: "Composizione",
                content: [
                    "I campi di una classe possono essere oggetti di altre classi. Questo permette di rappresentare la struttura del problema in modo più naturale.",
                    "```cpp\nclass Point {\npublic:\n    double x;\n    double y;\n};\n\nclass Vector {\npublic:\n    Point start;\n    Point end;\n};\n```",
                    "L'accesso a campi annidati usa più `.`: `v.start.x = 3.0;`. L'assegnazione tra oggetti copia i campi dell'oggetto sorgente nell'oggetto destinazione."
                ]
            },
            {
                title: "Passare Oggetti a Funzioni",
                content: [
                    "Un oggetto passato per valore viene copiato. Le modifiche fatte dalla funzione non toccano l'originale.",
                    "```cpp\nvoid offsetPoint(Point p, double dx, double dy) {\n    p.x += dx;\n    p.y += dy;\n}\n```",
                    "Se la funzione deve modificare l'oggetto originale, si passa per riferimento.",
                    "```cpp\nvoid offsetPoint(Point &p, double dx, double dy) {\n    p.x += dx;\n    p.y += dy;\n}\n```",
                    "Se la funzione deve solo leggere un oggetto grande, una buona forma è `const Point &p`: evita la copia e impedisce modifiche accidentali."
                ]
            },
            {
                title: "Metodi",
                content: [
                    "Un **metodo** è una funzione definita dentro una classe. Riceve implicitamente l'oggetto su cui è chiamato.",
                    "```cpp\nclass Point {\npublic:\n    double x;\n    double y;\n\n    void offset(double dx, double dy) {\n        x += dx;\n        y += dy;\n    }\n\n    void print() const {\n        std::cout << '(' << x << ',' << y << ')';\n    }\n};\n```",
                    "La chiamata `p.offset(1.0, 2.0)` modifica l'oggetto `p`. È utile pensare ai metodi come operazioni disponibili su ciascuna istanza."
                ]
            },
            {
                title: "Implementazione Separata",
                content: [
                    "Per classi non banali, si dichiarano i metodi nell'header e si implementano nel file `.cpp`. L'operatore `::` indica a quale classe appartiene il metodo.",
                    "```cpp\n// point.h\nclass Point {\npublic:\n    double x, y;\n    void offset(double dx, double dy);\n    void print() const;\n};\n\n// point.cpp\nvoid Point::offset(double dx, double dy) {\n    x += dx;\n    y += dy;\n}\n```",
                    "Questo separa interfaccia e implementazione, rendendo il progetto più ordinato."
                ]
            },
            {
                title: "Costruttori e Costruttore di Copia",
                content: [
                    "Un **costruttore** è chiamato quando viene creata un'istanza. Ha lo stesso nome della classe e non dichiara tipo di ritorno.",
                    "```cpp\nclass Point {\npublic:\n    double x, y;\n\n    Point() {\n        x = 0.0;\n        y = 0.0;\n    }\n\n    Point(double nx, double ny) {\n        x = nx;\n        y = ny;\n    }\n};\n```",
                    "Il **costruttore di copia** viene usato quando si crea un oggetto copiandone un altro. Quello generato automaticamente copia campo per campo; se la classe possiede memoria dinamica, può servire una copia personalizzata."
                ]
            },
            {
                title: "public, private e struct",
                content: [
                    "Gli specificatori di accesso definiscono dove campi e metodi sono utilizzabili.",
                    "- `public`: accessibile dall'esterno.",
                    "- `private`: accessibile solo dai metodi della classe.",
                    "La pratica comune è rendere privati i dati interni ed esporre metodi controllati.",
                    "```cpp\nclass Point {\nprivate:\n    double x, y;\npublic:\n    Point(double nx, double ny) : x(nx), y(ny) {}\n    double getX() const { return x; }\n    double getY() const { return y; }\n};\n```",
                    "In C++, `struct` e `class` sono quasi equivalenti: in una `struct` i membri sono `public` per default, in una `class` sono `private` per default."
                ]
            }
        ]
    },
    {
        id: "cpp-oop",
        title: "C++: Programmazione a Oggetti",
        subsections: [
            {
                title: "Panoramica",
                content: [
                    "**Obiettivo della sezione**",
                    "Capire l'approccio object-oriented: incapsulamento, interfacce, ereditarietà, polimorfismo, funzioni virtuali, classi astratte ed ereditarietà multipla.",
                    "![Ereditarieta OOP](https://commons.wikimedia.org/wiki/Special:FilePath/CPT-OOP-inheritance-roleplay.svg)"
                ]
            },
            {
                title: "Dal Procedurale all'Object-Oriented",
                content: [
                    "Nel paradigma procedurale il programma è organizzato come sequenza di compiti e sottocompiti: si definiscono funzioni e si decide in quale ordine chiamarle.",
                    "Quando dati e operazioni crescono, questa struttura può diventare difficile da mantenere. L'object-oriented organizza il programma intorno a oggetti che possiedono stato e metodi.",
                    "Un programma che modella un'auto, per esempio, può avere oggetti come ruote, volante, motore e pedali, invece di molte variabili scollegate."
                ]
            },
            {
                title: "Tre Idee Fondamentali",
                content: [
                    "Le tre idee centrali della programmazione a oggetti sono:",
                    "- **Incapsulamento**: dati e funzioni correlate sono raccolti in oggetti con un'interfaccia pubblica.",
                    "- **Ereditarietà**: classi più specifiche riusano e specializzano codice di classi più generali.",
                    "- **Polimorfismo**: lo stesso riferimento può indicare oggetti di tipi derivati diversi; la funzione chiamata può dipendere dal tipo reale a runtime."
                ]
            },
            {
                title: "Incapsulamento e Interfaccia",
                content: [
                    "L'incapsulamento separa ciò che un oggetto offre da come lo realizza. Chi usa una classe dovrebbe dipendere dai suoi metodi pubblici, non dai dettagli interni.",
                    "```cpp\nclass Counter {\nprivate:\n    int value;\npublic:\n    Counter() : value(0) {}\n    void increment() { value += 1; }\n    int getValue() const { return value; }\n};\n```",
                    "Nascondere i dati riduce accoppiamento e bug: se un campo è privato, la classe può garantire invarianti e controllare come cambia lo stato."
                ]
            },
            {
                title: "Ereditarietà",
                content: [
                    "L'ereditarietà esprime una relazione `is-a`: una `Car` è un `Vehicle`, un `Truck` è un `Vehicle`.",
                    "```cpp\nclass Vehicle {\npublic:\n    void start() { std::cout << \"start\\n\"; }\n};\n\nclass Car : public Vehicle {\npublic:\n    void openTrunk() { std::cout << \"trunk\\n\"; }\n};\n```",
                    "La classe derivata eredita i membri accessibili della classe base. Con ereditarietà `public`, l'interfaccia pubblica della base resta pubblica anche nella derivata."
                ]
            },
            {
                title: "Polimorfismo e virtual",
                content: [
                    "Se una funzione deve lavorare con veicoli generici ma comportarsi in modo diverso per auto e camion, serve il polimorfismo. In C++ si ottiene con metodi `virtual` e accesso tramite puntatori o riferimenti alla classe base.",
                    "```cpp\nclass Vehicle {\npublic:\n    virtual const char *description() const { return \"vehicle\"; }\n};\n\nclass Car : public Vehicle {\npublic:\n    const char *description() const override { return \"car\"; }\n};\n\nvoid printDescription(const Vehicle &v) {\n    std::cout << v.description() << '\\n';\n}\n```",
                    "Senza `virtual`, C++ sceglie la funzione in base al tipo statico; con `virtual`, sceglie in base al tipo reale dell'oggetto."
                ]
            },
            {
                title: "Classi Astratte",
                content: [
                    "Una classe astratta definisce un'interfaccia ma non è istanziabile. Contiene almeno una funzione virtuale pura, scritta con `= 0`.",
                    "```cpp\nclass Shape {\npublic:\n    virtual double area() const = 0;\n    virtual ~Shape() = default;\n};\n\nclass Rectangle : public Shape {\n    double w, h;\npublic:\n    Rectangle(double w, double h) : w(w), h(h) {}\n    double area() const override { return w * h; }\n};\n```",
                    "Le classi derivate concrete devono implementare tutti i metodi virtuali puri."
                ]
            },
            {
                title: "Ereditarietà Multipla",
                content: [
                    "C++ consente a una classe di derivare da più classi base.",
                    "```cpp\nclass Car : public Vehicle, public InsuredItem {\n    // ...\n};\n```",
                    "È una funzionalità potente ma rischiosa. Se due classi base definiscono lo stesso membro, bisogna qualificare il nome (`Vehicle::x`). Se due basi condividono una base comune, può nascere il problema del diamante: l'oggetto derivato può contenere due copie della stessa base.",
                    "In generale si usa l'ereditarietà multipla solo quando il modello lo richiede davvero; spesso composizione e interfacce astratte sono più chiare."
                ]
            }
        ]
    },
    {
        id: "cpp-memoria",
        title: "C++: Gestione della Memoria",
        subsections: [
            {
                title: "Panoramica",
                content: [
                    "**Obiettivo della sezione**",
                    "Gestire durata degli oggetti, `this`, stack, heap, `new`, `delete`, array dinamici, distruttori, memory leak e copia profonda.",
                    "![Stack e heap](https://commons.wikimedia.org/wiki/Special:FilePath/Stack_vs_Heap.png)"
                ]
            },
            {
                title: "Costruttori e this",
                content: [
                    "Quando si crea un oggetto, viene invocato un costruttore. Se si crea un array di oggetti, il costruttore viene chiamato per ogni elemento.",
                    "```cpp\nclass Integer {\npublic:\n    int val;\n    Integer(int val = 0) {\n        this->val = val;\n    }\n};\n```",
                    "`this` è un puntatore all'oggetto corrente. `this->val` significa `(*this).val` ed è utile quando un parametro ha lo stesso nome di un campo."
                ]
            },
            {
                title: "Scope e Durata",
                content: [
                    "La memoria di una variabile locale è valida finché la variabile è nello scope. Quando il blocco termina, quella memoria può essere riutilizzata.",
                    "```cpp\nint *p;\nif (true) {\n    int x = 5;\n    p = &x;\n}\nstd::cout << *p << '\\n'; // errore logico: puntatore pendente\n```",
                    "`p` continua a contenere un indirizzo, ma l'oggetto a cui puntava non esiste più. Questo è un **dangling pointer**."
                ]
            },
            {
                title: "Stack e Heap",
                content: [
                    "Le variabili locali normali vivono tipicamente nello **stack** e vengono liberate automaticamente. Con `new` si alloca memoria nello **heap**, che resta valida finché non viene liberata manualmente.",
                    "```cpp\nint *x = new int;\n*x = 5;\nstd::cout << *x << '\\n';\ndelete x;\n```",
                    "Ogni `new` deve avere un `delete` corrispondente. Dimenticare `delete` causa un **memory leak**: memoria non più raggiungibile ma ancora allocata."
                ]
            },
            {
                title: "Restituire Puntatori",
                content: [
                    "Restituire l'indirizzo di una variabile locale è sbagliato, perché la variabile viene distrutta alla fine della funzione.",
                    "```cpp\nint *bad() {\n    int x = 5;\n    return &x; // sbagliato\n}\n```",
                    "Se serve restituire memoria che sopravvive alla funzione, si può allocare nello heap, ma allora il chiamante deve liberarla.",
                    "```cpp\nint *getPtrToFive() {\n    int *x = new int;\n    *x = 5;\n    return x;\n}\n\nint *p = getPtrToFive();\nstd::cout << *p << '\\n';\ndelete p;\n```"
                ]
            },
            {
                title: "Array Dinamici",
                content: [
                    "Gli array sullo stack richiedono una dimensione nota come costante in C++ classico. Per dimensioni decise a runtime si usa `new[]`.",
                    "```cpp\nint numItems;\nstd::cin >> numItems;\nint *arr = new int[numItems];\n\nfor (int i = 0; i < numItems; i = i + 1) {\n    std::cin >> arr[i];\n}\n\ndelete[] arr;\n```",
                    "Gli array allocati con `new[]` devono essere liberati con `delete[]`, non con `delete`. Nei C++ moderni, `std::vector` è spesso la scelta migliore."
                ]
            },
            {
                title: "Oggetti Dinamici e Distruttori",
                content: [
                    "`new` può creare anche istanze di classi. Il costruttore viene chiamato all'allocazione; il distruttore viene chiamato alla deallocazione.",
                    "```cpp\nclass Point {\npublic:\n    int x, y;\n    Point() { std::cout << \"constructor\\n\"; }\n    ~Point() { std::cout << \"destructor\\n\"; }\n};\n\nPoint *p = new Point;\ndelete p;\n```",
                    "Il distruttore ha nome `~NomeClasse()` e non restituisce valori. Serve per rilasciare risorse possedute dall'oggetto."
                ]
            },
            {
                title: "Classi che Possiedono Memoria",
                content: [
                    "Se una classe alloca memoria nel costruttore, deve liberarla nel distruttore.",
                    "```cpp\nclass IntegerArray {\npublic:\n    int *data;\n    int size;\n\n    IntegerArray(int size) {\n        this->size = size;\n        data = new int[size];\n    }\n\n    ~IntegerArray() {\n        delete[] data;\n    }\n};\n```",
                    "Questa forma lega la durata della memoria dinamica alla durata dell'oggetto. È l'idea alla base di RAII: una risorsa viene acquisita nel costruttore e rilasciata nel distruttore."
                ]
            },
            {
                title: "Copia Superficiale e Copia Profonda",
                content: [
                    "Il costruttore di copia predefinito copia campo per campo. Se un campo è un puntatore, vengono copiati gli indirizzi, non i dati puntati. Questo crea due oggetti che possiedono la stessa memoria: al primo distruttore il secondo resta con un puntatore pendente, e al secondo distruttore può avvenire una doppia `delete`.",
                    "La soluzione è una **copia profonda**.",
                    "```cpp\nclass IntegerArray {\npublic:\n    int *data;\n    int size;\n\n    IntegerArray(int size) : data(new int[size]), size(size) {}\n\n    IntegerArray(const IntegerArray &other)\n        : data(new int[other.size]), size(other.size) {\n        for (int i = 0; i < size; i = i + 1) {\n            data[i] = other.data[i];\n        }\n    }\n\n    ~IntegerArray() { delete[] data; }\n};\n```",
                    "In C++ moderno si preferiscono contenitori come `std::vector`, che gestiscono automaticamente copia, distruzione e memoria."
                ]
            }
        ]
    },
    {
        id: "cpp-template-stl",
        title: "C++: Template e STL",
        subsections: [
            {
                title: "Panoramica",
                content: [
                    "**Obiettivo della sezione**",
                    "Generalizzare codice con template di funzione e classe, usare specializzazioni, parametri di default, container STL, iteratori, algoritmi standard e overload degli operatori."
                ]
            },
            {
                title: "Template di Funzione",
                content: [
                    "Un template permette di scrivere una funzione generica rispetto al tipo.",
                    "```cpp\ntemplate <typename T>\nT sum(const T a, const T b) {\n    return a + b;\n}\n\nstd::cout << sum(1, 2) << '\\n';       // int\nstd::cout << sum(1.2, 2.4) << '\\n';   // double\n```",
                    "`typename T` introduce un parametro di tipo. Il compilatore genera versioni concrete della funzione per i tipi effettivamente usati."
                ]
            },
            {
                title: "Più Parametri e Template di Classe",
                content: [
                    "Un template può avere più parametri di tipo.",
                    "```cpp\ntemplate <typename T, typename U>\nU sumAs(const T a, const U b) {\n    return a + b;\n}\n```",
                    "Anche le classi possono essere template.",
                    "```cpp\ntemplate <typename T>\nclass Point {\n    T x, y;\npublic:\n    Point(T x, T y) : x(x), y(y) {}\n    T getX() const { return x; }\n};\n```",
                    "`Point<int>` e `Point<double>` sono tipi diversi generati dallo stesso modello."
                ]
            },
            {
                title: "Specializzazione e Parametri Non Tipo",
                content: [
                    "Una specializzazione fornisce un'implementazione diversa per un tipo specifico.",
                    "```cpp\ntemplate <typename T>\nclass Container {\n    T value;\npublic:\n    Container(T value) : value(value) {}\n    T get() const { return value; }\n};\n\ntemplate <>\nclass Container<char> {\n    char value;\npublic:\n    Container(char value) : value(value) {}\n    char upper() const { return std::toupper(value); }\n};\n```",
                    "I template possono anche avere parametri non tipo, come dimensioni intere.",
                    "```cpp\ntemplate <typename T, int N = 10>\nclass ArrayContainer {\n    T data[N];\n};\n```"
                ]
            },
            {
                title: "STL: Container e Iteratori",
                content: [
                    "La Standard Template Library fornisce container e algoritmi generici. Container comuni: `vector`, `list`, `map`, `set`, `queue`, `stack`.",
                    "Un iteratore è un oggetto simile a un puntatore che permette di attraversare un container.",
                    "```cpp\n#include <set>\n\nstd::set<int> values;\nvalues.insert(5);\nvalues.insert(1);\nvalues.insert(3);\n\nfor (std::set<int>::iterator it = values.begin(); it != values.end(); ++it) {\n    std::cout << *it << ' ';\n}\n```",
                    "`set` mantiene gli elementi ordinati e senza duplicati. Molti container offrono `begin()` ed `end()` per delimitare l'intervallo visitabile."
                ]
            },
            {
                title: "Algoritmi Standard",
                content: [
                    "Gli algoritmi STL lavorano su intervalli indicati da iteratori. Esempi: `sort`, `reverse`, `binary_search`, `find`, operazioni min/max.",
                    "```cpp\n#include <algorithm>\n#include <vector>\n\nstd::vector<int> v = {7, 1, 4, 3};\nstd::sort(v.begin(), v.end());\nstd::reverse(v.begin(), v.end());\n\nbool found = std::binary_search(v.begin(), v.end(), 4);\n```",
                    "Attenzione: `binary_search` richiede un intervallo ordinato secondo lo stesso criterio di ricerca."
                ]
            },
            {
                title: "Overload degli Operatori",
                content: [
                    "Per tipi definiti dall'utente si può definire il comportamento di operatori come `+` o `<<`.",
                    "```cpp\nclass USCurrency {\npublic:\n    int dollars;\n    int cents;\n};\n\nUSCurrency operator+(const USCurrency &a, const USCurrency &b) {\n    USCurrency result{a.dollars + b.dollars, a.cents + b.cents};\n    if (result.cents >= 100) {\n        result.dollars += 1;\n        result.cents -= 100;\n    }\n    return result;\n}\n```",
                    "L'overload deve mantenere un significato prevedibile. Ridefinire operatori in modo sorprendente rende il codice difficile da leggere."
                ]
            }
        ]
    },
    {
        id: "cpp-avanzato",
        title: "C++: Argomenti Avanzati",
        subsections: [
            {
                title: "Panoramica",
                content: [
                    "**Obiettivo della sezione**",
                    "Usare strumenti utili nei progetti: file stream, `std::string`, `enum`, struttura generale di un progetto, riferimenti, `const`, eccezioni, `friend`, macro, cast e argomenti avanzati da approfondire."
                ]
            },
            {
                title: "File Stream",
                content: [
                    "La gestione dei file usa stream simili a `cin` e `cout`. La libreria da includere è `<fstream>`.",
                    "```cpp\n#include <fstream>\n\nint main() {\n    std::ifstream source(\"source-file.txt\");\n    std::ofstream dest(\"dest-file.txt\");\n\n    int value;\n    while (source >> value) {\n        dest << value << '\\n';\n    }\n}\n```",
                    "`ifstream` legge da file, `ofstream` scrive su file. Le modalità di apertura permettono lettura, sovrascrittura, append e altre varianti."
                ]
            },
            {
                title: "std::string e getline",
                content: [
                    "Per testo generico è più comodo usare `std::string` invece di array di `char`.",
                    "```cpp\n#include <string>\n\nstd::string word;\nstd::cin >> word; // legge fino allo spazio\n```",
                    "`operator>>` legge una parola. Per leggere l'intera riga, inclusi gli spazi, si usa `getline`.",
                    "```cpp\nstd::string sentence;\nstd::getline(std::cin, sentence);\n```"
                ]
            },
            {
                title: "enum",
                content: [
                    "Un'enumerazione definisce un tipo con un insieme limitato di valori nominati. È più espressiva di una lista di costanti intere scollegate.",
                    "```cpp\nenum Suit { Clubs, Diamonds, Hearts, Spades };\n\nvoid printSuit(Suit suit) {\n    const char *names[] = {\"Clubs\", \"Diamonds\", \"Hearts\", \"Spades\"};\n    std::cout << names[suit] << '\\n';\n}\n```",
                    "I valori possono essere assegnati esplicitamente: `enum Suit { Clubs = 18, Diamonds = 91, Hearts = 241, Spades = 13 };`. Se non lo sono, il primo vale `0` e gli altri aumentano di `1`."
                ]
            },
            {
                title: "Struttura di un Progetto",
                content: [
                    "Molti programmi orientati agli oggetti hanno una classe di gestione, ad esempio `Game`, `Directory` o `Application`, che mantiene gli oggetti principali e coordina le operazioni.",
                    "`main` dovrebbe restare piccolo: crea l'oggetto principale, gestisce input/output essenziale e chiama metodi di livello più alto. I dettagli vanno in classi, funzioni e librerie separate.",
                    "Per collezioni di oggetti, invece di array manuali, si usano spesso container STL come `std::vector`, `std::map` o `std::set`."
                ]
            },
            {
                title: "Riferimenti",
                content: [
                    "Un riferimento è un alias per un oggetto esistente. Il tipo `int &` significa riferimento a `int`.",
                    "```cpp\nint y = 3;\nint &x = y;\nx = 7;\nstd::cout << y << '\\n'; // 7\n```",
                    "I riferimenti possono essere parametri e valori di ritorno. Restituire per riferimento evita copie, ma è corretto solo se l'oggetto riferito sopravvive alla funzione.",
                    "```cpp\nint globalValue;\nint &getGlobalValue() {\n    return globalValue;\n}\n```"
                ]
            },
            {
                title: "const",
                content: [
                    "`const` esprime l'impegno a non modificare un valore attraverso quel nome, puntatore o riferimento.",
                    "```cpp\nvoid printPoint(const Point &p) {\n    std::cout << p.getX() << '\\n';\n}\n```",
                    "È sempre possibile usare un valore non `const` dove è richiesto un valore `const`. Il contrario non è permesso, perché permetterebbe modifiche non autorizzate.",
                    "I metodi che non modificano l'oggetto devono essere dichiarati `const`.",
                    "```cpp\nclass Point {\n    double x;\npublic:\n    double getX() const { return x; }\n};\n```"
                ]
            },
            {
                title: "Eccezioni",
                content: [
                    "Un'eccezione segnala un errore che impedisce a una funzione di proseguire normalmente. Il codice che può fallire si mette in un blocco `try`; i gestori stanno in blocchi `catch`.",
                    "```cpp\n#include <stdexcept>\n\nint divide(int x, int y) {\n    if (y == 0) {\n        throw std::runtime_error(\"divisione per zero\");\n    }\n    return x / y;\n}\n\ntry {\n    std::cout << divide(5, 0);\n} catch (const std::runtime_error &error) {\n    std::cerr << error.what() << '\\n';\n}\n```",
                    "Se un'eccezione non viene intercettata, risale lo stack delle chiamate. Durante questa risalita, i distruttori degli oggetti locali già costruiti vengono chiamati."
                ]
            },
            {
                title: "friend e Macro",
                content: [
                    "`friend` concede a una funzione o classe esterna accesso ai membri privati. È comune nell'overload di operatori di stream.",
                    "```cpp\nclass USCurrency {\n    int dollars, cents;\npublic:\n    USCurrency(int d, int c) : dollars(d), cents(c) {}\n    friend std::ostream &operator<<(std::ostream &o, const USCurrency &c);\n};\n\nstd::ostream &operator<<(std::ostream &o, const USCurrency &c) {\n    return o << '$' << c.dollars << '.' << c.cents;\n}\n```",
                    "Le macro del preprocessore fanno sostituzione testuale prima della compilazione.",
                    "```cpp\n#define SUM(x, y) ((x) + (y))\n```",
                    "Le macro non hanno controllo di tipo e possono produrre errori sottili. Quando possibile, preferire funzioni, `const`, `constexpr` o template."
                ]
            },
            {
                title: "Cast",
                content: [
                    "Il casting converte un valore da un tipo a un altro. I cast in stile C, come `(double)x`, sono ammessi ma meno espliciti. C++ offre cast più chiari.",
                    "- `static_cast<T>(value)`: conversione ordinaria e controllata a compile-time.",
                    "- `dynamic_cast<T>(value)`: conversione sicura dentro gerarchie polimorfiche; può restituire `nullptr` per puntatori o lanciare eccezione per riferimenti.",
                    "- `reinterpret_cast<T>(value)`: reinterpretazione a basso livello della memoria; da usare raramente.",
                    "- `const_cast<T>(value)`: aggiunge o rimuove qualificatori `const`/`volatile`; da usare solo quando si sa esattamente perché è sicuro.",
                    "```cpp\ndouble ratio = static_cast<double>(count) / total;\n```"
                ]
            },
            {
                title: "Argomenti da Approfondire",
                content: [
                    "Il percorso C++ non finisce qui. Argomenti utili per lo studio successivo:",
                    "- **Union**: più campi condividono la stessa area di memoria; solo uno è significativo alla volta.",
                    "- **Namespace**: raggruppano nomi e riducono conflitti, come `std`.",
                    "- **Puntatori `void *`**: puntatori a dati di tipo non specificato.",
                    "- **Ereditarietà virtuale**: soluzione tecnica al problema del diamante.",
                    "- **String stream**: input/output su stringhe come se fossero stream.",
                    "- **RTTI**: informazioni sul tipo a runtime.",
                    "- **Vtable**: meccanismo con cui molte implementazioni realizzano chiamate virtuali.",
                    "- **STL avanzata**: iteratori, algoritmi, adattatori e container specializzati."
                ]
            }
        ]
    }
];

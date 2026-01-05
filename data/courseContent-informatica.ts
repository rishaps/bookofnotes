
import { MainSection } from '../types';

export const informaticaContent: MainSection[] = [
    {
        id: "rappresentazione-informazione",
        title: "Lezione 1: Rappresentazione dell'Informazione",
        subsections: [
            {
                title: "1.1 Introduzione alla Rappresentazione",
                content: [
                    `**Concetto Fondamentale**`,
                    `I moderni calcolatori elettronici possono manipolare informazioni rappresentabili esclusivamente da sequenze composte da due possibili valori (1 o 0, vero o falso, acceso o spento). Nonostante questa apparente limitazione, i calcolatori sono in grado di memorizzare ed elaborare qualsiasi tipo di informazione numerica, testuale, visiva e sonora.`,
                    `In questo capitolo vediamo come sia possibile rappresentare informazioni di qualsiasi tipo usando sequenze di valori binari.`
                ]
            },
            {
                title: "1.2 La Logica Binaria",
                content: [
                    `**George Boole e l'Algebra Booleana**`,
                    `![George Boole](/FIRST-YEAR-IMAGES/george-boole.png)`,
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
                title: "1.3 Tabelle di Verità",
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
                title: "1.4 Esempio: Costruzione di una Tabella di Verità",
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
                title: "1.5 Proprietà degli Operatori Booleani",
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
                title: "1.6 Derivare Espressioni da Tabelle di Verità",
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
                title: "1.7 Altri Operatori Logici",
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
                title: "1.8 Esercizi sulla Logica Binaria",
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
    // Lezione 2: Rappresentazione dell'Informazione Numerica
    // ============================================================
    {
        id: "rappresentazione-numerica",
        title: "Lezione 2: Rappresentazione dell'Informazione Numerica",
        subsections: [
            {
                title: "2.1 Sistemi di Numerazione Posizionali",
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
                title: "2.2 Basi di Numerazione in Informatica",
                content: [
                    `![Sistemi Maya e Babilonesi](/FIRST-YEAR-IMAGES/maya-babilonesi-numeri.png)`,
                    `*Figura 2.1: (A sinistra) le 20 cifre del sistema di numerazione posizionale in base 20 usato dagli antichi Maya. (A destra) le 59 cifre diverse da zero del sistema di numerazione posizionale in base 60 usato dagli antichi Babilonesi.*`,
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
                title: "2.3 Conversione da Base b a Base 10",
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
                title: "2.4 Conversione da Base 10 a Base b",
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
                title: "2.5 Somma Binaria Senza Segno",
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
                title: "2.6 Rappresentazione in Complemento a Due",
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
                title: "2.7 Somma in Complemento a Due",
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
                title: "2.8 Rappresentazione in Virgola Mobile (IEEE 754)",
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
                title: "2.9 Rappresentazione dell'Informazione Non Numerica",
                content: [
                    `**Codifica dei Caratteri**`,
                    `La codifica più diffusa è la **codifica ASCII** (American Standard Code for Information Interchange), che prevede 128 simboli codificati con 7 bit. In tutti i calcolatori moderni si usa una codifica a 8 bit (1 byte).`,
                    `Per alfabeti con più di 128 simboli è stata sviluppata la codifica **Unicode**, che può utilizzare 8, 16 oppure 32 bit. I primi 128 simboli della codifica a 8 bit coincidono con i caratteri ASCII per garantire compatibilità.`,
                    `**Rappresentazione delle Immagini**`,
                    `![Confronto Vector vs Bitmap](/FIRST-YEAR-IMAGES/vector-bitmap.png)`,
                    `*Figura 2.2: Confronto tra immagini vettoriali e bitmap. L'immagine vettoriale può essere ingrandita senza perdita di qualità, mentre quella bitmap mostra i pixel.*`,
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
                title: "2.10 Rappresentazione Audio e Compressione",
                content: [
                    `![Campionamento Audio](/FIRST-YEAR-IMAGES/campionamento-audio.png)`,
                    `*Figura 2.3: Un segnale audio viene prima sottoposto a campionamento (misurazione in istanti discreti), poi a quantizzazione (discretizzazione dei valori di ampiezza).*`,
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
                title: "2.11 Esercizi sulla Rappresentazione Numerica",
                content: [
                    `![Calcolatore Setun](/FIRST-YEAR-IMAGES/setun-computer.png)`,
                    `*Figura 2.4: Calcolatore ternario Setun, costruito nel 1958 da Nicolay Brusentsov dell'Università di Stato di Mosca.*`,
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
                    `![Keyset di Engelbart](/FIRST-YEAR-IMAGES/keyset-engelbart.png)`,
                    `*Figura 2.5: Keyset di Doug Engelbart. Il keyset è il dispositivo sotto la mano sinistra; la mano destra impugna un mouse.*`,
                    `**Esercizio 2.4** - Il keyset di Engelbart ha 5 tasti. Ogni dito poggia su un tasto, e la pressione simultanea di uno o più tasti corrisponde ad un simbolo (se nessun tasto è premuto, il dispositivo è inerte). Quanti simboli diversi è possibile rappresentare?`,
                    `**Esercizio 2.5** - In notazione ternaria bilanciata si usano i simboli $T, 0, 1$ per rappresentare $-1, 0, +1$. Ad esempio: $10T_{bal3} = (+1) \\times 3^2 + 0 \\times 3^1 + (-1) \\times 3^0 = 9 - 1 = 8$. Qual è il massimo e minimo valore rappresentabile con $n$ trit?`,
                    `![Orologi Binari](/FIRST-YEAR-IMAGES/orologi-binari.png)`,
                    `*Figura 2.6: Orologi binari. Il primo a sinistra segna le 21:39:40. Che ora segnano gli altri?*`,
                    `**Esercizio 2.6** - Calcolare il risultato delle somme seguenti usando $n = 8$ bit in complemento a due; indicare se c'è overflow o underflow:`,
                    `(a) $0110\\,0111_{2C} + 1011\\,1011_{2C}$`,
                    `(b) $0100\\,0001_{2C} + 0110\\,1111_{2C}$`,
                    `(c) $1101\\,1001_{2C} + 1111\\,0001_{2C}$`,
                    `(d) $0111\\,1111_{2C} + 0000\\,0001_{2C}$`,
                    `![Display a 16 Segmenti](/FIRST-YEAR-IMAGES/display-16-segmenti.png)`,
                    `*Figura 2.7: Display a 16 segmenti che mostra "CIAO". Lo stato può essere codificato con un intero a 16 bit.*`,
                    `**Esercizio 2.7** - Determinare i valori (in binario e decimale) che rappresentano lo stato dei display che mostrano i quattro caratteri CIAO.`,
                    `**Esercizio 2.8** - Un documento di 2 000 000 caratteri contiene solo 26 lettere minuscole, 26 maiuscole, punto e spazio.`,
                    `(a) Quanti bit con codifica ASCII?`,
                    `(b) Quanti bit con codifica ad hoc a lunghezza fissa?`
                ]
            }
        ]
    },
    // ============================================================
    // Lezione 3: Architettura dei Calcolatori
    // ============================================================
    {
        id: "architettura-calcolatori",
        title: "Lezione 3: Architettura dei Calcolatori",
        subsections: [
            {
                title: "3.1 Introduzione ai Circuiti Logici",
                content: [
                    `![Macchina Analitica di Babbage](/FIRST-YEAR-IMAGES/babbage-engine.png)`,
                    `*Figura 3.1: Prototipo della macchina analitica di Charles Babbage, considerata il primo esempio di calcolatore programmabile di tipo generale.*`,
                    `Gli operatori booleani introdotti nella Lezione 1 possono essere efficientemente realizzati tramite dispositivi elettronici, e per questa ragione vengono impiegati come mattoni fondamentali per la costruzione di calcolatori.`,
                    `I calcolatori programmabili non sono stati sempre basati sull'elettronica. La **macchina analitica di Charles Babbage** è considerata il primo esempio di calcolatore programmabile di tipo generale ed era realizzabile interamente mediante parti meccaniche.`,
                    `![Porte Logiche](/FIRST-YEAR-IMAGES/logic-gates.png)`,
                    `*Figura 3.2: Rappresentazione grafica delle porte logiche più frequentemente usate: AND, OR, NOT, NAND, NOR, XOR.*`,
                    `I circuiti logici che realizzano gli operatori booleani vengono rappresentati graficamente mediante forme standard. Tali circuiti sono detti **porte logiche**. Più porte logiche possono essere tra loro collegate formando una **rete logica** (o circuito logico), in grado di calcolare qualunque funzione booleana predefinita.`
                ]
            },
            {
                title: "3.2 Full Adder (Sommatore)",
                content: [
                    `Il **1-bit full adder** è una rete logica in grado di calcolare la somma binaria con riporto. Riceve in input tre valori binari $A$, $B$ e $C_{in}$, e calcola:`,
                    `- $S = A + B + C_{in}$ (somma)`,
                    `- $C_{out}$ (nuovo riporto)`,
                    `**Espressioni booleane ottimizzate**:`,
                    `$$S = (A \\oplus B) \\oplus C_{in}$$`,
                    `$$C_{out} = ((A \\oplus B) \\land C_{in}) \\lor (A \\land B)$$`,
                    `![1-bit Full Adder](/FIRST-YEAR-IMAGES/full-adder-1bit.png)`,
                    `*Figura 3.3: Circuito del 1-bit full adder che implementa le espressioni per S e C_out.*`,
                    `**4-bit Full Adder (Ripple-Carry Adder)**`,
                    `![4-bit Full Adder](/FIRST-YEAR-IMAGES/full-adder-4bit.png)`,
                    `*Figura 3.4: 4-bit full adder ottenuto combinando quattro full-adder ad 1 bit in cascata.*`,
                    `Il circuito sommatore ad un bit può essere utilizzato come base per costruire un sommatore per numeri a più bit. Quattro sommatori ad un bit possono calcolare: $A_3A_2A_1A_0 + B_3B_2B_1B_0$.`,
                    `Un sommatore basato sulla propagazione del riporto è detto **ripple-carry adder**. Sebbene sia semplice da realizzare, ha il difetto di essere inefficiente se il numero di cifre è elevato: ogni sommatore deve attendere il riporto dal precedente. Il tempo è proporzionale a $n$.`
                ]
            },
            {
                title: "3.3 Comparatore",
                content: [
                    `Un **comparatore ad 1 bit** riceve in input due bit $A$, $B$ e produce tre bit in output:`,
                    `- $GT = 1$ se e solo se $A > B$`,
                    `- $EQ = 1$ se e solo se $A = B$`,
                    `- $LT = 1$ se e solo se $A < B$`,
                    `**Espressioni booleane**:`,
                    `$$GT = A \\land (\\neg B)$$`,
                    `$$EQ = \\neg(A \\oplus B)$$`,
                    `$$LT = (\\neg A) \\land B$$`,
                    `![Comparatore 1-bit](/FIRST-YEAR-IMAGES/comparator-1bit.png)`,
                    `*Figura 3.5: Comparatore ad 1 bit che calcola GT, EQ e LT.*`
                ]
            },
            {
                title: "3.4 Multiplexer",
                content: [
                    `Un **multiplexer 2-a-1** permette di selezionare il valore di uno dei 2 ingressi. Ha tre input binari $A$, $B$, $S$ (selettore) e produce un output $R$:`,
                    `- $R = A$ se $S = 0$`,
                    `- $R = B$ se $S = 1$`,
                    `![Multiplexer 2-a-1](/FIRST-YEAR-IMAGES/multiplexer-2a1.png)`,
                    `*Figura 3.6: Multiplexer 2-a-1. Generalmente un multiplexer è indicato con il simbolo trapezoidale a destra.*`,
                    `È possibile realizzare multiplexer con più input (solitamente potenze di due): 4-a-1, 8-a-1, ecc. Per un multiplexer $2^n$-a-1 sono necessari $n$ segnali binari per il selettore.`,
                    `**Tabella di verità Multiplexer 4-a-1**`,
                    `$$\\begin{array}{|c|c|c|} \\hline S_1 & S_0 & R \\\\ \\hline 0 & 0 & In_0 \\\\ 0 & 1 & In_1 \\\\ 1 & 0 & In_2 \\\\ 1 & 1 & In_3 \\\\ \\hline \\end{array}$$`
                ]
            },
            {
                title: "3.5 Flip-Flop",
                content: [
                    `Un **flip-flop** è un circuito in grado di memorizzare un singolo valore binario per riutilizzarlo in seguito. Si basa su circuiti che contengono cicli, in cui uno o più segnali continuano a circolare.`,
                    `**SR and-or latch**`,
                    `![Flip-flop SR and-or latch](/FIRST-YEAR-IMAGES/flipflop-andor.png)`,
                    `*Figura 3.7: Flip-flop realizzato mediante SR and-or latch.*`,
                    `Ha due ingressi $S$ (Set) e $R$ (Reset):`,
                    `$$\\begin{array}{|c|c|c|l|} \\hline S & R & Q' & \\text{Azione} \\\\ \\hline 0 & 0 & Q & \\text{Preserva stato} \\\\ 0 & 1 & 0 & \\text{Reset} \\\\ 1 & 0 & 1 & \\text{Set} \\\\ 1 & 1 & 1 & \\text{Set} \\\\ \\hline \\end{array}$$`,
                    `**SR nor latch**`,
                    `![Flip-flop SR nor latch](/FIRST-YEAR-IMAGES/flipflop-nor.png)`,
                    `*Figura 3.8: Flip-flop realizzato mediante SR nor latch.*`,
                    `Produce due output $Q$ e $\\overline{Q}$ (uno la negazione dell'altro):`,
                    `$$\\begin{array}{|c|c|c|l|} \\hline S & R & Q' & \\text{Azione} \\\\ \\hline 0 & 0 & Q & \\text{Preserva stato} \\\\ 0 & 1 & 0 & \\text{Reset} \\\\ 1 & 0 & 1 & \\text{Set} \\\\ 1 & 1 & ? & \\text{Non ammesso} \\\\ \\hline \\end{array}$$`
                ]
            },
            {
                title: "3.6 Unità Aritmetico-Logica (ALU)",
                content: [
                    `La **ALU ad 1 bit** combina le componenti viste fin qui. Ha tre input binari $A$, $B$, $C_{in}$, un input $Op$ (2 bit) e due output $R$ e $C_{out}$.`,
                    `**Operazioni supportate**`,
                    `$$\\begin{array}{|c|l|} \\hline Op & R \\\\ \\hline 00 & A + B + C_{in} \\ (\\text{somma}) \\\\ 01 & A \\lor B \\ (\\text{OR}) \\\\ 10 & A \\land B \\ (\\text{AND}) \\\\ 11 & \\neg A \\ (\\text{NOT}) \\\\ \\hline \\end{array}$$`,
                    `![ALU 1-bit](/FIRST-YEAR-IMAGES/alu-1bit.png)`,
                    `*Figura 3.9: Struttura di una ALU ad un bit. Un multiplexer 4-a-1 seleziona l'operazione in base a Op.*`,
                    `La ALU calcola sempre tutte le quattro operazioni; un multiplexer 4-a-1 seleziona il risultato in base a $Op$. Con $n$ bit di selettore si possono selezionare $2^n$ operazioni diverse.`,
                    `**ALU a 4 bit**`,
                    `![ALU 4-bit](/FIRST-YEAR-IMAGES/alu-4bit.png)`,
                    `*Figura 3.10: ALU a 4-bit ottenuta combinando quattro ALU ad 1 bit in cascata.*`,
                    `Le quattro unità sono collegate in cascata, con $C_{out}$ di una collegato a $C_{in}$ della successiva. Lo stesso valore di $Op$ viene trasmesso a tutte le unità.`
                ]
            },
            {
                title: "3.7 L'Architettura di von Neumann",
                content: [
                    `![John von Neumann](/FIRST-YEAR-IMAGES/von-neumann.png)`,
                    `*Figura 3.11: John von Neumann (28 dicembre 1903 - 8 febbraio 1957), matematico che ha proposto nel 1945 l'architettura che porta il suo nome.*`,
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
                title: "3.8 La CPU (Central Processing Unit)",
                content: [
                    `La **CPU** è responsabile dell'esecuzione delle istruzioni, che possono essere:`,
                    `- **Aritmetico/logiche**: somma, prodotto, AND, OR, ecc.`,
                    `- **Lettura/scrittura in memoria**`,
                    `- **Controllo di flusso**: indirizzano verso sequenze diverse di istruzioni`,
                    `- **Input/output**: comunicazione con dispositivi esterni`,
                    `![Struttura CPU](/FIRST-YEAR-IMAGES/cpu-structure.png)`,
                    `*Figura 3.12: Struttura semplificata di una CPU con registri generali, registri speciali, ALU e unità di controllo.*`,
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
                title: "3.9 Il Ciclo Fetch-Decode-Execute",
                content: [
                    `L'unità di controllo esegue ripetutamente il **ciclo fetch-decode-execute**:`,
                    `![Ciclo Fetch-Decode-Execute](/FIRST-YEAR-IMAGES/fetch-decode-execute.png)`,
                    `*Figura 3.13: Il ciclo fetch-decode-execute eseguito continuamente dalla CPU.*`,
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
                title: "3.10 La Memoria RAM",
                content: [
                    `La **RAM (Random Access Memory)** è una memoria volatile organizzata come una sequenza di byte.`,
                    `![Struttura RAM](/FIRST-YEAR-IMAGES/ram-structure.png)`,
                    `*Figura 3.14: Struttura logica della RAM. Ogni 4 byte consecutivi formano una word.*`,
                    `**Unità di misura**`,
                    `$$\\begin{array}{|l|c|l|c|} \\hline \\text{Potenze di 1000} & & \\text{Potenze di 1024} & \\\\ \\hline 1 \\text{ kilobyte (kB)} & 10^3 \\text{B} & 1 \\text{ kibibyte (kiB)} & 2^{10} \\text{B} \\\\ 1 \\text{ megabyte (MB)} & 10^6 \\text{B} & 1 \\text{ mebibyte (MiB)} & 2^{20} \\text{B} \\\\ 1 \\text{ gigabyte (GB)} & 10^9 \\text{B} & 1 \\text{ gibibyte (GiB)} & 2^{30} \\text{B} \\\\ 1 \\text{ terabyte (TB)} & 10^{12} \\text{B} & 1 \\text{ tebibyte (TiB)} & 2^{40} \\text{B} \\\\ \\hline \\end{array}$$`,
                    `**Indirizzamento**`,
                    `Ogni byte è individuato dal proprio **indirizzo** (da $0$ a $N-1$ per $N$ byte). L'ampiezza del bus di indirizzi determina la quantità massima di RAM indirizzabile:`,
                    `- Bus 16 bit: max $2^{16} = 65536$ byte`,
                    `- Bus 32 bit: max $2^{32} \\approx 4$ GiB`,
                    `- Bus 64 bit: max $2^{64} \\approx 16$ EiB`,
                    `![Moduli RAM](/FIRST-YEAR-IMAGES/ram-modules.png)`,
                    `*Figura 3.15: Moduli di memoria RAM di tipo Synchronous Dynamic RAM (SDRAM).*`,
                    `La caratteristica "random" della RAM indica che si può accedere direttamente a qualunque indirizzo senza scorrere i precedenti (a differenza delle memorie sequenziali come i nastri magnetici).`
                ]
            },
            {
                title: "3.11 Esercizi sull'Architettura",
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
    // Lezione 4: Algoritmi
    // ============================================================
    {
        id: "algoritmi",
        title: "Lezione 4: Algoritmi",
        subsections: [
            {
                title: "4.1 Introduzione agli Algoritmi",
                content: [
                    `![al-Khwārizmī](/FIRST-YEAR-IMAGES/al-khwarizmi.png)`,
                    `*Figura 4.1: Francobollo emesso in Unione Sovietica per commemorare al-Khwārizmī (c. 780 - c. 850), matematico persiano da cui deriva il termine "algoritmo".*`,
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
                title: "4.2 Proprietà degli Algoritmi",
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
                title: "4.3 Concetti Fondamentali",
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
                title: "4.4 Diagrammi di Flusso",
                content: [
                    `I **diagrammi di flusso** (flowchart) sono una notazione grafica in cui vari tipi di poligoni rappresentano i passi dell'algoritmo, e le frecce indicano l'ordine di esecuzione.`,
                    `![Diagramma di Flusso - Euclide](/FIRST-YEAR-IMAGES/euclid-flowchart.png)`,
                    `*Figura 4.2: Diagramma di flusso dell'algoritmo di Euclide per il calcolo del MCD.*`,
                    `**Elementi dei diagrammi di flusso**:`,
                    `- **Nodo ovale**: Inizio/Fine dell'algoritmo`,
                    `- **Nodo rettangolare**: Istruzioni da eseguire (es. $n \\leftarrow n - m$)`,
                    `- **Nodo decisionale (rombo)**: Espressione booleana, con frecce V (vero) e F (falso)`,
                    `- **Nodo parallelogramma**: Istruzioni di input/output`,
                    `![Programma Buran e DRAKON](/FIRST-YEAR-IMAGES/buran-drakon.png)`,
                    `*Figura 4.3: Il programma Buran e il linguaggio visuale DRAKON basato su diagrammi di flusso.*`,
                    `**Vantaggi**: Facilmente interpretabili anche da non specialisti.`,
                    `**Svantaggi**: Algoritmi complessi richiedono molto spazio; possono avere struttura arbitraria e difficile da comprendere.`
                ]
            },
            {
                title: "4.5 Pseudocodice e Programmazione Strutturata",
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
                    `![Costrutti Programmazione Strutturata](/FIRST-YEAR-IMAGES/structured-programming.png)`,
                    `*Figura 4.4: Costrutti principali della programmazione strutturata e diagrammi di flusso corrispondenti.*`,
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
                title: "4.6 Logica di Floyd-Hoare",
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
                title: "4.7 Regole per Condizionali e Cicli",
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
                title: "4.8 Esempi di Dimostrazioni di Correttezza",
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
                title: "4.9 Esercizi sugli Algoritmi",
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
    // Lezione 5: Linguaggi di Programmazione
    // ============================================================
    {
        id: "linguaggi-programmazione",
        title: "Lezione 5: Linguaggi di Programmazione",
        subsections: [
            {
                title: "5.1 Interpreti e Compilatori",
                content: [
                    `![Pannello PDP-8/E](/FIRST-YEAR-IMAGES/pdp8-panel.png)`,
                    `*Figura 5.1: Pannello di controllo del calcolatore PDP-8/E prodotto dalla Digital Equipment Corporation.*`,
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
                title: "5.2 Linguaggi di Basso e Alto Livello",
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
                title: "5.3 Esempio di Compilazione",
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
                title: "5.4 Paradigmi di Programmazione",
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
                title: "5.5 Grammatiche BNF",
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
                title: "5.6 Alberi di Derivazione",
                content: [
                    `**Esempio: Grammatica per numeri**`,
                    `\`\`\`
⟨Num⟩ ::= ⟨Cifra⟩ | ⟨Cifra⟩ ⟨Num⟩
⟨Cifra⟩ ::= 0 | 1 | ... | 9
\`\`\``,
                    `Le frasi valide sono tutte le sequenze non vuote di cifre.`,
                    `![Albero di derivazione 047](/FIRST-YEAR-IMAGES/derivation-047.png)`,
                    `*Figura 5.2: Esempio di derivazione della parola 047.*`,
                    `**Processo di derivazione per 047**:`,
                    `$$\\langle Num \\rangle \\to \\langle Cifra \\rangle \\langle Num \\rangle \\to 0 \\langle Num \\rangle \\to 0 \\langle Cifra \\rangle \\langle Num \\rangle \\to 04 \\langle Num \\rangle \\to 04 \\langle Cifra \\rangle \\to 047$$`,
                    `![Albero di derivazione 010](/FIRST-YEAR-IMAGES/derivation-010.png)`,
                    `*Figura 5.3: Albero di derivazione della sequenza 010.*`,
                    `La radice contiene il simbolo iniziale. Le foglie contengono simboli terminali. La frase è la sequenza delle foglie da sinistra a destra.`
                ]
            },
            {
                title: "5.7 Grammatiche Ambigue",
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
                    `![Derivazione espressione](/FIRST-YEAR-IMAGES/derivation-expr.png)`,
                    `*Figura 5.4: Derivazione di 34 × 21 + 3 con la grammatica non ambigua.*`,
                    `La struttura dell'albero rispetta l'ordine di valutazione naturale: prima il prodotto, poi la somma.`
                ]
            },
            {
                title: "5.8 Esercizi sulle Grammatiche",
                content: [
                    `![Rosa dei venti](/FIRST-YEAR-IMAGES/compass-rose.png)`,
                    `*Figura 5.5: Rosa dei venti.*`,
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
    // Lezione 6: Il Linguaggio C89 ANSI
    // ============================================================
    {
        id: "linguaggio-c",
        title: "Lezione 6: Il Linguaggio C89 ANSI",
        subsections: [
            {
                title: "6.1 Sintassi del Linguaggio",
                content: [
                    `**Introduzione allo Standard ANSI C89**`,
                    `Lo standard **ANSI del linguaggio C** è stato progettato per promuovere la portabilità dei programmi C fra diversi sistemi informatici. La norma copre tre aree principali:`,
                    `- L'ambiente in cui il programma compila ed esegue`,
                    `- La semantica e la sintassi del linguaggio`,
                    `- Il contenuto e la semantica delle librerie standard e dei file di intestazione`,
                    `**4.1.1 Operatori del Linguaggio C**`,
                    `**Operatore di Assegnamento "="**`,
                    `Corrisponde a: var := valore. L'assegnamento è **unidirezionale**: ciò che sta a destra viene assegnato alla variabile a sinistra. Pertanto: (A = B) ≠ (B = A).`,
                    `**Operatori Aritmetici** (il comportamento dipende dal tipo della variabile):`,
                    `- **+** Somma`,
                    `- **-** Differenza`,
                    `- ***** Prodotto`,
                    `- **/** Divisione`,
                    `- **%** Resto della divisione (modulo)`,
                    `**Operatori Logici** (seguono le tavole di verità):`,
                    `- **&&** Prodotto logico (AND)`,
                    `- **||** Somma logica (OR)`,
                    `- **!** Negazione (NOT)`,
                    `**Operatori Relazionali**:`,
                    `- **>** Maggiore stretto`,
                    `- **>=** Maggiore o uguale`,
                    `- **<** Minore stretto`,
                    `- **<=** Minore o uguale`,
                    `- **==** Confronto di uguaglianza (diverso da "=" che è assegnamento)`,
                    `- **!=** Diverso`,
                    `**Leggi di De Morgan** (ripasso condizioni logiche):`,
                    `- (condiz1 || condiz2) == !(!condiz1 && !condiz2)`,
                    `- (condiz1 && condiz2) == !(!condiz1 || !condiz2)`
                ]
            },
            {
                title: "6.2 Compilazione ed Esecuzione",
                content: [
                    `**L'Estensione del File**`,
                    `L'estensione **.c** comunica al compilatore il contenuto del file e permette all'editor di riconoscere il linguaggio C ed evidenziare le parole chiave.`,
                    `**Comando di Compilazione**`,
                    `gcc -Wall -std=c89 -pedantic -o nomefile_eseguibile nomefile_sorgente.c`,
                    `**Parametri del Compilatore**:`,
                    `- **-Wall**: Segnala tutti i warning`,
                    `- **-std=c89**: Verifica la conformità allo standard ANSI C89`,
                    `- **-pedantic**: Segnala le violazioni dello standard`,
                    `- **-o**: Specifica il nome del file eseguibile`,
                    `**Tipologie di Problemi**:`,
                    `- **Error**: Non viene creato l'eseguibile (errore di sintassi). Se si dimentica il ";", l'errore viene segnalato nella riga successiva.`,
                    `- **Warning**: Condizioni anomale che potrebbero indicare problemi, ma l'eseguibile viene comunque creato.`,
                    `**Tool Utili**:`,
                    `- **indent**: Formatta e indenta correttamente i file .c`,
                    `- **diff**: Confronta due file evidenziando le differenze`,
                    `**4.2.1 Struttura del Codice**`,
                    `**1. Inclusione Librerie**`,
                    `#include <stdio.h> // Libreria standard I/O`,
                    `**2. Definizione Costanti**`,
                    `#define NOME_COSTANTE valore`,
                    `**3. Funzione Main**`,
                    `int main(int argc, char *argv[]) { ... return 0; }`,
                    `**4. Indentazione**`,
                    `Inserimento di spazi vuoti (tab = 4 spazi) all'inizio delle righe per migliorare la leggibilità. In C è una convenzione, in Python fa parte della sintassi.`,
                    `**5. Dichiarazione Variabili**`,
                    `Stabilisce lo spazio da riservare e la tipologia di dato:`,
                    `- **int**: Numeri interi`,
                    `- **float**: Numeri reali a precisione singola`,
                    `- **double**: Numeri reali a precisione doppia`,
                    `- **char**: Caratteri singoli`,
                    `**6. Input con scanf()**`,
                    `scanf("%tipo", &nome_variabile);`,
                    `**7. Output con printf()**`,
                    `printf("testo %tipo", nome_variabile);`,
                    `**Specificatori di Formato**:`,
                    `- **%d**: Interi con segno`,
                    `- **%u**: Interi senza segno`,
                    `- **%f**: Numeri reali`,
                    `- **%c**: Caratteri`,
                    `- **%s**: Stringhe`,
                    `**Caratteri Speciali**:`,
                    `- **\\n**: A capo (newline)`,
                    `- **\\t**: Tabulazione`,
                    `- **\\0**: Terminatore di stringa`,
                    `- **\\\\**: Backslash`,
                    `- **\\"**: Virgolette doppie`
                ]
            },
            {
                title: "6.3 Funzioni e Sottoprogrammi",
                content: [
                    `**4.3.1 Concetto di Sottoprogramma**`,
                    `I **sottoprogrammi** sono composti da funzioni e sottoprocedure. Il loro ruolo è scomporre un problema in piccoli task, ciascuno gestito da un singolo sottoprogramma.`,
                    `**Principi Fondamentali**:`,
                    `- Un sottoprogramma **calcola ed elabora**, non visualizza direttamente`,
                    `- Un sottoprogramma **riceve informazioni dal main**, non chiede direttamente all'utente`,
                    `- Può restituire al massimo **1 valore** tramite return (oppure 0 se void)`,
                    `**Sintassi Base di una Funzione**`,
                    `tipo_funzione nome_funzione(argomenti) {`,
                    `    codice_sottoprogramma;`,
                    `    return dato_restituito;`,
                    `}`,
                    `**Tipi di Funzione**:`,
                    `- **int**: Restituisce un intero`,
                    `- **float**: Restituisce un numero reale`,
                    `- **char**: Restituisce un carattere`,
                    `- **void**: Non restituisce nulla`,
                    `**Convenzione sulla Disposizione del Codice**:`,
                    `1. #include <librerie>`,
                    `2. #define COSTANTI`,
                    `3. typedef definizioni di tipo`,
                    `4. Prototipi delle funzioni`,
                    `5. Funzione main()`,
                    `6. Implementazione delle funzioni`,
                    `**Scope delle Variabili**`,
                    `Le variabili in C hanno uno **scope**: sono definite solo all'interno della funzione in cui sono dichiarate. Le variabili dichiarate nel main sono accessibili solo nel main.`,
                    `**4.3.2 Puntatori**`,
                    `Con la sintassi **&nome_variabile** si ottiene l'indirizzo di memoria della variabile.`,
                    `**Tipi di Puntatori**:`,
                    `- **int*** : Puntatore a intero`,
                    `- **float*** : Puntatore a float`,
                    `- **char*** : Puntatore a carattere`,
                    `**Operatori sui Puntatori**:`,
                    `- **&**: Restituisce l'indirizzo di una variabile`,
                    `- ** * **: Restituisce il valore all'indirizzo specificato (dereferenziazione)`,
                    `**Esempio di Funzione con Puntatori** (per restituire più valori):`,
                    `void conta_voc_cons(char s[], int *n_vocali, int *n_consonanti) {`,
                    `    // elaborazione...`,
                    `    *n_vocali = valore1;`,
                    `    *n_consonanti = valore2;`,
                    `}`,
                    `// Chiamata: conta_voc_cons(stringa, &num_voc, &num_cons);`,
                    `**Passaggio Parametri alle Funzioni**:`,
                    `- **Array**: function(int v[], int dim) oppure function(int *v, int dim)`,
                    `- **Matrice**: function(int m[][NCOL], int nr, int nc)`,
                    `- **Struttura**: function(tipo_struct *s)`,
                    `**4.3.3 Acquisizione da Riga di Comando**`,
                    `int main(int argc, char *argv[])`,
                    `- **argc**: Numero di argomenti passati`,
                    `- **argv[]**: Array di stringhe contenente gli argomenti`,
                    `- **argv[0]**: Nome del programma`,
                    `- **argv[1], argv[2], ...**: Argomenti successivi`,
                    `**Funzioni di Conversione**:`,
                    `- **atoi()**: Converte stringa in intero`,
                    `- **atof()**: Converte stringa in float`,
                    `**4.3.4 Contatori e Operatori Abbreviati**`,
                    `**Operatori di Incremento/Decremento**:`,
                    `- **num++**: Equivale a num = num + 1`,
                    `- **num--**: Equivale a num = num - 1`,
                    `**Operatori Composti**:`,
                    `- **tot += cont**: Equivale a tot = tot + cont`,
                    `- **tot -= cont**: Equivale a tot = tot - cont`,
                    `- **ris *= val**: Equivale a ris = ris * val`,
                    `- **ris /= val**: Equivale a ris = ris / val`,
                    `**4.3.5 Casting**`,
                    `L'operazione di **casting** converte temporaneamente il tipo di una variabile:`,
                    `(tipo_destinazione) nome_variabile`,
                    `Il casting ha **priorità maggiore** rispetto agli operatori aritmetici:`,
                    `- avg = (float)tot / num --> Prima converte tot, poi divide`,
                    `- avg = (float)(tot / num) --> Prima divide, poi converte`
                ]
            },
            {
                title: "6.4 Costrutti di Controllo in C",
                content: [
                    `**4.4.1 Costrutto if**`,
                    `**Sintassi Base**:`,
                    `if (espressione) istruzione;`,
                    `**Con più istruzioni** (parentesi graffe obbligatorie):`,
                    `if (espressione) {`,
                    `    istruzione1;`,
                    `    istruzione2;`,
                    `}`,
                    `**if-else**:`,
                    `if (condizione)`,
                    `    istruzione_vera;`,
                    `else`,
                    `    istruzione_falsa;`,
                    `**if-else annidato**:`,
                    `if (cond1) istr1;`,
                    `else if (cond2) istr2;`,
                    `else if (cond3) istr3;`,
                    `else istr_default;`,
                    `**Nota Importante**: L'else è legato all'if precedente che non ha già un else associato.`,
                    `**Condizioni Equivalenti**:`,
                    `- if(val == 0) equivale a if(!val)`,
                    `- if(val != 0) equivale a if(val)`,
                    `- Usare if(5 == val) per evitare errori di assegnamento accidentale`,
                    `**4.4.2 Costrutto switch**`,
                    `Selezione basata sul valore di una variabile intera o carattere:`,
                    `switch(variabile) {`,
                    `    case valore1: istruzione1; break;`,
                    `    case valore2: istruzione2; break;`,
                    `    default: istruzione_default;`,
                    `}`,
                    `**Importante**: Il **break** è necessario per uscire dallo switch, altrimenti l'esecuzione prosegue nei case successivi.`,
                    `**4.4.3 Ciclo while e do-while**`,
                    `**while** (condizione in testa):`,
                    `while (espressione) {`,
                    `    istruzioni;`,
                    `}`,
                    `La condizione viene verificata **prima** di eseguire le istruzioni.`,
                    `**do-while** (condizione in coda):`,
                    `do {`,
                    `    istruzioni;`,
                    `} while (espressione);`,
                    `Le istruzioni vengono eseguite **almeno una volta**, poi si verifica la condizione.`,
                    `**Uso Tipico di do-while**: Validazione input dell'utente.`,
                    `**4.4.4 Costrutto for**`,
                    `Ciclo a condizione iniziale, ideale per iterazioni a conteggio:`,
                    `for (inizializzazione; condizione; incremento) {`,
                    `    istruzioni;`,
                    `}`,
                    `**Esempio**:`,
                    `for (i = 0; i < N; i++) {`,
                    `    printf("%d", array[i]);`,
                    `}`,
                    `**Note sul for**:`,
                    `- È equivalente a un while con contatore`,
                    `- Non dichiarare variabili locali nel for (usare variabili globali)`,
                    `- Si possono usare più inizializzazioni e condizioni: for(i=0, j=0; i<N && j<M; i++, j--)`,
                    `**4.4.5 Ricorsione**`,
                    `Metodo in cui una funzione richiama **se stessa**:`,
                    `**Ricorsione Diretta**:`,
                    `int fattoriale(int n) {`,
                    `    if (n <= 1) return 1;`,
                    `    return n * fattoriale(n - 1);`,
                    `}`,
                    `**Ricorsione Indiretta**: La funzione A chiama B, che chiama A.`,
                    `**Requisiti per la Ricorsione**:`,
                    `- Caso base che interrompe la ricorsione`,
                    `- Chiamata ricorsiva con parametro modificato verso il caso base`
                ]
            },
            {
                title: "6.5 Strutture Dati",
                content: [
                    `**4.5.1 Array Monodimensionali (Vettori)**`,
                    `Struttura dati che permette di memorizzare più valori **omogenei** con un unico nome.`,
                    `**Dichiarazione**:`,
                    `#define DIM 50`,
                    `int numeri[DIM];`,
                    `float prezzi[30];`,
                    `**Caratteristiche**:`,
                    `- L'indice parte da **0**: array[0] è il primo elemento`,
                    `- L'ultimo elemento è array[DIM-1]`,
                    `- La dimensione deve essere nota a tempo di compilazione (nello standard ANSI C89)`,
                    `**Esempio di Popolazione**:`,
                    `for (i = 0; i < DIM; i++) {`,
                    `    scanf("%d", &numeri[i]);`,
                    `}`,
                    `**4.5.2 Array Multidimensionali (Matrici)**`,
                    `Struttura a più dimensioni (es: tabelle, immagini).`,
                    `**Dichiarazione**:`,
                    `int matrice[N_RIGHE][N_COLONNE];`,
                    `**Accesso**: matrice[i][j] dove i = riga, j = colonna.`,
                    `**Linearizzazione della Memoria**: La memoria è monodimensionale; le matrici vengono memorizzate riga per riga (row-major order).`,
                    `**4.5.3 Strutture (struct)**`,
                    `Permettono di raggruppare dati di **tipi diversi** in un'unica entità.`,
                    `**Sintassi**:`,
                    `typedef struct {`,
                    `    int giorno;`,
                    `    int mese;`,
                    `    int anno;`,
                    `} data_t;`,
                    `**Uso**:`,
                    `data_t nascita;`,
                    `nascita.giorno = 15;`,
                    `nascita.mese = 3;`,
                    `scanf("%d", &nascita.anno);`,
                    `**Accesso con Puntatori**:`,
                    `- (*ptr).campo equivale a ptr->campo`,
                    `**4.5.4 Stringhe**`,
                    `Array di caratteri terminato dal carattere **'\\0'** (terminatore nullo).`,
                    `**Dichiarazione**:`,
                    `#define LMAX 100`,
                    `char stringa[LMAX + 1]; // +1 per il terminatore`,
                    `**Acquisizione**:`,
                    `- scanf("%s", stringa); // Si ferma allo spazio`,
                    `- gets(stringa); // Legge l'intera riga (inclusi spazi)`,
                    `**Funzioni della Libreria string.h**:`,
                    `- **strlen(s)**: Restituisce la lunghezza della stringa`,
                    `- **strcmp(s1, s2)**: Confronta due stringhe (0 se uguali)`,
                    `- **strcpy(dest, src)**: Copia src in dest`,
                    `**4.5.5 Allocazione Dinamica**`,
                    `Permette di allocare memoria a runtime con la libreria **<stdlib.h>**.`,
                    `**malloc()** (Memory Allocation):`,
                    `int *v = (int*)malloc(n * sizeof(int));`,
                    `**Verifica dell'Allocazione**:`,
                    `if (v != NULL) {`,
                    `    // utilizzo della memoria`,
                    `    free(v); // liberazione della memoria`,
                    `}`,
                    `**free()**: Libera la memoria allocata dinamicamente. **Obbligatorio** quando la memoria non serve più.`,
                    `**4.5.6 Liste Concatenate (Linked List)**`,
                    `Struttura dati dinamica per memorizzare elementi senza conoscere a priori il numero.`,
                    `**Struttura del Nodo**:`,
                    `typedef struct nodo_s {`,
                    `    int valore;`,
                    `    struct nodo_s *next;`,
                    `} nodo_t;`,
                    `**Operazioni Fondamentali**:`,
                    `- **push()**: Inserimento in testa`,
                    `- **append()**: Inserimento in coda`,
                    `- **find()**: Ricerca di un valore`,
                    `- **delete()**: Eliminazione di un elemento`,
                    `- **list_length()**: Calcolo della lunghezza`,
                    `**Scorrimento della Lista**:`,
                    `for (nodo_t *p = head; p != NULL; p = p->next) {`,
                    `    printf("%d ", p->valore);`,
                    `}`,
                    `**4.5.7 File**`,
                    `Il carattere **EOF** (End Of File) indica la fine del file.`,
                    `**Apertura**:`,
                    `FILE *fp = fopen("nome_file", "modalità");`,
                    `// "r" = lettura, "w" = scrittura, "rb" = lettura binaria`,
                    `**Verifica Apertura**:`,
                    `if (fp != NULL) { ... fclose(fp); }`,
                    `**Lettura/Scrittura**:`,
                    `- **fscanf(fp, "%d", &var)**: Lettura formattata`,
                    `- **fprintf(fp, "%d", var)**: Scrittura formattata`,
                    `- **fgets(str, n, fp)**: Lettura di una riga`,
                    `- **feof(fp)**: Restituisce vero se fine file`,
                    `**File Binari**:`,
                    `- **fread(ptr, size, count, fp)**: Lettura binaria`,
                    `- **fwrite(ptr, size, count, fp)**: Scrittura binaria`,
                    `**4.5.8 Variabili Globali**`,
                    `Variabili dichiarate **fuori da tutte le funzioni**, visibili in tutto il programma.`,
                    `Vengono dichiarate dopo #define e typedef, ma prima del main.`
                ]
            },
            {
                title: "6.6 Algoritmi non immediati",
                content: [
                    `**Rotazione di una Matrice**`,
                    `Per ruotare una matrice quadrata in senso orario:`,
                    `\`\`\`c
/* inserire dimensione array bidimensionale quadrato di dim_max(M)=10
crea e visulaizza matrice ruotata in senso orario*/
#include <stdio.h>
#define MAX 10
int main(int argc, char*argv[]){
    int dim, i, j, mat[MAX][MAX], mat_r[MAX][MAX];
    do scanf("%d",&dim); while (!(dim >= 2 && dim <= 10));
    for(i=0; i<dim; i++){
        for(j=0; j<dim; j++) scanf("%d",&mat[i][j]);
    }
    for(i=0; i<dim; i++){
        for(j=0; j<dim; j++)
            mat_r[i][j] = mat[dim-j-1][i];
    }
    printf("\\n");
    for(i=0; i<dim; i++){
        for(j=0; j<dim; j++) printf("%d ", mat_r[i][j]);
        printf("\\n");
    }
    printf("\\n");
    return 0;
}
\`\`\``,
                    `**Ricerca di elemento di un vettore in un altro vettore**`,
                    `\`\`\`c
/* programma che conta vocali, utente inserisce solo carartteri minuscoli*/
#include <stdio.h>
#include <string.h> 
#define MAX 100
#define INIZIO 'a'
#define VOC 5
#define FINE 'z'
int main(int argc, char *argv[]){
    char frase[MAX+1], set[VOC+1];
    int i, j, num, trovato;
    gets(frase);
    num = 0;
    for(i=0; frase[i]!='\\0'; i++){
        trovato = 0;
        for(j=0; set[j]!='\\0' && trovato==0; j++)
            if(frase[i]==set[j]) trovato = 1;
        num += trovato;
    }
    printf("vocali: %d\\n", num);
    return 0;
}
\`\`\``
                ]
            }
        ]
    },
    {
        id: "esercitazioni",
        title: "Lezione 7: Esercitazioni",
        subsections: [
            {
                title: "7.1 Esercitazione 7.1 --> Esercizi di Approfondimento",
                content: [
                    `**Esercizio 1 - Padding**`,
                    `Si vuole rappresentare a video un valore naturale \`num\` utilizzando un numero a scelta di cifre \`k\` inserendo \`0\` nelle posizioni più significative.`,
                    `\`\`\`c
/* ## Esercizio 1 - Padding */
#include <stdio.h>
#define BASE 10
#define CAR 0
int main(int argc, char *argv[]){
    int numi, numf, cifre, i;
    do scanf("%d",&numi); while(numi<=0);
    do scanf("%d",&cifre); while(cifre<=0);
    numf = numi;
    i = 0;
    while(numf>0){
        i++;
        numf /= BASE;
    }
    cifre -= i;
    for(i=0; i<cifre; i++) printf("%d", CAR);
    printf("%d\\n", numi);
    return 0;
}
\`\`\``,
                    `**Esercizio 2 - Piramidi di Super Mario**`,
                    `Disegnare una doppia piramide di caratteri '#' con spazio centrale di 2 caratteri.`,
                    `\`\`\`c
/* ## Esercizio 2 - Super Mario */
#include <stdio.h>
#define MAX 16
#define MIN 1
#define ARIA_CENTRO 2
#define BLOCCHI '#'
#define ARIA ' '
int main (int argc, char *argv[]){
    int piani, i, j, nAria, nBlocchi;
    do scanf("%d",&piani); while (piani <MIN || piani >MAX);
    for (i = 1; i <= piani; i++){
        nAria = piani - i;
        nBlocchi = piani - nAria;
        for (j = 0; j <nAria; j++) printf("%c", ARIA);
        for (j = 0; j <nBlocchi; j++) printf("%c", BLOCCHI);
        for (j = 0; j <ARIA_CENTRO; j++) printf("%c", ARIA);
        for (j = 0; j <nBlocchi; j++) printf("%c", BLOCCHI);
        printf("\\n");
    }
    return 0;
}
\`\`\``,
                    `**Esercizio 3 - Troncabile Primo a Destra**`,
                    `Un numero si dice troncabile primo a destra se il numero stesso e tutti i numeri che si ottengono eliminando una alla volta la cifra meno significativa sono numeri primi.`,
                    `\`\`\`c
/* ## Esercizio 3 - Troncabile primo a destra */
#include <stdio.h>
#define BASE 10
int primo(int val){
    int i, ris, meta;
    if(val>0){
        ris = 1;
        if(val%2 == 0) ris = 0;
        else{
            meta = val/2;
            for(i=3; i<meta && ris != 0; i += 2)
                if(val%i== 0) ris = 0;
        }
    } else ris = -1;
    return ris;
}
int main(int argc, char*argv[]){
    int num, tpd;
    do scanf("%d",&num); while(num<=0);
    tpd = 1;
    num /= BASE;
    while(num>0 && tpd==1){
        if(primo(num) != 1) tpd = 0;
        num /= BASE;
    }
    printf("%d\\n", tpd);
    return 0;
}
\`\`\``,
                    `**Esercizio 4 - Triangolo di Tartaglia**`,
                    `Generare il triangolo di Tartaglia di dimensione chiesta all'utente.`,
                    `\`\`\`c
/* ## Esercizio 4 -- Tartaglia */
#include <stdio.h>
#define MAX 10
int main(int argc, char *argv[]){
    int i, j, dim, trng[MAX][MAX];
    do scanf("%d",&dim); while(dim<=0);
    for(i=0; i<dim; i++){
        for(j=0; j<=i; j++){
            if(j==0 || j==i) trng[i][j]=1;
            else trng[i][j]=trng[i-1][j-1]+trng[i-1][j];
        }
    }
    for(i=0; i<dim; i++){
        for(j=0; j<=i; j++) printf("%d ", trng[i][j]);
        printf("\\n");
    }
    return 0;
}
\`\`\``,
                    `**Esercizio 5 - Rotazione Stringa**`,
                    `Crea una nuova stringa che contiene la rotazione verso destra di una stringa input di n posizioni.`,
                    `\`\`\`c
/* ## Esercizio 5 -- Rotazione stringa */
#include <stdio.h>
#include <string.h>
#define LEN 50
int main (int argc, char *argv[]){
    char frase[LEN + 1], reverse[LEN + 1];
    int i, len, ruota, j;
    gets(frase);
    scanf("%d",&ruota);
    len = strlen(frase);
    for (i = 0; i <len; i++){
        j = i - ruota;
        if(j<0) j = i - ruota + len;
        reverse[i] = frase[j];
    }
    reverse[len] = '\\0';
    printf("%s\\n", reverse);
    return 0;
}
\`\`\``,
                    `**Esercizio 6 - Trading Ottimale**`,
                    `Individuare il giorno in cui acquistare e quello in cui vendere per massimizzare il guadagno.`,
                    `\`\`\`c
/* ## Esercizio 6 - Trading Ottimale */
#include <stdio.h>
#define GIORNI 20
#define OPZ_1 "perdita"
#define OPZ_2 "capitale insufficente"
int main (int argc, char *argv[]){
    int cambi[GIORNI], iTemp, guadagno, guadagnoTemp, capI, preI, iStart, iFinish, i, found;
    scanf("%d",&preI);
    for (i = 0; i <GIORNI; i++) scanf("%d",&cambi[i]);
    scanf("%d",&capI);
    found = 0;
    for (i = 0; i <GIORNI && !found; i++){
        if (preI <= capI){
            iStart = i; iFinish = i;
            guadagno = cambi[i]; guadagnoTemp = cambi[i];
            iTemp = i; found = 1;
        }
        preI += cambi[i];
    }
    for (; i <GIORNI; i++){
        guadagnoTemp += cambi[i];
        if (cambi[i] > guadagnoTemp && preI <= capI){
            guadagnoTemp = cambi[i]; iTemp = i;
        }
        if (guadagnoTemp > guadagno){
            guadagno = guadagnoTemp; iStart = iTemp; iFinish = i;
        }
        preI += cambi[i];
    }
    if (found)
        if (guadagno > 0) printf("%d %d", iStart, iFinish);
        else printf(OPZ_1);
    else printf(OPZ_2);
    printf("\\n");
    return 0;
}
\`\`\``
                ]
            },
            {
                title: "7.2 Esercitazione 7.2 --> Esercizi del Laboratorio",
                content: [
                    `**27/09/2022 - Operazioni Base**`,
                    `**Esercizio 1: Calcolatrice Polacca**`,
                    `\`\`\`c
#include <stdio.h>
#define INV 999999
int main(int argc,char*argv[]){
    int a,b; float ris; char operatore;
    scanf("%c\\n",&operatore);
    switch(operatore){
        case '+': ris=a+b; break;
        case '-': ris=a-b; break;
        case '*': ris=a*b; break;
        case '/': ris=a/b; break;
        default: ris=INV;
    }
    printf("%f",ris);
    return 0;
}
\`\`\``,
                    `**Esercizio 2: Data in Anni**`,
                    `\`\`\`c
#define M_A 12
#define G_A 365
#include <stdio.h>
int main(int argc, char*argv[]){
    int ggp, mmp, aap, gga, mma, aaa, ris;
    float p1,p2;
    scanf("%d\\t %d\\t %d\\n %d\\t %d\\t %d\\n",&ggp, &mmp, &aap, &gga, &mma, &aaa);
    p1=ggp/G_A+mmp/M_A+aap;
    p2=gga/G_A+mma/M_A+aaa;
    ris=p2-p1;
    printf("%d\\n",ris);
    return 0;
}
\`\`\``,
                    `**Esercizio 3: Ordinamento 3 Numeri**`,
                    `\`\`\`c
#include <stdio.h>
int main(int argc,char*argv[]){
    int a, b, c, var;
    scanf("%d %d %d",&a, &b, &c);
    if(a<b){ var=a; a=b; b=var; }
    if(a<c){ var=a; a=c; c=var; }
    if(b<c){ var=b; b=c; c=var; }
    printf("%d %d %d\\n",c,b,a);
    return 0;
}
\`\`\``,
                    `**Esercizio 4: Pari o Dispari**`,
                    `\`\`\`c
#include <stdio.h>
#define PARI 0
#define DISPARI 1
int main(int argc, char*argv[]){
    int num, ris;
    scanf("%d",&num);
    if(num%2==0) ris=PARI; else ris=DISPARI;
    printf("%d\\n",ris);
    return 0;
}
\`\`\``,
                    `**Esercizio 5: Profitto**`,
                    `\`\`\`c
#include <stdio.h>
#define POS '+'
#define NEG '-'
#define PAR 'x'
int main(int argc,char*argv[]){
    float costo, vendita, profitto;
    char out;
    scanf("%f\\n%f",&costo,&vendita);
    profitto=vendita-costo;
    if(profitto>0) out=POS;
    else if(profitto<0) out=NEG;
    else out=PAR;
    if(profitto<0) profitto=-profitto;
    printf("%c\\n%f\\n",out,profitto);
    return 0;
}
\`\`\``,
                    `**03/10/2022 - Cicli**`,
                    `**Esercizio 1: Somma Cifre**`,
                    `\`\`\`c
#include <stdio.h>
#define BASE 10
int main(int argc,char*argv[]){
    int num, sum;
    scanf("%d",&num);
    if(num<0) num = -num;
    sum = 0;
    while(num!=0){
        sum += num%BASE;
        num /= BASE;
    }
    printf("%d\\n",sum);
    return 0;
}
\`\`\``,
                    `**Esercizio 4: Palindromo**`,
                    `\`\`\`c
#include <stdio.h>
#define PAL 's'
#define NO_PAL 'n'
#define BASE 10
int main(int argc,char*argv[]){
    int num, ris, supp, cifra, inverso;
    do{ scanf("%d",&num); }while(num<=0);
    supp = num; inverso = 0;
    if(supp%BASE == 0) ris = NO_PAL;
    else {
         while(supp>0){
            inverso = inverso*BASE + supp%BASE;
            supp /= BASE;
        }
        if(inverso==num) ris = PAL; else ris = NO_PAL;
    }
    printf("%c\\n",ris);
    return 0;
}
\`\`\``,
                    `**Esercizio 6: MCD e MCM**`,
                    `\`\`\`c
#include <stdio.h>
int main (int argc, char*argv[]){
    int num1, num2, tmp1, tmp2, resto, mcd, mcm;
    do scanf("%d",&num1); while (num1<=0);
    do scanf("%d",&num2); while (num2<=0);
    if (num1 >num2){ tmp1 =num1; tmp2 =num2; }
    else { tmp1 =num2; tmp2 =num1; }
    resto =tmp1 %tmp2;
    while (resto != 0){
        tmp1 =tmp2; tmp2 =resto; resto =tmp1 %tmp2;
    }
    mcd =tmp2;
    mcm =num1 *num2 /mcd;
    printf("%d\\t%d\\n", mcd, mcm);
    return 0;
}
\`\`\``,
                    `**13/10/2022 - Array e Stringhe**`,
                    `- Eliminazione del valore più frequente`,
                    `- Calcolo del fattoriale`,
                    `- Verifica assenza duplicati`,
                    `- Massimizzazione prodotti acquistabili`,
                    `- Verifica diagonale crescente`,
                    `- Verifica matrice simmetrica`,
                    `- Compressione stringa (run-length encoding)`,
                    `- Individuazione sequenze di cifre`,
                    `**20/10/2022 - Funzioni e Matrici**`,
                    `- Somme minime di righe e colonne`,
                    `- Validazione password`,
                    `- Acquisizione array con terminatore`,
                    `- Conversione maiuscole/minuscole`,
                    `- Array di somme cumulative`,
                    `- Conteggio coppie di elementi uguali`
                ]
            }
        ]
    }
];

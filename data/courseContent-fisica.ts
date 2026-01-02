import { MainSection } from '../types';

export const courseContentFisica: MainSection[] = [
    {
        id: "grandezze-misure",
        title: "Lezione 0: Grandezze Fisiche e Misure",
        subsections: [
            {
                title: "0.0 ‐‐> Grandezze nel Sistema Internazionale (SI)",
                content: [
                    `**Grandezze fondamentali nel Sistema Internazionale**`,
                    `Nel **Sistema Internazionale (SI)** sono definite **sette grandezze fondamentali**, con relative unità di misura, a partire dalle quali si possono ricavare tutte le altre grandezze fisiche.`,
                    `Ognuna di queste grandezze è definita in modo **univoco e preciso**. Ad esempio, un **secondo** è definito come la quantità di tempo che un atomo di **Cesio-133 (Cs¹³³)** impiega per oscillare **9.192.631.770 volte**.`,
                    `**Le sette grandezze fondamentali del SI:**`,
                    {
                        headers: ["Grandezza", "Unità di Misura", "Simbolo"],
                        rows: [
                            ["Lunghezza", "metro", "m"],
                            ["Massa", "kilogrammo", "kg"],
                            ["Tempo", "secondo", "s"],
                            ["Corrente elettrica", "ampere", "A"],
                            ["Temperatura termodinamica", "kelvin", "K"],
                            ["Quantità di sostanza", "mole", "mol"],
                            ["Intensità luminosa", "candela", "cd"]
                        ]
                    },
                    `**Caratteristiche delle unità di misura SI:**`,
                    `- Ogni unità è definita in modo **riproducibile** e **universale**`,
                    `- Le definizioni sono basate su **costanti fisiche fondamentali** (dal 2019)`,
                    `- Da queste sette grandezze fondamentali si derivano tutte le altre grandezze fisiche`,
                    `**Esempi di grandezze derivate:**`,
                    `- **Velocità**: $v = \\frac{\\Delta s}{\\Delta t}$ → unità: m/s`,
                    `- **Accelerazione**: $a = \\frac{\\Delta v}{\\Delta t}$ → unità: m/s²`,
                    `- **Forza**: $F = m \\cdot a$ → unità: N (Newton) = kg·m/s²`,
                    `- **Energia**: $E = F \\cdot s$ → unità: J (Joule) = kg·m²/s²`
                ]
            },
            {
                title: "0.1 ‐‐> Cifre Significative",
                content: [
                    `**Significato delle cifre significative**`,
                    `Le **cifre significative** si utilizzano per le misure al fine di indicare la **precisione della misura stessa**.`,
                    `L'ultima cifra scritta (includendo eventuali zeri) indica che essa stessa può essere maggiore o minore di **una unità**. In altre parole, l'ultima cifra rappresenta l'incertezza della misura.`,
                    `**Esempio:**`,
                    `- Una misura di $12{,}34$ m significa che il valore reale è compreso tra $12{,}33$ m e $12{,}35$ m`,
                    `- Una misura di $12{,}340$ m (con lo zero significativo) indica una precisione maggiore`,
                    `**Operazioni sulle cifre significative**`,
                    `Quando si eseguono operazioni matematiche con misure, è importante mantenere la coerenza con la precisione dei dati di partenza.`,
                    `**1. Prodotto (e divisione)**`,
                    `Nel caso di un **prodotto** (o quoziente) tra misure, il risultato deve avere lo **stesso numero di cifre significative** del fattore che ne ha meno.`,
                    `*Esempio:*`,
                    `$$2{,}34 \\times 1{,}2 = 2{,}808 \\rightarrow 2{,}8$$`,
                    `(Il primo fattore ha 3 cifre significative, il secondo ne ha 2, quindi il risultato deve averne 2)`,
                    `**2. Somma (algebrica)**`,
                    `Nel caso di una **somma algebrica** (somma o sottrazione), il risultato avrà lo **stesso numero di cifre decimali** dell'addendo che ne ha meno.`,
                    `*Esempio:*`,
                    `$$12{,}345 + 1{,}2 = 13{,}545 \\rightarrow 13{,}5$$`,
                    `(Il primo addendo ha 3 cifre decimali, il secondo ne ha 1, quindi il risultato deve averne 1)`
                ]
            }
        ]
    },
    {
        id: "vettori",
        title: "Capitolo 1: Vettori",
        subsections: [
            {
                title: "1.1 ‐‐> Grandezze scalari e vettoriali",
                content: [
                    `Tutte le grandezze per la cui definizione non concorrono altri elementi al di fuori della loro misura vengono dette **grandezze scalari**; sono esempi di grandezze scalari l'intervallo di tempo, la massa, la temperatura, ecc.`,
                    `Esistono tuttavia delle grandezze per le quali non è sufficiente una sola quantità per la loro completa caratterizzazione. Consideriamo, ad esempio, il moto rettilineo di un corpo puntiforme originariamente a riposo in un punto $A$; qualora si specificasse unicamente che al termine del moto il corpo ha percorso una lunghezza $l$, tutto ciò che si potrebbe affermare circa la posizione finale $B$ del corpo è la sua localizzazione in un punto della superficie sferica di centro $A$ e raggio $l$. Per conoscere la posizione $B$ e, di conseguenza, lo spostamento subito dal corpo, oltre all'origine $A$ del moto e la lunghezza dello spostamento, occorre sapere la direzione, ossia la retta $AB$ lungo la quale avviene il movimento ed il verso, cioè in quale dei due sensi viene percorsa la retta $AB$.`,
                    `Le grandezze come lo spostamento, per le quali è necessario precisare oltre che la loro misura, o **modulo**, anche la **direzione**, il **verso** e, in certi casi, anche l'**origine** o punto di applicazione, vengono dette **grandezze vettoriali**. Sono esempi di grandezze vettoriali la velocità, l'accelerazione, la forza, ecc.`,
                    `Una grandezza vettoriale può essere rappresentata graficamente mediante un segmento orientato $\\vec{OV}$ detto *vettore*, indicato con:`,
                    `$$\\vec{v} \\equiv \\vec{OV}$$`,
                    `![Figura 1.1: Rappresentazione grafica di un vettore come segmento orientato da O a V](/images/fisica/fig1-1-vettore.png)`,
                    `La lunghezza`,
                    `$$v = \\overline{OV} \\equiv |\\vec{v}|$$`,
                    `rispetto ad una scala prefissata, rappresenta il modulo (o intensità) del vettore; la retta su cui giace il segmento orientato $\\vec{OV}$ rappresenta la direzione del vettore, il verso è quello che va dal punto $O$ al punto $V$ e l'estremo $O$ indica l'origine del vettore o il suo punto di applicazione.`
                ]
            },
            {
                title: "1.2 ‐‐> Somma di vettori",
                content: [
                    `Dati due vettori $\\vec{a}$ e $\\vec{b}$ si definisce **somma** di essi il vettore $\\vec{s}$ costruito mediante la cosiddetta *regola del parallelogramma*: applicati i due vettori nello stesso punto $O$, si costruisce il parallelogramma avente per lati i due vettori; la diagonale uscente da $O$ rappresenta il vettore somma $\\vec{s}$:`,
                    `$$\\vec{s} = \\vec{a} + \\vec{b}$$`,
                    `![Figura 1.2: Regola del parallelogramma per la somma di due vettori](/images/fisica/fig1-2-parallelogramma.png)`,
                    `Equivalentemente, si può usare la *regola del trasporto* (o metodo punta-coda): si trasporta parallelamente a sé stesso il secondo vettore $\\vec{b}$ fino a far coincidere la sua origine con l'estremo del primo vettore $\\vec{a}$. Il vettore somma è il vettore che ha per origine l'origine di $\\vec{a}$ e per estremo l'estremo di $\\vec{b}$.`,
                    `![Figura 1.3: Regola del trasporto (punta-coda) per la somma di vettori](/images/fisica/fig1-3-punta-coda.png)`,
                    `La somma di vettori gode delle seguenti proprietà:`,
                    `- **Proprietà commutativa**: $\\vec{a} + \\vec{b} = \\vec{b} + \\vec{a}$`,
                    `- **Proprietà associativa**: $(\\vec{a} + \\vec{b}) + \\vec{c} = \\vec{a} + (\\vec{b} + \\vec{c})$`,
                    `- **Elemento neutro**: esiste un vettore nullo $\\vec{0}$ tale che $\\vec{a} + \\vec{0} = \\vec{a}$`,
                    `- **Vettore opposto**: per ogni vettore $\\vec{a}$ esiste un vettore $-\\vec{a}$ tale che $\\vec{a} + (-\\vec{a}) = \\vec{0}$`,
                    `Il **modulo** del vettore somma può essere calcolato utilizzando il *teorema di Carnot* (o del coseno):`,
                    `$$|\\vec{s}|^2 = |\\vec{a}|^2 + |\\vec{b}|^2 + 2|\\vec{a}||\\vec{b}|\\cos\\theta$$`,
                    `dove $\\theta$ è l'angolo compreso tra i due vettori.`
                ]
            },
            {
                title: "1.3 ‐‐> Differenza di vettori",
                content: [
                    `La **differenza** tra due vettori $\\vec{a}$ e $\\vec{b}$ si definisce come la somma del primo vettore con l'opposto del secondo:`,
                    `$$\\vec{d} = \\vec{a} - \\vec{b} = \\vec{a} + (-\\vec{b})$$`,
                    `![Figura 1.4: Differenza di due vettori](/images/fisica/fig1-4-differenza.png)`,
                    `Graficamente, applicati i due vettori nello stesso punto, il vettore differenza è rappresentato dal segmento che congiunge l'estremo di $\\vec{b}$ con l'estremo di $\\vec{a}$.`
                ]
            },
            {
                title: "1.4 ‐‐> Prodotto di un vettore per uno scalare",
                content: [
                    `Dato un vettore $\\vec{a}$ ed un numero reale (scalare) $\\lambda$, si definisce **prodotto** del vettore $\\vec{a}$ per lo scalare $\\lambda$ il vettore:`,
                    `$$\\vec{b} = \\lambda\\vec{a}$$`,
                    `che ha:`,
                    `- la stessa direzione di $\\vec{a}$`,
                    `- lo stesso verso di $\\vec{a}$ se $\\lambda > 0$, verso opposto se $\\lambda < 0$`,
                    `- modulo $|\\vec{b}| = |\\lambda| \\cdot |\\vec{a}|$`,
                    `![Figura 1.5: Prodotto di un vettore per uno scalare](/images/fisica/fig1-5-scalare.png)`,
                    `Il prodotto per uno scalare gode delle seguenti proprietà:`,
                    `- **Proprietà associativa**: $\\lambda(\\mu\\vec{a}) = (\\lambda\\mu)\\vec{a}$`,
                    `- **Proprietà distributiva rispetto alla somma di scalari**: $(\\lambda + \\mu)\\vec{a} = \\lambda\\vec{a} + \\mu\\vec{a}$`,
                    `- **Proprietà distributiva rispetto alla somma di vettori**: $\\lambda(\\vec{a} + \\vec{b}) = \\lambda\\vec{a} + \\lambda\\vec{b}$`
                ]
            },
            {
                title: "1.5 ‐‐> Componenti cartesiane di un vettore",
                content: [
                    `In un sistema di riferimento cartesiano ortogonale, un vettore $\\vec{v}$ può essere scomposto nelle sue **componenti** lungo gli assi coordinati.`,
                    `Siano $\\vec{i}$, $\\vec{j}$ e $\\vec{k}$ i **versori** (vettori di modulo unitario) degli assi $x$, $y$ e $z$ rispettivamente. Un qualsiasi vettore $\\vec{v}$ può essere scritto come:`,
                    `$$\\vec{v} = v_x\\vec{i} + v_y\\vec{j} + v_z\\vec{k}$$`,
                    `dove $v_x$, $v_y$ e $v_z$ sono le **componenti cartesiane** del vettore.`,
                    `![Figura 1.6: Componenti cartesiane di un vettore nel piano e nello spazio](/images/fisica/fig1-6-componenti.png)`,
                    `Il **modulo** del vettore si calcola come:`,
                    `$$|\\vec{v}| = \\sqrt{v_x^2 + v_y^2 + v_z^2}$$`,
                    `Nel piano ($z = 0$), le componenti sono legate al modulo e all'angolo $\\theta$ che il vettore forma con l'asse $x$:`,
                    `$$v_x = |\\vec{v}|\\cos\\theta$$`,
                    `$$v_y = |\\vec{v}|\\sin\\theta$$`,
                    `L'angolo $\\theta$ può essere ricavato dalle componenti:`,
                    `$$\\theta = \\arctan\\left(\\frac{v_y}{v_x}\\right)$$`
                ]
            },
            {
                title: "1.6 ‐‐> Versore",
                content: [
                    `Si chiama **versore** di un vettore $\\vec{v}$ il vettore di modulo unitario che ha la stessa direzione e lo stesso verso di $\\vec{v}$. Esso si indica con $\\hat{v}$ (o talvolta $\\vec{u}_v$) e si ottiene dividendo il vettore per il suo modulo:`,
                    `$$\\hat{v} = \\frac{\\vec{v}}{|\\vec{v}|}$$`,
                    `Il versore ha sempre modulo 1:`,
                    `$$|\\hat{v}| = 1$$`,
                    `Ogni vettore può essere scritto come il prodotto del suo modulo per il suo versore:`,
                    `$$\\vec{v} = |\\vec{v}| \\cdot \\hat{v}$$`
                ]
            },
            {
                title: "1.7 ‐‐> Prodotto scalare",
                content: [
                    `Dati due vettori $\\vec{a}$ e $\\vec{b}$, si definisce **prodotto scalare** (o prodotto interno) di $\\vec{a}$ e $\\vec{b}$ lo scalare:`,
                    `$$\\vec{a} \\cdot \\vec{b} = |\\vec{a}||\\vec{b}|\\cos\\theta$$`,
                    `dove $\\theta$ è l'angolo compreso tra i due vettori.`,
                    `![Figura 1.7: Prodotto scalare di due vettori](/images/fisica/fig1-7-prodotto-scalare.png)`,
                    `**Interpretazione geometrica**: il prodotto scalare rappresenta il prodotto del modulo di un vettore per la proiezione dell'altro vettore sulla sua direzione.`,
                    `**Proprietà del prodotto scalare:**`,
                    `- **Commutatività**: $\\vec{a} \\cdot \\vec{b} = \\vec{b} \\cdot \\vec{a}$`,
                    `- **Distributività**: $\\vec{a} \\cdot (\\vec{b} + \\vec{c}) = \\vec{a} \\cdot \\vec{b} + \\vec{a} \\cdot \\vec{c}$`,
                    `- **Associatività con scalari**: $(\\lambda\\vec{a}) \\cdot \\vec{b} = \\lambda(\\vec{a} \\cdot \\vec{b})$`,
                    `**Casi particolari:**`,
                    `- Se $\\vec{a} \\perp \\vec{b}$ (vettori perpendicolari): $\\vec{a} \\cdot \\vec{b} = 0$`,
                    `- Se $\\vec{a} \\parallel \\vec{b}$ (vettori paralleli): $\\vec{a} \\cdot \\vec{b} = \\pm|\\vec{a}||\\vec{b}|$`,
                    `- Prodotto di un vettore per sé stesso: $\\vec{a} \\cdot \\vec{a} = |\\vec{a}|^2$`,
                    `**Espressione in componenti cartesiane:**`,
                    `$$\\vec{a} \\cdot \\vec{b} = a_xb_x + a_yb_y + a_zb_z$$`,
                    `**Prodotti scalari dei versori degli assi:**`,
                    `$$\\vec{i} \\cdot \\vec{i} = \\vec{j} \\cdot \\vec{j} = \\vec{k} \\cdot \\vec{k} = 1$$`,
                    `$$\\vec{i} \\cdot \\vec{j} = \\vec{j} \\cdot \\vec{k} = \\vec{k} \\cdot \\vec{i} = 0$$`
                ]
            },
            {
                title: "1.8 ‐‐> Prodotto vettoriale",
                content: [
                    `Dati due vettori $\\vec{a}$ e $\\vec{b}$, si definisce **prodotto vettoriale** (o prodotto esterno) di $\\vec{a}$ e $\\vec{b}$ il vettore:`,
                    `$$\\vec{c} = \\vec{a} \\times \\vec{b}$$`,
                    `che ha le seguenti caratteristiche:`,
                    `- **Modulo**: $|\\vec{c}| = |\\vec{a}||\\vec{b}|\\sin\\theta$, dove $\\theta$ è l'angolo compreso tra i due vettori`,
                    `- **Direzione**: perpendicolare al piano individuato da $\\vec{a}$ e $\\vec{b}$`,
                    `- **Verso**: determinato dalla *regola della mano destra* (o della vite destrorsa)`,
                    `![Figura 1.8: Prodotto vettoriale e regola della mano destra](/images/fisica/fig1-8-prodotto-vettoriale.png)`,
                    `**Interpretazione geometrica**: il modulo del prodotto vettoriale rappresenta l'area del parallelogramma costruito sui due vettori.`,
                    `**Proprietà del prodotto vettoriale:**`,
                    `- **Anticommutatività**: $\\vec{a} \\times \\vec{b} = -\\vec{b} \\times \\vec{a}$`,
                    `- **Distributività**: $\\vec{a} \\times (\\vec{b} + \\vec{c}) = \\vec{a} \\times \\vec{b} + \\vec{a} \\times \\vec{c}$`,
                    `- **Associatività con scalari**: $(\\lambda\\vec{a}) \\times \\vec{b} = \\lambda(\\vec{a} \\times \\vec{b})$`,
                    `- **NON** è associativo: $(\\vec{a} \\times \\vec{b}) \\times \\vec{c} \\neq \\vec{a} \\times (\\vec{b} \\times \\vec{c})$`,
                    `**Casi particolari:**`,
                    `- Se $\\vec{a} \\parallel \\vec{b}$ (vettori paralleli): $\\vec{a} \\times \\vec{b} = \\vec{0}$`,
                    `- Se $\\vec{a} \\perp \\vec{b}$ (vettori perpendicolari): $|\\vec{a} \\times \\vec{b}| = |\\vec{a}||\\vec{b}|$`,
                    `- Prodotto di un vettore per sé stesso: $\\vec{a} \\times \\vec{a} = \\vec{0}$`,
                    `**Espressione in componenti cartesiane:**`,
                    `$$\\vec{a} \\times \\vec{b} = \\begin{vmatrix} \\vec{i} & \\vec{j} & \\vec{k} \\\\ a_x & a_y & a_z \\\\ b_x & b_y & b_z \\end{vmatrix}$$`,
                    `ovvero:`,
                    `$$\\vec{a} \\times \\vec{b} = (a_yb_z - a_zb_y)\\vec{i} + (a_zb_x - a_xb_z)\\vec{j} + (a_xb_y - a_yb_x)\\vec{k}$$`,
                    `**Prodotti vettoriali dei versori degli assi:**`,
                    `$$\\vec{i} \\times \\vec{j} = \\vec{k}, \\quad \\vec{j} \\times \\vec{k} = \\vec{i}, \\quad \\vec{k} \\times \\vec{i} = \\vec{j}$$`,
                    `$$\\vec{j} \\times \\vec{i} = -\\vec{k}, \\quad \\vec{k} \\times \\vec{j} = -\\vec{i}, \\quad \\vec{i} \\times \\vec{k} = -\\vec{j}$$`
                ]
            }
        ]
    },
    {
        id: "cinematica",
        title: "Capitolo 2: Cinematica",
        subsections: [
            {
                title: "2.1 ‐‐> Introduzione alla Cinematica",
                content: [
                    `La **cinematica** è la parte della meccanica che studia il moto dei corpi indipendentemente dalle cause che lo producono. Si occupa di descrivere *come* si muove un corpo, non *perché* si muove.`,
                    `Per descrivere il moto di un corpo è necessario definire un **sistema di riferimento**, costituito da:`,
                    `- Un'origine $O$`,
                    `- Un insieme di assi coordinati (tipicamente cartesiani)`,
                    `- Un orologio per misurare il tempo`,
                    `**Punto materiale**: Un corpo le cui dimensioni sono trascurabili rispetto alle dimensioni del fenomeno studiato.`
                ]
            },
            {
                title: "2.2 ‐‐> Posizione e spostamento",
                content: [
                    `La **posizione** di un punto materiale in un sistema di riferimento cartesiano è individuata dal vettore posizione $\\vec{r}$:`,
                    `$$\\vec{r} = x\\vec{i} + y\\vec{j} + z\\vec{k}$$`,
                    `![Figura 2.1: Vettore posizione nel sistema di riferimento cartesiano](/images/fisica/fig2-1-posizione.png)`,
                    `Lo **spostamento** è la variazione del vettore posizione tra due istanti di tempo $t_1$ e $t_2$:`,
                    `$$\\Delta\\vec{r} = \\vec{r}(t_2) - \\vec{r}(t_1) = \\vec{r}_2 - \\vec{r}_1$$`,
                    `In componenti:`,
                    `$$\\Delta\\vec{r} = \\Delta x\\vec{i} + \\Delta y\\vec{j} + \\Delta z\\vec{k}$$`,
                    `dove $\\Delta x = x_2 - x_1$, $\\Delta y = y_2 - y_1$, $\\Delta z = z_2 - z_1$.`,
                    `**Traiettoria**: L'insieme delle posizioni occupate successivamente dal punto materiale durante il suo moto. È una curva nello spazio.`,
                    `**Nota importante**: Lo spostamento $\\Delta\\vec{r}$ è diverso dallo spazio percorso $\\Delta s$ lungo la traiettoria. Il modulo dello spostamento è sempre minore o uguale allo spazio percorso:`,
                    `$$|\\Delta\\vec{r}| \\leq \\Delta s$$`,
                    `L'uguaglianza vale solo nel caso di moto rettilineo senza inversioni di verso.`
                ]
            },
            {
                title: "2.3 ‐‐> Velocità",
                content: [
                    `**Velocità media**`,
                    `La **velocità media** nel tempo $\\Delta t = t_2 - t_1$ è definita come:`,
                    `$$\\vec{v}_m = \\frac{\\Delta\\vec{r}}{\\Delta t} = \\frac{\\vec{r}_2 - \\vec{r}_1}{t_2 - t_1}$$`,
                    `La velocità media è un vettore che ha la stessa direzione e verso dello spostamento $\\Delta\\vec{r}$.`,
                    `**Velocità istantanea**`,
                    `La **velocità istantanea** è il limite della velocità media quando $\\Delta t$ tende a zero:`,
                    `$$\\vec{v} = \\lim_{\\Delta t \\to 0} \\frac{\\Delta\\vec{r}}{\\Delta t} = \\frac{d\\vec{r}}{dt}$$`,
                    `La velocità istantanea è la derivata del vettore posizione rispetto al tempo.`,
                    `In componenti cartesiane:`,
                    `$$\\vec{v} = \\frac{dx}{dt}\\vec{i} + \\frac{dy}{dt}\\vec{j} + \\frac{dz}{dt}\\vec{k} = v_x\\vec{i} + v_y\\vec{j} + v_z\\vec{k}$$`,
                    `dove $v_x = \\dot{x}$, $v_y = \\dot{y}$, $v_z = \\dot{z}$ (notazione di Newton per le derivate temporali).`,
                    `![Figura 2.2: Velocità istantanea come limite della velocità media](/images/fisica/fig2-2-velocita.png)`,
                    `**Il vettore velocità è sempre tangente alla traiettoria.**`,
                    `Il **modulo della velocità** (o *celerità*) è:`,
                    `$$v = |\\vec{v}| = \\sqrt{v_x^2 + v_y^2 + v_z^2}$$`
                ]
            },
            {
                title: "2.4 ‐‐> Accelerazione",
                content: [
                    `**Accelerazione media**`,
                    `L'**accelerazione media** nel tempo $\\Delta t$ è definita come:`,
                    `$$\\vec{a}_m = \\frac{\\Delta\\vec{v}}{\\Delta t} = \\frac{\\vec{v}_2 - \\vec{v}_1}{t_2 - t_1}$$`,
                    `**Accelerazione istantanea**`,
                    `L'**accelerazione istantanea** è il limite dell'accelerazione media quando $\\Delta t$ tende a zero:`,
                    `$$\\vec{a} = \\lim_{\\Delta t \\to 0} \\frac{\\Delta\\vec{v}}{\\Delta t} = \\frac{d\\vec{v}}{dt} = \\frac{d^2\\vec{r}}{dt^2}$$`,
                    `L'accelerazione è la derivata della velocità rispetto al tempo, ovvero la derivata seconda della posizione.`,
                    `In componenti cartesiane:`,
                    `$$\\vec{a} = \\frac{dv_x}{dt}\\vec{i} + \\frac{dv_y}{dt}\\vec{j} + \\frac{dv_z}{dt}\\vec{k} = a_x\\vec{i} + a_y\\vec{j} + a_z\\vec{k}$$`,
                    `dove $a_x = \\ddot{x}$, $a_y = \\ddot{y}$, $a_z = \\ddot{z}$.`,
                    `![Figura 2.3: Accelerazione come variazione della velocità](/images/fisica/fig2-3-accelerazione.png)`,
                    `**Nota**: A differenza della velocità, l'accelerazione **non è necessariamente tangente** alla traiettoria.`
                ]
            },
            {
                title: "2.5 ‐‐> Moto rettilineo uniforme",
                content: [
                    `Il **moto rettilineo uniforme (MRU)** è caratterizzato da:`,
                    `- Traiettoria rettilinea`,
                    `- Velocità costante ($\\vec{v} = \\text{costante}$)`,
                    `- Accelerazione nulla ($\\vec{a} = \\vec{0}$)`,
                    `**Legge oraria del MRU:**`,
                    `$$x(t) = x_0 + vt$$`,
                    `dove:`,
                    `- $x_0$ è la posizione iniziale (al tempo $t = 0$)`,
                    `- $v$ è la velocità (costante)`,
                    `- $t$ è il tempo`,
                    `![Figura 2.4: Grafici posizione-tempo e velocità-tempo per il MRU](/images/fisica/fig2-4-mru.png)`,
                    `Nel grafico $x(t)$, il MRU è rappresentato da una **retta** con coefficiente angolare pari alla velocità $v$.`,
                    `Nel grafico $v(t)$, il MRU è rappresentato da una **retta orizzontale**.`
                ]
            },
            {
                title: "2.6 ‐‐> Moto rettilineo uniformemente accelerato",
                content: [
                    `Il **moto rettilineo uniformemente accelerato (MRUA)** è caratterizzato da:`,
                    `- Traiettoria rettilinea`,
                    `- Accelerazione costante ($\\vec{a} = \\text{costante}$)`,
                    `**Leggi del MRUA:**`,
                    `$$v(t) = v_0 + at$$`,
                    `$$x(t) = x_0 + v_0 t + \\frac{1}{2}at^2$$`,
                    `dove:`,
                    `- $x_0$ è la posizione iniziale`,
                    `- $v_0$ è la velocità iniziale`,
                    `- $a$ è l'accelerazione (costante)`,
                    `**Equazione senza tempo:**`,
                    `Eliminando il tempo $t$ dalle due equazioni precedenti, si ottiene:`,
                    `$$v^2 = v_0^2 + 2a(x - x_0)$$`,
                    `oppure:`,
                    `$$v^2 - v_0^2 = 2a\\Delta x$$`,
                    `![Figura 2.5: Grafici posizione-tempo, velocità-tempo e accelerazione-tempo per il MRUA](/images/fisica/fig2-5-mrua.png)`,
                    `**Interpretazione grafica:**`,
                    `- Nel grafico $a(t)$: retta orizzontale`,
                    `- Nel grafico $v(t)$: retta con coefficiente angolare $a$`,
                    `- Nel grafico $x(t)$: parabola`,
                    `L'area sottesa dalla curva $v(t)$ rappresenta lo spostamento $\\Delta x$.`
                ]
            },
            {
                title: "2.7 ‐‐> Caduta libera",
                content: [
                    `La **caduta libera** è un caso particolare di MRUA in cui l'accelerazione è quella di gravità $g$.`,
                    `Scegliendo l'asse $y$ verticale, orientato verso l'alto, con origine al suolo:`,
                    `$$a = -g$$`,
                    `dove $g \\approx 9.81 \\, \\text{m/s}^2$ (al livello del mare).`,
                    `**Leggi della caduta libera:**`,
                    `$$v(t) = v_0 - gt$$`,
                    `$$y(t) = y_0 + v_0 t - \\frac{1}{2}gt^2$$`,
                    `$$v^2 = v_0^2 - 2g(y - y_0)$$`,
                    `![Figura 2.6: Caduta libera e lancio verso l'alto](/images/fisica/fig2-6-caduta.png)`,
                    `**Lancio verso l'alto:**`,
                    `Se $v_0 > 0$ (velocità iniziale verso l'alto), il corpo sale decelerando fino a fermarsi e poi ridiscende accelerando.`,
                    `L'altezza massima si raggiunge quando $v = 0$:`,
                    `$$h_{max} = y_0 + \\frac{v_0^2}{2g}$$`,
                    `Il tempo di salita è:`,
                    `$$t_{salita} = \\frac{v_0}{g}$$`,
                    `Il tempo totale di volo (partendo e tornando alla stessa quota) è:`,
                    `$$t_{volo} = \\frac{2v_0}{g}$$`
                ]
            },
            {
                title: "2.8 ‐‐> Moto parabolico (moto del proiettile)",
                content: [
                    `Il **moto parabolico** (o moto del proiettile) è il moto di un corpo lanciato con velocità iniziale $\\vec{v}_0$ non verticale, soggetto solo alla forza di gravità.`,
                    `Scegliendo il sistema di riferimento con l'asse $x$ orizzontale e l'asse $y$ verticale (positivo verso l'alto):`,
                    `**Condizioni iniziali:**`,
                    `- Posizione iniziale: $(x_0, y_0)$`,
                    `- Velocità iniziale: $v_0$ con angolo $\\theta$ rispetto all'orizzontale`,
                    `$$v_{0x} = v_0 \\cos\\theta$$`,
                    `$$v_{0y} = v_0 \\sin\\theta$$`,
                    `**Equazioni del moto:**`,
                    `Lungo l'asse $x$ (MRU):`,
                    `$$x(t) = x_0 + v_{0x}t = x_0 + v_0 \\cos\\theta \\cdot t$$`,
                    `Lungo l'asse $y$ (MRUA con $a = -g$):`,
                    `$$y(t) = y_0 + v_{0y}t - \\frac{1}{2}gt^2 = y_0 + v_0 \\sin\\theta \\cdot t - \\frac{1}{2}gt^2$$`,
                    `**Componenti della velocità:**`,
                    `$$v_x(t) = v_{0x} = v_0 \\cos\\theta = \\text{costante}$$`,
                    `$$v_y(t) = v_{0y} - gt = v_0 \\sin\\theta - gt$$`,
                    `![Figura 2.7: Traiettoria parabolica del proiettile](/images/fisica/fig2-7-proiettile.png)`,
                    `**Equazione della traiettoria:**`,
                    `Eliminando $t$ dalle equazioni parametriche, si ottiene (con $x_0 = y_0 = 0$):`,
                    `$$y = x\\tan\\theta - \\frac{g}{2v_0^2\\cos^2\\theta}x^2$$`,
                    `Questa è l'equazione di una **parabola** con concavità verso il basso.`,
                    `**Gittata** (portata orizzontale, con $y_0 = 0$):`,
                    `$$R = \\frac{v_0^2 \\sin(2\\theta)}{g}$$`,
                    `La gittata massima si ha per $\\theta = 45°$:`,
                    `$$R_{max} = \\frac{v_0^2}{g}$$`,
                    `**Altezza massima:**`,
                    `$$h_{max} = \\frac{v_0^2 \\sin^2\\theta}{2g}$$`,
                    `**Tempo di volo** (con $y_0 = y_{finale} = 0$):`,
                    `$$T = \\frac{2v_0 \\sin\\theta}{g}$$`
                ]
            },
            {
                title: "2.9 ‐‐> Moto circolare",
                content: [
                    `Il **moto circolare** è un moto in cui la traiettoria è una circonferenza di raggio $R$.`,
                    `**Moto circolare uniforme (MCU)**`,
                    `Nel moto circolare uniforme il modulo della velocità è costante:`,
                    `$$v = |\\vec{v}| = \\text{costante}$$`,
                    `ma la **direzione** della velocità cambia continuamente (tangente alla circonferenza).`,
                    `![Figura 2.8: Moto circolare uniforme](/images/fisica/fig2-8-circolare.png)`,
                    `**Grandezze caratteristiche:**`,
                    `- **Periodo** $T$: tempo necessario per compiere un giro completo`,
                    `- **Frequenza** $f = \\frac{1}{T}$: numero di giri nell'unità di tempo [Hz]`,
                    `- **Velocità angolare** $\\omega$: angolo percorso nell'unità di tempo [rad/s]`,
                    `$$\\omega = \\frac{2\\pi}{T} = 2\\pi f$$`,
                    `**Relazione tra velocità lineare e angolare:**`,
                    `$$v = \\omega R$$`,
                    `**Posizione angolare:**`,
                    `$$\\theta(t) = \\theta_0 + \\omega t$$`,
                    `**Coordinate cartesiane in funzione del tempo:**`,
                    `$$x(t) = R\\cos(\\omega t + \\phi)$$`,
                    `$$y(t) = R\\sin(\\omega t + \\phi)$$`,
                    `dove $\\phi$ è la fase iniziale.`
                ]
            },
            {
                title: "2.10 ‐‐> Accelerazione nel moto circolare",
                content: [
                    `Nel moto circolare, anche se il modulo della velocità è costante (MCU), esiste sempre un'accelerazione dovuta al cambiamento di direzione del vettore velocità.`,
                    `**Accelerazione centripeta:**`,
                    `L'**accelerazione centripeta** è diretta verso il centro della circonferenza e ha modulo:`,
                    `$$a_c = \\frac{v^2}{R} = \\omega^2 R$$`,
                    `![Figura 2.9: Accelerazione centripeta nel MCU](/images/fisica/fig2-9-centripeta.png)`,
                    `In forma vettoriale:`,
                    `$$\\vec{a}_c = -\\omega^2 \\vec{r} = -\\frac{v^2}{R}\\hat{r}$$`,
                    `dove $\\hat{r}$ è il versore radiale (uscente dal centro).`,
                    `**Moto circolare uniformemente accelerato:**`,
                    `Se il modulo della velocità varia nel tempo, si ha anche un'**accelerazione tangenziale**:`,
                    `$$a_t = \\frac{dv}{dt} = R\\frac{d\\omega}{dt} = R\\alpha$$`,
                    `dove $\\alpha = \\frac{d\\omega}{dt}$ è l'**accelerazione angolare**.`,
                    `L'accelerazione totale è:`,
                    `$$\\vec{a} = \\vec{a}_c + \\vec{a}_t$$`,
                    `con modulo:`,
                    `$$a = \\sqrt{a_c^2 + a_t^2}$$`,
                    `![Figura 2.10: Accelerazione centripeta e tangenziale](/images/fisica/fig2-10-acc-circ.png)`,
                    `**Leggi del moto circolare uniformemente accelerato:**`,
                    `$$\\omega(t) = \\omega_0 + \\alpha t$$`,
                    `$$\\theta(t) = \\theta_0 + \\omega_0 t + \\frac{1}{2}\\alpha t^2$$`,
                    `$$\\omega^2 = \\omega_0^2 + 2\\alpha(\\theta - \\theta_0)$$`
                ]
            },
            {
                title: "2.11 ‐‐> Componenti intrinseche dell'accelerazione",
                content: [
                    `Per un moto curvilineo generico, l'accelerazione può essere scomposta in due componenti perpendicolari tra loro:`,
                    `**Accelerazione tangenziale $a_t$:**`,
                    `È la componente dell'accelerazione nella direzione della velocità (tangente alla traiettoria):`,
                    `$$a_t = \\frac{dv}{dt}$$`,
                    `Rappresenta la variazione del *modulo* della velocità.`,
                    `**Accelerazione normale (o centripeta) $a_n$:**`,
                    `È la componente dell'accelerazione perpendicolare alla velocità:`,
                    `$$a_n = \\frac{v^2}{\\rho}$$`,
                    `dove $\\rho$ è il **raggio di curvatura** della traiettoria nel punto considerato.`,
                    `Rappresenta la variazione della *direzione* della velocità.`,
                    `![Figura 2.11: Componenti intrinseche dell'accelerazione](/images/fisica/fig2-11-intrinseche.png)`,
                    `**Sistema di riferimento intrinseco:**`,
                    `- $\\hat{t}$: versore tangente alla traiettoria (direzione della velocità)`,
                    `- $\\hat{n}$: versore normale (verso il centro di curvatura)`,
                    `- $\\hat{b} = \\hat{t} \\times \\hat{n}$: versore binormale`,
                    `In questo sistema:`,
                    `$$\\vec{v} = v\\hat{t}$$`,
                    `$$\\vec{a} = a_t\\hat{t} + a_n\\hat{n} = \\frac{dv}{dt}\\hat{t} + \\frac{v^2}{\\rho}\\hat{n}$$`
                ]
            },
            {
                title: "2.12 ‐‐> Moti relativi",
                content: [
                    `Consideriamo due sistemi di riferimento: $S$ (fisso) e $S'$ (mobile) che si muove rispetto a $S$.`,
                    `**Caso di moto traslatorio uniforme:**`,
                    `Se $S'$ si muove con velocità costante $\\vec{V}$ rispetto a $S$ (traslazione pura, senza rotazione):`,
                    `$$\\vec{r} = \\vec{r}' + \\vec{R}$$`,
                    `dove $\\vec{R}$ è la posizione dell'origine di $S'$ rispetto a $S$.`,
                    `**Legge di composizione delle velocità:**`,
                    `$$\\vec{v} = \\vec{v}' + \\vec{V}$$`,
                    `dove:`,
                    `- $\\vec{v}$ è la velocità nel sistema $S$ (velocità assoluta)`,
                    `- $\\vec{v}'$ è la velocità nel sistema $S'$ (velocità relativa)`,
                    `- $\\vec{V}$ è la velocità di $S'$ rispetto a $S$ (velocità di trascinamento)`,
                    `![Figura 2.12: Composizione delle velocità nei moti relativi](/images/fisica/fig2-12-relativi.png)`,
                    `**Legge di composizione delle accelerazioni:**`,
                    `Se $\\vec{V}$ è costante (moto traslatorio uniforme):`,
                    `$$\\vec{a} = \\vec{a}'$$`,
                    `Le accelerazioni sono uguali nei due sistemi di riferimento.`,
                    `**Nota:** Questo risultato vale solo per sistemi di riferimento inerziali (in moto rettilineo uniforme l'uno rispetto all'altro). Per sistemi non inerziali compaiono termini aggiuntivi (accelerazioni apparenti).`
                ]
            }
        ]
    },
    {
        id: "dinamica",
        title: "Capitolo 3: Dinamica",
        subsections: [
            {
                title: "3.1 ‐‐> Introduzione alla Dinamica",
                content: [
                    `La **dinamica** è la parte della meccanica che studia il moto dei corpi in relazione alle cause che lo producono: le **forze**.`,
                    `Mentre la cinematica risponde alla domanda "*come* si muove un corpo?", la dinamica risponde alla domanda "*perché* si muove in quel modo?".`,
                    `La dinamica si fonda su tre principi fondamentali, noti come **Leggi di Newton**, formulati da Isaac Newton nel 1687 nei *Principia Mathematica*.`
                ]
            },
            {
                title: "3.2 ‐‐> Prima legge di Newton (Principio di inerzia)",
                content: [
                    `**Enunciato:**`,
                    `*Un corpo permane nel suo stato di quiete o di moto rettilineo uniforme finché non interviene una forza esterna a modificare tale stato.*`,
                    `Questa legge definisce implicitamente cosa si intende per **forza**: una forza è ciò che causa la variazione dello stato di moto di un corpo.`,
                    `**Sistema di riferimento inerziale:**`,
                    `Un sistema di riferimento in cui vale la prima legge di Newton è detto **sistema di riferimento inerziale**. In pratica, è un sistema in moto rettilineo uniforme (o in quiete) rispetto alle stelle fisse.`,
                    `La prima legge di Newton definisce anche l'**inerzia**: la tendenza di un corpo a mantenere il proprio stato di moto. La massa è la misura quantitativa dell'inerzia.`,
                    `![Figura 3.1: Illustrazione del principio di inerzia](/images/fisica/fig3-1-inerzia.png)`
                ]
            },
            {
                title: "3.3 ‐‐> Seconda legge di Newton (Legge fondamentale della dinamica)",
                content: [
                    `**Enunciato:**`,
                    `*L'accelerazione di un corpo è direttamente proporzionale alla forza risultante applicata e inversamente proporzionale alla sua massa.*`,
                    `$$\\vec{F} = m\\vec{a}$$`,
                    `oppure, in forma più generale:`,
                    `$$\\vec{F} = \\frac{d\\vec{p}}{dt}$$`,
                    `dove $\\vec{p} = m\\vec{v}$ è la **quantità di moto**.`,
                    `**Unità di misura:**`,
                    `- Forza: Newton (N) = kg·m/s²`,
                    `- Massa: kilogrammo (kg)`,
                    `- Accelerazione: m/s²`,
                    `![Figura 3.2: Seconda legge di Newton](/images/fisica/fig3-2-seconda-legge.png)`,
                    `**Osservazioni:**`,
                    `- La forza e l'accelerazione hanno sempre la stessa direzione e verso`,
                    `- Se $\\vec{F} = \\vec{0}$, allora $\\vec{a} = \\vec{0}$ (prima legge di Newton)`,
                    `- Se agiscono più forze, $\\vec{F}$ è la **forza risultante** (somma vettoriale di tutte le forze)`,
                    `$$\\vec{F}_{tot} = \\sum_{i} \\vec{F}_i = m\\vec{a}$$`
                ]
            },
            {
                title: "3.4 ‐‐> Terza legge di Newton (Principio di azione e reazione)",
                content: [
                    `**Enunciato:**`,
                    `*Ad ogni azione corrisponde una reazione uguale in modulo e direzione, ma di verso opposto.*`,
                    `$$\\vec{F}_{AB} = -\\vec{F}_{BA}$$`,
                    `dove $\\vec{F}_{AB}$ è la forza esercitata dal corpo $A$ sul corpo $B$ e $\\vec{F}_{BA}$ è la forza esercitata dal corpo $B$ sul corpo $A$.`,
                    `![Figura 3.3: Terza legge di Newton - azione e reazione](/images/fisica/fig3-3-terza-legge.png)`,
                    `**Caratteristiche:**`,
                    `- Le due forze agiscono su corpi diversi`,
                    `- Sono sempre simultanee`,
                    `- Sono sempre dello stesso tipo (es. gravitazionale-gravitazionale, elettrica-elettrica)`,
                    `**Attenzione:** Le forze di azione e reazione non si annullano perché agiscono su corpi diversi!`
                ]
            },
            {
                title: "3.5 ‐‐> Forza peso",
                content: [
                    `La **forza peso** (o forza di gravità) è la forza con cui la Terra attrae un corpo verso il suo centro.`,
                    `$$\\vec{P} = m\\vec{g}$$`,
                    `dove:`,
                    `- $m$ è la massa del corpo`,
                    `- $\\vec{g}$ è l'accelerazione di gravità (diretta verso il centro della Terra)`,
                    `- $|\\vec{g}| \\approx 9.81$ m/s² al livello del mare`,
                    `Il peso è una **forza** (si misura in Newton), non una massa!`,
                    `![Figura 3.4: Distinzione tra massa e peso](/images/fisica/fig3-4-peso.png)`,
                    `**Variazione di g:**`,
                    `L'accelerazione di gravità varia leggermente con:`,
                    `- L'altitudine (diminuisce allontanandosi dalla superficie)`,
                    `- La latitudine (massima ai poli, minima all'equatore)`,
                    `$$g = g_0 \\left(\\frac{R_T}{R_T + h}\\right)^2$$`,
                    `dove $R_T$ è il raggio terrestre e $h$ l'altitudine.`
                ]
            },
            {
                title: "3.6 ‐‐> Forza normale",
                content: [
                    `La **forza normale** (o reazione vincolare) è la forza che una superficie esercita su un corpo appoggiato, perpendicolare alla superficie stessa.`,
                    `![Figura 3.5: Forza normale su un piano orizzontale](/images/fisica/fig3-5-normale.png)`,
                    `**Su un piano orizzontale:**`,
                    `Se il corpo è in equilibrio sulla superficie orizzontale:`,
                    `$$N = mg$$`,
                    `**Su un piano inclinato:**`,
                    `Scomponendo il peso nelle componenti parallela e perpendicolare al piano:`,
                    `$$N = mg\\cos\\theta$$`,
                    `dove $\\theta$ è l'angolo di inclinazione del piano rispetto all'orizzontale.`,
                    `![Figura 3.6: Forze su un piano inclinato](/images/fisica/fig3-6-piano-inclinato.png)`,
                    `La componente del peso parallela al piano è:`,
                    `$$P_{\\parallel} = mg\\sin\\theta$$`
                ]
            },
            {
                title: "3.7 ‐‐> Forza di attrito",
                content: [
                    `La **forza di attrito** è una forza che si oppone al moto relativo tra due superfici a contatto.`,
                    `**Attrito statico:**`,
                    `L'attrito statico impedisce l'inizio del moto. Ha un valore massimo dato da:`,
                    `$$f_s \\leq \\mu_s N$$`,
                    `dove $\\mu_s$ è il **coefficiente di attrito statico** e $N$ è la forza normale.`,
                    `L'attrito statico si adatta fino al valore massimo necessario per mantenere l'equilibrio.`,
                    `![Figura 3.7: Attrito statico e dinamico](/images/fisica/fig3-7-attrito.png)`,
                    `**Attrito dinamico (o cinetico):**`,
                    `L'attrito dinamico agisce quando il corpo è già in movimento:`,
                    `$$f_d = \\mu_d N$$`,
                    `dove $\\mu_d$ è il **coefficiente di attrito dinamico**.`,
                    `**Proprietà:**`,
                    `- $\\mu_d < \\mu_s$ (l'attrito statico è maggiore di quello dinamico)`,
                    `- I coefficienti dipendono dalla natura delle superfici a contatto`,
                    `- L'attrito dinamico è indipendente dalla velocità (in prima approssimazione)`,
                    {
                        headers: ["Superfici", "μs", "μd"],
                        rows: [
                            ["Acciaio su acciaio", "0.74", "0.57"],
                            ["Legno su legno", "0.25-0.50", "0.20"],
                            ["Gomma su cemento asciutto", "1.0", "0.8"],
                            ["Ghiaccio su ghiaccio", "0.1", "0.03"]
                        ]
                    }
                ]
            },
            {
                title: "3.8 ‐‐> Tensione di una fune",
                content: [
                    `La **tensione** è la forza trasmessa attraverso una fune, un cavo o una catena quando viene tirata da forze alle estremità opposte.`,
                    `![Figura 3.8: Tensione in una fune](/images/fisica/fig3-8-tensione.png)`,
                    `**Fune ideale:**`,
                    `Una fune ideale è:`,
                    `- **Inestensibile**: non si allunga sotto tensione`,
                    `- **Priva di massa**: la sua massa è trascurabile`,
                    `- **Perfettamente flessibile**: trasmette solo forze lungo la sua direzione`,
                    `In una fune ideale, la tensione è costante lungo tutta la sua lunghezza.`,
                    `**Carrucola ideale:**`,
                    `Una carrucola ideale (priva di massa e attrito) serve solo a cambiare la direzione della tensione, senza modificarne il modulo.`,
                    `![Figura 3.9: Sistema con carrucola ideale](/images/fisica/fig3-9-carrucola.png)`
                ]
            },
            {
                title: "3.9 ‐‐> Forza elastica",
                content: [
                    `La **forza elastica** è la forza esercitata da una molla (o un corpo elastico) quando viene deformata rispetto alla sua posizione di equilibrio.`,
                    `**Legge di Hooke:**`,
                    `$$\\vec{F} = -k\\vec{x}$$`,
                    `dove:`,
                    `- $k$ è la **costante elastica** della molla [N/m]`,
                    `- $\\vec{x}$ è lo spostamento dalla posizione di equilibrio`,
                    `- Il segno negativo indica che la forza è di richiamo (diretta verso la posizione di equilibrio)`,
                    `![Figura 3.10: Forza elastica e legge di Hooke](/images/fisica/fig3-10-molla.png)`,
                    `La legge di Hooke è valida per **piccole deformazioni** (regime elastico lineare).`,
                    `**Molle in serie e in parallelo:**`,
                    `- Molle in serie: $\\frac{1}{k_{eq}} = \\frac{1}{k_1} + \\frac{1}{k_2}$`,
                    `- Molle in parallelo: $k_{eq} = k_1 + k_2$`
                ]
            },
            {
                title: "3.10 ‐‐> Dinamica del moto circolare",
                content: [
                    `Per mantenere un corpo in moto circolare uniforme è necessaria una **forza centripeta** diretta verso il centro della traiettoria.`,
                    `Dalla seconda legge di Newton:`,
                    `$$F_c = ma_c = m\\frac{v^2}{R} = m\\omega^2 R$$`,
                    `![Figura 3.11: Forza centripeta nel moto circolare](/images/fisica/fig3-11-forza-centripeta.png)`,
                    `La forza centripeta non è una "nuova" forza, ma è fornita da altre forze (tensione, attrito, gravità, ecc.) che agiscono sul corpo.`,
                    `**Esempi di forza centripeta:**`,
                    `- Auto in curva: forza di attrito`,
                    `- Satellite in orbita: forza gravitazionale`,
                    `- Pallina su una corda: tensione della corda`,
                    `- Curva sopraelevata: componente della normale`,
                    `**Forza centrifuga:**`,
                    `La forza centrifuga è una **forza apparente** (o pseudoforza) che appare solo in sistemi di riferimento non inerziali (rotanti). Non è una forza reale, ma l'effetto dell'inerzia in un sistema rotante.`,
                    `$$F_{centrifuga} = m\\omega^2 R$$`,
                    `(diretta verso l'esterno della traiettoria)`,
                    `![Figura 3.12: Forza centrifuga come forza apparente](/images/fisica/fig3-12-centrifuga.png)`
                ]
            },
            {
                title: "3.11 ‐‐> Moto su piano inclinato",
                content: [
                    `Consideriamo un corpo di massa $m$ su un piano inclinato di angolo $\\theta$.`,
                    `![Figura 3.13: Diagramma delle forze su piano inclinato](/images/fisica/fig3-13-diagramma-inclinato.png)`,
                    `**Scomposizione delle forze:**`,
                    `- Peso: $\\vec{P} = m\\vec{g}$`,
                    `- Componente perpendicolare al piano: $P_\\perp = mg\\cos\\theta$`,
                    `- Componente parallela al piano: $P_\\parallel = mg\\sin\\theta$`,
                    `- Forza normale: $N = mg\\cos\\theta$`,
                    `**Senza attrito:**`,
                    `L'accelerazione lungo il piano è:`,
                    `$$a = g\\sin\\theta$$`,
                    `**Con attrito:**`,
                    `- Se il corpo scende: $a = g(\\sin\\theta - \\mu_d\\cos\\theta)$`,
                    `- Se il corpo sale (spinto): $a = g(\\sin\\theta + \\mu_d\\cos\\theta)$ (decelerazione)`,
                    `**Condizione di equilibrio (corpo fermo):**`,
                    `$$\\mu_s \\geq \\tan\\theta$$`,
                    `L'angolo massimo per cui il corpo resta fermo è dato da:`,
                    `$$\\theta_{max} = \\arctan(\\mu_s)$$`,
                    `Questo angolo è detto **angolo di attrito** o **angolo limite**.`
                ]
            },
            {
                title: "3.12 ‐‐> Sistemi di corpi",
                content: [
                    `Quando più corpi interagiscono tra loro, si applicano le leggi di Newton a ciascun corpo separatamente, considerando tutte le forze che agiscono su di esso.`,
                    `**Macchina di Atwood:**`,
                    `Due masse $m_1$ e $m_2$ collegate da una fune che passa su una carrucola ideale.`,
                    `![Figura 3.14: Macchina di Atwood](/images/fisica/fig3-14-atwood.png)`,
                    `Applicando la seconda legge a ciascuna massa:`,
                    `$$m_1 g - T = m_1 a$$`,
                    `$$T - m_2 g = m_2 a$$`,
                    `Risolvendo il sistema:`,
                    `$$a = \\frac{(m_1 - m_2)g}{m_1 + m_2}$$`,
                    `$$T = \\frac{2m_1 m_2 g}{m_1 + m_2}$$`,
                    `**Corpi a contatto:**`,
                    `Due corpi $m_1$ e $m_2$ a contatto spinti da una forza $F$:`,
                    `![Figura 3.15: Corpi a contatto](/images/fisica/fig3-15-contatto.png)`,
                    `L'accelerazione del sistema è:`,
                    `$$a = \\frac{F}{m_1 + m_2}$$`,
                    `La forza di contatto tra i due corpi è:`,
                    `$$F_{12} = \\frac{m_2 F}{m_1 + m_2}$$`
                ]
            }
        ]
    }
    // Capitolo 4: Lavoro ed Energia verrà aggiunto dopo
];

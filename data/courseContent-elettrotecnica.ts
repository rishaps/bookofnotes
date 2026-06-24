import { MainSection } from '../types';

export const elettrotecnicaCourseContent: MainSection[] = [
    {
        "id": "1-introduzione-ai-circuiti-elettrici",
        "title": "Introduzione ai circuiti elettrici",
        "subsections": [
            {
                "title": "Il circuito elettrico",
                "content": [
                    "Un **circuito elettrico** è un insieme di dispositivi collegati fra loro secondo una topologia precisa. Due circuiti sono equivalenti solo se hanno gli stessi componenti e gli stessi collegamenti fra morsetti e nodi.",
                    "![Circuito elettrico|right|small](/elettrotecnica-images/kirchhoff-circuit.svg)",
                    "Le grandezze fondamentali usate per descrivere il circuito sono **corrente**, **tensione** e **potenza**. Le leggi di Kirchhoff descrivono la topologia; le relazioni costitutive descrivono invece il comportamento dei singoli dispositivi.",
                    "In un circuito con $l$ lati servono in generale $2l$ incognite di lato: $l$ correnti e $l$ tensioni. Le equazioni mancanti vengono fornite dalle leggi topologiche e dai modelli dei componenti."
                ]
            },
            {
                "title": "Le grandezze elettriche fondamentali",
                "content": [
                    "**Definizione: Corrente elettrica**",
                    "La corrente elettrica è la quantità di carica che attraversa una superficie nell’unità di tempo. Il suo verso positivo è convenzionale e va mantenuto coerente in tutto il circuito.",
                    "$$ i(t)=\\frac{dq(t)}{dt},\\qquad q(t)=q(t_0)+\\int_{t_0}^{t} i(\\tau)\\,d\\tau $$",
                    "**Definizione: Tensione elettrica**",
                    "La tensione tra due punti misura il lavoro necessario per spostare una carica unitaria positiva. Invertendo l’ordine dei morsetti cambia il segno.",
                    "$$ v_{AB}=\\frac{dW_{B\\to A}}{dq},\\qquad v_{AB}=-v_{BA} $$",
                    "**Definizione: Potenza elettrica istantanea**",
                    "Con la convenzione degli utilizzatori, la potenza positiva indica energia assorbita dal bipolo; con la convenzione dei generatori il segno risulta opposto.",
                    "$$ p(t)=\\frac{dW(t)}{dt}=v(t)i(t),\\qquad W=\\int_{t_0}^{t_1}p(t)\\,dt $$"
                ]
            },
            {
                "title": "Alcuni concetti di base",
                "content": [
                    "I dispositivi elettrici sono collegati al circuito tramite **terminali**, detti anche morsetti o poli. Il caso più comune è il **bipolo**, cioè un dispositivo con due morsetti.",
                    "![Bipolo elettrico|right|small](/elettrotecnica-images/bipolo-symbol.svg)",
                    "Si chiamano **rami** o **lati** i singoli collegamenti/componenti, **nodi** i punti di connessione fra più lati e **maglie** i percorsi chiusi del circuito.",
                    "Le grandezze più usate sono le **correnti di lato**, le **tensioni di lato** e le **tensioni di nodo**. Per le tensioni di nodo si sceglie un nodo di riferimento, detto massa o terra, a potenziale nullo.",
                    "Nella **convenzione degli utilizzatori** la corrente positiva entra nel morsetto positivo del bipolo; nella **convenzione dei generatori** esce dal morsetto positivo. La scelta è arbitraria, ma deve restare coerente.",
                    "Per un bipolo in convenzione degli utilizzatori vale:",
                    "$$ p(t)=v(t)i(t) $$"
                ]
            }
        ]
    },
    {
        "id": "2-le-leggi-di-kirchhoff",
        "title": "Le leggi di Kirchhoff",
        "subsections": [
            {
                "title": "La legge di Kirchhoff delle correnti",
                "content": [
                    "**Teorema: Legge di Kirchhoff delle correnti (KCL)**",
                    "La KCL afferma che, in ogni istante, la somma algebrica delle correnti che attraversano una superficie chiusa è nulla. Conta solo la topologia del circuito, non il tipo di componenti presenti.",
                    "![Legge di Kirchhoff delle correnti|right|small](/elettrotecnica-images/kirchhoff-kcl.svg)",
                    "$$ \\sum_{k} i_k=0 $$",
                    "Se la superficie racchiude un solo nodo, la stessa legge diventa: la somma delle correnti entranti nel nodo è uguale alla somma delle correnti uscenti.",
                    "$$ \\sum i_{entranti}=\\sum i_{uscenti} $$",
                    "In un circuito con $n$ nodi si possono scrivere $n-1$ equazioni KCL indipendenti. Le equazioni sono algebriche, lineari e con coefficienti $-1$, $0$ o $1$."
                ]
            },
            {
                "title": "La legge di Kirchhoff delle tensioni",
                "content": [
                    "**Teorema: Legge di Kirchhoff delle tensioni (KVL)**",
                    "La KVL afferma che, in ogni istante, la somma algebrica delle tensioni incontrate lungo un cammino chiuso è nulla. Anche questa legge dipende solo dalla topologia e dalla convenzione dei segni.",
                    "![Legge di Kirchhoff delle tensioni|right|small](/elettrotecnica-images/kirchhoff-kvl.svg)",
                    "$$ \\sum_{k} v_k=0 $$",
                    "In un circuito con $n$ nodi e $l$ lati si possono scrivere $l-n+1$ equazioni KVL indipendenti.",
                    "**Corollario: tensioni di nodo**",
                    "Scelto un nodo di riferimento a potenziale nullo, la tensione di lato tra i nodi $I$ e $J$ è la differenza delle rispettive tensioni di nodo:",
                    "$$ V_{IJ}=e_I-e_J $$"
                ]
            },
            {
                "title": "Il teorema di Tellegen",
                "content": [
                    "Con la convenzione degli utilizzatori, le equazioni KCL possono essere scritte in forma matriciale tramite la **matrice di incidenza** $A$:",
                    "$$ A\\,i=0 $$",
                    "La matrice $A$ descrive la topologia: note la matrice e la convenzione dei segni, sono noti i collegamenti fra lati e nodi.",
                    "Le tensioni di lato compatibili con la KVL si possono scrivere a partire dalle tensioni di nodo $e$:",
                    "$$ v=A^T e $$",
                    "**Teorema: Teorema di Tellegen**",
                    "**Ipotesi:** sia dato un circuito con $l$ lati e $n$ nodi; sia $i=\\{i_1,i_2,\\ldots,i_l\\}$ un insieme di correnti di lato che soddisfa la KCL e sia $v=\\{v_1,v_2,\\ldots,v_l\\}$ un insieme di tensioni di lato che soddisfa la KVL.",
                    "**Tesi:** la somma algebrica delle potenze istantanee di tutti i lati è nulla:",
                    "$$ \\sum_{k=1}^{l} v_k i_k=0 $$",
                    "**Dimostrazione:** poiché $v=A^T e$ e $A i=0$, allora:",
                    "$$ v^T i=(A^T e)^T i=e^T A i=0 $$"
                ]
            }
        ]
    },
    {
        "id": "3-dispositivi-elettrici",
        "title": "Dispositivi elettrici",
        "subsections": [
            {
                "title": "Dispositivi elettrici",
                "content": [
                    "Ogni dispositivo è descritto da una **relazione costitutiva**, cioè una legge che lega tensioni e correnti ai morsetti. Questa relazione dipende dal modello del componente, non dal circuito in cui viene inserito.",
                    "![Simbolo del resistore|right|small](/elettrotecnica-images/resistor-symbol.svg)",
                    "Un dispositivo è **resistivo** se la relazione è algebrica; è **dinamico** se contiene derivate o integrali e quindi dipende anche dalla storia passata.",
                    "Un circuito è **resistivo** quando contiene solo dispositivi resistivi; è **dinamico** quando contiene almeno un condensatore, un induttore o un altro elemento con memoria.",
                    "Un dispositivo è **lineare** se la relazione costitutiva è lineare nelle grandezze elettriche; è **tempo invariante** se i parametri non dipendono esplicitamente dal tempo."
                ]
            },
            {
                "title": "Esempi di dispositivi, 1",
                "content": [
                    "**Componente: Resistore**",
                    "![Simbolo del resistore|right|small](/elettrotecnica-images/resistor-symbol.svg)",
                    "Il resistore lineare segue la legge di Ohm. La resistenza $R$ si misura in ohm, la conduttanza $G$ in siemens.",
                    "$$ v(t)=R\\,i(t),\\qquad i(t)=G\\,v(t),\\qquad G=\\frac{1}{R} $$",
                    "Con la convenzione degli utilizzatori, un resistore ideale non eroga energia: dissipa o, al limite, scambia potenza nulla.",
                    "$$ p(t)=v(t)i(t)=R i^2(t)=G v^2(t)\\ge 0 $$",
                    "**Componente: Generatore ideale di tensione**",
                    "Impone la tensione ai morsetti indipendentemente dalla corrente che lo attraversa:",
                    "$$ v(t)=e(t),\\qquad e(t)=E_0\\ \\text{oppure}\\ e(t)=E_M\\cos(\\omega t+\\varphi) $$",
                    "**Componente: Generatore ideale di corrente**",
                    "Impone la corrente di lato indipendentemente dalla tensione ai morsetti:",
                    "$$ i(t)=j(t),\\qquad j(t)=J_0\\ \\text{oppure}\\ j(t)=J_M\\cos(\\omega t+\\varphi) $$"
                ]
            },
            {
                "title": "Esempi di dispositivi, 2",
                "content": [
                    "**Componente: Corto circuito**",
                    "Un corto circuito ideale impone tensione nulla fra i morsetti. Può essere visto come un resistore con $R=0$.",
                    "$$ v(t)=0 $$",
                    "**Componente: Circuito aperto**",
                    "Un circuito aperto ideale impone corrente nulla. Può essere visto come un resistore con $R\\to\\infty$.",
                    "$$ i(t)=0 $$",
                    "**Componente: Interruttore ideale**",
                    "Quando è chiuso si comporta come un corto circuito; quando è aperto si comporta come un circuito aperto.",
                    "**Componente: Voltmetro ideale**",
                    "Si collega in parallelo e non deve assorbire corrente, quindi idealmente è un circuito aperto.",
                    "**Componente: Amperometro ideale**",
                    "Si collega in serie e non deve introdurre caduta di tensione, quindi idealmente è un corto circuito."
                ]
            }
        ]
    },
    {
        "id": "4-soluzione-di-circuiti-resistivi",
        "title": "Soluzione di circuiti resistivi",
        "subsections": [
            {
                "title": "Metodo della matrice sparsa",
                "content": [
                    "In un circuito con $l$ lati e $n$ nodi, KCL e KVL forniscono complessivamente $l$ equazioni indipendenti. Per risolvere tutte le correnti e tutte le tensioni di lato servono però $2l$ equazioni.",
                    "Le equazioni mancanti sono le relazioni costitutive dei componenti. Mettendo insieme KCL, KVL e relazioni dei dispositivi si ottiene un sistema lineare.",
                    "$$ Mx=b $$",
                    "Il vettore delle incognite contiene correnti e tensioni di lato:",
                    "$$ x=\\begin{bmatrix}i_1&\\cdots&i_l&v_1&\\cdots&v_l\\end{bmatrix}^T $$",
                    "La matrice $M$ è detta **sparsa** perché molti coefficienti sono nulli. Il metodo è generale, ma nei circuiti grandi conviene usare tecniche più compatte, come analisi nodale o nodale modificata."
                ]
            },
            {
                "title": "Tecniche di riduzione",
                "content": [
                    "Le tecniche di riduzione sostituiscono sottoreti con un bipolo equivalente che presenta lo stesso comportamento ai morsetti esterni.",
                    "**Connessione in serie**",
                    "Due o più bipoli sono in serie quando sono attraversati dalla stessa corrente.",
                    "$$ i_1=i_2=\\cdots=i,\\qquad v=\\sum_k v_k $$",
                    "**Connessione in parallelo**",
                    "Due o più bipoli sono in parallelo quando hanno la stessa tensione ai morsetti.",
                    "$$ v_1=v_2=\\cdots=v,\\qquad i=\\sum_k i_k $$",
                    "**Resistori**",
                    "$$ R_{eq,serie}=\\sum_k R_k,\\qquad G_{eq,parallelo}=\\sum_k G_k,\\qquad R_{eq,parallelo}=\\left(\\sum_k\\frac{1}{R_k}\\right)^{-1} $$",
                    "**Generatori ideali**",
                    "$$ e_{eq,serie}=\\sum_k e_k,\\qquad j_{eq,parallelo}=\\sum_k j_k $$",
                    "Generatori di tensione ideali in parallelo o generatori di corrente ideali in serie sono compatibili solo se impongono valori coerenti."
                ]
            },
            {
                "title": "Formule utili nella soluzione manuale di circuiti resistivi",
                "content": [
                    "**Partitore di tensione**",
                    "In una serie di resistori, la corrente è la stessa e la tensione totale si divide in proporzione alle resistenze.",
                    "$$ v_k=V\\frac{R_k}{\\sum_j R_j} $$",
                    "**Partitore di corrente**",
                    "In un parallelo di resistori, la tensione è la stessa e la corrente totale si divide in proporzione alle conduttanze.",
                    "$$ i_k=I\\frac{G_k}{\\sum_j G_j}=I\\frac{1/R_k}{\\sum_j 1/R_j} $$",
                    "**Due resistori in parallelo**",
                    "$$ R_{eq}=\\frac{R_1R_2}{R_1+R_2} $$",
                    "**Trasformazione tra generatore reale di tensione e di corrente**",
                    "$$ J_N=\\frac{E_T}{R_T},\\qquad R_N=R_T $$"
                ]
            }
        ]
    },
    {
        "id": "5-soluzione-di-circuiti-resistivi-lineari-1",
        "title": "Soluzione di circuiti resistivi lineari, 1",
        "subsections": [
            {
                "title": "Teorema di Thévenin",
                "content": [
                    "**Teorema: Teorema di Thévenin**",
                    "![Equivalenti di Thévenin e Norton|large](/elettrotecnica-images/thevenin-norton.svg)",
                    "Ogni rete resistiva lineare vista da due morsetti può essere sostituita, quando l’equivalente esiste, da un generatore ideale di tensione in serie a una resistenza.",
                    "$$ v=E_{Th}-R_{Th}i $$",
                    "La tensione $E_{Th}$ è la tensione a vuoto ai morsetti; la resistenza $R_{Th}$ si trova spegnendo i generatori indipendenti e calcolando la resistenza vista dai morsetti.",
                    "Per spegnere le sorgenti indipendenti: i generatori di tensione diventano corti circuiti, quelli di corrente circuiti aperti. I generatori pilotati restano attivi.",
                    "$$ E_{Th}=v_{AB}\\big|_{i=0},\\qquad R_{Th}=\\frac{E_{Th}}{i_{cc}} $$"
                ]
            },
            {
                "title": "Teorema di Norton",
                "content": [
                    "**Teorema: Teorema di Norton**",
                    "In forma duale rispetto a Thévenin, una rete resistiva lineare vista da due morsetti può essere sostituita, quando l’equivalente esiste, da un generatore ideale di corrente in parallelo a una resistenza.",
                    "$$ i=J_N-G_N v,\\qquad G_N=\\frac{1}{R_N} $$",
                    "La corrente $J_N$ è la corrente di corto circuito ai morsetti; $R_N$ si calcola come $R_{Th}$.",
                    "$$ J_N=i_{cc},\\qquad R_N=R_{Th},\\qquad E_{Th}=R_{Th}J_N $$",
                    "Un equivalente Thévenin non esiste per una rete che si comporta come un generatore ideale di corrente puro; un equivalente Norton non esiste per una rete che si comporta come un generatore ideale di tensione puro."
                ]
            },
            {
                "title": "Trasformazioni triangolo stella",
                "content": [
                    "**Configurazione a triangolo e a stella**",
                    "Quando i resistori non sono riducibili direttamente in serie o parallelo, si possono trasformare reti a triangolo in reti a stella equivalenti e viceversa.",
                    "**Da triangolo a stella**",
                    "$$ R_a=\\frac{R_{ab}R_{ca}}{R_{ab}+R_{bc}+R_{ca}},\\quad R_b=\\frac{R_{ab}R_{bc}}{R_{ab}+R_{bc}+R_{ca}},\\quad R_c=\\frac{R_{bc}R_{ca}}{R_{ab}+R_{bc}+R_{ca}} $$",
                    "**Da stella a triangolo**",
                    "$$ R_{ab}=R_a+R_b+\\frac{R_aR_b}{R_c},\\quad R_{bc}=R_b+R_c+\\frac{R_bR_c}{R_a},\\quad R_{ca}=R_c+R_a+\\frac{R_cR_a}{R_b} $$"
                ]
            }
        ]
    },
    {
        "id": "6-soluzione-di-circuiti-resistivi-lineari-2",
        "title": "Soluzione di circuiti resistivi lineari, 2",
        "subsections": [
            {
                "title": "Principio di sovrapposizione degli effetti",
                "content": [
                    "**Teorema: Principio di sovrapposizione degli effetti**",
                    "In un circuito lineare, ogni tensione o corrente è la somma dei contributi prodotti dai generatori indipendenti considerati uno alla volta.",
                    "Quando si considera un solo generatore, gli altri generatori indipendenti si spengono: tensione ideale in corto circuito, corrente ideale in circuito aperto. I generatori pilotati non si spengono.",
                    "$$ x=\\sum_k x_k $$",
                    "Il principio vale per grandezze lineari, quindi non si applica direttamente alla potenza, che è prodotto di tensione e corrente."
                ]
            },
            {
                "title": "Formula di Millman",
                "content": [
                    "**Teorema: Formula di Millman per le tensioni**",
                    "Per rami in parallelo composti da generatori reali di tensione, la tensione comune si calcola pesando ogni f.e.m. con la conduttanza del ramo.",
                    "$$ v_{AB}=\\frac{\\sum_k G_k e_k+\\sum_m j_m}{\\sum_k G_k} $$",
                    "**Forma per generatori di corrente**",
                    "Se i rami sono descritti direttamente da generatori reali di corrente, la stessa idea si esprime sommando correnti impresse e conduttanze.",
                    "$$ v_{AB}=\\frac{\\sum_k j_k}{\\sum_k G_k} $$",
                    "La formula è utile per reti con molti rami paralleli fra gli stessi due nodi."
                ]
            },
            {
                "title": "Teorema del massimo trasferimento di potenza",
                "content": [
                    "Per un generatore reale di tensione con resistenza interna $R_g$, la potenza sul carico $R_L$ è:",
                    "$$ P_L=R_L\\left(\\frac{E}{R_g+R_L}\\right)^2 $$",
                    "Derivando rispetto a $R_L$ si ottiene che la potenza assorbita dal carico è massima quando il carico è adattato:",
                    "$$ R_L=R_g $$",
                    "In questa condizione la potenza massima disponibile è:",
                    "$$ P_{max}=\\frac{E^2}{4R_g} $$"
                ]
            }
        ]
    },
    {
        "id": "7-generatore-pilotati-e-trasformatore-ideale",
        "title": "Generatori pilotati e trasformatore ideale",
        "subsections": [
            {
                "title": "Dispositivi a più morsetti",
                "content": [
                    "Un dispositivo con $n$ morsetti è detto **n-polo**. Applicando la KCL all’intero dispositivo, la somma delle correnti entranti deve essere nulla.",
                    "$$ \\sum_{k=1}^{n} i_k=0 $$",
                    "Se si sceglie un morsetto come riferimento, restano $n-1$ tensioni indipendenti. Le relazioni costitutive dei bipoli si generalizzano così a dispositivi con più morsetti.",
                    "Un **n-porte** è un dispositivo con morsetti accoppiati a coppie: per ogni porta interessa una tensione fra due morsetti e una corrente entrante in una delle due estremità."
                ]
            },
            {
                "title": "Generatori pilotati",
                "content": [
                    "I generatori pilotati sono sorgenti il cui valore dipende da una grandezza elettrica misurata in un’altra parte del circuito. Sono modelli lineari utili per transistor, amplificatori e reti attive.",
                    "**Generatore di tensione controllato in corrente**",
                    "$$ v_2=\\rho i_1 $$",
                    "**Generatore di tensione controllato in tensione**",
                    "$$ v_2=\\beta v_1 $$",
                    "**Generatore di corrente controllato in corrente**",
                    "$$ i_2=\\alpha i_1 $$",
                    "**Generatore di corrente controllato in tensione**",
                    "$$ i_2=\\gamma v_1 $$",
                    "I parametri $\\rho$, $\\beta$, $\\alpha$ e $\\gamma$ sono guadagni. I generatori pilotati non si spengono durante il calcolo di equivalenti Thévenin/Norton."
                ]
            },
            {
                "title": "Trasformatore ideale",
                "content": [
                    "**Componente: Trasformatore ideale**",
                    "![Simbolo del trasformatore|right|small](/elettrotecnica-images/transformer-symbol.svg)",
                    "Il trasformatore ideale collega due porte scalando tensioni e correnti tramite un rapporto di trasformazione $k$.",
                    "$$ v_2=k v_1,\\qquad i_1=-k i_2 $$",
                    "La potenza totale scambiata dalle due porte è nulla: ciò che una porta assorbe, l’altra lo eroga.",
                    "$$ p_1+p_2=v_1i_1+v_2i_2=0 $$",
                    "È quindi un dispositivo ideale non dissipativo: trasforma i livelli di tensione e corrente senza perdite."
                ]
            }
        ]
    },
    {
        "id": "8-due-porte-resistivi",
        "title": "Due-porte resistivi",
        "subsections": [
            {
                "title": "Relazione costitutiva dei due-porte resistivi, 1",
                "content": [
                    "Un **due-porte** resistivo lineare è descritto da due tensioni e due correnti. A seconda delle variabili scelte come indipendenti si ottengono rappresentazioni equivalenti.",
                    "**Rappresentazione serie, o a parametri di resistenza**",
                    "$$ \\begin{bmatrix}v_1\\\\v_2\\end{bmatrix}=\\begin{bmatrix}R_{11}&R_{12}\\\\R_{21}&R_{22}\\end{bmatrix}\\begin{bmatrix}i_1\\\\i_2\\end{bmatrix}+\\begin{bmatrix}e_1\\\\e_2\\end{bmatrix} $$",
                    "Se non sono presenti generatori indipendenti, il termine costante è nullo.",
                    "**Rappresentazione parallelo, o a parametri di conduttanza**",
                    "$$ \\begin{bmatrix}i_1\\\\i_2\\end{bmatrix}=\\begin{bmatrix}G_{11}&G_{12}\\\\G_{21}&G_{22}\\end{bmatrix}\\begin{bmatrix}v_1\\\\v_2\\end{bmatrix}+\\begin{bmatrix}j_1\\\\j_2\\end{bmatrix} $$",
                    "I coefficienti si ricavano imponendo condizioni di porta aperta o cortocircuitata, in modo analogo al calcolo di resistenze e conduttanze equivalenti."
                ]
            },
            {
                "title": "Relazione costitutiva dei due-porte resistivi, 2",
                "content": [
                    "Oltre alle rappresentazioni serie e parallelo, per i due-porte sono frequenti le forme ibride e di trasmissione.",
                    "**Rappresentazione ibrida H**",
                    "$$ \\begin{bmatrix}v_1\\\\i_2\\end{bmatrix}=\\begin{bmatrix}h_{11}&h_{12}\\\\h_{21}&h_{22}\\end{bmatrix}\\begin{bmatrix}i_1\\\\v_2\\end{bmatrix} $$",
                    "**Rappresentazione inversa G**",
                    "$$ \\begin{bmatrix}i_1\\\\v_2\\end{bmatrix}=\\begin{bmatrix}g_{11}&g_{12}\\\\g_{21}&g_{22}\\end{bmatrix}\\begin{bmatrix}v_1\\\\i_2\\end{bmatrix} $$",
                    "**Rappresentazione di trasmissione**",
                    "$$ \\begin{bmatrix}v_1\\\\i_1\\end{bmatrix}=\\begin{bmatrix}A&B\\\\C&D\\end{bmatrix}\\begin{bmatrix}v_2\\\\-i_2\\end{bmatrix} $$",
                    "La forma di trasmissione è particolarmente comoda per reti collegate in cascata, perché le matrici dei singoli blocchi si moltiplicano."
                ]
            },
            {
                "title": "Proprietà dei due-porte",
                "content": [
                    "Un due-porte può essere sostituito da un circuito equivalente che realizza la stessa relazione costitutiva. La scelta del circuito dipende dalla rappresentazione usata.",
                    "**Reciprocità**",
                    "Un due-porte passivo reciproco ha coefficienti incrociati simmetrici nella forma appropriata, ad esempio:",
                    "$$ R_{12}=R_{21}\\qquad\\text{oppure}\\qquad G_{12}=G_{21} $$",
                    "**Collegamenti tra due-porte**",
                    "Nei collegamenti in serie si sommano le matrici di resistenza; nei collegamenti in parallelo si sommano le matrici di conduttanza; nei collegamenti in cascata si moltiplicano le matrici di trasmissione.",
                    "$$ R_{eq}=R_a+R_b,\\qquad G_{eq}=G_a+G_b,\\qquad T_{eq}=T_aT_b $$"
                ]
            }
        ]
    },
    {
        "id": "9-analisi-nodale",
        "title": "Analisi nodale",
        "subsections": [
            {
                "title": "Simulazione circuitale",
                "content": [
                    "I simulatori circuitali, come SPICE, risolvono automaticamente le equazioni del circuito partendo da una descrizione dei componenti e dei nodi.",
                    "**Fasi principali**",
                    "● **Data entry:** descrizione del circuito tramite netlist o schema grafico.",
                    "● **Libreria componenti:** modelli dei dispositivi usati dal simulatore.",
                    "● **Generazione equazioni:** scrittura automatica di KCL, KVL e relazioni costitutive.",
                    "● **Motore numerico:** soluzione del sistema algebrico o differenziale.",
                    "● **Output:** tensioni, correnti, potenze, grafici e analisi richieste.",
                    "L’analisi nodale e l’analisi nodale modificata sono alla base di molti simulatori perché riducono il numero di incognite e sono facilmente automatizzabili."
                ]
            },
            {
                "title": "Analisi nodale",
                "content": [
                    "L’analisi nodale usa come incognite principali le tensioni dei nodi rispetto a massa. È particolarmente efficiente nei circuiti controllati in tensione.",
                    "![Esempio di analisi nodale|right|small](/elettrotecnica-images/nodal-analysis.svg)",
                    "Per ogni nodo non di riferimento si scrive la KCL, esprimendo le correnti tramite le tensioni di nodo.",
                    "$$ G\\,e=i $$",
                    "La matrice $G$ raccoglie le conduttanze: sulla diagonale compare la somma delle conduttanze incidenti al nodo; fuori diagonale compare l’opposto della conduttanza fra due nodi.",
                    "$$ G_{jj}=\\sum G_{incidenti\\ a\\ j},\\qquad G_{jk}=-\\sum G_{fra\\ j\\ e\\ k} $$",
                    "Il termine noto contiene i generatori di corrente, con segno scelto in base alla convenzione delle correnti entranti o uscenti dal nodo."
                ]
            },
            {
                "title": "Analisi nodale modificata",
                "content": [
                    "L’analisi nodale modificata estende l’analisi nodale ai circuiti con generatori di tensione, induttori, trasformatori ideali e altri dispositivi non direttamente controllati in tensione.",
                    "Alle tensioni di nodo si aggiungono come incognite alcune correnti di lato, poi si inseriscono nel sistema le relazioni costitutive corrispondenti.",
                    "$$ \\begin{bmatrix}G&B\\\\C&D\\end{bmatrix}\\begin{bmatrix}e\\\\i_x\\end{bmatrix}=\\begin{bmatrix}b\\\\d\\end{bmatrix} $$",
                    "È il metodo più usato nei simulatori perché permette una procedura uniforme per una classe ampia di circuiti."
                ]
            }
        ]
    },
    {
        "id": "10-diodi-ideali-e-dispositivi-lineari-a-tratti",
        "title": "Diodi ideali e dispositivi lineari a tratti",
        "subsections": [
            {
                "title": "Dispositivi lineari a tratti",
                "content": [
                    "Un dispositivo è **lineare a tratti** quando la sua caratteristica tensione-corrente è descritta da leggi lineari diverse in regioni diverse del piano $v$-$i$.",
                    "![Simbolo del diodo|right|small](/elettrotecnica-images/diode-symbol.svg)",
                    "**Diodo ideale**",
                    "Il diodo ideale conduce in un solo verso. In polarizzazione diretta si comporta come un corto circuito; in polarizzazione inversa come un circuito aperto.",
                    "$$ \\begin{cases}v_D=0,\\ i_D\\ge 0 & \\text{diodo ON}\\\\ i_D=0,\\ v_D\\le 0 & \\text{diodo OFF}\\end{cases} $$",
                    "Un diodo reale a semiconduttore ha una transizione graduale, ma il modello ideale è spesso sufficiente per l’analisi circuitale di base."
                ]
            },
            {
                "title": "Soluzione di circuiti con un solo diodo",
                "content": [
                    "Per risolvere un circuito con un solo diodo ideale si sostituisce il resto della rete con il suo equivalente Thévenin o Norton visto dai morsetti del diodo.",
                    "**Procedura**",
                    "1. Si calcola l’equivalente della rete esterna ai morsetti del diodo.",
                    "2. Si ipotizza il diodo ON o OFF.",
                    "3. Si risolve il circuito equivalente.",
                    "4. Si verifica la coerenza: ON richiede $i_D\\ge 0$, OFF richiede $v_D\\le 0$.",
                    "Se l’ipotesi non è coerente, si usa l’altro stato."
                ]
            },
            {
                "title": "Soluzione grafica di circuiti con dispositivi lineari a tratti",
                "content": [
                    "Quando sono presenti più dispositivi lineari a tratti, ogni combinazione di stati definisce una regione lineare diversa.",
                    "Il metodo grafico consiste nel tracciare la caratteristica del dispositivo non lineare e la **retta di carico** vista dal resto del circuito.",
                    "$$ i=\\frac{E-v}{R} $$",
                    "Il punto di lavoro è l’intersezione fra la caratteristica del dispositivo e la retta di carico. La soluzione deve cadere nel tratto coerente con lo stato assunto."
                ]
            }
        ]
    },
    {
        "id": "11-amplificatore-operazionale-a-o",
        "title": "Amplificatore operazionale (A.O.)",
        "subsections": [
            {
                "title": "Introduzione",
                "content": [
                    "L’amplificatore operazionale è un dispositivo attivo usato per realizzare amplificatori, sommatori, buffer, filtri e controlli analogici.",
                    "Nel corso viene usato soprattutto il modello ideale, sufficiente per capire il comportamento esterno dei circuiti con retroazione negativa.",
                    "Le alimentazioni reali limitano la tensione di uscita, ma nel modello ideale si assume che l’uscita resti nella zona lineare finché il circuito lo richiede."
                ]
            },
            {
                "title": "L'amplificatore operazionale ideale",
                "content": [
                    "**Componente: Amplificatore operazionale**",
                    "![Simbolo dell’amplificatore operazionale|right|small](/elettrotecnica-images/opamp-symbol.svg)",
                    "L’amplificatore operazionale confronta la tensione all’ingresso non invertente $v_+$ con quella all’ingresso invertente $v_-$.",
                    "$$ v_o=A\\,(v_+-v_-) $$",
                    "Nel modello ideale si assume guadagno infinito, resistenza d’ingresso infinita e resistenza d’uscita nulla:",
                    "$$ A\\to\\infty,\\qquad i_+=i_-=0 $$",
                    "Se l’operazionale lavora in zona lineare con retroazione negativa, la differenza d’ingresso tende a zero:",
                    "$$ v_+=v_- $$",
                    "Questa uguaglianza è detta **cortocircuito virtuale**: le tensioni sono uguali, ma fra i due ingressi non scorre corrente."
                ]
            },
            {
                "title": "Tecniche di analisi di circuiti con A.O",
                "content": [
                    "L’analisi dei circuiti con amplificatore operazionale ideale usa due regole operative:",
                    "$$ i_+=i_-=0,\\qquad v_+=v_-\\quad\\text{se c’è retroazione negativa} $$",
                    "Si scrivono quindi KCL e KVL sui nodi esterni, evitando di applicare la KCL al simbolo semplificato se le alimentazioni non sono disegnate.",
                    "**Amplificatore non invertente**",
                    "$$ v_o=\\left(1+\\frac{R_B}{R_A}\\right)v_s $$",
                    "**Amplificatore invertente**",
                    "$$ v_o=-\\frac{R_f}{R_A}v_i $$",
                    "Il vantaggio principale è che il guadagno dipende dai rapporti resistivi e non dai dettagli interni dell’operazionale ideale."
                ]
            },
            {
                "title": "Esempi di applicazione",
                "content": [
                    "**Amplificatore invertente**",
                    "$$ v_o=-\\frac{R_f}{R_{in}}v_i $$",
                    "**Amplificatore non invertente**",
                    "$$ v_o=\\left(1+\\frac{R_f}{R_A}\\right)v_i $$",
                    "**Buffer di tensione**",
                    "Ha guadagno unitario ma disaccoppia il generatore dal carico: la tensione di uscita non dipende idealmente dalla resistenza del carico.",
                    "$$ v_o=v_i $$",
                    "**Sommatore invertente**",
                    "$$ v_o=-R_f\\sum_k \\frac{v_k}{R_k} $$",
                    "Variando le resistenze d’ingresso si regolano i pesi della combinazione lineare."
                ]
            }
        ]
    },
    {
        "id": "12-dispositivi-dinamici-induttori-e-condensatori",
        "title": "Dispositivi dinamici: induttori e condensatori",
        "subsections": [
            {
                "title": "Introduzione",
                "content": [
                    "Condensatori e induttori sono dispositivi dinamici: la loro relazione costitutiva contiene derivate o integrali, quindi lo stato dipende dalla storia passata.",
                    "Il condensatore conserva energia nel campo elettrico; l’induttore conserva energia nel campo magnetico.",
                    "$$ w_C=\\frac{1}{2}Cv_C^2,\\qquad w_L=\\frac{1}{2}Li_L^2 $$"
                ]
            },
            {
                "title": "Il condensatore",
                "content": [
                    "**Componente: Condensatore lineare**",
                    "![Simbolo del condensatore|right|small](/elettrotecnica-images/capacitor-symbol.svg)",
                    "Un condensatore accumula carica sulle armature. Nel modello lineare la carica è proporzionale alla tensione.",
                    "$$ q(t)=C v_C(t) $$",
                    "Derivando la carica si ottiene la relazione costitutiva:",
                    "$$ i_C(t)=C\\frac{dv_C(t)}{dt} $$",
                    "La tensione dipende dalla corrente accumulata nel tempo, quindi il condensatore ha memoria:",
                    "$$ v_C(t)=v_C(t_0)+\\frac{1}{C}\\int_{t_0}^{t} i_C(\\tau)\\,d\\tau $$",
                    "A regime continuo, se $v_C$ è costante, $i_C=0$: il condensatore si comporta come un circuito aperto.",
                    "$$ w_C(t)=\\frac{1}{2}Cv_C^2(t) $$"
                ]
            },
            {
                "title": "L’induttore",
                "content": [
                    "**Componente: Induttore lineare**",
                    "![Simbolo dell’induttore|right|small](/elettrotecnica-images/inductor-symbol.svg)",
                    "Un induttore lega il flusso magnetico concatenato alla corrente. Nel modello lineare il flusso è proporzionale alla corrente.",
                    "$$ \\phi(t)=L i_L(t) $$",
                    "Per la legge di Faraday si ottiene la relazione costitutiva:",
                    "$$ v_L(t)=L\\frac{di_L(t)}{dt} $$",
                    "La corrente dipende dalla tensione accumulata nel tempo, quindi l’induttore ha memoria:",
                    "$$ i_L(t)=i_L(t_0)+\\frac{1}{L}\\int_{t_0}^{t} v_L(\\tau)\\,d\\tau $$",
                    "A regime continuo, se $i_L$ è costante, $v_L=0$: l’induttore si comporta come un corto circuito.",
                    "$$ w_L(t)=\\frac{1}{2}Li_L^2(t) $$"
                ]
            },
            {
                "title": "Comportamento degli elementi dinamici",
                "content": [
                    "La tensione su un condensatore non può cambiare istantaneamente senza una corrente impulsiva; la corrente in un induttore non può cambiare istantaneamente senza una tensione impulsiva.",
                    "$$ v_C(0^+)=v_C(0^-),\\qquad i_L(0^+)=i_L(0^-) $$",
                    "**Condensatori**",
                    "$$ C_{eq,parallelo}=\\sum_k C_k,\\qquad \\frac{1}{C_{eq,serie}}=\\sum_k\\frac{1}{C_k} $$",
                    "**Induttori non accoppiati**",
                    "$$ L_{eq,serie}=\\sum_k L_k,\\qquad \\frac{1}{L_{eq,parallelo}}=\\sum_k\\frac{1}{L_k} $$",
                    "Le condizioni iniziali sono parte del problema: senza di esse la soluzione dei circuiti dinamici non è completa."
                ]
            }
        ]
    },
    {
        "id": "13-circuiti-elettrici-in-regime-sinusoidale-permanente-1",
        "title": "Circuiti elettrici in regime sinusoidale permanente, 1",
        "subsections": [
            {
                "title": "Circuiti in RSP",
                "content": [
                    "Un circuito è in **regime sinusoidale permanente** quando tutti i generatori sono sinusoidali, isofrequenziali e i transitori sono esauriti.",
                    "![Forma d’onda sinusoidale|right|small](/elettrotecnica-images/sine-voltage.svg)",
                    "$$ x(t)=X_M\\cos(\\omega t+\\varphi) $$",
                    "In RSP tutte le tensioni e correnti hanno la stessa pulsazione $\\omega$ e differiscono solo per ampiezza e fase.",
                    "Per semplificare i calcoli si usano i fasori, cioè numeri complessi che conservano ampiezza efficace e fase della sinusoide."
                ]
            },
            {
                "title": "I fasori",
                "content": [
                    "A una sinusoide si associa un fasore eliminando il fattore comune $e^{j\\omega t}$.",
                    "$$ s(t)=S_M\\cos(\\omega t+\\varphi)=\\operatorname{Re}\\{S_M e^{j\\varphi}e^{j\\omega t}\\} $$",
                    "Usando il valore efficace, la convenzione elettrotecnica più comune è:",
                    "$$ \\underline S=S e^{j\\varphi},\\qquad S=\\frac{S_M}{\\sqrt2} $$",
                    "Il fasore contiene modulo efficace e fase, ma non la pulsazione, perché in RSP la pulsazione è comune a tutto il circuito.",
                    "$$ s(t)=\\sqrt2\\,|\\underline S|\\cos(\\omega t+\\arg\\underline S) $$"
                ]
            },
            {
                "title": "Proprietà dei fasori",
                "content": [
                    "**Unicità**",
                    "Due sinusoidi isofrequenziali sono uguali se e solo se hanno lo stesso fasore.",
                    "**Linearità**",
                    "Il fasore di una combinazione lineare reale di sinusoidi isofrequenziali è la stessa combinazione lineare dei fasori.",
                    "$$ \\alpha s_1(t)+\\beta s_2(t)\\ \\longleftrightarrow\\ \\alpha\\underline S_1+\\beta\\underline S_2 $$",
                    "**Derivata e integrale**",
                    "$$ \\frac{d}{dt}s(t)\\ \\longleftrightarrow\\ j\\omega\\underline S,\\qquad \\int s(t)\\,dt\\ \\longleftrightarrow\\ \\frac{\\underline S}{j\\omega} $$",
                    "Queste proprietà trasformano equazioni differenziali lineari in equazioni algebriche complesse."
                ]
            }
        ]
    },
    {
        "id": "14-circuiti-elettrici-in-regime-sinusoidale-permanente-2",
        "title": "Circuiti elettrici in regime sinusoidale permanente, 2",
        "subsections": [
            {
                "title": "LK e relazioni costitutive in R.S.P.",
                "content": [
                    "Grazie alla linearità dei fasori, KCL e KVL mantengono la stessa forma anche in regime sinusoidale permanente.",
                    "$$ \\sum_k \\underline I_k=0,\\qquad \\sum_k \\underline V_k=0 $$",
                    "**Resistore**",
                    "$$ \\underline V_R=R\\underline I_R $$",
                    "**Induttore**",
                    "$$ \\underline V_L=j\\omega L\\,\\underline I_L $$",
                    "**Condensatore**",
                    "$$ \\underline I_C=j\\omega C\\,\\underline V_C $$",
                    "Nell’induttore la tensione è in anticipo di $90^\\circ$ sulla corrente; nel condensatore la corrente è in anticipo di $90^\\circ$ sulla tensione."
                ]
            },
            {
                "title": "Impedenza",
                "content": [
                    "L’**impedenza** è il rapporto fra fasore di tensione e fasore di corrente. È un numero complesso, non un fasore.",
                    "$$ Z=\\frac{\\underline V}{\\underline I}=R+jX,\\qquad Y=\\frac{1}{Z}=G+jB $$",
                    "**Impedenze elementari**",
                    "$$ Z_R=R,\\qquad Z_L=j\\omega L,\\qquad Z_C=\\frac{1}{j\\omega C} $$",
                    "**Serie e parallelo**",
                    "$$ Z_{eq,serie}=\\sum_k Z_k,\\qquad Y_{eq,parallelo}=\\sum_k Y_k $$",
                    "**Partitori in RSP**",
                    "$$ \\underline V_k=\\underline V\\frac{Z_k}{\\sum_j Z_j},\\qquad \\underline I_k=\\underline I\\frac{Y_k}{\\sum_j Y_j} $$"
                ]
            },
            {
                "title": "Risonanza",
                "content": [
                    "La risonanza avviene quando la parte reattiva equivalente si annulla e il circuito visto ai morsetti diventa puramente resistivo.",
                    "**RLC serie**",
                    "$$ Z=R+j\\left(\\omega L-\\frac{1}{\\omega C}\\right) $$",
                    "**RLC parallelo**",
                    "$$ Y=G+j\\left(\\omega C-\\frac{1}{\\omega L}\\right) $$",
                    "In entrambi i casi la pulsazione di risonanza ideale è:",
                    "$$ \\omega_0=\\frac{1}{\\sqrt{LC}} $$",
                    "Sotto risonanza prevale il comportamento capacitivo o induttivo a seconda della configurazione; sopra risonanza prevale il comportamento opposto."
                ]
            }
        ]
    },
    {
        "id": "15-metodi-e-tecniche-di-soluzione-di-circuiti-in-r-s-p",
        "title": "Metodi e tecniche di soluzione di circuiti in R.S.P.",
        "subsections": [
            {
                "title": "Tecniche di riduzione",
                "content": [
                    "In RSP le tecniche del caso resistivo-lineare restano valide sostituendo resistenze e conduttanze con impedenze e ammettenze complesse.",
                    "**Thévenin in RSP**",
                    "$$ \\underline V=\\underline E_{Th}-Z_{Th}\\underline I $$",
                    "**Norton in RSP**",
                    "$$ \\underline I=\\underline J_N-Y_N\\underline V $$",
                    "Si spengono i generatori indipendenti sinusoidali e si calcola $Z_{Th}$ o $Y_N$ ai morsetti. Poi si calcola la tensione a vuoto o la corrente di corto circuito.",
                    "$$ \\underline J_N=\\frac{\\underline E_{Th}}{Z_{Th}},\\qquad Y_N=\\frac{1}{Z_{Th}} $$",
                    "Anche trasformazioni stella-triangolo, serie-parallelo e partitori si applicano con grandezze complesse."
                ]
            },
            {
                "title": "Analisi nodale",
                "content": [
                    "L’analisi nodale si applica anche in RSP usando fasori e ammettenze complesse.",
                    "![Esempio di analisi nodale|right|small](/elettrotecnica-images/nodal-analysis.svg)",
                    "$$ Y\\,e=i $$",
                    "Gli elementi diagonali della matrice sono somme di ammettenze incidenti al nodo; gli elementi fuori diagonale sono le ammettenze fra nodi cambiate di segno.",
                    "$$ Y_{jj}=\\sum Y_{incidenti\\ a\\ j},\\qquad Y_{jk}=-\\sum Y_{fra\\ j\\ e\\ k} $$",
                    "Il termine noto contiene i fasori dei generatori di corrente. La nodale modificata resta identica nella struttura, ma usa coefficienti complessi."
                ]
            },
            {
                "title": "Principio di sovrapposizione degli effetti (PSE)",
                "content": [
                    "Il principio di sovrapposizione vale anche in RSP per circuiti lineari, usando fasori complessi.",
                    "$$ \\underline X=\\sum_k \\underline X_k $$",
                    "Se i generatori hanno frequenze diverse, si risolve il circuito separatamente per ciascuna frequenza. I risultati finali si sommano nel dominio del tempo, non come fasori unici.",
                    "La potenza non si sovrappone direttamente perché dipende dal prodotto di tensione e corrente."
                ]
            }
        ]
    },
    {
        "id": "16-potenze-in-r-s-p",
        "title": "Potenze in R.S.P.",
        "subsections": [
            {
                "title": "La potenza in RSP",
                "content": [
                    "In RSP la potenza istantanea resta il prodotto di tensione e corrente nel tempo, ma non è sinusoidale alla stessa pulsazione delle grandezze elettriche.",
                    "![Forma d’onda sinusoidale|right|small](/elettrotecnica-images/sine-voltage.svg)",
                    "$$ p(t)=v(t)i(t) $$",
                    "Con fasori efficaci $\\underline V$ e $\\underline I$, e con $\\varphi=\\varphi_V-\\varphi_I$, si definiscono:",
                    "$$ P=VI\\cos\\varphi,\\qquad Q=VI\\sin\\varphi,\\qquad |S|=VI $$",
                    "**Potenza complessa**",
                    "$$ S=P+jQ=\\underline V\\,\\underline I^* $$",
                    "La potenza attiva $P$ si misura in watt, la reattiva $Q$ in var, la apparente $|S|$ in voltampere."
                ]
            },
            {
                "title": "Teorema di Boucherot",
                "content": [
                    "**Teorema: Teorema di Boucherot**",
                    "In un circuito in RSP, se tutti i lati usano la stessa convenzione di segno, la somma algebrica delle potenze complesse è nulla.",
                    "$$ \\sum_{k=1}^{l} S_k=0 $$",
                    "Separando parte reale e immaginaria si ottengono i bilanci di potenza attiva e reattiva:",
                    "$$ \\sum_k P_k=0,\\qquad \\sum_k Q_k=0 $$",
                    "**Idea della dimostrazione**",
                    "Il risultato è la forma in RSP del teorema di Tellegen: i fasori di tensione e corrente soddisfano KVL e KCL, quindi il prodotto complesso bilancia le potenze su tutti i lati."
                ]
            },
            {
                "title": "Problemi relativi alla potenza complessa in RSP",
                "content": [
                    "**Rifasamento**",
                    "Le linee dissipano potenza attiva proporzionale al quadrato della corrente. A parità di potenza attiva utile, ridurre la potenza reattiva riduce la corrente e quindi le perdite.",
                    "$$ P_D=R_D\\frac{P_L^2+Q_L^2}{V_L^2} $$",
                    "Per carichi ohmico-induttivi si usa spesso un condensatore in parallelo, in modo da compensare la potenza reattiva induttiva senza cambiare la tensione del carico.",
                    "$$ Q_C=-\\omega C V^2 $$",
                    "**Massimo trasferimento di potenza in RSP**",
                    "La massima potenza attiva viene trasferita quando l’impedenza del carico è il complesso coniugato dell’impedenza interna del generatore.",
                    "$$ Z_L=Z_G^* $$",
                    "**Reti di adattamento**",
                    "Se il carico non è adattato, reti con trasformatori, induttori e condensatori modificano l’impedenza vista dal generatore senza cambiare il carico reale."
                ]
            }
        ]
    },
    {
        "id": "17-circuiti-del-primo-ordine",
        "title": "Circuiti del primo ordine",
        "subsections": [
            {
                "title": "Circuiti dinamici",
                "content": [
                    "Un circuito dinamico contiene almeno un elemento con memoria. In continua, dopo l’esaurimento del transitorio, il condensatore si comporta come un circuito aperto e l’induttore come un corto circuito.",
                    "![Risposta di un circuito RC|large](/elettrotecnica-images/rc-response.svg)",
                    "$$ i_C=C\\frac{dv_C}{dt},\\qquad v_L=L\\frac{di_L}{dt} $$",
                    "Le energie immagazzinate sono:",
                    "$$ w_C=\\frac{1}{2}Cv_C^2,\\qquad w_L=\\frac{1}{2}Li_L^2 $$",
                    "I circuiti RC e RL autonomi scaricano l’energia iniziale su una resistenza con andamento esponenziale."
                ]
            },
            {
                "title": "Circuiti del primo ordine",
                "content": [
                    "Un circuito del primo ordine contiene una sola variabile di stato indipendente: $v_C$ per un condensatore oppure $i_L$ per un induttore.",
                    "**Forma standard**",
                    "$$ \\frac{dx(t)}{dt}+\\frac{1}{\\tau}x(t)=\\frac{1}{\\tau}x(\\infty) $$",
                    "**Soluzione**",
                    "$$ x(t)=x(\\infty)+\\big[x(0^+)-x(\\infty)\\big]e^{-t/\\tau} $$",
                    "**Costanti di tempo**",
                    "$$ \\tau_{RC}=R_{eq}C,\\qquad \\tau_{RL}=\\frac{L}{R_{eq}} $$",
                    "La procedura pratica è: calcolare lo stato iniziale, sostituire la parte resistiva con Thévenin o Norton, ricavare $\\tau$ e infine applicare la soluzione esponenziale."
                ]
            },
            {
                "title": "Circuiti con sorgenti costanti a tratti",
                "content": [
                    "Quando una sorgente cambia valore a istanti prefissati, si risolve il circuito separatamente in ogni intervallo temporale.",
                    "All’inizio di ogni intervallo si usano le condizioni di continuità:",
                    "$$ v_C(t_0^+)=v_C(t_0^-),\\qquad i_L(t_0^+)=i_L(t_0^-) $$",
                    "Poi si calcola il nuovo valore finale $x(\\infty)$ relativo alla configurazione valida in quell’intervallo.",
                    "$$ x(t)=x(\\infty)+\\big[x(t_0^+)-x(\\infty)\\big]e^{-(t-t_0)/\\tau} $$",
                    "Il grafico risultante è una successione di tratti esponenziali raccordati dalla variabile di stato continua."
                ]
            }
        ]
    },
    {
        "id": "18-introduzione",
        "title": "Introduzione",
        "subsections": [
            {
                "title": "Richiami ai campi scalari e vettoriali",
                "content": [
                    "Un **campo scalare** associa a ogni punto dello spazio un numero; un **campo vettoriale** associa a ogni punto un vettore.",
                    "**Flusso di un campo vettoriale**",
                    "Il flusso misura quanta componente normale del campo attraversa una superficie orientata.",
                    "$$ \\Phi_S(\\mathbf F)=\\int_S \\mathbf F\\cdot\\mathbf n\\,dS $$",
                    "**Circuitazione di un campo vettoriale**",
                    "La circuitazione misura la componente tangenziale del campo lungo una curva chiusa orientata.",
                    "$$ \\Gamma_C(\\mathbf F)=\\oint_C \\mathbf F\\cdot\\mathbf t\\,dl $$",
                    "Il verso del contorno e quello della normale alla superficie sono normalmente associati con la regola della mano destra."
                ]
            }
        ]
    },
    {
        "id": "19-campo-elettrico-e-di-conduzione",
        "title": "Campo elettrico e di conduzione",
        "subsections": [
            {
                "title": "Parte prima",
                "content": [
                    "Le cariche elettriche generano fenomeni elettromagnetici. In condizioni statiche si può studiare il campo elettrico separatamente dal campo magnetico.",
                    "**Legge di Coulomb**",
                    "$$ \\mathbf F=\\frac{1}{4\\pi\\varepsilon}\\frac{q_1q_2}{r^2}\\,\\mathbf u_r $$",
                    "**Densità volumetrica di carica**",
                    "$$ \\rho=\\frac{dQ}{dV} $$",
                    "**Densità di corrente**",
                    "$$ \\mathbf J=\\rho\\mathbf v,\\qquad i=\\int_S \\mathbf J\\cdot\\mathbf n\\,dS $$",
                    "**Campo di induzione elettrica e legge di Gauss**",
                    "$$ \\oint_S \\mathbf D\\cdot\\mathbf n\\,dS=Q_{int} $$",
                    "In un mezzo lineare e isotropo il campo elettrico è proporzionale al campo di induzione elettrica:",
                    "$$ \\mathbf D=\\varepsilon\\mathbf E $$"
                ]
            },
            {
                "title": "Parte seconda",
                "content": [
                    "**Forza elettrica**",
                    "$$ \\mathbf F=q\\mathbf E $$",
                    "**Tensione e lavoro elettrico**",
                    "Se il campo è conservativo, la tensione tra due punti è indipendente dal percorso scelto.",
                    "$$ v_{AB}=\\int_A^B \\mathbf E\\cdot d\\mathbf l $$",
                    "**Conducibilità**",
                    "Nei materiali ohmici la densità di corrente è proporzionale al campo elettrico.",
                    "$$ \\mathbf J=\\gamma\\mathbf E $$",
                    "**Conduttanza di un conduttore uniforme**",
                    "$$ G=\\gamma\\frac{S}{l},\\qquad R=\\frac{1}{G}=\\frac{l}{\\gamma S} $$",
                    "**Capacità di un condensatore piano**",
                    "$$ C=\\varepsilon\\frac{S}{h},\\qquad q=Cv $$"
                ]
            }
        ]
    },
    {
        "id": "20-campo-magnetico",
        "title": "Campo magnetico",
        "subsections": [
            {
                "title": "Campo di induzione magnetica e Legge di Faraday",
                "content": [
                    "Cariche in movimento e correnti generano un campo di induzione magnetica $\\mathbf B$. Una carica in moto in un campo magnetico subisce la forza di Lorentz.",
                    "![Campo magnetico di un solenoide|right|small](/elettrotecnica-images/solenoid-field.svg)",
                    "$$ \\mathbf F=q(\\mathbf E+\\mathbf v\\times\\mathbf B) $$",
                    "**Flusso magnetico**",
                    "$$ \\Phi=\\int_S \\mathbf B\\cdot\\mathbf n\\,dS $$",
                    "**Legge di Faraday-Neumann-Lenz**",
                    "Un flusso magnetico variabile induce una forza elettromotrice che si oppone alla variazione del flusso.",
                    "$$ e=-\\frac{d\\Phi}{dt} $$",
                    "Con $N$ spire concatenate dallo stesso flusso:",
                    "$$ e=-N\\frac{d\\Phi}{dt} $$"
                ]
            },
            {
                "title": "Correnti elettriche e campi magnetici, la Legge di Ampère",
                "content": [
                    "**Campo magnetico**",
                    "Nei materiali lineari e isotropi induzione magnetica e campo magnetico sono legati dalla permeabilità.",
                    "$$ \\mathbf B=\\mu\\mathbf H $$",
                    "**Legge di Ampère**",
                    "$$ \\oint_C \\mathbf H\\cdot d\\mathbf l=I_{concatenata} $$",
                    "Per un solenoide toroidale ideale con $N$ spire, lunghezza media $l$ e sezione $S$:",
                    "$$ H=\\frac{Ni}{l},\\qquad \\Phi=\\frac{\\mu S}{l}Ni $$",
                    "**Induttanza e riluttanza**",
                    "$$ L=\\frac{N^2\\mu S}{l},\\qquad \\mathcal R=\\frac{l}{\\mu S} $$",
                    "**Legge di Hopkinson**",
                    "$$ \\Phi=\\frac{Ni}{\\mathcal R} $$"
                ]
            },
            {
                "title": "Componenti elettrici lineari",
                "content": [
                    "Le leggi di campo portano ai tre modelli lineari fondamentali usati nei circuiti.",
                    "**Resistore**",
                    "$$ v=Ri $$",
                    "**Condensatore**",
                    "$$ i=C\\frac{dv}{dt} $$",
                    "**Induttore**",
                    "$$ v=L\\frac{di}{dt} $$",
                    "Quando due avvolgimenti condividono parte del flusso magnetico compare la mutua induttanza.",
                    "$$ \\begin{bmatrix}\\lambda_1\\\\\\lambda_2\\end{bmatrix}=\\begin{bmatrix}L_1&M\\\\M&L_2\\end{bmatrix}\\begin{bmatrix}i_1\\\\i_2\\end{bmatrix} $$",
                    "Il segno di $M$ dipende dalla convenzione dei versi degli avvolgimenti e dei flussi concatenati."
                ]
            }
        ]
    },
    {
        "id": "21-introduzione-alle-macchine-elettriche",
        "title": "Introduzione alle macchine elettriche",
        "subsections": [
            {
                "title": "Introduzione",
                "content": [
                    "Nei dispositivi magnetici con nucleo ferromagnetico si assume spesso che il flusso sia confinato nel nucleo e che campo e induzione siano quasi uniformi in ogni tratto.",
                    "Queste ipotesi permettono di descrivere il sistema magnetico con un circuito equivalente, analogo a un circuito elettrico resistivo.",
                    "**Grandezze geometriche**",
                    "La sezione $S$ è l’area del nucleo attraversata dal flusso; la lunghezza $l$ è misurata lungo la linea media del nucleo.",
                    "$$ \\mathcal R=\\frac{l}{\\mu S} $$",
                    "La riluttanza cresce con la lunghezza e diminuisce con permeabilità e sezione."
                ]
            },
            {
                "title": "Modello circuitale equivalente",
                "content": [
                    "Nel modello magnetico equivalente, la riluttanza corrisponde alla resistenza, il flusso corrisponde alla corrente e la forza magnetomotrice corrisponde alla tensione impressa.",
                    "$$ \\mathcal F=Ni,\\qquad \\Phi=\\frac{\\mathcal F}{\\mathcal R} $$",
                    "**Legge di Kirchhoff per i flussi magnetici**",
                    "La somma algebrica dei flussi che attraversano una superficie chiusa è nulla.",
                    "$$ \\sum_k \\Phi_k=0 $$",
                    "**Legge di Kirchhoff per le tensioni magnetiche**",
                    "La somma delle cadute magnetiche lungo una maglia è uguale alla forza magnetomotrice concatenata.",
                    "$$ \\sum_k \\mathcal R_k\\Phi_k=\\sum_m N_m i_m $$",
                    "I traferri hanno permeabilità molto più bassa del ferro, quindi spesso dominano la riluttanza totale del circuito magnetico."
                ]
            },
            {
                "title": "Auto e mutua induttanza",
                "content": [
                    "Per calcolare auto e mutue induttanze si risolve prima il circuito magnetico equivalente e si ricavano i flussi concatenati con ogni avvolgimento.",
                    "**Procedura**",
                    "1. Si esprime ogni flusso come funzione delle correnti negli avvolgimenti.",
                    "2. Si calcola il flusso concatenato $\\lambda_k=N_k\\Phi_k$ per ogni avvolgimento.",
                    "3. Si confronta il risultato con la forma lineare flusso-corrente.",
                    "$$ \\lambda_1=L_1i_1+Mi_2,\\qquad \\lambda_2=Mi_1+L_2i_2 $$",
                    "Le autoinduttanze dipendono dal flusso generato dallo stesso avvolgimento; la mutua induttanza dipende dal flusso condiviso con gli altri avvolgimenti."
                ]
            }
        ]
    },
    {
        "id": "22-proprieta-dei-materiali",
        "title": "Proprietà dei materiali",
        "subsections": [
            {
                "title": "Proprietà dei materiali",
                "content": [
                    "**Conducibilità elettrica**",
                    "![Ciclo di isteresi B-H|right|small](/elettrotecnica-images/bh-loop.svg)",
                    "$$ \\mathbf J=\\gamma\\mathbf E $$",
                    "La conducibilità $\\gamma$ misura quanto facilmente un materiale conduce corrente. Nei metalli è alta e varia con la temperatura; nei dielettrici è molto bassa.",
                    "**Permettività dielettrica**",
                    "$$ \\mathbf D=\\varepsilon\\mathbf E,\\qquad \\varepsilon=\\varepsilon_r\\varepsilon_0 $$",
                    "Una permettività elevata permette di ottenere capacità maggiori a parità di geometria.",
                    "**Permeabilità magnetica**",
                    "$$ \\mathbf B=\\mu\\mathbf H,\\qquad \\mu=\\mu_r\\mu_0 $$",
                    "I materiali ferromagnetici hanno permeabilità elevata ma spesso non lineare.",
                    "**Isteresi**",
                    "Nel ciclo $B$-$H$, l’induzione non dipende solo dal valore istantaneo di $H$, ma anche dalla magnetizzazione precedente. Materiali duri mantengono forte induzione residua; materiali morbidi hanno ciclo stretto e sono preferiti in trasformatori e motori."
                ]
            }
        ]
    },
    {
        "id": "23-introduzione-alle-macchine-elettriche",
        "title": "Introduzione alle macchine elettriche",
        "subsections": [
            {
                "title": "Il trasformatore",
                "content": [
                    "Le macchine elettriche convertono potenza: i motori da elettrica a meccanica, i generatori da meccanica a elettrica, i trasformatori da elettrica a elettrica con livelli diversi di tensione e corrente.",
                    "![Simbolo del trasformatore|right|small](/elettrotecnica-images/transformer-symbol.svg)",
                    "**Rendimento**",
                    "$$ \\eta=\\frac{P_{out}}{P_{in}}=1-\\frac{P_{perse}}{P_{in}} $$",
                    "**Trasformatore ideale**",
                    "Trascurando dispersioni e perdite, il rapporto di trasformazione dipende dal numero di spire.",
                    "$$ \\frac{v_1}{v_2}=\\frac{N_1}{N_2},\\qquad \\frac{i_1}{i_2}=-\\frac{N_2}{N_1} $$",
                    "Le perdite reali principali sono: effetto Joule negli avvolgimenti, correnti parassite nel nucleo e isteresi del materiale ferromagnetico.",
                    "Le dispersioni di flusso si modellano con induttanze di dispersione; le perdite nel nucleo con resistenze equivalenti in parallelo al ramo di magnetizzazione."
                ]
            },
            {
                "title": "Azioni meccaniche",
                "content": [
                    "Nei convertitori elettromeccanici una porta è elettrica e l’altra è meccanica. Lo scambio energetico avviene tramite campi elettrici o magnetici.",
                    "**Forza di Lorentz**",
                    "$$ \\mathbf F=q(\\mathbf E+\\mathbf v\\times\\mathbf B) $$",
                    "**Potenza meccanica**",
                    "$$ P_m=Fv $$",
                    "**Attuatore capacitivo**",
                    "Se la capacità dipende da una coordinata meccanica $x$, la forza si ricava dall’energia immagazzinata nel campo elettrico.",
                    "$$ W_E=\\frac{1}{2}C(x)v^2,\\qquad F_x=\\frac{1}{2}v^2\\frac{dC}{dx} $$",
                    "**Attuatore magnetico**",
                    "In modo duale, se l’induttanza dipende dalla posizione:",
                    "$$ W_M=\\frac{1}{2}L(x)i^2,\\qquad F_x=\\frac{1}{2}i^2\\frac{dL}{dx} $$"
                ]
            },
            {
                "title": "Macchine lineari e rotanti",
                "content": [
                    "**Macchina lineare**",
                    "Una spira con lato mobile immersa in un campo magnetico mostra la reversibilità elettromeccanica: movimento meccanico genera tensione, corrente elettrica genera forza.",
                    "$$ e=Blv,\\qquad F=Bli $$",
                    "Con perdite elettriche e meccaniche si aggiungono resistenze e attriti al modello ideale.",
                    "**Macchina rotante**",
                    "Una spira che ruota con velocità angolare costante in un campo magnetico vede variare il flusso concatenato.",
                    "$$ \\Phi(t)=BA\\cos(\\omega t) $$",
                    "Per la legge di Faraday, la f.e.m. indotta è sinusoidale:",
                    "$$ e(t)=-\\frac{d\\Phi}{dt}=BA\\omega\\sin(\\omega t) $$",
                    "Questo è il principio base dei generatori in corrente alternata."
                ]
            }
        ]
    }
];

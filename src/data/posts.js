// Conteúdo editorial do Cosmos em Foco.
// Contrato completo em src/data/CONTRATO.md.
// Datas em ISO (YYYY-MM-DD); readingTime em minutos (200 palavras/min).

export const posts = [
  {
    id: '1',
    slug: 'o-misterio-das-galaxias-espirais',
    title: 'O Mistério das Galáxias Espirais',
    excerpt:
      'Como as galáxias espirais se formam, por que seus braços não se enrolam e o que a Via Láctea revela sobre a evolução do universo.',
    content: [
      {
        type: 'paragraph',
        text: 'Quando Edwin Hubble organizou suas placas fotográficas na década de 1920, percebeu que boa parte das nebulosas distantes tinha um desenho inconfundível: um núcleo brilhante de onde partiam braços curvados, como um cata-vento de luz. Essas galáxias espirais, hoje sabemos, concentram a maior parte da formação estelar do universo próximo e guardam pistas sobre como o gás primordial se transformou nos discos que observamos.',
      },
      {
        type: 'paragraph',
        text: 'A classificação proposta por Hubble em 1926 e revisada em 1936 ainda é usada, com ajustes. As espirais aparecem como Sa, Sb ou Sc, conforme o tamanho do bojo central e a abertura dos braços: Sa tem bojo luminoso e braços apertados; Sc tem bojo pequeno e braços bem abertos. A Via Láctea é uma espiral barrada do tipo SBbc, com uma barra de estrelas atravessando o centro.',
      },
      { type: 'heading', text: 'Braços que não são braços' },
      {
        type: 'paragraph',
        text: 'Um erro comum é imaginar os braços como pás de um moinho, feitas sempre das mesmas estrelas. Na verdade, eles são regiões de maior densidade — ondas de compressão que percorrem o disco. A teoria da onda de densidade, formulada por C. C. Lin e Frank Shu em 1964, explica que o gás, ao entrar nessas regiões, é comprimido e forma estrelas azuis e brilhantes. São essas estrelas jovens que desenham o braço aos nossos olhos, enquanto as estrelas velhas e avermelhadas dominam o espaço entre eles.',
      },
      {
        type: 'quote',
        text: 'A estrutura espiral não é feita de estrelas fixas, mas de um padrão que viaja pelo disco como uma onda.',
        cite: 'Teoria da onda de densidade, Lin e Shu (1964)',
      },
      {
        type: 'paragraph',
        text: 'Isso resolve o chamado problema do enrolamento. Se os braços fossem matéria rígida, a rotação diferencial do disco — mais rápida perto do centro, mais lenta nas bordas — os enrolaria em poucas centenas de milhões de anos. Como o padrão é uma onda, ele pode se manter coerente por bilhões de anos, mesmo com o gás e as estrelas atravessando-o continuamente.',
      },
      {
        type: 'list',
        items: [
          'Espirais gran design: dois braços bem definidos, como a M51, a galáxia do Redemoinho.',
          'Espirais floculentas: braços curtos e irregulares, sem simetria clara.',
          'Espirais barradas: uma barra central canaliza gás para o núcleo e alimenta o bojo.',
          'Espirais aneladas: braços fechados em anéis, muitas vezes resultado de interações passadas.',
        ],
      },
      {
        type: 'paragraph',
        text: 'As curvas de rotação foram outra revolução. Nos anos 1970, Vera Rubin e colaboradores mediram a velocidade do gás hidrogênio em galáxias espirais e encontraram algo inesperado: nas regiões externas, a velocidade permanece alta em vez de cair, como previsto pelo material visível. A explicação mais aceita é a presença de um halo de matéria escura, que domina a massa e mantém o disco girando rápido sem se desfazer.',
      },
      {
        type: 'paragraph',
        text: 'Nem toda espiral é igual. As chamadas grand design, como a M51, exibem dois braços dominantes e bem definidos, provavelmente reforçados por interações com galáxias companheiras. Já as floculentas mostram braços curtos e fragmentados, resultado de instabilidades locais no gás. Campos magnéticos também desempenham um papel: observações em rádio revelam linhas de campo alinhadas aos braços, que ajudam a regular a formação estelar e a turbulência do disco.',
      },
      {
        type: 'paragraph',
        text: 'Observar espirais em vários comprimentos de onda revela camadas diferentes. A luz visível mostra estrelas jovens e poeira; o infravermelho, como o do telescópio Spitzer, penetra a poeira e revela o gás aquecido; a linha de 21 centímetros do hidrogênio neutro mapeia o disco até onde ele se torna tênue demais para brilhar. Com o James Webb, é possível estudar a poeira e a formação estelar em detalhes sem precedentes, inclusive em galáxias muito distantes.',
      },
      {
        type: 'paragraph',
        text: 'A imagem de capa mostra uma galáxia espiral em luz ultravioleta, com braços salpicados por regiões de formação estelar. Cada mancha azul é um berçário estelar, e cada berçário é uma promessa de que o ciclo de gás, poeira e estrelas continua. Entender esse ciclo é entender por que o universo, bilhões de anos depois do Big Bang, ainda fabrica estrelas em cata-ventos tão elegantes.',
      },
    ],
    category: 'galaxias',
    categoryLabel: 'Galáxias',
    author: 'Marina Vasconcelos Andrade',
    authorRole: 'Astrofísica e divulgadora científica',
    date: '2026-10-14',
    readingTime: 4,
    imageCover: 'https://images-assets.nasa.gov/image/PIA04921/PIA04921~orig.jpg',
    imageAlt: 'Galáxia de Andrômeda (M31) vista em luz ultravioleta, com braços espirais e regiões azuis de formação estelar.',
    imageCredit: 'NASA/JPL-Caltech',
    tags: ['galáxias', 'via láctea', 'evolução galáctica', 'matéria escura'],
    featured: true,
  },
  {
    id: '2',
    slug: 'via-lactea-um-retrato-da-nossa-casa',
    title: 'Via Láctea: um retrato da nossa casa',
    excerpt:
      'Um passeio pela estrutura da Via Láctea: bojo, disco, halo e os braços espirais que abrigam o Sol — e como mapeamos nossa própria galáxia.',
    content: [
      {
        type: 'paragraph',
        text: 'Em uma noite sem Lua, longe das luzes da cidade, a Via Láctea aparece como uma faixa leitosa atravessando o céu. O que vemos é apenas uma fatia do disco da nossa galáxia, visto de dentro. Estamos a cerca de 26 mil anos-luz do centro, embutidos em um dos braços, e é justamente essa posição interna que torna o mapa da nossa casa um dos quebra-cabeças mais interessantes da astronomia.',
      },
      {
        type: 'paragraph',
        text: 'A Via Láctea é uma espiral barrada com diâmetro estimado entre 100 mil e 120 mil anos-luz, espessura de cerca de mil anos-luz no disco fino e algo entre 100 bilhões e 400 bilhões de estrelas. O Sol completa uma volta ao redor do centro a cada 225 a 250 milhões de anos, em uma órbita que não é circular, mas levemente elíptica e inclinada em relação ao plano do disco.',
      },
      { type: 'heading', text: 'Um disco com camadas' },
      {
        type: 'paragraph',
        text: 'O bojo central concentra estrelas velhas, gás quente e um buraco negro supermassivo, Sagitário A*, com cerca de 4 milhões de massas solares. Ao redor dele, a barra alongada de estrelas funciona como uma via expressa que canaliza gás para o centro. O disco fino, onde o Sol reside, é jovem e rico em gás; o disco espesso, mais antigo, guarda estrelas formadas nas primeiras fases da galáxia.',
      },
      {
        type: 'paragraph',
        text: 'Os braços espirais recebem nomes que parecem mapas de metrô: Perseu, Sagitário-Carina, Escudo-Centauro, Norma e o Braço de Órion, onde o Sistema Solar está. A nomenclatura é imprecisa justamente porque a poeira bloqueia a luz visível no plano galáctico. Para enxergar através dela, os astrônomos combinam infravermelho, rádio e observações de raios gama.',
      },
      {
        type: 'quote',
        text: 'Mapear a Via Láctea é como desenhar a planta de uma casa sem poder sair dela.',
        cite: 'Analogia comum entre astrônomos galácticos',
      },
      { type: 'heading', text: 'O halo e a matéria escura' },
      {
        type: 'paragraph',
        text: 'Ao redor do disco existe o halo estelar, povoado por estrelas muito antigas e por cerca de 150 aglomerados globulares. Mais além, há o halo de matéria escura, invisível, mas detectável pelo efeito gravitacional sobre o movimento de estrelas e gás. Sem ele, as estrelas externas girariam devagar demais para explicar as velocidades medidas — ou o disco se desfaria.',
      },
      {
        type: 'paragraph',
        text: 'A Via Láctea não está sozinha. Ela lidera o Grupo Local, um conjunto de dezenas de galáxias ligadas pela gravidade, do qual também fazem parte Andrômeda e a galáxia do Triângulo. As Nuvens de Magalhães, visíveis a olho nu no hemisfério sul, são suas companheiras mais próximas e funcionam como laboratórios para estudar formação estelar em ambientes com menos metais. Correntes de gás e estrelas, como a Corrente de Magalhães, mostram que essa convivência deixa marcas. O centro galáctico é outro capítulo à parte: a região, a cerca de 26 mil anos-luz de distância, concentra nuvens moleculares gigantes, aglomerados jovens e um ambiente de radiação intensa. A poeira espessa bloqueia a luz visível, mas o infravermelho e o rádio revelam um verdadeiro laboratório de física extrema ao redor de Sagitário A*, com estrelas que orbitam o buraco negro em poucos anos.',
      },
      { type: 'heading', text: 'Como mapeamos nossa própria casa' },
      {
        type: 'paragraph',
        text: 'A missão Gaia, da Agência Espacial Europeia, mediu posições, distâncias e movimentos de quase 2 bilhões de estrelas com precisão sem precedentes. Com esses dados, foi possível reconstruir a estrutura dos braços, identificar correntes de estrelas devoradas pela Via Láctea e até detectar fusões antigas, como a do sistema Gaia-Enceladus. O hidrogênio neutro observado em rádio completa o mapa onde a luz das estrelas não chega.',
      },
      {
        type: 'paragraph',
        text: 'O futuro da galáxia também está escrito. Andrômeda, a cerca de 2,5 milhões de anos-luz, aproxima-se e deve colidir com a Via Láctea em aproximadamente 4,5 bilhões de anos. O resultado provável é uma galáxia elíptica, com o gás comprimido disparando uma última grande onda de formação estelar. Antes disso, porém, ainda teremos muitas noites para olhar para cima e reconhecer, na faixa leitosa, o desenho da nossa casa.',
      },
    ],
    category: 'galaxias',
    categoryLabel: 'Galáxias',
    author: 'Gustavo Pinheiro Azevedo',
    authorRole: 'Astrofísico e professor universitário',
    date: '2026-09-28',
    readingTime: 4,
    imageCover: 'https://images-assets.nasa.gov/image/PIA03654/PIA03654~orig.jpg',
    imageAlt: 'Região central da Via Láctea em infravermelho, com centenas de milhares de estrelas concentradas.',
    imageCredit: 'NASA/JPL-Caltech',
    tags: ['via láctea', 'galáxias', 'gaia', 'matéria escura'],
    featured: false,
  },
  {
    id: '3',
    slug: 'eclipse-lunar-total-a-ciencia-da-lua-de-sangue',
    title: 'Eclipse Lunar Total: a ciência da Lua de Sangue',
    excerpt:
      'Por que a Lua fica vermelha durante um eclipse total, como a luz da Terra a ilumina e o que é preciso para observar o fenômeno.',
    content: [
      {
        type: 'paragraph',
        text: 'Durante um eclipse lunar total, a Lua não desaparece. Ela muda de cor, passando por tons de cobre, tijolo e vinho. O fenômeno acontece quando a Terra se posiciona entre o Sol e a Lua e a sombra do nosso planeta cobre o disco lunar por completo. Diferentemente de um eclipse solar, o lunar pode ser visto de qualquer lugar do lado noturno da Terra e não exige nenhum equipamento especial.',
      },
      {
        type: 'paragraph',
        text: 'A sombra terrestre tem duas partes: a penumbra, onde a luz do Sol é apenas parcialmente bloqueada, e a umbra, onde o bloqueio é total. O eclipse começa quando a Lua entra na penumbra, um escurecimento sutil que costuma passar despercebido. A fase realmente visível começa com o contato com a umbra, quando uma mordida escura aparece em uma das bordas do disco lunar.',
      },
      { type: 'heading', text: 'Por que a Lua fica vermelha' },
      {
        type: 'paragraph',
        text: 'Se a Terra não tivesse atmosfera, a Lua dentro da umbra ficaria completamente negra. Mas a atmosfera terrestre refrata a luz solar para dentro do cone de sombra, e o faz de forma seletiva. As moléculas de nitrogênio e oxigênio espalham com mais eficiência os comprimentos de onda curtos, azuis e violetas — o mesmo efeito de Rayleigh que deixa o céu diurno azul. A luz que sobra e alcança a Lua é predominantemente vermelha e laranja.',
      },
      {
        type: 'paragraph',
        text: 'O resultado é que todos os amanheceres e entardeceres da Terra, somados, projetam-se sobre a Lua ao mesmo tempo. Poeira, cinzas vulcânicas e nuvens altas podem alterar a tonalidade. Após grandes erupções, a Lua costuma parecer mais escura e acinzentada, porque mais partículas bloqueiam a luz. Por isso, a cor de cada eclipse é uma pequena amostra do estado da atmosfera do planeta.',
      },
      {
        type: 'quote',
        text: 'A Lua eclipsada é iluminada, ao mesmo tempo, por todos os nasceres e poentes da Terra.',
        cite: 'Descrição clássica do fenômeno',
      },
      {
        type: 'paragraph',
        text: 'Para padronizar essas observações, o astrônomo André Danjon propôs uma escala de cinco níveis, da Lua quase invisível (L = 0) à Lua vermelha-alaranjada muito brilhante (L = 4). A escala é subjetiva e depende do observador, mas continua útil para comparar eclipses e registrar o efeito de aerossóis na atmosfera.',
      },
      { type: 'heading', text: 'Como observar' },
      {
        type: 'paragraph',
        text: 'Não olhe diretamente para o Sol em nenhuma fase; um eclipse lunar é seguro por definição, pois é a sombra da Terra que cobre a Lua. Escolha um local com horizonte livre e pouca poluição luminosa, e verifique a previsão do tempo. Binóculos ajudam a acompanhar a borda da umbra avançando sobre crateras e mares lunares. Uma câmera em tripé, com exposição de alguns segundos, registra bem as fases parciais; durante a totalidade, é preciso aumentar o tempo de exposição ou o ISO.',
      },
      {
        type: 'list',
        items: [
          'Comece a observar cerca de 20 minutos antes do início da fase total.',
          'Use luz vermelha para preservar a adaptação dos olhos entre uma foto e outra.',
          'Fotografe em intervalos regulares para montar uma sequência da passagem da sombra.',
          'Anote a cor percebida e compare com a escala de Danjon.',
        ],
      },
      {
        type: 'paragraph',
        text: 'Além da beleza, os eclipses lunares têm valor científico. A temperatura da superfície lunar cai rapidamente quando a luz solar é bloqueada, e instrumentos como o Diviner, a bordo da sonda Lunar Reconnaissance Orbiter, usam esses eventos para medir propriedades térmicas do regolito. A luz refratada pela atmosfera também funciona como um experimento natural: comparar o espectro da Lua eclipsada com o de amanheceres permite estudar a composição da alta atmosfera terrestre.',
      },
      {
        type: 'paragraph',
        text: 'O termo “Lua de Sangue” é popular, mas não tem significado astronômico formal. Ele descreve a aparência avermelhada de qualquer eclipse total. O que importa é que o fenômeno é previsível, democrático e visível a olho nu: uma aula de óptica atmosférica oferecida gratuitamente pelo Sistema Solar.',
      },
    ],
    category: 'sistema-solar',
    categoryLabel: 'Sistema Solar',
    author: 'Camila Ferraz de Oliveira',
    authorRole: 'Doutora em ciências planetárias',
    date: '2026-10-02',
    readingTime: 4,
    imageCover: 'https://images-assets.nasa.gov/image/PIA00271/PIA00271~orig.jpg',
    imageAlt: 'Superfície de Vênus em visão global simulada, com tons alaranjados e relevo acidentado.',
    imageCredit: 'NASA/JPL',
    tags: ['lua', 'eclipse lunar', 'atmosfera', 'observação'],
    featured: false,
  },
  {
    id: '4',
    slug: 'europa-o-oceano-escondido-sob-o-gelo',
    title: 'Europa: o oceano escondido sob o gelo',
    excerpt:
      'Sob a crosta de gelo de Europa, um oceano salgado pode abrigar condições para a vida. Entenda as evidências e as missões que vão investigá-lo.',
    content: [
      {
        type: 'paragraph',
        text: 'Quando Galileu apontou seu telescópio para Júpiter, em 1610, viu quatro pontos de luz que mudavam de posição noite após noite. Um deles era Europa, uma lua do tamanho da nossa Lua, mas com uma superfície completamente diferente: uma casca de gelo rachada, sem crateras antigas em grande número, como se estivesse sendo constantemente renovada.',
      },
      {
        type: 'paragraph',
        text: 'A superfície lisa e as intrincadas linhas escuras que a cortam sugerem um gelo jovem, quebrado e remendado por processos internos. A explicação mais aceita é que existe um oceano de água líquida sob uma crosta de gelo de 15 a 25 quilômetros de espessura. A profundidade do oceano pode chegar a 100 quilômetros, o que faria de Europa um dos maiores reservatórios de água do Sistema Solar — talvez o dobro do volume de todos os oceanos terrestres.',
      },
      { type: 'heading', text: 'As evidências' },
      {
        type: 'paragraph',
        text: 'A sonda Galileo, que orbitou Júpiter entre 1995 e 2003, foi decisiva. Ela mediu um campo magnético induzido em Europa, um efeito que só faz sentido se houver uma camada condutora de líquido salgado sob o gelo. Também registrou a orientação das fraturas e a presença de regiões caóticas, onde blocos de gelo parecem ter flutuado e se reorganizado, como icebergs em um mar congelado.',
      },
      {
        type: 'list',
        items: [
          'Campo magnético induzido, compatível com uma camada condutora global.',
          'Superfície jovem, com poucas crateras e fraturas que se rejuvenescem.',
          'Regiões caóticas com blocos de gelo deslocados, semelhantes a icebergs.',
          'Vapor de água detectado em plumas sobre o polo sul, em observações do Hubble.',
        ],
      },
      {
        type: 'paragraph',
        text: 'O calor que mantém o oceano líquido vem da maré gravitacional de Júpiter. Europa está em ressonância orbital com Io e Ganimedes, e a cada volta sua forma é esticada e comprimida. Esse bombardeio mecânico gera calor por fricção interna, suficiente para impedir que a água congele por completo ao longo de bilhões de anos.',
      },
      { type: 'heading', text: 'Química e energia' },
      {
        type: 'paragraph',
        text: 'Água líquida é apenas um dos ingredientes da vida como a conhecemos. Também são necessários elementos químicos e uma fonte de energia. No fundo do oceano, a interação entre água e rocha pode alimentar fontes hidrotermais, semelhantes às que sustentam ecossistemas na Terra sem luz solar. Na superfície, a radiação de Júpiter quebra moléculas de água e produz oxidantes, que poderiam ser transportados para baixo por processos de renovação da crosta.',
      },
      {
        type: 'quote',
        text: 'Europa reúne, ao mesmo tempo, água líquida, rocha e energia: três ingredientes que tornam a busca por vida ali especialmente instigante.',
        cite: 'Síntese dos critérios de habitabilidade usados pela NASA',
      },
      {
        type: 'paragraph',
        text: 'Ainda assim, habitabilidade não é o mesmo que vida. É preciso entender se o oceano tem duração longa, se há gradientes químicos utilizáveis e se a comunicação entre a superfície e o interior permite o fluxo de nutrientes. As plumas de vapor, se confirmadas, oferecem uma oportunidade rara: amostrar material do oceano sem precisar perfurar quilômetros de gelo.',
      },
      { type: 'heading', text: 'As próximas missões' },
      {
        type: 'paragraph',
        text: 'A Europa Clipper, da NASA, foi lançada em outubro de 2024 e deve chegar ao sistema de Júpiter em 2030. Ela fará cerca de 50 sobrevoos de Europa, com um conjunto de câmeras, espectrômetros, radar e magnetômetros para medir a espessura do gelo, a composição da superfície e a estrutura do oceano. A missão não procura vida diretamente: seu objetivo é avaliar se Europa tem condições habitáveis e indicar onde uma futura sonda de aterrissagem deveria pousar. A sonda JUICE, da Agência Espacial Europeia, também visitará Europa, embora seu foco principal seja Ganimedes. Juntas, as missões vão transformar Europa de um ponto de luz em um mundo com geologia, oceanografia e química mapeadas, e a comparação entre os dois conjuntos de dados será decisiva para interpretar as plumas e as camadas de gelo. Se a vida existe em outro lugar do Sistema Solar, um dos candidatos mais plausíveis está a centenas de milhões de quilômetros de casa, escondido sob uma casca de gelo que esconde um oceano inteiro — e talvez um capítulo da história da vida que ainda não sabemos ler.',
      },
    ],
    category: 'sistema-solar',
    categoryLabel: 'Sistema Solar',
    author: 'Renata Moura Silveira',
    authorRole: 'Pesquisadora em ciências planetárias',
    date: '2026-08-19',
    readingTime: 4,
    imageCover: 'https://images-assets.nasa.gov/image/PIA19048/PIA19048~orig.jpg',
    imageAlt: 'Superfície de Europa com faixas escuras e fraturas sobre uma crosta de gelo clara.',
    imageCredit: 'NASA/JPL-Caltech',
    tags: ['europa', 'júpiter', 'luas', 'astrobiologia'],
    featured: false,
  },
  {
    id: '5',
    slug: 'guia-do-ceu-de-inverno-no-hemisferio-sul',
    title: 'Guia do céu de inverno no hemisfério sul',
    excerpt:
      'Guia prático para observar o céu de inverno no hemisfério sul: constelações, planetas e objetos de céu profundo visíveis a olho nu ou com binóculos.',
    content: [
      {
        type: 'paragraph',
        text: 'O inverno no hemisfério sul é a estação mais generosa para quem gosta de olhar para cima. A noite começa cedo, o ar costuma ser mais seco e o centro da Via Láctea fica alto no céu, arrastando consigo nebulosas, aglomerados e uma das regiões mais ricas da galáxia. Este guia é um ponto de partida para quem quer observar sem equipamento sofisticado.',
      },
      { type: 'heading', text: 'Comece pelo Cruzeiro do Sul' },
      {
        type: 'paragraph',
        text: 'O Cruzeiro do Sul é a bússola do céu austral. Suas quatro estrelas principais formam uma cruz inclinada, e o braço mais longo aponta para o polo sul celeste. Para encontrar o sul, prolongue cerca de quatro vezes e meia o comprimento desse braço. As duas estrelas conhecidas como Guardas, Alfa e Beta Centauri, ficam próximas e ajudam a confirmar a direção.',
      },
      {
        type: 'paragraph',
        text: 'Perto do Cruzeiro, a constelação do Centauro abriga Alfa Centauri, o sistema estelar mais próximo do Sol, e Omega Centauri, o maior aglomerado globular da Via Láctea. A olho nu, Omega aparece como uma mancha difusa; com binóculos, revela dezenas de estrelas apertadas em uma bola luminosa. É um dos objetos mais impressionantes do céu para instrumentos pequenos.',
      },
      {
        type: 'paragraph',
        text: 'Subindo em direção ao zênite, aparece Escorpião, com sua forma inconfundível de ferrão e suas estrelas avermelhadas. Antares, no coração do escorpião, é uma supergigante vermelha tão grande que, se estivesse no lugar do Sol, engoliria a órbita de Marte. Ao lado, Sagitário aponta para o centro da galáxia, onde se concentram nuvens moleculares, aglomerados jovens e o buraco negro supermassivo Sagitário A*.',
      },
      { type: 'heading', text: 'Objetos para binóculos' },
      {
        type: 'list',
        items: [
          'Nebulosa Laguna (M8): uma nuvem de gás e estrelas jovens visível a olho nu como uma mancha clara em Sagitário.',
          'Nebulosa Ômega (M17): conhecida como Cisne, com uma forma que lembra um pássaro nadando na Via Láctea.',
          'Aglomerado do Patinho Selvagem (M11): uma concentração compacta de estrelas em Escudo.',
          '47 Tucanae: um dos aglomerados globulares mais brilhantes do céu, próximo à Pequena Nuvem de Magalhães.',
        ],
      },
      {
        type: 'paragraph',
        text: 'A Lua é a maior inimiga de quem procura objetos tênues. Escolha noites próximas da Lua nova ou observe quando a Lua já tiver se posto. Espere cerca de 20 a 30 minutos longe de luzes brancas para que os olhos se adaptem ao escuro; use uma lanterna vermelha para consultar mapas e não perca a adaptação. A poluição luminosa das cidades apaga a Via Láctea, mas constelações e planetas continuam visíveis.',
      },
      {
        type: 'paragraph',
        text: 'Planetas são alvos fáceis porque não cintilam como as estrelas e aparecem em posições que mudam ao longo das semanas. Júpiter e Saturno são os mais recompensadores para iniciantes: com binóculos, Júpiter mostra suas quatro maiores luas como pontinhos alinhados; com um pequeno telescópio, Saturno revela os anéis. Aplicativos de mapa estelar ajudam a localizá-los, mas nada substitui a prática de reconhecer o céu a olho nu.',
      },
      {
        type: 'paragraph',
        text: 'A poluição luminosa é o principal limitador na cidade. A escala de Bortle vai de 1, em céus verdadeiramente escuros, a 9, no centro de uma metrópole. Em áreas urbanas, talvez você consiga ver apenas as estrelas mais brilhantes e os planetas. Para observar a Via Láctea, é preciso viajar para locais com Bortle 4 ou menor. Parques nacionais e reservas de céu escuro são boas opções, mas informe-se sobre regras de visitação e nunca observe sozinho em locais isolados.',
      },
      {
        type: 'paragraph',
        text: 'Leve uma cadeira reclinável, agasalho e um caderno. Anotar o que você viu, a data e as condições do céu transforma uma noite de observação em um registro pessoal. Com o tempo, você percebe que o céu não é um quadro fixo: ele gira, muda de estação e oferece um espetáculo diferente a cada mês. O inverno austral é uma porta de entrada difícil de superar.',
      },
    ],
    category: 'observacao',
    categoryLabel: 'Observação',
    author: 'Rafael Nogueira Lima',
    authorRole: 'Astrônomo amador e jornalista de ciência',
    date: '2026-07-22',
    readingTime: 4,
    imageCover: 'https://images-assets.nasa.gov/image/PIA15416/PIA15416~orig.jpg',
    imageAlt: 'Galáxia de Andrômeda vista em ultravioleta, com braços espirais e aglomerados de estrelas jovens.',
    imageCredit: 'NASA/JPL-Caltech',
    tags: ['observação', 'hemisfério sul', 'constelações', 'binóculos'],
    featured: false,
  },
  {
    id: '6',
    slug: 'astrofotografia-de-ceu-profundo-para-iniciantes',
    title: 'Astrofotografia de céu profundo para iniciantes',
    excerpt:
      'Do tripé ao empilhamento de imagens: um roteiro realista para fotografar nebulosas e galáxias com equipamento de entrada e paciência.',
    content: [
      {
        type: 'paragraph',
        text: 'A primeira astrofotografia raramente se parece com as imagens espetaculares que circulam na internet. E isso é normal. Fotos de nebulosas e galáxias são o resultado de dezenas ou centenas de exposições somadas por software, não de um único clique. Entender esse processo desde o início evita frustração e economiza dinheiro com equipamento que você ainda não precisa.',
      },
      { type: 'heading', text: 'O que é realmente necessário' },
      {
        type: 'paragraph',
        text: 'Uma câmera com controle manual, uma lente razoável e um tripé firme já permitem começar. O objetivo inicial é fotografar a Via Láctea e constelações, não galáxias distantes. Uma lente de 35 a 50 milímetros, abertura f/2.8 ou maior e foco manual resolvem bem. Um disparador remoto ou o temporizador da câmera evita vibrações no momento do clique.',
      },
      {
        type: 'paragraph',
        text: 'Para alvos mais tênues, o próximo passo é uma montagem equatorial com motor de acompanhamento, também chamada de star tracker. Ela compensa a rotação da Terra e permite exposições de vários minutos sem rastro de estrelas. Telescópios só entram depois: uma lente teleobjetiva com tracker costuma produzir resultados melhores e mais fáceis do que um telescópio barato em montagem instável.',
      },
      {
        type: 'list',
        items: [
          'Câmera com modo manual e capacidade de gravar em RAW.',
          'Tripé estável, de preferência com cabeça de esfera.',
          'Lente clara (f/2.8 ou melhor) e foco manual.',
          'Disparador remoto, baterias extras e cartão de memória.',
          'Star tracker simples para evoluir além das exposições curtas.',
        ],
      },
      { type: 'heading', text: 'Exposição sem rastro' },
      {
        type: 'paragraph',
        text: 'A regra dos 500 é um ponto de partida: divida 500 pela distância focal em milímetros para obter o tempo máximo de exposição, em segundos, antes que as estrelas comecem a virar riscos. Com uma lente de 50 milímetros, isso dá 10 segundos. Para sensores de alta resolução, use uma regra mais conservadora, como 300 dividido pela focal, ou a regra NPF, que considera abertura e tamanho do pixel.',
      },
      {
        type: 'paragraph',
        text: 'Trabalhe com ISO moderado, entre 800 e 3200, e teste. Aberturas maiores captam mais luz, mas podem produzir estrelas deformadas nos cantos e vigneting. Foque no infinito usando a tela ampliada em uma estrela brilhante; o símbolo de infinito da lente raramente é preciso. Fotografe em RAW para ter margem de ajuste na edição.',
      },
      { type: 'heading', text: 'Empilhamento e calibração' },
      {
        type: 'paragraph',
        text: 'O empilhamento reduz o ruído e revela detalhes que uma exposição isolada não mostra. Programas gratuitos como DeepSkyStacker e Siril alinham e combinam as imagens. Além das fotos do céu, capture arquivos de calibração: darks, com a mesma exposição e temperatura, mas com a tampa fechada; flats, para corrigir a iluminação desigual do campo; e bias ou flats escuros, conforme o software. Esses quadros parecem burocráticos, mas fazem grande diferença.',
      },
      {
        type: 'paragraph',
        text: 'O processamento é metade do trabalho. A imagem empilhada costuma sair escura e sem contraste. Ferramentas de estiramento de histograma, remoção de gradientes e correção de cor revelam o sinal. É tentador exagerar na saturação e na nitidez, mas o objetivo é representar a estrutura real do objeto, não inventar cores. Compare seu resultado com imagens de referência e mantenha as anotações do processo.',
      },
      {
        type: 'paragraph',
        text: 'Planejamento economiza horas. Aplicativos como Stellarium e PhotoPills mostram a posição da Via Láctea e dos objetos ao longo da noite, e ajudam a escolher a hora em que o alvo estará mais alto. Enquadrar com antecedência, testar o foco e verificar as baterias antes de sair de casa evita noites perdidas. Uma composição com um objeto terrestre no primeiro plano costuma render imagens mais interessantes do que apenas o céu, desde que a iluminação seja planejada. Por fim, escolha alvos adequados à sua experiência: a Via Láctea, a Nebulosa de Órion e as Plêiades são ótimos começos. Galáxias pequenas exigem focal longa e paciência. Aprender a planejar a noite — fase da Lua, previsão do tempo, posição do alvo — vale mais do que qualquer acessório. Astrofotografia é um exercício de constância, e cada noite rende um aprendizado.',
      },
    ],
    category: 'observacao',
    categoryLabel: 'Observação',
    author: 'Renata Moura Silveira',
    authorRole: 'Astrofotógrafa e divulgadora',
    date: '2026-09-11',
    readingTime: 4,
    imageCover: 'https://images-assets.nasa.gov/image/PIA23122/PIA23122~orig.jpg',
    imageAlt: 'Galáxia elíptica M87 em imagem infravermelha do telescópio Spitzer, com núcleo brilhante e jato.',
    imageCredit: 'NASA/JPL-Caltech',
    tags: ['astrofotografia', 'observação', 'empilhamento', 'via láctea'],
    featured: false,
  },
  {
    id: '7',
    slug: 'energia-escura-e-a-expansao-acelerada',
    title: 'Energia escura e a expansão acelerada',
    excerpt:
      'A expansão do universo está acelerando, e ninguém sabe exatamente por quê. Entenda a energia escura, as supernovas e o destino do cosmos.',
    content: [
      {
        type: 'paragraph',
        text: 'Até o fim dos anos 1990, a expectativa era que a expansão do universo estivesse desacelerando. A gravidade da matéria deveria frear o afastamento das galáxias, e a pergunta era apenas quanto. Dois grupos independentes, liderados por Saul Perlmutter, Brian Schmidt e Adam Riess, mediram supernovas distantes e encontraram o contrário: o universo não apenas se expande, mas acelera. O resultado rendeu o Nobel de Física de 2011 e abriu um dos maiores mistérios da ciência contemporânea.',
      },
      {
        type: 'paragraph',
        text: 'A ferramenta foi a supernova do tipo Ia. Essas explosões ocorrem quando uma anã branca acrescenta massa até atingir um limite próximo de 1,4 massa solar, o que faz com que quase todas atinjam um brilho máximo parecido. Por isso, funcionam como velas-padrão: comparando o brilho aparente com o brilho esperado, é possível estimar a distância. O desvio para o vermelho da luz revela a velocidade de afastamento. A combinação mostrou que supernovas mais distantes estavam mais fracas do que o previsto em um universo desacelerado.',
      },
      { type: 'heading', text: 'O que é energia escura?' },
      {
        type: 'paragraph',
        text: 'A explicação mais simples é uma constante cosmológica, representada pela letra grega lambda. Ela descreve uma energia associada ao próprio espaço vazio, que exerce pressão negativa e empurra o universo para a expansão. No modelo padrão da cosmologia, o Lambda-CDM, cerca de 68% do conteúdo do universo é energia escura, 27% é matéria escura e apenas 5% é matéria comum, a que forma estrelas, planetas e pessoas.',
      },
      {
        type: 'paragraph',
        text: 'A equação de estado da energia escura é expressa pelo parâmetro w, a razão entre pressão e densidade. Para a constante cosmológica, w é exatamente igual a menos um. Medidas cada vez mais precisas buscam detectar desvios desse valor. Se w for diferente de menos um ou variar com o tempo, a energia escura pode não ser uma constante, mas um campo dinâmico que evolui junto com o universo.',
      },
      {
        type: 'quote',
        text: 'A energia escura é o nome que damos ao nosso desconhecimento sobre por que a expansão do universo acelera.',
        cite: 'Síntese do consenso cosmológico atual',
      },
      {
        type: 'paragraph',
        text: 'Resultados recentes de levantamentos de galáxias, como o DESI, têm sugerido que a energia escura pode ter variado ao longo da história cósmica. As evidências ainda não são conclusivas e dependem de combinações de dados sobre supernovas, radiação cósmica de fundo e oscilações acústicas de bárions. A possibilidade é empolgante: seria a primeira rachadura real no modelo padrão em décadas.',
      },
      {
        type: 'paragraph',
        text: 'A radiação cósmica de fundo, a luz fóssil do universo jovem, fornece outra régua. Suas pequenas flutuações de temperatura revelam a proporção de matéria escura e de energia escura no cosmos, e o padrão de oscilações acústicas de bárions funciona como uma régua padrão que mede a expansão em diferentes épocas. Quando supernovas, radiação de fundo e levantamentos de galáxias concordam, o resultado é robusto; quando divergem, surgem pistas de física nova.',
      },
      { type: 'heading', text: 'O destino do universo' },
      {
        type: 'paragraph',
        text: 'O futuro depende do comportamento da energia escura. Se for uma constante, o universo continuará acelerando, as galáxias distantes se afastarão até desaparecer do horizonte observável e o gás interestelar se esgotará lentamente, em um cenário de morte térmica. Se a energia escura se intensificar, poderia levar a um Big Rip, em que até estruturas ligadas seriam dilaceradas. Se enfraquecer, o universo poderia voltar a desacelerar ou até colapsar.',
      },
      {
        type: 'paragraph',
        text: 'Duas novas máquinas prometem atacar o problema. O telescópio Euclid, da Agência Espacial Europeia, mapeia a distribuição de galáxias e mede lentes gravitacionais para reconstruir a história da expansão. O Observatório Vera Rubin, no Chile, fará um levantamento repetido do céu e descobrirá milhões de supernovas e fenômenos transitórios. Com mais dados, talvez a energia escura deixe de ser um nome para a ignorância e se torne um componente compreendido da física.',
      },
      {
        type: 'paragraph',
        text: 'Enquanto isso, vale manter a humildade: 95% do universo escapa à nossa compreensão direta. A expansão acelerada é um lembrete de que o cosmos não foi projetado para ser intuitivo. Ele é feito de perguntas melhores do que as respostas que temos hoje.',
      },
    ],
    category: 'cosmologia',
    categoryLabel: 'Cosmologia',
    author: 'Henrique Salles Barbosa',
    authorRole: 'Professor de cosmologia',
    date: '2026-08-05',
    readingTime: 4,
    imageCover: 'https://images-assets.nasa.gov/image/PIA22314/PIA22314~orig.jpg',
    imageAlt: 'Ilustração das duas sondas MarCO em viagem pelo espaço profundo, com painéis solares abertos.',
    imageCredit: 'NASA/JPL-Caltech',
    tags: ['cosmologia', 'energia escura', 'expansão', 'supernovas'],
    featured: false,
  },
  {
    id: '8',
    slug: 'a-teia-cosmica-e-o-andaim-da-materia-escura',
    title: 'A teia cósmica e o andaime da matéria escura',
    excerpt:
      'A matéria escura forma uma teia invisível que sustenta galáxias e aglomerados. Conheça as evidências e os experimentos que tentam detectá-la.',
    content: [
      {
        type: 'paragraph',
        text: 'Em grande escala, o universo não é uma distribuição uniforme de galáxias. Levantamentos do céu revelam filamentos luminosos que se estendem por centenas de milhões de anos-luz, conectando aglomerados em nodos e rodeando enormes vazios quase vazios. Essa estrutura é chamada de teia cósmica, e sua arquitetura é ditada por algo que não vemos: a matéria escura.',
      },
      {
        type: 'paragraph',
        text: 'A primeira visão clara dessa estrutura veio nos anos 1980, com o levantamento do Centro Harvard-Smithsonian, que mapeou milhares de galáxias e revelou a Grande Muralha, uma faixa alongada de aglomerados. Desde então, projetos como o Sloan Digital Sky Survey ampliaram o mapa para milhões de galáxias, confirmando filamentos, paredes e vazios em uma teia de escala gigantesca.',
      },
      { type: 'heading', text: 'A matéria escura como andaime' },
      {
        type: 'paragraph',
        text: 'No modelo padrão, a matéria escura começou a se aglomerar logo após o Big Bang, formando halos por gravidade. O gás comum, atraído por esses poços de potencial, caiu neles e formou estrelas. As galáxias, portanto, não são as peças originais da estrutura: elas se formaram dentro de halos de matéria escura que já existiam. Simulações cosmológicas, como Millennium e IllustrisTNG, reproduzem com boa fidelidade a teia observada quando incluem matéria escura fria.',
      },
      {
        type: 'paragraph',
        text: 'A expressão matéria escura fria significa que essas partículas se moviam lentamente no universo primordial, permitindo que a gravidade as agrupasse em pequenas escalas. Se fossem quentes, a estrutura se formaria de cima para baixo, primeiro os grandes aglomerados, e o resultado não bateria com as observações. Ainda não sabemos qual partícula é essa, mas o comportamento coletivo é bem descrito.',
      },
      {
        type: 'list',
        items: [
          'Curvas de rotação de galáxias, que permanecem altas nas bordas.',
          'Lentes gravitacionais, que revelam massa onde não há luz suficiente.',
          'Radiação cósmica de fundo, cujas oscilações indicam a quantidade de matéria escura.',
          'Colisões de aglomerados, como o Aglomerado da Balas, em que o gás e a massa gravitacional se separam.',
        ],
      },
      { type: 'heading', text: 'Caçando a partícula invisível' },
      {
        type: 'paragraph',
        text: 'As candidatas mais estudadas são as WIMPs, partículas massivas de interação fraca, e os áxions, partículas muito leves previstas em algumas extensões do modelo padrão da física de partículas. Experimentos subterrâneos como LZ e XENONnT tentam detectar o raro choque de uma WIMP com núcleos de xenônio. Até agora, nenhum sinal conclusivo apareceu, o que vem restringindo o espaço de parâmetros disponível.',
      },
      {
        type: 'paragraph',
        text: 'Essa ausência de detecção não invalida a matéria escura; apenas indica que, se ela for feita de WIMPs, a interação é ainda mais fraca do que se esperava. Outras abordagens incluem a busca por áxions em cavidades ressonantes, a observação de raios gama de regiões densas e o estudo de pequenas estruturas na teia cósmica, que podem revelar a massa das partículas.',
      },
      { type: 'heading', text: 'O lado visível da teia' },
      {
        type: 'paragraph',
        text: 'A teia não é só invisível. O gás que cai nos filamentos se aquece e emite em raios X, e parte dele permanece como hidrogênio neutro, detectável em rádio. Observações de hidrogênio ao longo de linhas de visão para quasares revelam filamentos difusos, o chamado meio intergaláctico quente. Entre os filamentos existem os vazios cósmicos, regiões de centenas de milhões de anos-luz com pouquíssimas galáxias: não são buracos absolutos, pois contêm gás tênue e galáxias anãs, muitas vezes isoladas. O Grupo Local, que abriga a Via Láctea e Andrômeda, ocupa uma região de transição entre estruturas maiores, e o movimento das galáxias vizinhas revela que somos atraídos por um aglomerado massivo, o Grande Atrator. Com Euclid e o Observatório Vera Rubin, será possível mapear melhor essas estruturas e testar se a matéria escura realmente se comporta como previsto.',
      },
      {
        type: 'paragraph',
        text: 'A teia cósmica é, ao mesmo tempo, um mapa e um enigma. Ela mostra onde a matéria se acumulou e sugere que grande parte dela nunca formou estrelas. Entender esse andaime invisível é entender como o universo organizou a matéria em escalas que a imaginação custa a acompanhar.',
      },
    ],
    category: 'cosmologia',
    categoryLabel: 'Cosmologia',
    author: 'Beatriz Campos Ferreira',
    authorRole: 'Pesquisadora em estrutura em larga escala',
    date: '2026-07-09',
    readingTime: 4,
    imageCover: 'https://images-assets.nasa.gov/image/PIA23764/PIA23764~orig.jpg',
    imageAlt: 'Ilustração do rover Perseverance na superfície de Marte, com braço robótico estendido.',
    imageCredit: 'NASA/JPL-Caltech',
    tags: ['cosmologia', 'matéria escura', 'teia cósmica', 'galáxias'],
    featured: false,
  },
  {
    id: '9',
    slug: 'james-webb-como-um-telescopio-enxerga-o-passado',
    title: 'James Webb: como um telescópio enxerga o passado',
    excerpt:
      'Como o James Webb enxerga no infravermelho, por que precisa ficar a 1,5 milhão de km da Terra e o que ele já revelou sobre as primeiras galáxias.',
    content: [
      {
        type: 'paragraph',
        text: 'O Telescópio Espacial James Webb foi lançado em 25 de dezembro de 2021 e, após meses de viagem e ajustes, começou a operar a 1,5 milhão de quilômetros da Terra, no ponto de Lagrange L2. Ali, ele mantém uma posição estável em relação ao Sol e à Terra, com o escudo solar sempre voltado para o lado iluminado. Essa geometria permite que seus instrumentos fiquem a cerca de 40 kelvin, perto do zero absoluto.',
      },
      { type: 'heading', text: 'Por que infravermelho' },
      {
        type: 'paragraph',
        text: 'A luz de galáxias distantes viaja por bilhões de anos antes de chegar. Nesse tempo, a expansão do universo estica os comprimentos de onda, deslocando a luz visível para o infravermelho — o chamado desvio para o vermelho cosmológico. Um telescópio sensível ao infravermelho consegue enxergar objetos que o Hubble, otimizado para luz visível e ultravioleta, não alcança.',
      },
      {
        type: 'paragraph',
        text: 'O infravermelho também atravessa melhor a poeira. Berçários estelares e discos protoplanetários são envoltos em grãos que bloqueiam a luz visível, mas deixam passar radiação de comprimentos de onda maiores. Além disso, objetos frios, como anãs marrons e planetas, emitem principalmente no infravermelho. É por isso que Webb consegue estudar atmosferas de exoplanetas e o nascimento de estrelas com tanta clareza.',
      },
      {
        type: 'paragraph',
        text: 'O espelho principal tem 6,5 metros de diâmetro e é formado por 18 segmentos de berílio revestidos de ouro, que reflete bem o infravermelho. O escudo solar tem cinco camadas de um material chamado Kapton, do tamanho de uma quadra de tênis, e reduz a temperatura em mais de um milhão de vezes. Os instrumentos incluem câmeras e espectrógrafos no infravermelho próximo e médio, capazes de separar a luz para identificar moléculas.',
      },
      {
        type: 'quote',
        text: 'Olhar para longe é olhar para o passado: a luz que chega hoje foi emitida quando o universo era muito mais jovem.',
        cite: 'Princípio básico da astronomia observacional',
      },
      {
        type: 'paragraph',
        text: 'A jornada até a operação científica foi um exercício de engenharia. O escudo solar precisou se abrir em uma sequência de centenas de liberações pirotécnicas, e o espelho passou por semanas de alinhamento em que cada segmento foi ajustado em escala nanométrica. Qualquer falha nesses passos poderia comprometer a missão. O sucesso abriu caminho para uma nova geração de telescópios espaciais e mostrou que estruturas grandes podem ser lançadas dobradas e montadas no espaço.',
      },
      { type: 'heading', text: 'O que já mudou' },
      {
        type: 'paragraph',
        text: 'Nos primeiros anos de operação, Webb encontrou galáxias mais brilhantes e mais massivas do que os modelos previam para o universo jovem. Isso não significa que o Big Bang esteja errado; indica que a formação estelar no início do cosmos foi mais eficiente do que se imaginava, ou que os primeiros buracos negros contribuíram para o brilho. Ajustar modelos é parte normal da ciência.',
      },
      {
        type: 'paragraph',
        text: 'O telescópio também detectou dióxido de carbono na atmosfera do exoplaneta WASP-39b, identificou vapor de água e nuvens em outros mundos e observou detalhes de nebulosas e regiões de formação estelar. No Sistema Solar, registrou imagens de Júpiter, Urano e Netuno em infravermelho, revelando anéis e tempestades com nitidez inédita.',
      },
      {
        type: 'paragraph',
        text: 'Webb não substitui o Hubble; os dois se complementam. O Hubble continua forte em luz visível e ultravioleta, enquanto Webb abre uma janela nova no infravermelho. Os dados brutos ficam disponíveis em arquivos públicos, como o MAST, após um período de exclusividade para as equipes que propuseram as observações. Isso permite que pesquisadores do mundo inteiro, inclusive no Brasil, façam ciência com o telescópio sem precisar construí-lo.',
      },
      {
        type: 'paragraph',
        text: 'O nome do telescópio homenageia James Webb, administrador da NASA durante o programa Apollo. A escolha é controversa por causa do envolvimento dele em políticas de segurança nacional da época, e uma petição pediu a troca do nome. A NASA manteve a decisão após uma revisão histórica. Independentemente da polêmica, o instrumento segue produzindo dados que vão ocupar astrônomos por décadas.',
      },
    ],
    category: 'tecnologia',
    categoryLabel: 'Tecnologia',
    author: 'Luiza Prado Monteiro',
    authorRole: 'Engenheira aeroespacial',
    date: '2026-10-08',
    readingTime: 4,
    imageCover: 'https://images-assets.nasa.gov/image/PIA23122/PIA23122~medium.jpg',
    imageAlt: 'Galáxia elíptica M87 vista em infravermelho, com núcleo luminoso e jato de matéria.',
    imageCredit: 'NASA/JPL-Caltech',
    tags: ['james webb', 'tecnologia', 'infravermelho', 'exoplanetas'],
    featured: false,
  },
];

export default posts;

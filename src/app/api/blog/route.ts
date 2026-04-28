import { NextResponse } from 'next/server';

interface BlogPost {
  id: number;
  slug: string;
  title: string;
  titleEs: string;
  excerpt: string;
  excerptEs: string;
  content: string;
  contentEs: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  tags: string[];
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    slug: 'the-art-of-breaking-in-your-glove',
    title: 'The Art of Breaking In Your Glove',
    titleEs: 'El Arte de Preparar Tu Guante',
    excerpt:
      'A well-broken-in glove is a player\'s most trusted companion on the field. Learn the proven methods that professional players use to shape their leather into game-ready perfection.',
    excerptEs:
      'Un guante bien preparado es el compañero más confiable de un jugador en el campo. Aprende los métodos probados que los jugadores profesionales usan para dar forma al cuero hasta la perfección.',
    content: `<p>A well-broken-in glove is a player's most trusted companion on the field. Unlike most equipment that comes ready to use straight out of the box, a high-quality leather baseball glove requires patience, care, and a deliberate break-in process. At Manny Canó, our master craftsmen pre-soften each glove through a 12-month natural leather curing process, but the final break-in is where the magic happens — it's where the glove truly becomes yours.</p>

<h3>The Classic Methods</h3>

<p>There are several time-tested approaches to breaking in a glove. The most traditional method involves applying a small amount of leather conditioner to the palm and pocket area, then repeatedly closing the glove around a baseball. Many players prefer to place a ball in the pocket and wrap the glove with rubber bands or a glove mallet overnight. This gradual shaping process ensures the leather molds naturally without losing its structural integrity or longevity.</p>

<h3>What to Avoid</h3>

<p>Perhaps more important than knowing what to do is knowing what not to do. Never microwave, oven-bake, or submerge your glove in water — these shortcuts weaken the leather fibers and dramatically shorten the lifespan of your investment. Similarly, avoid over-oiling, which can make the glove heavy and soggy. A light application of Manny Canó Leather Conditioner once every few weeks during the break-in period is all you need.</p>

<h3>The Manny Canó Difference</h3>

<p>Because our leather is naturally cured for 12 months before being cut, Manny Canó gloves break in faster and more evenly than mass-produced alternatives. Our Pro-Fit System means the glove is already shaped to the contours of the Latin American player's hand, so you start closer to game-ready from day one. Most players report their Manny Canó glove reaches peak performance within 3 to 4 weeks of regular use — roughly half the time of competing brands.</p>`,
    contentEs: `<p>Un guante bien preparado es el compañero más confiable de un jugador en el campo. A diferencia de la mayoría del equipamiento que viene listo para usar, un guante de cuero de alta calidad requiere paciencia, cuidado y un proceso deliberado de preparación. En Manny Canó, nuestros maestros artesanos suavizan cada guante a través de un proceso de curado natural del cuero de 12 meses, pero la preparación final es donde ocurre la magia — es donde el guante verdaderamente se vuelve tuyo.</p>

<h3>Los Métodos Clásicos</h3>

<p>Existen varios enfoques comprobados para preparar un guante. El método más tradicional consiste en aplicar una pequeña cantidad de acondicionador de cuero en la palma y el área del bolsillo, y luego cerrar repetidamente el guante alrededor de una pelota. Muchos jugadores prefieren colocar una pelota en el bolsillo y envolver el guante con bandas elásticas o un mazo para guantes durante la noche. Este proceso de moldeado gradual asegura que el cuero se adapte naturalmente sin perder su integridad estructural ni su durabilidad.</p>

<h3>Lo Que Debes Evitar</h3>

<p>Tan importante como saber qué hacer es saber qué no hacer. Nunca uses microondas, horno ni sumerjas tu guante en agua — estos atajos debilitan las fibras del cuero y acortan dramáticamente la vida útil de tu inversión. De igual manera, evita aplicar exceso de aceite, lo cual puede hacer el guante pesado y empapado. Una aplicación ligera de Acondicionador de Cuero Manny Canó cada pocas semanas durante el periodo de preparación es todo lo que necesitas.</p>

<h3>La Diferencia Manny Canó</h3>

<p>Debido a que nuestro cuero se cura naturalmente durante 12 meses antes de ser cortado, los guantes Manny Canó se preparan más rápido y de manera más uniforme que las alternativas producidas en masa. Nuestro Sistema Pro-Fit significa que el guante ya está moldeado a los contornos de la mano del jugador latino, así que comienzas más cerca de estar listo para el juego desde el primer día. La mayoría de los jugadores reportan que su guante Manny Canó alcanza su rendimiento óptimo en 3 a 4 semanas de uso regular — aproximadamente la mitad del tiempo de las marcas competidoras.</p>`,
    author: 'Carlos Martínez',
    date: '2025-01-15',
    readTime: '6',
    category: 'Equipment',
    image: '/img/products/mc-glove-main.jpg',
    tags: ['glove care', 'leather', 'break-in', 'tips', 'equipment'],
  },
  {
    id: 2,
    slug: 'dominican-baseball-academy-guide',
    title: 'Dominican Baseball Academy Guide',
    titleEs: 'Guía de Academias de Béisbol Dominicano',
    excerpt:
      'The Dominican Republic is the world\'s undisputed factory of baseball talent. Discover the top academies, what makes them special, and how young players can get noticed by MLB scouts.',
    excerptEs:
      'República Dominicana es la fábrica mundial indiscutible de talento beisbolero. Descubre las principales academias, qué las hacen especiales y cómo los jóvenes jugadores pueden ser notados por los scouts de MLB.',
    content: `<p>The Dominican Republic produces more Major League Baseball players per capita than any country on Earth. With over 100 Dominicans on MLB rosters each season, the island's baseball pipeline is the envy of the sporting world. At the heart of this phenomenon are the baseball academies — training facilities run by MLB organizations that identify, develop, and sign talent as young as 16 years old.</p>

<h3>The Big League Academy System</h3>

<p>Every major MLB team operates at least one academy in the Dominican Republic, primarily concentrated in the Boca Chica and San Pedro de Macorís corridor. These facilities are essentially mini spring training complexes: multiple fields, batting tunnels, weight rooms, dining halls, and dormitories. Young prospects live on-site and receive professional-level coaching, English classes, and life skills training. The competition is fierce — only a small fraction of academy players will ever sign a professional contract.</p>

<h3>Beyond MLB: Independent Academies</h3>

<p>Not all great Dominican baseball development happens within the MLB system. Independent academies like the Manny Canó Baseball Academy provide training for players aged 8 to 18, focusing on fundamentals, character development, and academic education alongside athletic skills. These programs are crucial for communities where baseball represents the most viable path to a better life, but where raw talent alone isn't enough without proper guidance.</p>

<h3>What Scouts Look For</h3>

<p>MLB scouts evaluating Dominican prospects prioritize five tools: hitting for average, hitting for power, running speed, arm strength, and fielding ability. However, intangibles matter enormously — work ethic, coachability, baseball IQ, and maturity can separate two players with similar physical tools. The Manny Canó Program Cantera was created specifically to bridge this gap, providing structured training and mentorship that goes beyond what's available at most academies.</p>`,
    contentEs: `<p>República Dominicana produce más jugadores de Grandes Ligas per cápita que cualquier país del planeta. Con más de 100 dominicanos en las plantillas de MLB cada temporada, la línea de producción beisbolera de la isla es la envidia del mundo deportivo. En el corazón de este fenómeno están las academias de béisbol — instalaciones de entrenamiento operadas por organizaciones de MLB que identifican, desarrollan y firman talento desde los 16 años.</p>

<h3>El Sistema de Academias de Grandes Ligas</h3>

<p>Cada equipo importante de MLB opera al menos una academia en República Dominicana, concentradas principalmente en el corredor de Boca Chica y San Pedro de Macorís. Estas instalaciones son esencialmente complejos de spring training en miniatura: múltiples campos, túneles de bateo, salas de pesas, comedores y dormitorios. Los prospectos jóvenes viven en el lugar y reciben entrenamiento de nivel profesional, clases de inglés y formación en habilidades para la vida. La competencia es feroz — solo una pequeña fracción de los jugadores de academia firmarán un contrato profesional.</p>

<h3>Más Allá de MLB: Academias Independientes</h3>

<p>No todo el gran desarrollo del béisbol dominicano ocurre dentro del sistema de MLB. Academias independientes como la Academia de Béisbol Manny Canó proporcionan entrenamiento para jugadores de 8 a 18 años, enfocándose en fundamentos, desarrollo de carácter y educación académica junto con habilidades atléticas. Estos programas son cruciales para comunidades donde el béisbol representa el camino más viable hacia una mejor vida, pero donde el talento crudo por sí solo no es suficiente sin la orientación adecuada.</p>

<h3>Lo Que Buscan los Scouts</h3>

<p>Los scouts de MLB que evalúan prospectos dominicanos priorizan cinco herramientas: promedio de bateo, poder de bateo, velocidad para correr, fuerza del brazo y habilidad defensiva. Sin embargo, los factores intangibles importan enormemente — ética de trabajo, capacidad de ser entrenado, inteligencia beisbolera y madurez pueden separar a dos jugadores con herramientas físicas similares. El Programa Cantera de Manny Canó fue creado específicamente para cerrar esta brecha, proporcionando entrenamiento estructurado y mentoría que va más allá de lo disponible en la mayoría de las academias.</p>`,
    author: 'Miguel Reyes',
    date: '2025-01-08',
    readTime: '7',
    category: 'Culture',
    image: '/img/products/mc-gloves-collection-flat.jpg',
    tags: ['academy', 'Dominican Republic', 'MLB', 'scouting', 'culture'],
  },
  {
    id: 3,
    slug: 'choosing-the-right-bat-for-your-swing',
    title: 'Choosing the Right Bat for Your Swing',
    titleEs: 'Cómo Elegir el Bate Correcto Para Tu Swing',
    excerpt:
      'Finding the perfect bat isn\'t just about size — it\'s about understanding your swing mechanics, strength profile, and the physics of bat-ball contact. Here\'s your complete guide.',
    excerptEs:
      'Encontrar el bate perfecto no se trata solo del tamaño — se trata de comprender la mecánica de tu swing, tu perfil de fuerza y la física del contacto bate-pelota. Aquí tu guía completa.',
    content: `<p>Choosing the right baseball bat can feel overwhelming with the sheer number of options available. Wood, aluminum, composite — each material offers distinct advantages, and the wrong choice can cost you bat speed, power, and confidence at the plate. At Manny Canó, we've spent years studying bat-ball dynamics to build equipment that complements the natural swing of Latin American players, whose style tends to generate exceptional bat speed and rotational power.</p>

<h3>Understanding Bat Materials</h3>

<p>Wood bats remain the gold standard for professional play and serious training. Maple offers the hardest surface for maximum energy transfer, while ash provides more flex and a larger sweet spot. Birch sits between the two — slightly softer than maple but more durable. For aluminum and composite bats, the key metrics are drop weight (the difference between length in inches and weight in ounces), barrel diameter, and certification stamps (BBCOR, USSSA, or USA Baseball). A -3 drop is standard for high school and college, while youth players often use -10 or -12 for better control.</p>

<h3>Matching Bat to Swing Type</h3>

<p>Your ideal bat depends heavily on your swing mechanics. Power hitters with strong upper bodies and slower, loaded swings benefit from heavier end-loaded bats that maximize momentum. Contact hitters who rely on bat speed and putting the ball in play should opt for balanced bats that allow quicker hands through the zone. The Manny Canó Cantera Pro series is specifically designed with a balanced-to-slightly-end-loaded profile that accommodates the aggressive, rotational swing common among Caribbean players.</p>

<h3>The Pro Tip: Try Before You Buy</h3>

<p>The single most important factor in bat selection is feel. A bat can have perfect specifications on paper but simply feel wrong in your hands. We always recommend visiting a batting cage or demo day to test different lengths, weights, and balance profiles. Pay attention to how the bat handles during your load, your swing path, and at the point of contact. The right bat should feel like an extension of your arms — natural, responsive, and effortless.</p>`,
    contentEs: `<p>Elegir el bate de béisbol correcto puede ser abrumador con la gran cantidad de opciones disponibles. Madera, aluminio, compuesto — cada material ofrece ventajas distintas, y la elección equivocada puede costarte velocidad de bateo, poder y confianza en el plato. En Manny Canó, hemos pasado años estudiando la dinámica bate-pelota para construir equipamiento que complementa el swing natural de los jugadores latinoamericanos, cuyo estilo tiende a generar velocidad de bateo excepcional y poder rotacional.</p>

<h3>Entendiendo los Materiales del Bate</h3>

<p>Los bates de madera siguen siendo el estándar de oro para el juego profesional y el entrenamiento serio. El maple ofrece la superficie más dura para la máxima transferencia de energía, mientras que el fresno proporciona más flexibilidad y una zona dulce más grande. El abedul se sitúa entre los dos — ligeramente más suave que el maple pero más durable. Para bates de aluminio y compuesto, las métricas clave son el drop weight (la diferencia entre la longitud en pulgadas y el peso en onzas), el diámetro del barril y los sellos de certificación (BBCOR, USSSA o USA Baseball). Un drop de -3 es estándar para preparatoria y universidad, mientras que los jugadores juveniles suelen usar -10 o -12 para mejor control.</p>

<h3>Adaptando el Bate a Tu Tipo de Swing</h3>

<p>Tu bate ideal depende fuertemente de tu mecánica de swing. Los bateadores de poder con torsos fuertes y swings más lentos y cargados se benefician de bates más pesados con peso en la cabeza que maximizan el impulso. Los bateadores de contacto que confían en la velocidad y en poner la pelota en juego deberían optar por bates balanceados que permitan manos más rápidas a través de la zona. La serie Cantera Pro de Manny Canó está diseñada específicamente con un perfil balanceado a ligeramente cargado en la cabeza que se adapta al swing agresivo y rotacional común entre los jugadores del Caribe.</p>

<h3>El Consejo Pro: Prueba Antes de Comprar</h3>

<p>El factor más importante en la selección de un bate es la sensación. Un bate puede tener especificaciones perfectas en papel pero simplemente sentirse mal en tus manos. Siempre recomendamos visitar una jaula de bateo o un día de demostración para probar diferentes longitudes, pesos y perfiles de balance. Presta atención a cómo maneja el bate durante tu carga, tu camino de swing y en el punto de contacto. El bate correcto debería sentirse como una extensión de tus brazos — natural, responsivo y sin esfuerzo.</p>`,
    author: 'Roberto Sánchez',
    date: '2024-12-20',
    readTime: '8',
    category: 'Equipment',
    image: '/img/products/mc-cantera-bat.jpg',
    tags: ['bat selection', 'swing mechanics', 'wood bat', 'aluminum', 'equipment'],
  },
  {
    id: 4,
    slug: 'catcher-gear-essentials',
    title: 'Catcher Gear Essentials',
    titleEs: 'Lo Esencial del Equipamiento de Catcher',
    excerpt:
      'Catching is the most demanding position in baseball — and the most dangerous. Here\'s your comprehensive guide to selecting protective gear that keeps you safe behind the plate.',
    excerptEs:
      'Catcher es la posición más exigente del béisbol — y la más peligrosa. Aquí tu guía completa para seleccionar el equipamiento protector que te mantiene seguro detrás del plato.',
    content: `<p>Baseball catchers endure more physical punishment in a single game than most positions face in a week. Foul tips to the mask, blocked balls bruising the chest, and runners barreling into home plate make catching the most physically demanding position on the diamond. Quality protective equipment isn't a luxury — it's a necessity that directly impacts your safety, performance, and longevity in the game.</p>

<h3>The Helmet and Mask</h3>

<p>Your head is your most important asset, and the helmet/mask combination is your first line of defense. Modern hockey-style catcher helmets offer superior protection compared to traditional two-piece mask-and-skull-cap setups, with wraparound jaw protection and better visibility. Look for a helmet with NOCSAE certification, a dual-density foam liner, and a quick-release harness system. The Manny Canó Pro Catcher Helmet features a titanium cage that reduces weight without sacrificing strength, allowing for faster head movement when tracking pop-ups and throw-downs.</p>

<h3>Chest Protector and Leg Guards</h3>

<p>A quality chest protector absorbs the impact of 90+ mph foul tips and blocked pitches. The best models feature multi-layer foam construction with a removable belly guard and shoulder extensions. Leg guards should cover from the mid-thigh to the top of the cleat, with articulated knee hinges that allow natural squatting and lateral movement. The Manny Canó Professional Chest Protector uses a proprietary shock-absorbing foam that disperses impact energy across a wider area, reducing the sting that catchers feel on hard-hit foul tips.</p>

<h3>Don't Forget the Details</h3>

<p>Knee savers are often overlooked but critically important — they attach to the back of your leg guards and support your knees during the sustained squatting that catchers endure. A quality catcher's mitt with a closed web and deep pocket is essential for receiving pitches and blocking balls in the dirt. Finally, invest in a protective cup with proper athletic support. The Manny Canó Complete Catcher Set includes all these components designed to work together as an integrated system, ensuring maximum protection without sacrificing mobility or comfort.</p>`,
    contentEs: `<p>Los catchers de béisbol soportan más castigo físico en un solo juego que la mayoría de las posiciones enfrentan en una semana. Tips de foul a la máscara, pelotas bloqueadas que magullan el pecho y corredores que chocan contra el home plate hacen que catcher sea la posición más físicamente exigente en el diamante. El equipamiento protector de calidad no es un lujo — es una necesidad que impacta directamente en tu seguridad, rendimiento y longevidad en el juego.</p>

<h3>El Casco y la Máscara</h3>

<p>Tu cabeza es tu activo más importante, y la combinación casco-máscara es tu primera línea de defensa. Los cascos modernos de catcher estilo hockey ofrecen protección superior comparados con los sistemas tradicionales de dos piezas máscara-y-gorra, con protección envolvente de la mandíbula y mejor visibilidad. Busca un casco con certificación NOCSAE, un forro de espuma de doble densidad y un sistema de arnés de liberación rápida. El Casco de Catcher Pro Manny Canó presenta una jaula de titanio que reduce el peso sin sacrificar la fuerza, permitiendo un movimiento de cabeza más rápido al rastrear pop-ups y lanzamientos.</p>

<h3>Pechera y Espinilleras</h3>

<p>Una pechera de calidad absorbe el impacto de tips de foul a más de 90 mph y lanzamientos bloqueados. Los mejores modelos presentan una construcción de espuma multicapa con una protección abdominal removible y extensiones en los hombros. Las espinilleras deben cubrir desde la mitad del muslo hasta la parte superior del zapato, con bisagras de rodilla articuladas que permiten el agachamiento natural y el movimiento lateral. La Pechera Profesional Manny Canó utiliza una espuma absorbente de impactos patentada que dispersa la energía del impacto en un área más amplia, reduciendo el dolor que los catchers sienten en los tips de foul fuertes.</p>

<h3>No Olvides los Detalles</h3>

<p>Las rodilleras a menudo se pasan por alto pero son críticamente importantes — se adhieren a la parte posterior de las espinilleras y soportan las rodillas durante el agachamiento sostenido que los catchers soportan. Un guante de catcher de calidad con una web cerrada y un bolsillo profundo es esencial para recibir lanzamientos y bloquear pelotas en la tierra. Finalmente, invierte en una copa protectora con soporte atlético adecuado. El Equipo Completo de Catcher Manny Canó incluye todos estos componentes diseñados para trabajar juntos como un sistema integrado, asegurando máxima protección sin sacrificar movilidad ni comodidad.</p>`,
    author: 'Rafael Santos',
    date: '2024-12-05',
    readTime: '7',
    category: 'Equipment',
    image: '/img/products/mc-catcher-set.jpg',
    tags: ['catcher', 'protective gear', 'chest protector', 'leg guards', 'equipment'],
  },
  {
    id: 5,
    slug: 'from-sandlot-to-mlb-the-dominican-pipeline',
    title: 'From Sandlot to MLB: The Dominican Pipeline',
    titleEs: 'Del Terreno de Juego a las Grandes Ligas: La Línea Dominicana',
    excerpt:
      'How did a Caribbean island of 11 million people become the world\'s greatest baseball talent pipeline? The answer is a mix of culture, passion, and an infrastructure built on dreams.',
    excerptEs:
      '¿Cómo una isla caribeña de 11 millones de personas se convirtió en la mayor línea de producción de talento beisbolero del mundo? La respuesta es una mezcla de cultura, pasión y una infraestructura construida sobre sueños.',
    content: `<p>The numbers tell an incredible story. The Dominican Republic, with a population of roughly 11 million, has produced over 800 players who have appeared in Major League Baseball — more than every country except the United States itself. On any given day during the MLB season, approximately 11% of all players on active rosters were born in the Dominican Republic. This is not a recent phenomenon; it's a pipeline that has been flowing for nearly seven decades.</p>

<h3>The Pioneers</h3>

<p>The story begins in 1956, when Ozzie Virgil Sr. became the first Dominican-born player to appear in a Major League game, suiting up for the New York Giants. In the decades that followed, legends like Juan Marichal, Pedro Martínez, David Ortiz, Albert Pujols, and Vladimir Guerrero transformed the way the world viewed Dominican baseball. Each generation inspired the next, creating a self-sustaining cycle of aspiration, dedication, and excellence that shows no signs of slowing down.</p>

<h3>Culture as Competitive Advantage</h3>

<p>What makes the Dominican pipeline so remarkably productive? Baseball is woven into the fabric of daily life on the island. Children grow up playing in open fields with sticks and improvised balls, developing hand-eye coordination and baseball instincts that formal coaching can only refine, not teach. The game is a social currency, a family tradition, and for many young people, the most realistic path out of poverty. This cultural immersion means Dominican players typically possess an intuitive understanding of the game that takes years to develop in players from countries where baseball is just one of many sports options.</p>

<h3>The Modern Era</h3>

<p>Today's Dominican pipeline is more sophisticated than ever. MLB investment in academies, improved scouting technology, and the success of players like Juan Soto, Ronald Acuña Jr., and Francisco Lindor have created a professional development ecosystem that rivals anything found in the United States. At Manny Canó, we're proud to be part of this ecosystem — outfitting the next generation of Dominican stars with equipment worthy of their extraordinary talent and ambition.</p>`,
    contentEs: `<p>Los números cuentan una historia increíble. República Dominicana, con una población de aproximadamente 11 millones, ha producido más de 800 jugadores que han aparecido en Grandes Ligas — más que cualquier país excepto los propios Estados Unidos. En cualquier día durante la temporada de MLB, aproximadamente el 11% de todos los jugadores en plantillas activas nacieron en República Dominicana. Este no es un fenómeno reciente; es una línea de producción que ha fluido por casi siete décadas.</p>

<h3>Los Pioneros</h3>

<p>La historia comienza en 1956, cuando Ozzie Virgil Sr. se convirtió en el primer jugador nacido en República Dominicana en aparecer en un juego de Grandes Ligas, vistiendo la camiseta de los New York Giants. En las décadas que siguieron, leyendas como Juan Marichal, Pedro Martínez, David Ortiz, Albert Pujols y Vladimir Guerrero transformaron la forma en que el mundo veía el béisbol dominicano. Cada generación inspiró a la siguiente, creando un ciclo autosostenible de aspiración, dedicación y excelencia que no muestra señales de desaceleración.</p>

<h3>La Cultura como Ventaja Competitiva</h3>

<p>¿Qué hace que la línea dominicana sea tan notablemente productiva? El béisbol está tejido en la tela de la vida cotidiana en la isla. Los niños crecen jugando en campos abiertos con palos y pelotas improvisadas, desarrollando coordinación ojo-mano e instintos beisboleros que el entrenamiento formal solo puede refinar, no enseñar. El juego es una moneda social, una tradición familiar y, para muchos jóvenes, el camino más realista para salir de la pobreza. Esta inmersión cultural significa que los jugadores dominicanos típicamente poseen una comprensión intuitiva del juego que toma años desarrollar en jugadores de países donde el béisbol es solo una de muchas opciones deportivas.</p>

<h3>La Era Moderna</h3>

<p>La línea dominicana de hoy es más sofisticada que nunca. La inversión de MLB en academias, la tecnología de scouting mejorada y el éxito de jugadores como Juan Soto, Ronald Acuña Jr. y Francisco Lindor han creado un ecosistema de desarrollo profesional que rivaliza con cualquier cosa encontrada en los Estados Unidos. En Manny Canó, nos enorgullece ser parte de este ecosistema — equipando a la próxima generación de estrellas dominicanas con equipamiento digno de su talento extraordinario y ambición.</p>`,
    author: 'Ana García',
    date: '2024-11-18',
    readTime: '8',
    category: 'Culture',
    image: '/img/products/mc-gloves-pair-grass.jpg',
    tags: ['Dominican Republic', 'MLB', 'history', 'pipeline', 'culture'],
  },
  {
    id: 6,
    slug: 'training-tips-from-pro-players',
    title: 'Training Tips from Pro Players',
    titleEs: 'Consejos de Entrenamiento de Jugadores Profesionales',
    excerpt:
      'We sat down with professional players across Latin America to gather their most valuable training insights. From batting practice routines to mental preparation, these are the habits that separate good players from great ones.',
    excerptEs:
      'Nos sentamos con jugadores profesionales de toda América Latina para recopilar sus conocimientos de entrenamiento más valiosos. Desde rutinas de práctica de bateo hasta preparación mental, estos son los hábitos que separan a los buenos jugadores de los grandes.',
    content: `<p>Every professional baseball player has a routine — a carefully constructed sequence of drills, exercises, and mental preparations that they believe gives them an edge. We interviewed players across multiple MLB organizations and Latin American winter leagues to identify the training habits that consistently appear among the game's elite. What we found wasn't revolutionary, but it was revealing: the difference between good and great often comes down to consistency, intentionality, and the willingness to do the boring work.</p>

<h3>The Tee Is Your Best Friend</h3>

<p>Every single player we spoke with emphasized the importance of tee work. Not lazy, going-through-the-motions tee work, but deliberate practice with a specific focus. Work on driving the ball to the opposite field, then pull-side, then up the middle. Use tape on the ball to see your contact point. Record your swings and compare them to your best at-bats. The tee never cheats — it tells you exactly where your swing is, without the variability of a thrown pitch. Many pros spend 30 to 45 minutes on the tee before ever stepping into a batting cage.</p>

<h3>Defense Wins in the Details</h3>

<p>Hitting gets the glory, but defense separates good players from great ones. Infielders should practice fielding with a purpose — work on your backhand, your forehand, your slow roller technique, and your double-play pivot. Outfielders need to focus on route efficiency, first-step quickness, and throwing accuracy from different arm angles. Catchers should set aside time daily for blocking drills, pop-up recovery, and transfer-and-throw repetitions. The Manny Canó Pro Glove is designed with these specific drills in mind — our Pro-Fit System ensures the glove feels like a natural extension of your hand during high-repetition training.</p>

<h3>The Mental Game</h3>

<p>Perhaps the most underrated aspect of baseball training is mental preparation. Visualization — mentally rehearsing at-bats, defensive plays, and game situations — is used by virtually every MLB player. Develop a pre-pitch routine and stick with it. Learn to control your breathing between pitches. Study opposing pitchers and tendencies. The mental game in baseball is like a muscle: the more you train it, the stronger it becomes. Several players we interviewed mentioned that their biggest breakthrough came not from physical training, but from learning to manage their emotions and maintain focus during the long grind of a baseball season.</p>`,
    contentEs: `<p>Cada jugador profesional de béisbol tiene una rutina — una secuencia cuidadosamente construida de ejercicios, prácticas y preparaciones mentales que creen que les dan ventaja. Entrevistamos a jugadores de múltiples organizaciones de MLB y ligas invernales latinoamericanas para identificar los hábitos de entrenamiento que consistentemente aparecen entre la élite del juego. Lo que encontramos no fue revolucionario, pero fue revelador: la diferencia entre bueno y grande a menudo se reduce a consistencia, intencionalidad y la disposición de hacer el trabajo aburrido.</p>

<h3>El Tee Es Tu Mejor Amigo</h3>

<p>Cada jugador con el que hablamos enfatizó la importancia del trabajo en tee. No un trabajo en tee perezoso o por hacer, sino práctica deliberada con un enfoque específico. Trabaja en impulsar la pelota al campo contrario, luego al lado del pull, luego por el medio. Usa cinta en la pelota para ver tu punto de contacto. Graba tus swings y compáralos con tus mejores turnos al bate. El tee nunca miente — te dice exactamente dónde está tu swing, sin la variabilidad de un lanzamiento. Muchos profesionales pasan 30 a 45 minutos en el tee antes de entrar a una jaula de bateo.</p>

<h3>La Defensa Gana en los Detalles</h3>

<p>El bateo se lleva la gloria, pero la defensa separa a los buenos jugadores de los grandes. Los infielders deben practicar el fildeo con propósito — trabaja en tu revés, tu derecha, tu técnica de rodada lenta y tu giro para doble play. Los jardineros necesitan enfocarse en la eficiencia de ruta, la rapidez del primer paso y la precisión de lanzamiento desde diferentes ángulos del brazo. Los catchers deben dedicar tiempo diario a ejercicios de bloqueo, recuperación de pop-ups y repeticiones de transferencia y lanzamiento. El Guante Pro Manny Canó está diseñado pensando en estos ejercicios específicos — nuestro Sistema Pro-Fit asegura que el guante se sienta como una extensión natural de tu mano durante el entrenamiento de alta repetición.</p>

<h3>El Juego Mental</h3>

<p>Tal vez el aspecto más subestimado del entrenamiento de béisbol es la preparación mental. La visualización — ensayar mentalmente turnos al bate, jugadas defensivas y situaciones de juego — es utilizada prácticamente por cada jugador de MLB. Desarrolla una rutina pre-lanzamiento y manténla. Aprende a controlar tu respiración entre lanzamientos. Estudia a los pitchers oponentes y sus tendencias. El juego mental en el béisbol es como un músculo: mientras más lo entrenas, más fuerte se vuelve. Varios jugadores que entrevistamos mencionaron que su mayor avance vino no del entrenamiento físico, sino de aprender a manejar sus emociones y mantener el enfoque durante la larga exigencia de una temporada de béisbol.</p>`,
    author: 'Luis Herrera',
    date: '2024-11-01',
    readTime: '9',
    category: 'Training',
    image: '/img/products/mc-pelotas-pro.jpg',
    tags: ['training', 'drills', 'mental game', 'tee work', 'defense'],
  },
];

export async function GET() {
  return NextResponse.json(blogPosts);
}

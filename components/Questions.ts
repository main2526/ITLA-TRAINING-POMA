export const quizData = [
  {
    question:
      "¿En qué se parecen una sartén y un cuchillo? (Escoja la respuesta más general y completa). En que ambos instrumentos...",
    options: [
      "son de metal.",
      "son utensilios de cocina.",
      "tienen mango.",
      "son vasijas.",
    ],
    answer: 1,
  },
  {
    question:
      'Indique el número de errores de ortografía en la frase: "En el vidrio delantero de mi caro hayé una aveja"',
    options: ["uno.", "dos.", "tres.", "cuatro."],
    answer: 2, // caro -> carro, hayé -> hallé, aveja -> abeja
  },
  {
    question: "Si 'limitar' es a 'restringir', entonces 'bloquear' es a...",
    options: ["parar.", "impedir.", "tapiar.", "delimitar."],
    answer: 1,
  },
  {
    question:
      "Ordenando las letras (S, A, I, H, S, E, T, I) se puede obtener el nombre de...",
    options: ["un país.", "una montaña.", "un paraje.", "un parque nacional."],
    answer: 3, // Haitises
  },
  {
    question:
      "En una carrera, Juan corrió más ligero que Pedro, Pedro la mitad que Sergio, y Sergio un quinto más veloz que Juan. ¿Quién llegó primero?",
    options: ["Juan.", "Sergio.", "Pedro.", "No se sabe."],
    answer: 1, // Sergio > Juan > Pedro
  },
  {
    question:
      "El precio de un producto era de US$15 y ahora es US$18. ¿En qué porcentaje ha subido?",
    options: ["15%", "18%", "20%", "25%"],
    answer: 2, // (18-15)/15 * 100 = 20%
  },
  {
    question: "Halle el valor de X en la expresión: (60 - X) * 2 / 4 = 20",
    options: ["40.", "20.", "30.", "Faltan datos."],
    answer: 1, // (60 - 20) * 2 / 4 = 40 * 2 / 4 = 80 / 4 = 20
  },
  {
    question:
      "Un curso tiene 60 alumnos. El 20% tiene 19 años, el 30% tiene 20 y el 40% más de 20 años. ¿Cuántos alumnos pueden tener 18 años o menos?",
    options: ["10.", "9.", "7.", "6."],
    answer: 3, // 20%+30%+40% = 90%. Queda el 10%. El 10% de 60 es 6.
  },
  {
    question:
      "Si aumentamos en una unidad un número X, ¿en cuánto aumentará su cuadrado?",
    options: ["X²", "2X + 1", "2X + 2(X+1)", "X - (X-1)"],
    answer: 1, // (X+1)² - X² = X² + 2X + 1 - X² = 2X + 1
  },
  {
    question:
      "¿Cuántos cubos hay en el conjunto, contando los que se ven y los que no se ven?",
    options: ["9", "12", "10", "11"],
    // Imagen de referencia en el PDF pregunta 33
    answer: 2, // La respuesta correcta es "10", que corresponde al índice 2
  },
  {
    question:
      'Si leemos la siguiente frase que está escrita al revés, ¿qué se podría leer? "onimac oy oir led alliro al rop"',
    options: [
      "Por el bosque yo canto y río.",
      "Por la playa yo me río.",
      "Por la orilla del mar yo me río.",
      "Por la orilla del río yo camino.",
    ],
    answer: 3,
  },
  {
    question:
      "Un albañil empañeta 5 metros cuadrados de pared en un día. Si le pagan a RD$500 el metro y le contratan por tres días, ¿cuánto cobrará?",
    options: ["RD$ 4,500", "RD$ 9,500", "RD$ 7,500", "RD$ 6,200"],
    answer: 2, // 5 m²/día * 3 días = 15 m². 15 m² * $500/m² = $7,500
  },
  {
    question:
      'La suma de 2/6 y 2/3 de un número "X" es 9. ¿Cuál es el valor de ese número?',
    options: ["6", "5", "7", "9"],
    answer: 3, // 2/6 X + 2/3 X = 1/3 X + 2/3 X = 3/3 X = X. Por tanto X=9.
  },
  {
    question:
      "Compare las dos columnas de cada alternativa y diga en cuál de ellas no existe ningún error al copiarlas de nuevo.",
    options: [
      "CDAJKLMO - DDAJKLMO",
      "25J74MAZ - 26J74MZA",
      "AEOAEAOE - AEAAEAAE",
      "112JABZM - 112JABZM",
    ],
    answer: 3,
  },
  {
    question: "El Sol es una estrella porque...",
    options: [
      "es el centro de nuestro sistema solar.",
      "es el astro más grande del universo.",
      "emite luz y calor propios.",
      "está compuesto de gases calientes.",
    ],
    answer: 2,
  },

  {
    question:
      "A continuación se le presenta el texto titulado Un buargumento que debe leer pausadamente para contestar luego unas preguntas /  ----------/ Una inferencia deductiva es aquella donde las conclusiones a las que se consideranvalidas son las que serían necesariamente verdaderas a partir de las premisas. Es decir, laconclusión está implícita en las premisas, o afirmaciones en las que se basa la misma conclusión. Porotro lado, una inferencia inductiva es aquella en la que la conclusión se basa en ejemplos oafirmaciones a partir de los cuales se realiza un salto inductivo o generalización. En otras palabras,la conclusión va más allá de las premisas y no alcanza totalmente la certeza.",
    options: ["Relacionado", "Implicado", "Destacado", "Precipitado"],
    answer: 2,
  },

  {
    question:
      "Cuando una compañía aclama que sus productos son los mejores porque mucha gentelos utiliza, estaría utilizando",
    options: [
      "un razonamiento inductivo",
      "argumentum ad populum.",
      "una falacia ad hominem",
      "na generalización precipitada",
    ],
    answer: 1,
  },

  {
    question: "Cuál sería la idea principal del último párrafo (líneas 36-43)?",
    options: [
      "un argumento debe ofrecer evidencias",
      " evidencias pueden clasificarse en hechos y opiniones",
      "Un lector crítico debe examinar los hechos un que el actor presenta",
      "Un hecho es una afirmación",
    ],
    answer: 0,
  },

  {
    question: "Cuål de las siguientes enunciaciones seria un hecho?",
    options: [
      "Estos estudiantes son realmente inteligentes",
      "La temperatura en el aula es de 350 Celsius.",
      "George W. Bush nunca mereció ser presidente, porque menos de la mitad de los votantes en el año 2000 votaron por él.",
      "Este curso está siempre caliente y hediondo!",
    ],
    answer: 1,
  },

  {
    question:
      "De acuerdo al tercer párrafo (líneas 15-21), ¿cuál sería el patrón de inferencias del siguiente ejemplo? Ejemplo: Todos los seres humanos temen a la muerte capital. Los criminales son seres humanos. Por lo tanto, los criminales le temen a la muerte capital.",
    options: [
      "Razonamiento deductivo",
      "Razonamiento inductivo",
      "Falacia ad hominem.",
      "Generalización precipitada",
    ],
    answer: 0,
  },

  {
    question: "¿Cuál sería la idea principal del segundo párrafo (líneas 8-14)",
    options: [
      "uy pocas veces las personas estará empenadas en no reconocer las fallas que poseen IOS argumentos.",
      "La argumentación es una parte  muy importante en los textos que  leemos",
      "gunas amistades han terminado por el  simple hecho de intentar demostrar las fallas del argumento del compañero",
      "buen lector debe atender a esos tres puntos si desea ser un lector critico",
    ],
    answer: 1,
  },

  {
    question: "Cuál es el tono que utiliza el autor en este texto?",
    options: [
      "Subjetivo, dogmático",
      "Serio, sincero, solemne",
      "Sentimental, nostálgico",
      "Objetivo, directo, crítico",
    ],
    answer: 3,
  },

  {
    question:
      "Si un abogado cita un número de ejemplos, hechos y estudios de casos para ilustrar laefectividad del castigo capital (la pena de muerte) en varios países, y de esta forma defender su creencia firme de que este debe instituirse, estaría usando",
    options: [
      "Una inferencia deductiva",
      "Una inferencia inductiva",
      "Un argumentum ad populum",
      "Una falacia ad hominem",
    ],
    answer: 0,
  },

  {
    question: "Cuál podría ser un nuevo título para este escrito?",
    options: [
      "Generalización precipitada",
      "¿Cuándo un razonamiento es falaz?",
      "¿Qué debe hacer un lector crítico?",
      "Tipos de razonamiento.",
    ],
    answer: 2,
  },

  {
    question: "En la línea 38 ¿qué significa la palabra aseveración?",
    options: ["Información", "Afirmación", "Indagación", "Comprobación."],
    answer: 1,
  },

  {
    question:
      "En este ejercicio se le presentan dos elementos relacionados entre sí, luego cuatroexpresiones. Su tarea consiste en completarla, con la expresión que tenga el mismo tipo de relación sobre 100 que hay en esta expresión  //// .. 1/5 es 0.20, como ...",
    options: [
      "1/2 es a 0.50.",
      "3/8 es a 0.40.",
      "3/4 es a 0.70",
      "2/6 es a 0.30",
    ],
    answer: 0,
  },

  {
    question:
      "En esta serie de números, hay uno que no está de acuerdo a una regla de formación de a serie. Adivine la regla de formación de la misma e indica cuál de estos número no debe ir /... 8, 7, 14, 13, 26, 25, 55, 49, 98, ...",
    options: ["4", "55", "7", "98"],
    answer: 1,
  },

  {
    question:
      "En 22 minutos un carro ha ido desde la ciudad A hasta la ciudad B, que distan entre sí 26 km. Seleccione la solución que más se aproxime a la velocidad promedio por hora (redondee su resultado en dos decimales)",
    options: ["70.91", "71.00", "70.90", "####"],
    answer: 2,
  },

  {
    question:
      "Qué clase de ángulos se observan en el interior de la siguiente figura? ",
    options: [
      "2 rectos, 4 obtusos, 1 agudo",
      "B. 2 rectos, 3 obtusos, 1 agudo",
      "rectos, 3 obtusos, 1 agudo",
      "rectos, 2 obtusos, 0 agudos",
    ],
    answer: 1,
  },

  {
    question:
      "C andida ha recibido para su cumpleaños RDS 2,000 pesos de sus padres.  entrada del cine a sus tres amigas además de la suya a RDS 200 pesos por entrada. ¿Cuánto dinero le queda 'en dólares', suponiendo que el dólar está a 40 x 1?",
    options: [
      "Más de USS 35 dólares",
      "RD-$ 1,600 pesos.",
      "US-$ 25 dólares",
      "US-$ 30 dólares",
    ],
    answer: 3,
  },

  {
    question: " Qué número debe ir en lugar de la X en la expresión siguiente?",
    options: ["X=1; Y = 6.", "X= 2; Y = 4.", "X=3; Y = 4.", "X=4; Y=3."],
    answer: 2,
  },

  {
    question:
      "Analizar el siguiente cuadro que contiene dos series de números y busque la regla de crecimiento de las variables W y Z, y señale cuál es la regla de crecimiento correcta / W: 3, 8, L, 18, 23, ... Z: 1, 7, 13, M, 25, ..",
    options: [
      "+3 en L, +4 en M.",
      "4 en L, +5 en M.",
      "5 en L, +6 en M",
      "6 en L, +7 en M",
    ],
    answer: 2,
  },

  {
    question:
      "Hallar cual de los dos pares de valores otorgados a X e Y en la expresión: X-Y/2 =  son válidos",
    options: ["X=1; Y = 4", "X=3; Y =6", "X= 4; Y = 7", "X = 6; Y = 4"],
    answer: 1,
  },

  {
    question:
      "Hallar cual de los dos pares de valores otorgados a X e Y en la expresión: X-Y/2 =  son válidos son unos circulos con flechas dentro sin punta",
    options: ["## ", "##", "C", "##"],
    answer: 2,
  },

  {
    question:
      "De los cuatro grupos de letras que se colocan a continuación, uno sigue una regla de",
    options: ["qp ", "db", "oo", "hi"],
    answer: 2,
  },

  {
    question:
      "Mire la siguiente figura. Si la rotamos hacia su derecha 3/4 de vuelta ¿en qué lugar quedará situada la pieza inferior izquierda? / es como un rompe cabeza",
    options: [
      "superior-derecha",
      "inferior-izquierda",
      "inferior-derecha",
      "superior-izquierda",
    ],
    answer: 2,
  },

  {
    question:
      "Cuántos cubos se tendrían que añadir al conjunto anterior para completar una figura tres veces más grande?",
    options: ["17", "21", "19", "16"],
    answer: 2,
  },

  {
    question:
      "Siga con la vista el trazado de figura angular sobre la red de puntos rojos e indiquepor cuál punto rojo no estaría uno de los vértices del trazado de la figura./ Hay una flecha rosada y una secuencia de puntos rojos ",
    options: ["#", "#", "#", "D"],
    answer: 3,
  },

  {
    question:
      "Qué figura completa el razonamiento que se presenta en la primera serie de figuras?/ son figuras geometricas es a como es / especies de triangulos y pentagonos",
    options: ["#", "#", "C", "#"],
    answer: 2,
  },

  {
    question:
      "Cuántas veces se repite la figura de la izquierda en el conjunto de trazos del siguiente",
    options: ["Una", "Dos", "Tres", "Cuatro"],
    answer: 1,
  },

  {
    question:
      "Busque la relación existente entre las dos primeras figuras, y aplíquela en la siguiente figura, escogiendo una de las alternativas propuestas",
    options: ["#", "#", "C", "#"],
    answer: 2,
  },

  {
    question:
      "a primera figura representa un papel rectángulo doblado con forma triangular, si lo desdoblamos siguiendo el sentido de la flecha, ¿cuál de las cuatro opciones sería lafigura que obtendríamos?",
    options: ["#", "B", "#", "#"],
    answer: 1,
  },

  {
    question:
      "Indique la figura que no se puede igualar nunca a la primera, aunque gire, muchas veces, en el mismo sentido / son rectangulos con 2 lineas y nunca igualaran la primera figura",
    options: ["A", "#", "#", "#"],
    answer: 0,
  },

  {
    question:
      "Sobre unas coordenadas cartesianas se han colocado cuatro rayitas (A, B, C, D). Cada 43Arayita está definida por dos números que indican la separación del origen (abscisa) y la altura (ordenada). Los valores asignados a uno de los puntos no está bien. Podría Indicar ¿cuál de ellos es?/ es una plano cartesiano a la mitad",
    options: ["(4,6.5)", "(5,2).", "(5,4)", "(6,2)"],
    answer: 1,
  },

  {
    question:
      " tarea consiste en llenar la figura blanca de la izquierda, con tres figuras de la derecha. ¿ Cuál de ellas no sería utilizada? / donde hay varias figuras y al final hay un cuadrado medio-virado",
    options: ["#", "#", "#", "D"],
    answer: 3,
  },

  {
    question:
      "Continúe la serie de figuras del rectángulo primero, con la opción del rectángulo de a derecha que le parezca más razonable / son varias figuras y en penultimo lugar hay un cuadrado",
    options: ["#", "#", "C", "#"],
    answer: 2,
  },

  {
    question: "Generalmente utilizamos zapatos para ..",
    options: [
      "proteger nuestra salud",
      "presumir.",
      "protegernos del frío",
      "no mancharse los pies",
    ],
    answer: 0,
  },

  {
    question:
      "ra averiguar la velocidad promedio a la que ha ido un autobús desde Santo Domingoa Puerto Plata, sabiendo que ha tardado 4 horas y media, y que ha recorrido 450 km y que tuvo una parada de 15 minutos, ¿Cuál de estas fórmulas utilizaría para responder a la pregunta?",
    options: [
      "Velocidad = espacio x tiempo total",
      "Espacio = recorrido x velocidad",
      "Velocidad = espacio / tiempo total empleado",
      "Velocidad = Vespacio / tiempo real utilizado",
    ],
    answer: 3,
  },

  {
    question:
      "Indique cuál de los siguientes fenómenos, en la actualidad, crea la mayor preocupación mundial",
    options: [
      "El calentamiento de nuestro planeta.",
      "Los incendios forestales",
      "El aumento del número de huracanes",
      "La contaminación en las grandes ciudades",
    ],
    answer: 0,
  },

  {
    question: "Qué es un manatí? ¿ Cuál sería la mejor descripción?",
    options: [
      "Un mamífero, muy pesado, parecido a la ballena",
      "Un animal prehistórico",
      "Un animal, parecido a un cerdo, que vive en el agua",
      "Un mamífero marino, muy pesado, que suele vivir en aguas templadas",
    ],
    answer: 3,
  },

  {
    question: "Cuál de los siguientes animales marinos es mamífero?",
    options: ["El pinguino", "La tortuga", "El tiburón", "La ballena."],
    answer: 3,
  },

  {
    question:
      "Por que a la misma distancia y en las mismas condiciones, dos hombres hablando a gritos podrían escucharse entre dos barcas y no en los paseos espaciales?",
    options: [
      "Por la falta de aire que lleve el sonido",
      "Por la presión de las cabinas",
      "Por la velocidad que llevan las naves",
      "Por los trajes espaciales",
    ],
    answer: 0,
  },
];

/ *!
	* Biblioteca jQuery JavaScript v1.11.1
		* http://jquery.com/
 *
 * Incluye Sizzle.js
	* http://sizzlejs.com/
 *
 * Copyright 2005, 2014 jQuery Foundation, Inc.y otros colaboradores
	* Publicado bajo la licencia MIT
		* http://jquery.org/license
 *
 * Fecha: 2014 - 05 - 01T17: 42Z
	* /

		(función(global, fábrica) {

			if(typeof module === "object" && typeof module.exports === "object") {
	// Para entornos CommonJS y CommonJS-like donde está presente una ventana adecuada,
	// ejecutar la fábrica y obtener jQuery
	// Para entornos que no poseen inherentemente una ventana con un documento
	// (como Node.js), exponer una fábrica de fabricación de jQuery como module.exports
	// Esto acentúa la necesidad de crear una ventana real
	// por ejemplo, var jQuery = require ("jquery") (ventana);
	// Ver boleto # 14549 para más información
	module.exports = global.document ?
		fábrica(global, verdadero) :
		función(w) {
		if (!w.document) {
			lanzar un nuevo error("jQuery requiere una ventana con un documento");
		}
		retorno de fábrica(w);
	};
} demás {
	fábrica(global);
}

// Pasa esto si la ventana aún no está definida
} (typeof window! == "undefined" ? window : this, function (window, noGlobal) {

	// No puedo hacer esto porque varias aplicaciones, incluido el seguimiento de ASP.NET
	// la pila a través de argumentos.caller.callee y Firefox muere si
	// intenta rastrear a través de cadenas de llamadas "estrictas". (# 13335)
	// Soporte: Firefox 18+
	//

	var deleteIds = [];

	var slice = deletedIds.slice;

	var concat = deletedIds.concat;

	var push = deletedIds.push;

	var indexOf = deleteIds.indexOf;

	var class2type = {};

	var toString = class2type.toString;

	var hasOwn = class2type.hasOwnProperty;

	var support = {};



	var
		version = "1.11.1",

		// Definir una copia local de jQuery
		jQuery = función(selector, contexto) {
			// El objeto jQuery es en realidad solo el constructor init 'mejorado'
			// Necesita init si se llama a jQuery (solo permita que se lance un error si no está incluido)
			devolver nuevo jQuery.fn.init (selector, contexto);
},

	// Soporte: Android <4.1, IE <9
	// Asegúrate de recortar la lista de materiales y la NBSP
	rtrim = / ^ [\ s \ uFEFF \ xA0] + | [\ s \ uFEFF \ xA0] + $ / g,

		// Coincide con la cuerda discontinua para camelizar
		rmsPrefix = / ^ - ms- /,
		rdashAlpha = / - ([\ da-z]) / gi,

			// Usado por jQuery.camelCase como devolución de llamada para reemplazar ()
			fcamelCase = function (all, letter) {
				return letter.toUpperCase();
			};

jQuery.fn = jQuery.prototype = {
	// La versión actual de jQuery que se está utilizando
	jquery: versión,

	constructor: jQuery,

	// Empiece con un selector vacío
	selector: "",

	// La longitud predeterminada de un objeto jQuery es 0
	longitud: 0,

	toArray: function () {
		return slice.call(esto);
	},

	// Obtener el enésimo elemento del conjunto de elementos coincidentes O
	// Obtener todo el conjunto de elementos coincidentes como una matriz limpia
	obtener: function (num) {
		return num! = null ?

			// Devuelve solo un elemento del conjunto
			(num < 0 ? this[num + this.length] : this[num]) :

			// Devuelve todos los elementos en una matriz limpia
			slice.call(esto);
	},

	// Toma una matriz de elementos y empújala hacia la pila
	// (devolviendo el nuevo conjunto de elementos coincidentes)
	pushStack: function (elems) {

		// Construye un nuevo conjunto de elementos coincidentes de jQuery
		var ret = jQuery.merge(este.constructor(), elems);

		// Agrega el objeto antiguo a la pila (como referencia)
		ret.prevObject = esto;
		ret.context = this.context;

		// Devuelve el conjunto de elementos recién formado
		return ret;
	},

	// Ejecuta una devolución de llamada para cada elemento del conjunto coincidente.
	// (Puede sembrar los argumentos con una matriz de argumentos, pero esto es
	// solo se usa internamente.)
	cada uno: función(devolución de llamada, argumentos) {
	return jQuery.each(this, callback, args);
},

mapa: función(devolución de llamada) {
	return this.pushStack(jQuery.map(this, function (elem, i) {
		return callback.call(elem, i, elem);
	}));
},

rebanada: función() {
	return this.pushStack(slice.apply(esto, argumentos));
},

primero: función() {
	devuelve this.eq(0);
},

último: function () {
	devuelve this.eq(-1);
},

eq: función(i) {
	var len = this.length,
		j = + i + (i < 0 ? len : 0);
	return this.pushStack(j > = 0 && j < len ? [this[j]] : []);
},

end: function () {
	devuelve this.prevObject || this.constructor(nulo);
},

// Sólo para uso interno.
// Se comporta como un método de Array, no como un método de jQuery.
empuja empuja,
	sort: deletedIds.sort,
		empalme: DeleteIds.splice
};

jQuery.extend = jQuery.fn.extend = function () {
	var src, copyIsArray, copiar, nombre, opciones, clonar,
		objetivo = argumentos[0] || {},
		i = 1,
		longitud = argumentos.longitud,
		profundo = falso;

	// Manejar una situación de copia profunda
	if (typeof target === "boolean") {
		profundo = objetivo;

		// omite el booleano y el objetivo
		objetivo = argumentos[i] || {};
		i++;
	}

	// Manejar el caso cuando el objetivo es una cadena o algo (posible en una copia profunda)
	if (typeof target! == "object" && !jQuery.isFunction(target)) {
		objetivo = {};
	}

	// extiende jQuery si solo se pasa un argumento
	si(i === longitud) {
		objetivo = esto;
		I--;
	}

	para(; i < longitud; i++) {
		// Tratar solo con valores no nulos / indefinidos
		if ((opciones = argumentos[i])! = nulo) {
			// Extiende el objeto base
			para(nombre en opciones) {
				src = objetivo[nombre];
				copiar = opciones[nombre];

				// Evita un bucle sin fin
				si(destino === copiar) {
					Seguir;
				}

				// Recurrir si estamos fusionando objetos simples o matrices
				if (deep && copy && (jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)))) {
					if (copyIsArray) {
						copyIsArray = falso;
						clon = src && jQuery.isArray(src) ? src : [];

					} demás {
						clon = src && jQuery.isPlainObject(src) ? src : {};
					}

					// Nunca mueva objetos originales, clónelos
					target[nombre] = jQuery.extend(deep, clone, copy);

					// No introduzcas valores indefinidos
				} más si(copiar! == indefinido) {
					destino[nombre] = copiar;
				}
			}
		}
	}

	// Devuelve el objeto modificado
	objetivo de retorno;
};

jQuery.extend({
	// Único para cada copia de jQuery en la página
	expando: "jQuery" + (version + Math.random()).replace(/ \ D / g, ""),

	// Supongamos que jQuery está listo sin el módulo listo
	isReady: cierto,

	error: function (msg) {
		lanzar un nuevo error(msg);
	},

	noop: function () { },

	// Consulte test / unit / core.js para obtener detalles sobre isFunction.
	// Desde la versión 1.3, métodos y funciones DOM como alert
	// no son compatibles. Devuelven falso en IE (# 2968).
	isFunction: function (obj) {
		return jQuery.type(obj) === "función";
	},

	isArray: Array.isArray || function (obj) {
		return jQuery.type(obj) === "matriz";
	},

	isWindow: function (obj) {
		/ * jshint eqeqeq: falso * /
		return obj! = null && obj == obj.window;
	},

	isNumeric: function (obj) {
		// parseFloat NaNs falsos positivos de conversión numérica (nulo | verdadero | falso | "")
		// ... pero malinterpreta las cadenas de números iniciales, particularmente los literales hexadecimales ("0x ...")
		// la resta fuerza infinitos a NaN
		return !jQuery.isArray(obj) && obj - parseFloat(obj) > = 0;
	},

	isEmptyObject: function (obj) {
		var nombre;
		para(nombre en obj) {
			falso retorno;
		}
		devuelve verdadero;
	},

	isPlainObject: function (obj) {
		var key;

		// Debe ser un objeto.
		// Debido a IE, también tenemos que verificar la presencia de la propiedad del constructor.
		// Asegúrese de que los nodos DOM y los objetos de ventana no pasen también
		if (!obj || jQuery.type(obj)! == "object" || obj.nodeType || jQuery.isWindow(obj)) {
			falso retorno;
		}

		intentar {
			// La propiedad no propia del constructor debe ser Object
			if (obj.constructor &&
				!hasOwn.call(obj, "constructor") &&
				!hasOwn.call(obj.constructor.prototype, "isPrototypeOf")) {
				falso retorno;
			}
		} captura(e) {
			// IE8,9 arrojará excepciones en ciertos objetos host # 9897
			falso retorno;
		}

		// Soporte: IE <9
		// Maneja la iteración sobre las propiedades heredadas antes que las propias.
		if (support.ownLast) {
			for (introduzca obj) {
				return hasOwn.call(obj, clave);
			}
		}

		// Las propiedades propias se enumeran en primer lugar, para acelerar,
		// si el último es propio, entonces todas las propiedades son propias.
		para(introduzca obj) { }

		tecla de retorno === indefinido || hasOwn.call(obj, clave);
	},

	tipo: función(obj) {
		if(obj == null) {
	return obj + "";
}
tipo de retorno de obj === "objeto" || typeof obj === "función" ?
	class2type[toString.call(obj)] || "objeto" :
	typeof obj;
	},

// Evalúa un script en un contexto global
// Soluciones alternativas basadas en los hallazgos de Jim Driscoll
// http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
globalEval: function (datos) {
	if (datos && jQuery.trim(datos)) {
		// Usamos execScript en Internet Explorer
		// Usamos una función anónima para que el contexto sea ventana
		// en lugar de jQuery en Firefox
		(window.execScript || función(datos) {
			ventana["eval"].call(ventana, datos);
		} ) (datos);
	}
},

// Convertir guiones en camelCase; utilizado por los módulos css y de datos
// Microsoft olvidó usar el prefijo de su proveedor (# 9572)
camelCase: function (string) {
	return string.replace(rmsPrefix, "ms-").replace(rdashAlpha, fcamelCase);
},

nodeName: function (elem, name) {
	return elem.nodeName && elem.nodeName.toLowerCase() === nombre.toLowerCase();
},

// args es solo para uso interno
each: function (obj, callback, args) {
	valor var,
		i = 0,
		length = obj.length,
		isArray = isArraylike(obj);

	if (argumentos) {
		if (isArray) {
			para(; i < longitud; i++) {
				valor = callback.apply(obj[i], args);

				si(valor === falso) {
					descanso;
				}
			}
		} demás {
			for (i in obj) {
				valor = callback.apply(obj[i], args);

				si(valor === falso) {
					descanso;
				}
			}
		}

		// Un caso especial y rápido para el uso más común de cada
	} demás {
		if (isArray) {
			para(; i < longitud; i++) {
				valor = callback.call(obj[i], i, obj[i]);

				si(valor === falso) {
					descanso;
				}
			}
		} demás {
			for (i in obj) {
				valor = callback.call(obj[i], i, obj[i]);

				si(valor === falso) {
					descanso;
				}
			}
		}
	}

	return obj;
},

// Soporte: Android <4.1, IE <9
recortar: función(texto) {
	devolver texto == nulo ?
		"" :
		(texto + "").replace(rtrim, "");
},

// los resultados son solo para uso interno
makeArray: function (arr, results) {
	var ret = resultados || [];

	if (arr! = null) {
		if (isArraylike(Object(arr))) {
			jQuery.merge(ret,
				typeof arr === "cadena" ?
					[arr] : arr
			);
		} demás {
			push.call(ret, arr);
		}
	}

	return ret;
},

inArray: function (elem, arr, i) {
	var len;

	si(arr) {
		if (indexOf) {
			return indexOf.call(arr, elem, i);
		}

		len = arr.length;
		yo = yo ? yo < 0 ? Math.max(0, len + i) : i : 0;

		para(; i < len; i++) {
			// Omitir el acceso en matrices dispersas
			if (i en arr && arr[i] === elem) {
				volver i;
			}
		}
	}

	return -1;
},

fusionar: función(primero, segundo) {
	var len = + second.length,
		j = 0,
		i = primera.longitud;

	while (j < len) {
		primero[i++] = segundo[j++];
	}

	// Soporte: IE <9
	// Conversión alternativa de .length a NaN en objetos que de otro modo se parecen a una matriz (por ejemplo, NodeLists)
	if (len! == len) {
		while (segundo[j]! == indefinido) {
			primero[i++] = segundo[j++];
		}
	}

	primera.longitud = i;

	regresar primero;
},

grep: function (elems, callback, invertir) {
	var callbackInverse,
		coincidencias = [],
		i = 0,
		length = elems.length,
		callbackExpect = !invertir;

	// Ir a través de la matriz, solo guardando los elementos
	// que pasan la función de validador
	para(; i < longitud; i++) {
		callbackInverse = !callback(elems[i], i);
		if (callbackInverse! == callbackExpect) {
			fósforos.push(elems[i]);
		}
	}

	devolver coincidencias;
},

// arg es solo para uso interno
map: function (elems, callback, arg) {
	valor var,
		i = 0,
		length = elems.length,
		isArray = isArraylike(elems),
		ret = [];

	// Repasa la matriz, traduciendo cada uno de los elementos a sus nuevos valores
	if (isArray) {
		para(; i < longitud; i++) {
			valor = devolución de llamada(elems[i], i, arg);

			si(valor! = nulo) {
				ret.push(valor);
			}
		}

		// Revisa todas las claves del objeto,
	} demás {
		para(yo en elems) {
			valor = devolución de llamada(elems[i], i, arg);

			si(valor! = nulo) {
				ret.push(valor);
			}
		}
	}

	// Aplanar las matrices anidadas
	return concat.apply([], ret);
},

// Un contador GUID global para objetos
guid: 1,

	// Vincular una función a un contexto, opcionalmente aplicando parcialmente cualquier
	// argumentos.
	proxy: función(fn, contexto) {
	var args, proxy, tmp;

	si(tipo de contexto === "cadena") {
		tmp = fn[contexto];
		contexto = fn;
		fn = tmp;
	}

	// Comprobación rápida para determinar si el objetivo es invocable, en la especificación
	// esto arroja un TypeError, pero solo devolveremos undefined.
	if (!jQuery.isFunction(fn)) {
		volver indefinido;
	}

	// Enlace simulado
	args = slice.call(argumentos, 2);
	proxy = función() {
		return fn.apply(contexto || esto, args.concat(slice.call(argumentos)));
	};

	// Establece el guid del manejador único al mismo del manejador original, para que pueda ser eliminado
	proxy.guid = fn.guid = fn.guid || jQuery.guid++;

	proxy de retorno;
},

ahora: function () {
	return + (nueva fecha());
},

// jQuery.support no se usa en Core pero otros proyectos adjuntan su
// propiedades para que exista.
soporte soporte
});

// Rellenar el mapa class2type
jQuery.each("Número booleano Cadena Función Array Fecha RegExp Error de objeto".split(""), función(i, nombre) {
	class2type ["[objeto" + nombre + "]"] = name.toLowerCase();
});

function isArraylike(obj) {
	var length = obj.length,
		tipo = jQuery.type(obj);

	if (escriba === "función" || jQuery.isWindow(obj)) {
		falso retorno;
	}

	if (obj.nodeType === 1 && length) {
		devuelve verdadero;
	}

	tipo de retorno === "matriz" || longitud === 0 ||
		typeof length === "número" && longitud > 0 && (longitud - 1) en obj;
}
var chisporroteo =
	/ *!
	* Sizzle CSS Selector Engine v1.10.19
		* http://sizzlejs.com/
 *
 * Copyright 2013 jQuery Foundation, Inc.y otros colaboradores
	* Publicado bajo la licencia MIT
		* http://jquery.org/license
 *
 * Fecha: 2014 - 04 - 18
	* /
		(función(ventana) {

			var i,
			apoyo,
			Expr,
			getText,
			isXML,
			tokenizar
	compilar,
			Seleccione,
			outsidemostContext,
			sortInput,
			hasDuplicate,

			// Variables de documentos locales
			setDocument
	documento,
			docElem,
			documentIsHTML,
			rbuggyQSA,
			rbuggyMatches,
			coincidencias,
			contiene

	// Datos específicos de la instancia
	expando = "chisporroteo" + - (nueva fecha()),
	favoriteDoc = window.document,
	dirruns = 0,
	hecho = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function (a, b) {
		si(a === b) {
			hasDuplicate = true;
		}
		return 0;
	},

	// Constantes de propósito general
	strundefined = typeof undefined,
	MAX_NEGATIVO = 1 << 31,

	// Métodos de instancia
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	empujar = arr.push,
	rebanada = arr.rebanada,
	// Usa un indexOf reducido si no podemos usar uno nativo
	indexOf = arr.indexOf || función(elem) {
	var i = 0,
		len = this.length;
	para(; i < len; i++) {
		si(este[i] === elem) {
			volver i;
		}
	}
	return -1;
},

booleanos = "comprobado | seleccionado | asíncrono | enfoque automático | reproducción automática | controles | aplazar | desactivado | oculto | ismap | bucle | múltiple | abierto | solo lectura | obligatorio | ámbito",

	// Expresiones regulares

	// Caracteres de espacio en blanco http://www.w3.org/TR/css3-selectors/#whitespace
	espacio en blanco = "[\\ x20 \\ t \\ r \\ n \\ f]",
		// http://www.w3.org/TR/css3-syntax/#characters
		characterEncoding = "(?: \\\\. | [\\ w-] | [^ \\ x00 - \\ xa0]) +",

		// Modelado libremente en caracteres identificadores CSS
		// Un valor sin comillas debe ser un identificador CSS http://www.w3.org/TR/css3-selectors/#attribute-selectors
		// Sintaxis adecuada: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
		identifier = characterEncoding.replace("w", "w #"),

		// Selectores de atributos: http://www.w3.org/TR/selectors/#attribute-selectors
		atributos = "\\ [" + espacio en blanco + "* (" + codificación de caracteres + ") (?:" + espacio en blanco +
			// Operador (captura 2)
			"* ([* ^ $ |! ~]? =)" + espacio en blanco +
				// "Los valores de atributo deben ser identificadores CSS [captura 5] o cadenas [captura 3 o captura 4]"
				"* (?: '((?: \\\\. | [^ \\\\']) *) '| \" ((?: \\\\. | [^ \\\\\ "] ) *) \ "| (" + identificador + ")) |)" + espacio en blanco +
					"* \\]",

					pseudos = ":(" + codificación de caracteres + ") (?: \\ ((" +
						// Para reducir la cantidad de selectores que necesitan tokenizar en el preFilter, prefiera argumentos:
						// 1. citado (captura 3; captura 4 o captura 5)
						"('((?: \\\\. | [^ \\\\']) *) '| \" ((?: \\\\. | [^ \\\\\ "]) *) \ ") |" +
							// 2. simple (captura 6)
							"((?: \\\\. | [^ \\\\ () [\\]] |" + atributos + ") *) |" +
							// 3. cualquier otra cosa (captura 2)
							". *" +
							") \\) |)",

							// Espacios en blanco iniciales y finales sin escape, capturando algunos caracteres que no son espacios en blanco que preceden a este último
							rtrim = new RegExp("^" + espacio en blanco + "+ | (?: ^ | [^ \\\\]) (?: \\\\.) *)" + espacio en blanco + "+ $", "g "),

							rcomma = new RegExp("^" + espacio en blanco + "*," + espacio en blanco + "*"),
							rcombinators = new RegExp("^" + espacio en blanco + "* ([> + ~] |" + espacio en blanco + ")" + espacio en blanco + "*"),

							rattributeQuotes = new RegExp("=" + espacio en blanco + "* ([^ \\] '\"] *?) " + espacio en blanco + " * \\] ", " g "),

							rpseudo = new RegExp(pseudos),
							ridentifier = new RegExp("^" + identificador + "$"),

							matchExpr = {
								"ID": nueva expresión regular("^ # (" + codificación de caracteres + ")"),
"CLASE": nueva expresión regular("^ \\. (" + Codificación de caracteres + ")"),
	"TAG": nueva RegExp("^ (" + characterEncoding.replace("w", "w *") + ")"),
		"ATTR": nueva expresión regular("^" + atributos),
			"PSEUDO": nueva expresión regular("^" + pseudos),
				"NIÑO": nueva RegExp("^ :( solo | primero | último | enésimo | enésimo-último) - (niño | de tipo) (?: \\ (" + espacio en blanco +
					"* (par | impar | (([+ -] |) (\\ d *) n |)" + espacio en blanco + "* (?: ([+ -] |)" + espacio en blanco +
					"* (\\ d +) |))" + espacio en blanco + "* \\) |)", "i"),
					"bool": nueva expresión regular("^ (?:" + booleanos + ") $", "i"),
						// Para usar en bibliotecas que implementan .is ()
						// Usamos esto para la coincidencia de POS en `select`
						"needContext": new RegExp("^" + espacio en blanco + "* [> + ~] |: (par | impar | eq | gt | lt | nth | primero | último) (?: \\ (" +
							espacio en blanco + "* ((?: - \\ d)? \\ d *)" + espacio en blanco + "* \\) |) (? = [^ -] | $)", "i")
	},

rinputs = / ^ (?: entrada | seleccionar | área de texto | botón) $ / i,
	rheader = / ^ h \ d $ / i,

		rnative = / ^ [^ {] + \ {\ s * \ [nativo \ w /,

// Selectores de ID o TAG o CLASE fácilmente analizables / recuperables
rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = / [+ ~] /,
	rescape = / '| \\ / g,

		// CSS escapa http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
		runescape = new RegExp("\\\\ ([\\ da-f] {1,6}" + espacio en blanco + "? | (" + espacio en blanco + ") |.)", "ig"),
		funescape = function (_, escaped, escapedWhitespace) {
			var high = "0x" + escapado - 0x10000;
			// NaN significa no punto de código
			// Soporte: Firefox <24
			// Solución alternativa interpretación numérica errónea de + "0x"
			volver alto! == alto || escapedWhitespace ?
				escapado :
				alto < 0 ?
					// Punto de código BMP
					String.fromCharCode(alto + 0x10000) :
					// Punto de código del plano suplementario (par suplente)
					String.fromCharCode(alto >> 10 | 0xD800, alto & 0x3FF | 0xDC00);
		};

// Optimizar para push.apply (_, NodeList)
intentar {
	empujar.apply
		(arr = slice.call(favoriteDoc.childNodes)),
		preferidosDoc.childNodes
	);
	// Soporte: Android <4.0
	// Detecta push.apply fallido silenciosamente
	arr[preferenciaDoc.childNodes.length].nodeType;
} captura(e) {
	push = {
		apply: arr.length ?

			// Aprovechar el segmento si es posible
			function (target, els) {
				push_native.apply(destino, segmento.call(els));
			} :

			// Soporte: IE <9
			// De lo contrario, agregue directamente
			function (target, els) {
				var j = target.length,
					i = 0;
				// No puedo confiar en NodeList.length
				while ((objetivo[j++] = els[i++])) { }
				longitud.objetivo = j - 1;
			}
	};
}

función Sizzle(selector, contexto, resultados, semilla) {
	var match, elem, m, nodeType,
		// QSA vars
		i, grupos, antiguo, nid, newContext, newSelector;

	if ((context ? context.ownerDocument || context : favoriteDoc)! == documento) {
		setDocument(contexto);
	}

	contexto = contexto || documento;
	resultados = resultados || [];

	if (!selector || typeof selector! == "cadena") {
		devolver resultados;
	}

	if ((nodeType = context.nodeType)! == 1 && nodeType! == 9) {
		regreso[];
	}

	if (documentIsHTML && !seed) {

		// Atajos
		if ((coincidencia = rquickExpr.exec(selector))) {
			// Aceleración: Sizzle ("# ID")
			si((m = coincidir[1])) {
				if (nodeType === 9) {
					elem = context.getElementById(m);
					// Verifique parentNode para detectar cuándo regresa Blackberry 4.6
					// nodos que ya no están en el documento (jQuery # 6963)
					if (elem && elem.parentNode) {
						// Manejar el caso donde IE, Opera y Webkit devuelven elementos
						// por nombre en lugar de ID
						if (elem.id === m) {
							results.push(elem);
							devolver resultados;
						}
					} demás {
						devolver resultados;
					}
				} demás {
					// El contexto no es un documento
					if (context.ownerDocument && (elem = context.ownerDocument.getElementById(m)) &&
						contiene(contexto, elem) && elem.id === m) {
						results.push(elem);
						devolver resultados;
					}
				}

				// Aceleración: Sizzle ("TAG")
			} más si(coincide con[2]) {
				push.apply(resultados, context.getElementsByTagName(selector));
				devolver resultados;

				// Aceleración: Sizzle (". CLASE")
			} más si((m = coincidir con[3]) && support.getElementsByClassName && context.getElementsByClassName) {
				push.apply(resultados, context.getElementsByClassName(m));
				devolver resultados;
			}
		}

		// Ruta QSA
		if (support.qsa && (!rbuggyQSA || !rbuggyQSA.test(selector))) {
			nid = antiguo = expando;
			newContext = contexto;
			newSelector = nodeType === 9 && selector;

			// qSA funciona de forma extraña en consultas con raíz de elementos
			// Podemos solucionar esto especificando una ID adicional en la raíz
			// y trabajando desde allí (Gracias a Andrew Dupont por la técnica)
			// IE 8 no funciona con elementos de objeto
			if (nodeType === 1 && context.nodeName.toLowerCase()! == "object") {
				grupos = tokenizar(selector);

				if ((antiguo = context.getAttribute("id"))) {
					nid = old.replace(rescape, "\\ $ &");
				} demás {
					context.setAttribute("id", nid);
				}
				nid = "[id = '" + nid + "']";

				i = grupos.longitud;
				mientras yo-- ) {
					grupos[i] = nid + toSelector(grupos[i]);
				}
				newContext = rsibling.test(selector) && testContext(context.parentNode) || contexto;
				newSelector = groups.join(",");
			}

			if (newSelector) {
				intentar {
					push.apply(resultados,
						newContext.querySelectorAll(newSelector)
					);
					devolver resultados;
				} catch (qsaError) {
				} por fin {
					Yo doblo ) {
						context.removeAttribute("id");
					}
				}
			}
		}
	}

	// Todos los otros
	return select(selector.replace(rtrim, "$ 1"), contexto, resultados, semilla);
}

/ **
	* Crear cachés de valores - clave de tamaño limitado
		* @returns { Función(cadena, Objeto) } Devuelve los datos del Objeto después de almacenarlos en sí mismo con
			* nombre de propiedad de la cadena(con sufijo de espacio) y(si la caché es mayor que Expr.cacheLength)
				* eliminar la entrada más antigua
					* /
function createCache() {
	var claves = [];

	función caché(clave, valor) {
		// Utilice (tecla + "") para evitar la colisión con las propiedades del prototipo nativo (consulte el número 157)
		if (keys.push(key + "") > Expr.cacheLength) {
			// Conserve solo las entradas más recientes
			eliminar caché[keys.shift()];
		}
		return (caché[clave + ""] = valor);
	}
	retorno de caché;
}

/ **
	* Marcar una función para uso especial de Sizzle
		* @param { Función } fn La función para marcar
			* /
función markFunction(fn) {
	fn[expando] = verdadero;
	return fn;
}

/ **
	* Soporte de pruebas usando un elemento
		* @param { Función } fn Pasó el div creado y espera un resultado booleano
			* /
function assert(fn) {
	var div = document.createElement("div");

	intentar {
		volver!! fn(div);
	} captura(e) {
		falso retorno;
	} por fin {
		// Eliminar de su padre por defecto
		if (div.parentNode) {
			div.parentNode.removeChild(div);
		}
		// liberar memoria en IE
		div = nulo;
	}
}

/ **
	* Agrega el mismo controlador para todos los atributos especificados
		* @param { String } attrs Lista de atributos separados por tubería
			* @param { Function } handler El método que se aplicará
				* /
function addHandle(attrs, handler) {
	var arr = attrs.split("|"),
		i = attrs.length;

	mientras yo-- ) {
		Expr.attrHandle[arr[i]] = controlador;
	}
}

/ **
	* Verifica el orden de los documentos de dos hermanos.
 * @param { Element } a
	* @param { Element } b
		* @returns { Number } Devuelve menos de 0 si a precede a b, mayor que 0 si a sigue a b
			* /
function siblingCheck(a, b) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			(~b.sourceIndex || MAX_NEGATIVE) -
			(~a.sourceIndex || MAX_NEGATIVE);

	// Use IE sourceIndex si está disponible en ambos nodos
	if (diff) {
		return diff;
	}

	// Comprueba si b sigue a
	si(cur) {
		while ((cur = cur.nextSibling)) {
			si(cur === b) {
				return -1;
			}
		}
	}

	devolver un ? 1 : -1;
}

/ **
	* Devuelve una función para usar en pseudos para tipos de entrada
		* @param { String } tipo
			* /
function createInputPseudo(type) {
	función de retorno(elem) {
		var name = elem.nodeName.toLowerCase();
		nombre de retorno === "entrada" && elem.type === tipo;
	};
}

/ **
	* Devuelve una función para usar en pseudos para botones
		* @param { String } tipo
			* /
function createButtonPseudo(type) {
	función de retorno(elem) {
		var name = elem.nodeName.toLowerCase();
		return (nombre === "entrada" || nombre === "botón") && elem.type === tipo;
	};
}

/ **
	* Devuelve una función para usar en pseudos para posicionales
		* @param { Función } fn
			* /
function createPositionalPseudo(fn) {
	return markFunction(función(argumento) {
		argumento = + argumento;
		return markFunction(función(semilla, coincidencias) {
			var j,
			matchIndexes = fn([], seed.length, argument),
			i = matchIndexes.length;

			// Coincidir con elementos encontrados en los índices especificados
			mientras yo--) {
				if(semilla [(j = matchIndexes[i])]) {
		semilla[j] = !(coincide con[j] = semilla[j]);
	}
}
		});
	});
}

/ **
	* Comprueba la validez de un nodo como contexto Sizzle
		* @param { Elemento | Objeto = } contexto
			* @returns { Elemento | Objeto | Booleano } El nodo de entrada si es aceptable; de ​​lo contrario, un valor falso
				* /
function testContext(context) {
	return context && typeof context.getElementsByTagName! == strundefined && context;
}

// Exponer vars de soporte por conveniencia
soporte = Sizzle.support = {};

/ **
	* Detecta nodos XML
		* @param { Elemento | Objeto } elem Un elemento o un documento
			* @returns { Boolean } Verdadero si el elemento es un nodo XML que no es HTML
				* /
isXML = Sizzle.isXML = función(elem) {
	// documentElement se verifica para los casos en los que aún no existe
	// (como cargar iframes en IE - # 4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	devolver documentElement ? documentElement.nodeName! == "HTML" : falso;
};

/ **
	* Establece variables relacionadas con el documento una vez basadas en el documento actual
		* @param { Elemento | Objeto } [doc] Un elemento u objeto de documento que se utilizará para configurar el documento.
 * @returns { Object } Devuelve el documento actual
	* /
setDocument = Sizzle.setDocument = function (nodo) {
	var hasCompare,
		doc = nodo ? node.ownerDocument || nodo : favoriteDoc,
		padre = doc.defaultView;

	// Si no hay ningún documento y elemento de documento disponible, regrese
	if (doc === documento || doc.nodeType! == 9 || !doc.documentElement) {
		documento de devolución;
	}

	// Establecer nuestro documento
	document = doc;
	docElem = doc.documentElement;

	// Pruebas de soporte
	documentIsHTML = !isXML(doc);

	// Soporte: IE> 8
	// Si el documento iframe está asignado a la variable "documento" y si el iframe se ha vuelto a cargar,
	// IE arrojará el error "permiso denegado" al acceder a la variable "documento", consulte jQuery # 13936
	// IE6-8 no admite la propiedad defaultView, por lo que el padre no estará definido
	if (parent && parent! == parent.top) {
		// IE11 no tiene attachEvent, por lo que todos deben sufrir
		if (parent.addEventListener) {
			parent.addEventListener("descargar", function () {
				setDocument();
			}, falso);
		} más si(parent.attachEvent) {
			parent.attachEvent("onunload", function () {
				setDocument();
			});
		}
	}

	/ * Atributos
	-------------------------------------------------- -------------------- * /

	// Soporte: IE <8
	// Verifique que getAttribute realmente devuelva atributos y no propiedades (excepto los booleanos IE8)
	support.attributes = assert(función(div) {
		div.className = "i";
		return! div.getAttribute("className");
	});

	/ * getElement (s) por *
	-------------------------------------------------- -------------------- * /

	// Verifica si getElementsByTagName ("*") devuelve solo elementos
	support.getElementsByTagName = assert(función(div) {
		div.appendChild(doc.createComment(""));
		return! div.getElementsByTagName("*").length;
	});

	// Compruebe si se puede confiar en getElementsByClassName
	support.getElementsByClassName = rnative.test(doc.getElementsByClassName) && assert(function (div) {
		div.innerHTML = "<div class = 'a'> </div> <div class = 'a i'> </div>";

		// Soporte: Safari <4
		// Captura el almacenamiento en caché de clases
		div.firstChild.className = "yo";
		// Soporte: Opera <10
		// Detectar la falla de gEBCN para encontrar clases no líderes
		return div.getElementsByClassName("i").length === 2;
	});

	// Soporte: IE <10
	// Verifica si getElementById devuelve elementos por nombre
	// Los métodos rotos getElementById no recogen nombres programados,
	// así que usa una prueba indirecta getElementsByName
	support.getById = assert(función(div) {
		docElem.appendChild(div).id = expandir;
		return! doc.getElementsByName || !doc.getElementsByName(expando).length;
	});

	// ID buscar y filtrar
	if (support.getById) {
		Expr.find["ID"] = función(id, contexto) {
			if (typeof context.getElementById! == strundefined && documentIsHTML) {
				var m = context.getElementById(id);
				// Verifique parentNode para detectar cuándo regresa Blackberry 4.6
				// nodos que ya no están en el documento # 6963
				return m && m.parentNode ? [m] : [];
			}
		};
		Expr.filter["ID"] = función(id) {
			var attrId = id.replace(runescape, funescape);
			función de retorno(elem) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} demás {
		// Soporte: IE6 / 7
		// getElementById no es confiable como atajo de búsqueda
		eliminar Expr.find["ID"];

		Expr.filter["ID"] = función(id) {
			var attrId = id.replace(runescape, funescape);
			función de retorno(elem) {
				var nodo = tipo de elem.getAttributeNode! == strundefined && elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Etiqueta
	Expr.find["TAG"] = support.getElementsByTagName ?
		función(etiqueta, contexto) {
		if (typeof context.getElementsByTagName! == strundefined) {
			return context.getElementsByTagName(etiqueta);
		}
	}:
	función(etiqueta, contexto) {
		var elem,
			tmp = [],
			i = 0,
			resultados = context.getElementsByTagName(etiqueta);

		// Filtrar posibles comentarios
		si(etiqueta === "*") {
			while ((elem = results[i++])) {
				if (elem.nodeType === 1) {
					tmp.push(elem);
				}
			}

			return tmp;
		}
		devolver resultados;
	};

	// Clase
	Expr.find["CLASS"] = support.getElementsByClassName && function (className, context) {
		if (typeof context.getElementsByClassName! == strundefined && documentIsHTML) {
			return context.getElementsByClassName(className);
		}
	};

	/ * QSA / MatchSelector
	-------------------------------------------------- -------------------- * /

	// Soporte QSA y MatchSelector

	// MatchSelector (: active) informa falso cuando es verdadero (IE9 / Opera 11.5)
	rbuggyMatches = [];

	// qSa (: focus) informa falso cuando es verdadero (Chrome 21)
	// Permitimos esto debido a un error en IE8 / 9 que arroja un error
	// siempre que se accede a `document.activeElement` en un iframe
	// Entonces, permitimos que: focus pase por QSA todo el tiempo para evitar el error de IE
	// Ver http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ((support.qsa = rnative.test(doc.querySelectorAll))) {
		// Construye QSA regex
		// Estrategia de regex adoptada por Diego Perini
		afirmar(función(div) {
			// Seleccionar se establece en una cadena vacía a propósito
			// Esto es para probar el tratamiento de IE de no explícitamente
			// establecer un atributo de contenido booleano,
			// ya que su presencia debería ser suficiente
			// http://bugs.jquery.com/ticket/12359
			div.innerHTML = "<select msallowclip = ''> <option selected = ''> </option> </select>";

			// Soporte: IE8, Opera 11-12.16
			// No se debe seleccionar nada cuando siguen cadenas vacías ^ = o $ = o * =
			// El atributo de prueba debe ser desconocido en Opera pero "seguro" para WinRT
			// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if(div.querySelectorAll("[msallowclip ^ = '']").length) {
			rbuggyQSA.push("[* ^ $] =" + espacio en blanco + "* (?: '' | \" \ ")");
		}

		// Soporte: IE8
		// Los atributos booleanos y el "valor" no se tratan correctamente
		if (!div.querySelectorAll("[seleccionado]").length) {
			rbuggyQSA.push("\\ [" + espacio en blanco + "* (?: valor |" + booleanos + ")");
		}

		// Webkit / Opera -: marcado debe devolver los elementos de opción seleccionados
		// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
		// IE8 arroja un error aquí y no verá pruebas posteriores
		if (!div.querySelectorAll(": comprobado").length) {
			rbuggyQSA.push(": comprobado");
		}
	});

	afirmar(función(div) {
		// Soporte: Aplicaciones nativas de Windows 8
		// Los atributos de tipo y nombre están restringidos durante la asignación .innerHTML
		var input = doc.createElement("entrada");
		input.setAttribute("tipo", "oculto");
		div.appendChild(entrada).setAttribute("nombre", "D");

		// Soporte: IE8
		// Hacer cumplir la distinción entre mayúsculas y minúsculas del atributo de nombre
		if(div.querySelectorAll("[nombre = d]").longitud) {
		rbuggyQSA.push("nombre" + espacio en blanco + "* [* ^ $ |! ~]? =");
	}

	// FF 3.5 -: habilitado /: elementos deshabilitados y ocultos (los elementos ocultos todavía están habilitados)
	// IE8 arroja un error aquí y no verá pruebas posteriores
	if (!div.querySelectorAll(": habilitado").length) {
		rbuggyQSA.push(": habilitado", ": deshabilitado");
	}

	// Opera 10-11 no lanza pseudos inválidos post-coma
	div.querySelectorAll("* ,: x");
	rbuggyQSA.push(",. *:");
});
	}

if ((support.matchesSelector = rnative.test((coincidencias = docElem.matches ||
	docElem.webkitMatchesSelector ||
	docElem.mozMatchesSelector ||
	docElem.oMatchesSelector ||
	docElem.msMatchesSelector)))) {

	afirmar(función(div) {
		// Comprueba si es posible hacer coincidencias
		// en un nodo desconectado (IE 9)
		support.disconnectedMatch = coincidencias.call(div, "div");

		// Esto debería fallar con una excepción
		// Gecko no se equivoca, devuelve falso en su lugar
		match.call(div, "[s! = '']: x");
		rbuggyMatches.push("! =", pseudos);
	});
}

rbuggyQSA = rbuggyQSA.length && new RegExp(rbuggyQSA.join("|"));
rbuggyMatches = rbuggyMatches.length && new RegExp(rbuggyMatches.join("|"));

/ * Contiene
-------------------------------------------------- -------------------- * /
hasCompare = rnative.test(docElem.compareDocumentPosition);

// El elemento contiene otro
// intencionalmente no implementa descendiente inclusivo
// Como en, un elemento no se contiene a sí mismo
contiene = hasCompare || rnative.test(docElem.contains) ?
	función(a, b) {
	var adown = a.nodeType === 9 ? a.documentElement : a,
		bup = b && b.parentNode;
	devuelve un === bup || !!(bup && bup.nodeType === 1 && (
		adown.contains ?
			adown.contains(bup) :
			a.compareDocumentPosition && a.compareDocumentPosition(bup) & 16
	));
}:
función(a, b) {
	si(b) {
		while ((b = b.parentNode)) {
			si(b === a) {
				devuelve verdadero;
			}
		}
	}
	falso retorno;
};

/ * Clasificación
-------------------------------------------------- -------------------- * /

// Clasificación del orden de los documentos
sortOrder = hasCompare ?
	función(a, b) {

	// Marcar para eliminación de duplicados
	si(a === b) {
		hasDuplicate = true;
		return 0;
	}

	// Ordenar según la existencia del método si solo una entrada tiene compareDocumentPosition
	var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
	si(comparar) {
		retorno comparar;
	}

	// Calcula la posición si ambas entradas pertenecen al mismo documento
	comparar = (a.ownerDocument || a) === (b.ownerDocument || b) ?
		a.compareDocumentPosition(b) :

		// De lo contrario, sabemos que están desconectados
		1;

	// Nodos desconectados
	si(comparar & 1 ||
		(!support.sortDetached && b.compareDocumentPosition(a) === compare)) {

		// Elija el primer elemento relacionado con nuestro documento preferido
		if (a === doc || a.ownerDocument === preferidoDoc && contiene(preferidoDoc, a)) {
			return -1;
		}
		if (b === doc || b.ownerDocument === preferidoDoc && contiene(preferidoDoc, b)) {
			return 1;
		}

		// Mantener el orden original
		return sortInput ?
			(indexOf.call(sortInput, a) - indexOf.call(sortInput, b)) :
			0;
	}

	volver comparar & 4 ? -1 : 1;
}:
función(a, b) {
	// Salir temprano si los nodos son idénticos
	si(a === b) {
		hasDuplicate = true;
		return 0;
	}

	var cur,
		i = 0,
		aup = a.parentNode,
		bup = b.parentNode,
		ap = [a],
		bp = [b];

	// Los nodos sin padres son documentos o están desconectados
	si(!aup || !bup) {
		devolver un === doc ? -1 :
			b === doc ? 1 :
				aup ? -1 :
					bup ? 1 :
						sortInput ?
							(indexOf.call(sortInput, a) - indexOf.call(sortInput, b)) :
							0;

		// Si los nodos son hermanos, podemos hacer una comprobación rápida
	} más si(aup === bup) {
		return siblingCheck(a, b);
	}

	// De lo contrario, necesitamos listas completas de sus antepasados ​​para comparar
	cur = a;
	while ((cur = cur.parentNode)) {
		ap.unshift(cur);
	}
	cur = b;
	while ((cur = cur.parentNode)) {
		bp.unshift(cur);
	}

	// Camina por el árbol en busca de una discrepancia
	while (ap[i] === bp[i]) {
		i++;
	}

	regreso yo ?
		// Hacer una verificación de hermanos si los nodos tienen un ancestro común
		siblingCheck(ap[i], bp[i]) :

		// De lo contrario, los nodos en nuestro documento se ordenan primero
		ap[i] === preferidoDoc ? -1 :
			bp[i] === preferidoDoc ? 1 :
				0;
};

return doc;
};

Sizzle.matches = function (expr, elementos) {
	return Sizzle(expr, null, null, elementos);
};

Sizzle.matchesSelector = function (elem, expr) {
	// Establecer variables de documento si es necesario
	if ((elem.ownerDocument || elem)! == documento) {
		setDocument(elem);
	}

	// Asegúrese de que los selectores de atributos estén entrecomillados
	expr = expr.replace(rattributeQuotes, "= '$ 1']");

	if (support.matchesSelector && documentIsHTML &&
		(!rbuggyMatches || !rbuggyMatches.test(expr)) &&
		(!rbuggyQSA || !rbuggyQSA.test(expr))) {

		intentar {
			var ret = coincidencias.call(elem, expr);

			// El selector de coincidencias de IE 9 devuelve falso en los nodos desconectados
			if (ret || support.disconnectedMatch ||
				// Además, se dice que los nodos desconectados están en un documento
				// fragmento en IE 9
				elem.document && elem.document.nodeType! == 11) {
				return ret;
			}
		} atrapar(e) { }
	}

	return Sizzle(expr, document, null, [elem]).length > 0;
};

Sizzle.contains = function (context, elem) {
	// Establecer variables de documento si es necesario
	if ((context.ownerDocument || context)! == documento) {
		setDocument(contexto);
	}
	return contiene(contexto, elem);
};

Sizzle.attr = function (elem, name) {
	// Establecer variables de documento si es necesario
	if ((elem.ownerDocument || elem)! == documento) {
		setDocument(elem);
	}

	var fn = Expr.attrHandle[name.toLowerCase()],
		// No se deje engañar por las propiedades de Object.prototype (jQuery # 13807)
		val = fn && hasOwn.call(Expr.attrHandle, name.toLowerCase()) ?
			fn(elem, nombre, !documentIsHTML) :
			indefinido;

	return val! == indefinido ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute(nombre) :
			(val = elem.getAttributeNode(nombre)) && val.specified ?
				val.value :
				nulo;
};

Sizzle.error = function (msg) {
	lanzar nuevo Error("Error de sintaxis, expresión no reconocida:" + msg);
};

/ **
	* Clasificación de documentos y eliminación de duplicados
		* @param { ArrayLike } resultados
			* /
Sizzle.uniqueSort = function (results) {
	var elem,
		duplicados = [],
		j = 0,
		i = 0;

	// A menos que * sepamos * que podemos detectar duplicados, asumimos su presencia
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice(0);
	results.sort(sortOrder);

	if (hasDuplicate) {
		while ((elem = results[i++])) {
			if (elem === resultados[i]) {
				j = duplicados.push(i);
			}
		}
		while (j--) {
			results.splice(duplica[j], 1);
		}
	}

	// Borrar la entrada después de ordenar para liberar objetos
	// Ver https://github.com/jquery/sizzle/pull/225
	sortInput = nulo;

	devolver resultados;
};

/ **
	* Función de utilidad para recuperar el valor de texto de una matriz de nodos DOM
		* @param { Array | Element } elem
			* /
getText = Sizzle.getText = function (elem) {
	var nodo,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if (!nodeType) {
		// Si no hay nodeType, se espera que sea una matriz
		while ((nodo = elem[i++])) {
			// No atravesar los nodos de comentarios
			ret + = getText(nodo);
		}
	} else if (nodeType === 1 || nodeType === 9 || nodeType === 11) {
		// Usa textContent para elementos
		// uso de innerText eliminado para la coherencia de las nuevas líneas (jQuery # 11153)
		if (typeof elem.textContent === "cadena") {
			return elem.textContent;
		} demás {
			// Atraviesa a sus hijos
			para(elem = elem.firstChild; elem; elem = elem.nextSibling) {
				ret + = getText(elem);
			}
		}
	} else if (nodeType === 3 || nodeType === 4) {
		return elem.nodeValue;
	}
	// No incluya comentarios o nodos de instrucción de procesamiento

	return ret;
};

Expr = Sizzle.selectors = {

	// Puede ser ajustado por el usuario
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	encontrar: {},

	relativo: {
		">": { dir: "parentNode", primero: verdadero },
		"": { dir: "parentNode" },
		"+": { dir: "hermano anterior", primero: verdadero },
		"~": { dir: "hermano anterior" }
	},

	preFilter: {
		"ATTR": función(coincidencia) {
	coincidir[1] = coincidir[1].replace(runescape, funescape);

	// Mover el valor dado para que coincida con [3] ya sea entre comillas o sin comillas
	emparejar[3] = (emparejar[3] || emparejar[4] || emparejar[5] || "").replace(runescape, funescape);

	si(coincide con[2] === "~ =") {
		coincidir[3] = "" + coincidir[3] + "";
	}

	return match.slice(0, 4);
},

"NIÑO": función(partido) {
	/ * coincidencias de matchExpr ["CHILD"]
	1 tipo(solo | nth | ...)
	2 qué(hijo | de tipo)
	3 argumento(par | impar | \ d * | \ d * n([+ -]\ d +) ? | ...)
	4 componente xn del argumento xn + y([+ -] ?\ D * n |)
	5 signo de componente xn
	6 x de componente xn
	7 signo de componente y
	8 años de componente y
		* /
	coincidir[1] = coincidir[1].toLowerCase();

	if (coincide con[1].slice(0, 3) === "nth") {
		// nth- * requiere argumento
		if (!match[3]) {
			Sizzle.error(coincide con[0]);
		}

		// parámetros numéricos xey para Expr.filter.CHILD
		// recuerda que falso / verdadero se lanza respectivamente a 0/1
		igualar[4] = + (igualar[4] ? igualar[5] + (igualar[6] || 1) : 2 * (igualar[3] === "par" || igualar[3] === " impar"));
		igualar[5] = + ((igualar[7] + igualar[8]) || igualar[3] === "impar");

		// otros tipos prohíben argumentos
	} más si(coincide con[3]) {
		Sizzle.error(coincide con[0]);
	}

	partido de vuelta;
},

"PSEUDO": función(coincidencia) {
	var exceso,
		unquoted = !match[6] && match[2];

	if (matchExpr["NIÑO"].test(match[0])) {
		devolver nulo;
	}

	// Acepta los argumentos citados tal cual
	si(coincide con[3]) {
		partido[2] = partido[4] || partido[5] || "";

		// Elimina el exceso de caracteres de los argumentos sin comillas
	} else if (sin comillas && rpseudo.test(sin comillas) &&
		// Obtener el exceso de tokenize (recursivamente)
		(exceso = tokenizar(sin comillas, verdadero)) &&
		// avanzar al siguiente paréntesis de cierre
		(exceso = unquoted.indexOf(")", unquoted.length - exceso) - unquoted.length)) {

		// el exceso es un índice negativo
		igualar[0] = igualar[0].slice(0, exceso);
		partido[2] = unquoted.slice(0, exceso);
	}

	// Devuelve solo las capturas que necesita el método de pseudo filtro (tipo y argumento)
	return match.slice(0, 3);
}
	},

filtro: {

	"TAG": función(nodeNameSelector) {
		var nodeName = nodeNameSelector.replace(runescape, funescape).toLowerCase();
		return nodeNameSelector === "*" ?
			function () { devuelve verdadero; } :
			función(elem) {
			return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
		};
	},

	"CLASE": función(className) {
		var patrón = classCache[className + ""];

		patrón de retorno ||
			(patrón = nueva expresión regular("(^ |" + espacio en blanco + ")" + className + "(" + espacio en blanco + "| $)")) &&
				classCache(className, function (elem) {
					return pattern.test(typeof elem.className === "string" && elem.className || typeof elem.getAttribute! == strundefined && elem.getAttribute("clase") || "");
				});
	},

	"ATTR": función(nombre, operador, verificación) {
		función de retorno(elem) {
			var result = Sizzle.attr(elem, name);

			si(resultado == nulo) {
				operador de retorno === "! =";
			}
			if (!operator) {
				devuelve verdadero;
			}

			resultado + = "";

			operador de retorno === "=" ? resultado === comprobar :
				operador === "! =" ? resultado! == comprobar :
					operador === "^ =" ? comprobar && result.indexOf(comprobar) === 0 :
						operador === "* =" ? comprobar && result.indexOf(comprobar) > -1 :
							operador === "$ =" ? comprobar && result.slice(-check.length) === comprobar :
								operador === "~ =" ? ("" + resultado + "").indexOf(comprobar) > -1 :
									operador === "| =" ? resultado === comprobar || result.slice(0, check.length + 1) === check + "-" :
										falso;
		};
	},

	"NIÑO": función(tipo, qué, argumento, primero, último) {
		var simple = type.slice(0, 3)! == "nth",
			forward = type.slice(-4)! == "last",
			ofType = what === "of-type";

		volver primero === 1 && último === 0 ?

			// Atajo para: nth - * (n)
			función(elem) {
			return !!elem.parentNode;
		}:

		función(elem, contexto, xml) {
			var cache, externalCache, node, diff, nodeIndex, start,
				dir = simple! == hacia adelante? "nextSibling": "previousSibling",
					parent = elem.parentNode,
					nombre = ofType && elem.nodeName.toLowerCase(),
					useCache = !xml && !ofType;

			if (padre) {

				//: (primero | último | solo) - (hijo | de tipo)
				if (simple) {
					while (dir) {
						nodo = elem;
						while ((nodo = nodo[dir])) {
							if (ofType ? node.nodeName.toLowerCase() === nombre : node.nodeType === 1) {
								falso retorno;
							}
						}
						// Dirección inversa para: solo- * (si aún no lo hemos hecho)
						start = dir = type === "only" && !start && "nextSibling";
					}
					devuelve verdadero;
				}

				start = [forward ? parent.firstChild : parent.lastChild];

				// no xml: nth-child (...) almacena datos de caché en `parent`
				if (reenviar && useCache) {
					// Busca `elem` de un índice previamente almacenado en caché
					externalCache = parent[expando] || (padre[expando] = {});
					cache = externalCache[tipo] || [];
					nodeIndex = cache[0] === dirruns && cache[1];
					diff = cache[0] === dirruns && cache[2];
					node = nodeIndex && parent.childNodes[nodeIndex];

					while ((nodo = ++nodeIndex && nodo && nodo[dir] ||

						// Recurrir a buscar `elem` desde el principio
						(diff = nodeIndex = 0) || start.pop())) {

						// Cuando se encuentra, almacena en caché los índices en `parent` y rompe
						if (node.nodeType === 1 && ++diff && node === elem) {
							externalCache[tipo] = [dirruns, nodeIndex, diff];
							descanso;
						}
					}

					// Use el índice de elementos previamente almacenado en caché si está disponible
				} else if (useCache && (cache = (elem[expando] || (elem[expando] = {}))[type]) && cache[0] === dirruns) {
					diff = caché[1];

					// xml: nth-child (...) o: nth-last-child (...) o: nth (-last)? - de tipo (...)
				} demás {
					// Usa el mismo ciclo anterior para buscar `elem` desde el principio
					while ((nodo = ++nodeIndex && nodo && nodo[dir] ||
						(diff = nodeIndex = 0) || start.pop())) {

						if ((ofType ? node.nodeName.toLowerCase() === nombre : node.nodeType === 1) && ++diff) {
							// Almacene en caché el índice de cada elemento encontrado
							if (useCache) {
								(nodo[expando] || (nodo[expando] = {}))[tipo] = [dirruns, diff];
							}

							si(nodo === elem) {
								descanso;
							}
						}
					}
				}

				// Incorpore el desplazamiento, luego verifique el tamaño del ciclo
				diff - = último;
				return diff === primero || (diff % first === 0 && diff / first > = 0);
			}
		};
	},

	"PSEUDO": función(pseudo, argumento) {
		// Los nombres de pseudo-clases no distinguen entre mayúsculas y minúsculas
		// http://www.w3.org/TR/selectors/#pseudo-classes
		// Priorizar por distinción entre mayúsculas y minúsculas en caso de que se agreguen pseudos personalizados con letras mayúsculas
		// Recuerda que setFilters hereda de pseudos
		var args,
			fn = Expr.pseudos[pseudo] || Expr.setFilters[pseudo.toLowerCase()] ||
				Sizzle.error("pseudo no admitido:" + pseudo);

		// El usuario puede usar createPseudo para indicar que
		// se necesitan argumentos para crear la función de filtro
		// tal como lo hace Sizzle
		if (fn[expandir]) {
			return fn(argumento);
		}

		// Pero mantén el soporte para firmas antiguas
		if (fn.length > 1) {
			args = [pseudo, pseudo, "", argumento];
			return Expr.setFilters.hasOwnProperty(pseudo.toLowerCase()) ?
				markFunction(función(semilla, coincidencias) {
					var idx,
					emparejado = fn(semilla, argumento),
					i = longitud coincidente;
					mientras yo--) {
				idx = indexOf.call(semilla, coincidente[i]);
				semilla[idx] = !(coincide con[idx] = coincidente[i]);
			}
		}):
		función(elem) {
			return fn(elem, 0, args);
		};
	}

	return fn;
}
	},

pseudos: {
	// Pseudos potencialmente complejos
	"no": markFunction(función(selector) {
		// Recorta el selector pasado para compilar
		// para evitar tratar el inicio y el final
		// espacios como combinadores
		var input = [],
		resultados =[],
		matcher = compile(selector.replace(rtrim, "$ 1"));

		return matcher[expando] ?
			markFunction(función(semilla, coincidencias, contexto, xml) {
				var elem,
				incomparable = coincidente(semilla, nulo, xml, []),
				i = longitud de la semilla;

				// Coincide con elementos no igualados por `matcher`
				mientras yo--) {
					if((elem = incomparable[i])) {
		semilla[i] = !(coincide con[i] = elem);
	}
}
				}):
función(elem, contexto, xml) {
	entrada[0] = elem;
	comparador(entrada, nulo, xml, resultados);
	return !results.pop();
};
		}),

"tiene": markFunction(función(selector) {
	función de retorno(elem) {
		return Sizzle(selector, elem).length > 0;
	};
}),

	"contiene": markFunction(función(texto) {
		función de retorno(elem) {
			return (elem.textContent || elem.innerText || getText(elem)).indexOf(texto) > -1;
		};
	}),

		// "Si un elemento está representado por un selector: lang ()
		// se basa únicamente en el valor de idioma del elemento
		// siendo igual al identificador C,
		// o comenzando con el identificador C seguido inmediatamente por "-".
		// La comparación de C con el valor de idioma del elemento se realiza sin distinción entre mayúsculas y minúsculas.
		// El identificador C no tiene que ser un nombre de idioma válido ".
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction(function (lang) {
			// el valor de idioma debe ser un identificador válido
			if (!ridentifier.test(lang || "")) {
				Sizzle.error("idioma no admitido:" + idioma);
			}
			lang = lang.replace(runescape, funescape).toLowerCase();
			función de retorno(elem) {
				var elemLang;
				hacer {
					si((elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml: lang") || elem.getAttribute("lang"))) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf(lang + "-") === 0;
					}
				} while ((elem = elem.parentNode) && elem.nodeType === 1);
				falso retorno;
			};
		}),

			// Varios
			"objetivo": función(elem) {
	var hash = window.location && window.location.hash;
	devolver hash && hash.slice(1) === elem.id;
},

"raíz": función(elem) {
	return elem === docElem;
},

"foco": función(elem) {
	return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
},

// Propiedades booleanas
"habilitado": función(elem) {
	return elem.disabled === falso;
},

"inhabilitado": función(elem) {
	return elem.disabled === verdadero;
},

"comprobado": función(elem) {
	// En CSS3,: check debe devolver tanto los elementos seleccionados como los seleccionados
	// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
	var nodeName = elem.nodeName.toLowerCase();
	return (nodeName === "input" && !!elem.checked) || (nodeName === "opción" && !!elem.selected);
},

"seleccionado": función(elem) {
	// Acceder a esta propiedad hace que se seleccione por defecto
	// las opciones en Safari funcionan correctamente
	if (elem.parentNode) {
		elem.parentNode.selectedIndex;
	}

	return elem.selected === verdadero;
},

// Contenidos
"vacío": función(elem) {
	// http://www.w3.org/TR/selectors/#empty-pseudo
	//: el elemento (1) o los nodos de contenido niegan el vacío (texto: 3; cdata: 4; referencia de la entidad: 5),
	// pero no por otros (comentario: 8; instrucción de procesamiento: 7; etc.)
	// nodeType <6 funciona porque los atributos (2) no aparecen como hijos
	para(elem = elem.firstChild; elem; elem = elem.nextSibling) {
		if (elem.nodeType < 6) {
			falso retorno;
		}
	}
	devuelve verdadero;
},

"padre": función(elem) {
	return !Expr.pseudos["vacío"](elem);
},

// Elementos / tipos de entrada
"encabezado": función(elem) {
	return rheader.test(elem.nodeName);
},

"entrada": función(elem) {
	return rinputs.test(elem.nodeName);
},

"botón": función(elem) {
	var name = elem.nodeName.toLowerCase();
	return name === "input" && elem.type === "button" || nombre === "botón";
},

"texto": función(elem) {
	var attr;
	return elem.nodeName.toLowerCase() === "input" &&
		elem.type === "texto" &&

		// Soporte: IE <8
		// Los nuevos valores de atributo HTML5 (p. Ej., "Búsqueda") aparecen con elem.type === "texto"
		((atributo = elem.getAttribute("tipo")) == null || attr.toLowerCase() === "texto");
},

// Posición en la colección
"primero": createPositionalPseudo(function () {
	return [0];
}),

	"último": createPositionalPseudo(function (matchIndexes, length) {
		return [longitud - 1];
	}),

		"eq": createPositionalPseudo(function (matchIndexes, length, argument) {
			return [argumento < 0 ? argumento + longitud : argumento];
		}),

			"incluso": createPositionalPseudo(function (matchIndexes, length) {
				var i = 0;
				para(; i < longitud; i + = 2) {
	matchIndexes.push(i);
}
return matchIndexes;
		}),

"impar": createPositionalPseudo(function (matchIndexes, length) {
	var i = 1;
	para(; i < longitud; i + = 2) {
	matchIndexes.push(i);
}
return matchIndexes;
		}),

"lt": createPositionalPseudo(function (matchIndexes, length, argument) {
	var i = argumento < 0 ? argumento + longitud : argumento;
	para(; --i > = 0;) {
	matchIndexes.push(i);
}
return matchIndexes;
		}),

"gt": createPositionalPseudo(function (matchIndexes, length, argument) {
	var i = argumento < 0 ? argumento + longitud : argumento;
	para(; ++i < longitud;) {
	matchIndexes.push(i);
}
return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Agregar botón / tipo de entrada pseudos
para(yo en { radio: verdadero, casilla de verificación: verdadero, archivo: verdadero, contraseña: verdadero, imagen: verdadero }) {
	Expr.pseudos[i] = createInputPseudo(i);
}
para(i en { enviar: verdadero, restablecer: verdadero }) {
	Expr.pseudos[i] = createButtonPseudo(i);
}

// API fácil para crear nuevos setFilters
function setFilters() { }
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function (selector, parseOnly) {
	var emparejado, coincidencia, tokens, tipo,
		soFar, grupos, preFiltros,
		cached = tokenCache[selector + ""];

	si(en caché) {
		return parseOnly ? 0 : cached.slice(0);
	}

	soFar = selector;
	grupos = [];
	preFilters = Expr.preFilter;

	while (soFar) {

		// Coma y primera ejecución
		if (!coincidió || (coincidencia = rcomma.exec(soFar))) {
			si(coincidencia) {
				// No consuma las comas finales como válidas
				soFar = soFar.slice(coincide con[0].length) || Muy lejos;
			}
			grupos.push((tokens = []));
		}

		emparejado = falso;

		// Combinadores
		if ((coincidencia = rcombinators.exec(soFar))) {
			emparejado = match.shift();
			tokens.push({
				valor: emparejado,
				// Lanza combinadores descendientes al espacio
				tipo: coincide con [0] .replace(rtrim, "")
			});
			soFar = soFar.slice(coincidente.longitud);
		}

		// Filtros
		para(escriba Expr.filter) {
			if ((match = matchExpr[type].exec(soFar)) && (!preFilters[type] ||
				(coincidencia = preFiltros[tipo](coincidencia)))) {
				emparejado = match.shift();
				tokens.push({
					valor: emparejado,
					tipo: tipo,
					partidos: partido
				});
				soFar = soFar.slice(coincidente.longitud);
			}
		}

		si(!coincidió) {
			descanso;
		}
	}

	// Devuelve la longitud del exceso no válido
	// si solo estamos analizando
	// De lo contrario, arroja un error o devuelve tokens
	return parseOnly ?
		soFar.length :
		Muy lejos ?
			Sizzle.error(selector) :
			// Guarde los tokens en caché
			tokenCache(selector, grupos).slice(0);
};

función toSelector(tokens) {
	var i = 0,
		len = tokens.length,
		selector = "";
	para(; i < len; i++) {
		selector + = tokens[i].value;
	}
	selector de retorno;
}

función addCombinator(comparador, combinador, base) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = hecho++;

	volver combinator.primero ?
		// Verificar con el antepasado más cercano / elemento anterior
		función(elem, contexto, xml) {
		while ((elem = elem[dir])) {
			if (elem.nodeType === 1 || checkNonElements) {
				return matcher(elem, context, xml);
			}
		}
	}:

	// Verificar con todos los elementos antepasados ​​/ precedentes
	función(elem, contexto, xml) {
		var oldCache, outerCache,
			newCache = [dirruns, doneName];

		// No podemos establecer datos arbitrarios en nodos XML, por lo que no se benefician del almacenamiento en caché de directorios
		si(xml) {
			while ((elem = elem[dir])) {
				if (elem.nodeType === 1 || checkNonElements) {
					if (matcher(elem, context, xml)) {
						devuelve verdadero;
					}
				}
			}
		} demás {
			while ((elem = elem[dir])) {
				if (elem.nodeType === 1 || checkNonElements) {
					externalCache = elem[expando] || (elem[expando] = {});
					si((oldCache = externalCache[dir]) &&
						oldCache[0] === dirruns && oldCache[1] === doneName) {

						// Asignar a newCache para que los resultados se propaguen a los elementos anteriores
						return (newCache[2] = oldCache[2]);
					} demás {
						// Reutiliza newcache para que los resultados se propaguen a elementos anteriores
						ExternalCache[dir] = newCache;

						// Una coincidencia significa que hemos terminado; un fallo significa que tenemos que seguir comprobando
						if ((newCache[2] = matcher(elem, context, xml))) {
							devuelve verdadero;
						}
					}
				}
			}
		}
	};
}

function elementMatcher(comparadores) {
	return matchers.length > 1 ?
		función(elem, contexto, xml) {
		var i = matchers.length;
		mientras yo-- ) {
			if (!matchers[i](elem, context, xml)) {
				falso retorno;
			}
		}
		devuelve verdadero;
	}:
	emparejadores[0];
}

function multipleContexts(selector, contextos, resultados) {
	var i = 0,
		len = contexts.length;
	para(; i < len; i++) {
		Sizzle(selector, contextos[i], resultados);
	}
	devolver resultados;
}

función condensar(incomparable, mapa, filtro, contexto, xml) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = inigualable.longitud,
		mapeado = mapa! = nulo;

	para(; i < len; i++) {
		if ((elem = incomparable[i])) {
			if (!filter || filter(elem, context, xml)) {
				newUnmatched.push(elem);
				if (mapeado) {
					map.push(i);
				}
			}
		}
	}

	return newUnmatched;
}

función setMatcher(preFilter, selector, matcher, postFilter, postFinder, postSelector) {
	if (postFilter && !postFilter[expando]) {
		postFilter = setMatcher(postFilter);
	}
	if (postFinder && !postFinder[expando]) {
		postFinder = setMatcher(postFinder, postSelector);
	}
	return markFunction(función(semilla, resultados, contexto, xml) {
		var temp, yo, elem,
		preMap =[],
		postMap =[],
		preexistente = resultados.longitud,

		// Obtener elementos iniciales de la semilla o el contexto
		elems = semilla || multipleContexts(selector || "*", context.nodeType ? [context] : context, []),

		// Prefiltro para obtener la entrada del comparador, conservando un mapa para la sincronización de los resultados de la semilla
		matcherIn = preFilter && (semilla || !selector) ?
			condensar(elems, preMap, preFilter, context, xml) :
			elems,

		matcherOut = matcher ?
			// Si tenemos un postFinder, o semilla filtrada, o postFilter no semilla o resultados preexistentes,
			postFinder || (semilla ? preFiltro : preexistente || postFiltro) ?

				// ... es necesario un procesamiento intermedio
				[] :

				// ... de lo contrario, use los resultados directamente
				resultados :
			matcherIn;

		// Encuentra coincidencias primarias
		si(comparador) {
			matcher(matcherIn, matcherOut, context, xml);
		}

		// Aplicar postFilter
		if(postFilter) {
			temp = condensar(matcherOut, postMap);
			postFilter(temp, [], context, xml);

			// Elimina la coincidencia de elementos defectuosos moviéndolos de nuevo a matcherIn
			i = temp.length;
			mientras yo-- ) {
		if ((elem = temp[i])) {
			matcherOut[postMap[i]] = !(matcherIn[postMap[i]] = elem);
		}
	}
}

if (semilla) {
	if (postFinder || preFilter) {
		if (postFinder) {
			// Obtenga el matcherOut final condensando este intermedio en contextos postFinder
			temp = [];
			i = matcherOut.length;
			mientras yo-- ) {
				if ((elem = matcherOut[i])) {
					// Restaurar matcherIn ya que elem aún no es una coincidencia final
					temp.push((matcherIn[i] = elem));
				}
			}
			postFinder(nulo, (matcherOut = []), temp, xml);
		}

		// Mueve los elementos coincidentes de la semilla a los resultados para mantenerlos sincronizados
		i = matcherOut.length;
		mientras yo-- ) {
			si((elem = matcherOut[i]) &&
				(temp = postFinder ? indexOf.call(semilla, elem) : preMap[i]) > -1) {

				semilla[temp] = !(resultados[temp] = elem);
			}
		}
	}

	// Agregar elementos a los resultados, a través de postFinder si está definido
} demás {
	matcherOut = condensar(
		matcherOut === resultados ?
			matcherOut.splice(preexistente, matcherOut.length) :
			matcherOut
	);
	if (postFinder) {
		postFinder(nulo, resultados, matcherOut, xml);
	} demás {
		push.apply(resultados, matcherOut);
	}
}
	});
}

function matcherFromTokens(tokens) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadRelative = Expr.relative[tokens[0].type],
		implícitoRelativo = líderRelativo || Expr.relative[""],
		i = leadRelative ? 1 : 0,

		// El comparador fundamental garantiza que los elementos sean accesibles desde contextos de nivel superior
		matchContext = addCombinator(function (elem) {
			return elem === checkContext;
		}, implícitoRelativo, verdadero),
		matchAnyContext = addCombinator(función(elem) {
			return indexOf.call(checkContext, elem) > -1;
		}, implícitoRelativo, verdadero),
		matchers = [function (elem, context, xml) {
			return (!LeadRelative && (xml || context! == outermostContext)) || (
				(checkContext = contexto).nodeType ?
					matchContext(elem, contexto, xml) :
					matchAnyContext(elem, contexto, xml));
		}];

	para(; i < len; i++) {
		if ((matcher = Expr.relative[tokens[i].type])) {
			matchers = [addCombinator(elementMatcher(matchers), matcher)];
		} demás {
			matcher = Expr.filter[tokens[i].type].apply(nulo, tokens[i].matches);

			// Devuelve especial al ver un comparador posicional
			if (comparador[expando]) {
				// Encuentra el siguiente operador relativo (si lo hay) para un manejo adecuado
				j = ++i;
				para(; j < len; j++) {
					if (Expr.relative[tokens[j].type]) {
						descanso;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher(comparadores),
					i > 1 && toSelector(
						// Si el token anterior era un combinador descendiente, inserte un elemento cualquiera implícito `*`
						tokens.slice(0, i - 1).concat({ valor: tokens[i - 2].type === "" ? "*" : "" })
					).replace(rtrim, "$ 1"),
					emparejador
					i < j && matcherFromTokens(tokens.slice(i, j)),
					j < len && matcherFromTokens((tokens = tokens.slice(j))),
					j < len && toSelector(tokens)
				);
			}
			matchers.push(igualador);
		}
	}

	return elementMatcher(comparadores);
}

function matcherFromGroupMatchers(elementMatchers, setMatchers) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = función(semilla, contexto, xml, resultados, más externo) {
			var elem, j, matcher,
			matchedCount = 0,
			i = "0",
			inigualable = semilla && [],
			setMatched = [],
			contextBackup = outermostContext,
			// Siempre debemos tener elementos semilla o contexto más externo
			elems = semilla || byElement && Expr.find["TAG"]("*", más externo),
			// Usa dirruns enteros si este es el comparador más externo
			dirrunsUnique = (dirruns + = contextBackup == null ? 1 : Math.random() || 0.1),
			len = elems.length;

	if (más externo) {
		externalmostContext = contexto! == documento && contexto;
	}

	// Agrega elementos pasando elementMatchers directamente a los resultados
	// Mantenga `i` una cadena si no hay elementos, por lo que` matchedCount` será "00" debajo
	// Soporte: IE <9, Safari
	// Tolerar las propiedades de NodeList (IE: "length"; Safari: <number>) elementos coincidentes por id
	para(; i! == len && (elem = elems[i])! = null; i++) {
		if (byElement && elem) {
			j = 0;
			while ((matcher = elementMatchers[j++])) {
				if (matcher(elem, context, xml)) {
					results.push(elem);
					descanso;
				}
			}
			if (más externo) {
				dirruns = dirrunsUnique;
			}
		}

		// Seguimiento de elementos no coincidentes para establecer filtros
		if (bySet) {
			// Habrán pasado por todos los emparejamientos posibles
			if ((elem = !matcher && elem)) {
				matchedCount--;
			}

			// Alarga la matriz para cada elemento, coincidente o no
			if (semilla) {
				inigualable.push(elem);
			}
		}
	}

	// Aplicar filtros de conjunto a elementos no coincidentes
	MatchedCount + = i;
	if (bySet && i! == matchedCount) {
		j = 0;
		while ((matcher = setMatchers[j++])) {
			comparador(inigualable, setMatched, context, xml);
		}

		if (semilla) {
			// Reintegrar coincidencias de elementos para eliminar la necesidad de ordenar
			if (matchedCount > 0) {
				mientras yo-- ) {
					if (!(inigualable[i] || setMatched[i])) {
						setMatched[i] = pop.call(resultados);
					}
				}
			}

			// Descartar los valores de marcador de posición de índice para obtener solo coincidencias reales
			setMatched = condensar(setMatched);
		}

		// Agregar coincidencias a los resultados
		push.apply(resultados, setMatched);

		// Las coincidencias de conjuntos sin semillas que tienen éxito en varios emparejadores exitosos estipulan la clasificación
		if (más externo && !seed && setMatched.length > 0 &&
			(matchedCount + setMatchers.length) > 1) {

			Sizzle.uniqueSort(resultados);
		}
	}

	// Anular la manipulación de globales por comparadores anidados
	if (más externo) {
		dirruns = dirrunsUnique;
		externalmostContext = contextBackup;
	}

	regreso inigualable;
};

volver porSet ?
	markFunction(superMatcher) :
	superMatcher;
}

compile = Sizzle.compile = function (selector, match / * Internal Use Only * /) {
var i,
	setMatchers = [],
	elementMatchers = [],
	cached = compilerCache[selector + ""];

if (!caché) {
	// Genera una función de funciones recursivas que se pueden usar para verificar cada elemento
	if (!match) {
		coincidencia = tokenizar(selector);
	}
	i = coincidencia.longitud;
	mientras yo-- ) {
		cached = matcherFromTokens(coincide con[i]);
		if (en caché[expando]) {
			setMatchers.push(en caché);
		} demás {
			elementMatchers.push(en caché);
		}
	}

	// Almacene en caché la función compilada
	cached = compilerCache(selector, matcherFromGroupMatchers(elementMatchers, setMatchers));

	// Guardar selector y tokenización
	cached.selector = selector;
}
retorno en caché;
};

/ **
	* Una función de selección de bajo nivel que funciona con compilado de Sizzle
		* funciones de selector
			* @param { String | Function } selector Un selector o un precompilado
				* función de selector construida con Sizzle.compile
					* @param { Element } contexto
						* @param { Array } [resultados]
							* @param { Array } [semilla] Un conjunto de elementos para comparar
								* /
select = Sizzle.select = function (selector, contexto, resultados, semilla) {
	var i, tokens, token, tipo, buscar,
		compilado = tipo de selector === "función" && selector,
			match = !seed && tokenize((selector = compiled.selector || selector));

	resultados = resultados || [];

	// Intenta minimizar las operaciones si no hay semilla y solo un grupo
	if (match.length === 1) {

		// Toma un atajo y establece el contexto si el selector de raíz es un ID
		tokens = coincidir[0] = coincidir[0].slice(0);
		if (tokens.length > 2 && (token = tokens[0]).type === "ID" &&
			support.getById && context.nodeType === 9 && documentIsHTML &&
			Expr.relative[tokens[1].type]) {

			context = (Expr.find["ID"](token.matches[0].replace(runescape, funescape), context) || [])[0];
			if (!context) {
				devolver resultados;

				// Los comparadores precompilados seguirán verificando la ascendencia, así que suba de nivel
			} else if (compilado) {
				context = context.parentNode;
			}

			selector = selector.slice(tokens.shift().value.length);
		}

		// Obtener un conjunto de semillas para la coincidencia de derecha a izquierda
		i = matchExpr["needContext"].test(selector) ? 0 : tokens.length;
		mientras yo-- ) {
			token = tokens[i];

			// Abortar si golpeamos un combinador
			if (Expr.relative[(type = token.type)]) {
				descanso;
			}
			if ((buscar = Expr.find[tipo])) {
				// Búsqueda, ampliando el contexto para los principales combinadores de hermanos
				si((semilla = encontrar(
					token.matches[0].replace(runescape, funescape),
					rsibling.test(tokens[0].type) && testContext(context.parentNode) || contexto
				))) {

					// Si la semilla está vacía o no quedan tokens, podemos regresar antes
					tokens.splice(i, 1);
					selector = seed.length && toSelector(tokens);
					if (!selector) {
						push.apply(resultados, semilla);
						devolver resultados;
					}

					descanso;
				}
			}
		}
	}

	// Compila y ejecuta una función de filtrado si no se proporciona una
	// Proporcione `match` para evitar la retoquenización si modificamos el selector de arriba
	(compilado || compilar(selector, emparejar))(
		semilla,
		contexto,
		!documentIsHTML,
		resultados
		rsibling.test(selector) && testContext(context.parentNode) || contexto
	);
	devolver resultados;
};

// Asignaciones únicas

// Clasificar estabilidad
support.sortStable = expando.split("").sort(sortOrder).join("") === expandir;

// Soporte: Chrome <14
// Suponga siempre duplicados si no se pasan a la función de comparación
support.detectDuplicates = !!hasDuplicate;

// Inicializar con el documento predeterminado
setDocument();

// Soporte: Webkit <537.32 - Safari 6.0.3 / Chrome 25 (corregido en Chrome 27)
// Los nodos separados se siguen * de manera confusa * entre sí *
support.sortDetached = assert(function (div1) {
	// Debería devolver 1, pero devuelve 4 (siguiente)
	return div1.compareDocumentPosition(document.createElement("div")) & 1;
});

// Soporte: IE <8
// Evita la "interpolación" de atributos / propiedades
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if (!assert(function (div) {
	div.innerHTML = "<a href='#'> </a>";
	return div.firstChild.getAttribute("href") === "#";
})) {
	addHandle("tipo | href | altura | ancho", función(elem, nombre, isXML) {
		if(!isXML) {
			return elem.getAttribute(nombre, nombre.toLowerCase() === "tipo" ? 1 : 2);
		}
	});
}

// Soporte: IE <9
// Usa defaultValue en lugar de getAttribute ("valor")
if (!support.attributes || !assert(function (div) {
	div.innerHTML = "<entrada />";
	div.firstChild.setAttribute("valor", "");
	return div.firstChild.getAttribute("valor") === "";
})) {
	addHandle("valor", función(elem, nombre, isXML) {
		if(!isXML && elem.nodeName.toLowerCase() === "input") {
		return elem.defaultValue;
	}
});
}

// Soporte: IE <9
// Usa getAttributeNode para buscar booleanos cuando getAttribute miente
if (!assert(function (div) {
	return div.getAttribute("deshabilitado") == null;
})) {
	addHandle(booleanos, función(elem, nombre, isXML) {
		var val;
		if(!isXML) {
			return elem[nombre] === verdadero ? name.toLowerCase() :
				(val = elem.getAttributeNode(nombre)) && val.specified ?
					val.value :
					nulo;
		}
	});
}

devuelve Sizzle;

}) (ventana);



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[":"] = jQuery.expr.pseudos;
jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = (/ ^ <(\ w +) \ s * \ / ?> (?: <\ / \ 1> |) $ /);



var risSimple = /^.[^:#\[\.,]*$/;

// Implementar la misma funcionalidad para filtrar y no
función aventar(elementos, calificador, no) {
	if (jQuery.isFunction(calificador)) {
		return jQuery.grep(elementos, función(elem, i) {
			/ * jshint - W018 * /
			return !!qualifier.call(elem, i, elem)! == not;
	});

}

if (qualifier.nodeType) {
	return jQuery.grep(elementos, función(elem) {
		return(elem === calificador)! == no;
});

	}

if (typeof qualifier === "cadena") {
	if (risSimple.test(calificador)) {
		return jQuery.filter(calificador, elementos, no);
	}

	calificador = jQuery.filter(calificador, elementos);
}

return jQuery.grep(elementos, función(elem) {
	return(jQuery.inArray(elem, calificador) > = 0)! == not;
	});
}

jQuery.filter = function (expr, elems, not) {
	var elem = elems[0];

	si no ) {
		expr = ": no (" + expr + ")";
	}

	return elems.length === 1 && elem.nodeType === 1 ?
		jQuery.find.matchesSelector(elem, expr) ? [elem] : [] :
		jQuery.find.matches(expr, jQuery.grep(elems, function (elem) {
			return elem.nodeType === 1;
		}));
};

jQuery.fn.extend({
	encontrar: función(selector) {
		var i,
		ret =[],
		self = esto,
		len = self.length;

		if(typeof selector! == "string") {
	devuelve this.pushStack(jQuery(selector).filter(function () {
		para(i = 0; i < len; i++) {
		if(jQuery.contains(self[i], this)) {
		devuelve verdadero;
	}
}
			}));
		}

para(i = 0; i < len; i++) {
	jQuery.find(selector, self[i], ret);
}

// Necesario porque $ (selector, context) se convierte en $ (context) .find (selector)
ret = this.pushStack(len > 1 ? jQuery.unique(ret) : ret);
ret.selector = this.selector ? this.selector + "" + selector : selector;
return ret;
	},
filtro: función(selector) {
	return this.pushStack(aventar(esto, selector || [], falso));
},
no: función(selector) {
	return this.pushStack(aventar(esto, selector || [], verdadero));
},
es: función(selector) {
	volver!! aventar
	esta,

		// Si este es un selector posicional / relativo, verifique la pertenencia al conjunto devuelto
		// entonces $ ("p: first"). is ("p: last") no devolverá verdadero para un documento con dos "p".
		typeof selector === "cadena" && rneedsContext.test(selector) ?
			jQuery(selector) :
			selector || [],
		falso
		).longitud;
}
});


// Inicializar un objeto jQuery


// Una referencia central a la raíz jQuery (documento)
var rootjQuery,

	// Use el documento correcto de acuerdo con el argumento de la ventana (caja de arena)
	document = window.document,

	// Una forma sencilla de verificar cadenas HTML
	// Priorice #id sobre <tag> para evitar XSS a través de location.hash (# 9521)
	// Reconocimiento estricto de HTML (# 11290: debe comenzar con <)
	rquickExpr = / ^ (?: \ s * (<[\ w \ W] +>) [^>] * | # ([\ w -] *)) $ /,

	init = jQuery.fn.init = función(selector, contexto) {
		var match, elem;

// MANEJO: $ (""), $ (nulo), $ (indefinido), $ (falso)
if (!selector) {
	devuelve esto;
}

// Manejar cadenas HTML
if (typeof selector === "string") {
	if (selector.charAt(0) === "<" && selector.charAt(selector.length - 1) === ">" && selector.length > = 3) {
		// Suponga que las cadenas que comienzan y terminan con <> son HTML y omita la verificación de expresiones regulares
		coincidencia = [nulo, selector, nulo];

	} demás {
		coincidencia = rquickExpr.exec(selector);
	}

	// Coincide con html o asegúrese de que no se especifique ningún contexto para #id
	if (coincide con && (coincide con[1] || !contexto)) {

		// MANEJO: $ (html) -> $ (matriz)
		si(coincide con[1]) {
			context = instancia de contexto de jQuery ? contexto[0] : contexto;

			// los scripts son verdaderos para retrocompatibilidad
			// Permitir intencionalmente que se lance el error si parseHTML no está presente
			jQuery.merge(esto, jQuery.parseHTML(
				coincidir[1],
				context && context.nodeType ? context.ownerDocument || contexto : documento,
				cierto
			));

			// MANEJO: $ (html, props)
			if (rsingleTag.test(coincide con[1]) && jQuery.isPlainObject(contexto)) {
				para(coincidencia en contexto) {
					// Las propiedades del contexto se llaman como métodos si es posible
					if (jQuery.isFunction(este[partido])) {
						este[partido](contexto[partido]);

						// ... y de lo contrario establecer como atributos
					} demás {
						this.attr(coincidencia, contexto[coincidencia]);
					}
				}
			}

			devuelve esto;

			// MANIJA: $ (# id)
		} demás {
			elem = document.getElementById(coincide con[2]);

			// Verifique parentNode para detectar cuándo regresa Blackberry 4.6
			// nodos que ya no están en el documento # 6963
			if (elem && elem.parentNode) {
				// Manejar el caso donde IE y Opera devuelven elementos
				// por nombre en lugar de ID
				if (elem.id! == coincidir[2]) {
					return rootjQuery.find(selector);
				}

				// De lo contrario, inyectamos el elemento directamente en el objeto jQuery
				this.length = 1;
				esto[0] = elem;
			}

			this.context = document;
			this.selector = selector;
			devuelve esto;
		}

		// MANEJO: $ (expr, $ (...))
	} else if (!context || context.jquery) {
		return (contexto || rootjQuery).find(selector);

		// MANEJO: $ (expr, contexto)
		// (que es equivalente a: $ (contexto) .find (expr)
	} demás {
		devuelve este.constructor(contexto).find(selector);
	}

	// MANIJA: $ (DOMElement)
} else if (selector.nodeType) {
	this.context = this[0] = selector;
	this.length = 1;
	devuelve esto;

	// MANIJA: $ (función)
	// Atajo para documento listo
} else if (jQuery.isFunction(selector)) {
	return typeof rootjQuery.ready! == "undefined" ?
		rootjQuery.ready(selector) :
		// Ejecutar inmediatamente si listo no está presente
		selector(jQuery);
}

if (selector.selector! == undefined) {
	this.selector = selector.selector;
	this.context = selector.context;
}

return jQuery.makeArray(selector, esto);
	};

// Dale a la función init el prototipo de jQuery para una instanciación posterior
init.prototype = jQuery.fn;

// Inicializar la referencia central
rootjQuery = jQuery(documento);


var rparentsprev = / ^ (?: padres | anterior (?: Hasta | Todos)) /,
	// métodos garantizados para producir un conjunto único cuando se parte de un conjunto único
	GuaranteUnique = {
		niños: cierto,
		contenido: verdadero,
		siguiente: cierto,
		prev: cierto
	};

jQuery.extend({
	dir: función(elem, dir, hasta) {
		var coincidió = [],
		cur = elem[dir];

		while(cur && cur.nodeType! == 9 && (hasta === undefined || cur.nodeType! == 1 || !jQuery(cur).is(hasta))) {
	if (cur.nodeType === 1) {
		emparejado.push(cur);
	}
	cur = cur[dir];
}
retorno igualado;
	},

hermano: función(n, elem) {
	var r = [];

	para(; n; n = n.hermano siguiente) {
		if (n.nodeType === 1 && n! == elem) {
			r.push(n);
		}
	}

	return r;
}
});

jQuery.fn.extend({
	tiene: función(objetivo) {
	var i,
	objetivos = jQuery(objetivo, esto),
	len = target.length;

	devuelve this.filter(function () {
		para(i = 0; i < len; i++) {
	if(jQuery.contains(this, objetivos[i])) {
	devuelve verdadero;
}
			}
		});
	},

más cercano: función(selectores, contexto) {
	var cur,
		i = 0,
		l = esta.longitud,
		coincidente = [],
		pos = rneedsContext.test(selectores) || tipo de selectores! == "cadena" ?
			jQuery(selectores, contexto || este.contexto) :
			0;

	para(; i < l; i++) {
		para(cur = this[i]; cur && cur! == context; cur = cur.parentNode) {
			// Omitir siempre fragmentos de documentos
			if (cur.nodeType < 11 && (pos ?
				pos.index(cur) > -1 :

				// No le pase elementos no deseados a Sizzle
				cur.nodeType === 1 &&
				jQuery.find.matchesSelector(cur, selectores))) {

				emparejado.push(cur);
				descanso;
			}
		}
	}

	return this.pushStack(coincidente.longitud > 1 ? jQuery.unique(coincidente) : coincidente);
},

// Determinar la posición de un elemento dentro
// el conjunto de elementos coincidentes
índice: función(elem) {

	// Sin argumento, índice de retorno en padre
	si(!elem) {
		return (este[0] && este[0].parentNode) ? this.first().prevAll().length : -1;
	}

	// índice en el selector
	if (typeof elem === "cadena") {
		return jQuery.inArray(this[0], jQuery(elem));
	}

	// Localiza la posición del elemento deseado
	devolver jQuery.inArray(
		// Si recibe un objeto jQuery, se usa el primer elemento
		elem.jquery ? elem[0] : elem, esto);
},

agregar: función(selector, contexto) {
	devuelve this.pushStack(
		jQuery.unique(
			jQuery.merge(this.get(), jQuery(selector, contexto))
		)
	);
},

addBack: function (selector) {
	devolver this.add(selector == null ?
		this.prevObject : this.prevObject.filter(selector)
	);
}
});

función hermano(cur, dir) {
	hacer {
		cur = cur[dir];
	} while (cur && cur.nodeType! == 1);

	return cur;
}

jQuery.each({
	padre: función(elem) {
	var parent = elem.parentNode;
	return parent && parent.nodeType! == 11 ? padre : nulo;
},
	padres: función(elem) {
	return jQuery.dir(elem, "parentNode");
},
	padresHasta: función(elem, i, hasta) {
	return jQuery.dir(elem, "parentNode", hasta);
},
	siguiente: función(elem) {
	return hermano(elem, "nextSibling");
},
	prev: function (elem) {
		return hermano(elem, "hermano anterior");
	},
	nextAll: function (elem) {
		return jQuery.dir(elem, "nextSibling");
	},
	prevAll: function (elem) {
		return jQuery.dir(elem, "hermano anterior");
	},
	nextUntil: function (elem, i, until) {
		return jQuery.dir(elem, "nextSibling", hasta);
	},
	prevUntil: function (elem, i, until) {
		return jQuery.dir(elem, "hermano anterior", hasta);
	},
	hermanos: función(elem) {
	return jQuery.sibling((elem.parentNode || {}).firstChild, elem);
},
	hijos: función(elem) {
	return jQuery.sibling(elem.firstChild);
},
	contenido: function (elem) {
		devolver jQuery.nodeName(elem, "iframe") ?
			elem.contentDocument || elem.contentWindow.document :
			jQuery.merge([], elem.childNodes);
	}
}, función(nombre, fn) {
	jQuery.fn[nombre] = función(hasta, selector) {
	var ret = jQuery.map(esto, fn, hasta);

	if(name.slice(-5)! == "Hasta") {
	selector = hasta;
}

if (selector && typeof selector === "cadena") {
	ret = jQuery.filter(selector, ret);
}

if (this.length > 1) {
	// Eliminar duplicados
	if (!GuaranteUnique[nombre]) {
		ret = jQuery.unique(ret);
	}

	// Orden inverso para padres * y prev-derivados
	if (rparentsprev.test(nombre)) {
		ret = ret.reverse();
	}
}

return this.pushStack(ret);
	};
});
var rnotwhite = (/ \ S + / g);



// Caché de formato de opciones de cadena a objeto
var optionsCache = {};

// Convertir opciones con formato de cadena en opciones con formato de objeto y almacenar en caché
function createOptions(opciones) {
	var object = optionsCache[opciones] = {};
	jQuery.each(options.match(rnotwhite) || [], function (_, flag) {
		objeto[bandera] = verdadero;
	});
	devolver objeto;
}

/ *
	* Cree una lista de devolución de llamada utilizando los siguientes parámetros:
 *
 * opciones: una lista opcional de opciones separadas por espacios que cambiarán cómo
	* la lista de devolución de llamada se comporta o un objeto de opción más tradicional
		*
 * De forma predeterminada, una lista de devolución de llamada actuará como una lista de devolución de llamada de evento y se puede
	* "disparado" varias veces.
 *
 * Posibles opciones:
 *
 * una vez: asegurará que la lista de devolución de llamada solo se pueda activar una vez(como un aplazado)
	*
 * memoria: realizará un seguimiento de los valores anteriores y llamará a cualquier devolución de llamada agregada
	* después de que la lista se haya disparado de inmediato con el último "memorizado"
		* valores(como un diferido)
		*
 * único: asegurará que una devolución de llamada solo se pueda agregar una vez(no hay duplicados en la lista)
	*
 * stopOnFalse: interrumpe las llamadas cuando una devolución de llamada devuelve falso
	*
 * /
jQuery.Callbacks = function (opciones) {

	// Convierta las opciones de formato de cadena a formato de objeto si es necesario
	// (primero comprobamos el caché)
	opciones = tipo de opciones === "cadena" ?
		(optionsCache[opciones] || createOptions(opciones)) :
		jQuery.extend({}, opciones);

	var // Marcar para saber si la lista se está activando actualmente
		disparo,
		// Último valor de disparo (para listas no olvidables)
		memoria,
		// Marcar para saber si la lista ya se disparó
		despedido,
		// Fin del ciclo al disparar
		fireingLength,
		// Índice de devolución de llamada actualmente activa (modificado por eliminar si es necesario)
		firingIndex,
		// Primera devolución de llamada para disparar (utilizada internamente por add y fireWith)
		dispararStart,
		// Lista de devolución de llamada real
		lista = [],
		// Pila de fuego pide listas repetibles
		stack = !options.once && [],
		// Devolver llamadas de fuego
		fuego = función(datos) {
			memoria = opciones.memoria && datos;
	despedido = verdadero;
	firingIndex = firingStart || 0;
	firingStart = 0;
	firingLength = list.length;
	disparo = verdadero;
	for (; list && firingIndex < firingLength; firingIndex++) {
		if (list[firingIndex].apply(data[0], data[1]) === false && options.stopOnFalse) {
			memoria = falso; // Para evitar más llamadas usando add
			descanso;
		}
	}
	disparo = falso;
	if (lista) {
		if (pila) {
			if (stack.length) {
				fuego(stack.shift());
			}
		} más si(memoria) {
			lista = [];
		} demás {
			self.disable();
		}
	}
},
	// Objeto de devoluciones de llamada reales
	self = {
		// Agrega una devolución de llamada o una colección de devoluciones de llamada a la lista
		agregar: función() {
	if (lista) {
		// Primero, guardamos la longitud actual
		var start = list.length;
		(función agregar(args) {
			jQuery.each(argumentos, función(_, arg) {
				var tipo = jQuery.type(arg);
				if(escriba === "función") {
				if (!options.unique || !self.has(arg)) {
					list.push(arg);
				}
			} else if (arg && arg.length && type! == "string") {
				// Inspeccionar de forma recursiva
				agregar(arg);
			}
		});
	}) (argumentos);
	// ¿Necesitamos agregar las devoluciones de llamada al
	// lote de cocción actual?
	if (disparando) {
		firingLength = list.length;
		// Con memoria, si no disparamos entonces
		// deberíamos llamar de inmediato
	} más si(memoria) {
		firingStart = start;
		fuego(memoria);
	}
}
devuelve esto;
			},
// Eliminar una devolución de llamada de la lista
eliminar: función() {
	if (lista) {
		jQuery.each(argumentos, función(_, arg) {
			var index;
			while((índice = jQuery.inArray(arg, lista, índice)) > -1) {
			list.splice(índice, 1);
			// Manejar índices de disparo
			if (disparando) {
				if (index <= firingLength) {
					firingLength--;
				}
				if (índice <= firingIndex) {
					firingIndex--;
				}
			}
		}
	});
}
devuelve esto;
			},
// Comprueba si una devolución de llamada determinada está en la lista.
// Si no se proporciona ningún argumento, devuelve si la lista tiene devoluciones de llamada adjuntas.
tiene: función(fn) {
	volver fn ? jQuery.inArray(fn, lista) > -1 : !!(lista && list.length);
},
// Eliminar todas las devoluciones de llamada de la lista
vacío: función() {
	lista = [];
	firingLength = 0;
	devuelve esto;
},
// Que la lista no haga nada más
inhabilitar: función() {
	lista = pila = memoria = indefinido;
	devuelve esto;
},
// ¿Está deshabilitado?
inhabilitado: función() {
	volver! lista;
},
// Bloquear la lista en su estado actual
bloqueo: función() {
	pila = indefinido;
	if (!memory) {
		self.disable();
	}
	devuelve esto;
},
// ¿Está bloqueado?
bloqueado: función() {
	volver! pila;
},
// Llamar a todas las devoluciones de llamada con el contexto y los argumentos dados
fireWith: function (context, args) {
	if (lista && (!disparado || pila)) {
		argumentos = argumentos || [];
		args = [contexto, args.slice ? args.slice() : args];
		if (disparando) {
			stack.push(argumentos);
		} demás {
			fuego(args);
		}
	}
	devuelve esto;
},
// Llama a todas las devoluciones de llamada con los argumentos dados
fuego: función() {
	self.fireWith(esto, argumentos);
	devuelve esto;
},
// Para saber si las devoluciones de llamada ya se han llamado al menos una vez
despedido: function () {
	volver!! despedido;
}
		};

volver a sí mismo;
};


jQuery.extend({

	Diferido: función(func) {
	var tuplas = [
		// acción, agregar oyente, lista de oyentes, estado final
		["resolver", "hecho", jQuery.Callbacks("memoria una vez"), "resuelto"],
		["rechazar", "fallar", jQuery.Callbacks("memoria una vez"), "rechazado"],
		["notificar", "progreso", jQuery.Callbacks("memoria")]
	],
	estado = "pendiente",
	promesa = {
		función estatal() {
			estado de retorno;
		},
		siempre: function () {
			diferido.done(argumentos).fail(argumentos);
			devuelve esto;
		},
		luego: function (/ * fnDone, fnFail, fnProgress * /) {
	var fns = argumentos;
	return jQuery.Deferred(function (newDefer) {
		jQuery.each(tuplas, función(i, tupla) {
			var fn = jQuery.isFunction(fns[i]) && fns[i];
			// diferido [hecho | fallar | progreso] para reenviar acciones a newDefer
			diferido [tupla[1]](función () {
				var devuelto = fn && fn.apply(esto, argumentos);
				if(devuelto && jQuery.isFunction(devuelto.promise)) {
			devuelto.promise()
				.done(newDefer.resolve)
				.fail(newDefer.reject)
				.progreso(newDefer.notify);
		} demás {
			newDefer[tupla[0] + "Con"](esta === promesa ? newDefer.promise() : esto, fn ? [devuelto] : argumentos);
		}
	});
});
fns = nulo;
					}).promesa();
				},
// Obtenga una promesa para este diferido
// Si se proporciona obj, el aspecto de promesa se agrega al objeto
promesa: función(obj) {
	return obj! = null ? jQuery.extend(obj, promesa) : promesa;
}
			},
diferido = {};

// Mantener la tubería para retrocompatibilidad
promesa.pipe = promesa.entonces;

// Agregar métodos específicos de la lista
jQuery.each(tuplas, función(i, tupla) {
	var list = tuple[2],
	stateString = tupla[3];

	// promesa [hecho | fallar | progreso] = list.add
	promesa [tupla[1]] = lista.add;

	// Manejar estado
	if(stateString) {
		list.add(function () {
			// estado = [resuelto | rechazado ]
			state = stateString;

			// [lista_de_rechazos | resolve_list] .disable; progress_list.lock
		}, tuplas[i ^ 1][2].disable, tuplas[2][2].lock);
	}

			// diferido [resolver | rechazar | notificar]
			diferido [tupla[0]] = función() {
	diferido [tupla[0] + "Con"](esto === ¿diferido ? promesa : esto, argumentos);
devuelve esto;
			};
diferido[tupla[0] + "Con"] = list.fireWith;
		});

// Haz que lo diferido sea una promesa
promise.promise(diferido);

// Llamar a la función dada si la hay
if (func) {
	func.call(diferido, diferido);
}

// ¡Todo listo!
retorno diferido;
	},

// Ayudante diferido
cuando: función(subordinado / *, ..., subordinadoN * /) {
		var i = 0,
	resolveValues = slice.call(argumentos),
	length = resolveValues.length,

	// el recuento de subordinados incompletos
	restante = longitud! == 1 || (subordinado && jQuery.isFunction(subordinado.promesa)) ? longitud : 0,

	// el maestro diferido. Si resolveValues ​​consta de un único diferido, utilícelo.
	diferido = restante === 1 ? subordinado : jQuery.Deferred(),

	// Función de actualización para los valores de resolución y progreso
	updateFunc = función(i, contextos, valores) {
		función de retorno (valor) {
			contextos[i] = esto;
			valores[i] = argumentos.longitud > 1 ? slice.call(argumentos) : valor;
			if (valores === progressValues) {
				deferred.notifyWith(contextos, valores);

			} más si(!(- restante)) {
				deferred.resolveWith(contextos, valores);
			}
		};
			},

progressValues, progressContexts, resolveContexts;

// agrega oyentes a subordinados diferidos; tratar a los demás como resueltos
if (longitud > 1) {
	progressValues = new Array(longitud);
	progressContexts = new Array(longitud);
	resolveContexts = new Array(longitud);
	para(; i < longitud; i++) {
		if (resolveValues[i] && jQuery.isFunction(resolveValues[i].promise)) {
			resolveValues[i].promise()
				.done(updateFunc(i, resolveContexts, resolveValues))
				.fail(rechazo.deferido)
				.progress(updateFunc(i, progressContexts, progressValues));
		} demás {
			--restante;
		}
	}
}

// si no estamos esperando nada, resuelve el maestro
si(!restante) {
	deferred.resolveWith(resolveContexts, resolveValues);
}

return deferred.promise();
	}
});


// El diferido usado en DOM listo
var readyList;

jQuery.fn.ready = function (fn) {
	// Agrega la devolución de llamada
	jQuery.ready.promise().done(fn);

	devuelve esto;
};

jQuery.extend({
	// ¿Está el DOM listo para ser utilizado? Establezca en verdadero una vez que ocurra.
	isReady: falso,

	// Un contador para rastrear cuántos elementos esperar antes
	// el evento listo se dispara. Ver # 6781
	readyWait: 1,

	// Mantenga (o suelte) el evento listo
	holdReady: function (mantener) {
		si(mantener) {
			jQuery.readyWait++;
		} demás {
			jQuery.ready(verdadero);
		}
	},

	// Manejar cuando el DOM esté listo
	listo: función(esperar) {

		// Abortar si hay retenciones pendientes o ya estamos listos
		if(esperar === cierto ? --jQuery.readyWait : jQuery.isReady) {
	regreso;
}

// Asegúrese de que el cuerpo exista, al menos, en caso de que IE se vuelva un poco entusiasta (ticket # 5443).
if (!document.body) {
	return setTimeout(jQuery.ready);
}

// Recuerda que el DOM está listo
jQuery.isReady = verdadero;

// Si se dispara un evento DOM Ready normal, disminuya y espere si es necesario
if (espera! == verdadero && --jQuery.readyWait > 0) {
	regreso;
}

// Si hay funciones vinculadas, ejecutar
readyList.resolveWith(documento, [jQuery]);

// Desencadena cualquier evento enlazado listo
if (jQuery.fn.triggerHandler) {
	jQuery(documento).triggerHandler("listo");
	jQuery(documento).off("listo");
}
	}
});

/ **
	* Método de limpieza para eventos listos para dom
		* /
function detach() {
	if (document.addEventListener) {
		document.removeEventListener("DOMContentLoaded", completado, falso);
		window.removeEventListener("cargar", completado, falso);

	} demás {
		document.detachEvent("onreadystatechange", completado);
		window.detachEvent("onload", completado);
	}
}

/ **
	* El controlador de eventos listo y el método de autolimpieza
		* /
función completada() {
	// readyState === "complete" es lo suficientemente bueno para que llamemos al dom ready en oldIE
	if (document.addEventListener || event.type === "load" || document.readyState === "complete") {
		despegar();
		jQuery.ready();
	}
}

jQuery.ready.promise = function (obj) {
	if (!readyList) {

		readyList = jQuery.Deferred();

		// Detecta los casos en los que se llama a $ (document) .ready () después de que el evento del navegador ya haya ocurrido.
		// Una vez intentamos usar readyState "interactivo" aquí, pero causó problemas como el
		// descubierto por ChrisS aquí: http://bugs.jquery.com/ticket/12282#comment:15
		if (document.readyState === "complete") {
			// Manéjelo de forma asincrónica para permitir que los scripts tengan la oportunidad de retrasarse
			setTimeout(jQuery.ready);

			// Los navegadores basados ​​en estándares son compatibles con DOMContentLoaded
		} else if (document.addEventListener) {
			// Usa la práctica devolución de llamada de eventos
			document.addEventListener("DOMContentLoaded", completado, falso);

			// Una alternativa a window.onload, que siempre funcionará
			window.addEventListener("cargar", completado, falso);

			// Si se usa el modelo de eventos IE
		} demás {
			// Asegúrate de disparar antes de la carga, tal vez tarde pero seguro también para iframes
			document.attachEvent("onreadystatechange", completado);

			// Una alternativa a window.onload, que siempre funcionará
			window.attachEvent("onload", completado);

			// Si IE y no un marco
			// verifica continuamente para ver si el documento está listo
			var top = false;

			intentar {
				top = window.frameElement == null && document.documentElement;
			} atrapar(e) { }

			if (top && top.doScroll) {
				(función doScrollCheck() {
					if (!jQuery.isReady) {

						intentar {
							// Usa el truco de Diego Perini
							// http://javascript.nwbox.com/IEContentLoaded/
							top.doScroll("izquierda");
						} captura(e) {
							return setTimeout(doScrollCheck, 50);
						}

						// separar todos los eventos listos para dom
						despegar();

						// y ejecuta cualquier función de espera
						jQuery.ready();
					}
				}) ();
			}
		}
	}
	return readyList.promise(obj);
};


var strundefined = typeof undefined;



// Soporte: IE <9
// Iteración sobre las propiedades heredadas del objeto antes que las propias
var i;
para(i en jQuery(soporte)) {
	descanso;
}
support.ownLast = i! == "0";

// Nota: la mayoría de las pruebas de soporte se definen en sus respectivos módulos.
// falso hasta que se ejecute la prueba
support.inlineBlockNeedsLayout = false;

// Ejecutar lo antes posible en caso de que necesitemos configurar body.style.zoom
jQuery(función() {
	// Minificado: var a, b, c, d
	var val, div, cuerpo, contenedor;

	cuerpo = document.getElementsByTagName("cuerpo")[0];
	if(!body || !body.style) {
	// Devuelve los documentos de conjuntos de marcos que no tienen cuerpo
	regreso;
}

// Configuración
div = document.createElement("div");
contenedor = document.createElement("div");
container.style.cssText = "posición: absoluta; borde: 0; ancho: 0; alto: 0; arriba: 0; izquierda: -9999px";
body.appendChild(contenedor).appendChild(div);

if (typeof div.style.zoom! == strundefined) {
	// Soporte: IE <8
	// Compruebe si los elementos de nivel de bloque de forma nativa actúan como un bloque en línea
	// elementos al configurar su visualización en 'en línea' y dar
	// ellos diseño
	div.style.cssText = "display: inline; margin: 0; border: 0; padding: 1px; width: 1px; zoom: 1";

	support.inlineBlockNeedsLayout = val = div.offsetWidth === 3;
	if (val) {
		// Evita que IE 6 afecte el diseño de los elementos posicionados # 11048
		// Evita que IE encoja el cuerpo en el modo IE 7 # 12869
		// Soporte: IE <8
		body.style.zoom = 1;
	}
}

body.removeChild(contenedor);
});




(función() {
	var div = document.createElement("div");

	// Ejecute la prueba solo si aún no se ha ejecutado en otro módulo.
	if (support.deleteExpando == null) {
		// Soporte: IE <9
		support.deleteExpando = true;
		intentar {
			eliminar div.test;
		} captura(e) {
			support.deleteExpando = false;
		}
	}

	// Elementos nulos para evitar filtraciones en IE.
	div = nulo;
}) ();


/ **
	* Determina si un objeto puede tener datos
		* /
jQuery.acceptData = function (elem) {
	var noData = jQuery.noData[(elem.nodeName + "").toLowerCase()],
		nodeType = + elem.nodeType || 1;

	// No establezca datos en nodos DOM que no sean elementos porque no se borrarán (# 8335).
	return nodeType! == 1 && nodeType! == 9 ?
		falso :

		// Los nodos aceptan datos a menos que se especifique lo contrario; el rechazo puede ser condicional
		!noData || noData! == true && elem.getAttribute("classid") === noData;
};


var rbrace = / ^ (?: \ {[\ w \ W] * \} | \ [[\ w \ W] * \]) $ /,
	rmultiDash = / ([AZ]) / g;

function dataAttr(elem, key, data) {
	// Si no se encontró nada internamente, intente recuperar cualquier
	// datos del atributo HTML5 data- *
	if (datos === indefinido && elem.nodeType === 1) {

		var name = "data-" + key.replace(rmultiDash, "- $ 1").toLowerCase();

		data = elem.getAttribute(nombre);

		if (tipo de datos === "cadena") {
			intentar {
				datos = datos === "verdadero" ? cierto :
					datos === "falso" ? falso :
						datos === "nulo" ? nulo :
							// Solo convierte a un número si no cambia la cadena
							+ datos + "" === datos ? + datos :
								rbrace.test(datos) ? jQuery.parseJSON(datos) :
									datos;
			} atrapar(e) { }

			// Asegúrate de configurar los datos para que no se modifiquen más tarde
			jQuery.data(elem, clave, datos);

		} demás {
			datos = indefinido;
		}
	}

	devolver datos;
}

// comprueba si un objeto de caché está vacío
function isEmptyDataObject(obj) {
	var nombre;
	para(nombre en obj) {

		// si el objeto de datos públicos está vacío, el privado todavía está vacío
		if (nombre === "datos" && jQuery.isEmptyObject(obj[nombre])) {
			Seguir;
		}
		if (nombre! == "toJSON") {
			falso retorno;
		}
	}

	devuelve verdadero;
}

function internalData(elem, name, data, pvt / * Internal Use Only * /) {
	if (!jQuery.acceptData(elem)) {
		regreso;
	}

	var ret, thisCache,
		internalKey = jQuery.expando,

		// Tenemos que manejar los nodos DOM y los objetos JS de manera diferente porque IE6-7
		// no se pueden hacer referencias a objetos de GC correctamente a través del límite DOM-JS
		isNode = elem.nodeType,

		// Solo los nodos DOM necesitan la caché jQuery global; Los datos del objeto JS son
		// adjunto directamente al objeto para que GC pueda ocurrir automáticamente
		cache = isNode ? jQuery.cache : elem,

		// Solo definir una ID para objetos JS si su caché ya existe permite
		// el código al acceso directo en la misma ruta que un nodo DOM sin caché
		id = isNode ? elem[internalKey] : elem[internalKey] && internalKey;

	// Evite hacer más trabajo del necesario cuando tratamos de obtener datos en un
	// objeto que no tiene ningún dato
	if ((!id || !cache[id] || (!pvt && !cache[id].data)) && data === undefined && typeof name === "string") {
		regreso;
	}

	si yo d ) {
		// Solo los nodos DOM necesitan una nueva ID única para cada elemento, ya que sus datos
		// termina en la caché global
		if (isNode) {
			id = elem[internalKey] = deleteIds.pop() || jQuery.guid++;
		} demás {
			id = internalKey;
		}
	}

	if (!cache[id]) {
		// Evite exponer metadatos de jQuery en objetos JS simples cuando el objeto
		// se serializa usando JSON.stringify
		caché[id] = isNode ? {} : { toJSON: jQuery.noop };
	}

	// Se puede pasar un objeto a jQuery.data en lugar de un par clave / valor; esto se pone
	// superficial copiado sobre el caché existente
	if (typeof name === "object" || typeof name === "function") {
		if (pvt) {
			cache[id] = jQuery.extend(cache[id], nombre);
		} demás {
			cache[id].data = jQuery.extend(cache[id].data, nombre);
		}
	}

	thisCache = cache[id];

	// jQuery data () se almacena en un objeto separado dentro de los datos internos del objeto
	// caché para evitar colisiones de claves entre los datos internos y los definidos por el usuario
	// datos.
	if (!pvt) {
		if (!thisCache.data) {
			thisCache.data = {};
		}

		thisCache = thisCache.data;
	}

	if (data! == undefined) {
		thisCache[jQuery.camelCase(nombre)] = datos;
	}

	// Compruebe los nombres de propiedad de datos convertidos a camello y no convertidos
	// Si se especificó una propiedad de datos
	if (typeof name === "string") {

		// Primero intente encontrar datos de propiedad tal como están
		ret = thisCache[nombre];

		// Prueba para datos de propiedad nulos | indefinidos
		si(ret == nulo) {

			// Intenta encontrar la propiedad camelCased
			ret = thisCache[jQuery.camelCase(nombre)];
		}
	} demás {
		ret = thisCache;
	}

	return ret;
}

function internalRemoveData(elem, name, pvt) {
	if (!jQuery.acceptData(elem)) {
		regreso;
	}

	var thisCache, yo,
		isNode = elem.nodeType,

		// Consulte jQuery.data para obtener más información
		cache = isNode ? jQuery.cache : elem,
		id = isNode ? elem[jQuery.expando] : jQuery.expando;

	// Si ya no hay una entrada de caché para este objeto, no hay
	// propósito de continuar
	if (!cache[id]) {
		regreso;
	}

	if (nombre) {

		thisCache = pvt ? caché[id] : caché[id].data;

		if (thisCache) {

			// Admite nombres de cadenas separados por espacios o matrices para claves de datos
			if (!jQuery.isArray(nombre)) {

				// prueba la cadena como clave antes de cualquier manipulación
				if (nombre en thisCache) {
					nombre = [nombre];
				} demás {

					// dividir la versión en caja camel por espacios a menos que exista una clave con los espacios
					nombre = jQuery.camelCase(nombre);
					if (nombre en thisCache) {
						nombre = [nombre];
					} demás {
						nombre = nombre.split("");
					}
				}
			} demás {
				// Si "nombre" es una matriz de claves ...
				// Cuando los datos se crean inicialmente, mediante la firma ("key", "val"),
				// las claves se convertirán a camelCase.
				// Dado que no hay forma de saber _cómo_ se agregó una clave, elimine
				// clave simple y clave camelCase. N.º 12786
				// Esto solo penalizará la ruta del argumento de la matriz.
				nombre = nombre.concat(jQuery.map(nombre, jQuery.camelCase));
			}

			i = nombre.longitud;
			mientras yo-- ) {
				eliminar thisCache[nombre[i]];
			}

			// Si no quedan datos en la caché, queremos continuar
			// y dejar que el propio objeto de la caché se destruya
			if (pvt ? !isEmptyDataObject(thisCache) : !jQuery.isEmptyObject(thisCache)) {
				regreso;
			}
		}
	}

	// Consulte jQuery.data para obtener más información
	if (!pvt) {
		eliminar caché[id].data;

		// No destruya la caché principal a menos que el objeto de datos interno
		// había sido lo único que quedaba en él
		if (!isEmptyDataObject(caché[id])) {
			regreso;
		}
	}

	// Destruye el caché
	if (isNode) {
		jQuery.cleanData([elem], verdadero);

		// Use delete cuando sea compatible con expandos o `cache` no es una ventana por isWindow (# 10080)
		/ * jshint eqeqeq: falso * /
	} else if (support.deleteExpando || cache! = cache.window) {
		/ * jshint eqeqeq: verdadero * /
		eliminar caché[id];

		// Cuando todo lo demás falla, nulo
	} demás {
		caché[id] = nulo;
	}
}

jQuery.extend({
	caché: {},

	// Los siguientes elementos (con sufijo de espacio para evitar colisiones Object.prototype)
	// arroja excepciones que no se pueden capturar si intenta establecer propiedades de expansión
	sin datos: {
		"applet": verdadero,
		"incrustar": verdadero,
		// ... pero los objetos Flash (que tienen este classid) * pueden * manejar expansiones
		"objeto": "clsid: D27CDB6E-AE6D-11cf-96B8-444553540000"
	},

	hasData: function (elem) {
		elem = elem.nodeType ? jQuery.cache[elem[jQuery.expando]] : elem[jQuery.expando];
		return !!elem && !isEmptyDataObject(elem);
	},

	datos: función(elem, nombre, datos) {
	return internalData(elem, nombre, datos);
},

	removeData: function (elem, name) {
		return internalRemoveData(elem, nombre);
	},

	// Sólo para uso interno.
	_data: function (elem, name, data) {
		return internalData(elem, name, data, true);
	},

	_removeData: function (elem, name) {
		return internalRemoveData(elem, name, true);
	}
});

jQuery.fn.extend({
	datos: función(clave, valor) {
		var i, nombre, datos,
		elem = esto[0],
		attrs = elem && elem.attributes;

		// Las expectativas especiales de .data básicamente frustran jQuery.access,
		// así que implementamos el comportamiento relevante nosotros mismos

		// Obtiene todos los valores
		si(clave === indefinido) {
	if (this.length) {
		datos = jQuery.data(elem);

		if (elem.nodeType === 1 && !jQuery._data(elem, "parsedAttrs")) {
			i = attrs.length;
			mientras yo-- ) {

				// Soporte: IE11 +
				// Los elementos attrs pueden ser nulos (# 14894)
				if (attrs[i]) {
					nombre = atributos[i].nombre;
					if (name.indexOf("data-") === 0) {
						nombre = jQuery.camelCase(nombre.slice(5));
						dataAttr(elem, nombre, datos[nombre]);
					}
				}
			}
			jQuery._data(elem, "parsedAttrs", verdadero);
		}
	}

	devolver datos;
}

// Establece varios valores
if (typeof key === "object") {
	devuelve this.each(function () {
		jQuery.data(esto, clave);
	});
}

devolver argumentos.longitud > 1 ?

	// Establece un valor
	this.each(function () {
		jQuery.data(esto, clave, valor);
	}) :

	// Obtiene un valor
	// Intente obtener primero los datos almacenados internamente
	elem ? dataAttr(elem, clave, jQuery.data(elem, clave)) : indefinido;
	},

removeData: function (key) {
	devuelve this.each(function () {
		jQuery.removeData(esto, clave);
	});
}
});


jQuery.extend({
	cola: función(elem, tipo, datos) {
	var cola;

	si(elem) {
		tipo = (tipo || "fx") + "cola";
		cola = jQuery._data(elem, tipo);

		// Acelera la salida de la cola saliendo rápidamente si esto es solo una búsqueda
		si(datos) {
			if (!cola || jQuery.isArray(datos)) {
				cola = jQuery._data(elem, tipo, jQuery.makeArray(datos));
			} demás {
				queue.push(datos);
			}
		}
		cola de retorno || [];
	}
},

	dequeue: function (elem, type) {
		tipo = tipo || "fx";

		var queue = jQuery.queue(elem, tipo),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks(elem, tipo),
			siguiente = función() {
				jQuery.dequeue (elem, tipo);
	};

// Si se quita la cola de fx, siempre elimine el centinela de progreso
if (fn === "inprogress") {
	fn = queue.shift();
	startLength--;
}

si(fn) {

	// Agrega un centinela de progreso para evitar que la cola de fx sea
	// retirado automáticamente de la cola
	if (escriba === "fx") {
		queue.unshift("en progreso");
	}

	// limpiar la última función de parada de la cola
	eliminar hooks.stop;
	fn.call(elem, siguiente, ganchos);
}

if (!startLength && hooks) {
	hooks.empty.fire();
}
	},

// no destinado al consumo público: genera un objeto queueHooks o devuelve el actual
_queueHooks: function (elem, type) {
	var key = type + "queueHooks";
	return jQuery._data(elem, clave) || jQuery._data(elem, key, {
		vacío: jQuery.Callbacks("una vez memoria").add(function () {
			jQuery._removeData(elem, tipo + "cola");
			jQuery._removeData(elem, clave);
		})
	});
}
});

jQuery.fn.extend({
	cola: función(tipo, datos) {
		var setter = 2;

		if(typeof type! == "string") {
	datos = tipo;
	tipo = "fx";
	setter--;
}

if (argumentos.longitud < establecedor) {
	return jQuery.queue(este[0], tipo);
}

devolver datos === indefinido ?
	esta :
	this.each(function () {
		var queue = jQuery.queue(este, tipo, datos);

		// asegurar ganchos para esta cola
		jQuery._queueHooks(este, tipo);

		if (escriba === "fx" && queue[0]! == "inprogress") {
			jQuery.dequeue(este, tipo);
		}
	});
	},
dequeue: function (type) {
	devuelve this.each(function () {
		jQuery.dequeue(este, tipo);
	});
},
clearQueue: function (tipo) {
	return this.queue(escriba || "fx", []);
},
// Obtener una promesa resuelta cuando hay colas de cierto tipo
// se vacían (fx es el tipo por defecto)
promesa: función(tipo, obj) {
	var tmp,
		cuenta = 1,
		diferir = jQuery.Deferred(),
		elementos = esto,
		i = esta.longitud,
		resolver = función() {
			if (!(--count)) {
		defer.resolveWith(elementos, [elementos]);
	}
};

if (typeof type! == "string") {
	obj = tipo;
	tipo = indefinido;
}
tipo = tipo || "fx";

mientras yo-- ) {
	tmp = jQuery._data(elementos[i], tipo + "queueHooks");
	if (tmp && tmp.empty) {
		contar++;
		tmp.empty.add(resolver);
	}
}
resolver();
return diferir.promise(obj);
	}
});
var pnum = (/[+-]?(?:\d*\.|)\d+(?:[e][+-]?\d+|)/).source;

var cssExpand = ["Arriba", "Derecha", "Abajo", "Izquierda"];

var isHidden = function (elem, el) {
	// isHidden puede ser llamado desde la función de filtro jQuery #;
	// en ese caso, el elemento será el segundo argumento
	elem = el || elem;
	return jQuery.css(elem, "display") === "none" || !jQuery.contains(elem.ownerDocument, elem);
};



// Método multifuncional para obtener y establecer valores de una colección
// El valor / s se puede ejecutar opcionalmente si es una función
var access = jQuery.access = function (elems, fn, key, value, chainable, emptyGet, raw) {
	var i = 0,
		length = elems.length,
		masivo = clave == nulo;

	// Establece muchos valores
	if (jQuery.type(clave) === "objeto") {
		encadenable = verdadero;
		para(yo en clave) {
			jQuery.access(elems, fn, i, key[i], true, emptyGet, raw);
		}

		// Establece un valor
	} más si(valor! == indefinido) {
		encadenable = verdadero;

		if (!jQuery.isFunction(valor)) {
			crudo = verdadero;
		}

		if (masivo) {
			// Las operaciones masivas se ejecutan en todo el conjunto
			si(crudo) {
				fn.call(elems, valor);
				fn = nulo;

				// ... excepto al ejecutar valores de función
			} demás {
				bulk = fn;
				fn = función(elem, clave, valor) {
					return bulk.call(jQuery(elem), valor);
				};
			}
		}

		si(fn) {
			para(; i < longitud; i++) {
				fn(elems[i], clave, sin formato ? valor : valor.call(elems[i], i, fn(elems[i], clave)));
			}
		}
	}

	retorno encadenable ?
		elems :

		// Obtiene
		a granel ?
			fn.call(elems) :
			longitud ? fn(elems[0], clave) : emptyGet;
};
var rcheckableType = (/ ^ (?: casilla de verificación | radio) $ / i);



(función() {
	// Minificado: var a, b, c
	var input = document.createElement("entrada"),
		div = document.createElement("div"),
		fragment = document.createDocumentFragment();

	// Configuración
	div.innerHTML = "<link/><table> </table> <a href='/a'> a </a> <input type = 'checkbox' />";

	// IE elimina los espacios en blanco iniciales cuando se usa .innerHTML
	support.leadingWhitespace = div.firstChild.nodeType === 3;

	// Asegúrate de que los elementos tbody no se inserten automáticamente
	// IE los insertará en tablas vacías
	support.tbody = !div.getElementsByTagName("tbody").length;

	// Asegúrese de que innerHTML serialice correctamente los elementos del enlace
	// Esto requiere un elemento contenedor en IE
	support.htmlSerialize = !!div.getElementsByTagName("enlace").length;

	// Se asegura de que la clonación de un elemento html5 no cause problemas
	// Donde externalHTML no está definido, esto todavía funciona
	support.html5Clone =
		document.createElement("nav").cloneNode(true).outerHTML! == "<: nav> </: nav>";

	// Verifica si una casilla de verificación desconectada mantendrá su marcada
	// valor de verdadero después de agregarlo al DOM (IE6 / 7)
	input.type = "casilla de verificación";
	input.checked = true;
	fragment.appendChild(entrada);
	support.appendChecked = input.checked;

	// Asegúrese de que textarea (y casilla de verificación) defaultValue esté clonado correctamente
	// Soporte: IE6-IE11 +
	div.innerHTML = "<textarea> x </textarea>";
	support.noCloneChecked = !!div.cloneNode(true).lastChild.defaultValue;

	// # 11217 - WebKit pierde el cheque cuando el nombre está después del atributo verificado
	fragment.appendChild(div);
	div.innerHTML = "<tipo de entrada = 'radio' comprobado = 'comprobado' nombre = 't' />";

	// Soporte: Safari 5.1, iOS 5.1, Android 4.x, Android 2.3
	// el WebKit antiguo no clona el estado comprobado correctamente en fragmentos
	support.checkClone = div.cloneNode(verdadero).cloneNode(verdadero).lastChild.checked;

	// Soporte: IE <9
	// Opera no clona eventos (y typeof div.attachEvent === undefined).
	// IE9-10 clona eventos vinculados a través de attachEvent, pero no se activan con .click ()
	support.noCloneEvent = true;
	if (div.attachEvent) {
		div.attachEvent("onclick", function () {
			support.noCloneEvent = false;
		});

		div.cloneNode(verdadero).click();
	}

	// Ejecute la prueba solo si aún no se ha ejecutado en otro módulo.
	if (support.deleteExpando == null) {
		// Soporte: IE <9
		support.deleteExpando = true;
		intentar {
			eliminar div.test;
		} captura(e) {
			support.deleteExpando = false;
		}
	}
}) ();


(función() {
	var i, eventName,
		div = document.createElement("div");

	// Soporte: IE <9 (falta enviar / cambiar burbuja), Firefox 23+ (falta evento focusin)
	for (i in { submit: true, change: true, focusin: true }) {
		eventName = "en" + i;

		if (!(support[i + "Bubbles"] = eventName en la ventana)) {
			// Tenga cuidado con las restricciones de CSP (https://developer.mozilla.org/en/Security/CSP)
			div.setAttribute(eventName, "t");
			support[i + "Bubbles"] = div.attributes[eventName].expando === false;
		}
	}

	// Elementos nulos para evitar filtraciones en IE.
	div = nulo;
}) ();


var rformElems = / ^ (?: entrada | seleccionar | área de texto) $ / i,
	rkeyEvent = / ^ tecla /,
	rmouseEvent = / ^ (?: mouse | puntero | menú contextual) | clic /,
	rfocusMorph = / ^ (?: focusinfocus | focusoutblur) $ /,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;

function returnTrue() {
	devuelve verdadero;
}

function returnFalse() {
	falso retorno;
}

function safeActiveElement() {
	intentar {
		return document.activeElement;
	} atrapar(err) { }
}

/ *
	* Funciones auxiliares para la gestión de eventos, que no forman parte de la interfaz pública.
 * Apoyos de la biblioteca addEvent de Dean Edwards para muchas de las ideas.
 * /
jQuery.event = {

	global: {},

	agregar: función(elem, tipos, manejador, datos, selector) {
	var tmp, eventos, t, handleObjIn,
		especial, eventHandle, handleObj,
		controladores, tipo, espacios de nombres, origType,
		elemData = jQuery._data(elem);

	// No adjunte eventos a noData o nodos de texto / comentario (pero permita objetos simples)
	if (!elemData) {
		regreso;
	}

	// La persona que llama puede pasar un objeto de datos personalizados en lugar del controlador
	if (handler.handler) {
		handleObjIn = manejador;
		handler = handleObjIn.handler;
		selector = handleObjIn.selector;
	}

	// Asegúrese de que el controlador tenga una identificación única, que se usa para encontrarlo / eliminarlo más tarde
	if (!handler.guid) {
		handler.guid = jQuery.guid++;
	}

	// Inicia la estructura de eventos del elemento y el controlador principal, si este es el primero
	if (!(eventos = elemData.events)) {
		eventos = elemData.events = {};
	}
	if (!(eventHandle = elemData.handle)) {
		eventHandle = elemData.handle = function (e) {
			// Descartar el segundo evento de un jQuery.event.trigger () y
			// cuando se llama a un evento después de que se haya descargado una página
			return typeof jQuery! == strundefined && (!e || jQuery.event.triggered! == e.type) ?
				jQuery.event.dispatch.apply(eventHandle.elem, argumentos) :
				indefinido;
		};
		// Agregue elem como una propiedad del identificador fn para evitar una fuga de memoria con eventos no nativos de IE
		eventHandle.elem = elem;
	}

	// Maneja múltiples eventos separados por un espacio
	tipos = (tipos || "").match(rnotwhite) || [""];
	t = tipos.longitud;
	while (t--) {
		tmp = rtypenamespace.exec(tipos[t]) || [];
		type = origType = tmp[1];
		espacios de nombres = (tmp[2] || "").split(".").sort();

		// Debe * haber un tipo, sin adjuntar controladores de solo espacio de nombres
		if (!type) {
			Seguir;
		}

		// Si el evento cambia de tipo, use los controladores de eventos especiales para el tipo cambiado
		especial = jQuery.event.special[tipo] || {};

		// Si el selector está definido, determina el tipo de api de evento especial; de lo contrario, se da el tipo
		type = (selector ? special.delegateType : special.bindType) || tipo;

		// Actualización especial basada en el tipo de reinicio reciente
		especial = jQuery.event.special[tipo] || {};

		// handleObj se pasa a todos los controladores de eventos
		handleObj = jQuery.extend({
			tipo: tipo,
			origType: origType,
			datos: datos,
			manejador: manejador,
			guid: handler.guid,
			selector: selector,
			needContext: selector && jQuery.expr.match.needsContext.test(selector),
			espacio de nombres: espacios de nombres.join(".")
		}, handleObjIn);

		// Iniciamos la cola del controlador de eventos si somos los primeros
		if (!(manejadores = eventos[tipo])) {
			manejadores = eventos[tipo] = [];
			handlers.delegateCount = 0;

			// Solo use addEventListener / attachEvent si el controlador de eventos especiales devuelve falso
			if (!special.setup || special.setup.call(elem, data, namespaces, eventHandle) === false) {
				// Vincular el controlador de eventos global al elemento
				if (elem.addEventListener) {
					elem.addEventListener(tipo, eventHandle, falso);

				} else if (elem.attachEvent) {
					elem.attachEvent("en" + tipo, eventHandle);
				}
			}
		}

		if (special.add) {
			special.add.call(elem, handleObj);

			if (!handleObj.handler.guid) {
				handleObj.handler.guid = handler.guid;
			}
		}

		// Agregar a la lista de controladores del elemento, delegados al frente
		if (selector) {
			handlers.splice(handlers.delegateCount++, 0, handleObj);
		} demás {
			handlers.push(handleObj);
		}

		// Realice un seguimiento de los eventos que se han utilizado alguna vez, para la optimización de eventos
		jQuery.event.global[tipo] = verdadero;
	}

	// Anula elem para evitar pérdidas de memoria en IE
	elem = nulo;
},

// Separar un evento o un conjunto de eventos de un elemento
remove: function (elem, types, handler, selector, mappedTypes) {
	var j, handleObj, tmp,
		origCount, t, eventos,
		especiales, manipuladores, tipo,
		espacios de nombres, origType,
		elemData = jQuery.hasData(elem) && jQuery._data(elem);

	if (!elemData || !(eventos = elemData.events)) {
		regreso;
	}

	// Una vez por cada tipo. Espacio de nombres en tipos; el tipo puede omitirse
	tipos = (tipos || "").match(rnotwhite) || [""];
	t = tipos.longitud;
	while (t--) {
		tmp = rtypenamespace.exec(tipos[t]) || [];
		type = origType = tmp[1];
		espacios de nombres = (tmp[2] || "").split(".").sort();

		// Desvincula todos los eventos (en este espacio de nombres, si se proporciona) para el elemento
		if (!type) {
			para(escriba eventos) {
				jQuery.event.remove(elem, tipo + tipos[t], manejador, selector, verdadero);
			}
			Seguir;
		}

		especial = jQuery.event.special[tipo] || {};
		type = (selector ? special.delegateType : special.bindType) || tipo;
		manejadores = eventos[tipo] || [];
		tmp = tmp[2] && new RegExp("(^ | \\.)" + namespaces.join("\\. (?:. * \\. |)") + "(\\. | $)");

		// Eliminar eventos coincidentes
		origCount = j = handlers.length;
		while (j--) {
			handleObj = manipuladores[j];

			if ((mappedTypes || origType === handleObj.origType) &&
				(!handler || handler.guid === handleObj.guid) &&
				(!tmp || tmp.test(handleObj.namespace)) &&
				(!selector || selector === handleObj.selector || selector === "**" && handleObj.selector)) {
				handlers.splice(j, 1);

				if (handleObj.selector) {
					handlers.delegateCount--;
				}
				if (special.remove) {
					special.remove.call(elem, handleObj);
				}
			}
		}

		// Eliminamos el controlador de eventos genérico si eliminamos algo y no existen más controladores
		// (evita la posibilidad de una recursividad sin fin durante la eliminación de controladores de eventos especiales)
		if (origCount && !handlers.length) {
			if (!special.teardown || special.teardown.call(elem, namespaces, elemData.handle) === false) {
				jQuery.removeEvent(elem, tipo, elemData.handle);
			}

			eliminar eventos[tipo];
		}
	}

	// Elimina el expando si ya no se usa
	if (jQuery.isEmptyObject(eventos)) {
		eliminar elemData.handle;

		// removeData también comprueba si está vacío y borra el expando si está vacío
		// así que úsalo en lugar de eliminarlo
		jQuery._removeData(elem, "eventos");
	}
},

disparador: función(evento, datos, elem, onlyHandlers) {
	var handle, ontype, cur,
		bubbleType, especial, tmp, i,
		eventPath = [elem || documento],
		type = hasOwn.call(evento, "tipo") ? event.type : evento,
		espacios de nombres = hasOwn.call(evento, "espacio de nombres") ? event.namespace.split(".") : [];

	cur = tmp = elem = elem || documento;

	// No hagas eventos en nodos de texto y comentarios
	if (elem.nodeType === 3 || elem.nodeType === 8) {
		regreso;
	}

	// enfoque / desenfoque se transforma en focusin / out; asegúrese de que no los estamos despidiendo ahora mismo
	if (rfocusMorph.test(type + jQuery.event.triggered)) {
		regreso;
	}

	if (type.indexOf(".") > = 0) {
		// Desencadenador con espacio de nombres; crear una expresión regular para que coincida con el tipo de evento en handle ()
		espacios de nombres = type.split(".");
		type = namespaces.shift();
		namespaces.sort();
	}
	ontype = type.indexOf(":") < 0 && "on" + type;

	// La persona que llama puede pasar un objeto jQuery.Event, Object o simplemente una cadena de tipo de evento
	event = evento[jQuery.expando] ?
		evento :
		new jQuery.Event(tipo, tipo de evento === "objeto" && evento);

	// Activar máscara de bits: & 1 para controladores nativos; & 2 para jQuery (siempre cierto)
	event.isTrigger = onlyHandlers ? 2 : 3;
	event.namespace = namespaces.join(".");
	event.namespace_re = event.namespace ?
		new RegExp("(^ | \\.)" + namespaces.join("\\. (?:. * \\. |)") + "(\\. | $)") :
		nulo;

	// Limpiar el evento en caso de que se reutilice
	event.result = undefined;
	if (!event.target) {
		event.target = elem;
	}

	// Clone cualquier dato entrante y anteponga el evento, creando la lista de argumentos del controlador
	datos = datos == nulo ?
		[evento] :
		jQuery.makeArray(datos, [evento]);

	// Permitir que los eventos especiales se dibujen fuera de las líneas
	especial = jQuery.event.special[tipo] || {};
	if (!onlyHandlers && special.trigger && special.trigger.apply(elem, data) === false) {
		regreso;
	}

	// Determine la ruta de propagación de eventos por adelantado, según la especificación de eventos W3C (# 9951)
	// Burbujear hasta el documento, luego a la ventana; Esté atento a una var de ownerDocument global (# 9724)
	if (!onlyHandlers && !special.noBubble && !jQuery.isWindow(elem)) {

		bubbleType = special.delegateType || tipo;
		if (!rfocusMorph.test(bubbleType + type)) {
			cur = cur.parentNode;
		}
		para(; cur; cur = cur.parentNode) {
			eventPath.push(cur);
			tmp = cur;
		}

		// Solo agregue la ventana si llegamos al documento (por ejemplo, no obj simple o DOM separado)
		if (tmp === (elem.ownerDocument || documento)) {
			eventPath.push(tmp.defaultView || tmp.parentWindow || ventana);
		}
	}

	// Controladores de incendios en la ruta del evento
	i = 0;
	while ((cur = eventPath[i++]) && !event.isPropagationStopped()) {

		event.type = i > 1 ?
			bubbleType :
			special.bindType || tipo;

		// controlador jQuery
		handle = (jQuery._data(cur, "eventos") || {})[event.type] && jQuery._data(cur, "handle");
		si(manejar) {
			handle.apply(cur, datos);
		}

		// Controlador nativo
		handle = ontype && cur[ontype];
		if (manejar && manejar.apply && jQuery.acceptData(cur)) {
			event.result = handle.apply(cur, data);
			if (event.result === false) {
				event.preventDefault();
			}
		}
	}
	event.type = tipo;

	// Si nadie impidió la acción predeterminada, hágalo ahora
	if (!onlyHandlers && !event.isDefaultPrevented()) {

		if ((!special._default || special._default.apply(eventPath.pop(), data) === false) &&
			jQuery.acceptData(elem)) {

			// Llame a un método DOM nativo en el destino con el mismo nombre que el evento.
			// No se puede usar una marca .isFunction () aquí porque IE6 / 7 falla esa prueba.
			// No realice acciones predeterminadas en la ventana, ahí es donde están las variables globales (# 6170)
			if (ontype && elem[type] && !jQuery.isWindow(elem)) {

				// No vuelva a activar un evento onFOO cuando llamamos a su método FOO ()
				tmp = elem[ontype];

				si(tmp) {
					elem[ontype] = nulo;
				}

				// Evita que se vuelva a activar el mismo evento, ya que ya lo hicimos burbujear arriba
				jQuery.event.triggered = tipo;
				intentar {
					elem[tipo]();
				} captura(e) {
					// IE <9 muere al enfocar / desenfocar al elemento oculto (# 1486, # 12518)
					// solo reproducible en winXP IE8 native, no IE9 en modo IE8
				}
				jQuery.event.triggered = undefined;

				si(tmp) {
					elem[ontype] = tmp;
				}
			}
		}
	}

	return event.result;
},

despacho: función(evento) {

	// Crea un jQuery.Event escribible desde el objeto de evento nativo
	evento = jQuery.event.fix(evento);

	var i, ret, handleObj, emparejado, j,
		handlerQueue = [],
		args = slice.call(argumentos),
		manejadores = (jQuery._data(esto, "eventos") || {})[event.type] || [],
		especial = jQuery.event.special[event.type] || {};

	// Utilice jQuery.Event corregido en lugar del evento nativo (solo lectura)
	args[0] = evento;
	event.delegateTarget = esto;

	// Llame al gancho preDispatch para el tipo mapeado y déjelo rescatar si lo desea
	if (special.preDispatch && special.preDispatch.call(this, event) === false) {
		regreso;
	}

	// Determinar los controladores
	handlerQueue = jQuery.event.handlers.call(esto, evento, controladores);

	// Ejecuta los delegados primero; es posible que quieran detener la propagación debajo de nosotros
	i = 0;
	while ((coincidente = handlerQueue[i++]) && !event.isPropagationStopped()) {
		event.currentTarget = matched.elem;

		j = 0;
		while ((handleObj = matched.handlers[j++]) && !event.isImmediatePropagationStopped()) {

			// El evento desencadenado debe 1) no tener espacio de nombres o
			// 2) tienen espacio (s) de nombres en un subconjunto o iguales a los del evento vinculado (ambos pueden no tener espacio de nombres).
			if (!event.namespace_re || event.namespace_re.test(handleObj.namespace)) {

				event.handleObj = handleObj;
				event.data = handleObj.data;

				ret = ((jQuery.event.special[handleObj.origType] || {}).handle || handleObj.handler)
					.apply(coincidente.elem, args);

				if (ret! == indefinido) {
					if ((event.result = ret) === false) {
						event.preventDefault();
						event.stopPropagation();
					}
				}
			}
		}
	}

	// Llame al gancho postDispatch para el tipo mapeado
	if (special.postDispatch) {
		special.postDispatch.call(esto, evento);
	}

	return event.result;
},

controladores: función(evento, controladores) {
	var sel, handleObj, coincidencias, i,
		handlerQueue = [],
		delegateCount = handlers.delegateCount,
		cur = event.target;

	// Encuentra controladores de delegados
	// Árboles de instancia <use> de SVG de agujero negro (# 13180)
	// Evite la propagación sin hacer clic con el botón izquierdo en Firefox (# 3861)
	if (delegateCount && cur.nodeType && (!event.button || event.type! == "click")) {

		/ * jshint eqeqeq: falso * /
		para(; cur! = this; cur = cur.parentNode || esto) {
			/ * jshint eqeqeq: verdadero * /

			// No marque los no elementos (# 13208)
			// No procese los clics en elementos deshabilitados (# 6911, # 8165, # 11382, # 11764)
			if (cur.nodeType === 1 && (cur.disabled! == true || event.type! == "click")) {
				coincidencias = [];
				para(i = 0; i < delegateCount; i++) {
					handleObj = manipuladores[i];

					// No entre en conflicto con las propiedades de Object.prototype (# 13203)
					sel = handleObj.selector + "";

					if (coincide con[sel] === undefined) {
						coincide con[sel] = handleObj.needsContext ?
							jQuery(sel, esto).index(cur) > = 0:
						jQuery.find(sel, this, null, [cur]).length;
					}
					si(coincide con[sel]) {
						fósforos.push(handleObj);
					}
				}
				if (coincide con longitud) {
					handlerQueue.push({ elem: cur, handlers: matches });
				}
			}
		}
	}

	// Agrega los manejadores restantes (directamente enlazados)
	if (delegateCount < handlers.length) {
		handlerQueue.push({ elem: this, handlers: handlers.slice(delegateCount) });
	}

	return handlerQueue;
},

arreglar: función(evento) {
	if (evento[jQuery.expando]) {
		evento de retorno;
	}

	// Crea una copia grabable del objeto de evento y normaliza algunas propiedades
	var i, prop, copiar,
		type = event.type,
		originalEvent = evento,
		fixHook = this.fixHooks[tipo];

	if (!fixHook) {
		this.fixHooks[tipo] = fixHook =
			rmouseEvent.test(tipo) ? this.mouseHooks :
				rkeyEvent.test(tipo) ? this.keyHooks :
					{};
	}
	copy = fixHook.props ? this.props.concat(fixHook.props) : this.props;

	evento = nuevo jQuery.Event(originalEvent);

	i = copy.length;
	mientras yo-- ) {
		prop = copiar[i];
		evento[prop] = originalEvent[prop];
	}

	// Soporte: IE <9
	// Arreglar la propiedad de destino (# 1925)
	if (!event.target) {
		event.target = originalEvent.srcElement || documento;
	}

	// Soporte: Chrome 23+, Safari?
	// El destino no debe ser un nodo de texto (# 504, # 13143)
	if (event.target.nodeType === 3) {
		event.target = event.target.parentNode;
	}

	// Soporte: IE <9
	// Para eventos de mouse / key, metaKey == false si no está definido (# 3368, # 11328)
	event.metaKey = !!event.metaKey;

	volver fixHook.filter ? fixHook.filter(evento, evento original) : evento;
},

// Incluye algunos accesorios de eventos compartidos por KeyEvent y MouseEvent
props: "altKey burbujas cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp vista que".split(""),

	fixHooks: { },

keyHooks: {
	props: "char charCode key keyCode".split(""),
		filtro: función(evento, original) {

		// Agregar cuál para eventos clave
		if (event.which == null) {
			event.which = original.charCode! = null ? original.charCode : original.keyCode;
		}

		evento de retorno;
	}
},

mouseHooks: {
	props: "botón botones clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(""),
		filtro: función(evento, original) {
		var body, eventDoc, doc,
			button = original.button,
			fromElement = original.fromElement;

		// Calcular pageX / Y si falta y clientX / Y disponible
		if (event.pageX == null && original.clientX! = null) {
			eventDoc = event.target.ownerDocument || documento;
			doc = eventDoc.documentElement;
			bo dy = eventDoc.body;

			event.pageX = original.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0);
			event.pageY = original.clientY + (doc && doc.scrollTop || body && body.scrollTop || 0) - (doc && doc.clientTop || body && body.clientTop || 0);
		}

		// Agregar relatedTarget, si es necesario
		if (!event.relatedTarget && fromElement) {
			event.relatedTarget = fromElement === event.target ? original.toElement : fromElement;
		}

		// Agregar cuál para hacer clic: 1 === izquierda; 2 === medio; 3 === derecha
		// Nota: el botón no está normalizado, así que no lo use
		if (!event.which && button! == undefined) {
			event.which = (botón & 1 ? 1 : (botón & 2 ? 3 : (botón & 4 ? 2 : 0)));
		}

		evento de retorno;
	}
},

especial: {
	carga: {
		// Evita que los eventos image.load activados se propaguen a window.load
		noBubble: verdadero
	},
	enfocar: {
		// Dispara el evento nativo si es posible para que la secuencia de desenfoque / enfoque sea correcta
		disparador: función() {
			if (this! == safeActiveElement() && this.focus) {
				intentar {
					this.focus();
					falso retorno;
				} captura(e) {
					// Soporte: IE <9
					// Si tenemos un error al enfocar el elemento oculto (# 1486, # 12518),
					// deja que .trigger () ejecute los controladores
				}
			}
		},
		delegateType: "focusin"
	},
	desenfoque: {
		disparador: función() {
			if (this === safeActiveElement() && this.blur) {
				this.blur();
				falso retorno;
			}
		},
		delegateType: "focusout"
	},
	haga clic en: {
		// Para la casilla de verificación, dispara el evento nativo para que el estado marcado sea correcto
		disparador: función() {
			if (jQuery.nodeName(this, "input") && this.type === "checkbox" && this.click) {
				this.click();
				falso retorno;
			}
		},

		// Para lograr coherencia entre navegadores, no active .click () nativo en los enlaces
		_default: function (evento) {
			return jQuery.nodeName(event.target, "a");
		}
	},

	antes de descargar: {
		postDispatch: function (evento) {

			// Soporte: Firefox 20+
			// Firefox no alerta si el campo returnValue no está configurado.
			if (event.result! == undefined && event.originalEvent) {
				event.originalEvent.returnValue = event.result;
			}
		}
	}
},

simular: función(tipo, elemento, evento, burbuja) {
	// Aprovecha un evento de donantes para simular uno diferente.
	// Fake originalEvent para evitar la stopPropagation del donante, pero si el
	// El evento simulado evita el incumplimiento, luego hacemos lo mismo con el donante.
	var e = jQuery.extend(
		nuevo jQuery.Event(),
		evento,
		{
			tipo: tipo,
			isSimulated: cierto,
			originalEvent: {}
		}
	);
	if (burbuja) {
		jQuery.event.trigger(e, nulo, elem);
	} demás {
		jQuery.event.dispatch.call(elem, e);
	}
	if (e.isDefaultPrevented()) {
		event.preventDefault();
	}
}
};

jQuery.removeEvent = document.removeEventListener ?
	function (elem, type, handle) {
		if (elem.removeEventListener) {
			elem.removeEventListener(tipo, identificador, falso);
		}
	} :
	function (elem, type, handle) {
		var nombre = "en" + tipo;

		if (elem.detachEvent) {

			// # 8545, # 7054, evitando pérdidas de memoria para eventos personalizados en IE6-8
			// detachEvent necesitaba la propiedad del elemento, por nombre de ese evento, para exponerlo correctamente a GC
			if (typeof elem[name] === strundefined) {
				elem[nombre] = nulo;
			}

			elem.detachEvent(nombre, identificador);
		}
	};

jQuery.Event = function (src, props) {
	// Permitir la creación de instancias sin la palabra clave 'nueva'
	if (!(esta instancia de jQuery.Event)) {
		return new jQuery.Event(src, props);
	}

	// Objeto de evento
	if (src && src.type) {
		this.originalEvent = src;
		this.type = src.type;

		// Los eventos que propagan el documento pueden haber sido marcados como prevenidos
		// por un manejador más abajo del árbol; reflejar el valor correcto.
		this.isDefaultPrevented = src.defaultPrevented ||
			src.defaultPrevented === indefinido &&
			// Soporte: IE <9, Android <4.0
			src.returnValue === falso ?
			returnTrue :
			falso retorno;

		// Tipo de evento
	} demás {
		this.type = src;
	}

	// Coloca propiedades proporcionadas explícitamente en el objeto de evento
	if (props) {
		jQuery.extend(esto, apoyos);
	}

	// Crea una marca de tiempo si el evento entrante no tiene una
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Marcarlo como fijo
	esto[jQuery.expando] = verdadero;
};

// jQuery.Event se basa en eventos DOM3 según lo especificado por ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function () {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;
		si(!e) {
			regreso;
		}

		// Si preventDefault existe, ejecútelo en el evento original
		if (e.preventDefault) {
			e.preventDefault();

			// Soporte: IE
			// De lo contrario, establezca la propiedad returnValue del evento original en falso
		} demás {
			e.returnValue = falso;
		}
	},
	stopPropagation: function () {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;
		si(!e) {
			regreso;
		}
		// Si existe stopPropagation, ejecútelo en el evento original
		if (e.stopPropagation) {
			e.stopPropagation();
		}

		// Soporte: IE
		// Establece la propiedad cancelBubble del evento original en verdadero
		e.cancelBubble = true;
	},
	stopImmediatePropagation: function () {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if (e && e.stopImmediatePropagation) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Cree eventos mouseenter / leave usando mouseover / out y verificaciones de tiempo de evento
jQuery.each({
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function (orig, fix) {
	jQuery.event.special[orig] = {
		delegateType: arreglar,
		bindType: arreglar,

		manejar: función(evento) {
		var ret,
			objetivo = esto,
			related = event.relatedTarget,
			handleObj = event.handleObj;

		// Para mousenter / leave, llame al controlador si el relacionado está fuera del objetivo.
		// NB: No relatedTarget si el mouse a la izquierda / ingresó a la ventana del navegador
		if (!related || (related! == target && !jQuery.contains(target, related))) {
			event.type = handleObj.origType;
			ret = handleObj.handler.apply(esto, argumentos);
			event.type = fix;
		}
		return ret;
	}
};
});

// IE enviar delegación
if (!support.submitBubbles) {

	jQuery.event.special.submit = {
		configuración: función() {
		// Solo es necesario para eventos de envío de formularios delegados
		if (jQuery.nodeName(esto, "formulario")) {
			falso retorno;
		}

		// Lazy-agrega un controlador de envío cuando un formulario descendiente puede potencialmente ser enviado
		jQuery.event.add(esto, "click._submit keypress._submit", function (e) {
			// La verificación del nombre del nodo evita un bloqueo relacionado con VML en IE (# 9807)
			var elem = e.target,
				formulario = jQuery.nodeName(elem, "entrada") || jQuery.nodeName(elem, "botón") ? elem.form : indefinido;
			if (formulario && !jQuery._data(formulario, "submitBubbles")) {
				jQuery.event.add(formulario, "enviar._submit", función(evento) {
					event._submit_bubble = true;
				});
				jQuery._data(formulario, "submitBubbles", verdadero);
			}
		});
		// devuelve undefined ya que no necesitamos un detector de eventos
	},

	postDispatch: function (evento) {
		// Si el formulario fue enviado por el usuario, burbujee el evento en el árbol
		if (event._submit_bubble) {
			eliminar event._submit_bubble;
			if (this.parentNode && !event.isTrigger) {
				jQuery.event.simulate("enviar", this.parentNode, event, true);
			}
		}
	},

	desmontaje: función() {
		// Solo es necesario para eventos de envío de formularios delegados
		if (jQuery.nodeName(esto, "formulario")) {
			falso retorno;
		}

		// Eliminar controladores delegados; cleanData finalmente cosecha los controladores de envío adjuntos arriba
		jQuery.event.remove(esto, "._submit");
	}
};
}

// IE cambia la delegación y la casilla de verificación / corrección de radio
if (!support.changeBubbles) {

	jQuery.event.special.change = {

		configuración: función() {

		if (rformElems.test(this.nodeName)) {
			// IE no dispara el cambio en un cheque / radio hasta que se difumina; activarlo al hacer clic
			// después de un cambio de propiedad. Coma el cambio de desenfoque en el mango de cambio especial.
			// Esto todavía se dispara en el cambio por segunda vez para chequear / radio después de desenfoque.
			if (this.type === "casilla de verificación" || this.type === "radio") {
				jQuery.event.add(esto, "propertychange._change", función(evento) {
					if(event.originalEvent.propertyName === "comprobado") {
					this._just_changed = true;
				}
			});
			jQuery.event.add(esto, "click._change", función(evento) {
				if(this._just_changed && !event.isTrigger) {
				this._just_changed = false;
			}
			// Permitir eventos de cambio simulados activados (# 11500)
			jQuery.event.simulate("cambio", esto, evento, verdadero);
		});
	}
	falso retorno;
}
// Evento delegado; lazy-agregar un controlador de cambios en las entradas descendientes
jQuery.event.add(this, "beforeactivate._change", function (e) {
	var elem = e.target;

	if (rformElems.test(elem.nodeName) && !jQuery._data(elem, "changeBubbles")) {
		jQuery.event.add(elem, "cambio._cambio", función(evento) {
			if(this.parentNode && !event.isSimulated && !event.isTrigger) {
			jQuery.event.simulate("cambio", this.parentNode, event, true);
		}
	});
jQuery._data(elem, "changeBubbles", verdadero);
				}
			});
		},

manejar: función(evento) {
	var elem = event.target;

	// Trague los eventos de cambio nativos de la casilla de verificación / radio, ya los activamos arriba
	if (this! == elem || event.isSimulated || event.isTrigger || (elem.type! == "radio" && elem.type! == "checkbox")) {
		return event.handleObj.handler.apply(esto, argumentos);
	}
},

desmontaje: función() {
	jQuery.event.remove(esto, "._cambio");

	return !rformElems.test(this.nodeName);
}
	};
}

// Crea eventos de enfoque y desenfoque "burbujeantes"
if (!support.focusinBubbles) {
	jQuery.each({ focus: "focusin", blur: "focusout" }, function (orig, fix) {

		// Adjunte un solo controlador de captura en el documento mientras alguien quiere focusin / focusout
		var handler = function (evento) {
			jQuery.event.simulate(arreglar, event.target, jQuery.event.fix(evento), verdadero);
		};

		jQuery.event.special[corrección] = {
			configuración: función() {
			var doc = this.ownerDocument || esta,
				adjunta = jQuery._data(doc, arreglar);

			si(!adjunta) {
				doc.addEventListener(orig, handler, true);
			}
			jQuery._data(doc, arreglar, (adjunta || 0) + 1);
		},
		desmontaje: función() {
			var doc = this.ownerDocument || esta,
				attaches = jQuery._data(doc, fix) - 1;

			if (!attaches) {
				doc.removeEventListener(orig, handler, true);
				jQuery._removeData(doc, fix);
			} else {
				jQuery._data(doc, fix, attaches);
			}
		}
	};
});
}

jQuery.fn.extend({

	on: function (types, selector, data, fn, /*INTERNAL*/ one) {
		var type, origFn;

		// Types can be a map of types/handlers
		if (typeof types === "object") {
			// ( types-Object, selector, data )
			if (typeof selector !== "string") {
				// ( types-Object, data )
				data = data || selector;
				selector = undefined;
			}
			for (type in types) {
				this.on(type, selector, data, types[type], one);
			}
			return this;
		}

		if (data == null && fn == null) {
			// ( types, fn )
			fn = selector;
			data = selector = undefined;
		} else if (fn == null) {
			if (typeof selector === "string") {
				// ( types, selector, fn )
				fn = data;
				data = undefined;
			} else {
				// ( types, data, fn )
				fn = data;
				data = selector;
				selector = undefined;
			}
		}
		if (fn === false) {
			fn = returnFalse;
		} else if (!fn) {
			return this;
		}

		if (one === 1) {
			origFn = fn;
			fn = function (event) {
				// Can use an empty set, since event contains the info
				jQuery().off(event);
				return origFn.apply(this, arguments);
			};
			// Use same guid so caller can remove using origFn
			fn.guid = origFn.guid || (origFn.guid = jQuery.guid++);
		}
		return this.each(function () {
			jQuery.event.add(this, types, fn, data, selector);
		});
	},
	one: function (types, selector, data, fn) {
		return this.on(types, selector, data, fn, 1);
	},
	off: function (types, selector, fn) {
		var handleObj, type;
		if (types && types.preventDefault && types.handleObj) {
			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery(types.delegateTarget).off(
				handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if (typeof types === "object") {
			// ( types-object [, selector] )
			for (type in types) {
				this.off(type, selector, types[type]);
			}
			return this;
		}
		if (selector === false || typeof selector === "function") {
			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if (fn === false) {
			fn = returnFalse;
		}
		return this.each(function () {
			jQuery.event.remove(this, types, fn, selector);
		});
	},

	trigger: function (type, data) {
		return this.each(function () {
			jQuery.event.trigger(type, data, this);
		});
	},
	triggerHandler: function (type, data) {
		var elem = this[0];
		if (elem) {
			return jQuery.event.trigger(type, data, elem, true);
		}
	}
});


function createSafeFragment(document) {
	var list = nodeNames.split("|"),
		safeFrag = document.createDocumentFragment();

	if (safeFrag.createElement) {
		while (list.length) {
			safeFrag.createElement(
				list.pop()
			);
		}
	}
	return safeFrag;
}

var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|" +
	"header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
	rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g,
	rnoshimcache = new RegExp("<(?:" + nodeNames + ")[\\s/>]", "i"),
	rleadingWhitespace = /^\s+/,
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
	rtagName = /<([\w:]+)/,
	rtbody = /<tbody/i,
	rhtml = /<|&#?\w+;/,
	rnoInnerhtml = /<(?:script|style|link)/i,
	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptType = /^$|\/(?:java|ecma)script/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,

	// We have to close these tags to support XHTML (#13200)
	wrapMap = {
		option: [1, "<select multiple='multiple'>", "</select>"],
		legend: [1, "<fieldset>", "</fieldset>"],
		area: [1, "<map>", "</map>"],
		param: [1, "<object>", "</object>"],
		thead: [1, "<table>", "</table>"],
		tr: [2, "<table><tbody>", "</tbody></table>"],
		col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
		td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],

		// IE6-8 can't serialize link, script, style, or any html5 (NoScope) tags,
		// unless wrapped in a div with non-breaking characters in front of it.
		_default: support.htmlSerialize ? [0, "", ""] : [1, "X<div>", "</div>"]
	},
	safeFragment = createSafeFragment(document),
	fragmentDiv = safeFragment.appendChild(document.createElement("div"));

wrapMap.optgroup = wrapMap.option;
wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;

function getAll(context, tag) {
	var elems, elem,
		i = 0,
		found = typeof context.getElementsByTagName !== strundefined ? context.getElementsByTagName(tag || "*") :
			typeof context.querySelectorAll !== strundefined ? context.querySelectorAll(tag || "*") :
				undefined;

	if (!found) {
		for (found = [], elems = context.childNodes || context; (elem = elems[i]) != null; i++) {
			if (!tag || jQuery.nodeName(elem, tag)) {
				found.push(elem);
			} else {
				jQuery.merge(found, getAll(elem, tag));
			}
		}
	}

	return tag === undefined || tag && jQuery.nodeName(context, tag) ?
		jQuery.merge([context], found) :
		found;
}

// Used in buildFragment, fixes the defaultChecked property
function fixDefaultChecked(elem) {
	if (rcheckableType.test(elem.type)) {
		elem.defaultChecked = elem.checked;
	}
}

// Support: IE<8
// Manipulating tables requires a tbody
function manipulationTarget(elem, content) {
	return jQuery.nodeName(elem, "table") &&
		jQuery.nodeName(content.nodeType !== 11 ? content : content.firstChild, "tr") ?

		elem.getElementsByTagName("tbody")[0] ||
		elem.appendChild(elem.ownerDocument.createElement("tbody")) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript(elem) {
	elem.type = (jQuery.find.attr(elem, "type") !== null) + "/" + elem.type;
	return elem;
}
function restoreScript(elem) {
	var match = rscriptTypeMasked.exec(elem.type);
	if (match) {
		elem.type = match[1];
	} else {
		elem.removeAttribute("type");
	}
	return elem;
}

// Mark scripts as having already been evaluated
function setGlobalEval(elems, refElements) {
	var elem,
		i = 0;
	for (; (elem = elems[i]) != null; i++) {
		jQuery._data(elem, "globalEval", !refElements || jQuery._data(refElements[i], "globalEval"));
	}
}

function cloneCopyEvent(src, dest) {

	if (dest.nodeType !== 1 || !jQuery.hasData(src)) {
		return;
	}

	var type, i, l,
		oldData = jQuery._data(src),
		curData = jQuery._data(dest, oldData),
		events = oldData.events;

	if (events) {
		delete curData.handle;
		curData.events = {};

		for (type in events) {
			for (i = 0, l = events[type].length; i < l; i++) {
				jQuery.event.add(dest, type, events[type][i]);
			}
		}
	}

	// make the cloned public data object a copy from the original
	if (curData.data) {
		curData.data = jQuery.extend({}, curData.data);
	}
}

function fixCloneNodeIssues(src, dest) {
	var nodeName, e, data;

	// We do not need to do anything for non-Elements
	if (dest.nodeType !== 1) {
		return;
	}

	nodeName = dest.nodeName.toLowerCase();

	// IE6-8 copies events bound via attachEvent when using cloneNode.
	if (!support.noCloneEvent && dest[jQuery.expando]) {
		data = jQuery._data(dest);

		for (e in data.events) {
			jQuery.removeEvent(dest, e, data.handle);
		}

		// Event data gets referenced instead of copied if the expando gets copied too
		dest.removeAttribute(jQuery.expando);
	}

	// IE blanks contents when cloning scripts, and tries to evaluate newly-set text
	if (nodeName === "script" && dest.text !== src.text) {
		disableScript(dest).text = src.text;
		restoreScript(dest);

		// IE6-10 improperly clones children of object elements using classid.
		// IE10 throws NoModificationAllowedError if parent is null, #12132.
	} else if (nodeName === "object") {
		if (dest.parentNode) {
			dest.outerHTML = src.outerHTML;
		}

		// This path appears unavoidable for IE9. When cloning an object
		// element in IE9, the outerHTML strategy above is not sufficient.
		// If the src has innerHTML and the destination does not,
		// copy the src.innerHTML into the dest.innerHTML. #10324
		if (support.html5Clone && (src.innerHTML && !jQuery.trim(dest.innerHTML))) {
			dest.innerHTML = src.innerHTML;
		}

	} else if (nodeName === "input" && rcheckableType.test(src.type)) {
		// IE6-8 fails to persist the checked state of a cloned checkbox
		// or radio button. Worse, IE6-7 fail to give the cloned element
		// a checked appearance if the defaultChecked value isn't also set

		dest.defaultChecked = dest.checked = src.checked;

		// IE6-7 get confused and end up setting the value of a cloned
		// checkbox/radio button to an empty string instead of "on"
		if (dest.value !== src.value) {
			dest.value = src.value;
		}

		// IE6-8 fails to return the selected option to the default selected
		// state when cloning options
	} else if (nodeName === "option") {
		dest.defaultSelected = dest.selected = src.defaultSelected;

		// IE6-8 fails to set the defaultValue to the correct value when
		// cloning other types of input fields
	} else if (nodeName === "input" || nodeName === "textarea") {
		dest.defaultValue = src.defaultValue;
	}
}

jQuery.extend({
	clone: function (elem, dataAndEvents, deepDataAndEvents) {
		var destElements, node, clone, i, srcElements,
			inPage = jQuery.contains(elem.ownerDocument, elem);

		if (support.html5Clone || jQuery.isXMLDoc(elem) || !rnoshimcache.test("<" + elem.nodeName + ">")) {
			clone = elem.cloneNode(true);

			// IE<=8 does not properly clone detached, unknown element nodes
		} else {
			fragmentDiv.innerHTML = elem.outerHTML;
			fragmentDiv.removeChild(clone = fragmentDiv.firstChild);
		}

		if ((!support.noCloneEvent || !support.noCloneChecked) &&
			(elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem)) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll(clone);
			srcElements = getAll(elem);

			// Fix all IE cloning issues
			for (i = 0; (node = srcElements[i]) != null; ++i) {
				// Ensure that the destination node is not null; Fixes #9587
				if (destElements[i]) {
					fixCloneNodeIssues(node, destElements[i]);
				}
			}
		}

		// Copy the events from the original to the clone
		if (dataAndEvents) {
			if (deepDataAndEvents) {
				srcElements = srcElements || getAll(elem);
				destElements = destElements || getAll(clone);

				for (i = 0; (node = srcElements[i]) != null; i++) {
					cloneCopyEvent(node, destElements[i]);
				}
			} else {
				cloneCopyEvent(elem, clone);
			}
		}

		// Preserve script evaluation history
		destElements = getAll(clone, "script");
		if (destElements.length > 0) {
			setGlobalEval(destElements, !inPage && getAll(elem, "script"));
		}

		destElements = srcElements = node = null;

		// Return the cloned set
		return clone;
	},

	buildFragment: function (elems, context, scripts, selection) {
		var j, elem, contains,
			tmp, tag, tbody, wrap,
			l = elems.length,

			// Ensure a safe fragment
			safe = createSafeFragment(context),

			nodes = [],
			i = 0;

		for (; i < l; i++) {
			elem = elems[i];

			if (elem || elem === 0) {

				// Add nodes directly
				if (jQuery.type(elem) === "object") {
					jQuery.merge(nodes, elem.nodeType ? [elem] : elem);

					// Convert non-html into a text node
				} else if (!rhtml.test(elem)) {
					nodes.push(context.createTextNode(elem));

					// Convert html into DOM nodes
				} else {
					tmp = tmp || safe.appendChild(context.createElement("div"));

					// Deserialize a standard representation
					tag = (rtagName.exec(elem) || ["", ""])[1].toLowerCase();
					wrap = wrapMap[tag] || wrapMap._default;

					tmp.innerHTML = wrap[1] + elem.replace(rxhtmlTag, "<$1></$2>") + wrap[2];

					// Descend through wrappers to the right content
					j = wrap[0];
					while (j--) {
						tmp = tmp.lastChild;
					}

					// Manually add leading whitespace removed by IE
					if (!support.leadingWhitespace && rleadingWhitespace.test(elem)) {
						nodes.push(context.createTextNode(rleadingWhitespace.exec(elem)[0]));
					}

					// Remove IE's autoinserted <tbody> from table fragments
					if (!support.tbody) {

						// String was a <table>, *may* have spurious <tbody>
						elem = tag === "table" && !rtbody.test(elem) ?
							tmp.firstChild :

							// String was a bare <thead> or <tfoot>
							wrap[1] === "<table>" && !rtbody.test(elem) ?
								tmp :
								0;

						j = elem && elem.childNodes.length;
						while (j--) {
							if (jQuery.nodeName((tbody = elem.childNodes[j]), "tbody") && !tbody.childNodes.length) {
								elem.removeChild(tbody);
							}
						}
					}

					jQuery.merge(nodes, tmp.childNodes);

					// Fix #12392 for WebKit and IE > 9
					tmp.textContent = "";

					// Fix #12392 for oldIE
					while (tmp.firstChild) {
						tmp.removeChild(tmp.firstChild);
					}

					// Remember the top-level container for proper cleanup
					tmp = safe.lastChild;
				}
			}
		}

		// Fix #11356: Clear elements from fragment
		if (tmp) {
			safe.removeChild(tmp);
		}

		// Reset defaultChecked for any radios and checkboxes
		// about to be appended to the DOM in IE 6/7 (#8060)
		if (!support.appendChecked) {
			jQuery.grep(getAll(nodes, "input"), fixDefaultChecked);
		}

		i = 0;
		while ((elem = nodes[i++])) {

			// #4087 - If origin and destination elements are the same, and this is
			// that element, do not do anything
			if (selection && jQuery.inArray(elem, selection) !== -1) {
				continue;
			}

			contains = jQuery.contains(elem.ownerDocument, elem);

			// Append to fragment
			tmp = getAll(safe.appendChild(elem), "script");

			// Preserve script evaluation history
			if (contains) {
				setGlobalEval(tmp);
			}

			// Capture executables
			if (scripts) {
				j = 0;
				while ((elem = tmp[j++])) {
					if (rscriptType.test(elem.type || "")) {
						scripts.push(elem);
					}
				}
			}
		}

		tmp = null;

		return safe;
	},

	cleanData: function (elems, /* internal */ acceptData) {
		var elem, type, id, data,
			i = 0,
			internalKey = jQuery.expando,
			cache = jQuery.cache,
			deleteExpando = support.deleteExpando,
			special = jQuery.event.special;

		for (; (elem = elems[i]) != null; i++) {
			if (acceptData || jQuery.acceptData(elem)) {

				id = elem[internalKey];
				data = id && cache[id];

				if (data) {
					if (data.events) {
						for (type in data.events) {
							if (special[type]) {
								jQuery.event.remove(elem, type);

								// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent(elem, type, data.handle);
							}
						}
					}

					// Remove cache only if it was not already removed by jQuery.event.remove
					if (cache[id]) {

						delete cache[id];

						// IE does not allow us to delete expando properties from nodes,
						// nor does it have a removeAttribute function on Document nodes;
						// we must handle all of these cases
						if (deleteExpando) {
							delete elem[internalKey];

						} else if (typeof elem.removeAttribute !== strundefined) {
							elem.removeAttribute(internalKey);

						} else {
							elem[internalKey] = null;
						}

						deletedIds.push(id);
					}
				}
			}
		}
	}
});

jQuery.fn.extend({
	text: function (value) {
		return access(this, function (value) {
			return value === undefined ?
				jQuery.text(this) :
				this.empty().append((this[0] && this[0].ownerDocument || document).createTextNode(value));
		}, null, value, arguments.length);
	},

	append: function () {
		return this.domManip(arguments, function (elem) {
			if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
				var target = manipulationTarget(this, elem);
				target.appendChild(elem);
			}
		});
	},

	prepend: function () {
		return this.domManip(arguments, function (elem) {
			if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
				var target = manipulationTarget(this, elem);
				target.insertBefore(elem, target.firstChild);
			}
		});
	},

	before: function () {
		return this.domManip(arguments, function (elem) {
			if (this.parentNode) {
				this.parentNode.insertBefore(elem, this);
			}
		});
	},

	after: function () {
		return this.domManip(arguments, function (elem) {
			if (this.parentNode) {
				this.parentNode.insertBefore(elem, this.nextSibling);
			}
		});
	},

	remove: function (selector, keepData /* Internal Use Only */) {
		var elem,
			elems = selector ? jQuery.filter(selector, this) : this,
			i = 0;

		for (; (elem = elems[i]) != null; i++) {

			if (!keepData && elem.nodeType === 1) {
				jQuery.cleanData(getAll(elem));
			}

			if (elem.parentNode) {
				if (keepData && jQuery.contains(elem.ownerDocument, elem)) {
					setGlobalEval(getAll(elem, "script"));
				}
				elem.parentNode.removeChild(elem);
			}
		}

		return this;
	},

	empty: function () {
		var elem,
			i = 0;

		for (; (elem = this[i]) != null; i++) {
			// Remove element nodes and prevent memory leaks
			if (elem.nodeType === 1) {
				jQuery.cleanData(getAll(elem, false));
			}

			// Remove any remaining nodes
			while (elem.firstChild) {
				elem.removeChild(elem.firstChild);
			}

			// If this is a select, ensure that it displays empty (#12336)
			// Support: IE<9
			if (elem.options && jQuery.nodeName(elem, "select")) {
				elem.options.length = 0;
			}
		}

		return this;
	},

	clone: function (dataAndEvents, deepDataAndEvents) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map(function () {
			return jQuery.clone(this, dataAndEvents, deepDataAndEvents);
		});
	},

	html: function (value) {
		return access(this, function (value) {
			var elem = this[0] || {},
				i = 0,
				l = this.length;

			if (value === undefined) {
				return elem.nodeType === 1 ?
					elem.innerHTML.replace(rinlinejQuery, "") :
					undefined;
			}

			// See if we can take a shortcut and just use innerHTML
			if (typeof value === "string" && !rnoInnerhtml.test(value) &&
				(support.htmlSerialize || !rnoshimcache.test(value)) &&
				(support.leadingWhitespace || !rleadingWhitespace.test(value)) &&
				!wrapMap[(rtagName.exec(value) || ["", ""])[1].toLowerCase()]) {

				value = value.replace(rxhtmlTag, "<$1></$2>");

				try {
					for (; i < l; i++) {
						// Remove element nodes and prevent memory leaks
						elem = this[i] || {};
						if (elem.nodeType === 1) {
							jQuery.cleanData(getAll(elem, false));
							elem.innerHTML = value;
						}
					}

					elem = 0;

					// If using innerHTML throws an exception, use the fallback method
				} catch (e) { }
			}

			if (elem) {
				this.empty().append(value);
			}
		}, null, value, arguments.length);
	},

	replaceWith: function () {
		var arg = arguments[0];

		// Make the changes, replacing each context element with the new content
		this.domManip(arguments, function (elem) {
			arg = this.parentNode;

			jQuery.cleanData(getAll(this));

			if (arg) {
				arg.replaceChild(elem, this);
			}
		});

		// Force removal if there was no new content (e.g., from empty arguments)
		return arg && (arg.length || arg.nodeType) ? this : this.remove();
	},

	detach: function (selector) {
		return this.remove(selector, true);
	},

	domManip: function (args, callback) {

		// Flatten any nested arrays
		args = concat.apply([], args);

		var first, node, hasScripts,
			scripts, doc, fragment,
			i = 0,
			l = this.length,
			set = this,
			iNoClone = l - 1,
			value = args[0],
			isFunction = jQuery.isFunction(value);

		// We can't cloneNode fragments that contain checked, in WebKit
		if (isFunction ||
			(l > 1 && typeof value === "string" &&
				!support.checkClone && rchecked.test(value))) {
			return this.each(function (index) {
				var self = set.eq(index);
				if (isFunction) {
					args[0] = value.call(this, index, self.html());
				}
				self.domManip(args, callback);
			});
		}

		if (l) {
			fragment = jQuery.buildFragment(args, this[0].ownerDocument, false, this);
			first = fragment.firstChild;

			if (fragment.childNodes.length === 1) {
				fragment = first;
			}

			if (first) {
				scripts = jQuery.map(getAll(fragment, "script"), disableScript);
				hasScripts = scripts.length;

				// Use the original fragment for the last item instead of the first because it can end up
				// being emptied incorrectly in certain situations (#8070).
				for (; i < l; i++) {
					node = fragment;

					if (i !== iNoClone) {
						node = jQuery.clone(node, true, true);

						// Keep references to cloned scripts for later restoration
						if (hasScripts) {
							jQuery.merge(scripts, getAll(node, "script"));
						}
					}

					callback.call(this[i], node, i);
				}

				if (hasScripts) {
					doc = scripts[scripts.length - 1].ownerDocument;

					// Reenable scripts
					jQuery.map(scripts, restoreScript);

					// Evaluate executable scripts on first document insertion
					for (i = 0; i < hasScripts; i++) {
						node = scripts[i];
						if (rscriptType.test(node.type || "") &&
							!jQuery._data(node, "globalEval") && jQuery.contains(doc, node)) {

							if (node.src) {
								// Optional AJAX dependency, but won't run scripts if not present
								if (jQuery._evalUrl) {
									jQuery._evalUrl(node.src);
								}
							} else {
								jQuery.globalEval((node.text || node.textContent || node.innerHTML || "").replace(rcleanScript, ""));
							}
						}
					}
				}

				// Fix #11809: Avoid leaking memory
				fragment = first = null;
			}
		}

		return this;
	}
});

jQuery.each({
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function (name, original) {
	jQuery.fn[name] = function (selector) {
		var elems,
			i = 0,
			ret = [],
			insert = jQuery(selector),
			last = insert.length - 1;

		for (; i <= last; i++) {
			elems = i === last ? this : this.clone(true);
			jQuery(insert[i])[original](elems);

			// Modern browsers can apply jQuery collections as arrays, but oldIE needs a .get()
			push.apply(ret, elems.get());
		}

		return this.pushStack(ret);
	};
});


var iframe,
	elemdisplay = {};

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */
// Called only from within defaultDisplay
function actualDisplay(name, doc) {
	var style,
		elem = jQuery(doc.createElement(name)).appendTo(doc.body),

		// getDefaultComputedStyle might be reliably used only on attached element
		display = window.getDefaultComputedStyle && (style = window.getDefaultComputedStyle(elem[0])) ?

			// Use of this method is a temporary fix (more like optmization) until something better comes along,
			// since it was removed from specification and supported only in FF
			style.display : jQuery.css(elem[0], "display");

	// We don't have any data stored on the element,
	// so use "detach" method as fast way to get rid of the element
	elem.detach();

	return display;
}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function defaultDisplay(nodeName) {
	var doc = document,
		display = elemdisplay[nodeName];

	if (!display) {
		display = actualDisplay(nodeName, doc);

		// If the simple way fails, read from inside an iframe
		if (display === "none" || !display) {

			// Use the already-created iframe if possible
			iframe = (iframe || jQuery("<iframe frameborder='0' width='0' height='0'/>")).appendTo(doc.documentElement);

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = (iframe[0].contentWindow || iframe[0].contentDocument).document;

			// Support: IE
			doc.write();
			doc.close();

			display = actualDisplay(nodeName, doc);
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[nodeName] = display;
	}

	return display;
}


(function () {
	var shrinkWrapBlocksVal;

	support.shrinkWrapBlocks = function () {
		if (shrinkWrapBlocksVal != null) {
			return shrinkWrapBlocksVal;
		}

		// Will be changed later if needed.
		shrinkWrapBlocksVal = false;

		// Minified: var b,c,d
		var div, body, container;

		body = document.getElementsByTagName("body")[0];
		if (!body || !body.style) {
			// Test fired too early or in an unsupported environment, exit.
			return;
		}

		// Setup
		div = document.createElement("div");
		container = document.createElement("div");
		container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
		body.appendChild(container).appendChild(div);

		// Support: IE6
		// Check if elements with layout shrink-wrap their children
		if (typeof div.style.zoom !== strundefined) {
			// Reset CSS: box-sizing; display; margin; border
			div.style.cssText =
				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;" +
				"padding:1px;width:1px;zoom:1";
			div.appendChild(document.createElement("div")).style.width = "5px";
			shrinkWrapBlocksVal = div.offsetWidth !== 3;
		}

		body.removeChild(container);

		return shrinkWrapBlocksVal;
	};

})();
var rmargin = (/^margin/);

var rnumnonpx = new RegExp("^(" + pnum + ")(?!px)[a-z%]+$", "i");



var getStyles, curCSS,
	rposition = /^(top|right|bottom|left)$/;

if (window.getComputedStyle) {
	getStyles = function (elem) {
		return elem.ownerDocument.defaultView.getComputedStyle(elem, null);
	};

	curCSS = function (elem, name, computed) {
		var width, minWidth, maxWidth, ret,
			style = elem.style;

		computed = computed || getStyles(elem);

		// getPropertyValue is only needed for .css('filter') in IE9, see #12537
		ret = computed ? computed.getPropertyValue(name) || computed[name] : undefined;

		if (computed) {

			if (ret === "" && !jQuery.contains(elem.ownerDocument, elem)) {
				ret = jQuery.style(elem, name);
			}

			// A tribute to the "awesome hack by Dean Edwards"
			// Chrome < 17 and Safari 5.0 uses "computed value" instead of "used value" for margin-right
			// Safari 5.1.7 (at least) returns percentage for a larger set of values, but width seems to be reliably pixels
			// this is against the CSSOM draft spec: http://dev.w3.org/csswg/cssom/#resolved-values
			if (rnumnonpx.test(ret) && rmargin.test(name)) {

				// Remember the original values
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;

				// Put in the new values to get a computed value out
				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;

				// Revert the changed values
				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "";
	};
} else if (document.documentElement.currentStyle) {
	getStyles = function (elem) {
		return elem.currentStyle;
	};

	curCSS = function (elem, name, computed) {
		var left, rs, rsLeft, ret,
			style = elem.style;

		computed = computed || getStyles(elem);
		ret = computed ? computed[name] : undefined;

		// Avoid setting ret to empty string here
		// so we don't default to auto
		if (ret == null && style && style[name]) {
			ret = style[name];
		}

		// From the awesome hack by Dean Edwards
		// http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

		// If we're not dealing with a regular pixel number
		// but a number that has a weird ending, we need to convert it to pixels
		// but not position css attributes, as those are proportional to the parent element instead
		// and we can't measure the parent instead because it might trigger a "stacking dolls" problem
		if (rnumnonpx.test(ret) && !rposition.test(name)) {

			// Remember the original values
			left = style.left;
			rs = elem.runtimeStyle;
			rsLeft = rs && rs.left;

			// Put in the new values to get a computed value out
			if (rsLeft) {
				rs.left = elem.currentStyle.left;
			}
			style.left = name === "fontSize" ? "1em" : ret;
			ret = style.pixelLeft + "px";

			// Revert the changed values
			style.left = left;
			if (rsLeft) {
				rs.left = rsLeft;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "" || "auto";
	};
}




function addGetHookIf(conditionFn, hookFn) {
	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function () {
			var condition = conditionFn();

			if (condition == null) {
				// The test was not ready at this point; screw the hook this time
				// but check again when needed next time.
				return;
			}

			if (condition) {
				// Hook not needed (or it's not possible to use it due to missing dependency),
				// remove it.
				// Since there are no other hooks for marginRight, remove the whole object.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.

			return (this.get = hookFn).apply(this, arguments);
		}
	};
}


(function () {
	// Minified: var b,c,d,e,f,g, h,i
	var div, style, a, pixelPositionVal, boxSizingReliableVal,
		reliableHiddenOffsetsVal, reliableMarginRightVal;

	// Setup
	div = document.createElement("div");
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName("a")[0];
	style = a && a.style;

	// Finish early in limited (non-browser) environments
	if (!style) {
		return;
	}

	style.cssText = "float:left;opacity:.5";

	// Support: IE<9
	// Make sure that element opacity exists (as opposed to filter)
	support.opacity = style.opacity === "0.5";

	// Verify style float existence
	// (IE uses styleFloat instead of cssFloat)
	support.cssFloat = !!style.cssFloat;

	div.style.backgroundClip = "content-box";
	div.cloneNode(true).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	// Support: Firefox<29, Android 2.3
	// Vendor-prefix box-sizing
	support.boxSizing = style.boxSizing === "" || style.MozBoxSizing === "" ||
		style.WebkitBoxSizing === "";

	jQuery.extend(support, {
		reliableHiddenOffsets: function () {
			if (reliableHiddenOffsetsVal == null) {
				computeStyleTests();
			}
			return reliableHiddenOffsetsVal;
		},

		boxSizingReliable: function () {
			if (boxSizingReliableVal == null) {
				computeStyleTests();
			}
			return boxSizingReliableVal;
		},

		pixelPosition: function () {
			if (pixelPositionVal == null) {
				computeStyleTests();
			}
			return pixelPositionVal;
		},

		// Support: Android 2.3
		reliableMarginRight: function () {
			if (reliableMarginRightVal == null) {
				computeStyleTests();
			}
			return reliableMarginRightVal;
		}
	});

	function computeStyleTests() {
		// Minified: var b,c,d,j
		var div, body, container, contents;

		body = document.getElementsByTagName("body")[0];
		if (!body || !body.style) {
			// Test fired too early or in an unsupported environment, exit.
			return;
		}

		// Setup
		div = document.createElement("div");
		container = document.createElement("div");
		container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
		body.appendChild(container).appendChild(div);

		div.style.cssText =
			// Support: Firefox<29, Android 2.3
			// Vendor-prefix box-sizing
			"-webkit-box-sizing:border-box;-moz-box-sizing:border-box;" +
			"box-sizing:border-box;display:block;margin-top:1%;top:1%;" +
			"border:1px;padding:1px;width:4px;position:absolute";

		// Support: IE<9
		// Assume reasonable values in the absence of getComputedStyle
		pixelPositionVal = boxSizingReliableVal = false;
		reliableMarginRightVal = true;

		// Check for getComputedStyle so that this code is not run in IE<9.
		if (window.getComputedStyle) {
			pixelPositionVal = (window.getComputedStyle(div, null) || {}).top !== "1%";
			boxSizingReliableVal =
				(window.getComputedStyle(div, null) || { width: "4px" }).width === "4px";

			// Support: Android 2.3
			// Div with explicit width and no margin-right incorrectly
			// gets computed margin-right based on width of container (#3333)
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			contents = div.appendChild(document.createElement("div"));

			// Reset CSS: box-sizing; display; margin; border; padding
			contents.style.cssText = div.style.cssText =
				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;padding:0";
			contents.style.marginRight = contents.style.width = "0";
			div.style.width = "1px";

			reliableMarginRightVal =
				!parseFloat((window.getComputedStyle(contents, null) || {}).marginRight);
		}

		// Support: IE8
		// Check if table cells still have offsetWidth/Height when they are set
		// to display:none and there are still other visible table cells in a
		// table row; if so, offsetWidth/Height are not reliable for use when
		// determining if an element has been hidden directly using
		// display:none (it is still safe to use offsets if a parent element is
		// hidden; don safety goggles and see bug #4512 for more information).
		div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
		contents = div.getElementsByTagName("td");
		contents[0].style.cssText = "margin:0;border:0;padding:0;display:none";
		reliableHiddenOffsetsVal = contents[0].offsetHeight === 0;
		if (reliableHiddenOffsetsVal) {
			contents[0].style.display = "";
			contents[1].style.display = "none";
			reliableHiddenOffsetsVal = contents[0].offsetHeight === 0;
		}

		body.removeChild(container);
	}

})();


// A method for quickly swapping in/out CSS properties to get correct calculations.
jQuery.swap = function (elem, options, callback, args) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for (name in options) {
		old[name] = elem.style[name];
		elem.style[name] = options[name];
	}

	ret = callback.apply(elem, args || []);

	// Revert the old values
	for (name in options) {
		elem.style[name] = old[name];
	}

	return ret;
};


var
	ralpha = /alpha\([^)]*\)/i,
	ropacity = /opacity\s*=\s*([^)]*)/,

	// swappable if display is none or starts with table except "table", "table-cell", or "table-caption"
	// see here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rnumsplit = new RegExp("^(" + pnum + ")(.*)$", "i"),
	rrelNum = new RegExp("^([+-])=(" + pnum + ")", "i"),

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = ["Webkit", "O", "Moz", "ms"];


// return a css property mapped to a potentially vendor prefixed property
function vendorPropName(style, name) {

	// shortcut for names that are not vendor prefixed
	if (name in style) {
		return name;
	}

	// check for vendor prefixed names
	var capName = name.charAt(0).toUpperCase() + name.slice(1),
		origName = name,
		i = cssPrefixes.length;

	while (i--) {
		name = cssPrefixes[i] + capName;
		if (name in style) {
			return name;
		}
	}

	return origName;
}

function showHide(elements, show) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for (; index < length; index++) {
		elem = elements[index];
		if (!elem.style) {
			continue;
		}

		values[index] = jQuery._data(elem, "olddisplay");
		display = elem.style.display;
		if (show) {
			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if (!values[index] && display === "none") {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if (elem.style.display === "" && isHidden(elem)) {
				values[index] = jQuery._data(elem, "olddisplay", defaultDisplay(elem.nodeName));
			}
		} else {
			hidden = isHidden(elem);

			if (display && display !== "none" || !hidden) {
				jQuery._data(elem, "olddisplay", hidden ? display : jQuery.css(elem, "display"));
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for (index = 0; index < length; index++) {
		elem = elements[index];
		if (!elem.style) {
			continue;
		}
		if (!show || elem.style.display === "none" || elem.style.display === "") {
			elem.style.display = show ? values[index] || "" : "none";
		}
	}

	return elements;
}

function setPositiveNumber(elem, value, subtract) {
	var matches = rnumsplit.exec(value);
	return matches ?
		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max(0, matches[1] - (subtract || 0)) + (matches[2] || "px") :
		value;
}

function augmentWidthOrHeight(elem, name, extra, isBorderBox, styles) {
	var i = extra === (isBorderBox ? "border" : "content") ?
		// If we already have the right measurement, avoid augmentation
		4 :
		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for (; i < 4; i += 2) {
		// both box models exclude margin, so add it if we want it
		if (extra === "margin") {
			val += jQuery.css(elem, extra + cssExpand[i], true, styles);
		}

		if (isBorderBox) {
			// border-box includes padding, so remove it if we want content
			if (extra === "content") {
				val -= jQuery.css(elem, "padding" + cssExpand[i], true, styles);
			}

			// at this point, extra isn't border nor margin, so remove border
			if (extra !== "margin") {
				val -= jQuery.css(elem, "border" + cssExpand[i] + "Width", true, styles);
			}
		} else {
			// at this point, extra isn't content, so add padding
			val += jQuery.css(elem, "padding" + cssExpand[i], true, styles);

			// at this point, extra isn't content nor padding, so add border
			if (extra !== "padding") {
				val += jQuery.css(elem, "border" + cssExpand[i] + "Width", true, styles);
			}
		}
	}

	return val;
}

function getWidthOrHeight(elem, name, extra) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles(elem),
		isBorderBox = support.boxSizing && jQuery.css(elem, "boxSizing", false, styles) === "border-box";

	// some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if (val <= 0 || val == null) {
		// Fall back to computed then uncomputed css if necessary
		val = curCSS(elem, name, styles);
		if (val < 0 || val == null) {
			val = elem.style[name];
		}

		// Computed unit is not pixels. Stop here and return.
		if (rnumnonpx.test(val)) {
			return val;
		}

		// we need the check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox && (support.boxSizingReliable() || val === elem.style[name]);

		// Normalize "", auto, and prepare for extra
		val = parseFloat(val) || 0;
	}

	// use the active box-sizing model to add/subtract irrelevant styles
	return (val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || (isBorderBox ? "border" : "content"),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

jQuery.extend({
	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function (elem, computed) {
				if (computed) {
					// We should always get a number back from opacity
					var ret = curCSS(elem, "opacity");
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		// normalize float css property
		"float": support.cssFloat ? "cssFloat" : "styleFloat"
	},

	// Get and set the style property on a DOM Node
	style: function (elem, name, value, extra) {
		// Don't set styles on text and comment nodes
		if (!elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase(name),
			style = elem.style;

		name = jQuery.cssProps[origName] || (jQuery.cssProps[origName] = vendorPropName(style, origName));

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName];

		// Check if we're setting a value
		if (value !== undefined) {
			type = typeof value;

			// convert relative number strings (+= or -=) to relative numbers. #7345
			if (type === "string" && (ret = rrelNum.exec(value))) {
				value = (ret[1] + 1) * ret[2] + parseFloat(jQuery.css(elem, name));
				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set. See: #7116
			if (value == null || value !== value) {
				return;
			}

			// If a number was passed in, add 'px' to the (except for certain CSS properties)
			if (type === "number" && !jQuery.cssNumber[origName]) {
				value += "px";
			}

			// Fixes #8908, it can be done more correctly by specifing setters in cssHooks,
			// but it would mean to define eight (for every problematic property) identical functions
			if (!support.clearCloneStyle && value === "" && name.indexOf("background") === 0) {
				style[name] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if (!hooks || !("set" in hooks) || (value = hooks.set(elem, value, extra)) !== undefined) {

				// Support: IE
				// Swallow errors from 'invalid' CSS values (#5509)
				try {
					style[name] = value;
				} catch (e) { }
			}

		} else {
			// If a hook was provided get the non-computed value from there
			if (hooks && "get" in hooks && (ret = hooks.get(elem, false, extra)) !== undefined) {
				return ret;
			}

			// Otherwise just get the value from the style object
			return style[name];
		}
	},

	css: function (elem, name, extra, styles) {
		var num, val, hooks,
			origName = jQuery.camelCase(name);

		// Make sure that we're working with the right name
		name = jQuery.cssProps[origName] || (jQuery.cssProps[origName] = vendorPropName(elem.style, origName));

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName];

		// If a hook was provided get the computed value from there
		if (hooks && "get" in hooks) {
			val = hooks.get(elem, true, extra);
		}

		// Otherwise, if a way to get the computed value exists, use that
		if (val === undefined) {
			val = curCSS(elem, name, styles);
		}

		//convert "normal" to computed value
		if (val === "normal" && name in cssNormalTransform) {
			val = cssNormalTransform[name];
		}

		// Return, converting to number if forced or a qualifier was provided and val looks numeric
		if (extra === "" || extra) {
			num = parseFloat(val);
			return extra === true || jQuery.isNumeric(num) ? num || 0 : val;
		}
		return val;
	}
});

jQuery.each(["height", "width"], function (i, name) {
	jQuery.cssHooks[name] = {
		get: function (elem, computed, extra) {
			if (computed) {
				// certain elements can have dimension info if we invisibly show them
				// however, it must have a current display style that would benefit from this
				return rdisplayswap.test(jQuery.css(elem, "display")) && elem.offsetWidth === 0 ?
					jQuery.swap(elem, cssShow, function () {
						return getWidthOrHeight(elem, name, extra);
					}) :
					getWidthOrHeight(elem, name, extra);
			}
		},

		set: function (elem, value, extra) {
			var styles = extra && getStyles(elem);
			return setPositiveNumber(elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					support.boxSizing && jQuery.css(elem, "boxSizing", false, styles) === "border-box",
					styles
				) : 0
			);
		}
	};
});

if (!support.opacity) {
	jQuery.cssHooks.opacity = {
		get: function (elem, computed) {
			// IE uses filters for opacity
			return ropacity.test((computed && elem.currentStyle ? elem.currentStyle.filter : elem.style.filter) || "") ?
				(0.01 * parseFloat(RegExp.$1)) + "" :
				computed ? "1" : "";
		},

		set: function (elem, value) {
			var style = elem.style,
				currentStyle = elem.currentStyle,
				opacity = jQuery.isNumeric(value) ? "alpha(opacity=" + value * 100 + ")" : "",
				filter = currentStyle && currentStyle.filter || style.filter || "";

			// IE has trouble with opacity if it does not have layout
			// Force it by setting the zoom level
			style.zoom = 1;

			// if setting opacity to 1, and no other filters exist - attempt to remove filter attribute #6652
			// if value === "", then remove inline opacity #12685
			if ((value >= 1 || value === "") &&
				jQuery.trim(filter.replace(ralpha, "")) === "" &&
				style.removeAttribute) {

				// Setting style.filter to null, "" & " " still leave "filter:" in the cssText
				// if "filter:" is present at all, clearType is disabled, we want to avoid this
				// style.removeAttribute is IE Only, but so apparently is this code path...
				style.removeAttribute("filter");

				// if there is no filter style applied in a css rule or unset inline opacity, we are done
				if (value === "" || currentStyle && !currentStyle.filter) {
					return;
				}
			}

			// otherwise, set new filter values
			style.filter = ralpha.test(filter) ?
				filter.replace(ralpha, opacity) :
				filter + " " + opacity;
		}
	};
}

jQuery.cssHooks.marginRight = addGetHookIf(support.reliableMarginRight,
	function (elem, computed) {
		if (computed) {
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			// Work around by temporarily setting element display to inline-block
			return jQuery.swap(elem, { "display": "inline-block" },
				curCSS, [elem, "marginRight"]);
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each({
	margin: "",
	padding: "",
	border: "Width"
}, function (prefix, suffix) {
	jQuery.cssHooks[prefix + suffix] = {
		expand: function (value) {
			var i = 0,
				expanded = {},

				// assumes a single number if not a string
				parts = typeof value === "string" ? value.split(" ") : [value];

			for (; i < 4; i++) {
				expanded[prefix + cssExpand[i] + suffix] =
					parts[i] || parts[i - 2] || parts[0];
			}

			return expanded;
		}
	};

	if (!rmargin.test(prefix)) {
		jQuery.cssHooks[prefix + suffix].set = setPositiveNumber;
	}
});

jQuery.fn.extend({
	css: function (name, value) {
		return access(this, function (elem, name, value) {
			var styles, len,
				map = {},
				i = 0;

			if (jQuery.isArray(name)) {
				styles = getStyles(elem);
				len = name.length;

				for (; i < len; i++) {
					map[name[i]] = jQuery.css(elem, name[i], false, styles);
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style(elem, name, value) :
				jQuery.css(elem, name);
		}, name, value, arguments.length > 1);
	},
	show: function () {
		return showHide(this, true);
	},
	hide: function () {
		return showHide(this);
	},
	toggle: function (state) {
		if (typeof state === "boolean") {
			return state ? this.show() : this.hide();
		}

		return this.each(function () {
			if (isHidden(this)) {
				jQuery(this).show();
			} else {
				jQuery(this).hide();
			}
		});
	}
});


function Tween(elem, options, prop, end, easing) {
	return new Tween.prototype.init(elem, options, prop, end, easing);
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function (elem, options, prop, end, easing, unit) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || "swing";
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || (jQuery.cssNumber[prop] ? "" : "px");
	},
	cur: function () {
		var hooks = Tween.propHooks[this.prop];

		return hooks && hooks.get ?
			hooks.get(this) :
			Tween.propHooks._default.get(this);
	},
	run: function (percent) {
		var eased,
			hooks = Tween.propHooks[this.prop];

		if (this.options.duration) {
			this.pos = eased = jQuery.easing[this.easing](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = (this.end - this.start) * eased + this.start;

		if (this.options.step) {
			this.options.step.call(this.elem, this.now, this);
		}

		if (hooks && hooks.set) {
			hooks.set(this);
		} else {
			Tween.propHooks._default.set(this);
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function (tween) {
			var result;

			if (tween.elem[tween.prop] != null &&
				(!tween.elem.style || tween.elem.style[tween.prop] == null)) {
				return tween.elem[tween.prop];
			}

			// passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails
			// so, simple values such as "10px" are parsed to Float.
			// complex values such as "rotate(1rad)" are returned as is.
			result = jQuery.css(tween.elem, tween.prop, "");
			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function (tween) {
			// use step hook for back compat - use cssHook if its there - use .style if its
			// available and use plain properties where available
			if (jQuery.fx.step[tween.prop]) {
				jQuery.fx.step[tween.prop](tween);
			} else if (tween.elem.style && (tween.elem.style[jQuery.cssProps[tween.prop]] != null || jQuery.cssHooks[tween.prop])) {
				jQuery.style(tween.elem, tween.prop, tween.now + tween.unit);
			} else {
				tween.elem[tween.prop] = tween.now;
			}
		}
	}
};

// Support: IE <=9
// Panic based approach to setting things on disconnected nodes

Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function (tween) {
		if (tween.elem.nodeType && tween.elem.parentNode) {
			tween.elem[tween.prop] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function (p) {
		return p;
	},
	swing: function (p) {
		return 0.5 - Math.cos(p * Math.PI) / 2;
	}
};

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rfxnum = new RegExp("^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i"),
	rrun = /queueHooks$/,
	animationPrefilters = [defaultPrefilter],
	tweeners = {
		"*": [function (prop, value) {
			var tween = this.createTween(prop, value),
				target = tween.cur(),
				parts = rfxnum.exec(value),
				unit = parts && parts[3] || (jQuery.cssNumber[prop] ? "" : "px"),

				// Starting value computation is required for potential unit mismatches
				start = (jQuery.cssNumber[prop] || unit !== "px" && +target) &&
					rfxnum.exec(jQuery.css(tween.elem, prop)),
				scale = 1,
				maxIterations = 20;

			if (start && start[3] !== unit) {
				// Trust units reported by jQuery.css
				unit = unit || start[3];

				// Make sure we update the tween properties later on
				parts = parts || [];

				// Iteratively approximate from a nonzero starting point
				start = +target || 1;

				do {
					// If previous iteration zeroed out, double until we get *something*
					// Use a string for doubling factor so we don't accidentally see scale as unchanged below
					scale = scale || ".5";

					// Adjust and apply
					start = start / scale;
					jQuery.style(tween.elem, prop, start + unit);

					// Update scale, tolerating zero or NaN from tween.cur()
					// And breaking the loop if scale is unchanged or perfect, or if we've just had enough
				} while (scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations);
			}

			// Update tween properties
			if (parts) {
				start = tween.start = +start || +target || 0;
				tween.unit = unit;
				// If a +=/-= token was provided, we're doing a relative animation
				tween.end = parts[1] ?
					start + (parts[1] + 1) * parts[2] :
					+parts[2];
			}

			return tween;
		}]
	};

// Animations created synchronously will run synchronously
function createFxNow() {
	setTimeout(function () {
		fxNow = undefined;
	});
	return (fxNow = jQuery.now());
}

// Generate parameters to create a standard animation
function genFx(type, includeWidth) {
	var which,
		attrs = { height: type },
		i = 0;

	// if we include width, step value is 1 to do all cssExpand values,
	// if we don't include width, step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for (; i < 4; i += 2 - includeWidth) {
		which = cssExpand[i];
		attrs["margin" + which] = attrs["padding" + which] = type;
	}

	if (includeWidth) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween(value, prop, animation) {
	var tween,
		collection = (tweeners[prop] || []).concat(tweeners["*"]),
		index = 0,
		length = collection.length;
	for (; index < length; index++) {
		if ((tween = collection[index].call(animation, prop, value))) {

			// we're done with this property
			return tween;
		}
	}
}

function defaultPrefilter(elem, props, opts) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden(elem),
		dataShow = jQuery._data(elem, "fxshow");

	// handle queue: false promises
	if (!opts.queue) {
		hooks = jQuery._queueHooks(elem, "fx");
		if (hooks.unqueued == null) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function () {
				if (!hooks.unqueued) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always(function () {
			// doing this makes sure that the complete handler will be called
			// before this completes
			anim.always(function () {
				hooks.unqueued--;
				if (!jQuery.queue(elem, "fx").length) {
					hooks.empty.fire();
				}
			});
		});
	}

	// height/width overflow pass
	if (elem.nodeType === 1 && ("height" in props || "width" in props)) {
		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE does not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [style.overflow, style.overflowX, style.overflowY];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		display = jQuery.css(elem, "display");

		// Test default display if display is currently "none"
		checkDisplay = display === "none" ?
			jQuery._data(elem, "olddisplay") || defaultDisplay(elem.nodeName) : display;

		if (checkDisplay === "inline" && jQuery.css(elem, "float") === "none") {

			// inline-level elements accept inline-block;
			// block-level elements need to be inline with layout
			if (!support.inlineBlockNeedsLayout || defaultDisplay(elem.nodeName) === "inline") {
				style.display = "inline-block";
			} else {
				style.zoom = 1;
			}
		}
	}

	if (opts.overflow) {
		style.overflow = "hidden";
		if (!support.shrinkWrapBlocks()) {
			anim.always(function () {
				style.overflow = opts.overflow[0];
				style.overflowX = opts.overflow[1];
				style.overflowY = opts.overflow[2];
			});
		}
	}

	// show/hide pass
	for (prop in props) {
		value = props[prop];
		if (rfxtypes.exec(value)) {
			delete props[prop];
			toggle = toggle || value === "toggle";
			if (value === (hidden ? "hide" : "show")) {

				// If there is dataShow left over from a stopped hide or show and we are going to proceed with show, we should pretend to be hidden
				if (value === "show" && dataShow && dataShow[prop] !== undefined) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[prop] = dataShow && dataShow[prop] || jQuery.style(elem, prop);

			// Any non-fx value stops us from restoring the original display value
		} else {
			display = undefined;
		}
	}

	if (!jQuery.isEmptyObject(orig)) {
		if (dataShow) {
			if ("hidden" in dataShow) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = jQuery._data(elem, "fxshow", {});
		}

		// store state if its toggle - enables .stop().toggle() to "reverse"
		if (toggle) {
			dataShow.hidden = !hidden;
		}
		if (hidden) {
			jQuery(elem).show();
		} else {
			anim.done(function () {
				jQuery(elem).hide();
			});
		}
		anim.done(function () {
			var prop;
			jQuery._removeData(elem, "fxshow");
			for (prop in orig) {
				jQuery.style(elem, prop, orig[prop]);
			}
		});
		for (prop in orig) {
			tween = createTween(hidden ? dataShow[prop] : 0, prop, anim);

			if (!(prop in dataShow)) {
				dataShow[prop] = tween.start;
				if (hidden) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}

		// If this is a noop like .hide().hide(), restore an overwritten display value
	} else if ((display === "none" ? defaultDisplay(elem.nodeName) : display) === "inline") {
		style.display = display;
	}
}

function propFilter(props, specialEasing) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for (index in props) {
		name = jQuery.camelCase(index);
		easing = specialEasing[name];
		value = props[index];
		if (jQuery.isArray(value)) {
			easing = value[1];
			value = props[index] = value[0];
		}

		if (index !== name) {
			props[name] = value;
			delete props[index];
		}

		hooks = jQuery.cssHooks[name];
		if (hooks && "expand" in hooks) {
			value = hooks.expand(value);
			delete props[name];

			// not quite $.extend, this wont overwrite keys already present.
			// also - reusing 'index' from above because we have the correct "name"
			for (index in value) {
				if (!(index in props)) {
					props[index] = value[index];
					specialEasing[index] = easing;
				}
			}
		} else {
			specialEasing[name] = easing;
		}
	}
}

function Animation(elem, properties, options) {
	var result,
		stopped,
		index = 0,
		length = animationPrefilters.length,
		deferred = jQuery.Deferred().always(function () {
			// don't match elem in the :animated selector
			delete tick.elem;
		}),
		tick = function () {
			if (stopped) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max(0, animation.startTime + animation.duration - currentTime),
				// archaic crash bug won't allow us to use 1 - ( 0.5 || 0 ) (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for (; index < length; index++) {
				animation.tweens[index].run(percent);
			}

			deferred.notifyWith(elem, [animation, percent, remaining]);

			if (percent < 1 && length) {
				return remaining;
			} else {
				deferred.resolveWith(elem, [animation]);
				return false;
			}
		},
		animation = deferred.promise({
			elem: elem,
			props: jQuery.extend({}, properties),
			opts: jQuery.extend(true, { specialEasing: {} }, options),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function (prop, end) {
				var tween = jQuery.Tween(elem, animation.opts, prop, end,
					animation.opts.specialEasing[prop] || animation.opts.easing);
				animation.tweens.push(tween);
				return tween;
			},
			stop: function (gotoEnd) {
				var index = 0,
					// if we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if (stopped) {
					return this;
				}
				stopped = true;
				for (; index < length; index++) {
					animation.tweens[index].run(1);
				}

				// resolve when we played the last frame
				// otherwise, reject
				if (gotoEnd) {
					deferred.resolveWith(elem, [animation, gotoEnd]);
				} else {
					deferred.rejectWith(elem, [animation, gotoEnd]);
				}
				return this;
			}
		}),
		props = animation.props;

	propFilter(props, animation.opts.specialEasing);

	for (; index < length; index++) {
		result = animationPrefilters[index].call(animation, elem, props, animation.opts);
		if (result) {
			return result;
		}
	}

	jQuery.map(props, createTween, animation);

	if (jQuery.isFunction(animation.opts.start)) {
		animation.opts.start.call(elem, animation);
	}

	jQuery.fx.timer(
		jQuery.extend(tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		})
	);

	// attach callbacks from options
	return animation.progress(animation.opts.progress)
		.done(animation.opts.done, animation.opts.complete)
		.fail(animation.opts.fail)
		.always(animation.opts.always);
}

jQuery.Animation = jQuery.extend(Animation, {
	tweener: function (props, callback) {
		if (jQuery.isFunction(props)) {
			callback = props;
			props = ["*"];
		} else {
			props = props.split(" ");
		}

		var prop,
			index = 0,
			length = props.length;

		for (; index < length; index++) {
			prop = props[index];
			tweeners[prop] = tweeners[prop] || [];
			tweeners[prop].unshift(callback);
		}
	},

	prefilter: function (callback, prepend) {
		if (prepend) {
			animationPrefilters.unshift(callback);
		} else {
			animationPrefilters.push(callback);
		}
	}
});

jQuery.speed = function (speed, easing, fn) {
	var opt = speed && typeof speed === "object" ? jQuery.extend({}, speed) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction(speed) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction(easing) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[opt.duration] : jQuery.fx.speeds._default;

	// normalize opt.queue - true/undefined/null -> "fx"
	if (opt.queue == null || opt.queue === true) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function () {
		if (jQuery.isFunction(opt.old)) {
			opt.old.call(this);
		}

		if (opt.queue) {
			jQuery.dequeue(this, opt.queue);
		}
	};

	return opt;
};

jQuery.fn.extend({
	fadeTo: function (speed, to, easing, callback) {

		// show any hidden elements after setting opacity to 0
		return this.filter(isHidden).css("opacity", 0).show()

			// animate to the value specified
			.end().animate({ opacity: to }, speed, easing, callback);
	},
	animate: function (prop, speed, easing, callback) {
		var empty = jQuery.isEmptyObject(prop),
			optall = jQuery.speed(speed, easing, callback),
			doAnimation = function () {
				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation(this, jQuery.extend({}, prop), optall);

				// Empty animations, or finishing resolves immediately
				if (empty || jQuery._data(this, "finish")) {
					anim.stop(true);
				}
			};
		doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each(doAnimation) :
			this.queue(optall.queue, doAnimation);
	},
	stop: function (type, clearQueue, gotoEnd) {
		var stopQueue = function (hooks) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop(gotoEnd);
		};

		if (typeof type !== "string") {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if (clearQueue && type !== false) {
			this.queue(type || "fx", []);
		}

		return this.each(function () {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = jQuery._data(this);

			if (index) {
				if (data[index] && data[index].stop) {
					stopQueue(data[index]);
				}
			} else {
				for (index in data) {
					if (data[index] && data[index].stop && rrun.test(index)) {
						stopQueue(data[index]);
					}
				}
			}

			for (index = timers.length; index--;) {
				if (timers[index].elem === this && (type == null || timers[index].queue === type)) {
					timers[index].anim.stop(gotoEnd);
					dequeue = false;
					timers.splice(index, 1);
				}
			}

			// start the next in the queue if the last step wasn't forced
			// timers currently will call their complete callbacks, which will dequeue
			// but only if they were gotoEnd
			if (dequeue || !gotoEnd) {
				jQuery.dequeue(this, type);
			}
		});
	},
	finish: function (type) {
		if (type !== false) {
			type = type || "fx";
		}
		return this.each(function () {
			var index,
				data = jQuery._data(this),
				queue = data[type + "queue"],
				hooks = data[type + "queueHooks"],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// enable finishing flag on private data
			data.finish = true;

			// empty the queue first
			jQuery.queue(this, type, []);

			if (hooks && hooks.stop) {
				hooks.stop.call(this, true);
			}

			// look for any active animations, and finish them
			for (index = timers.length; index--;) {
				if (timers[index].elem === this && timers[index].queue === type) {
					timers[index].anim.stop(true);
					timers.splice(index, 1);
				}
			}

			// look for any animations in the old queue and finish them
			for (index = 0; index < length; index++) {
				if (queue[index] && queue[index].finish) {
					queue[index].finish.call(this);
				}
			}

			// turn off finishing flag
			delete data.finish;
		});
	}
});

jQuery.each(["toggle", "show", "hide"], function (i, name) {
	var cssFn = jQuery.fn[name];
	jQuery.fn[name] = function (speed, easing, callback) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply(this, arguments) :
			this.animate(genFx(name, true), speed, easing, callback);
	};
});

// Generate shortcuts for custom animations
jQuery.each({
	slideDown: genFx("show"),
	slideUp: genFx("hide"),
	slideToggle: genFx("toggle"),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function (name, props) {
	jQuery.fn[name] = function (speed, easing, callback) {
		return this.animate(props, speed, easing, callback);
	};
});

jQuery.timers = [];
jQuery.fx.tick = function () {
	var timer,
		timers = jQuery.timers,
		i = 0;

	fxNow = jQuery.now();

	for (; i < timers.length; i++) {
		timer = timers[i];
		// Checks the timer has not already been removed
		if (!timer() && timers[i] === timer) {
			timers.splice(i--, 1);
		}
	}

	if (!timers.length) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function (timer) {
	jQuery.timers.push(timer);
	if (timer()) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;

jQuery.fx.start = function () {
	if (!timerId) {
		timerId = setInterval(jQuery.fx.tick, jQuery.fx.interval);
	}
};

jQuery.fx.stop = function () {
	clearInterval(timerId);
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,
	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function (time, type) {
	time = jQuery.fx ? jQuery.fx.speeds[time] || time : time;
	type = type || "fx";

	return this.queue(type, function (next, hooks) {
		var timeout = setTimeout(next, time);
		hooks.stop = function () {
			clearTimeout(timeout);
		};
	});
};


(function () {
	// Minified: var a,b,c,d,e
	var input, div, select, a, opt;

	// Setup
	div = document.createElement("div");
	div.setAttribute("className", "t");
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName("a")[0];

	// First batch of tests.
	select = document.createElement("select");
	opt = select.appendChild(document.createElement("option"));
	input = div.getElementsByTagName("input")[0];

	a.style.cssText = "top:1px";

	// Test setAttribute on camelCase class. If it works, we need attrFixes when doing get/setAttribute (ie6/7)
	support.getSetAttribute = div.className !== "t";

	// Get the style information from getAttribute
	// (IE uses .cssText instead)
	support.style = /top/.test(a.getAttribute("style"));

	// Make sure that URLs aren't manipulated
	// (IE normalizes it by default)
	support.hrefNormalized = a.getAttribute("href") === "/a";

	// Check the default checkbox/radio value ("" on WebKit; "on" elsewhere)
	support.checkOn = !!input.value;

	// Make sure that a selected-by-default option has a working selected property.
	// (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
	support.optSelected = opt.selected;

	// Tests for enctype support on a form (#6743)
	support.enctype = !!document.createElement("form").enctype;

	// Make sure that the options inside disabled selects aren't marked as disabled
	// (WebKit marks them as disabled)
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE8 only
	// Check if we can trust getAttribute("value")
	input = document.createElement("input");
	input.setAttribute("value", "");
	support.input = input.getAttribute("value") === "";

	// Check if an input maintains its value after becoming a radio
	input.value = "t";
	input.setAttribute("type", "radio");
	support.radioValue = input.value === "t";
})();


var rreturn = /\r/g;

jQuery.fn.extend({
	val: function (value) {
		var hooks, ret, isFunction,
			elem = this[0];

		if (!arguments.length) {
			if (elem) {
				hooks = jQuery.valHooks[elem.type] || jQuery.valHooks[elem.nodeName.toLowerCase()];

				if (hooks && "get" in hooks && (ret = hooks.get(elem, "value")) !== undefined) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?
					// handle most common string cases
					ret.replace(rreturn, "") :
					// handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction(value);

		return this.each(function (i) {
			var val;

			if (this.nodeType !== 1) {
				return;
			}

			if (isFunction) {
				val = value.call(this, i, jQuery(this).val());
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if (val == null) {
				val = "";
			} else if (typeof val === "number") {
				val += "";
			} else if (jQuery.isArray(val)) {
				val = jQuery.map(val, function (value) {
					return value == null ? "" : value + "";
				});
			}

			hooks = jQuery.valHooks[this.type] || jQuery.valHooks[this.nodeName.toLowerCase()];

			// If set returns undefined, fall back to normal setting
			if (!hooks || !("set" in hooks) || hooks.set(this, val, "value") === undefined) {
				this.value = val;
			}
		});
	}
});

jQuery.extend({
	valHooks: {
		option: {
			get: function (elem) {
				var val = jQuery.find.attr(elem, "value");
				return val != null ?
					val :
					// Support: IE10-11+
					// option.text throws exceptions (#14686, #14858)
					jQuery.trim(jQuery.text(elem));
			}
		},
		select: {
			get: function (elem) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for (; i < max; i++) {
					option = options[i];

					// oldIE doesn't update selected after form reset (#2551)
					if ((option.selected || i === index) &&
						// Don't return options that are disabled or in a disabled optgroup
						(support.optDisabled ? !option.disabled : option.getAttribute("disabled") === null) &&
						(!option.parentNode.disabled || !jQuery.nodeName(option.parentNode, "optgroup"))) {

						// Get the specific value for the option
						value = jQuery(option).val();

						// We don't need an array for one selects
						if (one) {
							return value;
						}

						// Multi-Selects return an array
						values.push(value);
					}
				}

				return values;
			},

			set: function (elem, value) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray(value),
					i = options.length;

				while (i--) {
					option = options[i];

					if (jQuery.inArray(jQuery.valHooks.option.get(option), values) >= 0) {

						// Support: IE6
						// When new option element is added to select box we need to
						// force reflow of newly added node in order to workaround delay
						// of initialization properties
						try {
							option.selected = optionSet = true;

						} catch (_) {

							// Will be executed only in IE6
							option.scrollHeight;
						}

					} else {
						option.selected = false;
					}
				}

				// Force browsers to behave consistently when non-matching value is set
				if (!optionSet) {
					elem.selectedIndex = -1;
				}

				return options;
			}
		}
	}
});

// Radios and checkboxes getter/setter
jQuery.each(["radio", "checkbox"], function () {
	jQuery.valHooks[this] = {
		set: function (elem, value) {
			if (jQuery.isArray(value)) {
				return (elem.checked = jQuery.inArray(jQuery(elem).val(), value) >= 0);
			}
		}
	};
	if (!support.checkOn) {
		jQuery.valHooks[this].get = function (elem) {
			// Support: Webkit
			// "" is returned instead of "on" if a value isn't specified
			return elem.getAttribute("value") === null ? "on" : elem.value;
		};
	}
});




var nodeHook, boolHook,
	attrHandle = jQuery.expr.attrHandle,
	ruseDefault = /^(?:checked|selected)$/i,
	getSetAttribute = support.getSetAttribute,
	getSetInput = support.input;

jQuery.fn.extend({
	attr: function (name, value) {
		return access(this, jQuery.attr, name, value, arguments.length > 1);
	},

	removeAttr: function (name) {
		return this.each(function () {
			jQuery.removeAttr(this, name);
		});
	}
});

jQuery.extend({
	attr: function (elem, name, value) {
		var hooks, ret,
			nType = elem.nodeType;

		// don't get/set attributes on text, comment and attribute nodes
		if (!elem || nType === 3 || nType === 8 || nType === 2) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if (typeof elem.getAttribute === strundefined) {
			return jQuery.prop(elem, name, value);
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if (nType !== 1 || !jQuery.isXMLDoc(elem)) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[name] ||
				(jQuery.expr.match.bool.test(name) ? boolHook : nodeHook);
		}

		if (value !== undefined) {

			if (value === null) {
				jQuery.removeAttr(elem, name);

			} else if (hooks && "set" in hooks && (ret = hooks.set(elem, value, name)) !== undefined) {
				return ret;

			} else {
				elem.setAttribute(name, value + "");
				return value;
			}

		} else if (hooks && "get" in hooks && (ret = hooks.get(elem, name)) !== null) {
			return ret;

		} else {
			ret = jQuery.find.attr(elem, name);

			// Non-existent attributes return null, we normalize to undefined
			return ret == null ?
				undefined :
				ret;
		}
	},

	removeAttr: function (elem, value) {
		var name, propName,
			i = 0,
			attrNames = value && value.match(rnotwhite);

		if (attrNames && elem.nodeType === 1) {
			while ((name = attrNames[i++])) {
				propName = jQuery.propFix[name] || name;

				// Boolean attributes get special treatment (#10870)
				if (jQuery.expr.match.bool.test(name)) {
					// Set corresponding property to false
					if (getSetInput && getSetAttribute || !ruseDefault.test(name)) {
						elem[propName] = false;
						// Support: IE<9
						// Also clear defaultChecked/defaultSelected (if appropriate)
					} else {
						elem[jQuery.camelCase("default-" + name)] =
							elem[propName] = false;
					}

					// See #9699 for explanation of this approach (setting first, then removal)
				} else {
					jQuery.attr(elem, name, "");
				}

				elem.removeAttribute(getSetAttribute ? name : propName);
			}
		}
	},

	attrHooks: {
		type: {
			set: function (elem, value) {
				if (!support.radioValue && value === "radio" && jQuery.nodeName(elem, "input")) {
					// Setting the type on a radio button after the value resets the value in IE6-9
					// Reset value to default in case type is set after value during creation
					var val = elem.value;
					elem.setAttribute("type", value);
					if (val) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	}
});

// Hook for boolean attributes
boolHook = {
	set: function (elem, value, name) {
		if (value === false) {
			// Remove boolean attributes when set to false
			jQuery.removeAttr(elem, name);
		} else if (getSetInput && getSetAttribute || !ruseDefault.test(name)) {
			// IE<8 needs the *property* name
			elem.setAttribute(!getSetAttribute && jQuery.propFix[name] || name, name);

			// Use defaultChecked and defaultSelected for oldIE
		} else {
			elem[jQuery.camelCase("default-" + name)] = elem[name] = true;
		}

		return name;
	}
};

// Retrieve booleans specially
jQuery.each(jQuery.expr.match.bool.source.match(/\w+/g), function (i, name) {

	var getter = attrHandle[name] || jQuery.find.attr;

	attrHandle[name] = getSetInput && getSetAttribute || !ruseDefault.test(name) ?
		function (elem, name, isXML) {
			var ret, handle;
			if (!isXML) {
				// Avoid an infinite loop by temporarily removing this function from the getter
				handle = attrHandle[name];
				attrHandle[name] = ret;
				ret = getter(elem, name, isXML) != null ?
					name.toLowerCase() :
					null;
				attrHandle[name] = handle;
			}
			return ret;
		} :
		function (elem, name, isXML) {
			if (!isXML) {
				return elem[jQuery.camelCase("default-" + name)] ?
					name.toLowerCase() :
					null;
			}
		};
});

// fix oldIE attroperties
if (!getSetInput || !getSetAttribute) {
	jQuery.attrHooks.value = {
		set: function (elem, value, name) {
			if (jQuery.nodeName(elem, "input")) {
				// Does not return so that setAttribute is also used
				elem.defaultValue = value;
			} else {
				// Use nodeHook if defined (#1954); otherwise setAttribute is fine
				return nodeHook && nodeHook.set(elem, value, name);
			}
		}
	};
}

// IE6/7 do not support getting/setting some attributes with get/setAttribute
if (!getSetAttribute) {

	// Use this for any attribute in IE6/7
	// This fixes almost every IE6/7 issue
	nodeHook = {
		set: function (elem, value, name) {
			// Set the existing or create a new attribute node
			var ret = elem.getAttributeNode(name);
			if (!ret) {
				elem.setAttributeNode(
					(ret = elem.ownerDocument.createAttribute(name))
				);
			}

			ret.value = value += "";

			// Break association with cloned elements by also using setAttribute (#9646)
			if (name === "value" || value === elem.getAttribute(name)) {
				return value;
			}
		}
	};

	// Some attributes are constructed with empty-string values when not defined
	attrHandle.id = attrHandle.name = attrHandle.coords =
		function (elem, name, isXML) {
			var ret;
			if (!isXML) {
				return (ret = elem.getAttributeNode(name)) && ret.value !== "" ?
					ret.value :
					null;
			}
		};

	// Fixing value retrieval on a button requires this module
	jQuery.valHooks.button = {
		get: function (elem, name) {
			var ret = elem.getAttributeNode(name);
			if (ret && ret.specified) {
				return ret.value;
			}
		},
		set: nodeHook.set
	};

	// Set contenteditable to false on removals(#10429)
	// Setting to empty string throws an error as an invalid value
	jQuery.attrHooks.contenteditable = {
		set: function (elem, value, name) {
			nodeHook.set(elem, value === "" ? false : value, name);
		}
	};

	// Set width and height to auto instead of 0 on empty string( Bug #8150 )
	// This is for removals
	jQuery.each(["width", "height"], function (i, name) {
		jQuery.attrHooks[name] = {
			set: function (elem, value) {
				if (value === "") {
					elem.setAttribute(name, "auto");
					return value;
				}
			}
		};
	});
}

if (!support.style) {
	jQuery.attrHooks.style = {
		get: function (elem) {
			// Return undefined in the case of empty string
			// Note: IE uppercases css property names, but if we were to .toLowerCase()
			// .cssText, that would destroy case senstitivity in URL's, like in "background"
			return elem.style.cssText || undefined;
		},
		set: function (elem, value) {
			return (elem.style.cssText = value + "");
		}
	};
}




var rfocusable = /^(?:input|select|textarea|button|object)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend({
	prop: function (name, value) {
		return access(this, jQuery.prop, name, value, arguments.length > 1);
	},

	removeProp: function (name) {
		name = jQuery.propFix[name] || name;
		return this.each(function () {
			// try/catch handles cases where IE balks (such as removing a property on window)
			try {
				this[name] = undefined;
				delete this[name];
			} catch (e) { }
		});
	}
});

jQuery.extend({
	propFix: {
		"for": "htmlFor",
		"class": "className"
	},

	prop: function (elem, name, value) {
		var ret, hooks, notxml,
			nType = elem.nodeType;

		// don't get/set properties on text, comment and attribute nodes
		if (!elem || nType === 3 || nType === 8 || nType === 2) {
			return;
		}

		notxml = nType !== 1 || !jQuery.isXMLDoc(elem);

		if (notxml) {
			// Fix name and attach hooks
			name = jQuery.propFix[name] || name;
			hooks = jQuery.propHooks[name];
		}

		if (value !== undefined) {
			return hooks && "set" in hooks && (ret = hooks.set(elem, value, name)) !== undefined ?
				ret :
				(elem[name] = value);

		} else {
			return hooks && "get" in hooks && (ret = hooks.get(elem, name)) !== null ?
				ret :
				elem[name];
		}
	},

	propHooks: {
		tabIndex: {
			get: function (elem) {
				// elem.tabIndex doesn't always return the correct value when it hasn't been explicitly set
				// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr(elem, "tabindex");

				return tabindex ?
					parseInt(tabindex, 10) :
					rfocusable.test(elem.nodeName) || rclickable.test(elem.nodeName) && elem.href ?
						0 :
						-1;
			}
		}
	}
});

// Some attributes require a special call on IE
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if (!support.hrefNormalized) {
	// href/src property should get the full normalized URL (#10299/#12915)
	jQuery.each(["href", "src"], function (i, name) {
		jQuery.propHooks[name] = {
			get: function (elem) {
				return elem.getAttribute(name, 4);
			}
		};
	});
}

// Support: Safari, IE9+
// mis-reports the default selected property of an option
// Accessing the parent's selectedIndex property fixes it
if (!support.optSelected) {
	jQuery.propHooks.selected = {
		get: function (elem) {
			var parent = elem.parentNode;

			if (parent) {
				parent.selectedIndex;

				// Make sure that it also works with optgroups, see #5701
				if (parent.parentNode) {
					parent.parentNode.selectedIndex;
				}
			}
			return null;
		}
	};
}

jQuery.each([
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function () {
	jQuery.propFix[this.toLowerCase()] = this;
});

// IE6/7 call enctype encoding
if (!support.enctype) {
	jQuery.propFix.enctype = "encoding";
}




var rclass = /[\t\r\n\f]/g;

jQuery.fn.extend({
	addClass: function (value) {
		var classes, elem, cur, clazz, j, finalValue,
			i = 0,
			len = this.length,
			proceed = typeof value === "string" && value;

		if (jQuery.isFunction(value)) {
			return this.each(function (j) {
				jQuery(this).addClass(value.call(this, j, this.className));
			});
		}

		if (proceed) {
			// The disjunction here is for better compressibility (see removeClass)
			classes = (value || "").match(rnotwhite) || [];

			for (; i < len; i++) {
				elem = this[i];
				cur = elem.nodeType === 1 && (elem.className ?
					(" " + elem.className + " ").replace(rclass, " ") :
					" "
				);

				if (cur) {
					j = 0;
					while ((clazz = classes[j++])) {
						if (cur.indexOf(" " + clazz + " ") < 0) {
							cur += clazz + " ";
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim(cur);
					if (elem.className !== finalValue) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	removeClass: function (value) {
		var classes, elem, cur, clazz, j, finalValue,
			i = 0,
			len = this.length,
			proceed = arguments.length === 0 || typeof value === "string" && value;

		if (jQuery.isFunction(value)) {
			return this.each(function (j) {
				jQuery(this).removeClass(value.call(this, j, this.className));
			});
		}
		if (proceed) {
			classes = (value || "").match(rnotwhite) || [];

			for (; i < len; i++) {
				elem = this[i];
				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && (elem.className ?
					(" " + elem.className + " ").replace(rclass, " ") :
					""
				);

				if (cur) {
					j = 0;
					while ((clazz = classes[j++])) {
						// Remove *all* instances
						while (cur.indexOf(" " + clazz + " ") >= 0) {
							cur = cur.replace(" " + clazz + " ", " ");
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = value ? jQuery.trim(cur) : "";
					if (elem.className !== finalValue) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	toggleClass: function (value, stateVal) {
		var type = typeof value;

		if (typeof stateVal === "boolean" && type === "string") {
			return stateVal ? this.addClass(value) : this.removeClass(value);
		}

		if (jQuery.isFunction(value)) {
			return this.each(function (i) {
				jQuery(this).toggleClass(value.call(this, i, this.className, stateVal), stateVal);
			});
		}

		return this.each(function () {
			if (type === "string") {
				// toggle individual class names
				var className,
					i = 0,
					self = jQuery(this),
					classNames = value.match(rnotwhite) || [];

				while ((className = classNames[i++])) {
					// check each className given, space separated list
					if (self.hasClass(className)) {
						self.removeClass(className);
					} else {
						self.addClass(className);
					}
				}

				// Toggle whole class name
			} else if (type === strundefined || type === "boolean") {
				if (this.className) {
					// store className if set
					jQuery._data(this, "__className__", this.className);
				}

				// If the element has a class name or if we're passed "false",
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				this.className = this.className || value === false ? "" : jQuery._data(this, "__className__") || "";
			}
		});
	},

	hasClass: function (selector) {
		var className = " " + selector + " ",
			i = 0,
			l = this.length;
		for (; i < l; i++) {
			if (this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf(className) >= 0) {
				return true;
			}
		}

		return false;
	}
});




// Return jQuery for attributes-only inclusion


jQuery.each(("blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu").split(" "), function (i, name) {

		// Handle event binding
		jQuery.fn[name] = function (data, fn) {
			return arguments.length > 0 ?
				this.on(name, null, data, fn) :
				this.trigger(name);
		};
	});

jQuery.fn.extend({
	hover: function (fnOver, fnOut) {
		return this.mouseenter(fnOver).mouseleave(fnOut || fnOver);
	},

	bind: function (types, data, fn) {
		return this.on(types, null, data, fn);
	},
	unbind: function (types, fn) {
		return this.off(types, null, fn);
	},

	delegate: function (selector, types, data, fn) {
		return this.on(types, selector, data, fn);
	},
	undelegate: function (selector, types, fn) {
		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ? this.off(selector, "**") : this.off(types, selector || "**", fn);
	}
});


var nonce = jQuery.now();

var rquery = (/\?/);



var rvalidtokens = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;

jQuery.parseJSON = function (data) {
	// Attempt to parse using the native JSON parser first
	if (window.JSON && window.JSON.parse) {
		// Support: Android 2.3
		// Workaround failure to string-cast null input
		return window.JSON.parse(data + "");
	}

	var requireNonComma,
		depth = null,
		str = jQuery.trim(data + "");

	// Guard against invalid (and possibly dangerous) input by ensuring that nothing remains
	// after removing valid tokens
	return str && !jQuery.trim(str.replace(rvalidtokens, function (token, comma, open, close) {

		// Force termination if we see a misplaced comma
		if (requireNonComma && comma) {
			depth = 0;
		}

		// Perform no more replacements after returning to outermost depth
		if (depth === 0) {
			return token;
		}

		// Commas must not follow "[", "{", or ","
		requireNonComma = open || comma;

		// Determine new depth
		// array/object open ("[" or "{"): depth += true - false (increment)
		// array/object close ("]" or "}"): depth += false - true (decrement)
		// other cases ("," or primitive): depth += true - true (numeric cast)
		depth += !close - !open;

		// Remove this token
		return "";
	})) ?
		(Function("return " + str))() :
		jQuery.error("Invalid JSON: " + data);
};


// Cross-browser xml parsing
jQuery.parseXML = function (data) {
	var xml, tmp;
	if (!data || typeof data !== "string") {
		return null;
	}
	try {
		if (window.DOMParser) { // Standard
			tmp = new DOMParser();
			xml = tmp.parseFromString(data, "text/xml");
		} else { // IE
			xml = new ActiveXObject("Microsoft.XMLDOM");
			xml.async = "false";
			xml.loadXML(data);
		}
	} catch (e) {
		xml = undefined;
	}
	if (!xml || !xml.documentElement || xml.getElementsByTagName("parsererror").length) {
		jQuery.error("Invalid XML: " + data);
	}
	return xml;
};


var
	// Document location
	ajaxLocParts,
	ajaxLocation,

	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg, // IE leaves an \r character at EOL
	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat("*");

// #8138, IE may throw an exception when accessing
// a field from window.location if document.domain has been set
try {
	ajaxLocation = location.href;
} catch (e) {
	// Use the href attribute of an A element
	// since IE will modify it given document.location
	ajaxLocation = document.createElement("a");
	ajaxLocation.href = "";
	ajaxLocation = ajaxLocation.href;
}

// Segment location into parts
ajaxLocParts = rurl.exec(ajaxLocation.toLowerCase()) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports(structure) {

	// dataTypeExpression is optional and defaults to "*"
	return function (dataTypeExpression, func) {

		if (typeof dataTypeExpression !== "string") {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match(rnotwhite) || [];

		if (jQuery.isFunction(func)) {
			// For each dataType in the dataTypeExpression
			while ((dataType = dataTypes[i++])) {
				// Prepend if requested
				if (dataType.charAt(0) === "+") {
					dataType = dataType.slice(1) || "*";
					(structure[dataType] = structure[dataType] || []).unshift(func);

					// Otherwise append
				} else {
					(structure[dataType] = structure[dataType] || []).push(func);
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports(structure, options, originalOptions, jqXHR) {

	var inspected = {},
		seekingTransport = (structure === transports);

	function inspect(dataType) {
		var selected;
		inspected[dataType] = true;
		jQuery.each(structure[dataType] || [], function (_, prefilterOrFactory) {
			var dataTypeOrTransport = prefilterOrFactory(options, originalOptions, jqXHR);
			if (typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[dataTypeOrTransport]) {
				options.dataTypes.unshift(dataTypeOrTransport);
				inspect(dataTypeOrTransport);
				return false;
			} else if (seekingTransport) {
				return !(selected = dataTypeOrTransport);
			}
		});
		return selected;
	}

	return inspect(options.dataTypes[0]) || !inspected["*"] && inspect("*");
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend(target, src) {
	var deep, key,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for (key in src) {
		if (src[key] !== undefined) {
			(flatOptions[key] ? target : (deep || (deep = {})))[key] = src[key];
		}
	}
	if (deep) {
		jQuery.extend(true, target, deep);
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses(s, jqXHR, responses) {
	var firstDataType, ct, finalDataType, type,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while (dataTypes[0] === "*") {
		dataTypes.shift();
		if (ct === undefined) {
			ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
		}
	}

	// Check if we're dealing with a known content-type
	if (ct) {
		for (type in contents) {
			if (contents[type] && contents[type].test(ct)) {
				dataTypes.unshift(type);
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if (dataTypes[0] in responses) {
		finalDataType = dataTypes[0];
	} else {
		// Try convertible dataTypes
		for (type in responses) {
			if (!dataTypes[0] || s.converters[type + " " + dataTypes[0]]) {
				finalDataType = type;
				break;
			}
			if (!firstDataType) {
				firstDataType = type;
			}
		}
		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if (finalDataType) {
		if (finalDataType !== dataTypes[0]) {
			dataTypes.unshift(finalDataType);
		}
		return responses[finalDataType];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert(s, response, jqXHR, isSuccess) {
	var conv2, current, conv, tmp, prev,
		converters = {},
		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if (dataTypes[1]) {
		for (conv in s.converters) {
			converters[conv.toLowerCase()] = s.converters[conv];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while (current) {

		if (s.responseFields[current]) {
			jqXHR[s.responseFields[current]] = response;
		}

		// Apply the dataFilter if provided
		if (!prev && isSuccess && s.dataFilter) {
			response = s.dataFilter(response, s.dataType);
		}

		prev = current;
		current = dataTypes.shift();

		if (current) {

			// There's only work to do if current dataType is non-auto
			if (current === "*") {

				current = prev;

				// Convert response if prev dataType is non-auto and differs from current
			} else if (prev !== "*" && prev !== current) {

				// Seek a direct converter
				conv = converters[prev + " " + current] || converters["* " + current];

				// If none found, seek a pair
				if (!conv) {
					for (conv2 in converters) {

						// If conv2 outputs current
						tmp = conv2.split(" ");
						if (tmp[1] === current) {

							// If prev can be converted to accepted input
							conv = converters[prev + " " + tmp[0]] ||
								converters["* " + tmp[0]];
							if (conv) {
								// Condense equivalence converters
								if (conv === true) {
									conv = converters[conv2];

									// Otherwise, insert the intermediate dataType
								} else if (converters[conv2] !== true) {
									current = tmp[0];
									dataTypes.unshift(tmp[1]);
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if (conv !== true) {

					// Unless errors are allowed to bubble, catch and return them
					if (conv && s["throws"]) {
						response = conv(response);
					} else {
						try {
							response = conv(response);
						} catch (e) {
							return { state: "parsererror", error: conv ? e : "No conversion from " + prev + " to " + current };
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend({

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: ajaxLocation,
		type: "GET",
		isLocal: rlocalProtocol.test(ajaxLocParts[1]),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /xml/,
			html: /html/,
			json: /json/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function (target, settings) {
		return settings ?

			// Building a settings object
			ajaxExtend(ajaxExtend(target, jQuery.ajaxSettings), settings) :

			// Extending ajaxSettings
			ajaxExtend(jQuery.ajaxSettings, target);
	},

	ajaxPrefilter: addToPrefiltersOrTransports(prefilters),
	ajaxTransport: addToPrefiltersOrTransports(transports),

	// Main method
	ajax: function (url, options) {

		// If url is an object, simulate pre-1.5 signature
		if (typeof url === "object") {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var // Cross-domain detection vars
			parts,
			// Loop variable
			i,
			// URL without anti-cache param
			cacheURL,
			// Response headers as string
			responseHeadersString,
			// timeout handle
			timeoutTimer,

			// To know if global events are to be dispatched
			fireGlobals,

			transport,
			// Response headers
			responseHeaders,
			// Create the final options object
			s = jQuery.ajaxSetup({}, options),
			// Callbacks context
			callbackContext = s.context || s,
			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context && (callbackContext.nodeType || callbackContext.jquery) ?
				jQuery(callbackContext) :
				jQuery.event,
			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks("once memory"),
			// Status-dependent callbacks
			statusCode = s.statusCode || {},
			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},
			// The jqXHR state
			state = 0,
			// Default abort message
			strAbort = "canceled",
			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function (key) {
					var match;
					if (state === 2) {
						if (!responseHeaders) {
							responseHeaders = {};
							while ((match = rheaders.exec(responseHeadersString))) {
								responseHeaders[match[1].toLowerCase()] = match[2];
							}
						}
						match = responseHeaders[key.toLowerCase()];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function () {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function (name, value) {
					var lname = name.toLowerCase();
					if (!state) {
						name = requestHeadersNames[lname] = requestHeadersNames[lname] || name;
						requestHeaders[name] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function (type) {
					if (!state) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function (map) {
					var code;
					if (map) {
						if (state < 2) {
							for (code in map) {
								// Lazy-add the new callback in a way that preserves old ones
								statusCode[code] = [statusCode[code], map[code]];
							}
						} else {
							// Execute the appropriate callbacks
							jqXHR.always(map[jqXHR.status]);
						}
					}
					return this;
				},

				// Cancel the request
				abort: function (statusText) {
					var finalText = statusText || strAbort;
					if (transport) {
						transport.abort(finalText);
					}
					done(0, finalText);
					return this;
				}
			};

		// Attach deferreds
		deferred.promise(jqXHR).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (#5866: IE7 issue with protocol-less urls)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ((url || s.url || ajaxLocation) + "").replace(rhash, "").replace(rprotocol, ajaxLocParts[1] + "//");

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim(s.dataType || "*").toLowerCase().match(rnotwhite) || [""];

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if (s.crossDomain == null) {
			parts = rurl.exec(s.url.toLowerCase());
			s.crossDomain = !!(parts &&
				(parts[1] !== ajaxLocParts[1] || parts[2] !== ajaxLocParts[2] ||
					(parts[3] || (parts[1] === "http:" ? "80" : "443")) !==
					(ajaxLocParts[3] || (ajaxLocParts[1] === "http:" ? "80" : "443")))
			);
		}

		// Convert data if not already a string
		if (s.data && s.processData && typeof s.data !== "string") {
			s.data = jQuery.param(s.data, s.traditional);
		}

		// Apply prefilters
		inspectPrefiltersOrTransports(prefilters, s, options, jqXHR);

		// If request was aborted inside a prefilter, stop there
		if (state === 2) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		fireGlobals = s.global;

		// Watch for a new set of requests
		if (fireGlobals && jQuery.active++ === 0) {
			jQuery.event.trigger("ajaxStart");
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test(s.type);

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if (!s.hasContent) {

			// If data is available, append data to url
			if (s.data) {
				cacheURL = (s.url += (rquery.test(cacheURL) ? "&" : "?") + s.data);
				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if (s.cache === false) {
				s.url = rts.test(cacheURL) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace(rts, "$1_=" + nonce++) :

					// Otherwise add one to the end
					cacheURL + (rquery.test(cacheURL) ? "&" : "?") + "_=" + nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if (s.ifModified) {
			if (jQuery.lastModified[cacheURL]) {
				jqXHR.setRequestHeader("If-Modified-Since", jQuery.lastModified[cacheURL]);
			}
			if (jQuery.etag[cacheURL]) {
				jqXHR.setRequestHeader("If-None-Match", jQuery.etag[cacheURL]);
			}
		}

		// Set the correct header, if data is being sent
		if (s.data && s.hasContent && s.contentType !== false || options.contentType) {
			jqXHR.setRequestHeader("Content-Type", s.contentType);
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[0] && s.accepts[s.dataTypes[0]] ?
				s.accepts[s.dataTypes[0]] + (s.dataTypes[0] !== "*" ? ", " + allTypes + "; q=0.01" : "") :
				s.accepts["*"]
		);

		// Check for headers option
		for (i in s.headers) {
			jqXHR.setRequestHeader(i, s.headers[i]);
		}

		// Allow custom headers/mimetypes and early abort
		if (s.beforeSend && (s.beforeSend.call(callbackContext, jqXHR, s) === false || state === 2)) {
			// Abort if not done already and return
			return jqXHR.abort();
		}

		// aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for (i in { success: 1, error: 1, complete: 1 }) {
			jqXHR[i](s[i]);
		}

		// Get transport
		transport = inspectPrefiltersOrTransports(transports, s, options, jqXHR);

		// If no transport, we auto-abort
		if (!transport) {
			done(-1, "No Transport");
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if (fireGlobals) {
				globalEventContext.trigger("ajaxSend", [jqXHR, s]);
			}
			// Timeout
			if (s.async && s.timeout > 0) {
				timeoutTimer = setTimeout(function () {
					jqXHR.abort("timeout");
				}, s.timeout);
			}

			try {
				state = 1;
				transport.send(requestHeaders, done);
			} catch (e) {
				// Propagate exception as error if not done
				if (state < 2) {
					done(-1, e);
					// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done(status, nativeStatusText, responses, headers) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if (state === 2) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if (timeoutTimer) {
				clearTimeout(timeoutTimer);
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if (responses) {
				response = ajaxHandleResponses(s, jqXHR, responses);
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert(s, response, jqXHR, isSuccess);

			// If successful, handle type chaining
			if (isSuccess) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if (s.ifModified) {
					modified = jqXHR.getResponseHeader("Last-Modified");
					if (modified) {
						jQuery.lastModified[cacheURL] = modified;
					}
					modified = jqXHR.getResponseHeader("etag");
					if (modified) {
						jQuery.etag[cacheURL] = modified;
					}
				}

				// if no content
				if (status === 204 || s.type === "HEAD") {
					statusText = "nocontent";

					// if not modified
				} else if (status === 304) {
					statusText = "notmodified";

					// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {
				// We extract error from statusText
				// then normalize statusText and status for non-aborts
				error = statusText;
				if (status || !statusText) {
					statusText = "error";
					if (status < 0) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = (nativeStatusText || statusText) + "";

			// Success/Error
			if (isSuccess) {
				deferred.resolveWith(callbackContext, [success, statusText, jqXHR]);
			} else {
				deferred.rejectWith(callbackContext, [jqXHR, statusText, error]);
			}

			// Status-dependent callbacks
			jqXHR.statusCode(statusCode);
			statusCode = undefined;

			if (fireGlobals) {
				globalEventContext.trigger(isSuccess ? "ajaxSuccess" : "ajaxError",
					[jqXHR, s, isSuccess ? success : error]);
			}

			// Complete
			completeDeferred.fireWith(callbackContext, [jqXHR, statusText]);

			if (fireGlobals) {
				globalEventContext.trigger("ajaxComplete", [jqXHR, s]);
				// Handle the global AJAX counter
				if (!(--jQuery.active)) {
					jQuery.event.trigger("ajaxStop");
				}
			}
		}

		return jqXHR;
	},

	getJSON: function (url, data, callback) {
		return jQuery.get(url, data, callback, "json");
	},

	getScript: function (url, callback) {
		return jQuery.get(url, undefined, callback, "script");
	}
});

jQuery.each(["get", "post"], function (i, method) {
	jQuery[method] = function (url, data, callback, type) {
		// shift arguments if data argument was omitted
		if (jQuery.isFunction(data)) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		return jQuery.ajax({
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		});
	};
});

// Attach a bunch of functions for handling common AJAX events
jQuery.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function (i, type) {
	jQuery.fn[type] = function (fn) {
		return this.on(type, fn);
	};
});


jQuery._evalUrl = function (url) {
	return jQuery.ajax({
		url: url,
		type: "GET",
		dataType: "script",
		async: false,
		global: false,
		"throws": true
	});
};


jQuery.fn.extend({
	wrapAll: function (html) {
		if (jQuery.isFunction(html)) {
			return this.each(function (i) {
				jQuery(this).wrapAll(html.call(this, i));
			});
		}

		if (this[0]) {
			// The elements to wrap the target around
			var wrap = jQuery(html, this[0].ownerDocument).eq(0).clone(true);

			if (this[0].parentNode) {
				wrap.insertBefore(this[0]);
			}

			wrap.map(function () {
				var elem = this;

				while (elem.firstChild && elem.firstChild.nodeType === 1) {
					elem = elem.firstChild;
				}

				return elem;
			}).append(this);
		}

		return this;
	},

	wrapInner: function (html) {
		if (jQuery.isFunction(html)) {
			return this.each(function (i) {
				jQuery(this).wrapInner(html.call(this, i));
			});
		}

		return this.each(function () {
			var self = jQuery(this),
				contents = self.contents();

			if (contents.length) {
				contents.wrapAll(html);

			} else {
				self.append(html);
			}
		});
	},

	wrap: function (html) {
		var isFunction = jQuery.isFunction(html);

		return this.each(function (i) {
			jQuery(this).wrapAll(isFunction ? html.call(this, i) : html);
		});
	},

	unwrap: function () {
		return this.parent().each(function () {
			if (!jQuery.nodeName(this, "body")) {
				jQuery(this).replaceWith(this.childNodes);
			}
		}).end();
	}
});


jQuery.expr.filters.hidden = function (elem) {
	// Support: Opera <= 12.12
	// Opera reports offsetWidths and offsetHeights less than zero on some elements
	return elem.offsetWidth <= 0 && elem.offsetHeight <= 0 ||
		(!support.reliableHiddenOffsets() &&
			((elem.style && elem.style.display) || jQuery.css(elem, "display")) === "none");
};

jQuery.expr.filters.visible = function (elem) {
	return !jQuery.expr.filters.hidden(elem);
};




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams(prefix, obj, traditional, add) {
	var name;

	if (jQuery.isArray(obj)) {
		// Serialize array item.
		jQuery.each(obj, function (i, v) {
			if (traditional || rbracket.test(prefix)) {
				// Treat each array item as a scalar.
				add(prefix, v);

			} else {
				// Item is non-scalar (array or object), encode its numeric index.
				buildParams(prefix + "[" + (typeof v === "object" ? i : "") + "]", v, traditional, add);
			}
		});

	} else if (!traditional && jQuery.type(obj) === "object") {
		// Serialize object item.
		for (name in obj) {
			buildParams(prefix + "[" + name + "]", obj[name], traditional, add);
		}

	} else {
		// Serialize scalar item.
		add(prefix, obj);
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function (a, traditional) {
	var prefix,
		s = [],
		add = function (key, value) {
			// If value is a function, invoke it and return its value
			value = jQuery.isFunction(value) ? value() : (value == null ? "" : value);
			s[s.length] = encodeURIComponent(key) + "=" + encodeURIComponent(value);
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if (traditional === undefined) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if (jQuery.isArray(a) || (a.jquery && !jQuery.isPlainObject(a))) {
		// Serialize the form elements
		jQuery.each(a, function () {
			add(this.name, this.value);
		});

	} else {
		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for (prefix in a) {
			buildParams(prefix, a[prefix], traditional, add);
		}
	}

	// Return the resulting serialization
	return s.join("&").replace(r20, "+");
};

jQuery.fn.extend({
	serialize: function () {
		return jQuery.param(this.serializeArray());
	},
	serializeArray: function () {
		return this.map(function () {
			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop(this, "elements");
			return elements ? jQuery.makeArray(elements) : this;
		})
			.filter(function () {
				var type = this.type;
				// Use .is(":disabled") so that fieldset[disabled] works
				return this.name && !jQuery(this).is(":disabled") &&
					rsubmittable.test(this.nodeName) && !rsubmitterTypes.test(type) &&
					(this.checked || !rcheckableType.test(type));
			})
			.map(function (i, elem) {
				var val = jQuery(this).val();

				return val == null ?
					null :
					jQuery.isArray(val) ?
						jQuery.map(val, function (val) {
							return { name: elem.name, value: val.replace(rCRLF, "\r\n") };
						}) :
						{ name: elem.name, value: val.replace(rCRLF, "\r\n") };
			}).get();
	}
});


// Create the request object
// (This is still attached to ajaxSettings for backward compatibility)
jQuery.ajaxSettings.xhr = window.ActiveXObject !== undefined ?
	// Support: IE6+
	function () {

		// XHR cannot access local files, always use ActiveX for that case
		return !this.isLocal &&

			// Support: IE7-8
			// oldIE XHR does not support non-RFC2616 methods (#13240)
			// See http://msdn.microsoft.com/en-us/library/ie/ms536648(v=vs.85).aspx
			// and http://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9
			// Although this check for six methods instead of eight
			// since IE also does not support "trace" and "connect"
			/^(get|post|head|put|delete|options)$/i.test(this.type) &&

			createStandardXHR() || createActiveXHR();
	} :
	// For all other browsers, use the standard XMLHttpRequest object
	createStandardXHR;

var xhrId = 0,
	xhrCallbacks = {},
	xhrSupported = jQuery.ajaxSettings.xhr();

// Support: IE<10
// Open requests must be manually aborted on unload (#5280)
if (window.ActiveXObject) {
	jQuery(window).on("unload", function () {
		for (var key in xhrCallbacks) {
			xhrCallbacks[key](undefined, true);
		}
	});
}

// Determine support properties
support.cors = !!xhrSupported && ("withCredentials" in xhrSupported);
xhrSupported = support.ajax = !!xhrSupported;

// Create transport if the browser can provide an xhr
if (xhrSupported) {

	jQuery.ajaxTransport(function (options) {
		// Cross domain only allowed if supported through XMLHttpRequest
		if (!options.crossDomain || support.cors) {

			var callback;

			return {
				send: function (headers, complete) {
					var i,
						xhr = options.xhr(),
						id = ++xhrId;

					// Open the socket
					xhr.open(options.type, options.url, options.async, options.username, options.password);

					// Apply custom fields if provided
					if (options.xhrFields) {
						for (i in options.xhrFields) {
							xhr[i] = options.xhrFields[i];
						}
					}

					// Override mime type if needed
					if (options.mimeType && xhr.overrideMimeType) {
						xhr.overrideMimeType(options.mimeType);
					}

					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if (!options.crossDomain && !headers["X-Requested-With"]) {
						headers["X-Requested-With"] = "XMLHttpRequest";
					}

					// Set headers
					for (i in headers) {
						// Support: IE<9
						// IE's ActiveXObject throws a 'Type Mismatch' exception when setting
						// request header to a null-value.
						//
						// To keep consistent with other XHR implementations, cast the value
						// to string and ignore `undefined`.
						if (headers[i] !== undefined) {
							xhr.setRequestHeader(i, headers[i] + "");
						}
					}

					// Do send the request
					// This may raise an exception which is actually
					// handled in jQuery.ajax (so no try/catch here)
					xhr.send((options.hasContent && options.data) || null);

					// Listener
					callback = function (_, isAbort) {
						var status, statusText, responses;

						// Was never called and is aborted or complete
						if (callback && (isAbort || xhr.readyState === 4)) {
							// Clean up
							delete xhrCallbacks[id];
							callback = undefined;
							xhr.onreadystatechange = jQuery.noop;

							// Abort manually if needed
							if (isAbort) {
								if (xhr.readyState !== 4) {
									xhr.abort();
								}
							} else {
								responses = {};
								status = xhr.status;

								// Support: IE<10
								// Accessing binary-data responseText throws an exception
								// (#11426)
								if (typeof xhr.responseText === "string") {
									responses.text = xhr.responseText;
								}

								// Firefox throws an exception when accessing
								// statusText for faulty cross-domain requests
								try {
									statusText = xhr.statusText;
								} catch (e) {
									// We normalize with Webkit giving an empty statusText
									statusText = "";
								}

								// Filter status for non standard behaviors

								// If the request is local and we have data: assume a success
								// (success with no data won't get notified, that's the best we
								// can do given current implementations)
								if (!status && options.isLocal && !options.crossDomain) {
									status = responses.text ? 200 : 404;
									// IE - #1450: sometimes returns 1223 when it should be 204
								} else if (status === 1223) {
									status = 204;
								}
							}
						}

						// Call complete if needed
						if (responses) {
							complete(status, statusText, responses, xhr.getAllResponseHeaders());
						}
					};

					if (!options.async) {
						// if we're in sync mode we fire the callback
						callback();
					} else if (xhr.readyState === 4) {
						// (IE6 & IE7) if it's in cache and has been
						// retrieved directly we need to fire the callback
						setTimeout(callback);
					} else {
						// Add to the list of active xhr callbacks
						xhr.onreadystatechange = xhrCallbacks[id] = callback;
					}
				},

				abort: function () {
					if (callback) {
						callback(undefined, true);
					}
				}
			};
		}
	});
}

// Functions to create xhrs
function createStandardXHR() {
	try {
		return new window.XMLHttpRequest();
	} catch (e) { }
}

function createActiveXHR() {
	try {
		return new window.ActiveXObject("Microsoft.XMLHTTP");
	} catch (e) { }
}




// Install script dataType
jQuery.ajaxSetup({
	accepts: {
		script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /(?:java|ecma)script/
	},
	converters: {
		"text script": function (text) {
			jQuery.globalEval(text);
			return text;
		}
	}
});

// Handle cache's special case and global
jQuery.ajaxPrefilter("script", function (s) {
	if (s.cache === undefined) {
		s.cache = false;
	}
	if (s.crossDomain) {
		s.type = "GET";
		s.global = false;
	}
});

// Bind script tag hack transport
jQuery.ajaxTransport("script", function (s) {

	// This transport only deals with cross domain requests
	if (s.crossDomain) {

		var script,
			head = document.head || jQuery("head")[0] || document.documentElement;

		return {

			send: function (_, callback) {

				script = document.createElement("script");

				script.async = true;

				if (s.scriptCharset) {
					script.charset = s.scriptCharset;
				}

				script.src = s.url;

				// Attach handlers for all browsers
				script.onload = script.onreadystatechange = function (_, isAbort) {

					if (isAbort || !script.readyState || /loaded|complete/.test(script.readyState)) {

						// Handle memory leak in IE
						script.onload = script.onreadystatechange = null;

						// Remove the script
						if (script.parentNode) {
							script.parentNode.removeChild(script);
						}

						// Dereference the script
						script = null;

						// Callback if not abort
						if (!isAbort) {
							callback(200, "success");
						}
					}
				};

				// Circumvent IE6 bugs with base elements (#2709 and #4378) by prepending
				// Use native DOM manipulation to avoid our domManip AJAX trickery
				head.insertBefore(script, head.firstChild);
			},

			abort: function () {
				if (script) {
					script.onload(undefined, true);
				}
			}
		};
	}
});




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup({
	jsonp: "callback",
	jsonpCallback: function () {
		var callback = oldCallbacks.pop() || (jQuery.expando + "_" + (nonce++));
		this[callback] = true;
		return callback;
	}
});

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter("json jsonp", function (s, originalSettings, jqXHR) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && (rjsonp.test(s.url) ?
			"url" :
			typeof s.data === "string" && !(s.contentType || "").indexOf("application/x-www-form-urlencoded") && rjsonp.test(s.data) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if (jsonProp || s.dataTypes[0] === "jsonp") {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction(s.jsonpCallback) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if (jsonProp) {
			s[jsonProp] = s[jsonProp].replace(rjsonp, "$1" + callbackName);
		} else if (s.jsonp !== false) {
			s.url += (rquery.test(s.url) ? "&" : "?") + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters["script json"] = function () {
			if (!responseContainer) {
				jQuery.error(callbackName + " was not called");
			}
			return responseContainer[0];
		};

		// force json dataType
		s.dataTypes[0] = "json";

		// Install callback
		overwritten = window[callbackName];
		window[callbackName] = function () {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always(function () {
			// Restore preexisting value
			window[callbackName] = overwritten;

			// Save back as free
			if (s[callbackName]) {
				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push(callbackName);
			}

			// Call if it was a function and we have a response
			if (responseContainer && jQuery.isFunction(overwritten)) {
				overwritten(responseContainer[0]);
			}

			responseContainer = overwritten = undefined;
		});

		// Delegate to script
		return "script";
	}
});




// data: string of html
// context (optional): If specified, the fragment will be created in this context, defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function (data, context, keepScripts) {
	if (!data || typeof data !== "string") {
		return null;
	}
	if (typeof context === "boolean") {
		keepScripts = context;
		context = false;
	}
	context = context || document;

	var parsed = rsingleTag.exec(data),
		scripts = !keepScripts && [];

	// Single tag
	if (parsed) {
		return [context.createElement(parsed[1])];
	}

	parsed = jQuery.buildFragment([data], context, scripts);

	if (scripts && scripts.length) {
		jQuery(scripts).remove();
	}

	return jQuery.merge([], parsed.childNodes);
};


// Keep a copy of the old load method
var _load = jQuery.fn.load;

/**
 * Load a url into a page
 */
jQuery.fn.load = function (url, params, callback) {
	if (typeof url !== "string" && _load) {
		return _load.apply(this, arguments);
	}

	var selector, response, type,
		self = this,
		off = url.indexOf(" ");

	if (off >= 0) {
		selector = jQuery.trim(url.slice(off, url.length));
		url = url.slice(0, off);
	}

	// If it's a function
	if (jQuery.isFunction(params)) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

		// Otherwise, build a param string
	} else if (params && typeof params === "object") {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if (self.length > 0) {
		jQuery.ajax({
			url: url,

			// if "type" variable is undefined, then "GET" method will be used
			type: type,
			dataType: "html",
			data: params
		}).done(function (responseText) {

			// Save response for use in complete callback
			response = arguments;

			self.html(selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery("<div>").append(jQuery.parseHTML(responseText)).find(selector) :

				// Otherwise use the full result
				responseText);

		}).complete(callback && function (jqXHR, status) {
			self.each(callback, response || [jqXHR.responseText, status, jqXHR]);
		});
	}

	return this;
};




jQuery.expr.filters.animated = function (elem) {
	return jQuery.grep(jQuery.timers, function (fn) {
		return elem === fn.elem;
	}).length;
};





var docElem = window.document.documentElement;

/**
 * Gets a window from an element
 */
function getWindow(elem) {
	return jQuery.isWindow(elem) ?
		elem :
		elem.nodeType === 9 ?
			elem.defaultView || elem.parentWindow :
			false;
}

jQuery.offset = {
	setOffset: function (elem, options, i) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css(elem, "position"),
			curElem = jQuery(elem),
			props = {};

		// set position first, in-case top/left are set even on static elem
		if (position === "static") {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css(elem, "top");
		curCSSLeft = jQuery.css(elem, "left");
		calculatePosition = (position === "absolute" || position === "fixed") &&
			jQuery.inArray("auto", [curCSSTop, curCSSLeft]) > -1;

		// need to be able to calculate position if either top or left is auto and position is either absolute or fixed
		if (calculatePosition) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;
		} else {
			curTop = parseFloat(curCSSTop) || 0;
			curLeft = parseFloat(curCSSLeft) || 0;
		}

		if (jQuery.isFunction(options)) {
			options = options.call(elem, i, curOffset);
		}

		if (options.top != null) {
			props.top = (options.top - curOffset.top) + curTop;
		}
		if (options.left != null) {
			props.left = (options.left - curOffset.left) + curLeft;
		}

		if ("using" in options) {
			options.using.call(elem, props);
		} else {
			curElem.css(props);
		}
	}
};

jQuery.fn.extend({
	offset: function (options) {
		if (arguments.length) {
			return options === undefined ?
				this :
				this.each(function (i) {
					jQuery.offset.setOffset(this, options, i);
				});
		}

		var docElem, win,
			box = { top: 0, left: 0 },
			elem = this[0],
			doc = elem && elem.ownerDocument;

		if (!doc) {
			return;
		}

		docElem = doc.documentElement;

		// Make sure it's not a disconnected DOM node
		if (!jQuery.contains(docElem, elem)) {
			return box;
		}

		// If we don't have gBCR, just use 0,0 rather than error
		// BlackBerry 5, iOS 3 (original iPhone)
		if (typeof elem.getBoundingClientRect !== strundefined) {
			box = elem.getBoundingClientRect();
		}
		win = getWindow(doc);
		return {
			top: box.top + (win.pageYOffset || docElem.scrollTop) - (docElem.clientTop || 0),
			left: box.left + (win.pageXOffset || docElem.scrollLeft) - (docElem.clientLeft || 0)
		};
	},

	position: function () {
		if (!this[0]) {
			return;
		}

		var offsetParent, offset,
			parentOffset = { top: 0, left: 0 },
			elem = this[0];

		// fixed elements are offset from window (parentOffset = {top:0, left: 0}, because it is its only offset parent
		if (jQuery.css(elem, "position") === "fixed") {
			// we assume that getBoundingClientRect is available when computed position is fixed
			offset = elem.getBoundingClientRect();
		} else {
			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if (!jQuery.nodeName(offsetParent[0], "html")) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top += jQuery.css(offsetParent[0], "borderTopWidth", true);
			parentOffset.left += jQuery.css(offsetParent[0], "borderLeftWidth", true);
		}

		// Subtract parent offsets and element margins
		// note: when an element has margin: auto the offsetLeft and marginLeft
		// are the same in Safari causing offset.left to incorrectly be 0
		return {
			top: offset.top - parentOffset.top - jQuery.css(elem, "marginTop", true),
			left: offset.left - parentOffset.left - jQuery.css(elem, "marginLeft", true)
		};
	},

	offsetParent: function () {
		return this.map(function () {
			var offsetParent = this.offsetParent || docElem;

			while (offsetParent && (!jQuery.nodeName(offsetParent, "html") && jQuery.css(offsetParent, "position") === "static")) {
				offsetParent = offsetParent.offsetParent;
			}
			return offsetParent || docElem;
		});
	}
});

// Create scrollLeft and scrollTop methods
jQuery.each({ scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function (method, prop) {
	var top = /Y/.test(prop);

	jQuery.fn[method] = function (val) {
		return access(this, function (elem, method, val) {
			var win = getWindow(elem);

			if (val === undefined) {
				return win ? (prop in win) ? win[prop] :
					win.document.documentElement[method] :
					elem[method];
			}

			if (win) {
				win.scrollTo(
					!top ? val : jQuery(win).scrollLeft(),
					top ? val : jQuery(win).scrollTop()
				);

			} else {
				elem[method] = val;
			}
		}, method, val, arguments.length, null);
	};
});

// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// getComputedStyle returns percent when specified for top/left/bottom/right
// rather than make the css module depend on the offset module, we just check for it here
jQuery.each(["top", "left"], function (i, prop) {
	jQuery.cssHooks[prop] = addGetHookIf(support.pixelPosition,
		function (elem, computed) {
			if (computed) {
				computed = curCSS(elem, prop);
				// if curCSS returns percentage, fallback to offset
				return rnumnonpx.test(computed) ?
					jQuery(elem).position()[prop] + "px" :
					computed;
			}
		}
	);
});


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each({ Height: "height", Width: "width" }, function (name, type) {
	jQuery.each({ padding: "inner" + name, content: type, "": "outer" + name }, function (defaultExtra, funcName) {
		// margin is only for outerHeight, outerWidth
		jQuery.fn[funcName] = function (margin, value) {
			var chainable = arguments.length && (defaultExtra || typeof margin !== "boolean"),
				extra = defaultExtra || (margin === true || value === true ? "margin" : "border");

			return access(this, function (elem, type, value) {
				var doc;

				if (jQuery.isWindow(elem)) {
					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement["client" + name];
				}

				// Get document width or height
				if (elem.nodeType === 9) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height], whichever is greatest
					// unfortunately, this causes bug #3838 in IE6/8 only, but there is currently no good, small way to fix it.
					return Math.max(
						elem.body["scroll" + name], doc["scroll" + name],
						elem.body["offset" + name], doc["offset" + name],
						doc["client" + name]
					);
				}

				return value === undefined ?
					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css(elem, type, extra) :

					// Set width or height on the element
					jQuery.style(elem, type, value, extra);
			}, type, chainable ? margin : undefined, chainable, null);
		};
	});
});


// The number of elements contained in the matched element set
jQuery.fn.size = function () {
	return this.length;
};

jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if (typeof define === "function" && define.amd) {
	define("jquery", [], function () {
		return jQuery;
	});
}




var
	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function (deep) {
	if (window.$ === jQuery) {
		window.$ = _$;
	}

	if (deep && window.jQuery === jQuery) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in
// AMD (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if (typeof noGlobal === strundefined) {
	window.jQuery = window.$ = jQuery;
}




return jQuery;

}));
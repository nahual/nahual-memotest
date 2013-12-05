const MAX_IMAGENES = 10;
const FICHA_OCULTA_SRC="img/Nahual.jpg";
const VELOCIDAD_EFECTO_SWAP=60;
const TIEMPO_EXPOSICION_TUPLA=1500;


function Ficha(imagen, posicion, tupla) {
    this.imagen = imagen;
    this.posicion = posicion;
    this.isFichaOculta = true;
    this.revelada = false;
    this.myDiv = null;
    this.tupla = tupla;
}

Ficha.prototype.paint = function($parent)
{
    var $divFicha = $("<div class='ficha'><img src='" + FICHA_OCULTA_SRC + "'></div>");
    this.myDiv = $divFicha;
    var self = this;
    $divFicha.click(function() {
        self.onclick();
    });
    $parent.append($divFicha);

};

Ficha.prototype.getTablero = function() {
    return this.tupla.getTablero();
}


Ficha.prototype.onclick = function() {
    if (!this.getTablero().bloqueado && !this.revelada) {
        this.swapImagen();

        if (this.getTablero().jugadaActual == null) {
            this.getTablero().newJugada(this);
            return;
        } else {
            if (this.getTablero().jugadaActual.ficha1 == this) {
                this.getTablero().jugadaActual = null;
            } else {
                this.getTablero().jugadaActual.ficha2 = this;
                var self = this;
                this.getTablero().bloqueado = true;
                setTimeout(function() {
                    self.getTablero().procesarJugada();
                    self.getTablero().bloqueado = false;
                    self.getTablero().procesarFinDelJuego();
                }, TIEMPO_EXPOSICION_TUPLA)
            }
        }

    }
}

//si ya está revelada, no hace nada
Ficha.prototype.swapImagen = function() {
    var self = this;
    if (this.isFichaOculta) {
        this.myDiv.find("img").fadeOut(VELOCIDAD_EFECTO_SWAP, function() {
            self.myDiv.find("img").attr("src", self.imagen);
        }).fadeIn(VELOCIDAD_EFECTO_SWAP);
    } else {
        this.myDiv.find("img").fadeOut(VELOCIDAD_EFECTO_SWAP, function() {
            self.myDiv.find("img").attr("src", FICHA_OCULTA_SRC);
        }).fadeIn(VELOCIDAD_EFECTO_SWAP);
    }
    this.isFichaOculta= !this.isFichaOculta;
}


function Tupla(idxImagen, pos1, pos2, tablero) {
    //una tupla va a tener dos posiciones en el tablero con la misma imágen
    var imagen = "img/" + (idxImagen + 1) + ".JPG";
    var preloadedImg = new Image();
    preloadedImg.src = imagen;
    this.ficha1= new Ficha(imagen, pos1, this);
    this.ficha2= new Ficha(imagen, pos2, this);
    this.tablero = tablero;
    this.idx = idxImagen;
    this.revelada = false;
}

Tupla.prototype.getTablero = function() {
    return this.tablero;
}

function Jugada(fichaInicial) {
    this.ficha1 = fichaInicial;
    this.ficha2 = null;
}

Jugada.prototype.procesarJugada = function() {
    if (this.ficha2 != null) {
        if (this.ficha1.tupla.idx != this.ficha2.tupla.idx) {
            this.swapFichas();
        } else {
            this.ficha1.revelada = true;
            this.ficha2.revelada = true;
            this.ficha1.tupla.revelada = true;
        }
    }
}

Jugada.prototype.swapFichas = function() {
    this.ficha1.swapImagen();
    this.ficha2.swapImagen();
}

function Tablero() {
    this.jugadaActual = null;
    this.tuplas=[];
    var posicionesDisponibles = initPosicionesDisponibles();

    //constructor
    for (var i=0; i < MAX_IMAGENES; i++) {
        var pos1 = getPosicionDisponible();
        var pos2 = getPosicionDisponible();
        this.tuplas.push(new Tupla(i, pos1, pos2, this));
    }


    function getPosicionDisponible() {
        var idx = getRandomInt(0, posicionesDisponibles.length - 1);
        var posicion = posicionesDisponibles[idx];
        posicionesDisponibles.splice(idx, 1);
        return posicion;
    }

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    function initPosicionesDisponibles() {
        var posicionesDisponibles = [];
        for (var i = 0; i < MAX_IMAGENES; i++) {
            posicionesDisponibles[i] = i;
            posicionesDisponibles[i + MAX_IMAGENES] = i + MAX_IMAGENES;
        }
        return posicionesDisponibles;
    }

}

Tablero.prototype.newJugada = function(ficha) {
    this.jugadaActual = new Jugada(ficha);
}

Tablero.prototype.procesarJugada = function() {
    this.jugadaActual.procesarJugada();
    if (this.jugadaActual.ficha2 != null) {
        this.jugadaActual = null;
    }
}

Tablero.prototype.procesarFinDelJuego = function() {
    for (var i=0; i < this.tuplas.length; i++ ) {
        if (!this.tuplas[i].revelada) {
            return false;
        }
    }
    $("#botonMezclar").show();
}

Tablero.prototype.paint = function()
{
    $(".fila").html("");

    var fichasOrdenadas = [];
    for (var i=0; i < this.tuplas.length; i++ ) {
        fichasOrdenadas[this.tuplas[i].ficha1.posicion] = this.tuplas[i].ficha1;
        fichasOrdenadas[this.tuplas[i].ficha2.posicion] = this.tuplas[i].ficha2;
    }

    for (var i = 0; i< fichasOrdenadas.length; i++ ) {
        var $memotestContainer = $("#fichasContainer");
        //imprimo filas
        var $filaParent = $memotestContainer.find("#fila" + ((i % 4)));
        fichasOrdenadas[i].paint($filaParent);
    }
};

function initMemotest() {
    var tablero = new Tablero();
    tablero.paint();
    $("#botonMezclar").click(function() {
        tablero = new Tablero();
        tablero.paint();
    });
}


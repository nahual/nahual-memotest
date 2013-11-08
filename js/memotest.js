const MAX_IMAGENES = 10;
const FICHA_OCULTA_SRC="img/Nahual.jpg";


function Ficha(idxImagen, posicion, tupla) {
    this.imagen = "img/" + (idxImagen + 1) + ".JPG";
    this.posicion = posicion;
    this.isFichaOculta = true;
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

Ficha.prototype.onclick = function() {
    debugger;
    if (this.isFichaOculta) {
        this.myDiv.find("img").attr("src", this.imagen);
    } else {
        this.myDiv.find("img").attr("src", FICHA_OCULTA_SRC);
    }
    this.isFichaOculta= !this.isFichaOculta;
}

function Tupla(idxImagen, pos1, pos2) {
    //una tupla va a tener dos posiciones en el tablero con la misma imágen
    this.ficha1= new Ficha(idxImagen, pos1, this);
    this.ficha2= new Ficha(idxImagen, pos2, this);
}

function Tablero() {

    this.tuplas=[];
    var posicionesDisponibles = initPosicionesDisponibles();

    //constructor
    for (var i=0; i < MAX_IMAGENES; i++) {
        var pos1 = getPosicionDisponible();
        var pos2 = getPosicionDisponible();
        this.tuplas.push(new Tupla(i, pos1, pos2));
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

Tablero.prototype.paint = function()
{
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
}


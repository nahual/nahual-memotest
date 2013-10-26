const MAX_IMAGENES = 10;


function Tupla(idxImagen, pos1, pos2) {
    //una tupla va a tener dos posiciones en el tablero con la misma imágen
    this.posicion1=pos1;
    this.posicion2=pos2;
    this.imagen= "../img/" + idxImagen + ".JPG";
}

Tupla.prototype.paint = function()
{

};

//REPENSAR POSICIONES DISPONIBLES
function Tablero() {

    this.tuplas=[];
    var posicionesDisponibles = initPosicionesDisponibles();

    //constructor
    for (var i=0; i < MAX_IMAGENES; i++) {
        this.tuplas.push(new Tupla(i, getPosicionDisponible(), getPosicionDisponible()));
    }

    function rearrangePosicionesDisponibles() {
        var newPosicionesDisponibles = [];
        var j = 0;
        for (var i=0; posicionesDisponibles < posicionesDisponibles.length; i++) {
            if (posicionesDisponibles[i]) {
                newPosicionesDisponibles[j] = posicionesDisponibles
            }
        }
    }

    function getPosicionDisponible() {
        debugger;
        var posicionDisponible = false;
        var posicion;
        while (!posicionDisponible) {
            posicion = getRandomInt(0, posicionesDisponibles.length);
            if (posicionesDisponibles[posicion]) {
                posicionDisponible = true;
                posicionesDisponibles[posicion] = false;
                posicionesDisponibles = rearrangePosicionesDisponibles();
            }
        }
        return posicion;
    }

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    function initPosicionesDisponibles() {
        var posicionesDisponibles = [];
        for (var i = 0; i < MAX_IMAGENES; i++) {
            posicionesDisponibles[i] = true;
            posicionesDisponibles[i + MAX_IMAGENES] = true;
        }
        return posicionesDisponibles;
    }

}

Tablero.prototype.paint = function()
{

    for (var i=0; i < this.tuplas.length; i++ ) {
        console.log("Posicion 1: " + this.tuplas[i].posicion1);
        console.log("Posicion 2: " + this.tuplas[i].posicion2);
    }
};

function initMemotest() {
    var tablero = new Tablero();
    tablero.paint();
}


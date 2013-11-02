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

function Tablero() {

    this.tuplas=[];
    var posicionesDisponibles = initPosicionesDisponibles();

    //constructor
    for (var i=0; i < MAX_IMAGENES; i++) {
        var pos1 = getPosicionDisponible();
        var pos2 = getPosicionDisponible();
        console.log(pos1 + " | " + pos2 + " | tupla: " + i);
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

    for (var i=0; i < this.tuplas.length; i++ ) {
        console.log("Posicion 1: " + this.tuplas[i].posicion1);
        console.log("Posicion 2: " + this.tuplas[i].posicion2);
    }
};

function initMemotest() {
    var tablero = new Tablero();
    tablero.paint();
}


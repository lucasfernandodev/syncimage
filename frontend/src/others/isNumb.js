export default function isNumb(texto) {
    var numeros = "0123456789";

    for (var i = 0; i < texto.length; i++) {
        if (numeros.indexOf(texto.charAt(i), 0) != -1) {
            return true;
        }
    }
    return false;
}
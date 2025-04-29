function sumar(){
    var n1 = parseFloat(document.getElementById("num1").value);
    var n2 = parseFloat(document.getElementById("num2").value);
    var resu1 = n1 + n2;
    document.getElementById("r").innerHTML = resu1;
}

function restar(){
    var n1 = parseFloat(document.getElementById("num1").value);
    var n2 = parseFloat(document.getElementById("num2").value);
    var resu1 = n1 - n2;
    document.getElementById("r").innerHTML = resu1;
}

function multiplicar(){
    var n1 = parseFloat(document.getElementById("num1").value);
    var n2 = parseFloat(document.getElementById("num2").value);
    var resu1 = n1 * n2;
    document.getElementById("r").innerHTML = resu1;
}

function dividir(){
    var n1 = parseFloat(document.getElementById("num1").value);
    var n2 = parseFloat(document.getElementById("num2").value);
    var resu1 = n2 !== 0 ? (n1 / n2) : "No se puede dividir entre cero";
    document.getElementById("r").innerHTML = resu1;
}

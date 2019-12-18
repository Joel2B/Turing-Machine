var cadena_global = '';
var estados_global = [];
var alfabeto_global = [];
var alfabeto_cinta_global = [];
var simbolo_vacio_global = '';
var estados_aceptacion_global = [];

var numero_instruccion = 0;

var maquina_corriendo = false;
var instruccion_actual = 0;
var instruccion_anterior = -1;
var estado_cinta = 1;
var mover_puntero = 0;
var estado = 0;

var eliminar_texto = true;

document.querySelector(".agregar").onclick = () => {

    if (maquina_corriendo) {
        aviso(false, 'La maquina está corriendo', 'Reinicie la maquina para agregar más instrucciones');
        return;
    }

    var cadena = document.querySelector("#cadena");
    var estados = document.querySelector("#estados");
    var alfabeto = document.querySelector("#alfabeto");
    var alfabeto_cinta = document.querySelector("#alfabeto_cinta");
    var simbolo_vacio = document.querySelector("#simbolo_vacio");
    var estados_aceptacion = document.querySelector("#estados_aceptacion");

    var condicion_busqueda = document.querySelector("#condicion_busqueda");
    var proximo_estado = document.querySelector("#proximo_estado");
    var nuevo_dato = document.querySelector("#nuevo_dato");
    var mover_puntero = document.querySelector("#mover_puntero");

    if (cadena.value == "") {
        cadena.style = "border: 1px solid #f00;";
    }

    if (estados.value == "") {
        estados.style = "border: 1px solid #f00;";
    }

    if (alfabeto.value == "") {
        alfabeto.style = "border: 1px solid #f00;";
    }

    if (alfabeto_cinta.value == "") {
        alfabeto_cinta.style = "border: 1px solid #f00;";
    }

    if (simbolo_vacio.value == "") {
        simbolo_vacio.style = "border: 1px solid #f00;";
    }

    if (estados_aceptacion.value == "") {
        estados_aceptacion.style = "border: 1px solid #f00;";
    }

    if (cadena.value == "" || estados.value == "" || alfabeto.value == "" || alfabeto_cinta.value == "" || simbolo_vacio.value == "" || estados_aceptacion.value == "") {
        return;
    }

    /****************************************************************/

    if (condicion_busqueda.value == "") {
        condicion_busqueda.style = "border: 1px solid #f00;";
    }

    if (proximo_estado.value == "") {
        proximo_estado.style = "border: 1px solid #f00;";
    }

    if (nuevo_dato.value == "") {
        nuevo_dato.style = "border: 1px solid #f00;";
    }

    if (mover_puntero.value == "") {
        mover_puntero.style = "border: 1px solid #f00;";
    }

    if (condicion_busqueda.value == "" || proximo_estado.value == "" || nuevo_dato.value == "" || mover_puntero.value == "") {
        return;
    }

    if (eliminar_texto) {
        document.querySelector("#data tbody").innerHTML = '';
        eliminar_texto = false;
    }

    cadena_global = cadena.value;
    estados_global = estados.value.split(',');
    alfabeto_global = alfabeto.value.split(',');
    alfabeto_cinta_global = alfabeto_cinta.value.split(',');
    simbolo_vacio_global = simbolo_vacio.value;
    estados_aceptacion_global = estados_aceptacion.value.split(',');

    reiniciar_cinta();

    /****************************************************************/

    var instruccion = condicion_busqueda.value + ', ' + proximo_estado.value + ', ' + nuevo_dato.value + ', ' + mover_puntero.value;
    document.querySelector("#data tbody").innerHTML += '<tr><td class="numero_instruccion"> <span>' + (numero_instruccion + 1) + '</span></td><td class="instruccion"> <input type="text" value="' + instruccion + '" readonly></td><td class="borrar"> <button data-borrar="' + (numero_instruccion++) + '" id="borrar"><img src="backspace-solid.svg"></button></td></tr>';
    condicion_busqueda.value = "";
    proximo_estado.value = "";
    nuevo_dato.value = "";
    mover_puntero.value = "";
}

function aviso(ocultar, info = '', resultado = '') {
    if (ocultar) {
        document.querySelector(".contenedor").style = '';
        document.querySelector(".avisos").classList.add('ocultar');
    } else {
        document.querySelector(".contenedor").style.filter = 'blur(1px)';
        document.querySelector(".avisos").classList.remove('ocultar');
        document.querySelector(".info").innerHTML = info;
        document.querySelector(".resultado").innerText = resultado;
    }
}

function reiniciar_cinta() {
    var primer_estado = false;
    document.querySelector(".cinta").innerHTML = "";
    document.querySelector(".cinta").innerHTML += '<span>' + document.querySelector("#simbolo_vacio").value + '</span>';
    for (let index = 0; index < cadena_global.length; index++) {
        document.querySelector(".cinta").innerHTML += '<span' + ((primer_estado == false) ? ' class="arrow"' : '') + '>' + cadena_global[index] + '</span>';
        primer_estado = true;
    }
    document.querySelector(".cinta").innerHTML += '<span>' + document.querySelector("#simbolo_vacio").value + '</span>';
}

document.querySelector(".contenedor_info button").onclick = () => {
    aviso(true);
}

document.querySelector("#borrar").onclick = () => {
    window.location.reload();
}

document.querySelector("#reiniciar").onclick = () => {

    if (numero_instruccion == 0) {
        return;
    }

    document.querySelectorAll(".cinta span")[estado_cinta].classList.remove('arrow');
    document.querySelectorAll(".cinta span")[1].classList.add('arrow');

    document.querySelectorAll("#data tr")[instruccion_anterior].style.border = "";

    reiniciar_cinta();

    maquina_corriendo = false;
    instruccion_actual = 0;
    instruccion_anterior = -1;
    estado_cinta = 1;
    mover_puntero = 0;
    estado = 0;
}

document.querySelector(".simbolos button").onclick = () => {
    aviso(
        false, '<center>MAQUINA DE TURING</center>',
        'Participantes:\n' +
        '1.- Abraham Jesus (Ideas)\n' +
        '2.- Daniel Francisco (Apoyo)\n' +
        '3.- Joel Ivan (Codificación)\n' +
        '4.- Jose Carlos (Ideas)\n' +
        '5.- Jose Pablo (Ideas)\n' +
        'Grupo: 2-01\n' +
        '4.- \n'
        );
}

document.querySelector("#siguiente").onclick = () => {
    if (numero_instruccion == 0) {
        return;
    }

    maquina_corriendo = true;

    for (let index = 0; index < document.querySelectorAll("#data tr").length; index++) {
        if (instruccion_anterior != -1) {
            document.querySelectorAll("#data tr")[instruccion_anterior].style.border = "";
        }
        var data = document.querySelectorAll("#data tr")[index].querySelector(".instruccion input").value.split(',');
        var condicion = data[0].trim();
        if (condicion == document.querySelectorAll(".cinta span")[estado_cinta].innerText) {

            instruccion_actual++;
            instruccion_anterior = index;
            document.querySelectorAll("#data tr")[index].style.border = "1px solid #00f";

            var siguiente_estado = data[1].trim();
            var remplazar_valor = data[2].trim();
            mover_puntero = data[3].trim();

            estado = siguiente_estado;

            if (estados_aceptacion_global.includes(estado)) {
                aviso(false, 'Fin de las instrucciones', 'Se acepto la cadena: ' + document.querySelector("#cadena").value);
            }
            document.querySelector(".estado span").innerText = estado;
            document.querySelectorAll(".cinta span")[estado_cinta].innerText = remplazar_valor;

            document.querySelectorAll(".cinta span")[estado_cinta].classList.remove('arrow');

            if (mover_puntero == 'R') {
                estado_cinta++;
            } else {
                estado_cinta--;
            }

            document.querySelectorAll(".cinta span")[estado_cinta].classList.add('arrow');

            return;
        }

    }
    if (document.querySelectorAll(".cinta span")[estado_cinta].innerText == document.querySelector("#simbolo_vacio").value && mover_puntero == 'R') {
        aviso(false, 'Fin de la maquina', 'Se llego a un simbolo de vacío: ' + document.querySelector("#simbolo_vacio").value);
        return;
    }
    aviso(false, 'Ninguna instruccion coincidio', 'No se acepto la cadena: ' + document.querySelector("#cadena").value);
}

document.querySelector("#cadena").onkeyup = () => {
    if (document.querySelector("#cadena").value != "") {
        document.querySelector("#cadena").style = "border: 1px solid #fff;";
    } else {
        cadena.style = "border: 1px solid #f00;";
    }
}

document.querySelector("#estados").onkeyup = () => {
    if (document.querySelector("#estados").value != "") {
        document.querySelector("#estados").style = "border: 1px solid #fff;";
    } else {
        estados.style = "border: 1px solid #f00;";
    }
}

document.querySelector("#alfabeto").onkeyup = () => {
    if (document.querySelector("#alfabeto").value != "") {
        document.querySelector("#alfabeto").style = "border: 1px solid #fff;";
    } else {
        alfabeto.style = "border: 1px solid #f00;";
    }
}

document.querySelector("#alfabeto_cinta").onkeyup = () => {
    if (document.querySelector("#alfabeto_cinta").value != "") {
        document.querySelector("#alfabeto_cinta").style = "border: 1px solid #fff;";
    } else {
        alfabeto_cinta.style = "border: 1px solid #f00;";
    }
}

document.querySelector("#simbolo_vacio").onkeyup = () => {
    if (document.querySelector("#simbolo_vacio").value != "") {
        document.querySelector("#simbolo_vacio").style = "border: 1px solid #fff;";
    } else {
        simbolo_vacio.style = "border: 1px solid #f00;";
    }
}

document.querySelector("#estados_aceptacion").onkeyup = () => {
    if (document.querySelector("#estados_aceptacion").value != "") {
        document.querySelector("#estados_aceptacion").style = "border: 1px solid #fff;";
    } else {
        estados_aceptacion.style = "border: 1px solid #f00;";
    }
}

/****************************************************************/

document.querySelector("#condicion_busqueda").onkeyup = () => {
    if (document.querySelector("#condicion_busqueda").value != "") {
        document.querySelector("#condicion_busqueda").style = "border: 1px solid #fff;";
    } else {
        condicion_busqueda.style = "border: 1px solid #f00;";
    }
}

document.querySelector("#proximo_estado").onkeyup = () => {
    if (document.querySelector("#proximo_estado").value != "") {
        document.querySelector("#proximo_estado").style = "border: 1px solid #fff;";
    } else {
        proximo_estado.style = "border: 1px solid #f00;";
    }
}

document.querySelector("#nuevo_dato").onkeyup = () => {
    if (document.querySelector("#nuevo_dato").value != "") {
        document.querySelector("#nuevo_dato").style = "border: 1px solid #fff;";
    } else {
        nuevo_dato.style = "border: 1px solid #f00;";
    }
}

document.querySelector("#mover_puntero").onkeyup = () => {
    document.querySelector("#mover_puntero").style = "border: 1px solid #fff;";
    if (/r/.test(event.key)) {
        document.querySelector("#mover_puntero").value = 'R';
    } else if (/l/.test(event.key)) {
        document.querySelector("#mover_puntero").value = 'L';
    } else {
        document.querySelector("#mover_puntero").value = 'R';
    }
}

/****************************************************************/

document.querySelector("#data tbody").onclick = (e) => {
    console.log(e.srcElement.parentNode.tagName);
    if (e.srcElement.parentNode.tagName == "BUTTON") {
        for (let index = 0; index < document.querySelectorAll("#data tr").length; index++) {
            if (document.querySelectorAll("#data tr")[index].querySelector(".borrar").querySelector("button").dataset.borrar == e.srcElement.parentNode.dataset.borrar) {
                document.querySelectorAll("#data tr")[index].remove();
            }
        }
    }
};



cache1 = "";
cache2 = "";

showText = false;

targetNode = document.querySelector("#movie_player");

 config = { attributes: true, childList: true, subtree: true };

 callback = function(mutationsList, observer) {
    for (let mutation of mutationsList) {
        let text = mutation.target.innerText;
        if (mutation.type === 'childList' && mutation.target.className == "ytp-caption-segment") {
            if (cache2 == "") {
                cache2 = text;
            } else {
                if (RegExp(cache2).test(text)) {
                    cache2 = text;
                } else {
                    if (!RegExp('^' + cache2).test(text)) {
                        cache1 = cache2;
                        cache2 = text;
                        showText = true;
                    }
                }
            }
        }
        if (showText) {
            console.clear();
            console.log(cache1);
            console.log(cache2);
            showText = false;
        }

    }
};

observer = new MutationObserver(callback);

observer.observe(targetNode, config);





targetNode2 = document.querySelectorAll(".ytp-caption-segment")[1];

 config2 = { attributes: true, childList: true, subtree: true };

 callback2 = function(mutationsList, observer2) {
    for(let mutation of mutationsList) {
        if (mutation.type === 'childList') {
            console.log(mutation.target.innerText + " 2");
        }
    }
};

observer2 = new MutationObserver(callback2);

observer2.observe(targetNode2, config2);
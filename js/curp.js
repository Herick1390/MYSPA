const VOWELS = "AEIOU";
const PALABRAS_SOECES = ["BACA", "BAKA", "BUEI", "BUEY", "CACA", "CACO", "CAGA", "CAGO", "CAKA", "CAKO", "COGE", "COGI", "COJA", "COJE", "COJI", "COJO", "COLA", "CULO", "FALO", "FETO", "GETA", "GUEI", "GUEY", "JETA", "JOTO", "KACA", "KACO", "KAGA", "KAGO", "KAKA", "KAKO", "KOGE", "KOGI", "KOJA", "KOJE", "KOJI", "KOJO", "KOLA", "KULO", "LILO", "LOCA", "LOCO", "LOKA", "LOKO", "MAME", "MAMO", "MEAR", "MEAS", "MEON", "MIAR", "MION", "MOCO", "MOKO", "MULA", "MULO", "NACA", "NACO", "PEDA", "PEDO", "PENE", "PIPI", "PITO", "POPO", "PUTA", "PUTO", "QULO", "RATA", "ROBA", "ROBE", "ROBO", "RUIN", "SENO", "TETA", "VACA", "VAGA", "VAGO", "VAKA", "VUEI", "VUEY", "WUEI", "WUEY"];

function getCurp() {
    const NOMBRE = document.getElementById("txtNombre").value.toUpperCase();
    const APELLIDO_P = document.getElementById("txtApP").value.toUpperCase();
    const APELLIDO_M = document.getElementById("txtApM").value.toUpperCase();
    const SEXO = document.querySelector('input[name="rbtSexo"]:checked').value;
    const ESTADO = document.getElementById("lstEstado").value;
    const DATE_OF_BIRTH = document.getElementById("datFechaN").value;
    const CURP_RESULT = document.getElementById("CURP");

    const CURP = normalizeCurp(String().concat(
        APELLIDO_P[0], // Obtenemos la primera letra del apellido paterno
        getFirstVowel(APELLIDO_P), // Obtenemos la primera vocal del primer apellido
        APELLIDO_M[0], // Obtenemos la primera letra del segundo apellido
        getFirstNameLetter(NOMBRE), // Obtenemos la primera letra del nombre
        // Obtenemos la fecha de nacimiento quitando los '-' y los primeros 2 caracteres del año
        DATE_OF_BIRTH.replaceAll('-', '').slice(2),
        SEXO, // Obtenemos la letra del sexo hombre (H), mujer (M)
        ESTADO, // Obtenemos el código del estado
        getFirstConsonant(APELLIDO_P), // Obtenemos la primera consonante del primer apellido
        getFirstConsonant(APELLIDO_M), // Obtenemos la primera consonante del segundo apellido
        getFirstConsonant(NOMBRE), // Obtenemos la primera consonante del nombre
        getClave(DATE_OF_BIRTH)
    ));

    CURP_RESULT.textContent = CURP;
}

function getFirstNameLetter(name) {
    const NAMES = name.split(' ');
    let firstLetter = NAMES[0][0];
    if (NAMES.length > 1 && (NAMES[0] === "MARIA" || NAMES[0] === "JOSE" || "MARÍA" || "JOSÉ")) {
        firstLetter = NAMES[1][0];
    } return firstLetter
}

function getFirstVowel(string) {
    const SUBSTRING = string.slice(1); // Quitamos la primera letra
    for (let i in SUBSTRING) { // Recorremos la cadena
        if (VOWELS.includes(SUBSTRING[i])) { // El carácter en i se encuentra en las vocales?
            return SUBSTRING[i];
        }
    }
}

function getFirstConsonant(string) {
    const SUBSTRING = string.slice(1) // Quitamos la primera letra
    for (let i in SUBSTRING) {
        if (!VOWELS.includes(SUBSTRING[i])) { // EL carácter en i NO se encuentra en las vocales?
            return SUBSTRING[i];
        }
    }
}

function getClave(dateOfBirth) {
    const YEAR_OF_BIRTH = parseInt(dateOfBirth.split('-')[0]) // Obtenemos el año a partir de la fecha de nacimiento
    if (YEAR_OF_BIRTH < 2000) {
        return String().concat(
            Math.floor(Math.random() * 10), //Generamos el primer dígito aleatorio entre 0-9
            Math.floor(Math.random() * 10) // Generamos el segundo dígito aleatorio entre 0-9
        );
    } else {
        return String().concat(
            //Generamos una letra entre A-Z mediante el método estático fromCharCode de string el cuál recibe como parámetro un número que representa el carácter en UTF-16. Para ello generamos un dígito aleatorio entre 65 - 90 (A-Z) en UTF-16 
            String.fromCharCode(Math.floor(Math.random() * (91 - 65) + 65)),
            Math.floor(Math.random() * 10) //Generamos un dígito aleatorio
        );
    }
}

function normalizeCurp(curp) {
    const SOEZ = curp.slice(0, 4)
    let normalizedCurp = curp.replaceAll("Ñ", "X");
    if (PALABRAS_SOECES.includes(SOEZ)) {
        normalizedCurp = String().concat(normalizedCurp[0], "X", normalizedCurp.slice(2));
    }
    return normalizedCurp;
}

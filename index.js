const form = document.querySelector("form");
// Sélection de tous les inputs de notre form
const inputs = document.querySelectorAll(
    'input[type="text"], input[type="password"]'
);
//console.log(inputs);

const progressBar = document.getElementById("progress-bar");

// Variables pour stocker les entrées
let pseudo, email, password, confirmPass;

// Function erreur Display
const errorDisplay = (tag, message, valid) => {
    const container = document.querySelector("." + tag + "-container");
    const span = document.querySelector("." + tag + "-container > span");

    if (!valid) {
        container.classList.add("error");
        span.textContent = message;
    } else {
        container.classList.remove("error");
        span.textContent = message;
    }
};

// Déclaration des fonctions checkers des 4 inputs
const pseudoChecker = (value) => {
  //console.log(value);
    if (value.length > 0 && (value.length < 3 || value.length > 20)) {
        errorDisplay("pseudo", "Le pseudo doit faire entre 3 et 20 caractères");
        pseudo = null;
    } else if (!value.match(/^[a-zA-Z0-9_.-]*$/)) {
        errorDisplay(
        "pseudo",
        "Le pseudo ne doiyt pas contenir de caractères spéciaux"
        );
        pseudo = null;
    } else {
        errorDisplay("pseudo", "", true);
        pseudo = value;
    }
};

const emailChecker = (value) => {
    if (!value.match(/^[\w_-]+@[\w-]+\.[a-z]{2,4}$/i)) {
        errorDisplay("email", "Le mail que vous avez entré, n'est pas valide");
        email = null;
    } else {
        errorDisplay("email", "", true);
        email = value;
    }
};

const passwordChecker = (value) => {
    progressBar.classList = "";

    if (
    !value.match(/^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/)
    ) {
    errorDisplay(
        "password",
        "Minimum de 8 caractères, une majuscule, un chiffre et un caractère spécial"
    );
    progressBar.classList.add("progressRed");
    password = null;
    } else if (value.length < 12) {
    progressBar.classList.add("progressBlue");
    errorDisplay("password", "", true);
    password = value;
    } else {
    progressBar.classList.add("progressGreen");
    errorDisplay("password", "", true);
    password = value;
    }
    if (confirmPass) confirmChecker(confirmPass);
};

const confirmChecker = (value) => {
    if (value !== password) {
        errorDisplay("confirm", "Les mots de passe ne correspondent pas");
        confirmPass = false;
    } else {
        errorDisplay("confirm", "", true);
        confirmPass = true;
    }
};

// Pour écouter tous les inputs et ne pas les faires les uns après les autres
inputs.forEach((input) => {
    input.addEventListener("input", (e) => {
        //console.log(e.target.id);
        // Voir dans quel input se trouve le user afin de lancer la fonction correspondante
        switch (e.target.id) {
        case "pseudo":
            pseudoChecker(e.target.value);
            break;
        case "email":
            emailChecker(e.target.value);
            break;
        case "password":
            passwordChecker(e.target.value);
            break;
        case "confirm":
            confirmChecker(e.target.value);
            break;
        default:
            null;
        }
    });
});

form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (pseudo && email && password && confirmPass) {
        const data = {
        pseudo,
        email,
        password,
        };
        console.log(data);

        inputs.forEach((input) => (input.value = ""));
        progressBar.classList = "";

        pseudo = null;
        email = null;
        password = null;
        confirmPass = null;
        alert("Inscription validée !");
    } else {
        alert("veuillez remplir correctement les champs");
    }
});

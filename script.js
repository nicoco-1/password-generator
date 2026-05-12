// Elementos del DOM
const passwordInput = document.getElementById('password');
const generateBtn = document.getElementById('generateBtn');
const copyBtn = document.getElementById('copyBtn');
const lengthSlider = document.getElementById('length');
const lengthNumber = document.getElementById('lengthNumber');
const lengthValue = document.getElementById('lengthValue');
const uppercaseCheck = document.getElementById('uppercase');
const lowercaseCheck = document.getElementById('lowercase');
const numbersCheck = document.getElementById('numbers');
const symbolsCheck = document.getElementById('symbols');
const strengthBar = document.getElementById('strengthBar');
const strengthText = document.getElementById('strength');

// Caracteres disponibles
const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
const numberChars = '0123456789';
const symbolChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';

// Sincronizar slider y número
lengthSlider.addEventListener('input', function() {
    console.log('Slider movido a:', this.value);
    lengthNumber.value = this.value;
    lengthValue.textContent = this.value;
    generatePassword();
});

lengthNumber.addEventListener('input', function() {
    console.log('Número cambiado a:', this.value);
    lengthSlider.value = this.value;
    lengthValue.textContent = this.value;
    generatePassword();
});

// Generar contraseña
generateBtn.addEventListener('click', function() {
    console.log('Botón generar clickeado');
    generatePassword();
});

// Copiar al portapapeles
copyBtn.addEventListener('click', async function() {
    console.log('Botón copiar clickeado');
    if (passwordInput.value) {
        try {
            await navigator.clipboard.writeText(passwordInput.value);
            copyBtn.textContent = '✅ ¡Copiado!';
            setTimeout(function() {
                copyBtn.textContent = '📋 Copiar';
            }, 2000);
        } catch (err) {
            console.error('Error al copiar:', err);
            alert('Error al copiar: ' + err);
        }
    }
});

// Generar contraseña cuando cambien los checkboxes
uppercaseCheck.addEventListener('change', generatePassword);
lowercaseCheck.addEventListener('change', generatePassword);
numbersCheck.addEventListener('change', generatePassword);
symbolsCheck.addEventListener('change', generatePassword);

function generatePassword() {
    console.log('Generando contraseña...');
    
    let characters = '';
    
    // Obtener caracteres según las opciones
    if (uppercaseCheck.checked) {
        characters += uppercaseChars;
        console.log('Añadidos: Mayúsculas');
    }
    if (lowercaseCheck.checked) {
        characters += lowercaseChars;
        console.log('Añadidos: Minúsculas');
    }
    if (numbersCheck.checked) {
        characters += numberChars;
        console.log('Añadidos: Números');
    }
    if (symbolsCheck.checked) {
        characters += symbolChars;
        console.log('Añadidos: Símbolos');
    }
    
    // Validar que al menos un tipo esté seleccionado
    if (characters.length === 0) {
        console.log('Error: No hay caracteres seleccionados');
        passwordInput.value = '⚠️ Selecciona al menos una opción';
        updateStrength(0);
        return;
    }
    
    const length = parseInt(lengthSlider.value);
    console.log('Longitud de contraseña:', length);
    console.log('Caracteres disponibles:', characters.length);
    
    let password = '';
    
    // Generar contraseña aleatoria
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        password += characters[randomIndex];
    }
    
    console.log('Contraseña generada:', password);
    passwordInput.value = password;
    updateStrength(calculateStrength(password));
}

function calculateStrength(password) {
    let strength = 0;
    
    // Longitud
    if (password.length >= 8) strength += 20;
    if (password.length >= 12) strength += 20;
    if (password.length >= 16) strength += 20;
    
    // Tipos de caracteres
    if (/[a-z]/.test(password)) strength += 10;
    if (/[A-Z]/.test(password)) strength += 10;
    if (/[0-9]/.test(password)) strength += 10;
    if (/[^a-zA-Z0-9]/.test(password)) strength += 10;
    
    strength = Math.min(strength, 100);
    console.log('Fortaleza calculada:', strength);
    
    return strength;
}

function updateStrength(strength) {
    strengthBar.classList.remove('weak', 'medium', 'good', 'very-strong');
    
    if (strength <= 25) {
        strengthBar.classList.add('weak');
        strengthText.textContent = '🔴 Débil';
    } else if (strength <= 50) {
        strengthBar.classList.add('medium');
        strengthText.textContent = '🟡 Media';
    } else if (strength <= 75) {
        strengthBar.classList.add('good');
        strengthText.textContent = '🟢 Buena';
    } else {
        strengthBar.classList.add('very-strong');
        strengthText.textContent = '💪 Muy Fuerte';
    }
    
    strengthBar.style.width = strength + '%';
}

// Generar una contraseña al cargar la página
console.log('Página cargada, generando primera contraseña...');
generatePassword();

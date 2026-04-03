import secrets
import string


def generar_contraseña(longitud, usar_mayusculas, usar_numeros, usar_simbolos):
 caracteres = string.ascii_lowercase
 if usar_mayusculas:
    caracteres += string.ascii_uppercase
 if usar_numeros:
    caracteres += string.digits
 if usar_simbolos:
    caracteres += string.punctuation
 contraseña = ''.join(secrets.choice(caracteres) for _ in range(longitud))
 return contraseña

def main():
   print("=== Generador de contraseñas seguras ===")
   longitud = int(input("Ingrese la longitud de la contraseña: "))
   usar_mayusculas = input("Incluir mayúsculas? (s/n): ").lower() == 's'
   usar_numeros = input("Incluir números? (s/n): ").lower() == 's'
   usar_simbolos = input("Incluir símbolos? (s/n): ").lower() == 's'
   contraseña_generada = generar_contraseña(longitud, usar_mayusculas, usar_numeros, usar_simbolos)
   print("\n Tu contraseña segura es:")
   print(contraseña_generada)


if __name__ == "__main__":
   main()
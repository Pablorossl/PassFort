
                                             #Módulos
import generador
import validador as validador
import time


                                    #inicialización de variables
mayusculas = True
numeros = True
simbolos = True


def generacion_de_contrasena():
        print("Generando contraseña...")
        time.sleep(2)
        contrasena = generador.generar_contrasena(longitud, mayusculas, numeros, simbolos)
        print("Contraseña generada:", contrasena)
        time.sleep(1)
        return contrasena

                                        #Menu interactivo

print("¡Bienvenido a PassFort!")
time.sleep(2)

continuar = True
while continuar:
    corta = True
    while corta:
        longitud = int(input("\nIndique la longitud:"))
        if longitud >= 5:
            corta = False
        else:
            print("Demasiado corta! La longitud minima es de 5 caracteres")

    print("Desea añadir mayusculas?(s/n)")
    respuesta = input()
    if respuesta == "n":
        mayusculas = False
   
    print("Desea añadir números?(s/n)")
    respuesta = input()
    if respuesta == "n":
        numeros = False

    print("Desea añadir caracteres especiales?(s/n)")
    respuesta = input()
    if respuesta == "n":
        simbolos = False
   
    contrasena = generacion_de_contrasena()

    respuesta = input("Desea comprobar la seguridad de la contraseña generada? (s/n):")
    if respuesta == "s":
        validacion = validador.validar_contrasena(contrasena)
        print(validacion)
    if respuesta == "n":
        break

    repetir = input("Desea generar una nueva contraseña? (s/n):")
    if repetir == "s":
        time.sleep(2)
        contrasena = generador.generar_contrasena(longitud, mayusculas, numeros, simbolos)

    if repetir == "n":
        print("Cerrando programa...")
        break

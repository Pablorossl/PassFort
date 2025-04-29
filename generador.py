                                #Importación de módulos
import secrets
import string

                                #Generador de contraseñas
def generar_contrasena(longitud, usar_mayusculas, usar_numeros, usar_simbolos):
    
    caracteres = string.ascii_lowercase  

    if usar_mayusculas:
        caracteres += string.ascii_uppercase  
    
    if usar_numeros:
        caracteres += string.digits  
    
    if usar_simbolos:
        caracteres += string.punctuation  


    contrasena = ''.join(secrets.choice(caracteres) for _ in range(longitud)) #*1
    return contrasena


                                    #Futuras mejoras
#*1 Añadir palabra elegida por el usuario y mejora alrededor usando enumerate
#For index ,letra in enumerate(contrasena):
    #if longitud / 2 > index
        #añadir palabra del usuario
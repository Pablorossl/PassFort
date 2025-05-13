
                                        #Importación de módulos
import string


                                        #Validador de contraseñas
def validar_contrasena(contrasena):
    tiene_mayuscula = False
    tiene_digitos = False
    tiene_simbolos = False


                        #Recorrer la contraseña para las condiciones

    for letra in contrasena:
        if letra in string.ascii_uppercase:
            tiene_mayuscula = True

        if letra in string.digits:
            tiene_digitos = True

        if letra in string.punctuation:
            tiene_simbolos = True

    

                #Condiciones para la información de la seguridad de contraseña
                
    if len(contrasena) >= 15:
        if tiene_mayuscula and tiene_digitos and tiene_simbolos:
            return "Nivel de seguridad: Muy alto"
        if tiene_digitos and tiene_simbolos or tiene_mayuscula and tiene_simbolos or tiene_digitos and tiene_mayuscula:
            return "Nivel de seguridad: Alto"
        if tiene_digitos or tiene_simbolos or tiene_mayuscula:
            return "Nivel de seguridad: Medio-Alto"
        else:
            return "Nivel de seguridad: Medio"
        
    if len(contrasena) >= 12:
        if tiene_mayuscula and tiene_digitos and tiene_simbolos:
            return "Nivel de seguridad: Alto"
        if tiene_digitos and tiene_simbolos or tiene_mayuscula and tiene_simbolos or tiene_digitos and tiene_mayuscula:
            return "Nivel de seguridad: Medio-Alto"
        if tiene_digitos or tiene_simbolos or tiene_mayuscula:
            return "Nivel de seguridad: Medio"
        else:
            return "Nivel de seguridad: Medio-Bajo"
        
        
    if len(contrasena) >= 7:
        if tiene_mayuscula and tiene_digitos and tiene_simbolos:
            return "Nivel de seguridad: Medio-Alto"
        if tiene_digitos and tiene_simbolos or tiene_mayuscula and tiene_simbolos or tiene_digitos and tiene_mayuscula:
            return "Nivel de seguridad: Medio"
        if tiene_digitos or tiene_simbolos or tiene_mayuscula:
            return "Nivel de seguridad: Medio-Bajo"
        else:
            return "Nivel de seguridad: Bajo"
    
    else:
        return "Menos de 7 digitos es una contraseña corta en terminos de seguridad"
    


        

    
        

    





    

   
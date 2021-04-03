using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Threading.Tasks;

namespace Huerbog.Utils
{
    public class common
    {
        /*Función para crear una cadena aleatoria de SALT
        SALT es una técnica para proteger contraseñas y evitar ataques de fuerza bruta
        es decir que uno o varios usuarios introduzcan todas las combinaciones posibles para 
        averiguar una contraseña.
         */

        public static byte[] GetRandomSalt(int length)
        {
            var random = new RNGCryptoServiceProvider();

            byte[] salt = new byte[length];

            random.GetNonZeroBytes(salt);

            return salt;
        }

        //Función para crear la contraseña con SALT

        public static byte[] SaltHashPassword(byte[] contraseña, byte[] salt)
        {
            HashAlgorithm algorithm = new SHA256Managed();

            byte[] plainTextWithSaltBytes = new byte[contraseña.Length + salt.Length];

            for(int i = 0; i < contraseña.Length; i++)
            {
                plainTextWithSaltBytes[i] = contraseña[i];
            }

            for(int i = 0; i < salt.Length; i++)
            {
                plainTextWithSaltBytes[contraseña.Length + i] = salt[i];
            }

            return algorithm.ComputeHash(plainTextWithSaltBytes);
        }
    }
}

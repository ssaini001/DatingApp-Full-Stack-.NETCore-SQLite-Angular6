using System;
using Microsoft.AspNetCore.Http;

namespace DatingApp.API.Helpers
{
    public static class Extensions
    {
        public static void AddApplicationError(this HttpResponse response, string message)
        {
            response.Headers.Add("Application-Error",message);                              //this will add error header
            response.Headers.Add("Access-Control-Expose-Headers","Application-Error");      // this will allow the header to show in the response header
            response.Headers.Add("Access-Control-Allow-Origin","*");                        // this will elminate the wierd HTTP error message in client side module
        }

        public static int CalculateAge(this DateTime theDateTime)
        {
            var age = DateTime.Today.Year-theDateTime.Year;
            if(theDateTime.AddYears(age)>DateTime.Today)
                age--;

            return age;    
        }
    }
}
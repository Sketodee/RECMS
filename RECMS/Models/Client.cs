namespace RECMS.Models
{
    public class Client
    {
        private static string GetRandomID(int length)
        {
            string[] ingredients = "A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z,1,2,3,4,5,6,7,8,9,0".Split(',');
            string result = "";

            Random rnd = new Random();
            for (int i = 0; i < length; i++)
            {
                string rndIngr = ingredients[rnd.Next(ingredients.Length)];
                result += rndIngr;
            }

            return result;
        }

        public Guid Id { get; set; }
        public string UserId { get; set; } = string.Empty;
        public string ClientId { get; set; } = "CL" + GetRandomID(5);
        public string Name { get; set; } = string.Empty;
        public string PhoneNumber { get; set; } = string.Empty;
        public string Address { get; set; } = string.Empty;
        

    }
}

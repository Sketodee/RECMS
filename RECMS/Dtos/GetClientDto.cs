namespace RECMS.Dtos
{
    public class GetClientDto
    {
        public string Id { get; set; }
        public string ClientId { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string PhoneNumber { get; set; } = string.Empty;
        public string Address { get; set; } = string.Empty;
    }
}

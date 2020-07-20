namespace LMS.DTOs.User
{
    public class AddUserDTO
    {
        public string Email { get; set; }
        public bool Verified { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSale { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string AccountType { get; set; }
        public string SubscriptionTier { get; set; }
    }
}
namespace PiwKO.Dtos;

public class UserBeerDto
{
    public int UserBeerId { get; set; }
    public string UserId { get; set; }
    public int BeerId { get; set; }
    public bool IsFavourite { get; set; }
    public int? Score { get; set; }
}
using AutoMapper;

namespace RECMS
{
    public class AutoMapperProfile : Profile 
    {
        public AutoMapperProfile()
        {
            CreateMap<User, UserDto>();
            CreateMap<UserDto, User>();

            CreateMap<User, AppUser>()
                .ForMember(dest => dest.UserName, opts => opts.MapFrom(src => src.Email)); 
            CreateMap<AppUser, User>();

            CreateMap<Client, ClientDto>(); 
            CreateMap<ClientDto, Client>();

            CreateMap<Client, GetClientDto>();
            CreateMap<GetClientDto, Client>();
        }
    }
}

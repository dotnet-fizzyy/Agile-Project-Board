namespace WebAPI.Core.Constants
{
    public static class RouteConstants
    {
        public const string UserControllerUrl = "user";
        public const string UserControllerGetAllUsersUrl = UserControllerUrl + "/all";
        public const string UserControllerGetUserUrl = UserControllerUrl + "/{userId}";
    }
}

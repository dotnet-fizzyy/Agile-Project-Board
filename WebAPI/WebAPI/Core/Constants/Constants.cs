namespace WebAPI.Core.Constants
{
    public static class RouteConstants
    {
	    public const string ProjectControllerUrl = "project";
	    public const string ProjectControllerGetAllProjectsUrl = ProjectControllerUrl + "/all";
	    public const string ProjectControllerGetProjectUrl = ProjectControllerUrl + "/{projectId}";
	    public const string ProjectControllerCreateProjectWithCustomerUrl = ProjectControllerUrl + "/customer";
	    public const string ProjectControllerMainPageUrl = ProjectControllerUrl + "/main";
	    public const string ProjectControllerBoardPageUrl = ProjectControllerUrl + "/board/{projectId}";

		public const string EpicControllerUrl = "epic";
	    public const string EpicControllerGetAllEpicsUrl = EpicControllerUrl + "/all";
	    public const string EpicControllerGetEpicUrl = EpicControllerUrl + "/{epicId}";

	    public const string SprintControllerUrl = "sprint";
	    public const string SprintControllerGetAllSprintsUrl = SprintControllerUrl + "/all";
	    public const string SprintControllerGetSprintUrl = SprintControllerUrl + "/{sprintId}";
	    public const string SprintControllerGetSprintsFromEpicUrl = SprintControllerUrl + "/epic";

	    public const string StoryControllerUrl = "story";
	    public const string StoryControllerGetAllStoriesUrl = StoryControllerUrl + "/all";
	    public const string StoryControllerGetStoryUrl = StoryControllerUrl + "/{storyId}";

		public const string TeamControllerUrl = "team";
		public const string TeamControllerCreateTeamWithCustomerUrl = TeamControllerUrl + "/customer";
        public const string TeamControllerGetAllTeamsUrl = TeamControllerUrl + "/all";
        public const string TeamControllerGetTeamUrl = TeamControllerUrl + "/{teamId}";
        public const string TeamControllerGetUserTeamUrl = TeamControllerUrl + "/user/{userId}";
        public const string TeamControllerTeamManagementUrl = TeamControllerUrl + "/management";

        public const string UserControllerUrl = "user";
        public const string UserControllerGetAllUsersUrl = UserControllerUrl + "/all";
        public const string UserControllerGetUserUrl = UserControllerUrl + "/{userId}";
        public const string UserControllerAuthenticateUrl = UserControllerUrl + "/auth";
        public const string UserControllerCreateCustomerUrl = UserControllerUrl + "/customer";
        public const string UserControllerUpdateUserStatusUrl = UserControllerUrl + "/status";
        public const string UserControllerUpdateUserPasswordUrl = UserControllerUrl + "/password";
    }

    public static class Headers
    {
	    public const string UserHeader = "x-end-user";
    }
}

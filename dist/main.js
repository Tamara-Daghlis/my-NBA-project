
$("#get-a-team").on("click", function () {

    let teamName = $("#search-a-team").val()
    $.get(`/teams/${teamName}`, function (data) {
        teamPlayers = data
        console.log(teamPlayers)
        const source = $("#team-players-template").html()
        const template = Handlebars.compile(source)
        const teamInformation = template({ teamPlayersInfo: teamPlayers })
        $(".team-players-container").html(" ").append(teamInformation)
    })

})


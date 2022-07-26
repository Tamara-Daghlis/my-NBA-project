const express = require('express')
const app = express()
const axios = require('axios')
const path = require('path')

const teamToIDs = {
    "lakers": "1610612747",
    "warriors": "1610612744",
    "heat": "1610612748",
    "suns": "1610612756"
}

const port = 3001

app.use(express.static(path.join(__dirname, "dist")));
app.use(express.static(path.join(__dirname, "node_modules")));

app.get('/teams/:teamName', function (request, response) {
    let teamName = request.params.teamName

    axios.get('http://data.nba.net/10s/prod/v1/2018/players.json').then(function (apiResponse) {
        let players = apiResponse.data.league.standard
        const teamplayers = players.filter((player) => player.teamId === teamToIDs[teamName] && player.isActive).map(player => ({
            "firstName": player.firstName,
            "LastName": player.lastName,
            "jersey": player.jersey,
            "pos": player.pos
        }))
        response.send(teamplayers)
    })
        .catch((error) => response.send(error))
})

app.listen(port, function () {
    console.log(`Running server on port ${port}`)
})


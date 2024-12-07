function lys () {
    if (armStatus) {
        RocketLink.armStatusLys(true)
    } else {
        RocketLink.armStatusLys(false)
    }
    if (armStatusLP) {
        RocketLink.armLPStatusLys(true)
    } else {
        RocketLink.armLPStatusLys(false)
    }
    if (linkStatus) {
        RocketLink.linkStatusLys(true)
    } else {
        RocketLink.linkStatusLys(false)
    }
    if (klar) {
        RocketLink.oppskytningStatusLys(true)
    } else {
        RocketLink.oppskytningStatusLys(false)
    }
}
input.onButtonPressed(Button.A, function () {
    if (armStatus) {
        armStatus = false
    } else {
        armStatus = true
    }
})
function initialize () {
    armStatus = false
    armStatusLP = false
    linkStatus = false
    klar = false
}
input.onButtonPressed(Button.AB, function () {
    if (klar) {
        radio.sendString("oppskytning")
    }
})
radio.onReceivedString(function (receivedString) {
    if (receivedString == "link OK") {
        linkStatus = true
    }
    if (receivedString == "armLP OK") {
        armStatusLP = true
    }
    if (receivedString == "armLP ikke OK") {
        armStatusLP = false
    }
})
input.onButtonPressed(Button.B, function () {
    radio.sendString("test link")
    linkStatus = false
})
let klar = false
let linkStatus = false
let armStatusLP = false
let armStatus = false
radio.setGroup(1)
initialize()
basic.forever(function () {
    if (armStatus && armStatusLP && linkStatus) {
        klar = true
    } else {
        klar = false
    }
    lys()
})

window.onload = function() {
        // create audio files
        var pokemonIntro = document.createElement("audio");
        pokemonIntro.setAttribute("src", "assets/sounds/101-opening.mp3")
        pokemonIntro.volume = 0.2;
        // pokemonIntro.play();

        var game = {
            charmander: {
                HP: 114,
                moves: {
                    scratch: 5,
                    scratchPP: 30,
                    flameThrower: 25,
                    flameThrowerPP: 15,
                    flameBurst: 35,
                    flameBurstPP: 5,
                    inferno: 40,
                    infernoPP: 5
                }
            },

            squirtle: {
                HP: 119,
                moves: {
                    tackle: 5,
                    tacklePP: 30,
                    waterGun: 20,
                    waterGunPP: 25,
                    bubble: 15,
                    bubblePP: 25,
                    hydroPump: 40,
                    hydroPumpPP: 5
                }
            },

            bulbasaur: {
                HP: 120,
                moves: {
                    tackle: 5,
                    tacklePP: 30,
                    vineWhip: 20,
                    vineWhipPP: 25,
                    razorLeaf: 25,
                    razorLeafPP: 15,
                    solarBeam: 40,
                    solarBeamPP: 10
                }
            },

            setStage: function() {
                $(".jumbotron").fadeOut("slow");
                $(".background").fadeTo("slow",0.4);
                // var stage = $("<div>");
                // stage.attr("class","setStage")
                // $("#hiddenDiv").attr("class","row setStage")
                // $("#hiddenDiv").css("display","block");

            }

        }

        game.setStage();

}
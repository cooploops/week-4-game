window.onload = function() {
        // create audio files
        var pokemonIntro = document.createElement("audio");
        pokemonIntro.setAttribute("src", "assets/sounds/101-opening.mp3")
        pokemonIntro.volume = 0.2;
        // pokemonIntro.play();

        var game = {

            userChoice: "",

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
                $(".jumbotron").fadeOut("fast");
                $(".background").css("background-image","url('assets/images/nintendo-3ds-black-open.jpg')");
                $(".background").css("background-size","100% 100%");
                $("header").fadeIn("slow");
                $("#hiddenDiv").fadeIn("slow");                
            },

            pokemonSelect: function() {
                if(this.userChoice === "charmanderStart") {
                    $("#pokemon2Img").attr("src","assets/images/charmanderBack.gif");
                    $("#pokemon1Img").attr("src","assets/images/squirtle-3.gif");
                    this.setStage();
                } else if (this.userChoice === "squirtleStart") {
                    $("#pokemon2Img").attr("src","assets/images/squirtleBack.gif");
                    $("#pokemon1Img").attr("src","assets/images/bulbasaur-3.gif")
                    this.setStage();
                } else if (this.userChoice === "bulbasaurStart") {
                    $("#pokemon2Img").attr("src","assets/images/bulbasaurBack.gif");
                    $("#pokemon1Img").attr("src","assets/images/charmander-3.gif");
                    this.setStage();
                };
            }

        }

        $(window).click(function(event){
            game.userChoice = event.target.id;
            console.log(game.userChoice);
            game.pokemonSelect();
        });
        

}
window.onload = function() {
        // create audio files
        var pokemonIntro = document.createElement("audio");
        pokemonIntro.setAttribute("src", "assets/sounds/101-opening.mp3")
        pokemonIntro.loop = true;
        pokemonIntro.volume = 0.2;
        pokemonIntro.play();

        var pokeBattle = document.createElement("audio");
        pokeBattle.setAttribute("src","assets/sounds/115-battle-vs-trainer-.mp3")
        pokeBattle.loop = true;
        pokeBattle.voluem = 0.2;

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
                pokemonIntro.pause();
                // pokeBattle.play();
                if(this.userChoice === "charmanderStart") {
                    // setup pokemon
                    $("#pokemon2Img").attr("src","assets/images/charmanderBack.gif");
                    $("#pokemon1Img").attr("src","assets/images/squirtle-3.gif");

                    // setup healthbars
                    $("#poke2HP").attr("class","progress-bar bg-success");
                    $("#poke2HP").attr("aria-valuemax",this.charmander.HP);
                    $("#poke2HP").attr("aria-valuenow",this.charmander.HP);
                    $("#poke2HP").css("width","100%");
                    $("#poke2HP").text(this.charmander.HP);

                    $("#poke1HP").attr("class","progress-bar bg-success");
                    $("#poke1HP").attr("aria-valuemax",this.squirtle.HP);
                    $("#poke1HP").attr("aria-valuenow",this.squirtle.HP);
                    $("#poke1HP").css("width","100%");
                    $("#poke1HP").text(this.squirtle.HP);

                    // setup moves
                    var moveList = $("<div>");
                    moveList.attr("class","moveList");
                    moveList.addClass("moveList");
                    $(".container").append(moveList);
                    moveList.html("<div class='row firstRow'><button id='atk1' class='btn btn-lg'>Scratch</button> <button id='atk2' class='btn btn-lg'>Flamethrower</button></div> <div class='row secondRow'><button id='atk3' class='btn btn-lg'>Flameburst</button> <button id='atk4' class='btn btn-lg'>Inferno</button></div>")
                   
                    // set stage
                    this.setStage();
                } else if (this.userChoice === "squirtleStart") {
                    // setup pokemon
                    $("#pokemon2Img").attr("src","assets/images/squirtleBack.gif");
                    $("#pokemon1Img").attr("src","assets/images/bulbasaur-3.gif")
                    // setup healthbars
                    $("#poke2HP").attr("class","progress-bar bg-success");
                    $("#poke2HP").attr("aria-valuemax",this.squirtle.HP);
                    $("#poke2HP").attr("aria-valuenow",this.squirtle.HP);
                    $("#poke2HP").css("width","100%");
                    $("#poke2HP").text(this.squirtle.HP);

                    $("#poke1HP").attr("class","progress-bar bg-success");
                    $("#poke1HP").attr("aria-valuemax",this.bulbasaur.HP);
                    $("#poke1HP").attr("aria-valuenow",this.bulbasaur.HP);
                    $("#poke1HP").css("width","100%");
                    $("#poke1HP").text(this.bulbasaur.HP);
                    this.setStage();
                } else if (this.userChoice === "bulbasaurStart") {
                    // setup pokemon
                    $("#pokemon2Img").attr("src","assets/images/bulbasaurBack.gif");
                    $("#pokemon1Img").attr("src","assets/images/charmander-3.gif");
                    // setup healthbars
                    $("#poke2HP").attr("class","progress-bar bg-success");
                    $("#poke2HP").attr("aria-valuemax",this.bulbasaur.HP);
                    $("#poke2HP").attr("aria-valuenow",this.bulbasaur.HP);
                    $("#poke2HP").css("width","100%");
                    $("#poke2HP").text(this.bulbasaur.HP);

                    $("#poke1HP").attr("class","progress-bar bg-success");
                    $("#poke1HP").attr("aria-valuemax",this.charmander.HP);
                    $("#poke1HP").attr("aria-valuenow",this.charmander.HP);
                    $("#poke1HP").css("width","100%");
                    $("#poke1HP").text(this.charmander.HP);

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
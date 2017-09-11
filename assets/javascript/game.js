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
        pokeBattle.volume = 0.2;

        var pokeEnding = document.createElement("audio");
        pokeEnding.setAttribute("src","assets/sounds/01.-pokemon-theme.mp3")
        pokeEnding.volume = 0.1;
        

        var game = {

            userChoice: "",

            charmander: {
                HP: 114,
                pokeType: "fire",
                moves: {
                    scratch: 5,
                    flameThrower: 12,
                    flameBurst: 15,
                    inferno: 25,
                },
                movesPP: {
                    scratchPP: 30,
                    flameThrowerPP: 15,
                    flameBurstPP: 10,
                    infernoPP: 5
                }
            },

            squirtle: {
                HP: 119,
                pokeType: "water",
                moves: {
                    tackle: 7,
                    waterGun: 15,
                    bubble: 12,
                    hydroPump: 20,
                },
                movesPP: {
                    tacklePP: 25,
                    waterGunPP: 10,
                    bubblePP: 15,
                    hydroPumpPP: 5
                }
            },

            bulbasaur: {
                HP: 120,
                pokeType: "grass",
                moves: {
                    tackle: 7,
                    vineWhip: 10,
                    razorLeaf: 15,
                    solarBeam: 20,
                },
                movesPP: {
                    tacklePP: 25,
                    vineWhipPP: 20,
                    razorLeafPP: 10,
                    solarBeamPP: 5
                }
            },

            setStage: function() {
                $(".jumbotron").fadeOut("fast");
                $(".background").css("background-image","url('assets/images/nintendo-3ds-black-open.jpg')");
                $(".background").css("background-size","100% 100%");
                $("header").fadeIn("slow");
                $("#hiddenDiv").fadeIn("slow");                
            },

            squirtleAttack: function() {
                var attacks = [this.squirtle.moves.tackle,this.squirtle.moves.waterGun,this.squirtle.moves.bubble,this.squirtle.moves.hydroPump];
                var randomAttack = attacks[Math.floor((Math.random() * 4))];
                console.log(randomAttack);
                var health = this.charmander.HP -= randomAttack;
                var pctHealth = Math.floor((health/120) * 100);
                $("#poke2HP").attr("aria-valuenow",health);
                $("#poke2HP").text(health);
                $("#poke2HP").css("width",pctHealth + "%");
                console.log(randomAttack);
                this.updatePoke2HPBar();
                this.squirtle.movesPP.scratch--;
            },

            charmanderAttack: function() {
                var attacks = [this.charmander.moves.scratch,this.charmander.moves.flameThrower,this.charmander.moves.flameBurst,this.charmander.moves.inferno];
                var randomAttack = attacks[Math.floor((Math.random() * 4))];
                var health = this.bulbasaur.HP -= randomAttack;
                var pctHealth = Math.floor((health/120) * 100);
                $("#poke2HP").attr("aria-valuenow",health);
                $("#poke2HP").text(health);
                $("#poke2HP").css("width",pctHealth + "%");
                console.log(randomAttack);
                this.updatePoke2HPBar();
            },

            bulbasaurAttack: function() {
                var attacks = [this.bulbasaur.moves.tackle,this.bulbasaur.moves.vineWhip,this.bulbasaur.moves.razorLeaf,this.bulbasaur.moves.solarBeam];
                var randomAttack = attacks[Math.floor((Math.random() * 4))];
                console.log(randomAttack);
                var health = this.squirtle.HP -= randomAttack;
                var pctHealth = Math.floor((health/120) * 100);
                $("#poke2HP").attr("aria-valuenow",health);
                $("#poke2HP").text(health);
                $("#poke2HP").css("width",pctHealth + "%");
                console.log(randomAttack);
                this.updatePoke2HPBar();
            },

            updatePoke1HPBar: function() {
                var maxHP = $("#poke1HP").attr("aria-valuemax");
                var currentHP = $("#poke1HP").attr("aria-valuenow");
                if(currentHP <= (maxHP/3)) {
                    $("#poke1HP").addClass("bg-danger");
                } else if (currentHP <= (maxHP/2)) {
                    $("#poke1HP").addClass("bg-warning");
                }
            },

            updatePoke2HPBar: function() {
                var maxHP = $("#poke2HP").attr("aria-valuemax");
                var currentHP = $("#poke2HP").attr("aria-valuenow");
                if(currentHP <= (maxHP/3)) {
                    $("#poke2HP").addClass("bg-danger");
                } else if (currentHP <= (maxHP/2)) {
                    $("#poke2HP").addClass("bg-warning");
                }
            },

            winLoseCheck: function() {
                if($("#poke1HP").attr("aria-valuenow") <= 0 || $("#poke2HP").attr("aria-valuenow") <= 0) {
                    $("#myModal").modal({keyboard:true, focus:true, show:true});
                    pokeBattle.pause();
                    pokeEnding.play();
                    $("#retry").click(function(){
                        location.reload();
                    });
                }
            },

            pokemonSelect: function() {
                if(this.userChoice === "charmanderStart") {
                    // setup pokemon
                    $("#pokemon2Img").attr("src","assets/images/charmanderBack.gif");
                    $("#pokemon2").attr("pokeType",game.charmander.pokeType);
                    $("#pokemon1Img").attr("src","assets/images/squirtle-3.gif");
                    $("#pokemon1").attr("pokeType",game.squirtle.pokeType);

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
                    moveList.html("<div class='row firstRow'><button id='atk1' class='btn btn-lg btn-light'>Scratch <span id='atk1PP'>30/30</span></button> <button id='atk2' class='btn btn-lg btn-danger'>Flamethrower <span id='atk2PP'>15/15</span></button></div> <div class='row secondRow'><button id='atk3' class='btn btn-lg btn-danger'>Flameburst <span id='atk3PP'>10/10</span></button> <button id='atk4' class='btn btn-lg btn-danger'>Inferno <span id='atk4PP'>5/5</span></button></div>")
                   
                    // set stage
                    this.setStage();

                    // battle
                    $("#atk1").click(function(){
                        console.log(game.squirtle.HP);
                        console.log(game.charmander.moves.scratch);
                        var damage = game.charmander.moves.scratch;
                        var health = game.squirtle.HP -= damage;
                        var pctHealth = Math.floor(((health/119) * 100));
                        console.log(pctHealth);
                        $("#poke1HP").attr("aria-valuenow",health);
                        $("#poke1HP").text(health);
                        $("#poke1HP").css("width",pctHealth +"%");
                        game.squirtleAttack();
                        var remaining = --game.charmander.movesPP.scratchPP;
                        console.log(remaining);
                        $("#atk1PP").text(remaining + "/30");
                        game.updatePoke1HPBar();
                        game.winLoseCheck();
                        if(remaining === 0){
                            $("#atk1").addClass("disabled");
                            $("#atk1").attr("disabled","true");
                         }

                    });
                    $("#atk2").click(function(){
                        console.log(game.squirtle.HP);
                        console.log(game.charmander.moves.flameThrower);
                        var damage = game.charmander.moves.flameThrower;
                        if($("#pokemon2").attr("poketype") === "fire" && $("#pokemon1").attr("poketype") === "water"){
                            damage = Math.floor(damage/2);
                        }
                        var health = game.squirtle.HP -= damage;
                        var pctHealth = Math.floor(((health/119) * 100));
                        console.log(pctHealth);
                        $("#poke1HP").attr("aria-valuenow",health);
                        $("#poke1HP").text(health);
                        $("#poke1HP").css("width",pctHealth +"%");
                         game.squirtleAttack();
                        var remaining = --game.charmander.movesPP.flameThrowerPP;
                        console.log(remaining);
                        $("#atk2PP").text(remaining + "/15");
                         game.updatePoke1HPBar();
                         game.winLoseCheck();
                        if(remaining === 0){
                            $("#atk2").addClass("disabled");
                            $("#atk2").attr("disabled","true");
                         }
                    });
                    $("#atk3").click(function(){
                        console.log(game.squirtle.HP);
                        console.log(game.charmander.moves.flameBurst);
                        var damage = game.charmander.moves.flameBurst;
                        if($("#pokemon2").attr("poketype") === "fire" && $("#pokemon1").attr("poketype") === "water"){
                            damage = Math.floor(damage/2);
                        }
                        var health = game.squirtle.HP -= damage;
                        var pctHealth = Math.floor(((health/119) * 100));
                        console.log(pctHealth);
                        $("#poke1HP").attr("aria-valuenow",health);
                        $("#poke1HP").text(health);
                        $("#poke1HP").css("width",pctHealth +"%");
                         game.squirtleAttack();
                        var remaining = --game.charmander.movesPP.flameBurstPP;
                        console.log(remaining);
                        $("#atk3PP").text(remaining + "/10");
                         game.updatePoke1HPBar();
                         game.winLoseCheck();
                         if(remaining === 0){
                            $("#atk3").addClass("disabled");
                            $("#atk3").attr("disabled","true");
                         }
                    });
                    $("#atk4").click(function(){
                        console.log(game.squirtle.HP);
                        console.log(game.charmander.moves.inferno);
                        var damage = game.charmander.moves.inferno;
                        if($("#pokemon2").attr("poketype") === "fire" && $("#pokemon1").attr("poketype") === "water"){
                            damage = Math.floor(damage/2);
                        }
                        var health = game.squirtle.HP -= damage;
                        var pctHealth = Math.floor(((health/119) * 100));
                        console.log(pctHealth);
                        $("#poke1HP").attr("aria-valuenow",health);
                        $("#poke1HP").text(health);
                        $("#poke1HP").css("width",pctHealth +"%");
                         game.squirtleAttack();
                        var remaining = --game.charmander.movesPP.infernoPP;
                        console.log(remaining);
                        $("#atk4PP").text(remaining + "/5");
                         game.updatePoke1HPBar();
                         game.winLoseCheck();
                         if(remaining === 0){
                            $("#atk4").addClass("disabled");
                            $("#atk4").attr("disabled","true");
                         }
                    });
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

                    // setup moves
                    var moveList = $("<div>");
                    moveList.attr("class","moveList");
                    moveList.addClass("moveList");
                    $(".container").append(moveList);
                    moveList.html("<div class='row firstRow'><button id='atk1' class='btn btn-lg btn-light'>Tackle <span id='atk1PP'>30/30</span></button> <button id='atk2' class='btn btn-lg btn-primary'>Water Gun <span id='atk2PP'>10/10</span></button></div> <div class='row secondRow'><button id='atk3' class='btn btn-lg btn-primary'>Bubble <span id='atk3PP'>15/15</span></button> <button id='atk4' class='btn btn-lg btn-primary'>Hydro Pump <span id='atk4PP'>5/5</span></button></div>")

                    // set stage
                    this.setStage();

                    // battle
                    $("#atk1").click(function(){
                        console.log(game.bulbasaur.HP);
                        console.log(game.squirtle.moves.tackle);
                        var damage = game.squirtle.moves.tackle;
                        var health = game.bulbasaur.HP -= damage;
                        var pctHealth = Math.floor(((health/120) * 100));
                        console.log(pctHealth);
                        $("#poke1HP").attr("aria-valuenow",health);
                        $("#poke1HP").text(health);
                        $("#poke1HP").css("width",pctHealth +"%");
                         game.bulbasaurAttack();
                         game.updatePoke1HPBar();
                         game.winLoseCheck();
                        var remaining = --game.squirtle.movesPP.tacklePP;
                        console.log(remaining);
                        $("#atk1PP").text(remaining + "/30");
                        if(remaining === 0){
                            $("#atk1").addClass("disabled");
                            $("#atk1").attr("disabled","true");
                         }
                    });
                    $("#atk2").click(function(){
                        console.log(game.bulbasaur.HP);
                        console.log(game.squirtle.moves.waterGun);
                        var damage = game.squirtle.moves.waterGun;
                        if($("#pokemon2").attr("poketype") === "water" && $("#pokemon1").attr("poketype") === "grass"){
                            damage = Math.floor(damage/2);
                        }
                        var health = game.bulbasaur.HP -= damage;
                        var pctHealth = Math.floor(((health/120) * 100));
                        console.log(pctHealth);
                        $("#poke1HP").attr("aria-valuenow",health);
                        $("#poke1HP").text(health);
                        $("#poke1HP").css("width",pctHealth +"%");
                         game.bulbasaurAttack();
                         game.updatePoke1HPBar();
                         game.winLoseCheck();
                        var remaining = --game.squirtle.movesPP.waterGunPP;
                        console.log(remaining);
                        $("#atk2PP").text(remaining + "/10");
                        if(remaining === 0){
                            $("#atk2").addClass("disabled");
                            $("#atk2").attr("disabled","true");
                         }
                    });
                    $("#atk3").click(function(){
                        console.log(game.bulbasaur.HP);
                        console.log(game.squirtle.moves.bubble);
                        var damage = game.squirtle.moves.bubble;
                        if($("#pokemon2").attr("poketype") === "water" && $("#pokemon1").attr("poketype") === "grass"){
                            damage = Math.floor(damage/2);
                        }
                        var health = game.bulbasaur.HP -= damage;
                        var pctHealth = Math.floor(((health/120) * 100));
                        console.log(pctHealth);
                        $("#poke1HP").attr("aria-valuenow",health);
                        $("#poke1HP").text(health);
                        $("#poke1HP").css("width",pctHealth +"%");
                         game.bulbasaurAttack();
                         game.updatePoke1HPBar();
                         game.winLoseCheck();
                        var remaining = --game.squirtle.movesPP.bubblePP;
                        console.log(remaining);
                        $("#atk3PP").text(remaining + "/15");
                        if(remaining === 0){
                            $("#atk3").addClass("disabled");
                            $("#atk3").attr("disabled","true");
                         }
                    });
                    $("#atk4").click(function(){
                        console.log(game.bulbasaur.HP);
                        console.log(game.squirtle.moves.hydroPump);
                        var damage = game.squirtle.moves.hydroPump;
                        if($("#pokemon2").attr("poketype") === "water" && $("#pokemon1").attr("poketype") === "grass"){
                            damage = Math.floor(damage/2);
                        }
                        var health = game.bulbasaur.HP -= damage;
                        var pctHealth = Math.floor(((health/120) * 100));
                        console.log(pctHealth);
                        $("#poke1HP").attr("aria-valuenow",health);
                        $("#poke1HP").text(health);
                        $("#poke1HP").css("width",pctHealth +"%");
                         game.bulbasaurAttack();
                         game.updatePoke1HPBar();
                         game.winLoseCheck();
                        var remaining = --game.squirtle.movesPP.hydroPumpPP;
                        console.log(remaining);
                        $("#atk4PP").text(remaining + "/5");
                        if(remaining === 0){
                            $("#atk4").addClass("disabled");
                            $("#atk4").attr("disabled","true");
                         }
                    });
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

                    // setup moves
                    var moveList = $("<div>");
                    moveList.attr("class","moveList");
                    moveList.addClass("moveList");
                    $(".container").append(moveList);
                    moveList.html("<div class='row firstRow'><button id='atk1' class='btn btn-lg btn-light'>Tackle <span id='atk1PP'>25/25</span></button> <button id='atk2' class='btn btn-lg btn-success'>Vine Whip <span id='atk2PP'>20/20</span></button></div> <div class='row secondRow'><button id='atk3' class='btn btn-lg btn-success'>Razor Leaf <span id='atk3PP'>10/10</span></button> <button id='atk4' class='btn btn-lg btn-success'>Solar Beam <span id='atk4PP'>5/5</span></button></div>")

                    // set stage
                    this.setStage();

                    // battle
                        $("#atk1").click(function(){
                        console.log(game.charmander.HP);
                        console.log(game.bulbasaur.moves.tackle);
                        var damage = game.bulbasaur.moves.tackle;
                        var health = game.charmander.HP -= damage;
                        var pctHealth = Math.floor(((health/114) * 100));
                        console.log(pctHealth);
                        $("#poke1HP").attr("aria-valuenow",health);
                        $("#poke1HP").text(health);
                        $("#poke1HP").css("width",pctHealth +"%");
                         game.charmanderAttack();
                         game.updatePoke1HPBar();
                         game.winLoseCheck();
                        var remaining = --game.bulbasaur.movesPP.tacklePP;
                        console.log(remaining);
                        $("#atk1PP").text(remaining + "/25");
                        if(remaining === 0){
                            $("#atk1").addClass("disabled");
                            $("#atk1").attr("disabled","true");
                         }
                    });
                    $("#atk2").click(function(){
                        console.log(game.charmander.HP);
                        console.log(game.bulbasaur.moves.vineWhip);
                        var damage = game.bulbasaur.moves.vineWhip;
                        if($("#pokemon2").attr("poketype") === "grass" && $("#pokemon1").attr("poketype") === "fire"){
                            damage = Math.floor(damage/2);
                        }
                        var health = game.charmander.HP -= damage;
                        var pctHealth = Math.floor(((health/114) * 100));
                        console.log(pctHealth);
                        $("#poke1HP").attr("aria-valuenow",health);
                        $("#poke1HP").text(health);
                        $("#poke1HP").css("width",pctHealth +"%");
                         game.charmanderAttack();
                         game.updatePoke1HPBar();
                         game.winLoseCheck();
                        var remaining = --game.bulbasaur.movesPP.vineWhipPP;
                        console.log(remaining);
                        $("#atk2PP").text(remaining + "/20");
                        if(remaining === 0){
                            $("#atk2").addClass("disabled");
                            $("#atk2").attr("disabled","true");
                         }
                    });
                    $("#atk3").click(function(){
                        console.log(game.charmander.HP);
                        console.log(game.bulbasaur.moves.razorLeaf);
                        var damage = game.bulbasaur.moves.razorLeaf;
                        var health = game.charmander.HP -= damage;
                        if($("#pokemon2").attr("poketype") === "grass" && $("#pokemon1").attr("poketype") === "fire"){
                            damage = Math.floor(damage/2);
                        }
                        var pctHealth = Math.floor(((health/114) * 100));
                        console.log(pctHealth);
                        $("#poke1HP").attr("aria-valuenow",health);
                        $("#poke1HP").text(health);
                        $("#poke1HP").css("width",pctHealth +"%");
                         game.charmanderAttack();
                         game.updatePoke1HPBar();
                         game.winLoseCheck();
                        var remaining = --game.bulbasaur.movesPP.razorLeafPP;
                        console.log(remaining);
                        $("#atk3PP").text(remaining + "/10");
                        if(remaining === 0){
                            $("#atk3").addClass("disabled");
                            $("#atk3").attr("disabled","true");
                         }
                    });
                    $("#atk4").click(function(){
                        console.log(game.charmander.HP);
                        console.log(game.bulbasaur.moves.solarBeam);
                        var damage = game.bulbasaur.moves.solarBeam;
                        if($("#pokemon2").attr("poketype") === "grass" && $("#pokemon1").attr("poketype") === "fire"){
                            damage = Math.floor(damage/2);
                        }
                        var health = game.charmander.HP -= damage;
                        var pctHealth = Math.floor(((health/114) * 100));
                        console.log(pctHealth);
                        $("#poke1HP").attr("aria-valuenow",health);
                        $("#poke1HP").text(health);
                        $("#poke1HP").css("width",pctHealth +"%");
                        game.charmanderAttack();
                        game.updatePoke1HPBar();
                        game.winLoseCheck();
                        var remaining = --game.bulbasaur.movesPP.solarBeamPP;
                        console.log(remaining);
                        $("#atk4PP").text(remaining + "/5");
                        if(remaining === 0){
                            $("#atk4").addClass("disabled");
                            $("#atk4").attr("disabled","true");
                         }
                    });
                };
            }

        }

        $(window).on("click",function(event){
            game.userChoice = event.target.id;
            console.log(game.userChoice);
                if(game.userChoice === "charmanderStart" || "squirtleStart" || "bulbasaurStart") {
                    game.pokemonSelect();
                } else {
                    // do nothing
                }
        });

        $("a").click(function(){
            pokemonIntro.pause();
            pokeBattle.play();
        })

                

}
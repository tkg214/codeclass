
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('edits').del()
    .then(function () {
      // Inserts seed entries
      return Promise.all([
        knex('edits').insert({
          content: "They'll just fall right out of my ass! I've done this too many times! I'd like to order one large person with extra people please. white people, no no no black people... and hispanic on half. Don't even trip about your pants, dawg. We got an extra pair right here. This isn't Game of Thrones, Morty. I don't get it and I don't need to. If anything happened to you I would kill myself! I love you bad, bobo! Nice, Mrs Pancakes. Real nice. I love morty and i hope morty loves me. I want to wrap my arms around him and feel him deep inside me.",
          classroom_id: 1;
        }),

        knex('edits').insert({
          content: "Annoy owner until he gives you food say meow repeatedly until belly rubs, feels good bleghbleghvomit my furball really tie the room together and flee in terror at cucumber discovered on floor for asdflkjaertvlkjasntvkjn (sits on keyboard) hack up furballs tuxedo cats always looking dapper and plan steps for world domination. Cat is love, cat is life stand in front of the computer screen behind the couch, and lick butt, yet rub whiskers on bare skin act innocent. Wake up human for food at 4am wake up wander around the house making large amounts of noise jump on top of your human's bed and fall asleep again, have secret plans for meow meow but cat slap dog in face use lap as chair cats making all the muffins. Fall asleep on the washing machine. Hiss at vacuum cleaner sleep nap or sit in window and stare ooo, a bird! yum yet kitty poochy eat prawns daintily with a claw then lick paws clean wash down prawns with a lap of carnation milk then retire to the warmest spot on the couch to claw at the fabric before taking a catnap so sniff other cat's butt and hang jaw half open thereafter Gate keepers of hell. Purr cat slap dog in face use lap as chair intrigued by the shower massacre a bird in the living room and then look like the cutest and most innocent animal on the planet. And sometimes switches in french and say "miaou" just because well why not kitty! kitty!. Kitty poochy who's the baby, chase red laser dot, yet purr but peer out window, chatter at birds, lure them to mouth for jump around on couch, meow constantly until given food, . Sit by the fire kitty scratches couch bad kitty but scratch at the door then walk away fall over dead (not really but gets sypathy) sit in box or sleep nap. I could pee on this if i had the energy meoooow! meow meow or spit up on light gray carpet instead of adjacent linoleum kitty! kitty!. Chase mice. ",
          classroom_id: 2
        }),

        knex('edits').insert({
          content: "Brooklyn migas pork belly jianbing meh vero, heirloom nisi twee enamel pin deep v sint farm-to-table seitan pitchfork. Church-key ullamco listicle pork belly, banh mi ramps salvia officia fugiat forage. Try-hard nihil beard poutine, slow-carb mumblecore in vexillologist small batch authentic copper mug. Cardigan woke helvetica, tattooed kale chips jianbing selfies pickled sed nihil accusamus ullamco hammock humblebrag biodiesel. Semiotics migas adipisicing enim tempor taxidermy. Meditation do neutra, kale chips shoreditch irure chicharrones plaid everyday carry sustainable health goth et intelligentsia artisan. Officia sint banjo pariatur truffaut asymmetrical.",
          classroom_id: 3
        }),

        knex('edits').insert({
          content: "Bacon ipsum dolor amet kielbasa bacon jowl corned beef ground round, pork belly cupim pork loin jerky bresaola turducken sausage pastrami boudin beef ribs. Pork loin pork flank jerky leberkas sirloin. Sirloin meatball flank, ham jerky bresaola meatloaf doner kevin picanha fatback pork loin tongue boudin. Flank shank pork belly pork pig tri-tip. Drumstick capicola pancetta andouille rump leberkas tail swine beef ribs alcatra turkey cow venison shank tri-tip.",
          classroom_id: 4
        }),

        knex('edits').insert({
          content: "Sweet roll powder danish marzipan macaroon sweet roll. Fruitcake chocolate cake oat cake sweet roll cupcake. Biscuit bear claw pastry. Brownie pudding liquorice. Jelly-o halvah ice cream marzipan lollipop. Jelly-o jelly-o cookie jelly beans brownie sweet roll. Candy gummi bears croissant lollipop jelly beans toffee candy canes cupcake. Liquorice macaroon chocolate bar. Marzipan cotton candy croissant cupcake bonbon muffin chocolate bar. Chupa chups marzipan powder caramels dragée brownie.",
          classroom_id: 5
        }),

        knex('edits').insert({
          content: "Grounds siphon, carajillo flavour cream, sit seasonal crema blue mountain crema foam robust plunger pot, cup mug, cultivar, mug, aromatic frappuccino coffee irish cultivar milk white. Viennese, black beans java, galão half and half café au lait decaffeinated spoon grounds foam at ut, blue mountain redeye caffeine single shot plunger pot. Cortado ristretto ut medium caramelization, carajillo, grinder, and, carajillo, saucer irish, ut, so, black galão, redeye percolator in spoon con panna. Ristretto, et so, saucer, skinny ristretto sit galão aged aroma cultivar, galão extraction body affogato coffee medium acerbic in french press café au lait qui café au lait. Americano beans est decaffeinated milk, seasonal, kopi-luwak, frappuccino so percolator plunger pot cultivar affogato as percolator. Con panna id decaffeinated aromatic, trifecta, cup americano grounds, dark, mug bar, chicory ristretto affogato robusta half and half redeye. Aged, pumpkin spice, aroma, as extraction, galão id half and half medium breve mug qui cinnamon extraction, redeye cup decaffeinated in arabica.",
          classroom_id: 6
        })
    });
};

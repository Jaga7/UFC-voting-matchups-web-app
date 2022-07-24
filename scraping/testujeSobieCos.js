const fightersWhoHaveAMatchup = {
  womenBantamweight: [
    "Amanda Nunes",
    "Julianna Peña",
    "Aspen Ladd",
    "Sara McMann",
  ],
  Heavyweight: [
    "Derrick Lewis",
    "Sergei Pavlovich",
    "Augusto Sakai",
    "Marcin Tybura",
    "Alexandr Romanov",
    "Ciryl Gane",
    "Tai Tuivasa",
  ],
  Middleweight: [
    "Paulo Costa",
    "Robert Whittaker",
    "Marvin Vettori",
    "Nassourdine Imavov",
  ],
};

const allRankedFighters = {
  menFlyweight: [
    "Deiveson Figueiredo",
    "Brandon Moreno",
    "Kai Kara France",
    "Askar Askarov",
    "Alexandre Pantoja",
    "Brandon Royval",
    "Alex Perez",
    "Matheus Nicolau",
    "Matt Schnell",
    "David Dvorak",
    "Tim Elliott",
    "Amir Albazi",
    "Sumudaerji",
    "Manel Kape",
    "Jeffrey Molina",
    "Tagir Ulanbekov",
  ],
  menBantamweight: [
    "Aljamain Sterling",
    "Petr Yan",
    "TJ Dillashaw",
    "José Aldo",
    "Cory Sandhagen",
    "Marlon Vera",
    "Merab Dvalishvili",
    "Rob Font",
    "Dominick Cruz",
    "Pedro Munhoz",
    "Song Yadong",
    "Ricky Simon",
    "Frankie Edgar",
    "Sean O'Malley",
    "Umar Nurmagomedov",
    "Jack Shore",
  ],
  menFeatherweight: [
    "Alexander Volkanovski",
    "Max Holloway",
    "Yair Rodriguez",
    "Brian Ortega",
    "Josh Emmett",
    "Calvin Kattar",
    "Arnold Allen",
    "Chan Sung Jung",
    "Giga Chikadze",
    "Bryce Mitchell",
    "Movsar Evloev",
    "Dan Ige",
    "Sodiq Yusuff",
    "Edson Barboza",
    "Shane Burgos",
    "Ilia Topuria",
  ],
  menLightweight: [
    "Charles Oliveira",
    "Dustin Poirier",
    "Justin Gaethje",
    "Islam Makhachev",
    "Michael Chandler",
    "Beneil Dariush",
    "Rafael Fiziev",
    "Rafael Dos Anjos",
    "Mateusz Gamrot",
    "Arman Tsarukyan",
    "Tony Ferguson",
    "Conor McGregor",
    "Dan Hooker",
    "Jalin Turner",
    "Damir Ismagulov",
  ],
  menWelterweight: [
    "Kamaru Usman",
    "Colby Covington",
    "Leon Edwards",
    "Khamzat Chimaev",
    "Gilbert Burns",
    "Belal Muhammad",
    "Vicente Luque",
    "Stephen Thompson",
    "Jorge Masvidal",
    "Sean Brady",
    "Shavkat Rakhmonov",
    "Michael Chiesa",
    "Neil Magny",
    "Geoff Neal",
    "Li Jingliang",
    "Michel Pereira",
  ],
  menMiddleweight: [
    "Israel Adesanya",
    "Robert Whittaker",
    "Jared Cannonier",
    "Marvin Vettori",
    "Derek Brunson",
    "Paulo Costa",
    "Alex Pereira",
    "Sean Strickland",
    "Jack Hermansson",
    "Darren Till",
    "Andre Muniz",
    "Kelvin Gastelum",
    "Uriah Hall",
    "Nassourdine Imavov",
    "Dricus Du Plessis",
    "Brad Tavares",
  ],
  menLightheavyweight: [
    "Jiří Procházka",
    "Glover Teixeira",
    "Jan Błachowicz",
    "Aleksandar Rakić",
    "Magomed Ankalaev",
    "Anthony Smith",
    "Thiago Santos",
    "Dominick Reyes",
    "Paul Craig",
    "Volkan Oezdemir",
    "Jamahal Hill",
    "Nikita Krylov",
    "Ryan Spann",
    "Johnny Walker",
    "Dustin Jacoby",
    "Jimmy Crute",
  ],
  menHeavyweight: [
    "Francis Ngannou",
    "Ciryl Gane",
    "Stipe Miocic",
    "Tai Tuivasa",
    "Curtis Blaydes",
    "Derrick Lewis",
    "Tom Aspinall",
    "Alexander Volkov",
    "Jairzinho Rozenstruik",
    "Chris Daukaus",
    "Marcin Tybura",
    "Sergei Pavlovich",
    "Alexandr Romanov",
    "Shamil Abdurakhimov",
    "Augusto Sakai",
    "Blagoy Ivanov",
  ],
  womenStrawweight: [
    "Carla Esparza",
    "Rose Namajunas",
    "Zhang Weili",
    "Marina Rodriguez",
    "Mackenzie Dern",
    "Yan Xiaonan",
    "Jessica Andrade",
    "Tecia Torres",
    "Nina Nunes",
    "Amanda Lemos",
    "Amanda Ribas",
    "Michelle Waterson-Gomez",
    "Virna Jandiroba",
    "Angela Hill",
    "Emily Ducote",
    "Luana Pinheiro",
  ],
  womenFlyweight: [
    "Valentina Shevchenko",
    "Katlyn Chookagian",
    "Taila Santos",
    "Lauren Murphy",
    "Jessica Andrade",
    "Alexa Grasso",
    "Viviane Araujo",
    "Manon Fiorot",
    "Jennifer Maia",
    "Andrea Lee",
    "Maycee Barber",
    "Casey O'Neill",
    "Cynthia Calvillo",
    "Erin Blanchfield",
    "Tracy Cortez",
    "Amanda Ribas",
  ],
  womenBantamweight: [
    "Julianna Peña",
    "Amanda Nunes",
    "Ketlen Vieira",
    "Holly Holm",
    "Irene Aldana",
    "Raquel Pennington",
    "Yana Kunitskaya",
    "Aspen Ladd",
    "Sara McMann",
    "Pannie Kianzad",
    "Macy Chiasson",
    "Karol Rosa",
    "Lina Lansberg",
    "Miesha Tate",
    "Julia Avila",
    "Norma Dumont",
  ],
};

// TUTAJ TWORZĘ TO CO MNIE INTERESUJE

const allFightersWithoutAMatchup = {};

for (const weightclass of Object.keys(allRankedFighters)) {
  console.log(`${weightclass}:`);
  console.log(
    "fightersWhoHaveAMatchup[weightclass]",
    fightersWhoHaveAMatchup[weightclass]
  );
  console.log("allRankedFighters[weightclass]", allRankedFighters[weightclass]);
  if (fightersWhoHaveAMatchup[weightclass]) {
    allFightersWithoutAMatchup[weightclass] = allRankedFighters[
      weightclass
    ].filter((fighter) => {
      console.log("fighter", fighter);
      return !fightersWhoHaveAMatchup[weightclass].includes(fighter);
    });
  } else {
    // allFightersWithoutAMatchup[weightclass] = allRankedFighters[weightclass];
    allFightersWithoutAMatchup[weightclass] = ["s"];
  }
}

// const allFightersWithoutAMatchup = allRankedFighters.map((weightclass) => {
//   return allRankedFighters[weightclass].filter(
//     (fighter) => !fightersWhoHaveAMatchup.includes(fighter)
//   );
// });

console.log("allFightersWithoutAMatchup", allFightersWithoutAMatchup);

export function generateRandomWords(): string {
  const words: string[] = [
    "apple",
    "banana",
    "cherry",
    "date",
    "elderberry",
    "fig",
    "grape",
    "honeydew",
    "ice cream",
    "jackfruit",
    "kiwi",
    "lemon",
    "mango",
    "nectarine",
    "orange",
    "papaya",
    "quince",
    "raspberry",
    "strawberry",
    "tangerine",
    "ugli fruit",
    "vanilla",
    "watermelon",
    "xigua",
    "yellow watermelon",
    "zucchini",
    "avocado",
    "blackberry",
    "coconut",
    "dragonfruit",
    "eggplant",
    "feijoa",
    "grapefruit",
    "honeydew melon",
    "imbe",
    "jujube",
    "kiwano",
    "lime",
    "mandarin",
    "nashi pear",
    "olive",
    "passionfruit",
    "quenepa",
    "rambutan",
    "soursop",
    "tamarind",
    "ugni",
    "vanilla bean",
    "wax apple",
    "ximenia",
    "yuzu",
    "zapote",
  ];

  const minWords = 20;
  const maxWords = 60;
  const numWords =
    Math.floor(Math.random() * (maxWords - minWords + 1)) + minWords;

  const randomWords: string[] = [];
  for (let i = 0; i < numWords; i++) {
    const randomIndex = Math.floor(Math.random() * words.length);
    randomWords.push(words[randomIndex]);
  }

  return randomWords.join(" ");
}

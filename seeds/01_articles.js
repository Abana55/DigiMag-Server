/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("articles").del();

  // Inserts seed entries
  await knex("articles").insert([
    {
      title: "In-depth Review of Godzilla Minus One",
      content:
        "The Godzilla Minus One offers an intriguing look into the Godzilla franchise, blending classic elements with new innovations. This latest installment diverges from traditional narratives, providing a fresh perspective on the iconic monster. The storyline captivates with its unexpected twists, while the cinematography and special effects bring a stunning visual appeal. Notably, the character development and thematic depth add a layer of complexity to the film, making it a must-watch for fans and newcomers alike. Overall, Godzilla Minus One delivers a thrilling experience that redefines the boundaries of the genre.",
      author: "Alec Bana",
    },
    {
      title: "Top Ten Games for Me - Alec Bana's Picks",
      content:
        "Gaming has always been a passion of mine, and over the years, I've played numerous titles that have left a lasting impression. Here are my top ten games: 1. Monster Hunter - A thrilling hunt with endless adventures. 2. Guilty Gear - A franchise that redefines fighting games with its unique style. 3. Smash Bros - The ultimate crossover battle that never gets old. 4. Need for Speed - High-octane races that keep you on the edge of your seat. 5. Destroy All Monsters - A classic that brings back fond memories. 6. Dark Souls - For its challenging gameplay and deep lore. 7. The Legend of Zelda: Breath of the Wild - A masterpiece of open-world exploration. 8. Mario Kart - Fun and competitive, a great party game. 9. Street Fighter - A timeless fighting game that’s always exciting. 10. Final Fantasy VII - A game that revolutionized RPGs and storytelling.",
      author: "Alec Bana",
    },
    {
      title: "The Future of Technology",
      content:
        "Technology is evolving at a rapid pace, transforming the way we live, work, and interact. From advancements in AI and machine learning to breakthroughs in renewable energy, the future promises innovative solutions to some of our most pressing challenges. This article explores upcoming trends and their potential impacts on society.",
      author: "Jane Doe",
    },
    {
      title: "Exploring the Wonders of Space",
      content:
        "Space exploration has always captured the human imagination. With recent missions to Mars and plans to return to the Moon, we are entering a new era of extraterrestrial discovery. This article delves into the latest space missions and what they mean for the future of space travel.",
      author: "John Smith",
    },
  ]);
};

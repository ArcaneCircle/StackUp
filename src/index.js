import "./w3-custom.css";
import "./index.css";
import "@webxdc/highscores";
import { Game } from "./game.js";

const h = (tag, attributes, ...children) => {
  const element = document.createElement(tag);
  if (attributes) {
    Object.entries(attributes).forEach((entry) => {
      element.setAttribute(entry[0], entry[1]);
    });
  }
  element.append(...children);
  return element;
};

let game;
const scoreboardContainer = document.getElementById("scoreboard-container");
const scoreBtn = document.getElementById("score-btn");
scoreBtn.addEventListener("click", (event) => {
  event.stopPropagation();
  scoreboardContainer.innerHTML = "";

  const list = h("ol", { class: "w3-ol" });
  window.highscores.getHighScores().forEach((player) => {
    const name = h(
      "span",
      { class: "w3-large" },
      player.name.length > 20
        ? player.name.substring(0, 20) + "…"
        : player.name,
    );
    const score = h("span", { class: "w3-right" }, player.score);
    let li;
    if (player.current) {
      li = h("li", {}, h("strong", {}, name, score));
    } else {
      li = h("li", {}, name, score);
    }
    list.appendChild(li);
  });

  scoreboardContainer.appendChild(list);
  document.getElementById("scoreboard").style.display = "block";
});

window.highscores
  .init({
    onHighscoresChanged: () => {
      scoreBtn.style.display = "block";
    },
  })
  .then(() => {
    document
      .getElementById("container")
      .append(
        h("div", { id: "game" }),
        h("div", { id: "score" }, 0),
        h(
          "div",
          { id: "instructions" },
          "Click (or press the spacebar) to place the block",
        ),
        h(
          "div",
          { class: "game-over" },
          h("h2", {}, "Game Over"),
          h("p", {}, "You did great, you're the best."),
          h("p", {}, "Click or spacebar to start again"),
        ),
        h(
          "div",
          { class: "game-ready" },
          h("div", { id: "start-btn" }, "Start"),
          h("div"),
        ),
      );

    game = new Game();
  });

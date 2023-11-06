// Utility functions
function repoNeedsShown(repositoryName) {
  const hiddenKeywords = [
    "practice", "curriculum", "prework", "fundamentals", "hayleyw7", "homework", "2", "first", "freyr", "api", "resources", "intro", "pong", "skills", "assignments", "markdown", "Hello", "workshop", "resume", "playground", "practice", "refactor", "debug", "eventPractice", "vocalization", "kit", "test", "dog", "library"
  ];

  return !hiddenKeywords.some(keyword => repositoryName.includes(keyword));
}

function capitalizeAbbreviation(word) {
  const lowerWord = word.toLowerCase();
  switch (lowerWord) {
    case "js":
      return "JavaScript";
    case "jq":
      return "jQuery";
    case "p":
    case "z":
    case "s":
    case "satans":
      return "";
    case "ts":
      return "TypeScript";
    case "whats":
      return "What's";
    case "localstorage":
      return "localStorage";
    case "romcom":
      return "RomCom";
    case "anon":
      return "Anonymous";
    case "vis":
      return "Visualization";
    default:
      return word.charAt(0).toUpperCase() + word.slice(1);
  }
}

function formatRepositoryName(repositoryName) {
  let repositoryNameWords = repositoryName.split(/[-_]|(?=[A-Z])/);
  return repositoryNameWords.map(capitalizeAbbreviation).join(" ");
}

// Function to check if the repo name includes web project terms
function repoIsWebProject(repositoryName) {
  const keywords = ["tracker", "dinner", "operational", "shopping", "decisionator", "affirming", "streaming", "rock", "nite", "rom", "pokedex", "timer", "rancid", "pet", "fitlit", "cookin", "list"];
  return keywords.some(keyword => repositoryName.includes(keyword));
}

// Function to check if the repo name includes terminal terms
function repoIsTerminalProject(repositoryName) {
  console.log(repositoryName)
  const keywords = ["terminal", "virtual computer", "flash", "virtual"];
  return keywords.some(keyword => repositoryName.includes(keyword));
}

// Function to check if the repo name includes game terms
function repoIsGameProject(repositoryName) {
  const keywords = ["PZ", "PS"];
  return keywords.some(keyword => repositoryName.includes(keyword));
}

// Main function
function displayProjects(repositories) {
  const webProjectSection = document.getElementById("webProjects");
  const webProjectList = webProjectSection.querySelector("ul");

  const terminalProjectSection = document.getElementById("terminalProjects");
  const terminalProjectList = terminalProjectSection.querySelector("ul");

  const gameProjectSection = document.getElementById("gameProjects");
  const gameProjectList = gameProjectSection.querySelector("ul");

  const smallProjectSection = document.getElementById("smallProjects");
  const smallProjectList = smallProjectSection.querySelector("ul");

  repositories.forEach(repository => {
    let repositoryName = repository.name;

    if (repoNeedsShown(repositoryName)) {
      let formattedName = formatRepositoryName(repositoryName);
      let repositoryURL = repository.html_url;
      let repositoryDate = repository.created_at.split("-")[0];
      let repoItem = {
        name: formattedName,
        url: repositoryURL,
        date: repositoryDate
      };

      // Determine if it's a web project or a small project
      if (repoIsWebProject(repositoryName)) {
        appendProjectToList(webProjectList, repoItem);
      } else if (repoIsTerminalProject(repositoryName)) {
        appendProjectToList(terminalProjectList, repoItem);
      } else if (repoIsGameProject(repositoryName)) {
        appendProjectToList(gameProjectList, repoItem);
      } else {
        // appendProjectToList(smallProjectList, repoItem);
      }
    }
  });
}

// Function to append a project to a given list
function appendProjectToList(list, repo) {
  const project = document.createElement("li");
  const link = document.createElement("a");
  link.href = repo.url;
  link.innerText = repo.name;

  const date = document.createElement("span");
  date.textContent = ` (${repo.date})`;

  project.appendChild(link);
  project.appendChild(date);
  list.appendChild(project);
}

fetch("https://api.github.com/users/hayleyw7/repos?per_page=200")
  .then(response => {
    console.log(response)
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then(displayProjects)
  .catch(error => {
    console.error("Error fetching projects from GitHub:", error);
    document.getElementById("projects").style.display = "none";
  });

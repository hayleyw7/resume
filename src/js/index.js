// Utility functions
function repoNeedsShown(repositoryName) {
  const hiddenKeywords = [
    "practice", "curriculum", "prework", "fundamentals", "hayleyw7",
    "homework", "2", "first", "freyr", "api", "resources", "intro", "pong", "starter", "skills", "assignments", "markdown", "Hello", "workshop", "resume", "playground", "practice", "refactor"
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
      return "PZ";
    case "z":
    case "s":
    case "satans":
    case "gamepad":
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
    default:
      return word.charAt(0).toUpperCase() + word.slice(1);
  }
}

function formatRepositoryName(repositoryName) {
  let repositoryNameWords = repositoryName.split(/[-_]|(?=[A-Z])/);
  return repositoryNameWords.map(capitalizeAbbreviation).join(" ");
}

// Main function
function displayProjects(repositories) {
  const projectSection = document.getElementById("projects");
  const projectList = projectSection.querySelector("ul");
  let displayedRepos = [];

  repositories.forEach(repository => {
    let repositoryName = repository.name;

    if (repoNeedsShown(repositoryName)) {
      let formattedName = formatRepositoryName(repositoryName);
      let repositoryURL = repository.html_url;
      let repositoryDate = repository.created_at.split("-")[0];

      displayedRepos.push({
        name: formattedName,
        url: repositoryURL,
        date: repositoryDate
      });
    }
  });

  displayedRepos.forEach(repo => {
    const project = document.createElement("li");
    const link = document.createElement("a");
    link.href = repo.url;
    link.innerText = repo.name;

    const dateSpan = document.createElement("span");
    dateSpan.textContent = ` (${repo.date})`;

    project.appendChild(link);
    project.appendChild(dateSpan);
    projectList.appendChild(project);
  });

  if (displayedRepos.length % 2 === 1) {
    const lastProject = projectList.lastChild;
    if (lastProject) {
      projectList.removeChild(lastProject);
    }
  }
}

fetch("https://api.github.com/users/hayleyw7/repos?per_page=200")
  .then(response => {
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

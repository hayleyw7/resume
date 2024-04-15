document.addEventListener("DOMContentLoaded", function() {
  addClickListenerToListSection("projects");
  addClickListenerToListSection("media");
  addClickListenerToListSection("contact");
});

function shouldShowRepo(repoName) {
  const hiddenKeywords = [
    "practice", "curriculum", "prework", "fundamentals", "hayleyw7", "homework", "2", "first", "freyr", "api", "resources", "intro", "pong", "skills", "assignments", "markdown", "workshop", "resume", "playground", "practice", "refactor", "debug", "eventPractice", "vocalization", "kit", "test", "dog", "library", "hello", "Hello", "demo", "vanilla", "airtable", "jq", "slim", "bootstrap", "best"
  ];

  return !hiddenKeywords.some(keyword => repoName.includes(keyword));
};

function capitalizeWord(word) {
  const lowerWord = word.toLowerCase();
  switch (lowerWord) {
    case "p":
    case "z":
    case "s":
    case "starter":
    case "hello":
    case "terminal":
    case "oss":
    case "satans":
    case "code":
    case "confirmation":
      return "";
    case "js":
    case "javascript":
      return "JS";
    case "ts":
      return "TS";
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
    case "flutterdemo":
      return "Flutter Demo";
    case "operational":
      return "";
    case "computer":
      return "PC";
    case "scrollbars":
      return "Scroll";
    case "gamepad":
      return "Popup";
    case "todo":
      return "To Do";
    case "sandbox":
      return "Capture The Flag";
    case "foundations":
      return "Mythicals";
    default:
      return word.charAt(0).toUpperCase() + word.slice(1);
  };
};

function formatRepoName(repoName) {
  const repoWords = repoName.split(/[-_]|(?=[A-Z])/);
  return repoWords.map(capitalizeWord).join(" ");
};

function displayProjects(repos) {
  const projectSection = document.querySelector(".projects");
  const projectList = projectSection.querySelector("ul");

  repos.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

  const filteredRepos = repos.filter(repo => shouldShowRepo(repo.name));
  const numRepos = filteredRepos.length;
  const shouldExcludeLast = numRepos % 2 !== 0;

  filteredRepos.slice(0, shouldExcludeLast ? numRepos - 1 : numRepos).forEach(repo => {
    const formattedName = formatRepoName(repo.name);
    const repoUrl = repo.html_url;
    const repoDate = repo.created_at.substring(0, 4);
    const repoItem = {
      name: formattedName,
      url: repoUrl,
      date: repoDate
    };

    appendProjectToList(projectList, repoItem);
  });
  document.querySelector(".loader-icon").style.display = "none";
};

function appendProjectToList(list, projectItem) {
  const listItem = document.createElement("li");
  const anchor = document.createElement("a");
  anchor.href = projectItem.url;
  anchor.innerText = projectItem.name;
  const dateSpan = document.createElement("span");
  dateSpan.textContent = ` (${projectItem.date})`;

  listItem.appendChild(anchor);
  listItem.appendChild(dateSpan);
  list.appendChild(listItem);
};

function addClickListenerToListSection(section) {
  const sectionMapping = {
    projects: {
      heading: ".projects-heading",
      list: ".projects-list",
      otherSections: ["media", "contact"],
    },
    media: {
      heading: ".media-heading",
      list: ".media-list",
      otherSections: ["projects", "contact"],
    },
    contact: {
      heading: ".contact-heading",
      list: ".contact-list",
      otherSections: ["projects", "media"],
    },
  };

  const headingElement = document.querySelector(sectionMapping[section].heading);
  const listElement = document.querySelector(sectionMapping[section].list);
  const otherSections = sectionMapping[section].otherSections;

  headingElement.addEventListener("click", function() {
    const isHidden = listElement.classList.contains("hidden");
    if (isHidden) {
      listElement.classList.remove("hidden");
      headingElement.classList.add("expanded");
    } else {
      listElement.classList.add("hidden");
      headingElement.classList.remove("expanded");
    }

    otherSections.forEach(otherSection => {
      const otherList = document.querySelector(sectionMapping[otherSection].list);
      const otherHeading = document.querySelector(sectionMapping[otherSection].heading);

      if (!otherList.classList.contains("hidden")) {
        otherList.classList.add("hidden");
        otherHeading.classList.remove("expanded");
      }
    });

    // Scroll to the current heading
    headingElement.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  });
};

fetch("https://api.github.com/users/hayleyw7/repos?per_page=200")
  .then(response => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    };
        return response.json();
  })
  .then(displayProjects)
  .catch(error => {
    console.error("Error fetching projects from GitHub:", error);
    document.querySelector(".projects-section").style.display = "none";
  });

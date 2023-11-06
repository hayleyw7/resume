// Utility functions
function shouldShowRepo(repoName) {
  const hiddenKeywords = [
    'practice', 'curriculum', 'prework', 'fundamentals', 'hayleyw7', 'homework',
    '2', 'first', 'freyr', 'api', 'resources', 'intro', 'pong', 'skills', 'assignments',
    'markdown', 'Hello', 'workshop', 'resume', 'playground', 'practice', 'refactor',
    'debug', 'eventPractice', 'vocalization', 'kit', 'test', 'dog', 'library'
  ];

  return !hiddenKeywords.some(keyword => repoName.includes(keyword));
}

function capitalizeWord(word) {
  const lowerWord = word.toLowerCase();
  switch (lowerWord) {
    case 'js': return 'JavaScript';
    case 'jq': return 'jQuery';
    case 'p':
    case 'z':
    case 's':
    case 'satans': return '';
    case 'ts': return 'TypeScript';
    case 'whats': return "What's";
    case 'localstorage': return 'localStorage';
    case 'romcom': return 'RomCom';
    case 'anon': return 'Anonymous';
    case 'vis': return 'Visualization';
    default: return word.charAt(0).toUpperCase() + word.slice(1);
  }
}

function formatRepoName(repoName) {
  const repoWords = repoName.split(/[-_]|(?=[A-Z])/);
  return repoWords.map(capitalizeWord).join(' ');
}

// Function to check if the repo name includes web project terms
function isWebProject(repoName) {
  const keywords = [
    'tracker', 'dinner', 'operational', 'shopping', 'decisionator', 'affirming',
    'streaming', 'rock', 'nite', 'rom', 'pokedex', 'timer', 'rancid', 'pet',
    'fitlit', 'cookin', 'list'
  ];
  return keywords.some(keyword => repoName.includes(keyword));
}

// Function to check if the repo name includes terminal terms
function isTerminalProject(repoName) {
  const keywords = ['terminal', 'virtual computer', 'flash', 'virtual'];
  return keywords.some(keyword => repoName.includes(keyword));
}

// Function to check if the repo name includes game terms
function isGameProject(repoName) {
  const keywords = ['PZ', 'PS'];
  return keywords.some(keyword => repoName.includes(keyword));
}

// Main function
function displayProjects(repos) {
  const webProjectSection = document.getElementById('webProjects');
  const webProjectList = webProjectSection.querySelector('ul');

  const terminalProjectSection = document.getElementById('terminalProjects');
  const terminalProjectList = terminalProjectSection.querySelector('ul');

  const gameProjectSection = document.getElementById('gameProjects');
  const gameProjectList = gameProjectSection.querySelector('ul');

  // const smallProjectSection = document.getElementById('smallProjects');
  // const smallProjectList = smallProjectSection.querySelector('ul');

  repos.forEach(repo => {
    let repoName = repo.name;

    if (shouldShowRepo(repoName)) {
      let formattedName = formatRepoName(repoName);
      let repoUrl = repo.html_url;
      let repoDate = repo.created_at.substring(0, 4); // Extracting just the year part
      let repoItem = {
        name: formattedName,
        url: repoUrl,
        date: repoDate
      };

      if (isWebProject(repoName)) {
        appendProjectToList(webProjectList, repoItem);
      } else if (isTerminalProject(repoName)) {
        appendProjectToList(terminalProjectList, repoItem);
      } else if (isGameProject(repoName)) {
        appendProjectToList(gameProjectList, repoItem);
      } else {
        // appendProjectToList(smallProjectList, repoItem);
      }
    }
  });
}

// Function to append a project to a given list
function appendProjectToList(list, projectItem) {
  const listItem = document.createElement('li');
  const anchor = document.createElement('a');
  anchor.href = projectItem.url;
  anchor.innerText = projectItem.name;

  const dateSpan = document.createElement('span');
  dateSpan.textContent = ` (${projectItem.date})`;

  listItem.appendChild(anchor);
  listItem.appendChild(dateSpan);
  list.appendChild(listItem);
}

fetch('https://api.github.com/users/hayleyw7/repos?per_page=200')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(displayProjects)
  .catch(error => {
    console.error('Error fetching projects from GitHub:', error);
    document.getElementById("projects").style.display = "none";
  });

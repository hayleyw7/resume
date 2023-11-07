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
    case 'starter':
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

  repos.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

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

  // Once the projects are displayed, hide the articles initially
  hideArticlesOnInit();
  // Add event listeners to h3 elements to show/hide articles on click
  addClickListenersToHeadings();
}

// Function to append a project to a given list
function appendProjectToList(list, projectItem) {
  // Create the list item
  const listItem = document.createElement('li');
  const anchor = document.createElement('a');
  anchor.href = projectItem.url;
  anchor.innerText = projectItem.name;
  const dateSpan = document.createElement('span');
  dateSpan.textContent = ` (${projectItem.date})`;

  // Append the anchor and dateSpan to the listItem
  listItem.appendChild(anchor);
  listItem.appendChild(dateSpan);

  // Append the listItem to the list
  list.appendChild(listItem);

  // Check the list's items and update visibility
  updateListItemVisibility(list);
}

// Function to hide the last item if there is an odd number of items in the list
function updateListItemVisibility(list) {
  const listItems = list.getElementsByTagName('li');
  const listLength = listItems.length;
  
  // First ensure all items are visible, especially if one was previously hidden
  for (let item of listItems) {
    item.style.display = '';
  }

  // Then check if the count is odd, and hide the last item if it is
  if (listLength % 2 !== 0) {
    listItems[listLength - 1].style.display = 'none';
  }
}

function hideArticlesOnInit() {
  const articles = document.querySelectorAll('article.projects');
  articles.forEach(article => {
    article.style.display = 'none'; // Hide the articles initially
  });
}

function addClickListenersToHeadings() {
  const headings = document.querySelectorAll('.portfolio h3');
  const articles = document.querySelectorAll('.portfolio article');

  headings.forEach(heading => {
    heading.addEventListener('click', function() {
      const correspondingArticle = this.nextElementSibling;
      const isArticleAlreadyOpen = correspondingArticle.style.display === 'block';

      // Collapse all articles and remove the 'expanded' class from all headings
      articles.forEach(article => {
        article.style.display = 'none';
      });
      headings.forEach(h => {
        h.classList.remove('expanded');
      });

      // If the corresponding article was closed, we open it here and add the 'expanded' class
      if (!isArticleAlreadyOpen) {
        correspondingArticle.style.display = 'block';
        this.classList.add('expanded');
        // Scroll to the h3 element
        this.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
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

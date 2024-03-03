// Utility functions
function shouldShowRepo(repoName) {
  const hiddenKeywords = [
    'practice', 'curriculum', 'prework', 'fundamentals', 'hayleyw7', 'homework', '2', 'first', 'freyr', 'api', 'resources', 'intro', 'pong', 'skills', 'assignments', 'markdown', 'Hello', 'workshop', 'resume', 'playground', 'practice', 'refactor', 'debug', 'eventPractice', 'vocalization', 'kit', 'test', 'dog', 'library'
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

// Main function
function displayProjects(repos) {
  const projectSection = document.querySelector('.portfolio');
  const projectList = projectSection.querySelector('ul');

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

      appendProjectToList(projectList, repoItem);
    }
  });

  // Add click listener to portfolio heading for toggling the project list visibility
  addClickListenerToPortfolioHeading();
}

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
// Initialize a variable to track the visibility state of the project list

function addClickListenerToPortfolioHeading() {
  const portfolioHeading = document.querySelector('.portfolio-heading');
  const projectList = document.querySelector('.project-list');

  let isProjectListHidden = true; // Initially, assume the project list is hidden

  portfolioHeading.addEventListener('click', function() {
    // Toggle the visibility state
    isProjectListHidden = !isProjectListHidden;

    // Toggle the 'hidden' class based on the updated state
    if (isProjectListHidden) {
      console.log('has hidden class');
      projectList.classList.add('hidden');
    } else {
      console.log('NOT have hidden class');
      projectList.classList.remove('hidden');
    }
  });
}








// Call the function when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  addClickListenerToPortfolioHeading();
});



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
    document.querySelector(".projects-section").style.display = "none";
  });

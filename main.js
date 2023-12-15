let input = document.querySelector('.get-repos input');
let getButton = document.querySelector('.get-button');
let showData = document.querySelector('.show-data');

getButton.onclick = function() {

    getRepos();

};

function getRepos() {
    if(input.value === '') {
        showData.innerHTML = '<span>Please Write Your Github Username </span>'
    } else {
        fetch(`https://api.github.com/users/${input.value}/repos`)
        .then((res) => {
            return res.json();
        })
        .then((repos) => {
            showData.innerHTML = '';

            repos.forEach((repo) => {

                console.log(repo);

                let div = document.createElement('div');
                let divText = document.createTextNode(repo.name);
                div.appendChild(divText);
                div.className = 'repo-box';

                let website = document.createElement('a');
                website.textContent = 'Website';
                website.href = `https://${input.value}.github.io/${repo.name}`;
                website.setAttribute('target', '_blank');
                div.appendChild(website);

                let visit = document.createElement('a');
                visit.textContent = 'Visit';
                visit.href = `https://github.com/${input.value}/${repo.name}`;
                visit.setAttribute('target', '_blank');
                div.appendChild(visit);

                let stars = document.createElement('span');
                let starsText = document.createTextNode(`Stars ${repo.stargazers_count}`);
                stars.appendChild(starsText);
                div.appendChild(stars);

                showData.appendChild(div);
            })
        });
    }
}
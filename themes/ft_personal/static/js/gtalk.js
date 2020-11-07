
const gitalk = new Gitalk({
  enable: true,
  clientID: '0ce4e2c1e0f7341f5349',
  clientSecret: '26c7618d4cf897dd47ee63c1daae806152516ac3',
  repo: 'ftvision.github.io',      // The repository of store comments,
  owner: 'ftvision',
  admin: ['ftvision'],
  id: document.querySelector("#page-title").innerHTML,      // Ensure uniqueness and length less than 50
  distractionFreeMode: false  // Facebook-like distraction free mode
})

gitalk.render('gitalk-container')

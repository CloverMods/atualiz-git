

<center>
  <a href="https://youtube.com/@clovermyt">
    <img src="https://telegra.ph/file/41598dec8462fb039c130.jpg" width="610">
  </a>
</center>

# AtualizGit V1.0.0
By: @clovermyt

# Como Usar
Exemplo: NodeJs
```
const GithubApiUpdater = require('AtualizGit');

(async () => {
  const updater = new GithubApiUpdater({
    owner: 'UsernameGitHub',
    repo: 'repositorioName,
    path: 'arquivo1.js',
    destino: 'arquivo1.js',
  });
  await updater.verificarEbaixar();
})();

```


<center>
  <a href="https://youtube.com/@clovermyt">
    <img src="https://telegra.ph/file/41598dec8462fb039c130.jpg" width="610">
  </a>
</center>

# AtualizGit V1.0.3
By: @clovermyt

# Como Usar

<h3>Exemplo para atualizado um só arquivo:</h3>
```
const GithubApiUpdater = require('atualiz-git');

(async () => {
  const updater = new GithubApiUpdater({
    owner: 'UsernameGitHub',
    repo: 'repositorioName,
    path: 'arquivo1.js',
    branch: 'main',
    destino: 'arquivo1.js',
  });
  await updater.verificarEbaixar();
})();

```

<h3>Exemplo de como atualizar mais de um arquivo de uma vez:</h3>
```
const GithubApiUpdater = require('atualiz-git');

(async () => {
  const arquivos = [
    new GithubApiUpdater({
      owner: 'UsernameGitHub',
      repo: 'repositorioName,
      path: 'arquivo1.js',
      branch: 'main',
      destino: 'arquivo1.js',
    }),
    new GithubApiUpdater({
      owner: 'UsernameGitHub',
      repo: 'repositorioName,
      path: 'arquivo2.js',
      branch: 'main',
      destino: 'arquivo2.js',
    })
  ];

  for (const updater of arquivos) {
    await updater.verificarEbaixar();
  }

  console.log('Todos os arquivos verificados!');
})();
```
<hr>


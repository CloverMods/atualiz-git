const https = require('https');
const fs = require('fs');
const path = require('path');

class GithubApiUpdater {
  constructor({ owner, repo, path: filePath, branch = 'main', destino }) {
    this.owner = owner;
    this.repo = repo;
    this.path = filePath;
    this.branch = branch;
    this.destino = destino;
    this.metaFile = path.resolve(process.cwd(), 'saves', `${destino}.meta.json`);
  }

  getMeta() {
    if (!fs.existsSync(this.metaFile)) return {};
    return JSON.parse(fs.readFileSync(this.metaFile, 'utf8'));
  }

  saveMeta(data) {
    const dir = path.dirname(this.metaFile);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    fs.writeFileSync(this.metaFile, JSON.stringify(data, null, 2));
  }

  async fetchFileInfo() {
    const url = `https://api.github.com/repos/${this.owner}/${this.repo}/contents/${this.path}?ref=${this.branch}`;
    const options = {
      headers: {
        'User-Agent': 'Node.js',
        'Accept': 'application/vnd.github.v3+json',
      }
    };

    return new Promise((resolve, reject) => {
      https.get(url, options, (res) => {
        let data = '';

        if (res.statusCode !== 200) {
          reject(new Error(`GitHub API status code: ${res.statusCode}`));
          res.resume();
          return;
        }

        res.on('data', (chunk) => { data += chunk; });
        res.on('end', () => {
          try {
            const json = JSON.parse(data);
            resolve(json);
          } catch (err) {
            reject(err);
          }
        });
      }).on('error', reject);
    });
  }

  async verificarEbaixar() {
    try {
      const meta = this.getMeta();
      const fileInfo = await this.fetchFileInfo();

      const remoteSha = fileInfo.sha;
      const localSha = meta.sha;

      console.log("Verificando Atualizações");
      console.log(`Remote SHA: ${remoteSha}`);
      console.log(`Local SHA : ${localSha || 'N/A'}`);

      if (remoteSha !== localSha) {
        console.log('Arquivo mudou, salvando...');
        const content = Buffer.from(fileInfo.content, 'base64').toString('utf8');
        fs.writeFileSync(this.destino, content, 'utf8');
        this.saveMeta({ sha: remoteSha });
        console.log(`Arquivo salvo em ${this.destino}`);
      } else {
        console.log('Sem mudanças. Nada pra fazer.');
      }
    } catch (err) {
      console.error('Erro:', err.message);
      throw err;
    }
  }
}

module.exports = GithubApiUpdater;

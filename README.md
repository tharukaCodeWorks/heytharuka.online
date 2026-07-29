# heytharuka.online

Personal portfolio site for Tharuka Lakshan — Senior Software Engineer.

Static site (vanilla HTML/CSS/JS, no build step). Live at [heytharuka.online](https://heytharuka.online).

## Structure

```
index.html
assets/
  css/style.css
  js/main.js
  img/favicon.svg
```

## Deploy

Deployment is release-triggered via GitHub Actions (`.github/workflows/deploy.yml`).
Publishing a new GitHub Release rsyncs `index.html` and `assets/` to the server into
an isolated directory, independent of any other site on the host.

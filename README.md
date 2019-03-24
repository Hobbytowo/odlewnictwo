# SPC - Statistical Process Control

## Description
Application to generate control chart (process-behavior chart) from selected csv file.
<br>
Chart is watching for changes in data in file and updating chart.
<br><br>
In settings it is possible to change:
- quantity probes (default 5),
- number of probes to create chart (default 6),
- window width (default 15),
- SPC rules (default every eight the most popular rules)


## Project setup
```
npm install
```

## Built with
- Vue.js
- Chart.js + Vue chart.js

### Compiles and hot-reloads for development
```
npm run serve || npm run electron:serve
```

### Compiles and minifies for production
```
npm run build || npm run electron:build
```

### Lints and fixes files
```
npm run lint
```

## License
MIT © [Weronika Kędziora](https://github.com/Hobbytowo)

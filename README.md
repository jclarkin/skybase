Installation Instructions

1. Install node.js
2. Download Project, extract the zip file into a fresh folder
3. Modify app.js: 
** uncomment the line var process = process || { env: { PORT: 1337, IP: 'localhost' } };
** update the remoteServerConfig.url parameter to be http://localhost/
4. Open a terminal pointed at the same folder
5. Run: node app.js
6. Run the Remote Server with applied skybase API patchset
7. Load skybase in your browser at http://localhost:1337/

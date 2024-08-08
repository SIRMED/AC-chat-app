# Note
I checked github after the interview and came to a shocking revelation that the last time I was working on this app, I was working on it in GitHub Codespaces
in my school because laptops were not allowed. I forgot to commit all the changes to the repository and the GitHub Codespaces instance deleted after 60 days.
I rebuilt this website in 1 day to showcase and this was the best I could do. Best practicies were not followed because of the time constraint. 

# Another Note
When a SocketIO connection sends a message to the server it recives it's request and then the server send the recived message to the reciving connection. All of this just happens once but react on the reciving end does something weird and duplicates the recived messages by an unknown amount. No problem could be traced in the half an hour and thus no solution was implemented (i just wanted to get the app running). Hope you understand. 

# How to start app
Download the AC-Chat-API from [here](https://github.com/SIRMED/AC-Chat-API). Start the server (go [here](https://github.com/SIRMED/AC-Chat-API) to know how to) and then start the react app by navigating to this app's directory and running `npm install` then `npm start`

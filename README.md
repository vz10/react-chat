#Embeddable chaotic chat

You can easily include this chat into your site. Just put your firebase credentials
into the **config.json** file, build it as noted above, import **bundle.js** and
add an empty element with id="mount-point" into the page of your site where you
 want to insert a chat.

Chat connects to the domain, so all the users on the same domain will be in the same
"chat-room". If you add it to several sites with different domains there will be
created separate room for every domain and you don't have to change your firebase
credentials for every site.

###For local start from repository clone

1. npm install
2. npm install webpack -g (optional)
3. npm run devserver

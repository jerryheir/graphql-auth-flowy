## REPLICATING WORKFLOWY

I want to start up first by thanking you the opportunity.

I also wanted to state that I was a bit in a haste to complete this and I had to clone an old github repo which I made changes to so as to give me a headstart.

To run the application locally, please ensure you have postgres installed locally as the server uses the postgres db as seen in ./server/ormconfig.json
After that, use the following commands:

```createdb workflowy``` 

(This above command is used to create postgres DB)

It will as for password for user, please enter "test" as seen in the ./server/ormconfig.json

```cd server && yarn install && yarn start```

```cd web && yarn install && yarn start```

After this, go to ```localhost:3000``` to view the React Application
You can also see the graphql playground by going to ```http://localhost:4000/graphql```

On the backend, I used Typecript, NodeJS (Express) and apollo-server-express, please ignore every other unused data on the frontend

On the frontend, I used Typescript React, and React-Native-Web (To get display: flex by default, speed and also get some out of the box tools that RN provides easily for us. This also shows my knowledge on building scalable cross platform mobile applications). Sadly I used Redux, for only two things. To persist data on reload, and also to store two keys. (Note: I could have done this with apollo client but my solution would have taken me more time. I apologize for this)

```
HOME -----
          |
    -------------
   |             |
NODE TASK      NODE TASK 2 
                  |
            -------------
            |            
        SUB NODE TASK 1

```


## ANSWERS TO THE TWO QUESTIONS
Q1. In the above task, if you also had to incorporate images/media
of any kind with each of the tasks on the interface, what would you
add to your current approach, you can discuss briefly

Answer: On the task interface on the server, there are three important keys;
1. id: number, which is the unique identifier of each node
2. pId: number, this is more like a parent Id that helps us know which node is the parent creator.
3. Lastly is task: string, which is a string that carries the Task message
For assets like images/audio, we would have to add another key to the interface, maybe called ```asset```. And these can be added at the time of creation by sending the file to s3 bucket or firebase storage, generating a link that will be stored in the asset key, and then this asset is also kept in users gallery (A new part of the schema), and that will make users be able to select old assets so that we don't have to upload to our storage every single time

Q2. If you are using GraphQL and Redux on your front end, how would
you manage the state for such a use case, since both of them come
with their own state management libraries. How would you handle the
same

Answer: 
I think for things like "Is menu open or not?" or "User selected this language/country?", it is really overkill to try to do this with apollo. This can be done with redux.
Majorly to ensure to avoid having duplicate data but at the same time ensure to not over complicate an feature just for the sake of using apollo caching

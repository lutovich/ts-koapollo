# Neo4j Driver Team:

Did a quick clean up of everything, it had gotten a bit messy as I'm the only one on the project.

In this commit I've started stripping back the layers of the testing suite where the issue cropped up.
No nyc no ts-node.
For the setup when I discovered the failure see: <https://github.com/SnappyCroissant/ts-koapollo/commit/d1db60cbf7e54f6f8b86b2c8cd711b8f97ca5b32>
It's a bit messy I'd been slack and not properly ignored coverage outputs and builds and the like.
Please excuse the colourful language in the commit descriptions, I didn't think anyone else would be seeing these.

nothing special for setup, just `npm install`

Relevant files:
`src/neo4j/db.spec.ts`
`test/neo4j/resolvers.spec.ts`

To catch error run `npm test` (For both this and the last commit.)

`database.js` is the working vanilla js file.

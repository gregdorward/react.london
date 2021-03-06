React London Data Flow
======================

React London is a mostly static isomorphic React site.

Rather than having its own database it consumes a GraphQL API exposed by the
[Badger Brain][brain] application, which in turn gets its data from a managed
third party content management system called [Prismic][prismic].

[brain]: https://github.com/redbadger/badger-brain
[prismic]: https://prismic.io

The data flow looks like this:


    Prismic -> BadgerBrain -> React.London


## Updating content

If we want to update the content of the site we log into Prismic, search for
the appropriate document (the React.London community and the contained
events, etc), make our edits, and then save and publish the documents.

React.London queries BadgerBrain for site data every time a user visits the
site, so the user will always get the latest content in Prismic.

Andy is spearheading the creation of a content editor's guide. It can be found
[here][editor-guide].

[editor-guide]: https://andrewbestbier1.gitbooks.io/red-badger-prismic-guide/content/


## Images

Image content used on React.London (namely the photos of the speakers) is
hosted on a third party image hosting service called [Cloudinary][cloudinary].
The file name is copied into a document's field in Prismic. The URL to the
image will then be exposed by Badger Brain for use by React.London.

[cloudinary]: http://cloudinary.com/


## Developing new editable content

If we need to add new content to the site and there is no existing field in
Prismic to contain the content we need to go through the following process.

1. Add the new field to a document schema on Prismic staging.
2. Add this new field to the copy of the schema on Badger Brain.
3. Update Badger Brain to expose this new field (tests, etc).
4. Get the Badger Brain + Prismic changes reviewed and deployed to production.
5. Update the GraphQL query in React.London to fetch this new data.
6. Use this data in the view :)


## The limitation of Prismic & Badger Brain

The content management system we use, Prismic, has a few limitations in
comparison to a traditional database with custom GUI editor setup. The two
that have the largest impact on our work on React.London is that it lacks data
validation features and it has no concept of a required field. As a result of
this it is possible to publish documents that are missing some or all of the
content we require to fully render the site.

In future Badger Brain will hopefully do some amount of data validation and
filtering, but until then we need to program in a defensive manner in
React.London to avoid crashing when some value is `undefined` or `null`.

One approach we have employed is to make each component degrade gracefully if
any of its props are missing. Some props may be required, so don't render the
component at all. Others may be optional so render a placeholder value
instead. This functionality should always be unit tested.

You are a dev who specializes in Payloadcms framework.
There is a [seed script](/src/endpoints/seed/index.ts) available for this project. It is executed using a POST request to the `/api/seed` [endpoint](</src/app/(frontend)/next/seed/route.ts>).

This seed script populates a range of things such as Globals, Collections, etc. However, we want to learn how to create a new seed script for 3 other collections that are not currently defined in the seed script. The collections are [`Radio`](/src/modules/Content/Radio/Radio.ts), [`Artists`](/src/modules/Content/Radio/Artists.ts), and [`Genres`](/src/modules/Content/Radio/Genres.ts).

You will be provided with sample data for each of these collections. Use the sample data for the new the seed script.

You dont need to over-complicate this task. You will be asked 1 collection at a time. Use the existing seed script as a reference to avoid mistakes. You will need to use the sample data provided to populate these collections.

We will make the script using 4 files:

1. Create a file for the `Genres` collection.
2. Create a file for the `Artists` collection.
3. Create a file for the `Radio` collection.
4. Create the main index script.

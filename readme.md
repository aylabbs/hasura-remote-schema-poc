***Hasura S3 Secure File Signature Proof of Concept***

****core concepts****
- sign urls in a remote schema
- secure remote schema by using permissions:
  - prefill the the id field at the permissions level so it cannot be used freely, only a relational query from files will populate the id input
  - permissions are automatically inherited from the files table as you can only pass the id from a files record you can access on that table

****to test****

`docker compose up -d`
open http://localhost:8080/console/data/sql and paste in the contents of the `seed.sql` file in the root of this repo, select `Track this` and `Run!`
open http://localhost:8080/console/settings/metadata-actions and click `Import Metadata` and use the file `hasura_metadata.json` in the root of this repo
then create a row in the files table with any value in the `key` column and the default for id (a uuid)
go to the api explorer and set a header for `x-hasura-role` as `user` run a query like this:
```
query MyQuery {
  files {
    key
    signed {
      url
    }
  }
  relatedDataById {
    url
  }
}
```
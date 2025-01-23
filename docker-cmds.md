# Docker commands

### 1. Start a local postgresql server

```
docker run --name test-db -e POSTGRES_USER=root -e POSTGRES_PASSWORD=pa55word -e POSTGRES_DB=local_db -p 5432:5432 -d postgres
```

**The -e stands for environment variable**
Connection string:

```
postgres://root:pa55word@localhost/local_db
```

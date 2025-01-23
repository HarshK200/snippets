# Docker commands

### 1. Start a local postgresql server

```
docker run --name test-db -e POSTGRES_USER=root -e POSTGRES_PASSWORD=pa55word -e POSTGRES_DB=local_db -p 5432:5432 -d postgres
```

- -e flag stands for environment variable
- -d stands for run in detach mode
- -p is the port binding _**(left side -> host system) 5432 : 5432 (right side -> docker container)**_

<br>

**Connection string**:

```
postgres://root:pa55word@localhost/local_db
```

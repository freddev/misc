__linux__
```
#!/bin/bash

# MySQL database details
DB_USER="your-db-user"
DB_PASS="your-db-password"
DB_NAME="your-db-name"

# Remote server details
REMOTE_USER="remote-user"
REMOTE_HOST="remote-host"
REMOTE_PATH="/remote/path/to/backup"

# Backup filename
FILENAME="backup-$(date +%Y-%m-%d-%H-%M-%S).sql.gz"

# Create backup
mysqldump -u $DB_USER -p$DB_PASS $DB_NAME | gzip > $FILENAME

# Upload backup to remote server
scp $FILENAME $REMOTE_USER@$REMOTE_HOST:$REMOTE_PATH

# Clean up backup file
rm $FILENAME
``` 

_fredrik (at) conva se_

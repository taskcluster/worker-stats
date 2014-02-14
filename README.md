# Worker Stats

Home for the metrics dashboard (and lower level logging / UI) for the
docker worker.

## Configuration Environment Variables

  - `WORKER_STATS_AZURE_TABLE` : azure table where stats are stored.

  - `AZURE_STORAGE_ACCOUNT` : azure storage account

  - `AZURE_STORAGE_ACCESS_KEY` : azure access key

  - `IRON_TOKEN` : token for ironmq

  - `IRON_PROJECT_ID` : project for ironmq

  - `AWS_SECRET_ACCESS_KEY` : usual aws stuff

  - `AWS_ACCESS_KEY_ID` : ...

  - `AWS_REGION` : (defaults to 'us-west-2')

  - `AWS_BUCKET` : (defaults to 'taskcluster-tasks')

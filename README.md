# Bank

<div align="center">

[![GitHub Release](https://img.shields.io/github/v/release/Lorenzo0111/Bank)](https://github.com/Lorenzo0111/Bank/releases/latest)
[![GitHub License](https://img.shields.io/github/license/Lorenzo0111/Bank)](LICENSE)
[![Discord](https://img.shields.io/discord/1088775598337433662)](https://discord.gg/HT47UQXBqG)

  <hr />

<a href="https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FLorenzo0111%2FBank&env=POSTGRES_PRISMA_URL,POSTGRES_URL_NON_POOLING,JWT_SECRET,VITE_API_URL&envDescription=All%20the%20Environment%20Variables%20needed%20for%20the%20app%20to%20work&envLink=https%3A%2F%2Fgithub.com%2FLorenzo0111%2FBank%3Ftab%3Dreadme-ov-file%23deploying&project-name=bank&repository-name=Bank"><img src="https://vercel.com/button" alt="Deploy with Vercel" height="32" /></a>

</div>

## What is Bank

Bank is a simple banking system that allows you to create accounts, transfer money and more.

<img src="https://github.com/Lorenzo0111/Bank/blob/main/media/Dashboard.png?raw=true" height="400" />

## Deploying

You'll have to set the following environment variables to setup the dashboard, here is a list of them:

> ✨ You can generate secret tokens by visiting [this link](https://generate-secret.vercel.app/32)

### Dashboard Environment Variables

| Key                      | Description                     | Example       |
| ------------------------ | ------------------------------- | ------------- |
| POSTGRES_PRISMA_URL      | The postgres url                | postgresql:// |
| POSTGRES_URL_NON_POOLING | The postgres url                | postgresql:// |
| JWT_SECRET               | The jwt secret                  |               |
| VITE_API_URL             | The backend URL                 |               |

> 🚨 You must also set `ENABLE_EXPERIMENTAL_COREPACK` to `1` to enable the corepack support if using Vercel.

### Serverless

You can deploy the project to Vercel or any other hosting service by clicking the buttons above.

### Selfhosting

If you want to selfhost, you can run `yarn`, `yarn build` and `yarn start` to start the program.

The dashboard will usually be available [here](http://localhost:3000/).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

If you need help, feel free to join the [Discord Server](https://discord.gg/HT47UQXBqG) or open an issue.

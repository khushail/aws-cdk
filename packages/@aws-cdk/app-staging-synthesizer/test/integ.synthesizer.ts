import * as path from 'path';
import { App, Stack } from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { AppStagingSynthesizer } from '../lib';

const app = new App();

const stack = new Stack(app, 'app-scoped-staging-test', {
  synthesizer: AppStagingSynthesizer.stackPerEnv({ appId: 'app-id' }),
  env: {
    account: '489318732371',
    region: 'us-east-2',
  },
});

new lambda.Function(stack, 'lambda', {
  code: lambda.AssetCode.fromAsset(path.join(__dirname, 'assets')),
  handler: 'index.handler',
  runtime: lambda.Runtime.PYTHON_3_9,
});

app.synth();

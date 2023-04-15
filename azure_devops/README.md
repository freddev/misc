#### Azure devops
Azure DevOps is a suite of cloud-based tools and services provided by Microsoft to help developers plan, build, test, and deploy software applications. 
It includes features for version control, continuous integration and delivery (CI/CD), project management, and more. 

1. First, create a new project in Azure DevOps.
2. In the project, navigate to "Pipelines" and click "Create Pipeline".
3. Choose the source code repository where your project code is stored, such as GitHub or Azure Repos.
4. Select your repository and configure your branch and path filters.
5. Choose a template for your pipeline. Azure DevOps offers many pre-built templates for different programming languages and frameworks.
6. Customize the pipeline YAML file to include the steps you need for your project. For example, you might need to build your application, run tests, and publish artifacts.
7. Once your YAML file is configured, commit and push it to your repository.
8. Configure the build trigger for your pipeline. You can choose to trigger builds on code commits, pull requests, or on a schedule.
9. Save and run your pipeline to build and test your application. You can view the build logs and status in Azure DevOps.
10. Once your build is successful, you can configure a release pipeline to deploy your application to a test or production environment.
11. In the "Releases" section of your project, click "New pipeline" to create a new release pipeline.
12. Choose a template for your pipeline, such as "Deploy to Azure App Service".
13. Configure your deployment settings, such as the target environment and application settings.
14. Add deployment tasks to your pipeline, such as copying artifacts to the deployment server and running scripts to start the application.
15. Once your release pipeline is configured, save and run it to deploy your application to the target environment.
16. That's it! Your CI/CD build chain is now set up in Azure DevOps. Whenever you commit new code changes to your repository, Azure DevOps will automatically trigger a new build and deploy it to your environment.

```yaml
trigger:
- main

variables:
  azureSubscription: 'your-azure-subscription-name'
  appName: 'your-app-name'
  resourceGroupName: 'your-resource-group-name'
  region: 'your-region-name'
  javaVersion: '11'

stages:
- stage: Build
  displayName: Build stage
  jobs:
  - job: Build
    displayName: Build
    pool:
      vmImage: 'ubuntu-latest'
    steps:
    - task: MavenAuthenticate@0
      displayName: 'Maven Authenticate'
      inputs:
        artifactFeeds: 'your-maven-feed-name'
    - task: Maven@3
      displayName: 'Maven Build'
      inputs:
        mavenPomFile: 'pom.xml'
        mavenOptions: '-Xmx3072m'
        javaHomeOption: 'JDKVersion'
        jdkVersionOption: '1.11'
        jdkArchitectureOption: 'x64'
        publishJUnitResults: true
        testResultsFiles: '**/surefire-reports/TEST-*.xml'
        goals: 'package'
    - task: PublishBuildArtifacts@1
      displayName: 'Publish Artifact'
      inputs:
        artifactName: 'drop'
        pathToPublish: '$(Build.SourcesDirectory)/target'
        publishLocation: 'Container'

- stage: Deploy
  displayName: Deploy stage
  dependsOn: Build
  jobs:
  - deployment: DeploymentJob
    environment: 'your-environment-name'
    strategy:
      runOnce:
        deploy:
          steps:
          - task: AzureWebApp@1
            displayName: 'Azure Web App Deploy'
            inputs:
              azureSubscription: $(azureSubscription)
              appType: 'webAppLinux'
              appName: $(appName)
              package: '$(System.ArtifactsDirectory)/drop/*.jar'
              runtimeStack: 'JAVA|$(javaVersion)'
              resourceGroupName: $(resourceGroupName)
              regionName: $(region)
              slotName: 'production'
              javaVersion: $(javaVersion)
              startupCommand: 'java -jar *.jar'
```

_fredrik (at) conva se_ 
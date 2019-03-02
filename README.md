## spfx-file-browser

This repository contains an example SPFx Web Part that embeds the @microsoft/file-browser on SharePoint.
The Web Part was created by following the [SPFx Hello World Web Part](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/get-started/build-a-hello-world-web-part) tutorial.
The @microsoft/file-browser supports rendering a Microsoft Graph backed document library with rename, upload, download, and other actions.

The steps followed are enumerated in the next section.

### Scaffold SPFx Web Part

The first set of instructions cover scaffolding your SPFx Web Part.

You may choose to follow the [SPFx Hello World Web Part tutorial](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/get-started/build-a-hello-world-web-part) or the following steps to scaffold your repository.

It is also important to ensure that your development environment is setup properly by following [SPFx setup your development environment tutorial](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-development-environment).

1. First create a directory and `git init` for source control.
1. We'll be using `NPM` so be sure to run `npm init` within your new directory.
1. Install Yeoman and the SPFx generator via `npm install -g yo @microsoft/generator-sharepoint` globally or locally depending on your use case.
1. Run the SPFx scaffold generator via `yo @microsoft/sharepoint` and select the Web Part settings relevant to your use case.
1. Ensure you've run `gulp trust-dev-cert` at least once for SharePoint workbench to support local Web Part development.
1. Run `gulp serve` which will launch a local web server that communicates with your SharePoint tenant's workbench.
1. Navigate to your SharePoint tenant's workbench by replacing `<tenant>` in the following URL: `https://<tenant>.sharepoint.com/_layouts/15/workbench.aspx`.
1. Within your workbench, click the `+` to add a Web Part, search for the name of your Web Part in the autocomplete widget. For example, this repository's Web Part is named "FileBrowserWebPart".
1. Ensure that the Web Part is listed.

### Add @microsoft/file-browser to SPFx Web Part

1. Now that you have an SPFx Web Part rendering in your SharePoint work bench, we'll cover adding the `GraphFileBrowser` to your web part.
1. You'll first want to install `@microsoft/file-browser` as a dependency by running `npm install --save @microsoft/file-browser`.
1. The `GraphFileBrowser` communicates with the Microsoft Graph API and therefore requires an AAD token. Thankfully, SPFx's `BaseClientSideWebPart` exposes a helper method for retrieving a valid access token.
1. Modify your web part to extend `BaseClientSideWebPart` i.e. `export default class FileBrowserWebPart extends BaseClientSideWebPart<IFileBrowserWebPartProps`.
1. The `GraphFileBrowser` has a required prop `getAuthenticationToken: () => Promise<string>` which we'll need to provide.
1. Write a `private getAuthToken` method which returns a valid Graph access token for authentication like so:

    ```tsx
    private getAuthToken = (): Promise<string> => {
        return this.context.aadTokenProviderFactory.getTokenProvider().then(tokenProvider => {
            return tokenProvider.getToken(GRAPH_BASE_URL);
        });
    }
    ```
1. Import `GraphFileBrowser` from `@microsoft/file-browser` and return it via your Web Part's `render` method and assign the prop value of `getAuthToken` to `getAuthenticationToken` as done below:

    ```tsx
    export default class FileBrowser extends React.Component<IFileBrowserWebPartProps> {
    public render(): React.ReactElement<IFileBrowserWebPartProps> {
        const { getAuthToken } = this.props;

        return (
        <GraphFileBrowser
            getAuthenticationToken={getAuthToken}
        />
        );
    }
    }
    ```
1. When rendered, the `aadTokenProviderFactory` will return a `tokenProvider` which fetches a Graph access token and returns it to `GraphFileBrowser` so that you do not have to handle authentication.
1. Now, you can refresh the web part in your workbench by either removing the Web Part and re-adding it or refreshing the page. You should see the `GraphFileBrowser` render an empty folder view of a document library.

### Pass a document library list ID to GraphFileBrowser

### Customizing the GraphFileBrowser

### Handling onSuccess callback

### Handling onCancel callback

### TODO

- Provisioning an app catalogue: https://docs.microsoft.com/en-us/sharepoint/use-app-catalog
- Packaging a web part
- Installing a web part
- Theme / Style customization
- onSuccess / onCancel callbacks
- Required OAuth scopes `Files.ReadWrite.All`.
- Dependency size
- Rename action (WIP)
- Download action (WIP)
- Upload action (WIP)

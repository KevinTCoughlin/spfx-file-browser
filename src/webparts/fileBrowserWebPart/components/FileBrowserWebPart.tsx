import * as React from 'react';
import { IFileBrowserWebPartProps } from './IFileBrowserWebPartProps';
import { GraphFileBrowser } from '@microsoft/file-browser';

export default class FileBrowserWebPart extends React.Component<IFileBrowserWebPartProps> {
  public render(): React.ReactElement<IFileBrowserWebPartProps> {
    return (
      <GraphFileBrowser
        getAuthenticationToken={this.props.getAuthToken}
        onSuccess={(selectedKeys: any[]) => console.log(selectedKeys)}
        onCancel={(error: Error) => console.log(error.message)}
      />
    );
  }
}

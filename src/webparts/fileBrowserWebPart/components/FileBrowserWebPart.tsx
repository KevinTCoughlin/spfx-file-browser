import * as React from 'react';
import { IFileBrowserWebPartProps } from './IFileBrowserWebPartProps';
import { GraphFileBrowser } from '@microsoft/file-browser';

export default class FileBrowser extends React.Component<IFileBrowserWebPartProps> {
  public render(): React.ReactElement<IFileBrowserWebPartProps> {
    const { getAuthToken, listId } = this.props;

    return (
      <GraphFileBrowser
        getAuthenticationToken={getAuthToken}
        endpoint={`https://graph.microsoft.com/v1.0/sites/root/lists/${listId}`}
        onSuccess={(selectedKeys: any[]) => console.log('Files selected:', selectedKeys)}
        onCancel={(error: Error) => console.error('Error:', error.message)}
      />
    );
  }
}

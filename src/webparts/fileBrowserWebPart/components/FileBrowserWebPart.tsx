import * as React from 'react';
import { IFileBrowserWebPartProps } from './IFileBrowserWebPartProps';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { GRAPH_BASE_URL } from '@microsoft/microsoft-graph-client';

export default class FileBrowserWebPart extends BaseClientSideWebPart<IFileBrowserWebPartProps> {
  private getAuthToken(): Promise<string> {
    return this.context.aadTokenProviderFactory.getTokenProvider().then(tokenProvider => {
      return tokenProvider.getToken(GRAPH_BASE_URL);
    });
  }

  public render(): React.ReactElement<IFileBrowserWebPartProps> {
    return (
      <div></div>
    );
  }
}

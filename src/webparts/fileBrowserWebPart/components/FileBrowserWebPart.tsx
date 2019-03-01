import * as React from 'react';
import { IFileBrowserWebPartProps } from './IFileBrowserWebPartProps';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

export default class FileBrowserWebPart extends BaseClientSideWebPart<IFileBrowserWebPartProps> {
  private getAuthToken(): Promise<string> {
    return this.context.aadTokenProviderFactory.getTokenProvider().then(tokenProvider => {
      return tokenProvider.getToken('https://graph.microsoft.com/');
    });
  }

  public render(): React.ReactElement<IFileBrowserWebPartProps> {
    return (
      <div></div>
    );
  }
}

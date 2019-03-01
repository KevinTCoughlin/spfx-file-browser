import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'FileBrowserWebPartWebPartStrings';
import FileBrowserWebPart from './components/FileBrowserWebPart';
import { IFileBrowserWebPartProps } from './components/IFileBrowserWebPartProps';
import { GRAPH_BASE_URL } from '@microsoft/microsoft-graph-client';

export interface IFileBrowserWebPartWebPartProps {
  description: string;
}

export default class FileBrowserWebPartWebPart extends BaseClientSideWebPart<IFileBrowserWebPartWebPartProps> {

  private getAuthToken = (): Promise<string> => {
    return this.context.aadTokenProviderFactory.getTokenProvider().then(tokenProvider => {
      return tokenProvider.getToken(GRAPH_BASE_URL);
    });
  }

  public render(): void {
    const element: React.ReactElement<IFileBrowserWebPartProps > = React.createElement(
      FileBrowserWebPart,
      {
        description: this.properties.description,
        getAuthToken: this.getAuthToken
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}

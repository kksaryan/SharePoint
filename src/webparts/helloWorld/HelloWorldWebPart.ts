import * as React from 'react';
import * as ReactDom from 'react-dom';
import pnp from "sp-pnp-js";
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'HelloWorldWebPartStrings';
import Feedback from './components/Feedback/Feedback';



export interface IHelloWorldWebPartProps {
  description: string;
  name: string;
}

export default class HelloWorldWebPart extends BaseClientSideWebPart<IHelloWorldWebPartProps> {

  public onInit(): Promise<void> {
      return super.onInit().then(_ => {
        pnp.setup({
          spfxContext: this.context
        });
      });
       // optional, we are setting up the sp-pnp-js logging for debugging
      //  Logger.activeLogLevel = LogLevel.Info;
      //  Logger.subscribe(new ConsoleListener());
    }

  public render(): void {
    const element: React.ReactElement<{}> = React.createElement(Feedback);

    ReactDom.render(element, this.domElement);
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

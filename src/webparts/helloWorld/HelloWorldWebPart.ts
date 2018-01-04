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
import {
  ComboBox,
  IComboBoxProps,
  IComboBoxOption,
  VirtualizedComboBox
} from 'office-ui-fabric-react/lib/ComboBox';
import AsyncDropdown from './components/AsyncDropdown/AsyncDropdown';
import { IAsyncDropdownProps } from './components/AsyncDropdown/IAsyncDropdownProps';
import { IDropdownOption } from 'office-ui-fabric-react/lib/components/Dropdown';


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

  private _loadData(): Promise<IDropdownOption[]> {
    return pnp.sp.web.lists.getByTitle("Categories").items.get()
      .then(respnse => {
        return respnse.map(field => {
          return <IDropdownOption>
            {
              key: field.ID,
              text: field.Title,
              selected: false,
              index: field.ID
            }
        }
        )
      })
  }

  public ondbCgange(option: IDropdownOption, index?: number) {
    console.log(option, index);
  }
  public render(): void {
    const element: React.ReactElement<IAsyncDropdownProps> = React.createElement(
      AsyncDropdown, {
        label: 'TestDropdown',
        loadOptions: this._loadData,
        onChanged: this.ondbCgange,
        selectedKey: 3,
        disabled: false,
        stateKey: ''
      }

      // Feedback,
      // {
      //   categories : pnp.sp.web.lists.getByTitle("Categories").items.get()
      //   .then(respnse=> setTimeout(() => {
      //      return<IComboBoxOption[]> respnse.map(field => {
      //          return<IComboBoxOption>{
      //              key: field.ID,
      //              text: field.Title,
      //              selected:false,
      //              index: field.ID

      //          }
      //      }
      //      )
      //  },2000)),
      //  subcategories : pnp.sp.web.lists.getByTitle("subCategories").items.get().then(respnse => {
      //   return respnse.map(field => {
      //       return {
      //           key: field.ID,
      //           text: field.Title,
      //           category: field.CategoryId,
      //           selected:false,
      //       }
      //   }
      //   )
      // })
      //}

    );

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

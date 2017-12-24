import * as React from 'react';
// import styles from './Feedback.module.scss';
import { IFeedbackSates } from './IFeedbackState';
import { escape } from '@microsoft/sp-lodash-subset';
import { Dropdown, IDropdown, DropdownMenuItemType, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { ISelectableOption } from "office-ui-fabric-react/lib/utilities/selectableOption/SelectableOption.types";
import pnp, { LibraryConfiguration } from "sp-pnp-js";



const _options: ISelectableOption[] = [
    { key: 'Header', text: 'Caregories', itemType: DropdownMenuItemType.Header },
    { key: 'A', text: 'Option a', selected: true },
    { key: 'B', text: 'Option b' },
    { key: 'C', text: 'Option c' },
    { key: 'D', text: 'Option d' },
    { key: 'E', text: 'Option e' },
    { key: 'divider_2', text: '-', itemType: DropdownMenuItemType.Divider }
]

export default class Feedback extends React.Component<{}, IFeedbackSates>{
    constructor(props) {
        super(props);


        // this.state = { categories:

    }
    componentWillMount() {
        pnp.setup({ sp: { baseUrl: "https://devsyno.sharepoint.com" } });
        // GET /_api/web/lists/getByTitle('Tasks')
        pnp.sp.web.lists.getByTitle("Categories").get().then(r => {

            console.log(r);
        });
    }
    public render() {
        return (
            <div>
                <Dropdown
                    className='ms-Dropdown'
                    placeHolder='Select an Option'
                    label='Select Category'
                    id='ddCategory'
                    ariaLabel='Select Category'
                    options={_options}
                />
                <Dropdown
                    className='ms-Dropdown'
                    placeHolder='Select a Subcategory'
                    label='Select Sub Category'
                    id='ddsubCategory'
                    ariaLabel='Select Sub Category'
                    options={
                        [
                            { key: 'Header', text: 'Sub Caregories', itemType: DropdownMenuItemType.Header },
                            { key: 'A', text: 'Option a' },
                            { key: 'B', text: 'Option b' },
                            { key: 'C', text: 'Option c' },
                            { key: 'D', text: 'Option d' },
                            { key: 'E', text: 'Option e' },
                            { key: 'divider_2', text: '-', itemType: DropdownMenuItemType.Divider }
                        ]
                    }
                />
                <TextField
                    label='Feedback Title' id="txtFeedbackTitle"
                />
                <TextField
                    label='Feedback Description' id="txtFeedbackDes"
                    multiline
                    rows={4}
                />
                <div className="ms-button" >
                    <DefaultButton
                        primary={true}
                        data-automation-id='test'
                        text='Save'
                    />
                    <DefaultButton
                        data-automation-id='test'
                        text='Cancel'
                    />
                </div>
            </div>
        )
    }
} 
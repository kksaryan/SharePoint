import * as React from 'react';
// import styles from './Feedback.module.scss';
import { IFeedbackSates,IOption } from './IFeedbackState';
import { escape } from '@microsoft/sp-lodash-subset';
import {
    ComboBox,
    IComboBoxProps,
    IComboBoxOption,
    VirtualizedComboBox
  } from 'office-ui-fabric-react/lib/ComboBox';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { ISelectableOption } from "office-ui-fabric-react/lib/utilities/selectableOption/SelectableOption.types";
import pnp from 'sp-pnp-js';


export interface IFeedbackProps {
    categories: IComboBoxOption[];//{key:string,text:string,selected:boolean}[];
    subcategories:{key:string,text:string,selected:boolean,category:string}[];
    }

    
export default class Feedback extends React.Component<IFeedbackProps> {
    private scaleOptions: IComboBoxOption[] = [];
    constructor(props) {
        super(props);
       

    }
    
    
    componentWillMount() {
         
        // console.log(this.props.categories);
        // console.log(this.props.categories);
        // console.log(this.props.subcategories)
        // categories.map((cat)=>{
        //     this.scaleOptions.push({  
        //         key:cat.key,text:cat.text
        //     })
        // })
    }
    public render() {

        console.log(this.props.categories);
        console.log(this.props.subcategories);

        let {categories}= this.props;
        return (
            <div>
 <ComboBox
          defaultSelectedKey='C'
          label='Select Category'
          id='cmbbox1'
          ariaLabel='Basic ComboBox example'
          allowFreeform={ true }
          autoComplete='on'
          options={categories}
        />
{/* <ComboBox
          defaultSelectedKey='C'
          label='Basic uncontrolled example (allowFreeform: T, AutoComplete: T):'
          id='cmbbox2'
          ariaLabel='Basic ComboBox example'
          allowFreeform={ true }
          autoComplete='on'
          options={this.scaleOptions} */}
       
              
              
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